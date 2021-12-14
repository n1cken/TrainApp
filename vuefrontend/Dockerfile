FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install --no-fund --no-audit
COPY . .
RUN npm run build

