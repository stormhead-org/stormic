import { MediaType, PostStatus, SettingsType, UserRoleType } from '@prisma/client'
import { hashSync } from 'bcrypt'
import { navigationMenu } from './constants'

import { prisma } from './prisma-client'

const generateDate = (daysAgo: number) => {
	const date = new Date()
	date.setDate(date.getDate() - daysAgo)
	return date
}

// Функция для генерации случайного числа в заданном диапазоне
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

// Функция для генерации случайных подписок
const generateRandomSubscriptions = async () => {
	// Получаем всех пользователей и категории
	const users = await prisma.user.findMany()
	const categories = await prisma.category.findMany()
	
	for (const user of users) {
		const numCategories = getRandomInt(1, categories.length) // Случайное количество категорий
		const subscribedCategories = new Set<number>()
		
		while (subscribedCategories.size < numCategories) {
			const randomCategoryId = categories[getRandomInt(0, categories.length - 1)].category_id
			subscribedCategories.add(randomCategoryId)
		}
		
		for (const categoryId of Array.from(subscribedCategories)) { // Преобразование Set в массив
			await prisma.categorySubscription.create({
				data: {
					user_id: user.id,
					category_id: categoryId
				}
			})
		}
	}
}

// Функция для генерации случайных лайков комментариям
const generateRandomCommentLikes = async () => {
	const users = await prisma.user.findMany()
	const comments = await prisma.comment.findMany()
	
	for (const comment of comments) {
		const randomUser = users[Math.floor(Math.random() * users.length)]
		
		await prisma.commentLike.create({
			data: {
				comment_id: comment.comment_id,
				user_id: randomUser.id
			}
		})
	}
}

