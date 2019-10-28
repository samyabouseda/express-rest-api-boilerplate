import 'dotenv/config'

// simple usage of ES6 class to show babel is working
class Greeter {
    greet() {
        console.log('Hello world!')
    }

    greetUser(name) {
        console.log(`Hello, ${name} !`)
    }
}

const greeter = new Greeter()

greeter.greet()
greeter.greetUser('Alice')
greeter.greetUser('Bob')

// output a variable stored in .env file
// don't forget to import 'dotenv/config' at the top
console.log(process.env.MY_SECRET)