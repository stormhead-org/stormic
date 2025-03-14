import { LexicalEditor } from 'lexical'
import * as React from 'react'

import {
	MAX_ALLOWED_FONT_SIZE,
	MIN_ALLOWED_FONT_SIZE
} from '../../context/ToolbarContext'
import {
	updateFontSize,
	updateFontSizeInSelection,
	UpdateFontSizeType
} from './utils'

export function parseAllowedFontSize(input: string): string {
	const match = input.match(/^(\/d+(?:\.\d+)?)px$/)
	if (match) {
		const n = Number(match[1])
		if (n >= MIN_ALLOWED_FONT_SIZE && n <= MAX_ALLOWED_FONT_SIZE) {
			return input
		}
	}
	return ''
}

export default function FontSize({
	selectionFontSize,
	disabled,
	editor
}: {
	selectionFontSize: string
	disabled: boolean
	editor: LexicalEditor
}) {
	const [inputValue, setInputValue] = React.useState<string>(selectionFontSize)
	const [inputChangeFlag, setInputChangeFlag] = React.useState<boolean>(false)

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const inputValueNumber = Number(inputValue)

		if (e.key === 'Tab') {
			return
		}
		if (['e', 'E', '+', '-'].includes(e.key) || isNaN(inputValueNumber)) {
			e.preventDefault()
			setInputValue('')
			return
		}
		setInputChangeFlag(true)
		if (e.key === 'Enter' || e.key === 'Escape') {
			e.preventDefault()
			updateFontSizeByInputValue(inputValueNumber)
		}
	}

	const handleInputBlur = () => {
		if (inputValue !== '' && inputChangeFlag) {
			const inputValueNumber = Number(inputValue)
			updateFontSizeByInputValue(inputValueNumber)
		}
	}

	const updateFontSizeByInputValue = (inputValueNumber: number) => {
		let updatedFontSize = inputValueNumber
		if (inputValueNumber > MAX_ALLOWED_FONT_SIZE) {
			updatedFontSize = MAX_ALLOWED_FONT_SIZE
		} else if (inputValueNumber < MIN_ALLOWED_FONT_SIZE) {
			updatedFontSize = MIN_ALLOWED_FONT_SIZE
		}

		setInputValue(String(updatedFontSize))
		updateFontSizeInSelection(editor, `${updatedFontSize}px`, null)
		setInputChangeFlag(false)
	}

	React.useEffect(() => {
		setInputValue(selectionFontSize)
	}, [selectionFontSize])

	return (
		<div className='flex items-center space-x-2'>
			<button
				type='button'
				disabled={
					disabled ||
					(selectionFontSize !== '' &&
						Number(inputValue) <= MIN_ALLOWED_FONT_SIZE)
				}
				onClick={() =>
					updateFontSize(editor, UpdateFontSizeType.decrement, inputValue)
				}
				className='p-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50'
				title='Decrease font size'
			>
				<i className='bg-[url(/lexical/icons/minus-sign.svg)] bg-no-repeat bg-center w-4 h-4 block' />
			</button>

			<input
				type='number'
				title='Font size'
				value={inputValue}
				disabled={disabled}
				className='w-12 text-center text-sm font-bold text-gray-700 dark:text-gray-300 border border-gray-400 rounded disabled:opacity-50'
				min={MIN_ALLOWED_FONT_SIZE}
				max={MAX_ALLOWED_FONT_SIZE}
				onChange={e => setInputValue(e.target.value)}
				onKeyDown={handleKeyPress}
				onBlur={handleInputBlur}
			/>

			<button
				type='button'
				disabled={
					disabled ||
					(selectionFontSize !== '' &&
						Number(inputValue) >= MAX_ALLOWED_FONT_SIZE)
				}
				onClick={() =>
					updateFontSize(editor, UpdateFontSizeType.increment, inputValue)
				}
				className='p-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50'
				title='Increase font size'
			>
				<i className='bg-[url(/lexical/icons/add-sign.svg)] bg-no-repeat bg-center w-4 h-4 block' />
			</button>
		</div>
	)
}
