import InventoryDetailsTable from "@/components/InventoryDetailsTable"
import InventoryStatCards from "@/components/InventoryStatCards"
import { Button } from "@/components/ui/Button"
import { InventoryContextProvider } from "@/context/inventory"
import { Inventory } from "@/types/inventory"
import { useEffect, useState } from "react"

const InventoryStatsPage = (): JSX.Element => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isError, setIsError] = useState<boolean>(false)
	const [inventory, setInventory] = useState<Record<string, Inventory>>({})

	const updateInventoryDetails = (inventoryName: string, inventoryDetails: Inventory): void => {
		const updatedInventory = { ...inventory }
		updatedInventory[inventoryName] = inventoryDetails
		setInventory(updatedInventory)
	}

	const deleteInventoryDetails = (inventoryName: string): void => {
		const updatedInventory = { ...inventory }
		delete updatedInventory[inventoryName]
		setInventory(updatedInventory)
	}

	const getInventoryDetails = async (): Promise<void> => {
		try {
			setIsLoading(true)
			setIsError(false)

			const result = await fetch('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory')
			const inventoryArr = await result.json() as Inventory[]
			const inventoryObj: Record<string, Inventory> = {}
			inventoryArr?.forEach(inventoryItem => {
				inventoryObj[inventoryItem.name] = {
					...inventoryItem,
					// Extracting only the number value
					price: inventoryItem.price.replace(/[^0-9.]+/g, ''),
					value: inventoryItem.value.replace(/[^0-9.]+/g, ''),
					isDisabled: false
				}
			})
			setInventory(inventoryObj)
		} catch (error) {
			console.error('Error while fetching inventory details: ', error)
			setIsError(true)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getInventoryDetails()
	}, [])

	return (
		<div>
			<h1 className="text-2xl mb-10">Inventory Stats</h1>
			{isLoading
				? (
					<div className="text-muted-foreground">Loading...</div>
				)
				: isError ? (
					<div className="flex flex-col justify-center items-center gap-4">
						<p className="text-muted-foreground">Something went wrong. Please try again!</p>
						<Button
							disabled={isLoading}
							onClick={getInventoryDetails}
							variant='secondary'
						>
							Retry
						</Button>
					</div>
				)
					: (
						<InventoryContextProvider value={{ inventory, deleteInventoryDetails, updateInventoryDetails }}>
							<InventoryStatCards />
							<InventoryDetailsTable />
						</InventoryContextProvider>
					)
			}
		</div>
	)
}

export default InventoryStatsPage