export const messages = {
	model: 'Message',
	foreignKeys: {
		userId: {
			model: 'User',
			field: 'id',
		},
	},
	data: [
		{
			userId: 1,
			text: 'Hello world!',
		},
		{
			userId: 1,
			text: 'Hello again!',
		},
		{
			userId: 2,
			text: 'Hi! How are you ?',
		},
	],
}
