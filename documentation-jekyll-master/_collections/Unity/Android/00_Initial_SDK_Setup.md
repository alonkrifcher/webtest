---
title: Initial SDK Setup
platform: Unity
subplatform: Android
---
# Initial SDK Setup

Installing the Appboy SDK will provide you with the ability to collect analytics and engage users with push messages and native in-app messages.

__Time Estimate: 20-30 Minutes__

## Step 1: Cloning the Unity SDK
Clone the [Appboy Unity SDK Github project][1].
To clone the project, open a terminal and run the following command:
```bash
$ git clone git@github.com:Appboy/appboy-unity-sdk.git
```

## Step 2: Copying Required Plugins

| Are you using other plugins? | What to Copy | Where to Copy |
| ---------------------------- | ------------ | ------------- |
| __NO__ | the `Plugins` directory from the Unity SDK | the `Assets` folder of your Unity Project |
| __YES__ | `Plugins/Appboy/AppboyBinding.cs` | `/<your-project>/Assets/Plugins` |
| __YES__ | `Plugins/Android` | `/<your-project>/Assets/Plugins/Android` |

## Step 3: Adding Your Bundle Identifier

### Part 1: Identifying Replacement Targets
To find all of the locations that must be modified to fully configure Appboy for Android, run the following from the root directory of your Unity project:

```bash
grep -r REPLACE Assets/Plugins/
```

**Example output with successful plugin transfer:**

```bash
Android/AndroidManifest.xml:  <package="REPLACE_WITH_YOUR_BUNDLE_IDENTIFIER" android:versionCode="1" android:versionName="0.0">
Android/AndroidManifest.xml:  <permission android:name="REPLACE_WITH_YOUR_BUNDLE_IDENTIFIER.permission.C2D_MESSAGE" android:protectionLevel="signature" />
Android/AndroidManifest.xml:  <uses-permission android:name="REPLACE_WITH_YOUR_BUNDLE_IDENTIFIER.permission.C2D_MESSAGE" />
Android/AndroidManifest.xml:  <permission android:name="REPLACE_WITH_YOUR_BUNDLE_IDENTIFIER.permission.RECEIVE_ADM_MESSAGE" android:protectionLevel="signature" />
Android/AndroidManifest.xml:  <uses-permission android:name="REPLACE_WITH_YOUR_BUNDLE_IDENTIFIER.permission.RECEIVE_ADM_MESSAGE" />
Android/AndroidManifest.xml:        <category android:name="REPLACE_WITH_YOUR_BUNDLE_IDENTIFIER" />
Android/AndroidManifest.xml:        <category android:name="REPLACE_WITH_YOUR_BUNDLE_IDENTIFIER" />
Android/AndroidManifest.xml:        <action android:name="REPLACE_WITH_YOUR_BUNDLE_IDENTIFIER.intent.APPBOY_NOTIFICATION_OPENED" />
Android/res/values/appboy.xml:  <string name="com_appboy_api_key">REPLACE_WITH_YOUR_APPBOY_API_KEY</string>
Android/res/values/appboy.xml:  <string name="com_appboy_push_gcm_sender_id">REPLACE_WITH_YOUR_GCM_SENDER_ID</string> <!-- Replace with your gcm sender ID. The sender ID is your Google API project number. -->

```

### Part 2: Replacing the Placeholders with your Bundle Identifier

1. Find your `Bundle Identifier` within Unity.
	- Click File -> Build Settings -> Player Settings -> Android Tab
	- The Player Settings pane looks like this in Unity 4:
	![Unity Bundle Identifier][2]

2. Open AndroidManifest.xml and find/replace all instances of `REPLACE_WITH_YOUR_BUNDLE_IDENTIFIER` with your `Bundle Identifier`.
  - Your `Bundle Identifier` is usually in the form `com.unity.appname`.

  __Note__: All Activity classes registered in your AndroidManifest.xml file should be fully integrated with the Appboy Android SDK. If you add your own Activity class, you must follow Appboy's usual [integration instructions][9] to ensure that analytics are being collected.

3. In `Plugins/Android/res/values/appboy.xml` replace all instances of `REPLACE_WITH_YOUR_APPBOY_API_KEY` with your Appboy API key. Your API Key can be found in the [App Settings page of the Appboy Dashboard][3]

4. To enable GCM push notifications, insert your GCM Sender ID from Google into the same appboy.xml configuration file. If you don't have a GCM Sender ID yet, you'll need to follow the GCM setup instructions from Google. Once you have the ID, change `REPLACE_WITH_YOUR_GOOGLE_API_PROJECT_NUMBER` to your GCM ID. Since the GCM ID is a number, you shouldn't surround the value with quotes. Your ID should look something like `134664038331`.  For more information on integrating GCM, please visit our [GCM push integration instructions][12].

## Advanced Android Integration Options

### Extending Appboy's Native Unity Player

The default AndroidManifest.xml file provided has one Activity class registered, `com.appboy.unity.AppboyUnityPlayerNativeActivity`.  This class is integrated with the Appboy SDK and extends `UnityPlayerNativeActivity` with session handling, in-app message registration, push notification analytics logging, and more.  

