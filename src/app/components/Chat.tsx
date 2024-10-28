// import { useEffect, useState } from 'react';
// import io, { Socket } from 'socket.io-client';
// import axios from 'axios';

// interface Message {
// 	id: number;
// 	sender: string;
// 	receiver: string;
// 	content: string;
// 	createdAt: string;
// }

// interface ChatProps {
// 	currentUser: string;
// 	otherUser: string;
// }

// const socket: Socket = io('http://localhost:5000');

// const Chat: React.FC<ChatProps> = ({ currentUser, otherUser }) => {
// 	const [messages, setMessages] = useState<Message[]>([]);
// 	const [input, setInput] = useState('');

// 	useEffect(() => {
// 		// Lấy lịch sử tin nhắn
// 		axios
// 			.get<Message[]>('http://localhost:5000/chat/messages', {
// 				params: { sender: currentUser, receiver: otherUser },
// 			})
// 			.then((response) => setMessages(response.data))
// 			.catch((error) => console.error(error));

// 		// Lắng nghe tin nhắn mới
// 		socket.on('receive_message', (message: Message) => {
// 			if (
// 				(message.sender === currentUser && message.receiver === otherUser) ||
// 				(message.sender === otherUser && message.receiver === currentUser)
// 			) {
// 				setMessages((prev) => [...prev, message]);
// 			}
// 		});

// 		// Cleanup
// 		return () => {
// 			socket.off('receive_message');
// 		};
// 	}, [currentUser, otherUser]);

// 	const sendMessage = () => {
// 		if (input.trim() === '') return;

// 		const message = {
// 			sender: currentUser,
// 			receiver: otherUser,
// 			content: input,
// 		};

// 		socket.emit('send_message', message);
// 		setInput('');
// 	};

// 	return (
// 		<div>
// 			<div
// 				style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}
// 			>
// 				{messages.map((msg) => (
// 					<div
// 						key={msg.id}
// 						style={{ padding: '5px', textAlign: msg.sender === currentUser ? 'right' : 'left' }}
// 					>
// 						<strong>{msg.sender}:</strong> {msg.content}
// 						<div style={{ fontSize: '0.8em', color: '#999' }}>
// 							{new Date(msg.createdAt).toLocaleString()}
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 			<div style={{ marginTop: '10px', display: 'flex' }}>
// 				<input
// 					type='text'
// 					value={input}
// 					onChange={(e) => setInput(e.target.value)}
// 					onKeyPress={(e) => {
// 						if (e.key === 'Enter') sendMessage();
// 					}}
// 					style={{ flex: 1, padding: '10px' }}
// 					placeholder='Nhập tin nhắn...'
// 				/>
// 				<button onClick={sendMessage} style={{ padding: '10px 20px' }}>
// 					Gửi
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// export default Chat;
