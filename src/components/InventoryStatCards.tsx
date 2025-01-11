import { Card, CardDescription, CardTitle } from "@/components/ui/Card"
import { useInventoryContext } from "@/context/inventory"
import { Boxes, CircleDollarSign, CircleOff, ShoppingCart } from "lucide-react"
import { useMemo } from "react"

const inventoryStatCards = [
    {
        Icon: ShoppingCart,
        title: 'Total Product',
        key: 'totalProduct'
    },
    {
        Icon: CircleDollarSign,
        title: 'Total store value',
        key: 'totalStoreValue'
    },
    {
        Icon: CircleOff,
        title: 'Out of stock product',
        key: 'outOfStock'
    },
    {
        Icon: Boxes,
        title: 'No. of category',
        key: 'noOfCategory'
    }
]

const InventoryStatCards = (): JSX.Element => {
    const { inventory } = useInventoryContext()

    const inventoryStats = useMemo(() => {
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

        return { totalProduct, totalStoreValue, outOfStock, noOfCategory }
    }, [inventory])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {inventoryStatCards.map(card => (
                <Card className="p-5 flex gap-4" key={card.key}>
                    <card.Icon />
                    <div>
                        <CardTitle>{card.title}</CardTitle>
                        <CardDescription className="text-2xl text-primary font-bold mt-2">{inventoryStats[card.key as keyof typeof inventoryStats]}</CardDescription>
                    </div>
                </Card>
            ))}
        </div>
    )
}

export default InventoryStatCards