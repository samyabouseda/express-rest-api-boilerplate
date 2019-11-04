# Express & ES6 REST API Boilerplate

A straightforward boilerplate for building REST APIs with javascript ES6 and Express.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing 
purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://docs.mongodb.com/manual/installation/)

## Installation

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

# Start mongodb on your local machine
mongod

# Start development live-reload server
npm start

# Docker support
more to come...
```    

## Usage
Create a model in the models folder.
To learn more about this, check the [mongoose documentation](https://mongoosejs.com).
```js
import { Schema, model } from 'mongoose'

const bookSchema = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    title: {
        type: String,
        unique: true,
    },
})

const Book = model('Book', bookSchema)

export default Book

```

Create a controller for that model in the controllers folder. To learn more about this, check the [Express documentation](https://expressjs.com/en/guide/routing.html).
```js
import { Router } from 'express'

const routes = Router()

routes.get('/', async (req, res) => {
    const books = await req.context.models.Book.find()
    return res.send(books)
})

routes.get('/:bookId', async (req, res) => {
    const book = await req.context.models.Book.findById(
    	req.params.bookId,
    )
    return res.send(book)
})

export default routes

```

Add the newly created controller to the `index.js` file in the api folder.
```js
import { BookController } from '../controllers'

router.use('/books', BookController)
```

## Database 

### Seeding
more to come...

### Migration
more to come...

## Running the tests
```
npm test

more to come...
```

## Deployment
```
more to come...
```

## Built with
- [Express](https://expressjs.com) - The web framework for [Node.js](https://nodejs.org/en/)
- [Babel](https://babeljs.io) - To support ES6 syntax
- [Cors](https://github.com/troygoode/node-cors) - For CORS support 
- [Nodemon](https://nodemon.io) - For automatic server restart on file change
- [Mongoose](https://mongoosejs.com) - Mongodb object modeling

## Authors

* **Samy Abouseda** - [samyabouseda](https://github.com/samyabouseda)

## License

[MIT](LICENSE.md)