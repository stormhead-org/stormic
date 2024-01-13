export type LoginDto = {
	email: string
	password: string
}

export type CreateUserDto = {
	fullName: string
} & LoginDto

export type ResponseUser = {
	id: number
	fullName: string
	email: string
	createdAt: string
	updatedAt: string
	token: string
}
