const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')

const { Server } = require('socket.io')

const { addUser, removeUser, getUsersInRoom, getUser } = require('./utils/users')

const port = process.env.PORT || 3001

app.use(cors())

const server = http.createServer(app)

const whiteList = 'https://elelichat.netlify.app'
const io = new Server(server, {
	cors: {
		origin: whiteList,
		methods: ['GET', 'POST']
	}
})

io.on('connection', (socket) => {
	// console.log('Usuario conectado: ' + socket.id)

	socket.on('join', (data) => {
		const { user } = addUser({
			id: socket.id, name: data.username, room: data.room
		})

		if (user) {
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
		} else {
			console.log('Error de usuario')
			removeUser(socket.id)
		}
	})

	socket.on('leaveRoom', () => {
		const user = getUser(socket.id)

		if (user) {
			const messageData = {
				room: user.room,
				author: 'sistema',
				message: `${user.name} a salido`,
				time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
			}
			socket.to(user.room).emit('receiveMessage', messageData)
			removeUser(user.id)
		} else {
			console.log('Error de usuario')
		}
	})

	socket.on('sendMessage', (data) => {
		socket.to(data.room).emit('receiveMessage', data)
	})

	socket.on('disconnect', () => {
		// console.log('Usuario desconectado: ' + socket.id)
		const user = getUser(socket.id)

		if (user) {
			const messageData = {
				room: user.room,
				author: 'sistema',
				message: `${user.name} a salido`,
				time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
			}
			socket.to(user.room).emit('receiveMessage', messageData)
		} else {
			console.log('Error de usuario')
		}

		removeUser(socket.id)
	})
})

server.listen(port, () => {
	console.log(`escuchando en *${port}`)
})
