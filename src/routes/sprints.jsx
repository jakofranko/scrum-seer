import { Sprint } from "../models/main.ts";
import useAppState from "../hooks/useAppState.tsx";

export default function SprintsRoute() {
    const { state, addSprint } = useAppState();
    const { sprints } = state;

    function handleNewSprint() {
        const s = new Sprint();

        addSprint(s);
    }

    return (
        <section>
            <h1>Sprints</h1>
            <ul>
                {sprints.map((_, i) => <li>Sprint {i}</li>)}
            </ul>
            <h2>Add Sprint</h2>
            <button onClick={handleNewSprint}>Create New Sprint</button>
        </section>
    );
}
