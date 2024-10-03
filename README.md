
# Auth Management Application

## Descrição do Projeto

Esta é uma aplicação simples de autenticação e gerenciamento de usuários, desenvolvida como parte de um processo de seleção para vaga de estágio. O objetivo é permitir o cadastro, login e visualização de perfis básicos de usuários.

### Funcionalidades

- Cadastro de novos usuários.
- Login de usuários.
- Visualização de um perfil básico após autenticação.

## Tecnologias Utilizadas

- **Frontend**: React.js com TypeScript, Vite para build, Tailwind CSS para estilização.
- **Backend**: Node.js com Express.js (ou similar), Prisma como ORM, banco de dados SQLite.
- **Docker**: Contêinerização das aplicações de frontend e backend.

## Requisitos

- Docker e Docker Compose instalados.
- Node.js (se não utilizar Docker para rodar localmente).

## Como Rodar o Projeto

### Usando Docker

1. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/joelvitorniino/auth-management-app.git
   cd auth-management
   ```

2. **Subir os contêineres:**
   No diretório raiz do projeto, execute:
   ```bash
   docker-compose up --build
   ```

3. **Acessar a aplicação:**
   - Frontend: Acesse `http://localhost:5173`.
   - Backend: Acesse `http://localhost:5000`.
  
4. **Desligar os contêneires**
   No diretório raiz do projeto, execute:
   ```bash
   docker-compose down -v
   ```
### Rodando Localmente (Sem Docker)

1. **Backend:**
   - Entre no diretório do backend:
     ```bash
     cd backend
     ```
   - Instale as dependências:
     ```bash
     yarn install
     ```
   - Execute a aplicação:
     ```bash
     yarn start
     ```

2. **Frontend:**
   - Entre no diretório do frontend:
     ```bash
     cd frontend
     ```
   - Instale as dependências:
     ```bash
     yarn install
     ```
   - Execute a aplicação:
     ```bash
     yarn dev
     ```

## Estrutura do Projeto

- **backend/**
  - `app.ts`: Ponto de entrada do backend.
  - `prisma/`: Configuração do Prisma e banco de dados.
  - `Dockerfile`: Configuração Docker do backend.
  
- **frontend/**
  - `src/`: Código-fonte do frontend.
  - `Dockerfile`: Configuração Docker do frontend.
  - `vite.config.ts`: Configuração do Vite para o build.

## Autor

Desenvolvido por Joel como parte de um desafio técnico.
