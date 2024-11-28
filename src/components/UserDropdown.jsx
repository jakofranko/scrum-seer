import useAppState from "../hooks/useAppState.tsx";

export default function UserDropdown() {
    const { state: { users } } = useAppState();

    return (
        <select name="user-dropdown">
            <option value="">Select User</option>
            {users.map((user) => <option value={user.id}>{user.name}</option>)}
        </select>
    );
}

