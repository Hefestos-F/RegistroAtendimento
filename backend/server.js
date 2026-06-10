const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

let admin = null;
try {
  // Tenta inicializar o Firebase Admin se a variável de ambiente estiver configurada
  // Defina GOOGLE_APPLICATION_CREDENTIALS apontando para o arquivo JSON do service account
  admin = require('firebase-admin');
  if (!admin.apps.length && process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });
    console.log('[backend] Firebase Admin inicializado via GOOGLE_APPLICATION_CREDENTIALS');
  }
} catch (e) {
  admin = null;
  console.warn('[backend] Firebase Admin não disponível, usando armazenamento local');
}

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, '..', 'db.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

function readDB() {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    return [];
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

async function getFirestoreRegs() {
  if (!admin) return null;
  try {
    const db = admin.firestore();
    const snapshot = await db.collection('registros').get();
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error('[backend] Erro ao ler Firestore:', e);
    return null;
  }
}

async function addFirestoreReg(registro) {
  if (!admin) return null;
  try {
    const db = admin.firestore();
    const ref = await db.collection('registros').add(registro);
    return { id: ref.id, ...registro };
  } catch (e) {
    console.error('[backend] Erro ao gravar no Firestore:', e);
    return null;
  }
}

app.get('/api/registros', async (req, res) => {
  if (admin) {
    const f = await getFirestoreRegs();
    if (f !== null) return res.json(f);
  }
  const data = readDB();
  res.json(data);
});

app.post('/api/registros', async (req, res) => {
  const registro = req.body || {};
  registro.id = registro.id || Date.now().toString(36);
  registro.dataHora = registro.dataHora || new Date().toLocaleString('pt-BR');

  if (admin) {
    const saved = await addFirestoreReg(registro);
    if (saved) return res.status(201).json(saved);
    // se falhar no firestore, continua para salvar localmente
  }

  const data = readDB();
  data.push(registro);
  writeDB(data);
  res.status(201).json(registro);
});

app.listen(PORT, () => console.log(`Registchama backend rodando em http://localhost:${PORT}`));
