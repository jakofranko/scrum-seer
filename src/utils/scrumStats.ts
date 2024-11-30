// These utils are meant to process the data that we are storing in useAppState.
// In essence, they assume that there are at minimum a list of stories, users, and at least 
// one sprint. Stories must have a certain number of points assigned to them when created.
//
// If a story has a point value, an assignee, and an associated sprint, then all the predictive
// functions can be performed for stories. If these stories are then associated to a feature,
// the amount of time a feature will take can be predicted. Likewise with epics.
//
// If a real time span is associated to a story to represent how long it took to complete
// in hours/days, more accurate, but also simpler, calculations can be made.
//
// In the first version of this app, stories notably have no status. They are simply considered
// to have been completed already if they have an assigned user, point value, and a sprint.

import type { Sprint, Story } from "../models/main.ts";
import { roundToDecimal } from "./math.ts";
import type TimeSpan from "./timeSpan.ts";


// This is the average number of story points completed per sprint
export function sprintVelocity(sprints: Sprint[], stories: Story[], userId?: string) {
    let totalPoints = 0;
    sprints.forEach((sprint) => {
        let sprintStories; 
        if (userId) {
            sprintStories = stories.filter((story) => story.sprintId == sprint.id && story.assigneeId == userId);
        } else {
            sprintStories = stories.filter((story) => story.sprintId == sprint.id && story.assigneeId != '');
        }

        if (sprintStories.length) {
            totalPoints += sprintStories.reduce((t, s) => Number(s.points) + t, 0);
        }
    });

    return roundToDecimal(totalPoints / sprints.length, 1);
}

// The user velocity is how many points a specific user completes per sprint on average.
// This is essentially the sprint velocity, but for only one user.
export function userVelocity(sprints: Sprint[], stories: Story[], userId: string) {
    return sprintVelocity(sprints, stories, userId);
}

// Once you know the sprint velocity, you can know, at least in terms of sprints,
// how much time a story point represents for a given user, or the team on average.
export function pointsToDays(sprintLength: TimeSpan, sprints: Sprint[], stories: Story[], userId?: string) {
    const points = sprintVelocity(sprints, stories, userId);

    console.log({ sprintLength, points, stories, userId, sprints });

    debugger;

    return roundToDecimal(sprintLength.days / points, 1);
}

