import React from 'react'

import { StyledButton, StyledInputText } from '../../components/Styles'
import { StyledJoin, JoinForm, Lista } from './Styles'

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

			<Lista>
				<h3>Cosas por hacer</h3>
				<ul>
					<li>listar usuarios en una sala</li>
					<li>Responder mensajes</li>
				</ul>
			</Lista>
		</StyledJoin>
	)
}

export default Join