import { User } from "@/payload-types";
import { FieldHook } from "payload";
// ensure there is always a `user` role
// do not let non-admins change roles
export const protectRoles: FieldHook<{ id: string } & User> = ({
  data,
  req,
}) => {
  const isOwner =
    req.user?.roles.includes("owner") || data.email === "demo@payloadcms.com"; // for the seed script

  if (!isOwner) {
    return ["user"];
  }

  const userRoles = new Set(data?.roles || []);
  userRoles.add("user");
  return [...userRoles];
};
