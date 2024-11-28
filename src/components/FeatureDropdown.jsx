import useAppState from "../hooks/useAppState.tsx";

export default function FeatureDropdown() {
    const { state: { features } } = useAppState();

    return (
        <select name="feature-dropdown">
            <option value="">Select Feature</option>
            {features.map((feature) => <option value={feature.id}>{feature.name}</option>)}
        </select>
    );
}

