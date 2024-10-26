import TimeSpan from './timeSpan.ts';

const users: User[] = [];
const epics: Epic[] = [];
const sprintLength = TimeSpan.fromDays(14);

interface Story {
    name: string;
    points: number;
    time: TimeSpan;
    assignee: User;
    toString(): string;
}

interface Feature {
    name: string;
    stories: Story[];
    toString(): string;
    timeToFinishByPoints(): TimeSpan;
    timeToFinishByAverage(): number;
}

interface Epic {
    name: string;
    features: Feature[];
    toString(): string;
    timeToFinishByPoints(): TimeSpan;
    timeToFinishByAverage(): number;
}

interface User {
    name: string;
    stories: Story[];
    pointVelocity(): number;
    timeVelocity(): number;
    toString(): string;
}

function getCombinedUserPointVelocity(): number {
    const velocities = users.map((user) => user.pointVelocity());
    return velocities.reduce((total: number, velocity: number) => total + velocity, 0) / velocities.length;
}

function getCombinedUserTimeVelocity(): number {
    const velocities = users.map((user) => user.timeVelocity());
    return velocities.reduce((total: number, velocity: number) => total + velocity, 0) / velocities.length;
}

class Story implements Story {
    constructor(name: string, points: number) {
        this.name = name;
        this.points = points;
    }

    assignUser(user: User) {
        this.assignee = user;
        user.assignStory(this);
    }

    setTime(days: number, hours: number) {
        this.time = TimeSpan.fromTime(days, hours, 0);
    }

    toString() {
        return `Story ${this.name}: ${this.points} - ${this.assignee.name} (${this.time.hours} hours)`;
    }
}

class User implements User {
    constructor(name: string) {
        this.name = name;
        this.stories = [];
    }

    assignStory(story: Story) {
        this.stories.push(story);
    }

    // *Hours* to complete a story
    timeVelocity(): number {
        let numCompletedStories = 0;
        const sum: TimeSpan =  this.stories.reduce((total: TimeSpan, story: Story) => {
            if (story.time == undefined) {
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
        return `${this.name} completes stories on average in ${this.timeVelocity()} hours,
            and has a point velocity of ${this.pointVelocity()}`;
    }
}

class Feature implements Feature {
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
        if (sprintLength == undefined) {
            return TimeSpan.zero;
        } else {
            const numUsers = this.stories.reduce((total: number, story: Story) => story.assignee ? total + 1 : total, 0);
            const storyPointTotal = this.getTotalPoints();            

            // This is the *per sprint* amount of points on average a user can complete
            const userPointVelocity = getCombinedUserPointVelocity();

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
        // Get the combined average of the users (hours)
        const combinedAverage = getCombinedUserTimeVelocity();

        // Get the number of stories in the feature
        // The estimated time to finish will be the number of stories in the feature
        // times the combined average divided by the number of users
        return (this.stories.length * combinedAverage) / users.length;
    }

    toString(): string {
        return `Feature ${this.name}: 
            Total points: ${this.getTotalPoints()}
            Estimated time by points: ${this.timeToFinishByPoints().days} days
            Estimated time by average: ${this.timeToFinishByAverage()} hours
            ${this.stories.map((story) => story.toString()).join('\n')}`;
    }
}

class Epic implements Epic {
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
        // Get the combined average of the users (hours)
        const combinedAverage = getCombinedUserTimeVelocity();

        // Get the number of stories in the feature
        // The estimated time to finish will be the number of stories in the feature
        // times the combined average divided by the number of users
        return (this.getTotalStories() * combinedAverage) / users.length;
    }

    toString(): string {
        return `Epic ${this.name}: 
            Total Points: ${this.getTotalPoints()}
            Estimated time by points: ${this.timeToFinishByPoints().days} days
            Estimated time by average: ${this.timeToFinishByAverage()} hours
            ${this.features.map((story) => story.toString()).join('\n')}`;
    }
}

const bob = new User('bob');
const charles = new User('charles');
const lily = new User('lily');
users.push(bob, charles, lily);

const todoApp = new Epic('Todo App');
epics.push(todoApp);

const listFeature = new Feature('List form');
todoApp.addFeature(listFeature);

const s1 = new Story('add item', 2);
const s2 = new Story('edit item', 5);
const s3 = new Story('delete item', 2);

listFeature.addStory(s1);
listFeature.addStory(s2);
listFeature.addStory(s3);

const manageFeature = new Feature('Manage items');
todoApp.addFeature(manageFeature);

const s4 = new Story('list items', 2);
const s5 = new Story('check and uncheck items', 3);
const s6 = new Story('create lists', 5);
const s7 = new Story('delete lists', 3);

manageFeature.addStory(s4);
manageFeature.addStory(s5);
manageFeature.addStory(s6);
manageFeature.addStory(s7);

epics.forEach((epic: Epic) => {
    epic.features.forEach((feature: Feature) => {
        feature.stories.forEach((story: Story) => {
            const randomUser = users[Math.floor(Math.random() * users.length)]
            story.assignUser(randomUser);
            story.setTime((story.points * Math.random()), story.points * Math.random() * 5);
        });
    });
});

users.forEach((user) => console.log(`${user}`));
epics.forEach((epic) => console.log(`${epic}`));
