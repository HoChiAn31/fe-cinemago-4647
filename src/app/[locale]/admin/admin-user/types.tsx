// Define the User type
export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	// Add other relevant fields
}

export interface UserAdd {
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	password: string;
	// Add other relevant fields
}
