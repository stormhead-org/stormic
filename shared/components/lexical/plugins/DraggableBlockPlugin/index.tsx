/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { JSX } from 'react'
import React from 'react'

import { DraggableBlockPlugin_EXPERIMENTAL } from '@lexical/react/LexicalDraggableBlockPlugin'
import { useRef } from 'react'
import { GripVertical } from 'lucide-react'

const DRAGGABLE_BLOCK_MENU_CLASSNAME = 'draggable-block-menu'

function isOnMenu(element: HTMLElement): boolean {
	return !!element.closest(`.${DRAGGABLE_BLOCK_MENU_CLASSNAME}`)
}

export default function DraggableBlockPlugin({
	anchorElem = document.body
}: {
	anchorElem?: HTMLElement
}): JSX.Element {
	const menuRef = useRef<HTMLDivElement>(null)
	const targetLineRef = useRef<HTMLDivElement>(null)

	return (
		<DraggableBlockPlugin_EXPERIMENTAL
			anchorElem={anchorElem}
			menuRef={menuRef as React.RefObject<HTMLElement>}
			targetLineRef={targetLineRef as React.RefObject<HTMLElement>}
			menuComponent={
				<div
					ref={menuRef}
					className='draggable-block-menu rounded py-[2px] px-[1px] cursor-grab opacity-0 absolute left-0 top-0 [will-change:transform] active:cursor-grabbing hover:bg-gray-500'
				>
					<GripVertical size={20} className='opacity-30 text-primary' />
				</div>
			}
			targetLineComponent={
				<div
					ref={targetLineRef}
					className='pointer-events-none bg-gray-600 h-[4px] absolute left-0 top-0 opacity-0 [will-change:transform]'
				/>
			}
			isOnMenu={isOnMenu}
		/>
	)
}
