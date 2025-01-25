import { useUser } from '../context/UserContext';

const DFmessenger = () => {
	const { user } = useUser();
	if (user?.id === '' || user?.role === 'admin' || user?.role === 'staff') {
		return null; // Return null if user is not logged in. This prevents the messenger from being loaded when not logged in.
	}
	return (
		<df-messenger
			intent='WELCOME'
			chat-title='Chăm sóc khách hàng	'
			agent-id='1afc3b5c-44b8-49ac-9acc-3f838090507d'
			language-code='en'
		></df-messenger>
	);
};

export default DFmessenger;
