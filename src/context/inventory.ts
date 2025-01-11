import { Inventory } from '@/types/inventory';
import { createContext, useContext } from 'react';

interface InventoryContextType {
    inventory: Record<string, Inventory>
    deleteInventoryDetails: (inventoryName: string) => void
    updateInventoryDetails: (inventoryName: string, inventoryDetails: Inventory) => void
}

const inventoryContext = createContext<InventoryContextType | null>(null)

export const InventoryContextProvider = inventoryContext.Provider

export const useInventoryContext = (): InventoryContextType => useContext(inventoryContext) as InventoryContextType
