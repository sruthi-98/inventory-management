import { Card, CardDescription, CardTitle } from "@/components/ui/Card"
import { useInventoryContext } from "@/context/inventory"
import { useMemo } from "react"

const InventoryStatCards = (): JSX.Element => {
    const { inventory } = useInventoryContext()

    const [totalProduct, totalStoreValue, outOfStock, noOfCategory] = useMemo(() => {
        let totalProduct = 0, totalStoreValue = 0, outOfStock = 0
        const categories = new Set<string>()
        Object.values(inventory).forEach(inventoryItem => {
            if (inventoryItem.isDisabled) return

            totalProduct += Number(inventoryItem.quantity)
            totalStoreValue += Number(inventoryItem.value)
            outOfStock += Number(inventoryItem.quantity === 0)
            categories.add(inventoryItem.category)
        })
        const noOfCategory = categories.size

        return [totalProduct, totalStoreValue, outOfStock, noOfCategory]
    }, [inventory])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <Card className="p-5">
                <CardTitle>Total product</CardTitle>
                <CardDescription className="text-2xl font-bold mt-2">{totalProduct}</CardDescription>
            </Card>

            <Card className="p-5">
                <CardTitle>Total store value</CardTitle>
                <CardDescription className="text-2xl font-bold mt-2">{totalStoreValue}</CardDescription>
            </Card>

            <Card className="p-5">
                <CardTitle>Out of stock product</CardTitle>
                <CardDescription className="text-2xl font-bold mt-2">{outOfStock}</CardDescription>
            </Card>

            <Card className="p-5">
                <CardTitle>No. of category</CardTitle>
                <CardDescription className="text-2xl font-bold mt-2">{noOfCategory}</CardDescription>
            </Card>
        </div>
    )
}

export default InventoryStatCards