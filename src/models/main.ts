import TimeSpan from '../utils/timeSpan.ts';

const sprintLength = TimeSpan.fromDays(14);

export function getCombinedUserPointVelocity(users: User[]): number {
    const velocities = users.map((user) => user.pointVelocity());
    return velocities.reduce((total: number, velocity: number) => total + velocity, 0) / velocities.length;
}

export function getCombinedUserTimeVelocity(users: User[]): number {
    const velocities = users.map((user) => user.timeVelocity());
    return velocities.reduce((total: number, velocity: number) => total + velocity, 0) / velocities.length;
}

export class Story {
    id: string;
    name: string;
    points: number;
    assignee: User;
    time: TimeSpan;

    constructor(name: string, points: number) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.points = points;
        this.assignee = new User('Unassigned');
        this.time = TimeSpan.zero;
    }

    assignUser(user: User) {
        this.assignee = user;
        user.assignStory(this.id);
    }

    setTime(days: number, hours: number) {
        this.time = TimeSpan.fromTime(days, hours, 0, 0, 0);
    }

    toString() {
        return `Story ${this.name}: ${this.points} - ${this.assignee.name} (${this.time.hours} hours)`;
    }
}

export class User {
    name: string;
    stories: Set<string>;

    constructor(name: string) {
        this.name = name;
        this.stories = new Set<string>();
    }

    assignStory(storyId: string) {
        this.stories.add(storyId);
    }

    // *Hours* to complete a story
    timeVelocity(): number {
        let numCompletedStories = 0;
        const stories = Array.from(this.stories);
        const sum: TimeSpan =  stories.reduce((total: TimeSpan, story: Story) => {
            if (story.time == TimeSpan.zero) {
                return total;
            } else {
                numCompletedStories++;
                
                return total.add(story.time);
            }
        }, TimeSpan.zero); 

        if (numCompletedStories == 0) {
            return 0;
        }

        return sum.totalHours / numCompletedStories;
    }

    pointVelocity(): number {
        let numCompletedStories = 0;
        const sum: number =  this.stories.reduce((total: number, story: Story) => {
            if (story.points == undefined || story.points == 0) {
                return total;
            } else {
                numCompletedStories++;
                return total + story.points;
            }
        }, 0); 

        if (numCompletedStories == 0) {
            return 0;
        }

        // This is per "sprint" by definition (stories are completed every sprint)
        return sum / numCompletedStories;
    }

    toString(): string {
        return `${this.name} completes stories on average in ${this.timeVelocity()} hours, and has a point velocity of ${this.pointVelocity()}`;
    }
}

export class Feature {
    name: string;
    stories: Story[];

    constructor(name: string) {
        this.name = name;
        this.stories = [];
    }

    addStory(story: Story) {
        this.stories.push(story)
    }

    getTotalPoints(): number {
        return this.stories.reduce((total: number, story: Story) => total + story.points, 0);
    }

    timeToFinishByPoints(): TimeSpan {
        if (sprintLength == undefined || this.stories.length === 0) {
            return TimeSpan.zero;
        } else {
            const numUsers = this.stories.reduce((total: number, story: Story) => story.assignee ? total + 1 : total, 0);
            const storyPointTotal = this.getTotalPoints();            
            
            // Get unique array of users by converting to set and back to array
            const users = Array.from(new Set(this.stories.map((story) => story.assignee)));

            // This is the *per sprint* amount of points on average a user can complete
            const userPointVelocity = getCombinedUserPointVelocity(users);

            // This number represents the spread of points, which we will use
            // to multip]ly with the velocity to get the total number of sprints
            // this feature will take to complete.
            const pointsPerUser = storyPointTotal / numUsers;
            const numSprints = pointsPerUser / userPointVelocity;

            // Now we can get the number of days a sprint is, and multiply it
            // by the number of sprints the feature will take to get an estimated
            // time to complete this feature.
            return TimeSpan.fromDays(sprintLength.days * numSprints);
        }
    }

    timeToFinishByAverage(): number {
        if (this.stories.length === 0) {
            return 0;
        } else {
            const assignees = this.stories.map((story) => story.assignee);
            const assigneesSet = new Set(assignees);
            const users = Array.from(assigneesSet);

            // Get the combined average of the users (hours)
            const combinedAverage = getCombinedUserTimeVelocity(users);

            // Get the number of stories in the feature
            // The estimated time to finish will be the number of stories in the feature
            // times the combined average divided by the number of users
            return (this.stories.length * combinedAverage) / users.length;
        }
    }

    toString(): string {
        const name = `Feature ${this.name}:`;
        const pointTotal = `Total points: ${this.getTotalPoints()}`;
        const estimatedPoint = `Estimated time by points: ${this.timeToFinishByPoints().days} days`;
        const estimatedAverage = `Estimated time by average: ${Math.round(this.timeToFinishByAverage())} hours`;
        const stories = `${this.stories.map((story) => story.toString()).join('\n')}`;
        const storiesString = this.stories.length > 0 ? `\n${stories}` : '';

        return `${name},\n${pointTotal}\n${estimatedPoint}\n${estimatedAverage}${storiesString}`;
    }
}

export class Epic {
    name: string;
    features: Feature[];

    constructor(name: string) {
        this.name = name;
        this.features = [];
    }

    addFeature(feature: Feature) {
        this.features.push(feature)
    }

    getTotalPoints(): number {
        return this.features.reduce((total: number, feature: Feature) => total + feature.getTotalPoints(), 0);
    }

    getTotalStories(): number {
        return this.features.reduce((total: number, feature: Feature) => total + feature.stories.length, 0);
    }

    timeToFinishByPoints(): TimeSpan {
        if (sprintLength == undefined) {
            return TimeSpan.zero;
        } else {
            return this.features.reduce((sprints: TimeSpan, feature: Feature) => {
                const featureTime = feature.timeToFinishByPoints();
                return sprints.add(featureTime);
            }, TimeSpan.zero);
        }
    }

    timeToFinishByAverage(): number {
        if (this.features.length === 0) {
            return 0;
        }

        const stories = this.features.reduce((stories: Story[], feature: Feature) => stories.concat(feature.stories), []);
        const users = Array.from(new Set(stories.map((story: Story) => story.assignee)));

        // Get the combined average of the users (hours)
        const combinedAverage = getCombinedUserTimeVelocity(users);

        // Get the number of stories in the feature
        // The estimated time to finish will be the number of stories in the feature
        // times the combined average divided by the number of users
        return (this.getTotalStories() * combinedAverage) / users.length;
    }

    toString(): string {
        const name = `Epic ${this.name}:`;
        const totalPoints = `Total points: ${this.getTotalPoints()}`;
        const estimatedPoints = `Estimated time by points: ${this.timeToFinishByPoints().days} days`;
        const estimatedTime = `Estimated time by average: ${this.timeToFinishByAverage()} hours`;
        const featureText = this.features.map((story) => story.toString()).join('\n');
        const features = this.features.length > 0 ? `\n${featureText}` : '';

        return `${name}\n${totalPoints}\n${estimatedPoints}\n${estimatedTime}${features}`;
    }
}
