---
title: Capturing Lapsing Users
---
# Capturing Lapsing Users

If your audience is dwindling, it’s crucial to try wooing them back. Recognizing this necessity, Appboy makes it easy to set up automated recurring re-engagement campaigns to capture lapsing users. You can choose the re-engagement timeframe and recurrence that best suits your app, but to demonstrate, we'll get started with a 14 day (2 week) weekly re-engagement plan.

## Step 1: Segmentation

First, we’ll create a segment to target users who have not used the app in the past two weeks, using the following filters:

- Last Used App more than 2 weeks ago
- Last Used App less than 3 weeks ago

![SCREENSHOT][1]

Don’t forget to name the segment something simple and memorable, like “Lapsed Users – 2 Weeks.” Since we’ll be setting up the campaign to recur on a weekly basis, we’ll want to make sure there’s at least 1 week of users captured in the segment. That’s why we’ve selected users who last used the app between 2 and 3 weeks ago.

## Step 2: Campaign Creation

Next, we’ll click Start Campaign get things up and running. We’ll automatically name the campaign “Message to Lapsed Users - 2 Weeks” and select the segment. We can ignore the other options on the first page for this campaign.

![SCREENSHOT][2]

In step 2 of the wizard, click the “On” button to activate the push notification. In the example, we’ll only target iOS users, but you can use Appboy for Android and iOS push notifications. The closer to the last time a user was in the app, the more important it is to be topical and relevant. Messaging a user after two weeks of not using the app, it's important to surface relevant content and highlight benefits of using the app.

![SCREENSHOT][3]

Step 3 is where we’ll create a recurring schedule. We’ll use [local time zone delivery][4] at 5 PM. It’s recommended that you look at your sessions graph to target users just prior to high-usage periods. This ensures that you attempt to re-engage people when they’re most likely to use the app. In addition to local time zone delivery, also check recurring and select weekly. Again, choose the day of the week that you think will resonate most with lapsed users. You can change this later and test your initial hypothesis.

Now, you’re ready to send the campaign. Confirm the settings on the last page of the wizard and click start!

[1]: /assets/img/2weeklapse.png
[2]: /assets/img/pushlapse.png
[3]: /assets/img/schedulelapse.png
[4]: https://documentation.appboy.com/Frequently_Asked_Questions#local-timezone-delivery
