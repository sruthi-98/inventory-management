export type Role = 'admin' | 'user'

export interface RolePermission {
    edit: boolean;
    delete: boolean;
    disable: boolean;
}