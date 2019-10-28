import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import models, { connectDb } from './models'
import routes from './routes'

const eraseDatabaseOnSync = true;
const port = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1],
    }
    next()
})

app.use('/session', routes.session)
app.use('/users', routes.user)
app.use('/messages', routes.message)

connectDb().then(async () => {
    if (eraseDatabaseOnSync) {
        await Promise.all([
            models.User.deleteMany({}),
            models.Message.deleteMany({}),
        ])
        createUsersWithMessages()
    }

    app.listen(port, () =>
        console.log(`Example app listening on port ${port}!`)
    )
})

const createUsersWithMessages = async () => {
    const user1 = new models.User({
        username: 'rwieruch',
    })
    const user2 = new models.User({
        username: 'ddavids',
    });

    const message1 = new models.Message({
        text: 'Published the Road to learn React',
        user: user1.id,
    })
    const message2 = new models.Message({
        text: 'Happy to release ...',
        user: user2.id,
    });
    const message3 = new models.Message({
        text: 'Published a complete ...',
        user: user2.id,
    });

    await message1.save();
    await message2.save();
    await message3.save();
    await user1.save();
    await user2.save();
}