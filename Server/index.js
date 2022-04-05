const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
	// res.send('<h1>Hello world</h1>')
})

io.on('connection', (socket) => {
	socket.on('chat message', (msg) => {
		io.emit('chat message', msg)
	})
})

server.listen(3000, () => {
	console.log('escuchando en *:3000')
})
