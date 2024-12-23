'use client';

import React, { FC } from 'react';
import { useLocale } from 'next-intl';

const TransactionTermsPage: FC = () => {
	const locale = useLocale();

	return (
		<div className='container mx-auto my-10'>
			<div className='mx-4 flex flex-col items-center justify-center gap-10 md:mx-0'>
				<div className='flex w-full flex-col items-center justify-center gap-5'>
					<h1 className='mx-5 text-center text-4xl font-extrabold uppercase md:mx-0'>
						{locale === 'vi' ? 'Điều khoản giao dịch' : 'Transaction Terms'}
					</h1>
					<div className='flex flex-col gap-2'>
						<p className='text-md'>
							{locale === 'vi'
								? 'Cinemago cam kết cung cấp dịch vụ tốt nhất cho khách hàng. Điều khoản giao dịch này quy định các quyền và nghĩa vụ của khách hàng khi sử dụng các dịch vụ của Cinemago.'
								: 'Cinemago is committed to providing the best services to customers. These transaction terms outline the rights and obligations of customers when using Cinemago services.'}
						</p>
						<p className='text-md'>
							{locale === 'vi'
								? 'Khi thực hiện giao dịch trên website Cinemago, Quý Khách Hàng đồng ý tuân thủ các điều khoản và điều kiện được nêu dưới đây.'
								: 'By conducting transactions on the Cinemago website, you agree to comply with the terms and conditions outlined below.'}
						</p>
						<p className='text-md'>
							{locale === 'vi'
								? 'Mọi giao dịch thanh toán, đổi/trả vé hoặc dịch vụ khác sẽ được thực hiện theo quy định hiện hành của Cinemago.'
								: 'All payment transactions, ticket exchanges/returns, or other services will be carried out in accordance with Cinemago’s current regulations.'}
						</p>
						<p className='text-md'>
							{locale === 'vi'
								? 'Khách hàng cần cung cấp thông tin chính xác khi thực hiện giao dịch. Cinemago không chịu trách nhiệm đối với các sai sót do khách hàng cung cấp thông tin không chính xác.'
								: 'Customers must provide accurate information when conducting transactions. Cinemago is not responsible for errors caused by inaccurate information provided by customers.'}
						</p>
						<p className='text-md'>
							{locale === 'vi'
								? 'Trường hợp có tranh chấp, hai bên sẽ cố gắng giải quyết thông qua thương lượng. Nếu không đạt được thỏa thuận, tranh chấp sẽ được giải quyết theo quy định của pháp luật Việt Nam.'
								: 'In case of disputes, both parties will attempt to resolve them through negotiation. If no agreement is reached, disputes will be resolved in accordance with Vietnamese law.'}
						</p>
					</div>
				</div>

				<div className='flex w-full flex-col items-center justify-center gap-5'>
					<h2 className='mx-5 text-center text-2xl font-bold uppercase md:mx-0'>
						{locale === 'vi' ? 'Quy định chi tiết' : 'Detailed Regulations'}
					</h2>
					<div className='flex flex-col gap-2'>
						<p className='text-md'>
							{locale === 'vi'
								? '1. Khách hàng có trách nhiệm kiểm tra thông tin giao dịch trước khi xác nhận.'
								: '1. Customers are responsible for checking transaction information before confirmation.'}
						</p>
						<p className='text-md'>
							{locale === 'vi'
								? '2. Vé đã mua không được hoàn trả trừ trường hợp Cinemago có thông báo khác.'
								: '2. Purchased tickets are non-refundable unless otherwise notified by Cinemago.'}
						</p>
						<p className='text-md'>
							{locale === 'vi'
								? '3. Cinemago bảo lưu quyền từ chối cung cấp dịch vụ nếu phát hiện hành vi vi phạm quy định.'
								: '3. Cinemago reserves the right to refuse service if violations of regulations are detected.'}
						</p>
						<p className='text-md'>
							{locale === 'vi'
								? '4. Khách hàng cần tuân thủ các quy định tại rạp chiếu phim khi sử dụng dịch vụ.'
								: '4. Customers must comply with cinema regulations when using services.'}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TransactionTermsPage;
