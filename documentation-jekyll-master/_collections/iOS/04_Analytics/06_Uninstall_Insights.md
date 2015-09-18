---
title: Uninstall Insights
platform: iOS
---
## Uninstall Insights

Uninstall insights utilizes background push with an Appboy flag in the payload. In most instances, no code changes need to be made to implement uninstall insights, as it requires no response on the part of the app. If your setup involves an automatic action on all background push, you will need to update your methods to ignore all background push with the Appboy flag.

For example, if you have a utility method calling a server for new content on every background push, you likely do not want Appboy background push to trigger that. A method to identify Appboy background push was added in [version 2.13 of the sdk][1].

### Checking for Appboy Background Push

**Objective-C**
In this method in your UIApplication Delegate class ```objc - (void) application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler``` please put following code:

please put following code:

```objc
BOOL isUninstallTracking = [ABKPushUtils isUninstallTrackingNotification:userInfo];
```

**Swift**

In this method ```swift func application(application: UIApplication, didReceiveRemoteNotification userInfo: [NSObject : AnyObject], fetchCompletionHandler completionHandler: (UIBackgroundFetchResult) -> Void)``` please put the following code:

```swift
let isUninstallTracking = ABKPushUtils.isUninstallTrackingNotification(userInfo)
```

`isUninstallTrackingNotification:` is utilized in the [`AppDelegate.m`][2] file in the Stopwatch sample app

- Also see the method declaration within the [`ABKPushUtils.h`][3] file

[1]: https://github.com/Appboy/appboy-ios-sdk/blob/master/CHANGELOG.md
[2]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Stopwatch/AppDelegate.m
[3]: https://github.com/Appboy/appboy-ios-sdk/blob/master/AppboyKit/headers/AppboyKitLibrary/ABKPushUtils.h
