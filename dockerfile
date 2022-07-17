
#Install Node (Probably not required at this point) to build and run application
FROM node:16 as node
WORKDIR /usr/src/app

#Move package.json and install npm packages
COPY package*.json ./
COPY . .
RUN npm install --force --silent

#Build Package
RUN npm run build

#Setup Nginx
FROM nginx:latest

#COPY ./gravy.cc/docs /usr/share/nginx/html
COPY --from=node /usr/src/app/docs /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/nginx.conf

EXPOSE 4200
