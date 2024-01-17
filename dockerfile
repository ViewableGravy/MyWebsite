#Install Node (Probably not required at this point) to build and run application
FROM node:20 as node
WORKDIR /usr/src/app

#Move package.json and install npm packages
COPY package*.json ./
COPY .env.production ./
COPY . .
RUN yarn

#Build Package
RUN yarn build

#Setup Nginx
FROM nginx:latest

#COPY ./gravy.cc/docs /usr/share/nginx/html
COPY --from=node /usr/src/app/build /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/nginx.conf

EXPOSE 4200