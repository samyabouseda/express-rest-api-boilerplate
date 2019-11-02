import { Schema, Types, model } from 'mongoose'

const schema = new Schema({
	text: {
		type: String,
		required: true,
	},
	user: {
		type: Types.ObjectId,
		ref: 'User',
		// TODO: refactor seeding to include foreign key creation.
		// required: true,
	},
})

const Message = model('Message', schema)

export default Message
