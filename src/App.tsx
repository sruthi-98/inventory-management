import { useState } from "react"
import InventoryStatsPage from "./pages/InventoryStats"
import { Role } from "./types/rolePermissions"
import Header from "./components/Header"
import { RoleContextProvider } from "./context/role"

function App() {
	const [role, setRole] = useState<Role>('admin')

	return (
		<RoleContextProvider value={{ role, setRole }}>
			<div className="container mx-auto p-5">
				<Header />
				<InventoryStatsPage />
			</div>
		</RoleContextProvider>
	)
}

export default App
