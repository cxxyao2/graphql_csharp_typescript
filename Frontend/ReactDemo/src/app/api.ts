import axios from 'axios'

const baseURL = import.meta.env.VITE_APP_API_HTTPS_URL
const api = axios.create({
	baseURL: baseURL
})

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('accessToken')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		config.headers['Content-Type'] = 'application/json'
		config.headers['Access-Control-Allow-Origin'] = '*'
		return config
	},
	(error) => {
		Promise.reject(error)
	}
)

api.interceptors.request.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			try {
				const response = await axios.post(baseURL + '/auth/refresh-token')
				const { accessToken } = response.data
				localStorage.setItem('accessToken', accessToken)

				originalRequest.headers.Authorization = `Bearer ${accessToken}`
				originalRequest.headers['Content-Type'] = 'application/json'
				originalRequest.headers['Access-Control-Allow-Origin'] = '*'
				return api(originalRequest)
			} catch (refreshError) {
				console.error('Refresh token failed:', refreshError)
			}
		}

		return Promise.reject(error)
	}
)

export default api
