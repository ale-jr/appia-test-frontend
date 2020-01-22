# Build
FROM node as build-deps
WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build

# Servir
FROM abiosoft/caddy
COPY --from=build-deps /usr/src/app/dist /www/app
COPY ./Docker/Caddyfile /etc/Caddyfile
EXPOSE 80
ENTRYPOINT ["/bin/parent", "caddy"]
CMD ["--conf", "/etc/Caddyfile", "--log", "stdout", "--agree=$ACME_AGREE"]