import { useLocalStorage } from '@uidotdev/usehooks';
import {
    Epic,
    Feature,
    Story,
    User,
    Sprint,
} from '../models/main.ts';

interface AppState {
    epics: Epic[];
    features: Feature[];
    stories: Story[];
    users: User[];
    sprints: Sprint[];
}

export default function useAppState() {
    const [state, setState] = useLocalStorage('scrum-seer', {
        epics: [],
        features: [],
        stories: [],
        users: [],
        sprints: [],
    });


    function addEpic(epic: Epic) {
        const e: Epic[] = state.epics.slice();
        e.push(epic);
        const newState = Object.assign({}, state, { epics: e });

        setState(newState);
    }

    function addFeature(feature: Feature) {
        const f: Feature[] = state.features.slice();
        f.push(feature);
        const newState = Object.assign({}, state, { features: f });

        setState(newState);
    }

    function addStory(story: Story) {
        const s: Story[] = state.stories.slice();
        s.push(story);

        const newState = Object.assign({}, state, { stories: s });

        setState(newState);
    }

    function addUser(user: User) {
        const u: User[] = state.users.slice();
        
        // Convert to an array for localStorage
        user.stories = [...user.stories];
        u.push(user);
        const newState = Object.assign({}, state, { users: u });

        setState(newState);
    }

    function addSprint(sprint: Sprint) {
        const s: Sprint[] = state.sprints.slice();
        
        // Convert to an array for localStorage
        sprint.stories = [...sprint.stories];
        s.push(sprint);
        const newState = Object.assign({}, state, { sprints: s });

        setState(newState);
    }

    function assignUserToStory(userId: string, storyId: string) {
        const stories: any[] = state.stories.slice();
        const users: any[] = state.users.slice();
        const newStories = stories.map((story) => {
            if (story.id == storyId) {
                story.assigneeId = userId;
            }

            return story;
        });

        const newUsers = users.map((user) => {
            if (user.id == userId && !user.stories.includes(storyId)) {
                user.stories.push(storyId);
            }

            return user;
        });

        const newState = Object.assign({}, state, {
            stories: newStories,
            users: newUsers,
        });

        setState(newState);
    }

    function assignStoryToSprint(sprintId: string, storyId: string) {
        const stories: any[] = state.stories.slice();
        const sprints: any[] = state.sprints.slice();
        const newStories = stories.map((story) => {
            if (story.id == storyId) {
                story.sprintId = sprintId;
            }

            return story;
        });

        const newSprints = sprints.map((sprint) => {
            if (sprint.id == sprintId && !sprint.stories.includes(storyId)) {
                sprint.stories.push(storyId);
            }

            return sprint;
        });

        const newState = Object.assign({}, state, {
            stories: newStories,
            sprints: newSprints,
        });

        setState(newState);
    }

    function assignStoryToFeature(featureId: string, storyId: string) {
        const stories: any[] = state.stories.slice();
        const features: any[] = state.features.slice();
        const newStories = stories.map((story) => {
            if (story.id == storyId) {
                story.featureId = featureId;
            }

            return story;
        });

        const newFeatures = features.map((feature) => {
            if (feature.id == featureId && !feature.stories.includes(storyId)) {
                feature.stories.push(storyId);
            }

            return feature;
        });

        const newState = Object.assign({}, state, {
            stories: newStories,
            features: newFeatures,
        });

        setState(newState);
    }

    return {
        state,
        addEpic,
        addFeature,
        addStory,
        addUser,
        addSprint,
        assignUserToStory,
        assignStoryToSprint,
        assignStoryToFeature,
    };
}
