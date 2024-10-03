# Etapa única de construção e execução
FROM node:20

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
RUN npx tsc

# Exponha a porta em que a aplicação irá rodar
EXPOSE 5000

# Comando para iniciar o servidor
CMD ["node", "dist/app.js"] 
