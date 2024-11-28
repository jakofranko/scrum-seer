import useAppState from "../hooks/useAppState.tsx";

export default function SprintDropdown() {
    const { state: { sprints } } = useAppState();

    return (
        <select name="sprint-dropdown">
            <option value="">Select Sprint</option>
            {sprints.map((sprint, i) => <option value={sprint.id}>Sprint {i}</option>)}
        </select>
    );
}

