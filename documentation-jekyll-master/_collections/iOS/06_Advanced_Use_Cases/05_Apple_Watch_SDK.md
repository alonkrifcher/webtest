---
title: Apple Watch SDK
platform: iOS
---
## Apple Watch SDK

### Step 1: Cloning the Appboy SDK

Download the Appboy Watch SDK:

```bash
$ git clone git@github.com:Appboy/appboy-ios-sdk.git
```

### Step 2: Adding Appboy Watch SDK In Watch Extension Target

1. In Xcode, from the project navigator, select the destination project or group for Appboy
2. Navigate to File > Add Files to “Project_Name”
3. Add the `Appboy-WatchKit` folder to your project as a group.
	- Make sure in the "Add to targets", you only check your WatchKit Extension. Make sure you uncheck your app target.
	- Make sure that the "Copy items into destination group’s folder" option is checked if you are integrating for the first time.

### Step 3: Update Your App Delegate

Within your `AppDelegate.m` file, add the following snippet within your `application: handleWatchKitExtensionRequest: reply:` method:


```objc
[[Appboy sharedInstance] handleWatchKitExtensionRequest:userInfo reply:reply];
```

### Step 4: User Appboy Watch SDK

There are two classes in the Appboy Watch SDK: `ABWKUser.h` and `AppboyWatchKit.h`.

**ABWKUser**
`ABWKUser` is a proxy for `ABKUser` in the Appboy iOS SDK. You can use `ABWKUser` to log standard user attributes, custom user attributes, incrementing/decrementing custom attributes, and custom array attributes. You can also use `ABWKUser` to log custom user location. `ABWKUser` supports almost every feature of `ABKUser` except setting user gender, email notification type and push notification type. For more information, please check [`<ABWKUser class="h"></ABWKUser>][5].

**AppboyWatchKit**
The `AppboyWatchKit` can log custom events and purchases. You can also use it to submit feedback and log button clicks on pushes delivered to watches. You cannot change the user ID, or change the flush policy on the Appboy Watch SDK. For more information, please check [`<AppboyWatchKit class="h"></AppboyWatchKit>][6].


**Implementation Example**

See the [`AppDelegate.m` file][7] and the [`AppboyInterfaceController.m` file][8] in the Stopwatch sample app.

[5]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Appboy-WatchKit/ABWKUser.h
[6]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Appboy-WatchKit/AppboyWatchKit.h
[7]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Stopwatch/AppDelegate.m
[8]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/StopwatchDevelop%20WatchKit%20Extension/AppboyInterfaceController.m
