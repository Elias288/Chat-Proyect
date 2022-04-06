import React, { useState, useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

import {
	StyledChat,
	MessageBody,
	Message,
	MessageContent,
	MessageForm,
} from './Styles'

const Chat = ({ socket, username, room }) => {
	const [currentMessage, setCurrentMessage] = useState('')
	const [messageList, setMessageList] = useState([])

	const sendMessage = async (e) => {
		e.preventDefault()

		if (currentMessage !== '') {
			const messageData = {
				room,
				author: username,
				message: currentMessage,
				time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
			}

			await socket.emit('send_message', messageData)
			setMessageList((list) => [...list, messageData])

			setCurrentMessage('')
		}
	}
	
	useEffect(() => {
		socket.on('receive_message', (data) => {
			setMessageList((list) => [...list, data])
		})
	}, [socket])

	return (
		<StyledChat>
			<h1>Chat</h1>
			<MessageBody className='chat-body' >
				<ScrollToBottom className={'scrollBody'}>
					{ messageList.map((messageContent, key) => {
						return (
							<Message className={messageContent.author === username ? 'own' : '' } key={key} >
								<div>
									<MessageContent className='message-content'>
										<p>{ messageContent.message }</p>
									</MessageContent>
									<div className='message-meta'>
										<p>{ messageContent.time }</p>
										<p><strong>{ messageContent.author }</strong></p>
									</div>

								</div>
							</Message>
						)
					})}
				</ScrollToBottom>
			</MessageBody>
			<MessageForm className='chat-footer'>
				<input
					type={'text'}
					placeholder={'Mensaje'}
					value={currentMessage}
					onChange={(e) => setCurrentMessage(e.target.value)}
				/>
				<button onClick={ sendMessage }>Enviar</button>
			</MessageForm>
		</StyledChat>
	)
}

export default Chat