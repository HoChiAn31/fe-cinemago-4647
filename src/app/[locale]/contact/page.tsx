'use client';

import { FC, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/app/components/Button';
import Image from '@/app/components/Image';
import { Theater } from '@/app/types/Theater.type';
import { theater } from '@/app/modules/data';
import { PhoneCall, Mail, MapPin, ChevronDown, ChevronUp, House } from 'lucide-react';

const ContactPage: FC = () => {
	const t = useTranslations('Contact');
	const [openTheaters, setOpenTheaters] = useState<Theater[]>([]);
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

	useEffect(() => {
		const sortedAndFilteredTheaters = theater
			.filter((item) => item.status === 'open')
			.sort((a, b) => (a.type === 'headquarter' ? -1 : b.type === 'headquarter' ? 1 : 0));
		setOpenTheaters(sortedAndFilteredTheaters);
	}, []);

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Form submitted', formData);
	};

	const toggleDetails = (index: number) => {
		setExpandedIndex(expandedIndex === index ? null : index);
	};

	return (
		<div className='container mx-auto my-10'>
			<div className='flex flex-col gap-20'>
				<div className='flex flex-col items-stretch justify-center gap-16 md:flex-row md:gap-5'>
					{/* Left */}
					<div className='mx-10 flex flex-col gap-10 md:mx-0 md:ml-10 md:w-1/2 md:pr-10 lg:ml-0 lg:gap-20'>
						<h1 className='mx-auto text-center text-4xl font-extrabold uppercase md:text-2xl md:tracking-tight lg:text-4xl lg:tracking-wider'>
							{t('heading1')}
						</h1>
						<div className='flex h-fit flex-col items-center justify-center gap-16'>
							<a
								href='#'
								className='relative mx-10 flex w-full max-w-[400px] items-center justify-end rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-2 pl-8 hover:from-blue-700 hover:to-purple-700 lg:p-4 lg:pl-16'
							>
								<Image
									src='/images/icons/ct-fb.webp'
									className='absolute left-0 w-32 lg:-left-20 lg:-top-16 lg:w-44'
								/>
								<span className='text-softWhite mr-5 py-1 text-2xl font-extrabold uppercase tracking-wide lg:text-4xl'>
									Facebook
								</span>
							</a>
							<a
								href='#'
								className='relative flex w-full max-w-[400px] items-center justify-start rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-2 pr-8 hover:from-blue-700 hover:to-purple-700 lg:p-4 lg:pr-16'
							>
								<span className='text-softWhite ml-5 text-nowrap py-1 text-2xl font-extrabold uppercase tracking-wide lg:text-4xl'>
									Zalo Chat
								</span>
								<Image
									src='/images/icons/ct-zalo.webp'
									className='absolute -right-10 -top-4 w-32 lg:-right-16 lg:-top-5 lg:w-44'
								/>
							</a>
						</div>
					</div>
					{/* Right */}
					<div className='text-softWhite mx-5 flex flex-col gap-5 rounded bg-blue-600 bg-opacity-80 p-8 md:mx-0 md:w-1/2'>
						<h2 className='text-2xl font-extrabold uppercase tracking-tight'>{t('headingForm')}</h2>
						<div className='flex flex-col gap-5'>
							<div className='flex items-center gap-3'>
								<Mail className='text-icon' />
								<span>support@moviebooking.com</span>
							</div>
							<div className='flex items-center gap-3'>
								<PhoneCall className='text-icon' />
								<span>(123) 456-7890</span>
							</div>
							<div className='flex items-center gap-3'>
								<MapPin className='text-icon' />
								<span>123 Movie Lane, Cinema City, CC 12345</span>
							</div>
						</div>
						<div>
							<form className='flex flex-col gap-8' onSubmit={handleSubmit}>
								<input
									type='text'
									id='name'
									name='name'
									value={formData.name}
									onChange={handleInputChange}
									className='w-full rounded-md bg-white p-4 text-dark'
									placeholder={t('label.name')}
									required
								/>
								<input
									type='email'
									id='email'
									name='email'
									value={formData.email}
									onChange={handleInputChange}
									className='w-full rounded-md bg-white p-4 text-dark'
									placeholder={t('label.email')}
									required
								/>
								<textarea
									id='message'
									name='message'
									value={formData.message}
									onChange={handleInputChange}
									className='w-full rounded-md bg-white p-4 text-dark'
									placeholder={t('label.note')}
									required
								/>
								<Button
									type='submit'
									className='text-softWhite hover:bg-softWhite w-fit rounded-md bg-yellow-500 p-3 px-10 hover:border-2 hover:border-yellow-500 hover:font-extrabold hover:text-yellow-500'
								>
									{t('submit')}
								</Button>
							</form>
						</div>
					</div>
				</div>

				<div className='flex flex-col gap-10'>
					<div className='flex flex-col items-center justify-center gap-5'>
						<h1 className='text-center text-xl font-extrabold uppercase md:text-4xl'>
							{t('heading2')}
						</h1>
						<p className='px-5 text-center'>{t('des')}</p>
					</div>
					<div className='mx-5 flex flex-col gap-5 lg:mx-0'>
						{openTheaters.map((theater, index) => (
							<div
								key={index}
								className='flex justify-between rounded bg-gradient-to-r from-purple-600 to-blue-500 p-4 hover:from-purple-700 hover:to-blue-700'
							>
								<div className='flex flex-col gap-4'>
									<h3 className='text-2xl font-extrabold tracking-tight'>{theater.name}</h3>

									{expandedIndex === index && (
										<div>
											{theater.type !== 'headquarter' && (
												<div className='flex items-center gap-3'>
													<House className='text-icon' />
													<span>
														{theater.room} {t('room')} {theater.chair} {t('chair')}
													</span>
												</div>
											)}
										</div>
									)}

									<div className='flex items-center gap-3'>
										<MapPin className='text-icon' />
										<span>{theater.address}</span>
									</div>

									{theater.mail ? (
										<div className='flex items-center gap-3'>
											<Mail className='text-icon' />
											<span>{theater.mail}</span>
										</div>
									) : (
										''
									)}

									{theater.type !== 'headquarter' && (
										<div className='flex items-center gap-3'>
											<Image src='/images/icons/ic-branch-fb.svg' width='24' height='24' />
											<span>Cinemago {theater.name}</span>
										</div>
									)}

									{theater.phone ? (
										<div className='flex items-center gap-3'>
											<PhoneCall className='text-icon' />
											<span>{theater.phone}</span>
										</div>
									) : (
										''
									)}
								</div>
								<div>
									<div onClick={() => toggleDetails(index)} className='cursor-pointer'>
										{expandedIndex === index ? (
											<ChevronUp className='text-white' size={24} />
										) : (
											<ChevronDown className='text-white' size={24} />
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
