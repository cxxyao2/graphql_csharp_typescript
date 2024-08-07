
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import api from '../../app/api'
import { Container, Grid, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import OmTextField from '../../components/FormsUI/OmTextField'
import OmSubmitButton from '../../components/FormsUI/OmSubmitButton'

const baseURL = import.meta.env.VITE_APP_API_HTTPS_URL

const FORM_VALIDATION = Yup.object().shape({
	email: Yup.string()
		.email('Invalid email address')
		.required('Email is required'),
	password: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required')
})

const LoginForm = () => {
	const navigate = useNavigate()

	const INITIAL_FORM_STATE = {
		email: '',
		password: ''
	}

	const handleLogin = async ({
		email,
		password
	}: {
		email: string
		password: string
	}) => {
		try {
			const response = await api.post(baseURL + '/auth/login', {
				userName: email,
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
		<Container>
			<div>
				<Formik
					initialValues={INITIAL_FORM_STATE}
					validationSchema={FORM_VALIDATION}
					onSubmit={handleLogin}>
					<Form
						placeholder={undefined}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Typography variant='h6' align='center'>
									Login
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
								<OmSubmitButton otherProps={{}}>Login</OmSubmitButton>
							</Grid>
						</Grid>
					</Form>
				</Formik>
			</div>
		</Container>
	)
}

export default LoginForm
