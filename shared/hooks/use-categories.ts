import { Api } from '@/shared/services/api-client'
import { Category } from '@prisma/client'
import React from 'react'

export const useCategories = () => {
	const [categories, setCategories] = React.useState<Category[]>([])
	const [loading, setLoading] = React.useState(true)
	
	React.useEffect(() => {
		async function fetchCategories() {
			try {
				setLoading(true)
				const categories = await Api.categories.getAll()
				setCategories(categories)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}
		
		fetchCategories()
	}, [])
	
	return {
		categories,
		loading,
	}
}
