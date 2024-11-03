import { assertEquals } from "@std/assert";
import { 
    getCombinedUserTimeVelocity, 
    getCombinedUserPointVelocity, 
    User, 
    Story,
    Feature,
    Epic
} from "./main.ts";

Deno.test(function createUserTest() {
   const user = new User('test user');

   assertEquals(user.name, 'test user');
   assertEquals(`${user}`, 'test user completes stories on average in 0 hours, and has a point velocity of 0');
});

Deno.test(function createStoryTest() {
   const story = new Story('test story', 50);

   assertEquals(story.name, 'test story');
   assertEquals(story.points, 50);
   assertEquals(`${story}`, 'Story test story: 50 - Unassigned (0 hours)');
});

Deno.test(function getCombinedUserTimeVelocityTest() {
    const user = new User('test user');
    const story1 = new Story('test 1', 1);
    story1.setTime(0, 1);
    story1.assignUser(user);
    const story2 = new Story('test 2', 2);
    story2.setTime(0, 3);
    story2.assignUser(user);

    const result = getCombinedUserTimeVelocity([user]);

    assertEquals(result, (1 + 3) / 2);

    const user2 = new User('second user');
    const story3 = new Story('test 3', 5);
    story3.setTime(1, 2);
    story3.assignUser(user2);
    const story4 = new Story('test 4', 5);
    story4.setTime(0, 9);
    story4.assignUser(user2);

    const result2 = getCombinedUserTimeVelocity([user, user2]);

    assertEquals(result2, (1 + 3 + 26 + 9) / 4);
});

Deno.test(function getCombinedUserPointVelocityTest() {
    const user = new User('test user');
    const story1 = new Story('test 1', 1);
    story1.assignUser(user);
    const story2 = new Story('test 2', 2);
    story2.assignUser(user);

    const result = getCombinedUserPointVelocity([user]);

    assertEquals(result, (1 + 2) / 2);

    const user2 = new User('second user');
    const story3 = new Story('test 3', 5);
    story3.assignUser(user2);
    const story4 = new Story('test 4', 5);
    story4.assignUser(user2);

    const result2 = getCombinedUserPointVelocity([user, user2]);

    assertEquals(result2, (1 + 2 + 5 + 5) / 4);
});

Deno.test(function createFeatureTest() {
    const feature = new Feature('test feature');

    assertEquals(feature.name, 'test feature');
    assertEquals(feature.stories.length, 0);
    assertEquals(`${feature}`, 'Feature test feature:,\nTotal points: 0\nEstimated time by points: 0 days\nEstimated time by average: 0 hours');

    const user = new User('test user');
    const story1 = new Story('test 1', 1);
    story1.setTime(0, 1);
    story1.assignUser(user);
    const story2 = new Story('test 2', 2);
    story2.setTime(0, 3);
    story2.assignUser(user);
    const user2 = new User('second user');
    const story3 = new Story('test 3', 5);
    story3.setTime(1, 2);
    story3.assignUser(user2);
    const story4 = new Story('test 4', 5);
    story4.setTime(0, 9);
    story4.assignUser(user2);

    feature.addStory(story1);
    feature.addStory(story2);
    feature.addStory(story3);
    feature.addStory(story4);

    const storyString = 'Story test 1: 1 - test user (1 hours)\nStory test 2: 2 - test user (3 hours)\nStory test 3: 5 - second user (2 hours)\nStory test 4: 5 - second user (9 hours)';
    
    assertEquals(feature.stories.length, 4);
    assertEquals(`${feature}`, 'Feature test feature:,\nTotal points: 13\nEstimated time by points: 14 days\nEstimated time by average: 20 hours\n' + storyString);
});

Deno.test(function createEpicTest() {
    const epic = new Epic('test epic');

    assertEquals(epic.name, 'test epic');
    assertEquals(epic.features.length, 0);
    assertEquals(`${epic}`, 'Epic test epic:\nTotal points: 0\nEstimated time by points: 0 days\nEstimated time by average: 0 hours');

    const feature = new Feature('test feature');

    const user = new User('test user');
    const story1 = new Story('test 1', 1);
    story1.setTime(0, 1);
    story1.assignUser(user);
    const story2 = new Story('test 2', 2);
    story2.setTime(0, 3);
    story2.assignUser(user);
    const user2 = new User('second user');
    const story3 = new Story('test 3', 5);
    story3.setTime(1, 2);
    story3.assignUser(user2);
    const story4 = new Story('test 4', 5);
    story4.setTime(0, 9);
    story4.assignUser(user2);

    feature.addStory(story1);
    feature.addStory(story2);
    feature.addStory(story3);
    feature.addStory(story4);

    const storyString = 'Story test 1: 1 - test user (1 hours)\nStory test 2: 2 - test user (3 hours)\nStory test 3: 5 - second user (2 hours)\nStory test 4: 5 - second user (9 hours)';

    epic.addFeature(feature);

    const featureString = 'Feature test feature:,\nTotal points: 13\nEstimated time by points: 14 days\nEstimated time by average: 20 hours\n';
    
    assertEquals(epic.features.length, 1);
    assertEquals(`${epic}`, 'Epic test epic:\nTotal points: 13\nEstimated time by points: 14 days\nEstimated time by average: 19.5 hours\n' + featureString + storyString);
});

