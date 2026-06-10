async function recuperarRegistros() {
  try {
    const resp = await fetch('/api/registros');
    const registros = await resp.json();
    console.log('Registros recuperados via backend:', registros);
    return registros;
  } catch (error) {
    console.error('Erro ao recuperar registros do backend:', error);
    return [];
  }
}

recuperarRegistros();
