export const movies = [
	{ key: 'cat', label: 'Cat' },
	{ key: 'dog', label: 'Dog' },
	{ key: 'elephant', label: 'Elephant' },
	{ key: 'lion', label: 'Lion' },
	{ key: 'tiger', label: 'Tiger' },
	{ key: 'giraffe', label: 'Giraffe' },
	{ key: 'dolphin', label: 'Dolphin' },
	{ key: 'penguin', label: 'Penguin' },
	{ key: 'zebra', label: 'Zebra' },
	{ key: 'shark', label: 'Shark' },
	{ key: 'whale', label: 'Whale' },
	{ key: 'otter', label: 'Otter' },
	{ key: 'crocodile', label: 'Crocodile' },
];

export const datamovie = [
	{
		id: '1',
		name: 'Inception',
		category: ['Sci-Fi'],
		duration: '148 minutes',
		madeIn: 'USA',
		suitableAge: 13,
		posters:
			'https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg',
		description: {
			director: 'Christopher Nolan',
			performer: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
			premiere: '2010-07-16',
		},
		content:
			'A thief who enters the dreams of others must perform an inception in order to erase his past crimes.',
		trailer: 'YoHD9XEInc0',
	},
	{
		id: '2',
		name: 'The Dark Knight',
		category: ['Action'],
		duration: '152 minutes',
		madeIn: 'USA',
		suitableAge: 13,
		posters: 'https://example.com/dark-knight-poster.jpg',
		description: {
			director: 'Christopher Nolan',
			performer: 'Christian Bale, Heath Ledger, Aaron Eckhart',
			premiere: '2008-07-18',
		},
		content: 'Batman must face the Joker, a criminal mastermind, as he tries to save Gotham City.',
		trailer: 'EXeTwQWrcwY',
	},
	{
		id: '3',
		name: 'Parasite',
		category: ['Thriller'],
		duration: '132 minutes',
		madeIn: 'South Korea',
		suitableAge: 15,
		posters: 'https://example.com/parasite-poster.jpg',
		description: {
			director: 'Bong Joon-ho',
			performer: 'Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong',
			premiere: '2019-05-30',
		},
		content:
			'A poor family schemes to become employed by a wealthy family by infiltrating their household.',
		trailer: '5xH0HfJHsaY',
	},
	{
		id: '4',
		name: 'The Matrix',
		category: ['Sci-Fi'],
		duration: '136 minutes',
		madeIn: 'USA',
		suitableAge: 15,
		posters: 'https://example.com/matrix-poster.jpg',
		description: {
			director: 'The Wachowskis',
			performer: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss',
			premiere: '1999-03-31',
		},
		content:
			'A hacker discovers the true nature of his reality and his role in the war against its controllers.',
		trailer: 'vKQi3bBA1y8',
	},
	{
		id: '5',
		name: 'Spirited Away',
		category: ['Animation'],
		duration: '125 minutes',
		madeIn: 'Japan',
		suitableAge: 10,
		posters: 'https://example.com/spirited-away-poster.jpg',
		description: {
			director: 'Hayao Miyazaki',
			performer: 'Rumi Hiiragi, Miyu Irino, Mari Natsuki',
			premiere: '2001-07-20',
		},
		content:
			'A young girl becomes trapped in a strange new world of spirits, and must find her way out.',
		trailer: 'ByXuk9QqQkk',
	},
];

