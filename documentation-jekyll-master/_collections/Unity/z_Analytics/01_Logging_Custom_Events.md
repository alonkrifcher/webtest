---
title: Logging Custom Events
platform: Unity
---
## Logging Custom Events

You can record custom events in Appboy to learn more about your app's usage patterns and to segment your users by their actions on the dashboard.

Before implementation, be sure to review examples of the segmentation options afforded by Custom Events vs. Custom Attributes vs Purchase Events in our [Best Practices section](/User_Data_Collection/Best_Practices "Best Practices & Segmentation").

__Time Estimate: 5 Minutes__

```csharp
[[Appboy sharedInstance] logCustomEvent:@"YOUR_EVENT_NAME"];
```

[1]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Stopwatch/InitialViewController.m
[2]: https://github.com/Appboy/appboy-ios-sdk/blob/master/AppboyKit/AppboyKit.framework/Headers/Appboy.h
[3]: http://appboy.github.io/appboy-ios-sdk/docs/interface_appboy.html#ad80c39e8c96482a77562a5b1a1d387aa "logCustomEvent Documentation"