async function up() {
	
	// Создание настроек платформы
	await prisma.stormicSettings.createMany({
		data: [
			{
				content: 'Stormic',
				settingsType: SettingsType.NAME
			},
			{
				content: 'код, GitHub и ты',
				settingsType: SettingsType.DESCRIPTION
			}
		]
	})
	
	// Создание медиа
	await prisma.stormicMedia.createMany({
		data: [
			{
				mediaType: MediaType.LOGO,
				url: 'https://i.imgur.com/CPCySAr.png',
				description: 'Логотип нашей астрономической платформы.',
				stormicSettingsId: 1
			},
			{
				mediaType: MediaType.BANNER,
				url: 'https://i.pinimg.com/564x/f8/1e/7d/f81e7dde45454fcb1a61bf676e3e95b0.jpg',
				description: 'Баннер для рекламы новых статей.',
				stormicSettingsId: 1
			},
			{
				mediaType: MediaType.AUTH_IMAGE,
				url: 'https://i.pinimg.com/564x/f8/1e/7d/f81e7dde45454fcb1a61bf676e3e95b0.jpg',
				description: 'Баннер для окна авторизации.',
				stormicSettingsId: 1
			}
		]
	})
	
	// Создание пользователей
	await prisma.user.createMany({
		data: [
			{
				fullName: 'Нил Деграсс Тайсон',
				email: 'tyson@stormic.app',
				password: hashSync('password', 10),
				role: UserRoleType.OWNER,
				verified: new Date(),
				profile_picture: 'https://leonardo.osnova.io/2983d7e1-ccfe-5139-8504-974f8420e260/-/scale_crop/72x72/-/format/webp',
				profile_banner: 'https://images.squarespace-cdn.com/content/v1/5a78ab8490badee028bef0e9/1568935524292-TPSLMXHD9HE6PKN02YOG/Interstellar.jpg?format=2500w',
				bio: 'Американский астрофизик и популяризатор науки.'
			},
			{
				fullName: 'Карл Саган',
				email: 'sagan@stormic.app',
				password: hashSync('password', 10),
				role: UserRoleType.ADMIN,
				verified: new Date(),
				profile_picture: 'https://leonardo.osnova.io/aa08c3bd-0d34-5626-9986-7f06f5bedd24/-/scale_crop/72x72/-/format/webp',
				profile_banner: 'https://images.squarespace-cdn.com/content/v1/5a78ab8490badee028bef0e9/1568935524292-TPSLMXHD9HE6PKN02YOG/Interstellar.jpg?format=2500w',
				bio: 'Американский астроном, популяризатор науки и автор книг по астрофизике.'
			},
			{
				fullName: 'Стивен Хокинг',
				email: 'hawking@stormic.app',
				password: hashSync('password', 10),
				role: UserRoleType.USER,
				verified: new Date(),
				profile_picture: 'https://leonardo.osnova.io/5b5880da-185c-5c29-85ab-f5c086df2a7b/-/scale_crop/72x72/-/format/webp',
				profile_banner: 'https://4kwallpapers.com/images/walls/thumbs_3t/9621.jpg',
				bio: 'Британский теоретический физик, космолог и популяризатор науки.'
			}
		]
	})
	
	// Заполнение таблицы CustomField
	await prisma.customField.createMany({
		data: [
			{
				key: 'Сайт:',
				value: 'https://carlsagan.com',
				userId: 1
			},
			{
				key: 'Сайт:',
				value: 'https://www.hawking.org.uk',
				userId: 2
			},
			{
				key: 'Мои книги:',
				value: 'https://www.penguinrandomhouse.com/the-read-down/stephen-hawking/',
				userId: 2
			}
		]
	})
	
	// Создание меню навигации
	await prisma.navigationMenu.createMany({
		data: navigationMenu
	})
	
	await prisma.category.createMany({
		data: [
			{
				category_name: 'Черные дыры',
				category_banner: 'https://images.squarespace-cdn.com/content/v1/5a78ab8490badee028bef0e9/1568935524292-TPSLMXHD9HE6PKN02YOG/Interstellar.jpg?format=2500w',
				category_description: 'Изучение черных дыр',
				owner_id: 1,
				category_image: 'https://leonardo.osnova.io/aa08c3bd-0d34-5626-9986-7f06f5bedd24/-/scale_crop/72x72/-/format/webp',
				category_url: '/c/1'
			},
			{
				category_name: 'Космология',
				category_banner: 'https://4kwallpapers.com/images/walls/thumbs_3t/9621.jpg',
				category_description: 'Космология вокруг',
				owner_id: 1,
				category_image: 'https://leonardo.osnova.io/5b5880da-185c-5c29-85ab-f5c086df2a7b/-/scale_crop/72x72/-/format/webp',
				category_url: '/c/2'
			},
			{
				category_name: 'Экзопланеты',
				category_banner: 'https://images.squarespace-cdn.com/content/v1/5a78ab8490badee028bef0e9/1568935524292-TPSLMXHD9HE6PKN02YOG/Interstellar.jpg?format=2500w',
				category_description: 'Лучшие экзопланеты для отдыха',
				owner_id: 1,
				category_image: 'https://leonardo.osnova.io/2983d7e1-ccfe-5139-8504-974f8420e260/-/scale_crop/72x72/-/format/webp',
				category_url: '/c/3'
			},
			{
				category_name: 'Солнечная система',
				category_banner: 'https://4kwallpapers.com/images/walls/thumbs_3t/9621.jpg',
				category_description: 'Солнечная система и Нибиру',
				owner_id: 1,
				category_image: 'https://leonardo.osnova.io/aa08c3bd-0d34-5626-9986-7f06f5bedd24/-/scale_crop/72x72/-/format/webp',
				category_url: '/c/4'
			},
			{
				category_name: 'Галактики',
				category_banner: 'https://images.squarespace-cdn.com/content/v1/5a78ab8490badee028bef0e9/1568935524292-TPSLMXHD9HE6PKN02YOG/Interstellar.jpg?format=2500w',
				category_description: 'Структура и эволюция галактик',
				owner_id: 2,
				category_image: 'https://leonardo.osnova.io/5b5880da-185c-5c29-85ab-f5c086df2a7b/-/scale_crop/72x72/-/format/webp',
				category_url: '/c/5'
			},
			{
				category_name: 'Темная материя',
				category_banner: 'https://4kwallpapers.com/images/walls/thumbs_3t/9621.jpg',
				category_description: 'Скрытая масса Вселенной',
				owner_id: 2,
				category_image: 'https://leonardo.osnova.io/2983d7e1-ccfe-5139-8504-974f8420e260/-/scale_crop/72x72/-/format/webp',
				category_url: '/c/6'
			},
			{
				category_name: 'Темная энергия',
				category_banner: 'https://images.squarespace-cdn.com/content/v1/5a78ab8490badee028bef0e9/1568935524292-TPSLMXHD9HE6PKN02YOG/Interstellar.jpg?format=2500w',
				category_description: 'Таинственная сила, ускоряющая расширение Вселенной',
				owner_id: 2,
				category_image: 'https://leonardo.osnova.io/5b5880da-185c-5c29-85ab-f5c086df2a7b/-/scale_crop/72x72/-/format/webp',
				category_url: '/c/7'
			},
			{
				category_name: 'Квазары',
				category_banner: 'https://images.squarespace-cdn.com/content/v1/5a78ab8490badee028bef0e9/1568935524292-TPSLMXHD9HE6PKN02YOG/Interstellar.jpg?format=2500w',
				category_description: 'Яркие центры активных галактик',
				owner_id: 3,
				category_image: 'https://leonardo.osnova.io/aa08c3bd-0d34-5626-9986-7f06f5bedd24/-/scale_crop/72x72/-/format/webp',
				category_url: '/c/8'
			},
			{
				category_name: 'Релятивистская астрофизика',
				category_banner: 'https://4kwallpapers.com/images/walls/thumbs_3t/9621.jpg',
				category_description: 'Астрофизика высоких скоростей',
				owner_id: 3,
				category_image: 'https://leonardo.osnova.io/5b5880da-185c-5c29-85ab-f5c086df2a7b/-/scale_crop/72x72/-/format/webp',
				category_url: '/c/9'
			},
			{
				category_name: 'Нейтронные звезды',
				category_banner: 'https://images.squarespace-cdn.com/content/v1/5a78ab8490badee028bef0e9/1568935524292-TPSLMXHD9HE6PKN02YOG/Interstellar.jpg?format=2500w',
				category_description: 'Изучение наиболее плотных объектов',
				owner_id: 3,
				category_image: 'https://leonardo.osnova.io/2983d7e1-ccfe-5139-8504-974f8420e260/-/scale_crop/72x72/-/format/webp',
				category_url: '/c/10'
			},
			{
				category_name: 'Гравитационные волны',
				category_banner: 'https://4kwallpapers.com/images/walls/thumbs_3t/9621.jpg',
				category_description: 'Колебания пространства-времени',
				owner_id: 1,
				category_image: 'https://leonardo.osnova.io/5b5880da-185c-5c29-85ab-f5c086df2a7b/-/scale_crop/72x72/-/format/webp',
				category_url: '/c/11'
			},
			{
				category_name: 'Космические телескопы',
				category_banner: 'https://images.squarespace-cdn.com/content/v1/5a78ab8490badee028bef0e9/1568935524292-TPSLMXHD9HE6PKN02YOG/Interstellar.jpg?format=2500w',
				category_description: 'Инструменты для наблюдения Вселенной',
				owner_id: 1,
				category_image: 'https://leonardo.osnova.io/2983d7e1-ccfe-5139-8504-974f8420e260/-/scale_crop/72x72/-/format/webp',
				category_url: '/c/12'
			},
			{
				category_name: 'Космические миссии',
				category_banner: 'https://4kwallpapers.com/images/walls/thumbs_3t/9621.jpg',
				category_description: 'Экспедиции к другим планетам и звездам',
				owner_id: 2,
				category_image: 'https://leonardo.osnova.io/5b5880da-185c-5c29-85ab-f5c086df2a7b/-/scale_crop/72x72/-/format/webp',
				category_url: '/c/14'
			},
			{
				category_name: 'Планетарная наука',
				category_banner: 'https://images.squarespace-cdn.com/content/v1/5a78ab8490badee028bef0e9/1568935524292-TPSLMXHD9HE6PKN02YOG/Interstellar.jpg?format=2500w',
				category_description: 'Изучение планет и их систем',
				owner_id: 2,
				category_image: 'https://leonardo.osnova.io/2983d7e1-ccfe-5139-8504-974f8420e260/-/scale_crop/72x72/-/format/webp',
				category_url: '/c/14'
			},
			{
				category_name: 'Астрохимия',
				category_banner: 'https://4kwallpapers.com/images/walls/thumbs_3t/9621.jpg',
				category_description: 'Химия космоса',
				owner_id: 3,
				category_image: 'https://leonardo.osnova.io/5b5880da-185c-5c29-85ab-f5c086df2a7b/-/scale_crop/72x72/-/format/webp',
				category_url: '/c/15'
			}
		]
	})
	
	await prisma.categoryModerator.createMany({
		data: [
			{ category_id: 1, user_id: 1 },  // Черные дыры - Карл Саган
			{ category_id: 2, user_id: 1 },  // Космология - Карл Саган
			{ category_id: 3, user_id: 1 },  // Экзопланеты - Карл Саган
			{ category_id: 4, user_id: 1 },  // Солнечная система - Карл Саган
			{ category_id: 5, user_id: 2 },  // Галактики - Стивен Хокинг
			{ category_id: 6, user_id: 2 },  // Темная материя - Стивен Хокинг
			{ category_id: 7, user_id: 2 },  // Темная энергия - Стивен Хокинг
			{ category_id: 8, user_id: 3 },  // Квазары - Нил Деграсс Тайсон
			{ category_id: 9, user_id: 3 },  // Релятивистская астрофизика - Нил Деграсс Тайсон
			{ category_id: 10, user_id: 3 }, // Нейтронные звезды - Нил Деграсс Тайсон
			{ category_id: 11, user_id: 1 }, // Гравитационные волны - Карл Саган
			{ category_id: 12, user_id: 1 }, // Космические телескопы - Карл Саган
			{ category_id: 13, user_id: 2 }, // Космические миссии - Стивен Хокинг
			{ category_id: 14, user_id: 2 }, // Планетарная наука - Стивен Хокинг
			{ category_id: 15, user_id: 3 } // Астрохимия - Нил Деграсс Тайсон
		]
	})
	
	// Создание постов
	await prisma.post.createMany({
		data: [
			{
				title: 'Чёрные дыры: загадки и открытия',
				post_image: 'https://4kwallpapers.com/images/walls/thumbs_3t/9621.jpg',
				content: 'Чёрные дыры — это области пространства, где гравитация настолько сильна, что даже свет не может уйти от них. Они образуются, когда массивные звезды исчерпывают своё топливо и коллапсируют под собственным весом. Чёрные дыры представляют собой одну из самых загадочных и интересных тем в астрономии и физике. \n' +
					'\n' +
					'Внутри чёрной дыры находится так называемая сингулярность, где плотность становится бесконечно большой, а пространство и время теряют свои обычные свойства. Вокруг сингулярности образуется горизонт событий, за пределами которого ничто не может вернуться. \n' +
					'\n' +
					'Чёрные дыры бывают разных типов: звёздные, сверхмассивные и промежуточные. Звёздные чёрные дыры формируются в результате коллапса массивных звёзд, а сверхмассивные чёрные дыры находятся в центрах галактик и могут иметь массу в миллионы или даже миллиарды раз больше массы Солнца. \n' +
					'\n' +
					'Недавние открытия, такие как снимок чёрной дыры в центре галактики M87, предоставляют нам новые данные о том, как эти объекты влияют на окружающее пространство и как они могут быть изучены в будущем. Также интерес представляет гипотеза о возможных связях чёрных дыр с квантовой гравитацией и теорией струн, которые могут раскрыть ещё более глубокие тайны Вселенной.\n',
				author_id: 1,
				publication_date: generateDate(10),
				last_edit_date: generateDate(5),
				PostStatus: PostStatus.PUBLISHED,
				views_count: 0,
				likes_count: 1,
				category_id: 1
			},
			{
				title: 'Космология и Большой взрыв',
				post_image: 'https://images.squarespace-cdn.com/content/v1/5a78ab8490badee028bef0e9/1568935524292-TPSLMXHD9HE6PKN02YOG/Interstellar.jpg?format=2500w',
				content: 'Космология изучает происхождение и развитие Вселенной. Основной теорией является теория Большого взрыва, согласно которой Вселенная начала своё существование около 13.8 миллиардов лет назад из крайне горячего и плотного состояния. Этот момент стал началом не только материи, но и пространства и времени.\n' +
					'\n' +
					'С момента Большого взрыва Вселенная продолжала расширяться и охлаждаться, что привело к образованию первых атомов, звёзд и галактик. Важные открытия, такие как космическое микроволновое фоновое излучение и красное смещение далёких галактик, подтверждают эту теорию и помогают учёным реконструировать раннюю историю Вселенной.\n' +
					'\n' +
					'Современные космологические исследования включают изучение тёмной материи и тёмной энергии, которые составляют значительную часть Вселенной, но не излучают свет и не взаимодействуют с обычной материей таким образом, чтобы их можно было наблюдать непосредственно.\n' +
					'\n' +
					'Исследования также сосредоточены на моделировании различных сценариев будущего Вселенной, таких как продолжение её расширения, возможное замедление этого процесса или даже сценарий, в котором расширение замедляется и Вселенная начинает сжиматься.\n',
				author_id: 2,
				publication_date: generateDate(5),
				PostStatus: PostStatus.PUBLISHED,
				views_count: 0,
				likes_count: 2,
				category_id: 2
			},
			{
				title: 'Поиск экзопланет: методы и достижения',
				post_image: 'https://4kwallpapers.com/images/walls/thumbs_3t/9621.jpg',
				content: 'Экзопланеты — это планеты, вращающиеся вокруг звёзд, отличных от Солнца. Поиск экзопланет стал одной из самых захватывающих областей астрономии последних десятилетий. С момента открытия первой экзопланеты в 1995 году, учёные обнаружили тысячи таких планет, используя различные методы.\n' +
					'\n' +
					'Один из основных методов обнаружения экзопланет — это метод транзитов, при котором планета проходит перед своей звездой, что приводит к временным изменениями яркости звезды. Этот метод позволил обнаружить такие известные экзопланеты, как Kepler-186f и HD 209458b. \n' +
					'\n' +
					'Другой метод — метод радиальных скоростей, который измеряет колебания звезды, вызванные гравитационным воздействием планеты. Этот метод был использован для обнаружения первой экзопланеты вокруг звезды типа солнца.\n' +
					'\n' +
					'Недавние достижения включают обнаружение экзопланет в обитаемых зонах, где условия могут быть подходящими для существования жидкой воды и, возможно, жизни. Планы на будущее включают использование новых инструментов, таких как телескопы следующего поколения, для более глубокого изучения экзопланетных систем и поиска признаков жизни на них.\n',
				author_id: 3,
				publication_date: generateDate(1),
				PostStatus: PostStatus.PUBLISHED,
				views_count: 0,
				likes_count: 3,
				category_id: 3
			}
		]
	})
	
	// Создание закладок
	await prisma.bookmark.createMany({
		data: [
			{
				user_id: 1,
				post_id: 1,
				addedAt: new Date()
			},
			{
				user_id: 2,
				post_id: 2,
				addedAt: new Date()
			},
			{
				user_id: 3,
				post_id: 3,
				addedAt: new Date()
			}
		]
	})
	
	// Создание комментариев
	await prisma.comment.createMany({
		data: [
			{
				content: 'Это невероятно интересно! Астрономия и астрофизика всегда были одними из самых увлекательных областей науки. Изучение таких явлений, как чёрные дыры и экзопланеты, открывает перед нами удивительные тайны Вселенной и заставляет задуматься о нашем месте в космосе. Хотелось бы узнать больше о будущих открытиях!',
				post_id: 1,
				author_id: 2,
				parent_comment_id: null,
				publication_date: generateDate(1),
				update_date: generateDate(1)
			},
			{
				content: 'Больше информации о Большом взрыве! Теория Большого взрыва — это одна из основополагающих теорий в современной космологии. Она объясняет происхождение Вселенной и её последующее расширение. Было бы интересно узнать больше о роли тёмной материи и энергии в этом процессе, а также о будущем нашей Вселенной!',
				post_id: 2,
				author_id: 3,
				parent_comment_id: null,
				publication_date: generateDate(2),
				update_date: generateDate(2)
			},
			{
				content: 'Согласен c вами! Вопросы, связанные с космологией и астрофизикой, действительно захватывают дух. Чем больше мы узнаем о Вселенной, тем больше возникает вопросов. Давайте продолжать делиться знаниями и размышлять над великими загадками космоса вместе. Ваши комментарии вдохновляют на дальнейшие исследования!',
				post_id: 2,
				author_id: 1,
				parent_comment_id: 2,
				publication_date: generateDate(3),
				update_date: generateDate(3)
			}
		]
	})
	
	// Создаем категории тегов
	await prisma.tagCategory.createMany({
		data: [
			{ name: 'Наука' },
			{ name: 'Космос' },
			{ name: 'Физика' }
		]
	})

// Создаем теги
	await prisma.tag.createMany({
		data: [
			{ tag_name: 'Астрономия', category_id: 1 }, // Убедитесь, что категория c id 1 существует
			{ tag_name: 'Космос', category_id: 2 },
			{ tag_name: 'Физика', category_id: 3 }
		]
	})
	
	// Создание связей постов и тэгов
	await prisma.postTags.createMany({
		data: [
			{ post_id: 1, tag_id: 1 },
			{ post_id: 1, tag_id: 2 },
			{ post_id: 2, tag_id: 3 },
			{ post_id: 3, tag_id: 1 },
			{ post_id: 3, tag_id: 2 }
		]
	})
	
	// Создание ролей
	await prisma.userRole.createMany({
		data: [
			{ role_name: 'Admin' },
			{ role_name: 'Editor' },
			{ role_name: 'Viewer' }
		]
	})
	
	// Назначение ролей пользователям
	await prisma.userRoleAssignment.createMany({
		data: [
			{ user_id: 1, role_id: 1 },
			{ user_id: 2, role_id: 2 },
			{ user_id: 3, role_id: 3 }
		]
	})
	
	// Создание разрешений
	await prisma.permission.createMany({
		data: [
			{ permission_name: 'Read' },
			{ permission_name: 'Write' },
			{ permission_name: 'Delete' }
		]
	})
	
	// Создание связей ролей и разрешений
	await prisma.rolePermission.createMany({
		data: [
			{ role_id: 1, permission_id: 2 }, // Admin - Write
			{ role_id: 1, permission_id: 3 }, // Admin - Delete
			{ role_id: 2, permission_id: 2 }, // Editor - Write
			{ role_id: 3, permission_id: 1 } // Viewer - Read
		]
	})
	
	// Создание лайков
	await prisma.postLike.createMany({
		data: [
			{ user_id: 2, post_id: 1, like_date: generateDate(3) },
			{ user_id: 3, post_id: 2, like_date: generateDate(2) }
		]
	})
	
	// Создание просмотров
	await prisma.view.createMany({
		data: [
			{ user_id: 1, post_id: 1, view_date: generateDate(1) },
			{ user_id: 2, post_id: 2, view_date: generateDate(1) }
		]
	})
	
	// Создание изображений
	await prisma.image.createMany({
		data: [
			{
				url: 'https://leonardo.osnova.io/2b1829fb-5f49-494f-b193-7a4257bde6f0/-/scale_crop/72x72/-/format/webp',
				uploaded_by: 1,
				upload_date: generateDate(1)
			},
			{
				url: 'https://leonardo.osnova.io/08eabace-883e-b3ab-a2b2-338257d5b1f3/-/scale_crop/72x72/-/format/webp',
				uploaded_by: 2,
				upload_date: generateDate(2)
			}
		]
	})
	
	// Создание медиафайлов
	await prisma.media.createMany({
		data: [
			{
				post_id: 1,
				media_url: 'https://www.hollywoodreporter.com/wp-content/uploads/2014/10/interstellar_a_0.jpg?w=2000&h=1126&crop=1',
				media_type: 'image',
				upload_date: generateDate(1)
			},
			{
				post_id: 2,
				media_url: 'https://images.squarespace-cdn.com/content/v1/5a78ab8490badee028bef0e9/1568935524292-TPSLMXHD9HE6PKN02YOG/Interstellar.jpg?format=2500w',
				media_type: 'image',
				upload_date: generateDate(2)
			}
		]
	})
	
	// Создание уведомлений
	await prisma.notification.createMany({
		data: [
			{
				user_id: 1,
				content: 'Ваш пост получил новый комментарий.',
				notification_date: generateDate(1),
				read_status: false,
				type: 'comment'
			},
			{
				user_id: 2,
				content: 'Новый пост в категории, на которую вы подписаны.',
				notification_date: generateDate(1),
				read_status: false,
				type: 'post'
			}
		]
	})
	
	// Создание истории редактирования постов
	await prisma.postEditHistory.createMany({
		data: [
			{
				postId: 1,
				editorId: 1,
				oldContent: 'Старое содержимое',
				newContent: 'Новое содержимое',
				editDate: generateDate(1)
			},
			{
				postId: 2,
				editorId: 2,
				oldContent: 'Старое содержимое',
				newContent: 'Новое содержимое',
				editDate: generateDate(2)
			}
		]
	})
	
	// Создание репутации
	await prisma.reputation.createMany({
		data: [
			{ userId: 1, points: 100, createdAt: generateDate(10), updatedAt: new Date() },
			{ userId: 2, points: 50, createdAt: generateDate(5), updatedAt: new Date() }
		]
	})
	
	// Создание наград
	await prisma.badge.createMany({
		data: [
			{
				name: 'Звездный исследователь',
				iconUrl: 'https://leonardo.osnova.io/a0e881f3-d9e8-520a-bc4b-951dd3c455b5/-/scale_crop/72x72/-/format/webp',
				criteria: 'Написано 10 постов'
			},
			{
				name: 'Гуру комментариев',
				iconUrl: 'https://leonardo.osnova.io/49b68da0-b49b-56ee-875e-7bc31a295848/-/scale_crop/72x72/-/format/webp',
				criteria: 'Получено 50 лайков на комментарии'
			}
		]
	})
	
	// Назначение наград пользователям
	await prisma.userBadge.createMany({
		data: [
			{ userId: 1, badgeId: 1, awardedAt: generateDate(1) },
			{ userId: 2, badgeId: 2, awardedAt: generateDate(2) }
		]
	})
	
	// Создание подписок пользователей
	await prisma.userSubscription.createMany({
		data: [
			{ followerId: 1, followingId: 2 },
			{ followerId: 2, followingId: 3 }
		]
	})
	
	// Создание рекомендаций
	await prisma.recommendation.createMany({
		data: [
			{ userId: 1, postId: 2, reason: 'Популярный пост', createdAt: generateDate(1) },
			{ userId: 2, postId: 3, reason: 'Персонализированная рекомендация', createdAt: generateDate(2) }
		]
	})
	
	// Генерация случайных подписок
	await generateRandomSubscriptions()
	
	// Генерация случайных лайков комментариям
	await generateRandomCommentLikes()
	
	
}

async function down() {
	// Удаление данных для отката
	await prisma.$executeRaw`TRUNCATE TABLE "StormicSettings" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "StormicMedia" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "NavigationMenu" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "custom_fields" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "VerificationCode" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Post" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Bookmark" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "CategoryModerator" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Comment" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Tag" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "TagCategory" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "PostTags" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "UserRole" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "UserRoleAssignment" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Permission" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "RolePermission" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "PostLike" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "View" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Image" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Media" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Notification" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "PostEditHistory" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Reputation" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Badge" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "UserBadge" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "UserSubscription" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Recommendation" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "CategorySubscription" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "CommentLike" RESTART IDENTITY CASCADE`
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
