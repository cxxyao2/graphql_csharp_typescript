import React from 'react'
import api from '../../app/api'
import { useNavigate } from 'react-router-dom'

// name: default value is  infered from the email address, e.g. emai is aa@gmail.com, name is aa.
type Props = {
	email: string
	password: string
	name: string
}

const httpUrl = import.meta.env.VITE_APP_API_HTTPS_URL
const RegisterForm = () => {
	const navigate = useNavigate()
	const randomInt = Math.round(Math.random() * 100)
	const userName = 'reactUser' + randomInt
	const password = 'string'
	const email = 'reactUser' + randomInt + '@example.com'

	const handleRegister = async (e) => {
		e.preventDefault()
		try {
			const response = await api.post(httpUrl + '/auth/register', {
				name: userName,
				password,
				email
			})
			const { message } = response.data
			console.log('message is ', message)

			navigate('/login')
		} catch (error) {
			console.error('Register failed', error)
		}
	}
	return (
		<div>
			RegisterForm
			<button onClick={handleRegister}>register</button>
		</div>
	)
}

export default RegisterForm
