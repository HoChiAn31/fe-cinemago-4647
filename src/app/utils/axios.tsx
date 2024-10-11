// // utils/axios.ts
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { TokenResponse } from '../types';

// // Tạo instance của axios
// const instance = axios.create({
// 	baseURL: 'http://localhost:5000', // Thay đổi thành URL backend của bạn
// });

// // Thêm interceptor để gửi token trong header
// instance.interceptors.request.use(
// 	(config) => {
// 		const token = Cookies.get('access_token');
// 		if (token && config.headers) {
// 			config.headers['Authorization'] = `Bearer ${token}`;
// 		}
// 		return config;
// 	},
// 	(error) => Promise.reject(error),
// );

// // Thêm interceptor để xử lý refresh token khi token hết hạn
// instance.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		const originalRequest = error.config;
// 		if (error.response?.status === 401 && !originalRequest._retry && Cookies.get('refresh_token')) {
// 			originalRequest._retry = true;
// 			try {
// 				const response = await axios.post<TokenResponse>(
// 					'http://localhost:5000/auth/refresh-token',
// 					{
// 						refreshToken: Cookies.get('refresh_token'),
// 					},
// 				);
// 				const { access_token, refreshToken } = response.data;
// 				Cookies.set('access_token', access_token, { expires: 7 });
// 				Cookies.set('refresh_token', refreshToken, { expires: 30 });
// 				// Cập nhật header Authorization cho request gốc
// 				if (originalRequest.headers) {
// 					originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
// 				}
// 				return instance(originalRequest);
// 			} catch (err) {
// 				// Nếu refresh token cũng hết hạn, đăng xuất người dùng
// 				Cookies.remove('access_token');
// 				Cookies.remove('refresh_token');
// 				window.location.href = '/login';
// 				return Promise.reject(err);
// 			}
// 		}
// 		return Promise.reject(error);
// 	},
// );

// export default instance;
// utils/axios.ts
import axios from 'axios';
import { getCookie, setCookie, deleteCookie } from 'cookies-next'; // Import from cookies-next
import { TokenResponse } from '../types';

const customAxios = axios.create({
	baseURL: 'http://localhost:5000', // Your backend URL
});

// Interceptor to add the token in the headers
customAxios.interceptors.request.use(
	(config) => {
		// Retrieve the access token from cookies
		const accessToken = getCookie('access_token');

		if (accessToken && config.headers) {
			config.headers['Authorization'] = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// Interceptor to handle token refresh
customAxios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			// Retrieve the refresh token from cookies
			const refreshToken = getCookie('refresh_token');

			if (refreshToken) {
				try {
					const response = await axios.post<TokenResponse>(
						'http://localhost:5000/auth/refresh-token',
						{ refreshToken },
					);
					const { access_token, refreshToken: newRefreshToken } = response.data;

					// Set the new access and refresh tokens in cookies
					setCookie('access_token', access_token, { maxAge: 7 * 24 * 3600 });
					setCookie('refresh_token', newRefreshToken, { maxAge: 30 * 24 * 3600 });

					// Update the original request's Authorization header and retry the request
					originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
					return customAxios(originalRequest);
				} catch (err) {
					// Handle error and log out if refresh fails
					deleteCookie('access_token');
					deleteCookie('refresh_token');
					if (typeof window !== 'undefined') {
						window.location.href = '/login';
					}
					return Promise.reject(err);
				}
			}
		}
		return Promise.reject(error);
	},
);

export default customAxios;
