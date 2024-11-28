import EpicForm from "../components/EpicForm.jsx";
import useAppState from "../hooks/useAppState.tsx";

export default function EpicsRoute() {
    const { state } = useAppState();
    const { epics } = state;

    return (
        <section>
            <h1>Epics</h1>
            <ul>
                {epics.map((epic) => <li>{epic.name}</li>)}
            </ul>
            <h2>Add Epic</h2>
            <EpicForm />
        </section>
    );
}
