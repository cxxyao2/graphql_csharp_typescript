import React from 'react'
import api from '../../app/api'
import { useNavigate } from 'react-router-dom'

const baseURL = import.meta.env.VITE_APP_API_HTTPS_URL

type Props = {
	email: string
	password: string
}

const LoginForm = () => {
	const navigate = useNavigate()
	const userName = 'reactUser0'
	const password = 'string'

	const handleLogin = async (e) => {
		e.preventDefault()
		try {
			const response = await api.post(baseURL + '/auth/login', {
				userName,
				password
			})
			const { accessToken } = response.data
			localStorage.setItem('accessToken', accessToken)
			navigate('/')
		} catch (error) {
			console.error('Login failed', error)
		}
	}
	return (
		<div>
			LoginForm
			<button onClick={handleLogin}>login</button>
		</div>
	)
}

export default LoginForm
