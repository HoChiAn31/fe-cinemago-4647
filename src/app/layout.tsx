import { ModalProvider } from '@/app/context/ModalContext';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html style={{ padding: '0px', margin: '0px' }}>
			<body>
				<ModalProvider>{children}</ModalProvider>
			</body>
		</html>
	);
}
