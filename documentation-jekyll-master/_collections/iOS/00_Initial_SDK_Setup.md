---
title: Initial SDK Setup
platform: iOS
---
# Initial SDK Setup

Installing the Appboy SDK will provide you with basic analytics functionality as well as a working in-app slideup message with which you can engage your users.

The iOS Appboy SDK should be installed or updated using [CocoaPods][1], a dependency manager for Objective-C projects. CocoaPods provides added simplicity for integration and updating.

__Time Estimate: 5-10 Minutes__

## iOS SDK CocoaPod Integration

### Step 1: Install CocoaPods

Installing the SDK via the iOS [CocoaPod][1] automates the majority of the installation process for you. Before beginning this process please ensure that you are using [Ruby version 2.0.0][2] or greater. Don't worry, knowledge of Ruby syntax isn't necessary to install this SDK.

Simply run the following command to get started:
```bash
$ sudo gem install cocoapods
```

__Note__: If you are prompted to overwrite the `rake` executable please refer to the [Getting Started Directions on CocoaPods.org][3] for further details.
__Note__: If you have issues regarding CocoaPods, please refer to the [CocoaPods Troubleshooting Guide][25].

### Step 2: Constructing the Podfile

Now that you've installed the CocoaPods Ruby Gem, you're going to need to create a file in your Xcode project called `Podfile`.

__Note__: If you are not building your app to support 64-bit architectures please check out our section below on [32-bit versions of Appboy][12]

Add the following line to your podfile and save it within your Xcode project:
```
pod 'Appboy-iOS-SDK', '~>2.13'
```

__Note__: We suggest you version Appboy so pod updates automatically grab anything smaller than a minor version update. This looks like 'pod 'Appboy-iOS-SDK' ~> Major.Minor.Build'. If you want to integrate the latest version of Appboy SDK automatically even with major changes, you can use `pod 'Appboy-iOS-SDK'` in your Podfile.

##### Example Podfile

If you would like to see an example, see the [podfile][14] within our Stopwatch Sample Application.

### Step 3: Installing the Appboy SDK

To install the Appboy SDK Cocoapod, navigate to the directory of your Xcode app project within your terminal and run the following command:
```
pod install
```
At this point you should be able to open the new Xcode project workspace created by CocoaPods.

![New Workspace][15]

### Step 4: Updating your App Delegate

**Objective-C**:

Add the following line of code to your `AppDelegate.m` file:

```objc
#import "Appboy_iOS_SDK/AppboyKit.h"
```

Within your `AppDelegate.m` file, add the following snippet within your `application:didFinishLaunchingWithOptions` method:
__Note__: Be sure to update `YOUR-API-KEY` with the correct value from your [App Settings][6] page.


```objc
[Appboy startWithApiKey:@"YOUR-API-KEY"
         inApplication:application
     withLaunchOptions:launchOptions];
```

##### Implementation Example

See the [`AppDelegate.m` file][7] in the Stopwatch sample app.

**Swift**:

If you do not have a bridging header file, create one and name it `your-product-module-name-Bridging-Header.h` by choosing File > New > File > (iOS or OS X) > Source > Header File. Then add the following line of code to the top of your bridging header file:
```swift
#import "AppboyKit.h"
```

In your project's Build Settings, add the relative path of your header file to the `Objective-C Bridging Header` build setting under `Swift Compiler - Code Generation`.

For more information about using Objective-C code in Swift projects, please see the [Apple Developer Docs][19].

In `AppDelegate.swift`, add following snippet to the function `application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool`

```swift
Appboy.startWithApiKey("YOUR-API-KEY", inApplication:application, withLaunchOptions:launchOptions)
```

## SDK Integration Complete

Appboy should now be collecting data from your application and your basic integration should be complete. Please see the following sections in order to enable custom event tracking, push messaging, the news-feed and the complete suite of Appboy features.

## Appboy PodFiles for Non 64 Bit Apps

__Note__: On February 1, 2015, new iOS apps uploaded to the App Store __must__ include 64-bit support and be built with the iOS 8 SDK, included in Xcode 6 or later.

As of Appboy iOS SDK v2.6, the SDK fully supports 64 bit architecture, but requires a minimum build of iOS 5.1.1. If you do not yet support 64 bit or are building below 5.1.1, you must specify v2.5.2 of the SDK in your podfile.

