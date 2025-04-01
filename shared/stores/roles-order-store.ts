import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RolesOrderState {
	roleOrder: number[]; // Храним только порядок id ролей
	setRoleOrder: (order: number[]) => void;
	updateRoleOrder: (activeId: number, overId: number) => void;
}

export const useRolesStore = create<RolesOrderState>()(
	persist(
		(set) => ({
			roleOrder: [],
			setRoleOrder: (order) => set({ roleOrder: order }),
			updateRoleOrder: (activeId, overId) =>
				set((state) => {
					const newOrder = [...state.roleOrder];
					const oldIndex = newOrder.indexOf(activeId);
					const newIndex = newOrder.indexOf(overId);
					
					if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
						const [movedId] = newOrder.splice(oldIndex, 1);
						newOrder.splice(newIndex, 0, movedId);
					}
					
					return { roleOrder: newOrder };
				}),
		}),
		{
			name: 'roles-order-storage', // Ключ для localStorage
		}
	)
);
