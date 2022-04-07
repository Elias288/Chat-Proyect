import React, { useState, forwardRef, useImperativeHandle } from 'react'

import { StyledButton, StyledInputText } from '../../components/Styles'
import { MessageForm } from './Styles'

const Form = ({ sendMessage }, ref) => {
	const [currentMessage, setCurrentMessage] = useState('')

	const createMessage = (e) => {
		e.preventDefault()
		sendMessage({ currentMessage })
	}

	const vaciarInput = () => setCurrentMessage('')

	useImperativeHandle(ref, () => { return { vaciarInput } })
	
	return (
		<MessageForm className='chat-footer'>
			<StyledInputText
				type={'text'}
				placeholder={'Mensaje'}
				value={currentMessage}
				onChange={(e) => setCurrentMessage(e.target.value)}
			/>
			<StyledButton onClick={ createMessage }>Enviar</StyledButton>
		</MessageForm>
	)
}

export default forwardRef(Form)