import { Button } from "@/components/ui/Button"
import { Table, TableBody, TableHead, TableCell, TableHeader, TableRow } from "@/components/ui/Table"
import { useInventoryContext } from "@/context/inventory"
import { useRoleContext } from "@/context/role"
import { rolePermissions } from "@/configs/rolePermissions"
import { Inventory } from "@/types/inventory"
import { useState } from "react"
import EditInventoryDetailsDialog from "./EditInventoryDetailsDialog"

const InventoryDetailsTable = (): JSX.Element => {
    const [openEditInventory, setOpenEditInventory] = useState<boolean>(false)
    const [editInventory, setEditInventory] = useState<string | null>(null)

    const { inventory, deleteInventoryDetails, updateInventoryDetails } = useInventoryContext()
    const { role } = useRoleContext()
    const permissions = rolePermissions?.[role]

    const handleEdit = (selectedInventory: Inventory): void => {
        if (!permissions.edit || selectedInventory.isDisabled) return
        setEditInventory(selectedInventory.name)
        setOpenEditInventory(true)
    }

    const handleDisable = (selectedInventory: Inventory): void => {
        if (!permissions.disable) return

        const updatedInventory = {
            ...selectedInventory,
            isDisabled: !selectedInventory.isDisabled
        } as Inventory
        updateInventoryDetails(selectedInventory.name, updatedInventory)
    }

    const handleDelete = (inventoryName: string): void => {
        if (!permissions.delete) return
        deleteInventoryDetails(inventoryName)
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow className='hover:bg-transparent data-[state=selected]:bg-transparent' >
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.values(inventory).map(inventoryItem => (
                        <TableRow className="capitalize" key={inventoryItem.name}>
                            <TableCell>{inventoryItem.name}</TableCell>
                            <TableCell>{inventoryItem.category}</TableCell>
                            <TableCell>${inventoryItem.price}</TableCell>
                            <TableCell>{inventoryItem.quantity}</TableCell>
                            <TableCell>${inventoryItem.value}</TableCell>
                            <TableCell className="flex items-center gap-4">
                                <Button
                                    disabled={!permissions.edit || inventoryItem.isDisabled}
                                    onClick={() => handleEdit(inventoryItem)}
                                    variant='ghost'
                                >
                                    Edit
                                </Button>
                                <Button
                                    disabled={!permissions.disable}
                                    onClick={() => handleDisable(inventoryItem)}
                                    variant='ghost'
                                >
                                    Disable
                                </Button>
                                <Button
                                    disabled={!permissions.delete}
                                    onClick={() => handleDelete(inventoryItem.name)}
                                    variant='ghost'
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {editInventory && (
                <EditInventoryDetailsDialog
                    inventoryName={editInventory}
                    open={openEditInventory}
                    setOpen={setOpenEditInventory}
                />
            )}
        </>

    )
}

export default InventoryDetailsTable