const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')

const { Server } = require('socket.io')

const { addUser, removeUser, getUsersInRoom, getUser } = require('./utils/users')

const server = http.createServer(app)
app.use(cors())

const io = new Server(server, {
	cors: {
		origin: 'https://624eeb34534efc0d7edbf160--chatclient.netlify.app',
		// origin: 'http://localhost:3000',
		methods: ['GET', 'POST']
	}
})

io.on('connection', (socket) => {
	console.log('Usuario conectado: ' + socket.id)

	socket.on('join', (data) => {
		const { user } = addUser({
			id: socket.id, name: data.username, room: data.room
		})

		const messageData = {
			room: data.room,
			author: 'sistema',
			message: `${user.name} se ha unido`,
			time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
		}
		socket.broadcast.to(user.room).emit('receiveMessage', messageData)

		socket.broadcast.to(user.room).emit('UserList', getUsersInRoom(user.room))

		socket.join(user.room)
		console.log(`Usuario: ${user.name}: ${user.id} se unio al room: ${user.room}`)
	})

	socket.on('leaveRoom', () => {
		const user = getUser(socket.id)

		const messageData = {
			room: user.room,
			author: 'sistema',
			message: `${user.name} a salido`,
			time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
		}
		socket.to(user.room).emit('receiveMessage', messageData)
		removeUser(user.id)
	})

	socket.on('sendMessage', (data) => {
		socket.to(data.room).emit('receiveMessage', data)
	})

	socket.on('disconnect', () => {
		console.log('Usuario desconectado: ' + socket.id)
		const user = getUser(socket.id)

		if (user) {
			const messageData = {
				room: user.room,
				author: 'sistema',
				message: `${user.name} a salido`,
				time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
			}
			socket.to(user.room).emit('receiveMessage', messageData)
		}

		removeUser(socket.id)
	})
})

server.listen(3001, () => {
	console.log('escuchando en *:3001')
})
