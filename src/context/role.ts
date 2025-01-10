import { Role } from '@/types/rolePermissions'
import { createContext, Dispatch, SetStateAction, useContext } from 'react'

interface RoleContextType {
  role: Role
  setRole: Dispatch<SetStateAction<Role>>
}

export const roleContext =
  createContext<RoleContextType | null>(null)

export const RoleContextProvider = roleContext.Provider

export const useRoleContext = (): RoleContextType => useContext(roleContext) as RoleContextType
