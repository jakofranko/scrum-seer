import { Epic } from '../models/main.ts';
import useAppState from '../hooks/useAppState.jsx';


export default function EpicForm() {
    const { addEpic } = useAppState();

    function onSubmit(e) {
        e.preventDefault();
        const [epicName] = e.target;
        const epic = new Epic(epicName.value);

        addEpic(epic);
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="epicName">Epic Name</label>
            <input type="text" id="epicName" name="epicName" required />
        </form>
    );
}
