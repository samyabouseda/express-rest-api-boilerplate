import { Schema, Types, model } from 'mongoose'

const schema = new Schema({
	text: {
		type: String,
		required: true,
	},
	user: {
		type: Types.ObjectId,
		ref: 'User',
	},
})

const Message = model('Message', schema)

export default Message
