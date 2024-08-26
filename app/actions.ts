'use server'

import { prisma } from '@/prisma/prisma-client'
import { VerificationUserTemplate } from '@/shared/components/email-templates/verification-user'
import { sendEmail } from '@/shared/lib'
import { getUserSession } from '@/shared/lib/'
import { Prisma } from '@prisma/client'
import { compareSync, hashSync } from 'bcrypt'


export interface CustomField {
	id: number;
	key: string;
	value: string;
}

export interface UserProfile {
	id: number;
	fullName: string;
	email: string;
	bio: string | null;
	customFields: CustomField[];
}

export async function updateUserInfo({ data }: {
	where: { id: number };
	data: Prisma.UserUpdateInput & { customFields?: CustomField[] };
}) {
	try {
		const currentUser = await getUserSession()
		
		if (!currentUser) {
			throw new Error('Пользователь не найден')
		}
		
		const findUser = await prisma.user.findFirst({
			where: {
				id: Number(currentUser.id)
			}
		})
		
		if (!findUser) {
			throw new Error('Пользователь не найден в базе данных')
		}
		
		const updatedUser = await prisma.user.update({
			where: {
				id: Number(currentUser.id)
			},
			data: {
				fullName: data.fullName,
				email: data.email,
				bio: data.bio,
				// password: data.password
				// 	? hashSync(data.password as string, 10)
				// 	: findUser.password,
				customFields: data.customFields
					? {
						upsert: data.customFields.map((field) => ({
							where: { id: field.id },
							create: {
								key: field.key,
								value: field.value
							},
							update: {
								key: field.key,
								value: field.value
							}
						}))
					}
					: undefined
			},
			include: { customFields: true }
		})
		return updatedUser
	} catch (err) {
		console.log('Error [UPDATE_USER]', err)
		throw err
	}
}

// Функция проверки текущего пароля
export async function checkCurrentPassword(userId: number, currentPassword: string): Promise<boolean> {
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId }
		})
		
		if (!user) {
			throw new Error('User not found')
		}
		
		return compareSync(currentPassword, user.password)
	} catch (error) {
		console.error('Error checking current password:', error)
		throw error
	}
}

export async function getUserInfo(userId: number) {
	try {
		if (!userId) {
			throw new Error('User ID is required')
		}
		
		const user = await prisma.user.findUnique({
			where: { id: Number(userId) },
			include: { customFields: true }
		})
		
		if (!user) {
			throw new Error('User not found')
		}
		
		return user
	} catch (err) {
		console.log('Error fetching user:', err)
		throw err
	}
}

export async function registerUser(body: Prisma.UserCreateInput) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: body.email
			}
		})
		
		if (user) {
			if (!user.verified) {
				throw new Error('Почта не подтверждена')
			}
			
			throw new Error('Пользователь уже существует')
		}
		
		const createdUser = await prisma.user.create({
			data: {
				fullName: body.fullName,
				email: body.email,
				password: hashSync(body.password, 10)
			}
		})
		
		const code = Math.floor(100000 + Math.random() * 900000).toString()
		
		await prisma.verificationCode.create({
			data: {
				code,
				userId: createdUser.id
			}
		})
		
		await sendEmail(
			createdUser.email,
			'Stormic Community / 📝 Подтверждение регистрации',
			VerificationUserTemplate({
				code
			})
		)
	} catch (err) {
		console.log('Error [CREATE_USER]', err)
		throw err
	}
}
