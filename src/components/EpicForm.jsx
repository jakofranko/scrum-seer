import { Epic } from '../models/main.ts';

function onSubmit(e) {
    e.preventDefault();
    const [epicName] = e.target;
    const epic = new Epic(epicName.value);
    console.log(epic);
}

export default function EpicForm() {
    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="epicName">Epic Name</label>
            <input type="text" id="epicName" name="epicName" required />
        </form>
    );
}
