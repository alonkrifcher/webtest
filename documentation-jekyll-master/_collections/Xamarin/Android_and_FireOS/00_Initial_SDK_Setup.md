---
title: Initial SDK Setup
platform: Xamarin
subplatform: Android and FireOS
---
# Initial SDK Setup

Installing the Appboy SDK will provide you with basic analytics functionality as well as a working in-app slideup message with which you can engage your users.

## Get the Xamarin binding

### Step 1: Get the Xamarin binding

A Xamarin binding is a way to use native libraries in Xamarin apps.  The implementation of a binding consists of building a C# interface to the library, and then using that interface in your application.  See [the Xamarin documentation][2].

There are two ways to include the Appboy SDK binding.  

The first integration method is to include the binding source found [here][3].  Under ```appboy-component\src\android``` you will find our binding source code; adding a project reference to the ```AppboyPlatform.XamarinAndroidBinding.csproj``` in your Xamarin application will cause the binding to be built with your project and provide you access to the Appboy Android SDK.  

![Component Reference][10]

The second integration method involves getting the Appboy SDK Bindings component from the Xamarin Component store.  In your application, if you right click the Components folder and click ```Get More Components``` you will be taken to the component store.  Search for 'Appboy' and install the component into your project.

![Component Reference][9]

__Note__: We require the Xamarin.Android.Support.v4 nuget package/component.  If you install as a component this should automatically be added.  If you link to our source it will be pulled in as part of that project.  If you need to update that package you can do so by manually updating your `packages.config` (or the one in our source code).

### Step 2: Configure the Appboy SDK in appboy.xml
Now that the libraries have been integrated, you have to create an `Appboy.xml` file in your project's `Resources/values` folder. The contents of that file should resemble the following code snippet:

__Note__: Be sure to substitute `REPLACE_WITH_YOUR_API_KEY` with the API key located the [App Settings][4] page of the Appboy dashboard.

```java
    <?xml version="1.0" encoding="utf-8"?>
    <resources>
    <string name="com_appboy_api_key">REPLACE_WITH_YOUR_API_KEY</string>
    </resources>
```

### Step 3: Add Required Permissions to Android Manifest
Now that you've added your API key, you need to add the following permissions to your `AndroidManifest.xml` file:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

__Note__: In Xamarin Studio you can click Options->Android Application and select the Internet and AccessNetworkState permissions through a GUI instead of modifying your `AndroidManifest.xml` source directly.

**Implementation Example**
See `appboy.xml` in the Android sample app for an example implementation.

### Step 4: Tracking User Sessions in Android
To enable user session tracking and basic user data gathering, add the following calls to the `onStart()` and `onStop()` lifecycle methods of __every__ Activity class in your app:

```csharp
protected override void OnStart() {
    base.OnStart();
    Appboy.GetInstance(this).OpenSession(this);
}
```

```csharp
protected override void OnStop() {
    base.OnStop();
    Appboy.GetInstance(this).CloseSession(this);
}
```

## SDK Integration Complete

You should now be able to launch your application and see sessions being logged to the Appboy dashboard (along with device information and other analytics).  Note:  Consult the [Android integration instructions][8] for more in depth discussion of best practices for the basic SDK integration.

[2]: http://developer.xamarin.com/guides/android/advanced_topics/java_integration_overview/binding_a_java_library_%28.jar%29/
[3]: https://github.com/Appboy/appboy-xamarin-bindings
[4]: https://dashboard.appboy.com/app_settings/app_settings/ "App Settings"
[5]: #configure-appboyxml
[6]: #configure-android-manifest
[7]: #track-sessions
[8]: /SDK_Integration/Android "Android Instructions"
[9]: /assets/img/xamarin_android_component.png
[10]: /assets/img/xamarin_android_project.png
