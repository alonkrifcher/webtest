---
title: Utilizing Badge Count
---
# Utilizing Badge Count

The iOS badge count displays the number of unread notifications within your application, taking the form of a red circle in the upper-right hand corner of the app icon. In recent years, badging has come to be one of the most effective means for re-engaging app users.

The badge count can be used to re-engage your users who either forgot to check or did not receive push notifications. Similarly, it can be used to notify your users about unviewed messages such as news feed changes or in-app updates.

## Best Practices

In order to optimize the re-engagement power of badging, it is crucial that you configure your badge settings in a way that most simplifies the user's experience.

### Keep the Badge Count Low
Research shows that once the badge count increases past double digits, users generally lose interest in the updates and often stop using the app altogether.

__Note:__ There can be exceptions to this rule depending on the nature of your app (e.g. email and group messaging apps).

### Limit the Things a Badge Count Can Represent
When badging, you want to make the notifications as clear and direct as possible. By limiting the number of things that a badge notification can represent, you can provide your users with a sense of familiarity with your app's features and updates.

### News Feed and In-app Badging
One of the most powerful features of badging is that it allows you to engage with your users without the immediacy of a push notification through the news feed and in-app updates. To ensure that your users stay interested in the in-app badging notifications, you should try to focus such badge updates on personalized or urgent messages.

## Badge Count with Appboy

After integrating the Appboy SDK, you will need to manually configure your badge settings. It is common practice to update the badge count at the end of the session's lifecycle so that it is accurately reflected when the user closes the app.

## Removing the Badge Count

You can disable the badge count for push notifications on your app altogether by manually configuring your App Settings page on the Manage App Group tab as shown below.

![Disabling Count][1]

__Note:__ This is __not__ recommended.

[1]:/assets/img/disabling_badge.png "Disabling Badge Count"
