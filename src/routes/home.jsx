import useAppState from '../hooks/useAppState.tsx';
import { sprintLength } from '../models/main.ts';
import { pointsToDays, sprintVelocity, userVelocity } from "../utils/scrumStats.ts";

export default function Home() {
    const { state } = useAppState();
    const { sprints, stories, users } = state;

    function getUserPointSum(storyIds) {
        return storyIds.reduce((total, storyId) => {
            const story = stories.find((s) => s.id == storyId);
            if (story) {
                return total + Number(story.points);
            }

            return total;
        }, 0);
    }

	return (
        <section>
            <div className="card">
                <h2>Overall Data Points</h2>
                <dl>
                    <dt>Sprint Length</dt>
                    <dd>{sprintLength.days} days</dd>
                    <dt>Team Velocity</dt>
                    <dd>{sprintVelocity(sprints, stories)}</dd>
                    <dt>Estimated days per point</dt>
                    <dd>1 story point = {pointsToDays(sprintLength, sprints, stories)} days</dd>
                    {users.map((user) => {
                        return (
                            <>
                                <dt>{user.name}'s total points completed</dt>
                                <dd>{getUserPointSum(user.stories)} points</dd>
                                <dt>{user.name}'s point velocity</dt>
                                <dt>{userVelocity(sprints, stories, user.id)} points</dt>
                                <dt>{user.name}'s points per day</dt>
                                <dt>{pointsToDays(sprintLength, sprints, stories, user.id)} points</dt>
                            </>
                        );
                    })}
                </dl>
            </div>
            <div className="card">
                <h2>Another Section</h2>
                <p>Some stuff...</p>
            </div>
            <div className="card">
                <h2>ANOTHER section</h2>
                <p>other stuff...</p>
            </div>
        </section>
    );
}
