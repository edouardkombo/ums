# This defines our starting point
FROM node:11.5-alpine 

RUN mkdir -p /usr/src/client-vue2 
 
WORKDIR /usr/src/client-vue2

RUN yarn install

# Prevent the reinstallation of node modules at every changes in the source code
COPY package.json yarn.lock ./
RUN yarn install


COPY . . 
