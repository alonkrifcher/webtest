---
title: Tracking Custom Events
platform: iOS
---
## Tracking Custom Events

You can record custom events in Appboy to learn more about your app's usage patterns and to segment your users by their actions on the dashboard.

Before implementation, be sure to review examples of the segmentation options afforded by Custom Events vs. Custom Attributes vs Purchase Events in our [Best Practices section][0].

### Adding A Custom Event
__Time Estimate: 5 Minutes__

**Objective-C**

```objc
[[Appboy sharedInstance] logCustomEvent:@"YOUR_EVENT_NAME"];
```

**Swift**

```swift
Appboy.sharedInstance().logCustomEvent("YOUR_EVENT_NAME");
```

#### Adding Properties

You can add metadata about custom events by passing an `NSDictionary` populated with `NSNumber`, `NSString`, or `NSDate` values.

**Objective-C**

```objc
[[Appboy sharedInstance] logCustomEvent:@"YOUR_EVENT_NAME" withProperties:@{@"key1":"value1"}];
```

**Swift**

```swift
Appboy.sharedInstance().logCustomEvent("YOUR_EVENT_NAME", withProperties:["key1":"value1"]);
```

See our [class documentation][4] for more information.

### Implementation Example

`logCustomEvent` is utilized within the [`InitialViewController.m` file][1] within the stopwatch sample application.

- Also, see the method declaration within the [`Appboy.h` file][2].
- In addition, you may refer to the [logCustomEvent Documentation][3] for more information.

[0]: /User_Data_Collection/Best_Practices "Best Practices & Segmentation"
[1]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Stopwatch/InitialViewController.m
[2]: https://github.com/Appboy/appboy-ios-sdk/blob/master/AppboyKit/headers/AppboyKitLibrary/Appboy.h
[3]: http://appboy.github.io/appboy-ios-sdk/docs/interface_appboy.html#ad80c39e8c96482a77562a5b1a1d387aa "logCustomEvent Documentation"
[4]: http://appboy.github.io/appboy-ios-sdk/docs/interface_appboy.html#a4f0051d73d85cb37f63c232248124c79 "logCustomEvent:withProperties Documentation"
