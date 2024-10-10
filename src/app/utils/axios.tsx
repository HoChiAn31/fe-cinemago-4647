// utils/axios.ts
import axios from 'axios';
import Cookies from 'js-cookie';
import { TokenResponse } from '../types';

// Tạo instance của axios
const instance = axios.create({
	baseURL: 'http://localhost:5000', // Thay đổi thành URL backend của bạn
});

// Thêm interceptor để gửi token trong header
instance.interceptors.request.use(
	(config) => {
		const token = Cookies.get('access_token');
		if (token && config.headers) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// Thêm interceptor để xử lý refresh token khi token hết hạn
instance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry && Cookies.get('refresh_token')) {
			originalRequest._retry = true;
			try {
				const response = await axios.post<TokenResponse>('/api/refresh-token', {
					refreshToken: Cookies.get('refresh_token'),
				});
				const { access_token, refreshToken } = response.data;
				Cookies.set('access_token', access_token);
				Cookies.set('refresh_token', refreshToken);
				// Cập nhật header Authorization cho request gốc
				if (originalRequest.headers) {
					originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
				}
				return instance(originalRequest);
			} catch (err) {
				// Nếu refresh token cũng hết hạn, đăng xuất người dùng
				Cookies.remove('access_token');
				Cookies.remove('refresh_token');
				window.location.href = '/login';
				return Promise.reject(err);
			}
		}
		return Promise.reject(error);
	},
);

export default instance;
