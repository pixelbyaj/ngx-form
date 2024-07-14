ARG NODE_IMAGE=node:16-bullseye
FROM ${NODE_IMAGE} as node-build
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /src
RUN npm run build --prod
FROM nginx:1.17.1-alpine

COPY --from=build-step /app/docs /usr/share/nginx/html


