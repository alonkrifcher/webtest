---
title: Initial SDK Setup
platform: Unity
subplatform: iOS
---
# Initial SDK Setup

Installing the Appboy SDK will provide you with basic analytics functionality as well as working in-app messages with which you can engage your users.

Before you can start using Appboy in your Unity scripts, you'll need to import the plugin files to your Unity project.

__Time Estimate: 20-30 Minutes__

## Step 1: Cloning the Unity SDK

Clone the [Appboy Unity SDK Github project][1]

```bash
$ git clone git@github.com:Appboy/appboy-unity-sdk.git
```

## Step 2: Copying Required Plugins

| Are you using other plugins? | What to Copy | Where to Copy |
| ---------------------------- | ------------ | ------------- |
| __NO__ | the `Plugins` directory from the Unity SDK | the `Assets` folder of your Unity Project |
| __YES__ | `Plugins/Appboy/AppboyBinding.cs` | `/<your-project>/Assets/Plugins` |
| __YES__ | `Plugins/iOS` | `/<your-project>/Assets/Plugins/iOS` |

## Step 3: Generating Xcode project & Adding Required Classes

Now that you've copied over the requisite plugins, the following steps will help you generate your Xcode project and add the required classes for the Appboy SDK to function:

1. Generate your Xcode project in Unity by clicking on "File" -> "Build Settings..."
2. Select iOS as the platform and click "Build".
3. Select ` /your-project/your-iOS-project/` as the build location.
4. Confirm that Unity has copied the files `AppboyBinding.m`, `AppboyUnityManager.h`, and `AppboyUnityManager.mm` to the "Classes" directory of your generated project.
	- You may need to add `AppboyUnityManager.h` to the "Classes" directory of the generated project, without checking "Copy items into destination group's folder".
    - Both `AppboyBinding.m` and `AppboyUnityManager.mm` should already be integrated into your project under the "Libraries" directory. If they are not, you will have to copy them into your "Classes" directory as well.

## Step 4: Integrating the Appboy iOS SDK

You must now integrate the standard Appboy iOS SDK into your project.

1. Add the `AppboyKit` SDK and `SDWebImage.framework` to your project.
	1. In Xcode, from the project navigator, select the destination project or group for Appboy
	2. Navigate to File > Add Files to “Project_Name”
	3. Add the `AppboyKit` folder and `SDWebImage.framework` to your project as a group from the Unity SDK Libraries Folder.
	  - If you are integrating for the first time, Make sure that the "Copy items into destination group’s folder" option is checked
		- Check "Create groups" option for the "Added folders"
	  ![Add libraries][13]
2. Add Required iOS Libraries
	1. Click on the target for your project (using the left-side navigation), and select the “Build Phases” tab
	2. Click the + button under “Link Binary With Libraries”
	3. In the menu, select `SystemConfiguration.framework` and press the Add button.
    ![Add SystemConfiguration.framework][10]
	4. Mark this library as "Required" using the pull-down menu next to `SystemConfiguration.framework`
    ![Mark SystemConfiguration.framework as Required][11]
	5. Repeat Steps 3 and 4 to add each of the following required frameworks to your project, marking each as “Required”
		- `QuartzCore.framework`
		- `CoreImage.framework`
    ![Rinse and Repeat][12]
	6. Add the following frameworks and mark them as "Optional":
		- `CoreTelephony.framework`
		- `Social.framework`
		- `ImageIO.framework`
		- `Accounts.framework`
		- `AdSupport.framework`
		- `StoreKit.framework`
		- `CoreLocation.framework`
			- You must authorize location for your users using `CLLocationManager` in your app
3. Configure the Appboy Library and Framework
	1. In the “Build Phases” panel, expand the “Link Binary With Libraries” section and the “Copy Bundle Resources” section
	2. Your "Build Phases" panel should look like the following screenshot:
		- Please ensure that `libAppboyKitLibrary.a` is within the Link Binary With Libraries section, and `Appboy.bundle` is within the "Copy Bundle Resources" section.
		![Link iOS Binary and Library][2]

## Step 5: Update project's build settings

   1. Click on the target for your project (using the left-side navigation), and select the “Build Settings" tab
   2. Find "Other Linker Flags" and add `-ObjC` to the row
      ![Adding `-ObjC` in "Other Linker Flags"][14]
   3. Find "Framework Search Paths" and add the relative path of the SDWebImage.framework. In the sample here, the relative path is `./../../../Libraries`
      ![Adding the Path to SDWebImage.framework to "Framework Search Paths"][15]

## Step 6: Modifying UnityAppController.mm

You now must make modifications to your generated `Classes\UnityAppController.mm`:

1. At the top of `UnityAppController.mm` add the following import statements:

	```objc
	#import "AppboyKit.h"
	#import "AppboyUnityManager.h"
	```
2. In the method `applicationDidFinishLaunchingWithOptions`, add the following code snippet above the return statement.
	__Note__: Be sure to replace `"YOUR-API-KEY"` with the Appboy API key from the dashboard.

	```objc
	[Appboy startWithApiKey:@"YOUR-API-KEY"
    	    inApplication:application
        	withLaunchOptions:launchOptions];

[Appboy sharedInstance].inAppMessageController.delegate = [AppboyUnityManager sharedInstance];
```
## Step 7: Fetching In-App Messages

In order to appropriately display in-app messages from Appboy you must add the following code to your `applicationDidFinishLaunchingWithOptions` method within your `UnityAppController.mm` file:

- `@"Your Unity Game Object Name"` must be replaced with the unity object name you want to listen to the in-app message.
- `@"Your Unity Call Back Method Name"` is the call back method name that handles the in-app message.
- The call back method must be contained within the unity object you passed in as the first parameter.

```objc
[[AppboyUnityManager sharedInstance] addSlideupListenerWithObjectName:@"Your Unity Game Object Name" callbackMethodName:@"Your Unity Call Back Method Name"];
```

The default behavior for in-app messages is set to send the message to Unity instead of directly to the app interface, meaning your in-app message will __not__ automatically appear in your app. To alter this, you just need to change the - `(BOOL) onInAppMessageReceived:(ABKInAppMessage *)inAppMessage` method in the `AppboyUnityManager.mm` and make it return `NO`.

## Step 8: Updating Your App From Unity

Finally, if you need to update your App from Unity, ensure that you choose the same location to generate the Xcode project each time and __choose "Append"__ the existing folder when prompted by unity to ensure that you don't have to redo any of your Appboy setup in the future.

## SDK Integration Complete

Appboy should now be collecting data from your application and your basic integration should be complete. Please see the following sections in order to enable custom event tracking, push messaging, the news-feed and the complete suite of Appboy features.

[1]: https://github.com/appboy/appboy-unity-sdk
[2]: /assets/img/build_phase_ios.png "Link iOS Binary and Library"
[3]: #cloning-unity
[4]: #plugins
[5]: #xcode
[6]: #ios-sdk
[7]: #app-controller
[8]: #fetch-slideups
[9]: #update-unity
[10]: /assets/img/unity-ios-sysconfig.png
[11]: /assets/img/unity-ios-sysconfigreq.png
[12]: /assets/img/iosunitystep3part5.gif
[13]: /assets/img/unity_adding_iOS_SDK.png
[14]: /assets/img/unity_add_other_linker_flag.png
[15]: /assets/img/unity_add_framework_search_paths.png