export const branches = [
	{
		name: {
			en: 'Cinestar Hai Ba Trung',
			vi: 'Cinestar Hai Bà Trưng',
		},
		address: {
			en: '125 Hai Ba Trung, District 3',
			vi: '125 Hai Bà Trưng, Quận 3',
		},
		email: 'cinemahbt@gmail.com',
		phone: '028 7300 7379',
		description: {
			en: 'Cinestar Hai Bà Trưng is located in the center of District 1, near many universities, cultural centers, and commercial areas. With this prime location, Cinestar Hai Bà Trưng is a popular entertainment destination for many young audiences. Committed to providing the best cinematic experiences with attractive ticket prices, Cinestar Hai Bà Trưng is the perfect choice for those who love wide-screen films.',
			vi: 'Cinestar Hai Bà Trưng nằm tại trung tâm Quận 1, gần nhiều trường đại học, trung tâm văn hóa và thương mại. Với vị trí đắc địa này, Cinestar Hai Bà Trưng là điểm đến giải trí ưa thích của nhiều khán giả trẻ. Với cam kết mang đến những trải nghiệm điện ảnh tuyệt vời nhất cùng giá vé hấp dẫn, Cinestar Hai Bà Trưng là lựa chọn hoàn hảo cho những ai yêu thích phim màn ảnh rộng.',
		},
	},
	{
		name: {
			en: 'Cinestar Ben Thanh',
			vi: 'Cinestar Bến Thành',
		},
		address: {
			en: '123 Le Loi, District 1',
			vi: '123 Lê Lợi, Quận 1',
		},
		email: 'cinemabtn@gmail.com',
		phone: '028 1234 5678',
		description: {
			en: 'Cinestar Bến Thành is located right in the city center, near Ben Thanh Market and many famous tourist attractions. It is an ideal spot for those who want to enjoy movies in a modern and comfortable environment.',
			vi: 'Cinestar Bến Thành tọa lạc ngay trung tâm thành phố, gần chợ Bến Thành và nhiều điểm du lịch nổi tiếng. Đây là một địa điểm lý tưởng cho những ai muốn thưởng thức phim trong một không gian hiện đại và thoải mái.',
		},
	},
	{
		name: {
			en: 'Cinestar Galaxy',
			vi: 'Cinestar Galaxy',
		},
		address: {
			en: '45 Nguyen Hue, District 1',
			vi: '45 Nguyễn Huệ, Quận 1',
		},
		email: 'cinemagalaxy@gmail.com',
		phone: '028 8765 4321',
		description: {
			en: 'Cinestar Galaxy is one of the largest cinemas in the area, offering a variety of entertainment services and excellent cinematic experiences. Equipped with advanced sound and image technology, it is the ideal place for high-quality movie screenings.',
			vi: 'Cinestar Galaxy là một trong những rạp chiếu phim lớn nhất trong khu vực, cung cấp các dịch vụ giải trí đa dạng và những trải nghiệm điện ảnh tuyệt vời. Được trang bị công nghệ âm thanh và hình ảnh tiên tiến, đây là nơi lý tưởng cho các buổi xem phim với chất lượng cao.',
		},
	},
	{
		name: {
			en: 'Cinestar Thao Dien',
			vi: 'Cinestar Thảo Điền',
		},
		address: {
			en: '18 Thao Dien, District 2',
			vi: '18 Thảo Điền, Quận 2',
		},
		email: 'cinemathd@gmail.com',
		phone: '028 2345 6789',
		description: {
			en: 'Cinestar Thao Dien offers a cozy atmosphere and attentive service, suitable for families and groups of friends. With flexible screening times and affordable prices, it is a popular choice for evening entertainment.',
			vi: 'Cinestar Thảo Điền mang đến không gian ấm cúng và dịch vụ tận tâm, phù hợp cho các gia đình và nhóm bạn. Với các suất chiếu linh hoạt và mức giá phải chăng, đây là lựa chọn phổ biến cho các buổi tối giải trí.',
		},
	},
	{
		name: {
			en: 'Cinestar Phu Nhuan',
			vi: 'Cinestar Phú Nhuận',
		},
		address: {
			en: '200 Phan Dang Luu, Phu Nhuan District',
			vi: '200 Phan Đăng Lưu, Quận Phú Nhuận',
		},
		email: 'cinemapn@gmail.com',
		phone: '028 3456 7890',
		description: {
			en: 'Cinestar Phu Nhuan provides a modern and comfortable space, suitable for both large events and regular movie screenings. With excellent customer service and a variety of amenities, it is the ideal place to enjoy your favorite films.',
			vi: 'Cinestar Phú Nhuận cung cấp không gian hiện đại và tiện nghi, phù hợp cho cả các sự kiện lớn và các buổi xem phim thông thường. Với dịch vụ khách hàng xuất sắc và các tiện ích đa dạng, đây là nơi lý tưởng để thưởng thức những bộ phim yêu thích.',
		},
	},
];
