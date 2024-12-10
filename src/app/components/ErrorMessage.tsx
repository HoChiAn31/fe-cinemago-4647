import { FC } from 'react';
import { CircleAlert } from 'lucide-react';

interface ErrorMessageProps {
	error: string | undefined;
	touched: boolean | undefined;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ error, touched }) => {
	return (
		<>
			{error && touched ? (
				<div className='absolute flex items-center gap-1 text-xs text-red-600'>
					<CircleAlert height={16} width={16} />
					{error}
				</div>
			) : null}
		</>
	);
};

export default ErrorMessage;
