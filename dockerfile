
FROM node:14-slim

WORKDIR /usr/src/app

COPY ./server/package.json ./
COPY ./server/yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5000/tcp

CMD [ "index.js" ]