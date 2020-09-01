FROM node:lts-alpine

# RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home

# Create a app directory
WORKDIR /home/node/api

# Install dependencies

COPY package*.json yarn.* ./
COPY tsconfig*.json ./
RUN yarn install

# RUN yarn build
# COPY ormconfig.json ./dist/
# COPY .env ./dist/
# WORKDIR ./dist

EXPOSE 8080

ENTRYPOINT [ "./init.sh" ]

