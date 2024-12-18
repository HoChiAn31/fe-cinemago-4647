'use client';

import React, { FC } from 'react';
import { useLocale } from 'next-intl';

const PolicyPage: FC = () => {
	const locale = useLocale();

	return (
		<div className='container mx-auto my-10'>
			<div className='mx-4 flex flex-col items-center justify-center gap-10 md:mx-0'>
				<div className='flex w-full flex-col items-center justify-center gap-5'>
					<h1 className='mx-5 text-center text-4xl font-extrabold uppercase md:mx-0'>
						{locale === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy'}
					</h1>
					<div className='flex flex-col gap-2'>
						<p className='text-md'>
							{locale === 'vi'
								? 'Chúng tôi, Công ty Cổ phần Giải trí - Phát hành phim - Rạp chiếu phim Ngôi Sao (sau đây gọi là “Cinemago”, hay “chúng tôi”), hiểu rằng Quý Khách hàng quan tâm đến toàn bộ cách thức chúng tôi xử lý và bảo vệ dữ liệu cá nhân của Quý Khách hàng ra sao trong khuôn khổ pháp luật cũng như chuẩn mực bảo mật tại Cinemago. Chúng tôi rất coi trọng sự tin tưởng của Quý Khách hàng, vì vậy Cinemago sẽ sử dụng những dữ liệu mà Quý Khách hàng cung cấp một cách cẩn thận và hợp lý, phù hợp với quy định của pháp luật.'
								: 'We, Star Cinema - Film Distribution - Entertainment Joint Stock Company (hereinafter referred to as “Cinemago”, or “we”), understand your concerns about how we handle and protect your personal data within the legal framework and security standards at Cinemago. We value your trust, so Cinemago will handle your data carefully and responsibly, in compliance with the law.'}
						</p>
						<p className='text-md'>
							{locale === 'vi'
								? 'Website: www.cinemago.com.vn và ứng dụng Cinemago (sau đây gọi chung là “website”) thuộc quyền sở hữu của Công ty Cổ phần Giải trí – Phát hành Phim – Rạp Chiếu Phim Ngôi Sao, địa chỉ: 135 Hai Bà Trưng, phường Bến Nghé, quận 1, Thành phố Hồ Chí Minh. Website này được sử dụng cho các hoạt động thương mại điện tử của Cinemago Cinemas, bao gồm cả các chi nhánh trực thuộc, địa điểm kinh doanh, các công ty thành viên, công ty do Cinemago Cinemas góp vốn và các tổ chức liên quan. Cinemago Cinemas sẽ xử lý dữ liệu cá nhân từ khách hàng với mục đích đúng đắn theo thỏa thuận, tuân thủ yêu cầu của pháp luật hoặc các mục đích khác được nêu tại chính sách bảo mật dữ liệu cá nhân dưới đây.'
								: 'The website www.cinemago.com.vn and the Cinemago app (hereinafter collectively referred to as the "website") are owned by Star Cinema - Film Distribution - Entertainment Joint Stock Company, located at 135 Hai Ba Trung, Ben Nghe Ward, District 1, Ho Chi Minh City. This website is used for Cinemago Cinemas’ e-commerce activities, including branches, business locations, member companies, Cinemago-invested companies, and affiliated organizations. Cinemago Cinemas processes personal data for legitimate purposes as agreed, in compliance with the law or as stated in the privacy policy below.'}
						</p>
						<p className='text-md'>
							{locale === 'vi'
								? 'Chính sách bảo mật dữ liệu cá nhân (sau đây gọi tắt là "Chính Sách Bảo Mật" hay "Chính Sách") được tạo ra nhằm cung cấp các thông tin tổng quát về việc xử lý dữ liệu cá nhân, bao gồm các hoạt động: thu thập, ghi, phân tích, xác nhận, lưu trữ, chỉnh sửa, công khai, kết hợp, truy cập, truy xuất, thu hồi, mã hóa, giải mã, sao chép, chia sẻ, truyền đưa, cung cấp, chuyển giao, xóa, hủy dữ liệu cá nhân hoặc các hành động khác có liên quan mà khách hàng đã cung cấp cho chúng tôi khi tham gia truy cập, giao dịch, cung cấp thông tin trên website của Cinemago, cho dù ở hiện tại hay trong tương lai; cũng như cách mà chúng tôi sẽ hỗ trợ khách hàng trước khi đưa ra bất cứ quyết định nào liên quan đến việc cung cấp dữ liệu cá nhân của khách hàng cho Cinemago.'
								: 'The Personal Data Privacy Policy (hereinafter referred to as the "Privacy Policy" or "Policy") is created to provide general information about the processing of personal data, including activities such as collecting, recording, analyzing, verifying, storing, editing, disclosing, combining, accessing, retrieving, recovering, encrypting, decrypting, copying, sharing, transmitting, providing, transferring, deleting, and destroying personal data or other related actions. This applies to data provided by customers when accessing, transacting, or providing information on Cinemago’s website, both now and in the future. It also explains how we will assist customers before making decisions about providing personal data to Cinemago.'}
						</p>
						<p className='text-md'>
							{locale === 'vi'
								? '"Dữ liệu cá nhân" là các thông tin dưới dạng ký hiệu, chữ viết, chữ số, hình ảnh, âm thanh hoặc dạng tương tự trên môi trường điện tử, gắn liền với một con người cụ thể hoặc giúp xác định một con người cụ thể. Dữ liệu cá nhân bao gồm dữ liệu cá nhân cơ bản và dữ liệu cá nhân nhạy cảm. Dữ liệu cá nhân của khách hàng sau đây được gọi chung là “Thông Tin Khách Hàng”.'
								: '"Personal data" refers to information in the form of symbols, text, numbers, images, sounds, or similar forms in an electronic environment that is associated with or helps identify a specific individual. Personal data includes basic personal data and sensitive personal data. Customer personal data is hereinafter collectively referred to as "Customer Information".'}
						</p>
						<p className='text-md'>
							{locale === 'vi'
								? 'Bằng cách sử dụng dịch vụ, đăng ký tài khoản với Cinemago, ghé thăm website của Cinemago, hoặc truy cập vào dịch vụ, thực hiện giao dịch trên website của Cinemago hoặc các sản phẩm liên quan của chúng tôi, được hiểu là khách hàng đã đọc, hiểu, thừa nhận và đồng ý với các yêu cầu, và/hoặc các chính sách, thực tiễn áp dụng được nêu trong Chính Sách Bảo Mật này (bao gồm cả các phiên bản sửa đổi, bổ sung của Chính Sách). Đồng thời, khách hàng đồng ý với Cinemago về việc xử lý dữ liệu cá nhân của khách hàng theo cách được mô tả trong tài liệu này.'
								: 'By using the service, registering an account with Cinemago, visiting Cinemago’s website, or accessing the services and conducting transactions on Cinemago’s website or related products, you are deemed to have read, understood, acknowledged, and agreed to the requirements, policies, and practices outlined in this Privacy Policy (including its amendments and supplements). You also agree to Cinemago processing your personal data as described in this document.'}
						</p>
						<p className='text-md'>
							{locale === 'vi'
								? 'Quý khách hàng có thể đồng ý một phần hoặc với điều kiện kèm theo. Tuy nhiên, trong khả năng của mình, Cinemago chỉ có thể bắt đầu xử lý dữ liệu của khách hàng khi nhận được sự đồng ý toàn bộ mà không có bất kỳ điều kiện kèm theo nào. Vì vậy, khi chúng tôi cần sự đồng ý từ khách hàng để bắt đầu xử lý dữ liệu, điều này đồng nghĩa với việc chúng tôi cần sự đồng ý toàn bộ từ khách hàng.'
								: 'You may partially agree or agree with conditions. However, Cinemago can only begin processing your data when full and unconditional consent is provided. Therefore, when we require your consent to process data, this means we need complete consent from you.'}
						</p>
						<p className='text-md'>
							{locale === 'vi'
								? 'Quý khách hàng có thể rút lại sự đồng ý theo quy định của pháp luật, trừ trường hợp Cinemago được phép xử lý dữ liệu mà không cần sự đồng ý của khách hàng. Việc khách hàng rút lại sự đồng ý sẽ không ảnh hưởng đến tính hợp pháp của việc xử lý dữ liệu mà chúng tôi đã thực hiện trước khi sự đồng ý bị rút lại. Tuy nhiên, khi khách hàng rút lại sự đồng ý xử lý dữ liệu cá nhân theo Chính Sách Bảo Mật, chúng tôi có thể không thể thực hiện các hành động cần thiết để đạt được mục đích xử lý thông tin, hoặc khách hàng có thể không thể tiếp tục sử dụng sản phẩm, dịch vụ, hay thực hiện hợp đồng với chúng tôi. Trong trường hợp đó, chúng tôi vẫn có thể tiếp tục xử lý dữ liệu cá nhân của khách hàng trong phạm vi được yêu cầu hoặc theo quy định của pháp luật hiện hành.'
								: 'You may withdraw your consent in accordance with the law, except where Cinemago is permitted to process data without your consent. Withdrawal of consent does not affect the legality of data processing carried out before consent was withdrawn. However, withdrawing consent for personal data processing under this Privacy Policy may result in us being unable to perform necessary actions to achieve the intended purposes or may limit your ability to continue using our products, services, or fulfill contracts with us. In such cases, we may still process your personal data to the extent required or permitted by applicable laws.'}
						</p>
					</div>
				</div>

				<div className='flex w-full flex-col items-center justify-center gap-5'>
					<h2 className='mx-5 text-center text-2xl font-bold uppercase md:mx-0'>
						TỔNG QUAN VỀ CHÍNH SÁCH BẢO MẬT
					</h2>
					<div className='flex flex-col gap-2'>
						<p className='text-md'>
							{locale === 'vi'
								? 'Chính Sách Bảo Mật này là một phần trong cam kết bảo vệ và xử lý dữ liệu cá nhân của Công ty Cổ phần Giải trí - Phát hành phim - Rạp chiếu phim Cinemago. Bảo vệ và xử lý dữ liệu cá nhân luôn mang ý nghĩa vô cùng quan trọng đối với chúng tôi. Do đó, thông qua Chính Sách này, chúng tôi mong muốn giải thích một cách minh bạch về toàn bộ cách thức mà chúng tôi bảo vệ và xử lý dữ liệu cá nhân. Điều này bao gồm nhưng không giới hạn ở mục đích, loại dữ liệu, cũng như cách thức chúng tôi xử lý, thu thập, lưu trữ, chia sẻ và sử dụng dữ liệu cá nhân của bạn, nhằm đảm bảo thông tin luôn được giữ bí mật và an toàn.'
								: 'This Privacy Policy is part of our commitment to protecting and processing personal data by Star Cinema - Film Distribution - Entertainment Joint Stock Company. Protecting and processing personal data is always of utmost importance to us. Therefore, through this Policy, we aim to transparently explain all the ways we protect and process personal data. This includes, but is not limited to, the purposes, types of data, and how we process, collect, store, share, and use your personal data, ensuring that the information is always kept confidential and secure.'}
						</p>

						<p className='text-md'>
							{locale === 'vi'
								? 'Chúng tôi luôn duy trì nỗ lực để gửi Chính Sách Bảo Mật này đến bạn, giúp bạn đọc, hiểu và nắm rõ trước khi chúng tôi thực hiện một phần hay toàn bộ các hoạt động xử lý dữ liệu cá nhân. Chính Sách này sẽ giải đáp cho bạn những thông tin, bao gồm nhưng không giới hạn, về:'
								: 'We strive to deliver this Privacy Policy to you, helping you read, understand, and grasp it before we carry out any part or all of the personal data processing activities. This Policy will provide you with information, including but not limited to:'}
						</p>

						<ol className='text-md list-inside list-decimal'>
							<li>
								{locale === 'vi'
									? 'Phạm vi xử lý và cách thức thu thập dữ liệu cá nhân;'
									: 'Scope of processing and methods of collecting personal data;'}
							</li>
							<li>
								{locale === 'vi'
									? 'Mục đích xử lý dữ liệu cá nhân;'
									: 'Purpose of personal data processing;'}
							</li>
							<li>
								{locale === 'vi'
									? 'Lưu giữ và bảo mật dữ liệu cá nhân;'
									: 'Retention and security of personal data;'}
							</li>
							<li>
								{locale === 'vi'
									? 'Thời gian lưu giữ dữ liệu cá nhân;'
									: 'Duration of personal data retention;'}
							</li>
							<li>
								{locale === 'vi'
									? 'Tổ chức, cá nhân được xử lý dữ liệu cá nhân;'
									: 'Organizations and individuals authorized to process personal data;'}
							</li>
							<li>
								{locale === 'vi'
									? 'Quyền và nghĩa vụ của Khách Hàng;'
									: 'Rights and obligations of Customers;'}
							</li>
							<li>
								{locale === 'vi'
									? 'Hậu quả, thiệt hại không mong muốn có thể xảy ra;'
									: 'Unintended consequences and damages that may occur;'}
							</li>
							<li>{locale === 'vi' ? 'Chính sách Cookie;' : 'Cookie Policy;'}</li>
							<li>
								{locale === 'vi'
									? 'Chính sách Hệ thống giám sát (CCTV);'
									: 'CCTV Monitoring Policy;'}
							</li>
							<li>{locale === 'vi' ? 'Cam kết chung;' : 'General Commitments;'}</li>
							<li>{locale === 'vi' ? 'Thông tin liên hệ.' : 'Contact Information.'}</li>
						</ol>

						<p className='text-md'>
							{locale === 'vi'
								? 'Trường hợp chúng tôi thay đổi Chính Sách Bảo Mật, chúng tôi sẽ cập nhật các thay đổi hoặc sửa đổi đó trên website của Cinemago. Phiên bản sửa đổi, bổ sung Chính Sách này (nếu có) sẽ có hiệu lực kể từ ngày các thay đổi được đăng tải trên website. Vì vậy, chúng tôi khuyến nghị Quý Khách Hàng nên định kỳ kiểm tra Chính Sách Bảo Mật trên trang điện tử chính thức của chúng tôi để đảm bảo luôn nắm bắt thông tin mới nhất.'
								: 'In case we change the Privacy Policy, we will update those changes or amendments on Cinemago’s website. The revised or supplemented version of this Policy (if any) will take effect from the date the changes are posted on the website. Therefore, we recommend that you periodically check the Privacy Policy on our official website to ensure you always have the latest information.'}
						</p>

						<p className='text-md'>
							{locale === 'vi'
								? 'Cinemago kính mong Quý Khách Hàng vui lòng đọc Chính Sách Bảo Mật một cách cẩn thận. Nếu Quý Khách Hàng có bất kỳ câu hỏi nào liên quan đến các thông tin này hoặc thực tiễn bảo mật của Cinemago, xin vui lòng liên hệ với chúng tôi qua thông tin được cung cấp ở phần cuối của Chính Sách Bảo Mật này.'
								: 'Cinemago kindly requests that you carefully read the Privacy Policy. If you have any questions regarding this information or Cinemago’s privacy practices, please contact us using the information provided at the end of this Privacy Policy.'}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PolicyPage;
