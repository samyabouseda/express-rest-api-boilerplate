import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import uuidv4 from 'uuid/v4'
import models from './models'
import routes from './routes'

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

app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
)