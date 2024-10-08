export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html style={{ padding: '0px', margin: '0px' }}>
			<body>{children}</body>
		</html>
	);
}
