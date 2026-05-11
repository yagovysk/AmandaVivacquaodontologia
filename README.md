# Vivacqua Odontologia - Landing Page

Site institucional da Vivacqua Odontologia com foco em conversao de pacientes, SEO local e experiencia mobile.

## Visao Geral

- Landing page de uma pagina com secoes de apresentacao, servicos, galeria, contato e agendamento.
- Otimizada para busca local (Taguatinga/DF) com metadados, Open Graph e dados estruturados.
- Interface responsiva com recursos de acessibilidade e componentes interativos.

## Tecnologias

- HTML5
- Tailwind CSS (CDN)
- JavaScript puro (sem framework)

## Estrutura do Projeto

- index.html: estrutura da pagina, estilos locais e SEO.
- script.js: interacoes (menu mobile, carrossel, galeria, animacoes e agente virtual).
- assets/: imagens da clinica e dos servicos.
- robots.txt e sitemap.xml: suporte a indexacao.
- ACESSIBILIDADE.md e COMO_TESTAR_ACESSIBILIDADE.md: guias de acessibilidade.

## Como Executar

1. Baixe/clone o projeto.
2. Abra a pasta no VS Code.
3. Abra o arquivo index.html no navegador.

## Funcionalidades Principais

- Navegacao responsiva com menu mobile.
- Hero com carrossel e CTAs de conversao.
- Galeria com modal, navegacao por teclado e swipe.
- Bloco de agendamento com links para WhatsApp.
- Menu de acessibilidade (modo escuro, contraste e tamanho de fonte).

## Agente Virtual Odontologico

Foi adicionado um assistente virtual para atendimento inicial de clientes.

### O que ele faz

- Se apresenta automaticamente com mensagem de boas-vindas.
- Exibe dica rapida ao lado do botao do chat.
- Responde duvidas frequentes sobre:
	servicos, odontologia do esporte, clareamento, endodontia, prevencao, horarios, localizacao, contato e valores.
- Direciona o cliente para agendamento via WhatsApp.

### Onde esta implementado

- Estrutura e estilo do chat: index.html.
- Logica de conversa e respostas: script.js (bloco "Dental Virtual Agent").

### Como personalizar rapidamente

- Alterar textos iniciais: array initialMessages em script.js.
- Alterar perguntas rapidas: botoes com classe dental-chip em index.html.
- Ajustar respostas: funcao getReply em script.js.
- Alterar WhatsApp: constante whatsappUrl em script.js.

## Observacoes

- O agente virtual nao substitui avaliacao odontologica presencial.
- Para evoluir para IA generativa real, e necessario integrar uma API externa no backend.
