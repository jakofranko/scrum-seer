import Nav from "../components/Nav.jsx";
import UserForm from "../components/UserForm.jsx";
import useAppState from "../hooks/useAppState.jsx";

export default function UsersRoute() {
    const { state } = useAppState();
    const { users } = state;

    return (
        <section>
            <Nav />
            <h1>Users</h1>
            <ul>
                {users.map((user) => <li>{user.name}</li>)}
            </ul>
            <h2>Add User</h2>
            <UserForm />
        </section>
    );
}
