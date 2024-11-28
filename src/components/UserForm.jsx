import { User } from '../models/main.ts';
import useAppState from '../hooks/useAppState.tsx';


export default function UserForm() {
    const { addUser } = useAppState();

    function onSubmit(e) {
        e.preventDefault();
        const [userName] = e.target;
        const user = new User(userName.value);
        addUser(user);
    }


    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="userName">User Name</label>
            <input type="text" id="userName" name="userName" required />
        </form>
    );
}
