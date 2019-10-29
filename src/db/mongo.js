import mongoose from 'mongoose'

const connectDb = () => mongoose.connect(process.env.DATABASE_URL)

export { connectDb }
