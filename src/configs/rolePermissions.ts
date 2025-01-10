import { Role, RolePermission } from "@/types/rolePermissions";

export const rolePermissions: Record<Role, RolePermission> = {
    admin: {
        edit: true,
        delete: true,
        disable: true
    },
    user: {
        edit: false,
        delete: false,
        disable: false
    }
}