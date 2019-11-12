export default {
	model: 'Message',
	foreignKeys: {
		user: {
			model: 'User',
			field: 'id',
		},
	},
	data: [
		{
			user: 1,
			text: 'Hello world!',
		},
		{
			user: 1,
			text: 'Hello again!',
		},
		{
			user: 2,
			text: 'Hi! How are you ?',
		},
	],
}