```
// Contents of a Podfile for a Non 64 bit application
pod 'Appboy-iOS-SDK/AppboyKit', '~> 2.5.2'
```

## Updating the Appboy SDK via CocoaPod

To update a cocoapod simply run the following commands within your project directory:

```
sudo gem install cocoapods
pod update
```

## Manual Integration Options

__Note__: We strongly recommend that you implement the SDK via a CocoaPod. It will save you a lot of time and automate much of the process for you. However, if you are unable to do so you may complete integration manually without CocoaPods by following our manual integration instructions on the following page:

- [Manual Integration Instructions - iOS][8]

## WatchKit SDK Integration Options

If your app has a WatchKit app/extension, you can integrate our Appboy WatchKit SDK to collect user data in your watch app:

- [Appboy WatchKit SDK Instructions - Apple Watch][28]

## App Indexing

If you have Google App Indexing enabled for your application, Google will use emulators (i.e. Google app crawlers) to crawl your application and index it for search results.  While your application should behave normally in this scenario (otherwise it is violating the Google Search Guidelines), allowing Appboy to function normally during indexing crawls will generate a large amount of useless data points.  To avoid this, follow the directions at https://developers.google.com/app-indexing/ios/referrer to detect Google app crawlers and call ```[[Appboy sharedinstance] shutdownServerCommunication]``` once you've initialized Appboy to ensure you don't report data for that bot on that emulator.

## Optional IDFA Collection

IDFA Collection is optional within the Appboy SDK and disabled by default. IDFA Collection is required if you intend to utilize our [install attribution integrations][21]. However, we may develop additional features in the future which would benefit from the collection of your IDFA. If you opt to store your IDFA, we will store it free of charge so you may take advantage of these options immediately upon release without additional development work.

As a result, we recommend continuing to collect the IDFA if you meet any of the following criteria:

- You are using advertising elsewhere in the app or through our in-app News Feed
- You are attributing app installation to a previously served advertisement
- You are attributing an action within the application to a previously served advertisement

IDFA collection is enabled by adding the following PreProcessor Macro to the Build Settings of your app: `ABK_ENABLE_IDFA_COLLECTION`. If you integrate Appboy through Cocoapods, you should define the PreProcessor Macro in the build setting of the pod project, instead of your app target.

![IDFA In Build Setting][20]

## Upgrading From 2.9.X to 2.10

### Updating your Deployment Target

As of version 2.10, Appboy only supports iOS 6 and above. You may need to update your deployment target as a result.

### Maintaining Facebook User Data Flow

In version 2.10 of the Appboy iOS SDK we stopped collecting Facebook user information automatically and removed the ability to prompt users to connect their Facebook account (i.e. `promptUserForAccessToSocialNetwork` is no longer supported for Facebook). If you were relying on this automatic data collection, please see the following documentation regarding [collecting Facebook user data in versions 2.10+][26].


[1]: http://cocoapods.org/
[2]: https://www.ruby-lang.org/en/installation/
[3]: http://guides.cocoapods.org/using/getting-started.html "CocoaPods Installation Directions"
[4]: http://guides.cocoapods.org/syntax/podfile.html
[6]: https://dashboard.appboy.com/app_settings/app_settings/ "App Settings"
[7]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Stopwatch/AppDelegate.m
[8]: /iOS/#manual-sdk-integration
[14]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Podfile "Example Podfile"
[15]: /assets/img/podsworkspace.png
[17]: http://guides.cocoapods.org/using/getting-started.html#updating-cocoapods
[19]: https://developer.apple.com/library/ios/documentation/swift/conceptual/buildingcocoaapps/MixandMatch.html
[20]: /assets/img/IDFAInBuildSetting.png
[21]: /Partner_Integration/Attribution_Integrations
[22]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Stopwatch/SocialNetworkViewController.m
[25]: http://guides.cocoapods.org/using/troubleshooting.html "CocoaPods Troubleshooting Guide"
[26]: /User_Data_Collection/Social_Data_Tracking/iOS/Version_2.10_and_Above
[27]: https://github.com/Appboy/appboy-ios-sdk/blob/master/CHANGELOG.md "iOS Changelog"
[28]: /iOS/#apple-watch-sdk
