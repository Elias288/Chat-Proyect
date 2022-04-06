import React from 'react'

const JoinForm = ({ Username, Room, join }) => {
	return (
		<div>
			<h1>Registro</h1>
			<form>
				<input
					type={'text'}
					onChange={(e) => Username(e.target.value)}
					placeholder={'Username'}
				/>
				<input
					type={'text'}
					onChange={(e) => Room(e.target.value)}
					placeholder={'Room'}
				/>
				<button onClick={ join }>Entrar</button>
			</form>
		</div>
	)
}

export default JoinForm