import { GlobalConfig } from "payload";

export const SidebarNavigation: GlobalConfig = {
  label: "Левое меню навигации",
  slug: "sidebar-navigation",
  fields: [
    {
      label: "Меню навигации",
      name: "items",
      type: "array",
      // required: true,
      maxRows: 10,
      fields: [
        {
          label: "Пост",
          name: "post",
          type: "relationship",
          relationTo: "posts",
          // required: true,
        },
      ],
    },
  ],
};
