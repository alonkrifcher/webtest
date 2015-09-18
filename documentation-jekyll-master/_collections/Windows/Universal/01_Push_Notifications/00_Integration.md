---
title: Integration
platform: Windows
subplatform: Universal
---
## Integration

A push notification is an out-of-app alert that appears on the user's screen when an important update occurs. Push notifications are a valuable way to provide your users with time-sensitive and relevant content or to re-engage them with your app.

Sample push notification:

![Sample Push][10]

Check out [Appboy Academy][9] for additional best practices.

__Time Estimate: 7 Minutes__

### Step 1: Set up your Application in the Windows Universal Store

1. Set up your application in the Windows Universal
2. Be sure to include your SID and Client Secret in your app
  - [Step By Step Instructions][4]

### Step 2: Configuring the Appboy Dashboard

Within the [App Settings page][5] of the Appboy dashboard add the SID and Client Secret in your app settings.

![Windows SID Dashboard][6]

### Step 3: Creating Event Handlers

To listen to events that are fired when the push is received and activated (clicked by user), create event handlers and add them to the `PushManager` events:
- `Appboy.SharedInstance.PushManager.PushReceivedEvent += YourPushReceivedEventHandler;`
- `Appboy.SharedInstance.PushManager.ToastActivatedEvent += YourToastActivatedEventHandler;`

Your event handlers should have the signatures:
- `void YourPushReceivedEventHandler(PushNotificationChannel sender, AppboyPushNotificationReceivedEventArgs args);`
- `void YourToastActivatedEventHandler(ToastNotification sender, AppboyToastActivatedEventArgs args);`

**Implementation Example**

See the following [`App.xaml.cs` file in our Windows Sample Application][7]

__Note__: Only add these event handlers once per app execution.

[4]: http://msdn.microsoft.com/en-us/library/windows/apps/hh465407.aspx
[5]: https://dashboard.appboy.com/app_settings/app_settings
[6]: /img/windows_sid.png "Windows SID Dashboard"
[7]: https://github.com/Appboy/appboy-windows-samples/blob/master/Universal/App.xaml.cs "Windows Universal Sample Implementation"
[9]: https://academy.appboy.com/Best_Practices/Push "Push Notifications: Best Practices"
[10]: /img/windows_uni_push_sample.png
