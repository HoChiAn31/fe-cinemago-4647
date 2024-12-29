// types/index.ts

export interface User {
	id: string;
	firstName?: string;
	lastName?: string;
	email: string;
	role: string;
	avatar?: string;
}

export interface RegisterUserDto {
	name: string;
	email: string;
	password: string;
}

export interface LoginUserDto {
	email: string;
	password: string;
}

export interface AuthContextType {
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

export interface AuthResponse {
	access_token: string;
	refreshToken: string;
	user: User;
}

export interface TokenResponse {
	access_token: string;
	refreshToken: string;
}
export interface UserContextType {
	user: User | null;
	isLogin: boolean;
	setIsLogin: (value: boolean) => void;
	role: string;
	setRole: (value: string) => void;
	isLoading: boolean;
	setIsLoading: (value: boolean) => void;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}
