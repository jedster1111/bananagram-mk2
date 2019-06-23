FROM node:10.16.0-jessie as build-stage
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn
COPY ./ /app/
RUN yarn build

FROM nginx:1.17.0-alpine
COPY --from=build-stage /app/build/ /usr/share/nginx/html
