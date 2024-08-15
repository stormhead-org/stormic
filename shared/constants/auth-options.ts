import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import { prisma } from '@/prisma/prisma-client'
import { UserRoleType } from '@prisma/client'
import { compare, hashSync } from 'bcrypt'

export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID || '',
			clientSecret: process.env.GITHUB_SECRET || '',
			profile(profile) {
				return {
					id: profile.id,
					name: profile.name || profile.login,
					email: profile.email,
					image: profile.avatar_url,
					role: 'USER' as UserRoleType,
				}
			},
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials) {
					return null
				}

				const values = {
					email: credentials.email,
				}

				const findUser = await prisma.user.findFirst({
					where: values,
				})

				if (!findUser) {
					return null
				}

				const isPasswordValid = await compare(
					credentials.password,
					findUser.password
				)

				if (!isPasswordValid) {
					return null
				}

				if (!findUser.verified) {
					return null
				}

				return {
					id: findUser.id,
					name: findUser.fullName,
					email: findUser.email,
					image: findUser.profile_picture,
					role: findUser.role,
				}
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async signIn({ user, account }) {
			try {
				if (account?.provider === 'credentials') {
					return true
				}

				if (!user.email) {
					return false
				}

				const findUser = await prisma.user.findFirst({
					where: {
						OR: [
							{
								provider: account?.provider,
								providerId: account?.providerAccountId,
							},
							{ email: user.email },
						],
					},
				})

				if (findUser) {
					await prisma.user.update({
						where: {
							id: findUser.id,
						},
						data: {
							provider: account?.provider,
							providerId: account?.providerAccountId,
							profile_picture: user.image || findUser.profile_picture,
						},
					})

					return true
				}

				await prisma.user.create({
					data: {
						email: user.email,
						fullName: user.name || 'User #' + user.id,
						password: hashSync(user.id.toString(), 10),
						verified: new Date(),
						provider: account?.provider,
						providerId: account?.providerAccountId,
						profile_picture: user.image || null,
					},
				})

				return true
			} catch (error) {
				console.error('Error [SIGNIN]', error)
				return false
			}
		},
		async jwt({ token }) {
			if (!token.email) {
				return token
			}

			const findUser = await prisma.user.findFirst({
				where: {
					email: token.email,
				},
			})

			if (findUser) {
				token.id = String(findUser.id)
				token.fullName = findUser.fullName
				token.email = findUser.email
				token.role = findUser.role
				token.image = findUser.profile_picture
			}

			return token
		},
		session({ session, token }) {
			if (session?.user) {
				session.user.id = token.id
				session.user.role = token.role
				session.user.image = String(token.image)
			}

			return session
		},
	},
}
