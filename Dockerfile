FROM node:13.6
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . . 