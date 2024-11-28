import StoryForm from "../components/StoryForm.jsx";
import UserDropdown from "../components/UserDropdown.jsx";
import useAppState from "../hooks/useAppState.tsx";

export default function StorysRoute() {
    const { state, assignUserToStory } = useAppState();
    const { stories, users } = state;

    function handleAssignUser(e) {
        const { target } = e;
        const [userId, storyId] = target;

        e.preventDefault();

        assignUserToStory(userId.value, storyId.value);
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
                            <dd>{story.assigneeId != '' && users.find((u) => u.id == story.assigneeId).name}</dd>
                        </dl>
                        {story.assigneeId == '' && (
                            <form onSubmit={handleAssignUser}>
                                <label>Assign User</label>
                                <UserDropdown />
                                <input type="hidden" value={story.id} name="storyId" />
                                <input type="submit" value="Assign User" />
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
