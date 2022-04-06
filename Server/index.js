const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')

const { Server } = require('socket.io')

const server = http.createServer(app)
app.use(cors())

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST']
	}
})

io.on('connection', (socket) => {
	console.log('Usuario conectado: ' + socket.id)

	socket.on('join', (data) => {
		socket.join(data.room)
		console.log(`Usuario: ${data.username}: ${socket.id} se unio al room: ${data.room}`)
	})

	socket.on('sendMessage', (data) => {
		socket.to(data.room).emit('receiveMessage', data)
	})

	socket.on('disconnect', () => {
		console.log('Usuario desconectado: ' + socket.id)
	})
})

server.listen(3001, () => {
	console.log('escuchando en *:3001')
})
