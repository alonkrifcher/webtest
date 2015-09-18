---
title: Uninstall Insights
platform: Android and FireOS
---
## Uninstall Insights

Uninstall insights utilizes background push with an Appboy flag in the payload. In most instances, no code changes need to be made to implement uninstall insights, as it requires no response on the part of the app. If your setup involves an automatic action on all background push, you will need to update your methods to ignore all background push with the Appboy flag.

For example, if you have a static utility method calling a server for new content on every background push, you likely do not want Appboy background push to trigger that. A method to identify Appboy background push was added in [version 1.8.2 of the sdk][1].

### Checking for Appboy Background Push

```java
AppboyNotificationUtils.isUninstallTrackingPush(receivedIntent.getExtras())
```

An example of this method's use can be found in the [`AppboyBroadcastReceiver.java`][2] class in the Droidboy sample app.
- Also see the method declaration within the [`AppboyNotificationUtils`][3] class

[1]: https://github.com/Appboy/appboy-android-sdk/blob/master/CHANGELOG.md
[2]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/AppboyBroadcastReceiver.java
[3]: https://github.com/Appboy/appboy-android-sdk/blob/master/android-sdk-ui/src/com/appboy/push/AppboyNotificationUtils.java
