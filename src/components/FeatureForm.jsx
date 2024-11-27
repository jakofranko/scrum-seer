import { Feature } from '../models/main.ts';
import useAppState from '../hooks/useAppState.jsx';


export default function FeatureForm() {
    const { addFeature } = useAppState();

    function onSubmit(e) {
        e.preventDefault();
        const [featureName] = e.target;
        const feature = new Feature(featureName.value);

        addFeature(feature);
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="featureName">Feature Name</label>
            <input type="text" id="featureName" name="featureName" required />
        </form>
    );
}
