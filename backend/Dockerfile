FROM node:lts-alpine

# Arguments
ARG PORT=3000
ARG DBPATH=database/traindb.sqlite
ARG EMAIL
ARG EMAIL_PASSWD

# Environment varaibles
ENV PORT $PORT
ENV DBPATH $DBPATH
ENV EMAIL $EMAIL
ENV EMAIL_PASSWD $EMAIL_PASSWD

WORKDIR /app
COPY package*.json ./
RUN npm install --no-fund --no-audit
COPY . .

ENTRYPOINT ["./entrypoint.sh"]

