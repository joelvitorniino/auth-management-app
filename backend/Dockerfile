# Etapa de construção (build)
FROM node:20 AS build

# Definindo o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas package.json e package-lock.json para instalar dependências antes do código
COPY package.json package-lock.json* ./

# Instala as dependências do Node.js
RUN npm install

# Instala o TypeScript globalmente
RUN npm install -g typescript

# Copia todo o restante do código para o diretório de trabalho
COPY . .

# Gera o Prisma Client (necessário se o Prisma for utilizado)
RUN npx prisma generate

# Compila o TypeScript
RUN tsc

# Etapa final de execução
FROM node:20 AS production

# Definindo o diretório de trabalho na fase final
WORKDIR /app

# Copia as dependências e o código compilado da etapa anterior
COPY --from=build /app /app

# Exponha a porta em que a aplicação irá rodar
EXPOSE 5000

# Comando para iniciar o servidor
CMD ["node", "dist/app.js"]
