import { Community, FollowCommunity, Role } from '@/payload-types';
import { Container } from '@/shared/components/container';
import { PermissionsForm } from '@/shared/components/profiles/settings/community/permissions/forms/permissions-form';
import { useRolesStore } from '@/shared/stores/roles-order-store';
import { ChevronLeft, GripVertical, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { UsersForm } from './users-form';
import { VisualForm } from './vasual-form';
import { DndContext, closestCenter, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
	data: Community;
	selectedRoleId: number | null;
	setSelectedRoleId: (id: number) => void;
	communityRoles: Role[];
	communityUsers: FollowCommunity[];
	setType: React.Dispatch<React.SetStateAction<'main' | 'editor'>>;
}

const isRole = (role: number | Role): role is Role => {
	return (
		typeof role === 'object' &&
		role !== null &&
		'id' in role &&
		'name' in role &&
		'color' in role
	);
};

const SortableRoleItem: React.FC<{
	role: Role;
	selectedRoleId: number | null;
	setSelectedRoleId: (id: number) => void;
	handleSubmitDeleteRole: (roleId: number) => Promise<void>;
}> = ({ role, selectedRoleId, setSelectedRoleId, handleSubmitDeleteRole }) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: role.id });
	
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};
	
	return (
		<div
			ref={setNodeRef}
			style={style}
			className={`flex w-full p-2 rounded-md gap-1 ${
				selectedRoleId === role.id ? 'bg-blue-700' : 'bg-gray-700'
			}`}
		>
			<div
				{...attributes}
				{...listeners}
				className="flex items-center p-1 cursor-grab hover:bg-gray-600 rounded-md"
			>
				<GripVertical size={18} />
			</div>
			<div
				className="flex items-center justify-between w-full cursor-pointer"
				onClick={() => setSelectedRoleId(role.id)}
			>
				<div className="flex items-center gap-2">
					<div
						className="w-4 h-4 rounded-md"
						style={{ backgroundColor: role.color || '#99AAB5' }}
					/>
					<div>{role.name}</div>
				</div>
				{role.name !== '@everyone' && (
					<div className="group -my-7">
						<p className="flex p-1 items-center group-hover:text-blue-700 font-bold">
							<Trash2
								className="group-hover:bg-blue-800/20 rounded-full ml-2 w-7 h-7 p-1 cursor-pointer"
								onClick={async (e) => {
									e.stopPropagation();
									try {
										await handleSubmitDeleteRole(role.id);
									} catch (error) {
										console.error('Ошибка при удалении роли:', error);
									}
								}}
							/>
						</p>
					</div>
				)}
			</div>
		</div>
);
};

