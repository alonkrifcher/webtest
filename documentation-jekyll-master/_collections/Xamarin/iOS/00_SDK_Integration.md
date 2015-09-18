---
title: Initial SDK Setup
platform: Xamarin
subplatform: iOS
---
# Initial SDK Setup

Installing the Appboy SDK will provide you with basic analytics functionality as well as a working in-app slideup message with which you can engage your users.

## Step 1: Get the Xamarin binding

A Xamarin binding is a way to use native libraries in Xamarin apps.  The implementation of a binding consists of building a C# interface to the library, and then using that interface in your application.

There are two ways to include the Appboy SDK binding.  

The first integration method is to include the binding source found [here][3].  In [our github repo][7] you will find our binding source code; adding a project reference to the ```AppboyPlatformXamariniOSBinding.csproj``` in your Xamarin application will cause the binding to be built with your project and provide you access to the Appboy iOS SDK. Please make sure "AppboyPlatformXamariniOSBinding" is showing in your project's "Reference" folder.

![Project Reference][9]

The second integration method involves getting the Appboy SDK Bindings component from the Xamarin Component store.  In your application, if you right click the Components folder and click ```Get More Components``` you will be taken to the component store.  Search for 'Appboy' and install the component into your project.

![Component Reference][8]

__Note__: We link SDWebImage with our SDK inside of our binding project.  If you need a different version of SDWebImage in your application and it is conflicting with our binding, you can manually update the libSDWebImage.a file in our binding project.

## Step 2: Update your App Delegate

Within your `AppDelegate.cs` file, add the following snippet within your `FinishedLaunching` method:
__Note__: Be sure to update `YOUR-API-KEY` with the correct value from your [App Settings][6] page.


```csharp
 Appboy.StartWithApiKey ("YOUR-API-KEY", UIApplication.SharedApplication, options);
```

**Implementation Example**

See the `AppDelegate.cs` file in the TestApp.XamariniOS sample app.

## Optional: Add the Appboy bundle

If you want to use Appboy UI features (e.g. Slideup, News Feed, Feedback), you'll need to add the Appboy bundle to your application.  To do this, copy the folder from either the TestApplication in our [binding repository][3], or, from the [ios sdk][6] (preferably checking out from the release that matches the static library in our binding to avoid version mismatch issues).

## SDK Integration Complete

Appboy should now be collecting data from your application and your basic integration should be complete. Please see the following sections in order to enable custom event tracking, push messaging, the news-feed and the complete suite of Appboy features.

__Note__: Out current public Xamarin binding for the iOS SDK does not connect to the iOS Facebook SDK (linking social data) and does not include sending the IDFA to Appboy.  Please contact support@appboy.com if you want to use these features in Xamarin.

[2]: http://developer.xamarin.com/guides/ios/advanced_topics/binding_objective-c/
[3]: https://github.com/Appboy/appboy-xamarin-bindings
[4]: #add-api-calls
[5]: https://dashboard.appboy.com/app_settings/app_settings/ "App Settings"
[6]: https://github.com/Appboy/appboy-ios-sdk/tree/master/AppboyKit/Appboy.bundle
[7]: https://github.com/Appboy/appboy-xamarin-bindings/tree/master/appboy-component/src/ios-unified
[8]: /assets/img/xamarin_ios_component.png
[9]: /assets/img/xamarin_ios_project.png