If you are creating your own custom `UnityPlayerNativeActivity` in a library or plugin project, you will need to extend Appboy's `AppboyUnityPlayerNativeActivity` to integrate your custom functionality with Appboy.

__Note__: Before beginning work on extending `AppboyUnityPlayerNativeActivity`, follow our instructions for integrating Appboy into your Unity project.

1. Add the Appboy Android SDK as a dependency to your library or plugin project as described in the first three steps of our [Android Studio integration instructions][14].

2. Integrate our Unity `.aar`, which contains Appboy's Unity-specific functionality, to your Android library project you are building for Unity.  The `.aar` is available from our [public repo][15].  Once our Unity library is successfully integrated, modify your `UnityPlayerNativeActivity` to extend `AppboyUnityPlayerNativeActivity`.  

3. Export your library or plugin project and drop it into `/<your-project>/Assets/Plugins/Android` as normal.  Do not include any Appboy source code in your library or plugin as they will already be present in `/<your-project>/Assets/Plugins/Android`.

4. Edit your `/<your-project>/Assets/Plugins/Android/AndroidManifest.xml` to specify your `AppboyUnityPlayerNativeActivity` subclass as the main activity.

You should now be able to package an `.apk` from the Unity IDE that is fully integrated with Appboy and contains your custom `UnityPlayerNativeActivity` functionality.

### Prime 31 Compatibility

In order to use the Appboy Unity plugin with Prime31 plugins, edit your project's `AndroidManifest.xml` to use the Prime31 compatible Activity classes and GCM receiver. Change all references of
`com.appboy.unity.AppboyUnityPlayerNativeActvity`
`com.appboy.unity.AppboyUnityGcmReceiver`

to

`com.appboy.unity.prime31compatible.AppboyUnityPlayerNativeActivity`
`com.appboy.unity.prime31compatible.AppboyUnityGcmReceiver`

### Disabling Native In-App Message Display

As of Appboy Unity SDK version `1.5.0`, in-app messages from Appboy's servers are automatically displayed natively.  To disable this functionality, set `com_appboy_inapp_show_inapp_messages_automatically` to `false` in your Unity project's `appboy.xml`.

### Amazon ADM Push

Appboy supports integrating [Amazon ADM push][10] into Unity apps.  If you would like to integrate Amazon ADM push, create a file called `api_key.txt` containing your ADM api key and place it in the `Plugins/Android/assets/` folder.  For more information on integrating Amazon ADM with Appboy, please visit our [ADM push integration instructions][11].

### Registering Unity GameObject as Listeners
Unity GameObjects must be registered as listeners in in your Unity project's `appboy.xml` to be notified of incoming push notifications and in-app messages.

#### Part 1: Push Notification GameObject Listeners
The Unity GameObject to be notified when a push notification is received.
`com_appboy_push_notification_received_listener_game_object_name`
`com_appboy_push_notification_received_listener_callback_method_name`

The Unity GameObject to be notified when a push notification has been opened.
`com_appboy_push_notification_opened_listener_game_object_name`
`com_appboy_push_notification_opened_listener_callback_method_name`

#### Part 2: In-App Message GameObject Listeners
The Unity GameObject to be notified when an in-app message is received.
    `com_appboy_inapp_listener_game_object_name`
    `com_appboy_inapp_listener_callback_method_name`

**Sample Appboy.xml Snippet:**

```xml
<!-- Sample -->
<string name="com_appboy_push_notification_received_listener_game_object_name"></string>
<string name="com_appboy_push_notification_received_listener_callback_method_name"></string>
<string name="com_appboy_push_notification_opened_listener_game_object_name"></string>
<string name="com_appboy_push_notification_opened_listener_callback_method_name"></string>
<string name="com_appboy_inapp_listener_game_object_name"></string>
<string name="com_appboy_inapp_listener_callback_method_name"></string>
```

## SDK Integration Complete

Appboy should now be collecting data from your application and your basic integration should be complete. Please see the following sections in order to enable custom event tracking, push messaging, the news-feed and the complete suite of Appboy features.

[1]: https://github.com/appboy/appboy-unity-sdk
[2]: /assets/img/UnityBundleIdentifier.png
[3]: https://dashboard.appboy.com/app_settings/app_settings/settings
[4]: /App_Group_Configuration "Dashboard Setup API Keys"
[5]: #clone-unity
[6]: #copy-plugins
[7]: #add-bundle-id
[9]: /Android/#initial-sdk-setup
[10]: https://developer.amazon.com/public/apis/engage/device-messaging
[11]: https://documentation.appboy.com/Enabling_Message_Channels/Push_Notifications/FireOS
[12]: https://documentation.appboy.com/Enabling_Message_Channels/Push_Notifications/Android
[13]: #android-advanced
[14]: https://documentation.appboy.com/SDK_Integration/Android_and_FireOS#integrate-with-android-studio
[15]: https://github.com/Appboy/appboy-unity-sdk/blob/master/Plugins/Android/libs/appboy-unity.aar
[16]: #extending-native
[17]: #prime-31
[18]: #adm-push
[19]: #game-objects
[20]: #inapp-disabling-native
