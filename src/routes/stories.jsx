import Nav from "../components/Nav.jsx";
import StoryForm from "../components/StoryForm.jsx";
import useAppState from "../hooks/useAppState.jsx";

export default function StorysRoute() {
    const { state } = useAppState();
    const { stories } = state;

    return (
        <section>
            <Nav />
            <h1>Stories</h1>
            <ul>
                {stories.map((story) => <li>{story.name}</li>)}
            </ul>
            <h2>Add Story</h2>
            <StoryForm />
        </section>
    );
}
