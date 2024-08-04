import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import api from '../../app/api'
import { Container, Grid, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import OmTextField from '../../components/FormsUI/OmTextField'
import OmSubmitButton from '../../components/FormsUI/OmSubmitButton'

const httpUrl = import.meta.env.VITE_APP_API_HTTPS_URL
const FORM_VALIDATION = Yup.object().shape({
	email: Yup.string()
		.email('Invalid email address')
		.required('Email is required'),
	password: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Passwords must match')
		.required('Confirm Password is required')
})

const RegisterForm = () => {
	const navigate = useNavigate()

	const INITIAL_FORM_STATE = {
		email: '',
		password: '',
		confirmPassword: ''
	}

	const handleRegister = async ({
		email,
		password
	}: {
		email: string
		password: string
		confirmPassword: string
	}) => {
		try {
			const response = await api.post(httpUrl + '/auth/register', {
				name: email,
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
		<Container>
			<div>
				<Formik
					initialValues={INITIAL_FORM_STATE}
					validationSchema={FORM_VALIDATION}
					onSubmit={handleRegister}>
					<Form
						placeholder={undefined}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Typography variant='h6' align='center'>
									Register
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<OmTextField name='email' otherProps={{ label: 'Email' }} />
							</Grid>
							<Grid item xs={12}>
								<OmTextField
									name='password'
									otherProps={{ label: 'Password', type: 'password' }}
								/>
							</Grid>

							<Grid item xs={12}>
								<OmTextField
									name='confirmPassword'
									otherProps={{ label: 'Confirm Password', type: 'password' }}
								/>
							</Grid>

							<Grid item xs={12}>
								<OmSubmitButton otherProps={{}}>Login</OmSubmitButton>
							</Grid>
						</Grid>
					</Form>
				</Formik>
			</div>
		</Container>
	)
}

export default RegisterForm
