import React, { useState, useEffect, useRef } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

import {
	StyledChat,
	MessageBody,
	Message,
	MessageContent,
	SistemMessage,
} from './Styles'
import Form from './Form'

import { StyledButton } from '../../components/Styles'

const Chat = ({ socket, username, room, setShowChat }) => {
	const [messageList, setMessageList] = useState([])

	const cleanInput = useRef()

	const sendMessage = async ({ currentMessage }) => {
		if (currentMessage !== '') {
			const messageData = {
				room,
				author: username,
				message: currentMessage,
				time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
			}

			await socket.emit('sendMessage', messageData)
			setMessageList((list) => [...list, messageData])

			cleanInput.current.vaciarInput()
			
		}
	}

	const leaveRoom = () => {
		socket.emit('leaveRoom')
		setShowChat(false)
	}
	
	useEffect(() => {
		console.log(`${username} ${room}`)
		socket.on('receiveMessage', (data) => {
			setMessageList((list) => [...list, data])
		})
	}, [socket])

	return (
		<StyledChat>
			<h1>Chat</h1>
			<StyledButton onClick={leaveRoom} >Salir</StyledButton>
			<div className={'Chat'}>
				<MessageBody className='chat-body' >
					<ScrollToBottom className={'scrollBody'}>
						{ messageList.map((messageContent, key) => {
							return (
								<Message className={messageContent.author === username ? 'own' : '' } key={key} >
									{ messageContent.author === 'sistema' ? (
										<SistemMessage>
											<p><strong>{ messageContent.message }</strong></p>
											<div>
												<p>{ messageContent.time }</p>
											</div>
										</SistemMessage>
									) : (
										<MessageContent className='message-content'>
											<p>{ messageContent.message }</p>
											<div className='message-meta'>
												<p>{ messageContent.time }</p>
												<p><strong>{ messageContent.author }</strong></p>
											</div>
										</MessageContent>
									)}
								</Message>
							)
						})}
					</ScrollToBottom>
				</MessageBody>
				<Form sendMessage={sendMessage} ref={cleanInput} />
			</div>
		</StyledChat>
	)
}

export default Chat