import useAppState from '../hooks/useAppState.tsx';
import { sprintLength } from '../models/main.ts';

export default function Home() {
    const { state } = useAppState();
    const { stories, users } = state;

    function getUserPointSum(storyIds) {
        return storyIds.reduce((total, storyId) => {
            const story = stories.find((s) => s.id == storyId);
            if (story) {
                return total + Number(story.points);
            }

            return total;
        }, 0);
    }

    function userPointVelocity(storyIds) {
        if (storyIds.length == 0) {
            return 0;
        }

        return getUserPointSum(storyIds) / storyIds.length;
    }

	return (
        <section>
            <div className="card">
                <h2>Overall Data Points</h2>
                <dl>
                    <dt>Sprint Length</dt>
                    <dd>{sprintLength.days} days</dd>
                    {users.map((user) => {
                        return (
                            <>
                                <dt>{user.name}'s total points completed</dt>
                                <dd>{getUserPointSum(user.stories)} points</dd>
                                <dt>{user.name}'s point velocity</dt>
                                <dt>{userPointVelocity(user.stories)} points</dt>
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
