FROM node:20 AS build

WORKDIR /app

# Copie o package.json e instale dependências
COPY package.json package-lock.json* ./
RUN npm install

# Copie o restante do código e execute o build
COPY . .
RUN npm run build

FROM nginx:alpine

# Copie a configuração customizada do NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie os arquivos estáticos gerados para a pasta do NGINX
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
