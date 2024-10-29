// components/AdminChat.tsx
import { useEffect, useState, useContext } from 'react';
import io, { Socket } from 'socket.io-client';
import axios from '../utils/axios';
import { useUser } from '../context/UserContext';

interface Message {
	id: number;
	sender: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
		role: string;
	};
	receiver: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
		role: string;
	};
	content: string;
	createdAt: string;
}

const socket: Socket = io('http://localhost:5000', {
	query: { token: localStorage.getItem('token') },
});

const AdminChat: React.FC = () => {
	const { user } = useUser();
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState('');
	const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
	const [users, setUsers] = useState<UserSummary[]>([]);

	interface UserSummary {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	}

	useEffect(() => {
		if (!user || user.role !== 'admin') return;

		// Lấy tất cả tin nhắn
		axios
			.get<Message[]>('/chat/messages')
			.then((response) => setMessages(response.data))
			.catch((error) => console.error(error));

		// Lấy danh sách người dùng đã gửi tin nhắn
		axios
			.get('/users') // Tạo API để lấy danh sách người dùng nếu chưa có
			.then((response) => setUsers(response.data))
			.catch((error) => console.error(error));

		// Lắng nghe tin nhắn mới
		socket.on('receive_message', (message: Message) => {
			setMessages((prev) => [...prev, message]);
		});

		// Cleanup
		return () => {
			socket.off('receive_message');
		};
	}, [user]);

	const sendMessage = () => {
		if (input.trim() === '' || !user || !selectedUserId) return;

		const message = {
			receiverId: selectedUserId,
			content: input,
		};

		socket.emit('send_message', message);
		setInput('');
	};

	const handleSelectUser = (userId: string) => {
		setSelectedUserId(userId);
		// Optionally, fetch conversation between admin and user
	};

	return (
		<div style={{ display: 'flex' }}>
			<div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '10px' }}>
				<h3>Người dùng</h3>
				<ul>
					{users.map((u) => (
						<li
							key={u.id}
							onClick={() => handleSelectUser(u.id)}
							style={{ cursor: 'pointer', padding: '5px 0' }}
						>
							{u.firstName} {u.lastName}
						</li>
					))}
				</ul>
			</div>
			<div style={{ flex: 1, padding: '10px' }}>
				{selectedUserId ? (
					<>
						<div
							style={{
								height: '400px',
								overflowY: 'scroll',
								border: '1px solid #ccc',
								padding: '10px',
							}}
						>
							{messages
								.filter(
									(msg) =>
										(msg.sender.id === selectedUserId && msg.receiver.role === 'admin') ||
										msg.receiver.role === 'staff' ||
										msg.sender.role === 'admin' ||
										(msg.sender.role === 'staff' && msg.receiver.id === selectedUserId),
								)
								.map((msg) => (
									<div
										key={msg.id}
										style={{
											padding: '5px',
											textAlign: msg.sender.role === 'admin' ? 'right' : 'left',
										}}
									>
										<strong>{msg.sender.firstName}:</strong> {msg.content}
										<div style={{ fontSize: '0.8em', color: '#999' }}>
											{new Date(msg.createdAt).toLocaleString()}
										</div>
									</div>
								))}
						</div>
						<div style={{ marginTop: '10px', display: 'flex' }}>
							<input
								type='text'
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyPress={(e) => {
									if (e.key === 'Enter') sendMessage();
								}}
								style={{ flex: 1, padding: '10px' }}
								placeholder='Nhập tin nhắn...'
							/>
							<button onClick={sendMessage} style={{ padding: '10px 20px' }}>
								Gửi
							</button>
						</div>
					</>
				) : (
					<p>Chọn một người dùng để chat</p>
				)}
			</div>
		</div>
	);
};

export default AdminChat;
