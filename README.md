Express & ES6 REST API Boilerplate
==================================

A straightforward boilerplate for building REST APIs with ES6 and Express.

- ES6 support via [babel](https://babeljs.io)
- CORS support via [cors](https://github.com/troygoode/node-cors)

## Getting started

```sh
# clone it
git clone git@github.com:samyabouseda/node-express-rest-api-boilerplate.git
cd node-express-rest-api-boilerplate

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

# Run tests.
npm test
```    