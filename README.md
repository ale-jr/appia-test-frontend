# Appia dashboard
Just a simple dashboard with a login screen ;)

## Folder contents

### /public
Static content and index.html

### /src
Lib configs, components, routes and views in VueJS

* __/apollo:__ Apollo graphQL client instance, configuration and auth middleware
* __/components:__ Reusable Vue components
* __/router:__ Vue router configuration and route registry
* __/store:__ Vuex store, actions, mutations and getters
* __/utils:__ Some helper functions
* __/views:__ Main components for vue router

### /Docker
Caddy (lightweight http2 server) configuration and build/run shell script

## Deploy with Docker
This project contain a Dockerfile with build instructions as well as HTTP server, in order to deploy with docker, just follow this steps:
 
* Create a .env file at project root containing the same variables in sample.env
* `./Docker/build.sh` or `docker build -t appia-frontend-test .` to create a Docker image
* `./Docker/run.sh` or `docker container run -d -it -p 80:80 --name=appia-frontend appia-frontend-test`: in order to run a HTTP server with this project on port 80 (you can user other port too)


## Available yarn/npm commands
 `yarn install`: Install all dependencies for this project
 `yarn serve`: Start a development server
 `yarn build`: Compiles and minifies for production
 `yarn lint`: Lints and fixes files