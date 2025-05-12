# Use a imagem base do Node.js
FROM node:22.15-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do projeto
COPY package*.json ./
COPY *.json ./
COPY . .

# Instale as dependências
RUN npm install && npm cache clean --force

# Compile o projeto
RUN npm run build

# Exponha a porta que o NestJS usará
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]