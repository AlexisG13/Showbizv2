FROM node:13.6
WORKDIR /usr/src/app
COPY . . 
RUN npm install
