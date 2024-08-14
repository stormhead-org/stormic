import { PrismaClient, UserRoleType, PostStatus, MediaType } from '@prisma/client';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

const generateDate = (daysAgo: number) => {
	const date = new Date();
	date.setDate(date.getDate() - daysAgo);
	return date;
};

async function up() {
	// Создание пользователей
	await prisma.user.createMany({
		data: [
			{
				fullName: 'Карл Саган',
				email: 'sagan@astro.org',
				password: hashSync('password', 10),
				role: UserRoleType.ADMIN,
				verified: new Date(),
				profile_picture: 'https://example.com/sagan.jpg',
				bio: 'Американский астроном, популяризатор науки и автор книг по астрофизике.',
			},
			{
				fullName: 'Стивен Хокинг',
				email: 'hawking@astro.org',
				password: hashSync('password', 10),
				role: UserRoleType.USER,
				verified: new Date(),
				profile_picture: 'https://example.com/hawking.jpg',
				bio: 'Британский теоретический физик, космолог и популяризатор науки.',
			},
			{
				fullName: 'Нил Деграсс Тайсон',
				email: 'tyson@astro.org',
				password: hashSync('password', 10),
				role: UserRoleType.USER,
				verified: new Date(),
				profile_picture: 'https://example.com/tyson.jpg',
				bio: 'Американский астрофизик и популяризатор науки.',
			},
		],
	});
	
	// Создание настроек платформы
	await prisma.stormicSettings.create({
		data: {
			name: 'AstroPlatform',
		},
	});
	
	// Создание медиа
	await prisma.stormicMedia.createMany({
		data: [
			{
				mediaType: MediaType.LOGO,
				url: 'https://example.com/logo.png',
				description: 'Логотип нашей астрономической платформы.',
				stormicSettingsId: 1,
			},
			{
				mediaType: MediaType.BANNER,
				url: 'https://example.com/banner.jpg',
				description: 'Баннер для рекламы новых статей.',
				stormicSettingsId: 1,
			},
		],
	});
	
	// Создание меню навигации
	await prisma.navigationMenu.createMany({
		data: [
			{ name: 'Главная', pageUrl: '/', order: 1, stormicSettingsId: 1 },
			{ name: 'Исследования', pageUrl: '/research', order: 2, stormicSettingsId: 1 },
			{ name: 'Новости', pageUrl: '/news', order: 3, stormicSettingsId: 1 },
		],
	});
	
	// Создание категорий
	await prisma.category.createMany({
		data: [
			{ category_name: 'Черные дыры', owner_id: 1 },
			{ category_name: 'Космология', owner_id: 1 },
			{ category_name: 'Экзопланеты', owner_id: 1 },
			{ category_name: 'Солнечная система', owner_id: 1 },
		],
	});
	
	// Создание модераторов категорий
	await prisma.categoryModerator.createMany({
		data: [
			{ category_id: 1, user_id: 1 },
			{ category_id: 2, user_id: 2 },
			{ category_id: 3, user_id: 3 },
		],
	});
	
	// Создание постов
	await prisma.post.createMany({
		data: [
			{
				title: 'Чёрные дыры: загадки и открытия',
				content: 'Чёрные дыры — это области пространства, где гравитация настолько сильна, что даже свет не может уйти от них.',
				author_id: 1,
				publication_date: generateDate(10),
				last_edit_date: generateDate(5),
				PostStatus: PostStatus.PUBLISHED,
				views_count: 150,
				likes_count: 30,
				category_id: 1,
			},
			{
				title: 'Космология и Большой взрыв',
				content: 'Космология изучает происхождение и развитие Вселенной. Основной теорией является теория Большого взрыва.',
				author_id: 2,
				publication_date: generateDate(5),
				PostStatus: PostStatus.PUBLISHED,
				views_count: 200,
				likes_count: 50,
				category_id: 2,
			},
			{
				title: 'Поиск экзопланет: методы и достижения',
				content: 'Экзопланеты — это планеты, вращающиеся вокруг звёзд, отличных от Солнца. Методы их поиска включают транзиты и радиальные скорости.',
				author_id: 3,
				publication_date: generateDate(1),
				PostStatus: PostStatus.PUBLISHED,
				views_count: 300,
				likes_count: 70,
				category_id: 3,
			},
		],
	});
	
	// Создание комментариев
	await prisma.comment.createMany({
		data: [
			{ content: 'Это невероятно интересно!', post_id: 1, author_id: 2, parent_comment_id: null, publication_date: generateDate(1), update_date: generateDate(1) },
			{ content: 'Больше информации о Большом взрыве!', post_id: 2, author_id: 3, parent_comment_id: null, publication_date: generateDate(2), update_date: generateDate(2) },
			{ content: 'Согласен с вами!', post_id: 2, author_id: 1, parent_comment_id: 2, publication_date: generateDate(3), update_date: generateDate(3) },
		],
	});
	
	// Создаем категории тегов
	await prisma.tagCategory.createMany({
		data: [
			{ name: 'Наука' },
			{ name: 'Космос' },
			{ name: 'Физика' },
		],
	});

// Создаем теги
	await prisma.tag.createMany({
		data: [
			{ tag_name: 'Астрономия', category_id: 1 }, // Убедитесь, что категория с id 1 существует
			{ tag_name: 'Космос', category_id: 2 },
			{ tag_name: 'Физика', category_id: 3 },
		],
	});
	
	// Создание связей постов и тэгов
	await prisma.postTags.createMany({
		data: [
			{ post_id: 1, tag_id: 1 },
			{ post_id: 1, tag_id: 2 },
			{ post_id: 2, tag_id: 3 },
			{ post_id: 3, tag_id: 1 },
			{ post_id: 3, tag_id: 2 },
		],
	});
	
	// Создание ролей
	await prisma.userRole.createMany({
		data: [
			{ role_name: 'Admin' },
			{ role_name: 'Editor' },
			{ role_name: 'Viewer' },
		],
	});
	
	// Назначение ролей пользователям
	await prisma.userRoleAssignment.createMany({
		data: [
			{ user_id: 1, role_id: 1 },
			{ user_id: 2, role_id: 2 },
			{ user_id: 3, role_id: 3 },
		],
	});
	
	// Создание разрешений
	await prisma.permission.createMany({
		data: [
			{ permission_name: 'Read' },
			{ permission_name: 'Write' },
			{ permission_name: 'Delete' },
		],
	});
	
	// Создание связей ролей и разрешений
	await prisma.rolePermission.createMany({
		data: [
			{ role_id: 1, permission_id: 2 }, // Admin - Write
			{ role_id: 1, permission_id: 3 }, // Admin - Delete
			{ role_id: 2, permission_id: 2 }, // Editor - Write
			{ role_id: 3, permission_id: 1 }, // Viewer - Read
		],
	});
	
	// Создание лайков
	await prisma.like.createMany({
		data: [
			{ user_id: 2, post_id: 1, like_date: generateDate(3) },
			{ user_id: 3, post_id: 2, like_date: generateDate(2) },
		],
	});
	
	// Создание просмотров
	await prisma.view.createMany({
		data: [
			{ user_id: 1, post_id: 1, view_date: generateDate(1) },
			{ user_id: 2, post_id: 2, view_date: generateDate(1) },
		],
	});
	
	// Создание изображений
	await prisma.image.createMany({
		data: [
			{ url: 'https://example.com/image1.jpg', uploaded_by: 1, upload_date: generateDate(1) },
			{ url: 'https://example.com/image2.jpg', uploaded_by: 2, upload_date: generateDate(2) },
		],
	});
	
	// Создание медиафайлов
	await prisma.media.createMany({
		data: [
			{ post_id: 1, media_url: 'https://example.com/media1.mp4', media_type: 'video', upload_date: generateDate(1) },
			{ post_id: 2, media_url: 'https://example.com/media2.mp4', media_type: 'video', upload_date: generateDate(2) },
		],
	});
	
	// Создание уведомлений
	await prisma.notification.createMany({
		data: [
			{ user_id: 1, content: 'Ваш пост получил новый комментарий.', notification_date: generateDate(1), read_status: false, type: 'comment' },
			{ user_id: 2, content: 'Новый пост в категории, на которую вы подписаны.', notification_date: generateDate(1), read_status: false, type: 'post' },
		],
	});
	
	// Создание истории редактирования постов
	await prisma.postEditHistory.createMany({
		data: [
			{ postId: 1, editorId: 1, oldContent: 'Старое содержимое', newContent: 'Новое содержимое', editDate: generateDate(1) },
			{ postId: 2, editorId: 2, oldContent: 'Старое содержимое', newContent: 'Новое содержимое', editDate: generateDate(2) },
		],
	});
	
	// Создание репутации
	await prisma.reputation.createMany({
		data: [
			{ userId: 1, points: 100, createdAt: generateDate(10), updatedAt: new Date() },
			{ userId: 2, points: 50, createdAt: generateDate(5), updatedAt: new Date() },
		],
	});
	
	// Создание наград
	await prisma.badge.createMany({
		data: [
			{ name: 'Звездный исследователь', iconUrl: 'https://example.com/badge1.png', criteria: 'Написано 10 постов' },
			{ name: 'Гуру комментариев', iconUrl: 'https://example.com/badge2.png', criteria: 'Получено 50 лайков на комментарии' },
		],
	});
	
	// Назначение наград пользователям
	await prisma.userBadge.createMany({
		data: [
			{ userId: 1, badgeId: 1, awardedAt: generateDate(1) },
			{ userId: 2, badgeId: 2, awardedAt: generateDate(2) },
		],
	});
	
	// Создание подписок пользователей
	await prisma.userSubscription.createMany({
		data: [
			{ followerId: 1, followingId: 2 },
			{ followerId: 2, followingId: 3 },
		],
	});
	
	// Создание рекомендаций
	await prisma.recommendation.createMany({
		data: [
			{ userId: 1, postId: 2, reason: 'Популярный пост', createdAt: generateDate(1) },
			{ userId: 2, postId: 3, reason: 'Персонализированная рекомендация', createdAt: generateDate(2) },
		],
	});
}

async function down() {
	// Удаление данных для отката
	await prisma.$executeRaw`TRUNCATE TABLE "StormicSettings" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "StormicMedia" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "NavigationMenu" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "VerificationCode" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Post" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "CategoryModerator" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Comment" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Tag" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "TagCategory" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "PostTags" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "UserRole" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "UserRoleAssignment" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Permission" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "RolePermission" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Like" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "View" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Image" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Media" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Notification" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "PostEditHistory" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Reputation" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Badge" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "UserBadge" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "UserSubscription" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Recommendation" RESTART IDENTITY CASCADE`;
}


async function main() {
	try {
		await down()
		await up()
	} catch (e) {
		console.error(e)
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
