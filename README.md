# Registchama

## Descrição

Registchama é um sistema de registro de atendimento para uso interno, focado em gerar resumos de atendimento com suporte a waiver, isenção de taxa DU, registro de infant/emissor de invoice e link de pagamento.

A aplicação principal é uma página web estática que pode ser aberta diretamente no navegador e armazena registros no Firebase Firestore quando disponível.

## Funcionalidades

- Registro de ticket, cliente, localizador e relato.
- Seleção e preenchimento automatizado de motivos de waiver.
- Controle de isenção de taxa DU com motivos pré-definidos.
- Identificação de reservas com infant e emissor de invoice.
- Registro opcional de link de pagamento com dados de cartão.
- Geração de resumo pronto para cópia e uso em atendimento.
- Envio de registros para Firestore (quando o Firebase estiver acessível).
- Página de relatórios com filtro e exportação para Excel.

## Estrutura do projeto

- `index.html` - interface principal do formulário de registro.
- `style.css` - estilos visuais e layout responsivo.
- `script.js` - lógica de interface, validação, geração de resumo e integração com Firebase.
- `Relatorio/relatorios.html` - página de relatórios para visualização e filtro de registros.
- `Relatorio/relatorios.js` - lógica de carregamento de dados do Firestore, filtros e exportação.

## Como usar

1. Abra `index.html` em um navegador moderno.
2. Preencha os campos obrigatórios: `Ticket`, `Nome do Cliente`, `Relato` e `Assinatura`.
3. Selecione as opções de waiver, isenção de DU, infant e link de pagamento conforme necessário.
4. Clique em `Gerar` para criar o resumo de atendimento.
5. Use `Copiar` para copiar o texto gerado ao clipboard.
6. Caso o Firebase esteja disponível, o registro será salvo no Firestore automaticamente.

## Acesso aos relatórios

1. Abra `Relatorio/relatorios.html` no navegador.
2. Insira a senha de administrador: `Aug$2025`.
3. Use os filtros para buscar registros por ticket, localizador, waiver, DU, invoice, link de pagamento e outros campos.
4. Clique em `Filtrar` para atualizar a tabela.
5. Use `Exportar Excel` para baixar os resultados filtrados em um arquivo `.xlsx`.

## Observações técnicas

- A aplicação foi projetada como um app frontend estático. Não há servidor backend obrigatório.
- O Firebase Firestore é usado apenas como opção de armazenamento remoto.
- Caso a conexão com o Firebase falhe, o app continua funcionando localmente e apenas exibe um aviso no console.
- As páginas usam JavaScript moderno e recursos de módulo ES.

## Segurança

- A senha de acesso aos relatórios e a configuração do Firebase estão contidas nos arquivos `relatorios.html`, `script.js` e `Relatorio/relatorios.js`.
- Se for necessário, remova ou substitua essas credenciais antes de publicar em produção.

## Desenvolvedor

- Projeto desenvolvido por Leandro Salvador de Oliveira.

## Executando localmente

Como o projeto é estático, basta abrir os arquivos HTML no navegador ou usar um servidor local simples como:

- Python 3: `python3 -m http.server 8000`
- Node.js: `npx serve .`

Em seguida, acesse `http://localhost:8000`.
