# FROM node:16-alpine

# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# WORKDIR /home/node/app

# ARG DATABASE_URL
# ENV DATABASE_URL=$DATABASE_URL

# ARG API_HOST
# ENV API_HOST=$API_HOST

# # COPY package*.json ./

# USER node

# COPY --chown=node:node package.json .

# RUN npm install

# COPY --chown=node:node . .

# # USER node

# EXPOSE 3001

# CMD [ "node", "index.js" ]

FROM node:16

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /app

COPY . .

RUN npm install

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

ENTRYPOINT ["sh", "-c"]

CMD ["npm start"]