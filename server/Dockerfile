FROM node:10-alpine

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

ARG API_HOST
ENV API_HOST=$API_HOST

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3001

CMD [ "node", "index.js" ]