export const EditorForm: React.FC<Props> = ({
	                                            setType,
	                                            data,
	                                            communityRoles: initialRolesProp,
	                                            communityUsers,
	                                            selectedRoleId,
	                                            setSelectedRoleId,
                                            }) => {
	const router = useRouter();
	const [typeEditor, setTypeEditor] = useState<'visual' | 'permissions' | 'users'>('visual');
	const { roleOrder, setRoleOrder, updateRoleOrder } = useRolesStore();
	
	// Сортируем роли из initialRolesProp согласно порядку в Zustand
	const sortedRoles = React.useMemo(() => {
		const initialRoles = initialRolesProp.filter(isRole);
		if (roleOrder.length === 0) {
			setRoleOrder(initialRoles.map((role) => role.id));
			return initialRoles;
		}
		
		const roleMap = new Map(initialRoles.map((role) => [role.id, role]));
		const orderedRoles = roleOrder
			.map((id) => roleMap.get(id))
			.filter((role): role is Role => !!role);
		
		// Добавляем новые роли, которых нет в roleOrder
		const currentIds = new Set(roleOrder);
		const newRoles = initialRoles.filter((role) => !currentIds.has(role.id));
		return [...orderedRoles, ...newRoles];
	}, [initialRolesProp, roleOrder, setRoleOrder]);
	
	// Синхронизация порядка ролей при добавлении или удалении
	useEffect(() => {
		const initialRoles = initialRolesProp.filter(isRole);
		const initialIds = new Set(initialRoles.map((role) => role.id));
		
		if (roleOrder.length !== initialIds.size || roleOrder.some((id) => !initialIds.has(id))) {
			const newOrder = roleOrder.filter((id) => initialIds.has(id));
			const newRoleIds = initialRoles
				.filter((role) => !new Set(newOrder).has(role.id))
				.map((role) => role.id);
			setRoleOrder([...newOrder, ...newRoleIds]);
		}
	}, [initialRolesProp, roleOrder, setRoleOrder]);
	
	const everyoneRole = sortedRoles.find((role) => role.name === '@everyone');
	
	useEffect(() => {
		if (!selectedRoleId && everyoneRole) {
			setSelectedRoleId(everyoneRole.id);
		}
	}, [selectedRoleId, everyoneRole, setSelectedRoleId]);
	
	const selectedRole = sortedRoles.find((role) => role.id === selectedRoleId);
	
	const handleSubmitNewRole = async () => {
		const newRoleData = {
			name: 'Новая роль',
			community: data.id,
		};
		try {
			const response = await fetch('/api/roles', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newRoleData),
			});
			
			if (!response.ok) {
				throw new Error(`Ошибка создания роли: ${response.status}`);
			}
			
			const result = await response.json();
			router.refresh();
			setSelectedRoleId(result.doc.id);
		} catch (error) {
			console.error('Ошибка при создании роли:', error);
		}
	};
	
	const isEveryoneRole = selectedRole?.name === '@everyone';
	
	const handleSubmitDeleteRole = async (roleId: number) => {
		const roles = sortedRoles || [];
		const currentIndex = roles.findIndex((role) => role.id === roleId);
		let nextRoleId: number | null = null;
		
		if (currentIndex > 0) {
			nextRoleId = roles[currentIndex - 1].id;
		} else if (roles.length > 1) {
			nextRoleId = roles[1].id;
		} else {
			nextRoleId = everyoneRole?.id || null;
		}
		
		try {
			const stringifiedQuery = qs.stringify(
				{
					where: {
						id: { equals: roleId },
						community: { equals: data.id },
					},
				},
				{ addQueryPrefix: true }
			);
			const req = await fetch(`/api/roles/${stringifiedQuery}`, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (req.ok) {
				const updatedOrder = roleOrder.filter((id) => id !== roleId);
				setRoleOrder(updatedOrder);
				router.refresh();
				if (nextRoleId) {
					setSelectedRoleId(nextRoleId);
				}
			}
		} catch (err) {
			console.log(err);
		}
	};
	
	const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
	
	const handleDragEnd = (event: any) => {
		const { active, over } = event;
		
		if (active.id !== over.id) {
			updateRoleOrder(active.id, over.id);
		}
	};
	
	return (
		<Container className="bg-secondary rounded-md mt-1 p-4 w-full">
			<div className="flex w-full gap-4">
				<div className="w-1/3">
					<div className="flex justify-between items-center">
						<div
							className="flex items-center gap-2 pr-2 hover:bg-gray-700 cursor-pointer rounded-md"
							onClick={() => setType('main')}
						>
							<ChevronLeft size={18} />
							<p className="text-lg">Назад</p>
						</div>
						<div className="group -my-7">
							<p className="flex p-1 items-center group-hover:text-blue-700 font-bold">
								<Plus
									className="group-hover:bg-blue-800/20 rounded-full ml-2 w-7 h-7 p-1 cursor-pointer font-bold"
									onClick={handleSubmitNewRole}
								/>
							</p>
						</div>
					</div>
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<SortableContext
							items={sortedRoles.map((role) => role.id)}
							strategy={verticalListSortingStrategy}
						>
							<div className="mt-2 flex flex-col gap-2">
								{sortedRoles.map((role) => (
									<SortableRoleItem
										key={role.id}
										role={role}
										selectedRoleId={selectedRoleId}
										setSelectedRoleId={setSelectedRoleId}
										handleSubmitDeleteRole={handleSubmitDeleteRole}
									/>
								))}
							</div>
						</SortableContext>
					</DndContext>
				</div>
				<div className="w-2/3">
					{selectedRole && (
						<>
							{typeEditor === 'visual' && (
								<VisualForm
									selectedRole={selectedRole}
									isEveryoneRole={isEveryoneRole}
									setTypeEditor={setTypeEditor}
								/>
							)}
							{typeEditor === 'permissions' && (
								<PermissionsForm
									selectedRole={selectedRole}
									isEveryoneRole={isEveryoneRole}
									setTypeEditor={setTypeEditor}
								/>
							)}
							{typeEditor === 'users' && (
								<UsersForm
									selectedRole={selectedRole}
									isEveryoneRole={isEveryoneRole}
									communityUsers={communityUsers}
									setTypeEditor={setTypeEditor}
								/>
							)}
						</>
					)}
				</div>
			</div>
		</Container>
	);
};
