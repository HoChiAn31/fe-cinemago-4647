'use client';
import { FC } from 'react';
import Link from 'next/link';
import MaxWidth from '../components/MaxWidth';
import Links from '../components/Links';
import { useTranslations } from 'next-intl';
import { Image } from '@nextui-org/react';
import { useTheme } from '../context/ThemeContext';

const Footer: FC = () => {
	const t = useTranslations('LayoutFooter');
	const { isDarkMode } = useTheme();
	const theaters = t.raw('theaterSystem.theaters') as { name: string }[];

	return (
		<div
			className={`bg-gray-900 py-10 ${isDarkMode ? 'bg-dark text-white' : 'border-t border-t-gray1 bg-white text-black'}`}
		>
			<MaxWidth>
				<div className='container mx-auto px-6'>
					<div className='flex flex-wrap justify-between space-y-8 md:space-y-0'>
						{/* Company Info */}
						<div className='mb-6 w-full sm:w-1/2 md:w-1/4'>
							<div className='flex items-center justify-center'>
								<Image src='/images/logo1.png' width={200} height={100} alt='Logo' />
							</div>
							<p className='text-gray-400 mt-4 text-sm'>{t('companyInfo.description')}</p>
						</div>

						{/* Links */}
						<div className='mb-6 w-full sm:w-1/2 md:w-1/5'>
							<h3 className='mb-4 text-xl font-semibold'>{t('quickLinks.title')}</h3>
							<ul className='text-gray-400 flex flex-col gap-2 text-base'>
								<li>
									<Links href='/' className='text-red-400'>
										{t('quickLinks.home')}
									</Links>
								</li>
								<li>
									<Links href='/about'>{t('quickLinks.about')}</Links>
								</li>
								<li>
									<Links href='/contact'>{t('quickLinks.contact')}</Links>
								</li>
								<li>
									<Links href='/terms'>{t('quickLinks.terms')}</Links>
								</li>
								<li>
									<Links hover='white' href='/privacy'>
										{t('quickLinks.privacy')}
									</Links>
								</li>
							</ul>
						</div>
						{/* Links */}
						<div className='mb-6 w-full sm:w-1/2 md:w-1/5'>
							<h3 className='mb-4 text-xl font-semibold'>{t('theaterSystem.title')}</h3>
							<ul className='text-gray-400 flex flex-col gap-2 text-base'>
								{Array.isArray(theaters)
									? theaters.map((theater, index) => (
											<li key={index}>
												<Links hover='white' href='/'>
													{theater.name}
												</Links>
											</li>
										))
									: null}
							</ul>
						</div>
						{/* Contact Info */}
						<div className='mb-6 w-full sm:w-1/2 md:w-1/5'>
							<h3 className='mb-4 text-xl font-semibold'>{t('contactInfo.title')}</h3>
							<div className='flex flex-col gap-2'>
								<p className='text-gray-400 text-base'>{t('contactInfo.address')}</p>
								<p className='text-gray-400 text-base'>{t('contactInfo.city')}</p>
								<p className='text-gray-400 text-base'>{t('contactInfo.phone')}</p>
								<p className='text-gray-400 text-base'>{t('contactInfo.email')}</p>
							</div>
							<div>
								<div className='my-4 grid grid-cols-4 gap-4'>
									<a
										href='https://facebook.com'
										target='_blank'
										rel='noopener noreferrer'
										aria-label={t('followUs.facebook')}
									>
										<img
											src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/800px-Facebook_Logo_%282019%29.png'
											alt={t('followUs.facebook')}
											className='h-8 w-8'
										/>
									</a>
									<a
										href='https://instagram.com'
										target='_blank'
										rel='noopener noreferrer'
										aria-label={t('followUs.instagram')}
									>
										<img
											src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png'
											alt={t('followUs.instagram')}
											className='h-8 w-8'
										/>
									</a>
									<a
										href='https://youtube.com'
										target='_blank'
										rel='noopener noreferrer'
										aria-label={t('followUs.youtube')}
									>
										<img
											src='https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png'
											alt={t('followUs.youtube')}
											className='h-8 w-10'
										/>
									</a>
									<a
										href='https://youtube.com'
										target='_blank'
										rel='noopener noreferrer'
										aria-label={t('followUs.youtube')}
									>
										<img
											src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/1200px-Icon_of_Zalo.svg.png'
											alt={t('followUs.youtube')}
											className='h-8 w-10'
										/>
									</a>
								</div>
							</div>
						</div>
					</div>

					<div className='text-gray-400 text-re mt-8 text-center text-sm'>
						<p>{t('copyright', { year: new Date().getFullYear() })}</p>
					</div>
				</div>
			</MaxWidth>
		</div>
	);
};

export default Footer;
