import React from 'react'

import { StyledButton, StyledInputText } from '../../components/Styles'
import { StyledJoin, JoinForm } from './Styles'

const Join = ({ join, Username, Room }) => {
	return (
		<StyledJoin>
			<h1>Registro</h1>
			<JoinForm>
				<StyledInputText
					type={'text'}
					onChange={(e) => Username(e.target.value)}
					placeholder={'Username'}
				/>
				<StyledInputText
					type={'text'}
					onChange={(e) => Room(e.target.value)}
					placeholder={'Room'}
				/>
				<StyledButton onClick={ join }>Entrar</StyledButton>
			</JoinForm>
		</StyledJoin>
	)
}

export default Join