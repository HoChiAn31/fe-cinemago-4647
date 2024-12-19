'use client';

import React, { FC } from 'react';
import { useLocale } from 'next-intl';

const ContactPage: FC = () => {
	const locale = useLocale();

	return (
		<div className='container mx-auto my-10'>
			<div className='mx-4 flex flex-col items-center justify-center gap-10 md:mx-0'>
				<div className='flex w-full flex-col items-center justify-center gap-5'>
					<h1 className='mx-5 text-center text-4xl font-extrabold uppercase md:mx-0'>
						{locale === 'vi' ? 'Quy định chung' : 'General Regulations'}
					</h1>
					<div className='flex flex-col gap-2'>
						<p>
							{locale === 'vi'
								? 'Chào mừng và cảm ơn Quý Khách Hàng đã đến với website: cinemago.com.vn thuộc quyền sở hữu và quản lý của Công ty Cổ phần Giải trí – Phát hành phim – Rạp chiếu phim Cinemago tại địa chỉ: 135 Hai Bà Trưng, Phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh.'
								: 'Welcome and thank you for visiting the website: cinemago.com.vn, owned and operated by Cinemago Entertainment – Film Distribution – Cinema Joint Stock Company located at 135 Hai Bà Trưng, Ben Nghe Ward, District 1, Ho Chi Minh City.'}
						</p>
						<p>
							{locale === 'vi'
								? 'Website này được sử dụng cho các hoạt động của Cinemago, các chi nhánh phụ thuộc, các công ty con, công ty thành viên và các tổ chức liên quan do Cinemago góp vốn đầu tư (được gọi chung là Cinemago trong quy định chung này).'
								: 'This website is used for the operations of Cinemago, its dependent branches, subsidiaries, affiliates, and related organizations funded by Cinemago (collectively referred to as Cinemago in these general regulations).'}
						</p>
						<p>
							{locale === 'vi'
								? 'Khi truy cập vào đường dẫn: http://www.cinemago.com.vn, Quý Khách Hàng phải có độ tuổi phù hợp theo quy định của pháp luật. Trường hợp Quý Khách Hàng là trẻ em, người chưa thành niên, vui lòng chỉ truy cập website sau khi có sự đồng ý của người giám hộ hợp pháp.'
								: 'When accessing the link: http://www.cinemago.com.vn, customers must meet the legal age requirements. If you are a child or minor, please only access the website with the consent of a legal guardian.'}
						</p>
						<p>
							{locale === 'vi'
								? 'Bằng việc truy cập, sử dụng, thao tác trên website, Quý Khách Hàng đã chấp nhận toàn bộ nội dung của Quy Định Chung và các chính sách bổ sung liên tục cập nhật của Cinemago. Trường hợp Quý Khách Hàng không đồng ý với các điều khoản chung này, vui lòng không sử dụng website.'
								: 'By accessing, using, or interacting with the website, you accept all the content of the General Regulations and continuously updated policies of Cinemago. If you do not agree with these general terms, please do not use the website.'}
						</p>
					</div>
				</div>

				<div>
					<h1>Điều khoản giao dịch</h1>
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
