import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/Dialog"
import { Label } from "@/components/ui/Label"
import { Input } from "@/components/ui/Input"
import { useInventoryContext } from "@/context/inventory"
import { Inventory } from "@/types/inventory"
import { Button } from "./ui/Button"

interface EditInventoryDetailsDialogProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    inventoryName: string
}

type EditInventoryDetailsFormState = Omit<Inventory, 'name' | 'isDisabled'>

const EditInventoryDetailsDialog = ({ inventoryName, open, setOpen }: EditInventoryDetailsDialogProps): JSX.Element => {
    const { inventory, updateInventoryDetails } = useInventoryContext()
    const selectedEditInventory = inventory[inventoryName]

    const [editFormState, setEditFormState] = useState<EditInventoryDetailsFormState>({
        category: selectedEditInventory.category,
        price: selectedEditInventory.price,
        quantity: selectedEditInventory.quantity,
        value: selectedEditInventory.value,
    })

    const handleOnChange = (key: keyof EditInventoryDetailsFormState, event: ChangeEvent<HTMLInputElement>): void => {
        setEditFormState(prevEditFormState => {
            const updatedEditFormState = {
                ...prevEditFormState,
                [key]: event.target.value,
            }
            const value = `${Number(updatedEditFormState.price) * Number(updatedEditFormState.quantity)}`

            return {
                ...updatedEditFormState,
                value,
                quantity: Number(updatedEditFormState.quantity)
            }
        })

    }

    const handleOnFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        updateInventoryDetails(inventoryName, { ...selectedEditInventory, ...editFormState })
        setOpen(false)
    }

    useEffect(() => {
        setEditFormState({
            category: selectedEditInventory.category,
            price: selectedEditInventory.price,
            quantity: selectedEditInventory.quantity,
            value: selectedEditInventory.value,
        })
    }, [inventoryName, selectedEditInventory])

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent onOpenAutoFocus={event => { event.preventDefault() }}>
                <DialogHeader>
                    <DialogTitle className="text-lg font-medium">
                        Edit Product
                    </DialogTitle>
                    <DialogDescription className="capitalize">
                        {selectedEditInventory.name}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleOnFormSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                onChange={(event) => handleOnChange('category', event)}
                                value={editFormState.category}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                type="number"
                                id="price"
                                onChange={(event) => handleOnChange('price', event)}
                                value={editFormState.price}
                                min={0}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input
                                type="number"
                                id="quantity"
                                onChange={(event) => handleOnChange('quantity', event)}
                                value={editFormState.quantity}
                                min={0}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="value">Value</Label>
                            <Input
                                type="number"
                                id="value"
                                disabled
                                value={editFormState.value}
                                min={0}
                            />
                        </div>
                    </div>

                    <DialogFooter className="flex gap-2">
                        <DialogClose>Cancel</DialogClose>
                        <Button variant='secondary' type="submit">Save</Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default EditInventoryDetailsDialog