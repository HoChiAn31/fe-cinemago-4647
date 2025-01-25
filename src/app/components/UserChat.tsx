// components/UserChat.tsx
import React, { useEffect, useState } from 'react';
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

const UserChat: React.FC = () => {
	const { user } = useUser();
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState('');

	useEffect(() => {
		if (!user) return;
		console.log(user);
		// Lấy lịch sử tin nhắn
		axios
			.get<Message[]>('/chat/messages')
			.then((response) => setMessages(response.data))
			.catch((error) => console.error(error));

		// Lắng nghe tin nhắn mới
		socket.on('receive_message', (message: Message) => {
			if (
				(message.sender.id === user.id && message.receiver.role === 'admin') ||
				message.receiver.role === 'staff' ||
				message.sender.role === 'admin' ||
				(message.sender.role === 'staff' && message.receiver.id === user.id)
			) {
				setMessages((prev) => [...prev, message]);
			}
		});

		// Cleanup
		return () => {
			socket.off('receive_message');
		};
	}, [user]);

	const sendMessage = () => {
		if (input.trim() === '' || !user) return;

		const message = {
			receiverId: '515867ef-5257-43e8-8e3d-eccc18c15ac1', // Admin ID hoặc một cách khác để định vị admin
			content: input,
		};

		socket.emit('send_message', message);
		setInput('');
	};

	return (
		<div>
			<div
				style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}
			>
				{messages.map((msg) => (
					<div
						key={msg.id}
						style={{ padding: '5px', textAlign: msg.sender.id === user?.id ? 'right' : 'left' }}
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
		</div>
	);
};

export default UserChat;
