import { useLocalStorage } from '@uidotdev/usehooks';

export default function useAppState() {
    const [state, setState] = useLocalStorage('scrum-seer', {
        epics: [],
        features: [],
        stories: [],
        users: [],
    });


    function addEpic(epic) {
        const e = state.epics.slice();
        e.push(epic);
        const newState = Object.assign({}, state, { epics: e });

        setState(newState);
    }

    function addFeature(feature) {
        const f = state.features.slice();
        f.push(feature);
        const newState = Object.assign({}, state, { features: f });

        setState(newState);
    }

    function addStory(story) {
        const s = state.stories.slice();
        s.push(story);

        const newState = Object.assign({}, state, { stories: s });

        setState(newState);
    }

    function addUser(user) {
        const u = state.users.slice();
        u.push(user);
        const newState = Object.assign({}, state, { users: u });

        setState(newState);
    }

    return {
        state,
        addEpic,
        addFeature,
        addStory,
        addUser
    };
}
