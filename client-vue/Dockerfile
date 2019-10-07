FROM node:11.5-alpine
# vue-cli reqires 8.10.0+ 

RUN mkdir -p /usr/src/client-vue

RUN yarn add -g @vue/cli

EXPOSE 82
WORKDIR /usr/src/client-vue

RUN yarn global add @api-platform/client-generator

# Prevent the reinstallation of node modules at every changes in the source code
COPY package.json yarn.lock ./
RUN yarn install

COPY . ./

CMD yarn start
