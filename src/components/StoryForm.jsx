import { Story } from '../models/main.ts';

function onSubmit(e) {
    e.preventDefault();
    const [storyName, storyPoints] = e.target;
    const story = new Story(storyName.value, storyPoints.value);
    console.log(story);
}

export default function StoryForm() {
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
