import React, { useState } from 'react'
import io from 'socket.io-client'
import Chat from './pages/Chat'
import JoinForm from './pages/JoinForm'

import './App.css'

const socket = io.connect('http://localhost:3001')

function App() {
	const [username, setUsername] = useState('')
	const [room, setRoom] = useState('')
	const [ShowChat, setShowChat] = useState(false)

	const joinRoom = (e) => {
		e.preventDefault()
		
		if (username !== '' && room !== '') {
			socket.emit('join_room', room)
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
				/>
			) }

		</div>
	)
}

export default App