FROM node:16

WORKDIR /usr/src/app

RUN npm install pm2 -g

COPY package.json ./
RUN npm i


COPY . .

EXPOSE 8080


CMD ["pm2-runtime", "start", "index.js"]
# CMD ["node", "index.js"]