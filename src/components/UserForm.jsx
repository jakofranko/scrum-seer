import { User } from '../models/main.ts';

function onSubmit(e) {
    e.preventDefault();
    const [userName] = e.target;
    const user = new User(userName.value);
    console.log(user);
}

export default function UserForm() {
    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="userName">User Name</label>
            <input type="text" id="userName" name="userName" required />
        </form>
    );
}
