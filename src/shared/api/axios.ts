import axios from 'axios';

const api = axios.create({
	withCredentials: true,
	baseURL: 'https://64f8d138824680fd21801557.mockapi.io',
});

api.interceptors.request.use((config) => {
	config.headers.Authorization = window.localStorage.getItem('token');
	return config;
});
api.interceptors.response.use(
	(config) => {
		return config;
	},
	async (error) => {
		const originalRequest = { ...error.config };
		originalRequest._isRetry = true;
		if (
			error.response.status === 401 &&
			error.config &&
			!error.config._isRetry
		) {
			try {
				const resp = await api.get('/api/refresh');

				localStorage.setItem('token', resp.data.accessToken);

				return api.request(originalRequest);
			} catch (error) {
				console.log('AUTH ERROR');
			}
		}
		throw error;
	},
);

export default api;
