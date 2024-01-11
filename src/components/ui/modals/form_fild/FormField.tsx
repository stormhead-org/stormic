import React from 'react'
import { useFormContext } from 'react-hook-form'
import styles from '../login/ModalLogin.module.scss'

interface FormFieldProps {
	name: string
	label: string
	type: string
}

export const FormField: React.FC<FormFieldProps> = ({ name, label, type }) => {
	const { register, formState } = useFormContext()

	return (
		<>
			<div className={styles.LoginButtonFrame}>
				<input
					className={styles.LoginInput}
					{...register(name)}
					name={name}
					type={type}
					placeholder={label}
				/>
			</div>
			{/* <label className={styles.ErrorsMsg}>
				{formState.errors[name]?.message}
			</label> */}
		</>
	)
}
