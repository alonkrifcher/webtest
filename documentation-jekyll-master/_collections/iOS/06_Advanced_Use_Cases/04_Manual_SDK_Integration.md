---
title: Manual SDK Integration
platform: iOS
---
## Manual SDK Integration

__Time Estimate: 20-30 Minutes__

### Step 1: Cloning the Appboy SDK

1. Clone the Appboy iOS SDK Github project:

```bash
# This command will clone both versions of the Appboy SDK
$ git clone git@github.com:Appboy/appboy-ios-sdk.git
```

2. In Xcode, from the project navigator, select the destination project or group for Appboy
3. Navigate to File > Add Files to “Project_Name”
4. Add the `AppboyKit` folder to your project as a group.
	- Make sure that the "Copy items into destination group’s folder" option is checked if you are integrating for the first time

### Step 2: Adding Required iOS Libraries

1. Click on the target for your project (using the left-side navigation), and select the “Build Phases” tab
2. Click the <i class='icon-plus'></i> button under “Link Binary With Libraries”
3. In the menu, select `SystemConfiguration.framework`
4. Mark this library as required using the pull-down menu next to `SystemConfiguration.framework`
5. Repeat to add each of the following required frameworks to your project, marking each as “required”
	- `QuartzCore.framework`
	- `CoreImage.framework`
	- `SystemConfiguration.framework`
6. Add the following frameworks and mark them as optional:
	- `CoreTelephony.framework`
	- `Social.framework`
	- `Accounts.framework`
	- `AdSupport.framework`
	- `StoreKit.framework`
7. The SDWebImage framework is required for the Appboy News Feed and In-App Messaging to function properly. If you intend to use the News Feed please follow the [integration instructions found on the SDWebImage Github Page][8].

#### Optional Location Tracking

1. Add the `CoreLocation.framework` to enable location tracking
2. You must authorize location for your users using `CLLocationManager` in your app

### Step 3: Updating your App Delegate

**Objective-C**

Add the following line of code to your `AppDelegate.m` file:

```objc
#import "AppboyKit.h"
```

Within your `AppDelegate.m` file, add the following snippet within your `application:didFinishLaunchingWithOptions` method:
__Note__: Be sure to update `YOUR-API-KEY` with the correct value from your [App Settings][5] page.


```objc
[Appboy startWithApiKey:@"YOUR-API-KEY"
         inApplication:application
     withLaunchOptions:launchOptions];
```

##### Implementation Example

See the [`AppDelegate.m` file][6] in the Stopwatch sample app.

**Swift**

If you do not have a bridging header file, create one and name it `your-product-module-name-Bridging-Header.h` by choosing File > New > File > (iOS or OS X) > Source > Header File. Then add the following line of code to the top of your bridging header file:
```swift
#import "AppboyKit.h"
```

In your project's Build Settings, add the relative path of your header file to the `Objective-C Bridging Header` build setting under `Swift Compiler - Code Generation`.

For more information about using objective c code in swift projects, please refer to https://developer.apple.com/library/ios/documentation/swift/conceptual/buildingcocoaapps/MixandMatch.html)

in `AppDelegate.swift`, add following snippet within function `application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool`
```swift
Appboy.startWithApiKey("YOUR-API-KEY", inApplication:application, withLaunchOptions:launchOptions)
```

### SDK Integration Complete

Appboy should now be collecting data from your application and your basic integration should be complete. Please see the following sections in order to enable custom event tracking, push messaging, the news-feed and the complete suite of Appboy features.

[Full iOS class documentation][7] is available to provide additional guidance on any of the aforementioned methods.

[1]: #clone-sdk
[2]: #add-libs
[3]: #configure
[4]: #update-delegate
[5]: https://dashboard.appboy.com/app_settings/app_settings/ "App Settings"
[6]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Stopwatch/AppDelegate.m
[7]: http://appboy.github.io/appboy-ios-sdk/docs/annotated.html "Full iOS Class Documentation"
[8]: https://github.com/rs/SDWebImage "SDWebImage Github Page"
