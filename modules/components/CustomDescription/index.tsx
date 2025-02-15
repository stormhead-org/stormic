'use client'
import type { FieldDescriptionClientComponent } from 'payload'

export const FieldDescriptionComponent: FieldDescriptionClientComponent = ({
	path,
}) => {
	return (
		<div className={`field-description-${path}`}>
			Component description: {path}
		</div>
	)
}
