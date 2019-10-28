import mongoose from 'mongoose'

import User from './user'
import Message from './message'

const connectDb = () =>
    mongoose.connect(process.env.DATABASE_URL)

const models = { User, Message }

export { connectDb }

export default models