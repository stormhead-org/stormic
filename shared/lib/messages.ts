type NestedMessages = Record<string, any>;
type TranslationMessages = Record<string, string>;

interface Messages {
	[locale: string]: TranslationMessages;
}

// Функция для преобразования вложенных сообщений в плоский формат
const flattenMessages = (nestedMessages: NestedMessages, prefix = ''): TranslationMessages => {
	let messages: TranslationMessages = {}
	for (const [key, value] of Object.entries(nestedMessages)) {
		const newKey = prefix ? `${prefix}.${key}` : key
		if (typeof value === 'object' && value !== null) {
			messages = { ...messages, ...flattenMessages(value, newKey) }
		} else {
			messages[newKey] = value
		}
	}
	return messages
}

// Импортируем ваши локали
import enLocale from '@/public/locales/en.json'
import ruLocale from '@/public/locales/ru.json'

// Преобразуем локали в плоский формат
export const messages: Messages = {
	en: flattenMessages(enLocale),
	ru: flattenMessages(ruLocale)
}
