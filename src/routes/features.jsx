import Nav from "../components/Nav.jsx";
import FeatureForm from "../components/FeatureForm.jsx";
import useAppState from "../hooks/useAppState.jsx";

export default function FeaturesRoute() {
    const { state } = useAppState();
    const { features } = state;

    return (
        <section>
            <Nav />
            <h1>Features</h1>
            <ul>
                {features.map((feature) => <li>{feature.name}</li>)}
            </ul>
            <h2>Add Feature</h2>
            <FeatureForm />
        </section>
    );
}
