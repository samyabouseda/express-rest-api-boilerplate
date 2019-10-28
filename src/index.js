import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const port = process.env.PORT
const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
)