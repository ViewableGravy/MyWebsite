
#Install Node to build and run application

FROM node:16

#Create this folder 
WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

#install dependencies
RUN npm install -g --force --silent
RUN npm install @angular/cli --force --silent

#build the application
RUN npm run build --silent

#copy the build
COPY ./docs ./docs/

#Setup Nginx
FROM nginx:latest

COPY ./docs /usr/share/nginx/html

EXPOSE 80



