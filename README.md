Express & ES6 REST API Boilerplate
==================================

A straightforward boilerplate for building REST APIs with ES6 and Express.

- ES6 support via [babel](https://babeljs.io)
- CORS support via [cors](https://github.com/troygoode/node-cors)

## Getting started

```sh
# clone it
git clone git@github.com:developit/express-es6-rest-api.git
cd express-es6-rest-api

# Make it your own
rm -rf .git && git init && npm init

# Install dependencies
npm install

# Add .env file to the root folder
touch .env

# Add env variables to .env file for port and database url
PORT=<port_nuber>
DATABASE_URL=<db_url>

# Start development live-reload server
npm start
```    


## Scripts

1. `npm start`    
Transpile ES6 and start node server.

2. `npm test`
Run tests.