FROM node:lts-alpine as build
ARG VUE_APP_API_URL=https://api.trainapp.letnh.dev
ENV VUE_APP_API_URL $VUE_APP_API_URL
WORKDIR /app
COPY package*.json ./
RUN npm install --no-fund --no-audit
COPY . .
RUN npm run build

FROM nginx:stable-alpine as prod
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

