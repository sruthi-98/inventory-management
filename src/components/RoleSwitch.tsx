import { useRoleContext } from "@/context/role"
import { Switch } from "./ui/Switch"

const RoleSwitch = (): JSX.Element => {
    const { role, setRole } = useRoleContext()

    const handleOnCheckedChange = (checked: boolean): void => {
        setRole(checked ? 'user' : 'admin')
    }

    return (
        <div className="flex items-center gap-3">
            <label className="text-sm">Admin</label>
            <Switch checked={role === 'user'} onCheckedChange={handleOnCheckedChange} />
            <label className="text-sm">User</label>
        </div>
    )
}

export default RoleSwitch