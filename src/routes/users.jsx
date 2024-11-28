import UserForm from "../components/UserForm.jsx";
import useAppState from "../hooks/useAppState.tsx";

export default function UsersRoute() {
    const { state } = useAppState();
    const { users } = state;

    return (
        <section>
            <h1>Users</h1>
            <ul>
                {users.map((user) => <li>{user.name}</li>)}
            </ul>
            <h2>Add User</h2>
            <UserForm />
        </section>
    );
}
