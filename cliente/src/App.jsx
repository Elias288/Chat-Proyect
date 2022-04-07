import React, { useState } from 'react'
import io from 'socket.io-client'
import Chat from './pages/Chat'
import JoinForm from './pages/Join'

import './App.css'

// const socket = io.connect('http://localhost:3001')
const socket = io.connect('https://eleli-chat-server.herokuapp.com/')

function App() {
	const [username, setUsername] = useState('')
	const [room, setRoom] = useState('')
	const [ShowChat, setShowChat] = useState(false)

	const joinRoom = (e) => {
		e.preventDefault()

		if (username !== '' && room !== '') {
			socket.emit('join', { username, room })
			setShowChat(true)
		}
	}

	return (
		<div className="App">
			{ !ShowChat ? (
				<JoinForm 
					Username={setUsername}
					Room={setRoom}
					join={joinRoom}
				/>
			) : (
				<Chat 
					socket={socket}
					username={username}
					room={room}
					setShowChat={setShowChat}
				/>
			) }

		</div>
	)
}

export default App