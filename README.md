# Yaitech TEST

Demonstração: ![Gif](./demo.gif)

Este projeto foi desenvolvido com **Next.js** e **NestJS**. Trata-se de uma biblioteca digital que utiliza recursos de inteligência artificial para obter o contexto dos livros e criar um chat, permitindo que o usuário faça perguntas sobre o conteúdo de cada livro.

## Configuração Inicial

Antes de rodar o projeto, é necessário configurar as variáveis de ambiente do backend. Um arquivo de exemplo chamado `.env.example` está disponível no diretório `/backend`.

### Passos para Configuração

1. **Crie o arquivo `.env`:**

   - Copie o arquivo `.env.example` e renomeie-o para `.env`.
   - Preencha os valores das variáveis de ambiente conforme necessário.
   - Instale as dependências utilizando `yarn` ou `npm install` tanto no diretório `/backend` quanto no `/frontend`.

2. **Comandos para rodar o projeto:**

   - Para executar o **frontend**, use o comando:
     - `npm run dev` ou `yarn dev` no diretório `/frontend`.
   - Para executar o **backend**, use o comando:
     - `npm run dev` ou `yarn dev` no diretório `/backend`.

3. **Detalhes:**

   - A API do backend roda na porta **8000**, sem prefixos.
     - Acesse: [http://localhost:8000/docs](http://localhost:8000/docs) para acessar a documentação da API.
   - O frontend roda na porta **3000**, sem prefixos.
     - Acesse: [http://localhost:3000/](http://localhost:3000/) para visualizar o frontend.
