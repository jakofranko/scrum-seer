import { Story } from '../models/main.ts';
import useAppState from "../hooks/useAppState.jsx";

export default function StoryForm() {
    const { addStory } = useAppState();

    function onSubmit(e) {
        e.preventDefault();
        const [storyName, storyPoints] = e.target;
        const story = new Story(storyName.value, storyPoints.value);

        addStory(story);
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="storyName">Story Name</label>
            <input type="text" id="storyName" name="storyName" required />
            <label htmlFor="storyPoints">Story Points</label>
            <input type="number" id="storyPoints" name="storyPoints" required />
            <input type="Submit" value="Create Story" />
        </form>
    );
}
