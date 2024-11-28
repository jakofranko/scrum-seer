import StoryForm from "../components/StoryForm.jsx";
import UserDropdown from "../components/UserDropdown.jsx";
import SprintDropdown from "../components/SprintDropdown.jsx";
import FeatureDropdown from "../components/FeatureDropdown.jsx";
import useAppState from "../hooks/useAppState.tsx";

export default function StorysRoute() {
    const { 
        state, 
        assignUserToStory, 
        assignStoryToSprint, 
        assignStoryToFeature, 
    } = useAppState();
    const { stories, users, sprints, features } = state;

    function handleAssignUser(e) {
        const { target } = e;
        const [userId, storyId] = target;

        e.preventDefault();

        assignUserToStory(userId.value, storyId.value);
    }

    function handleAssignSprint(e) {
        const { target } = e;
        const [sprintId, storyId] = target;

        e.preventDefault();

        assignStoryToSprint(sprintId.value, storyId.value);
    }

    function handleAssignFeature(e) {
        const { target } = e;
        const [featureId, storyId] = target;

        e.preventDefault();

        assignStoryToFeature(featureId.value, storyId.value);
    }

    return (
        <section>
            <h1>Stories</h1>
            <ul>
                {stories.map((story) => (
                    <li>
                        <dl>
                            <dt>Story Name</dt>
                            <dd>{story.name}</dd>
                            <dt>Points</dt>
                            <dd>{story.points}</dd>
                            <dt>Assignee</dt>
                            <dd>{story.assigneeId != '' && users.find((u) => u.id == story.assigneeId)?.name}</dd>
                            <dt>Sprint</dt>
                            <dd>{story.sprintId != '' && sprints.find((u) => u.id == story.sprintId)?.id}</dd>
                            <dt>Feature</dt>
                            <dd>{story.featureId != '' && features.find((u) => u.id == story.featureId)?.name}</dd>
                        </dl>
                        {story.assigneeId == '' && (
                            <form onSubmit={handleAssignUser}>
                                <label>Assign User</label>
                                <UserDropdown />
                                <input type="hidden" value={story.id} name="storyId" />
                                <input type="submit" value="Assign User" />
                            </form>
                        )}
                        {story.sprintId == '' && (
                            <form onSubmit={handleAssignSprint}>
                                <label>Assign Sprint</label>
                                <SprintDropdown />
                                <input type="hidden" value={story.id} name="storyId" />
                                <input type="submit" value="Assign Sprint" />
                            </form>
                        )}
                        {story.featureId == '' && (
                            <form onSubmit={handleAssignFeature}>
                                <label>Assign Feature</label>
                                <FeatureDropdown />
                                <input type="hidden" value={story.id} name="storyId" />
                                <input type="submit" value="Assign Feature" />
                            </form>
                        )}
                    </li>
                ))}
            </ul>
            <h2>Add Story</h2>
            <StoryForm />
        </section>
    );
}
