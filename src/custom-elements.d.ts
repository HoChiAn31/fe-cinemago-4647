declare namespace JSX {
	interface IntrinsicElements {
		'df-messenger': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
			intent?: string;
			'chat-title'?: string;
			'agent-id'?: string;
			'language-code'?: string;
		};
	}
}
