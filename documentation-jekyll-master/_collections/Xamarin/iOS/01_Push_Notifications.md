---
title: Push Notifications
platform: Xamarin
subplatform: iOS
---
# Push Notifications

See [the iOS integration instructions][1] for information about setting up your application with push and storing your credentials on our server.

The code changes needed for push are:

**Xamarin C#**

1. Set up push permissions in the ```FinishedLaunching``` section of your ```AppDelegate.cs```.

```csharp
UIUserNotificationSettings settings = UIUserNotificationSettings.GetSettingsForTypes (UIUserNotificationType.Badge | UIUserNotificationType.Alert | UIUserNotificationType.Sound, null);
UIApplication.SharedApplication.RegisterForRemoteNotifications ();
UIApplication.SharedApplication.RegisterUserNotificationSettings (settings);
```

2. Register for your push tokens in the ```RegisteredForRemoteNotifications``` method of your ```AppDelegate.cs```

```csharp
Appboy.SharedInstance ().RegisterPushToken (deviceToken.ToString ());
```

3. In your app delegate, add the code below to your `DidReceiveRemoteNotification` method to enable open tracking on push notifications:

```csharp
public override void DidReceiveRemoteNotification (UIApplication application, NSDictionary userInfo, Action<UIBackgroundFetchResult> completionHandler)
  {
    Appboy.SharedInstance ().RegisterApplicationWithFetchCompletionHandler(application, userInfo, completionHandler);
  }
```

[1]: /iOS/#push-notifications "iOS Instructions"
