docker-nginx-webpack3-react-hot-loader SPA boilerplate
===========================

A dockerized react SPA with nginx, webpack 3, and react-hot-loader



## Usage

This assumes you have docker installed.

#### Development

    $ docker-compose up --build

It will run a webpack dev server with react hot loader accessable on `http://0.0.0.0:8000`.

#### How it works?

When Docker is building the image it copies `package.json` inside the image and install required dependencies by Yarn. Then when docker-compose create the container, the `spa` folder mounted to the container. So, when you change the codes on your local drive, the change will copy to the docker volume automatically. 

docker-compose run `webpack-dev-server` and the server is behind the nginx. To make hot loader works there is a specific route setting for `/sockjs-node/` path on the `nginx.conf`.

Also, Check the `/spa/js/index.jsx` to see how `AppContainer` from react-hot-loader used in react.

---
### Production


    $ docker-compose -f docker-compose.prod.yml up --build
    

It will deploy codes and serve them with nginx on `http://0.0.0.0:8000`.

#### How it works?

When Docker is building the image it copies `package.json` inside the image and install required dependencies by Yarn. Also, It copies all of the sources to the image. Then, the source codes deploy and bundle in shared `statics` volume. Nginx will use the bundle to serve them on `http://0.0.0.0:8000`



