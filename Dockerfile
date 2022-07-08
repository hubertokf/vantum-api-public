FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install -g sails

RUN npm install

ENV USER sails

COPY . /usr/src/app

EXPOSE 1337

# CMD [ "npm", "start" ]

