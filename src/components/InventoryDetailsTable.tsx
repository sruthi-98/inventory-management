import { Button } from "@/components/ui/Button"
import { Table, TableBody, TableHead, TableCell, TableHeader, TableRow } from "@/components/ui/Table"
import { useInventoryContext } from "@/context/inventory"
import { useRoleContext } from "@/context/role"
import { rolePermissions } from "@/configs/rolePermissions"
import { Inventory } from "@/types/inventory"
import { useState } from "react"
import EditInventoryDetailsDialog from "./EditInventoryDetailsDialog"
import { Eye, EyeOff, PencilIcon, Trash } from "lucide-react"
import { cn } from "@/utils/cn"

const tableColumns = ['Name', 'Category', 'Price', 'Quantity', 'Value', 'Actions']

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
            <Table className="rounded-md border bg-popover">
                <TableHeader>
                    <TableRow className='hover:bg-transparent data-[state=selected]:bg-transparent' >
                        {tableColumns.map(column => (
                            <TableHead key={column}>
                                <span className="text-lime-400 p-1.5 rounded-md bg-background">{column}</span>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.values(inventory).length === 0 && (
                        <TableRow>
                            <TableCell colSpan={tableColumns.length}>
                                <div className="text-center p-5 w-full">No items</div>
                            </TableCell>
                        </TableRow>
                    )}
                    {Object.values(inventory).map(inventoryItem => (
                        <TableRow className="capitalize" key={inventoryItem.name}>
                            <TableCell>{inventoryItem.name}</TableCell>
                            <TableCell>{inventoryItem.category}</TableCell>
                            <TableCell>${inventoryItem.price}</TableCell>
                            <TableCell>{inventoryItem.quantity}</TableCell>
                            <TableCell>${inventoryItem.value}</TableCell>
                            <TableCell className="flex items-center gap-1">
                                <Button
                                    aria-label="Edit inventory item"
                                    disabled={!permissions.edit || inventoryItem.isDisabled}
                                    onClick={() => handleEdit(inventoryItem)}
                                    size='icon'
                                    variant='ghost'
                                >
                                    <PencilIcon className={cn(!permissions.edit || inventoryItem.isDisabled ? '' : "text-green-700")} />
                                </Button>
                                <Button
                                    aria-label="Disable inventory item"
                                    disabled={!permissions.disable}
                                    onClick={() => handleDisable(inventoryItem)}
                                    size='icon'
                                    variant='ghost'
                                >
                                    {inventoryItem.isDisabled ? <EyeOff className={cn(!permissions.disable ? '' : "text-fuchsia-400")} /> : <Eye className={cn(!permissions.disable ? '' : "text-fuchsia-400")} />}
                                </Button>
                                <Button
                                    aria-label="Delete inventory item"
                                    disabled={!permissions.delete}
                                    onClick={() => handleDelete(inventoryItem.name)}
                                    size='icon'
                                    variant='ghost'
                                >
                                    <Trash className={cn(!permissions.delete ? '' : "text-red-600")} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table >

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