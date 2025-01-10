import RoleSwitch from "./RoleSwitch"

const Header = (): JSX.Element => {
    return (
        <div className="flex items-end w-full flex-col mb-10">
            <RoleSwitch />
        </div>
    )
}

export default Header