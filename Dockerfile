FROM node:7.5.0-alpine

COPY ./package.json /packages/package.json
RUN cd /packages/ && npm install -q

WORKDIR /app

RUN cp -a /packages/* /app/
COPY . /app

EXPOSE 8080

CMD npm run build && node_modules/.bin/http-server ./ -p 8080
