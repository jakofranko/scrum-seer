import { Feature } from '../models/main.ts';

function onSubmit(e) {
    e.preventDefault();
    const [featureName] = e.target;
    const feature = new Feature(featureName.value);
    console.log(feature);
}

export default function FeatureForm() {
    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="featureName">Feature Name</label>
            <input type="text" id="featureName" name="featureName" required />
        </form>
    );
}
