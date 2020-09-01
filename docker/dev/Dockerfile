FROM node:12-alpine

WORKDIR /server

COPY package.json .

USER node

RUN yarn install --production

EXPOSE 3333

ENTRYPOINT [ "./init.sh" ]

