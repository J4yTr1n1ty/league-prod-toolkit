FROM node:16-alpine as builder

WORKDIR /app

ADD package.json package-lock.json ./
RUN npm ci

ADD tsconfig.json webpack.config.js index.d.ts ./
ADD core ./core
ADD frontend ./frontend
ADD utils ./utils
ADD scripts ./scripts
RUN npm run build

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/dist /app/dist
ADD docker/entrypoint.js package.json ./
RUN npm i --production
RUN mkdir ./modules

# Install default plugins and theme
RUN node ./dist/scripts/install.js -plugins theme-default

# See setup script for further explanation of these options
# https://github.com/RCVolus/league-prod-toolkit/blob/main/scripts/setup.ts
ENV RIOT_API_KEY=RGAPI-SECRETKEY
ENV SERVER=EUW1
ENV AUTH=true
ENV DBPATH=modules/plugin-database/data/league-prod-toolkit

ENTRYPOINT [ "/app/entrypoint.js" ]
