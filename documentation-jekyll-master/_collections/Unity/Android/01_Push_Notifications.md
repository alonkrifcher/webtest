---
title: Push Notifications
platform: Unity
subplatform: Android
---
# Push Notifications

A push notification is an out-of-app alert that appears on the user's screen when an important update occurs. Push notifications are a valuable way to provide your users with time-sensitive and relevant content or to re-engage them with your app.

Sample push notification:

![Sample Push][23]

Check out [Appboy Academy][8] for additional best practices.

Appboy sends push notifications to Android devices using [Google Cloud Messaging (GCM)][9].

__Time Estimate: 7 Minutes__

In order to integrate Appboy push notifications into your app, you need to:

1. Enable GCM in your Google project
2. Configure your app to receive Appboy push notifications
3. Register devices with Appboy
4. Set your API key on the Appboy dashboard

## Step 1: Enabling GCM

If you do not already have a Google API project with GCM messaging enabled, follow the instructions from the Google GCM [Getting Started page][10]. It will take you through the necessary steps to create a Google API project. In order to turn on push notifications in Appboy, you will need to take note of your:

- Project Number
- GCM API Key

## Step 2: Configure your Application

Once you have setup your Google API project, it is time to configure your app.

1. Add the following permissions to your `AndroidManifest.xml`:

```
java
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.GET_ACCOUNTS" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />
```

2. An additional special permission is required in your your `AndroidManifest.xml` to ensure that push notifications are being sent to your app and that no other app can receive your push notifications.

```java
<permission android:name="REPLACE_WITH_YOUR_BUNDLE_IDENTIFIER.permission.C2D_MESSAGE" android:protectionLevel="signature"/>
<uses-permission android:name="REPLACE_WITH_YOUR_BUNDLE_IDENTIFIER.permission.C2D_MESSAGE" />
```

**Implementation Example**

See the [`AndroidManifest.xml`][11] in the Droidboy sample app.

## Step 3: Register Devices

In order for a device to receive push notifications, it must register with the Google GCM server. The Appboy SDK can handle the registration process for you.

1. To tell Appboy to handle GCM registration, add the following configuration to your `appboy.xml` file:

```xml
<!-- Whether or not Appboy should handle registering the device to receive push notifications. Default is false. -->
<bool name="com_appboy_push_gcm_messaging_registration_enabled">true</bool>
```

2. Add the following configuration element to your `appboy.xml` file and replace `YOUR-GOOGLE-API-PROJECT-NUMBER` with your Google API project number:

```xml
<!-- Replace with your Google API project number -->
<string name="com_appboy_push_gcm_sender_id">YOUR-GOOGLE-API-PROJECT-NUMBER</string>
```

3. OPTIONAL: Specify the drawable resource that should be displayed in the push notification in your appboy.xml file.

```xml
<!-- OPTIONAL: The drawable that should be displayed whenever a push notification is received. If no icon is given, the notification will use the application icon -->
<drawable name="com_appboy_push_small_notification_icon">REPLACE_WITH_YOUR_ICON</drawable>
```

4. Add the `AppboyGcmReceiver` to `AndroidManifest.xml`, the category should be set to your bundle identifier:

```xml
<receiver android:name="com.appboy.unity.AppboyGcmReceiver" android:permission="com.google.android.c2dm.permission.SEND" >
 <intent-filter>
   <action android:name="com.google.android.c2dm.intent.RECEIVE" />
   <action android:name="com.google.android.c2dm.intent.REGISTRATION" />
   <category android:name="REPLACE_WITH_YOUR_BUNDLE_IDENTIFIER" />
 </intent-filter>
</receiver>
```

### Sample Manifest

A sample `AndroidManifest.xml` can be found below:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:amazon="http://schemas.amazon.com/apk/res/android"
        package="REPLACE_WITH_YOUR_BUNDLE_IDENTIFIER" android:versionCode="1" android:versionName="0.0">

<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<!-- Permissions for GCM -->  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.GET_ACCOUNTS" />
  <uses-permission android:name="android.permission.WAKE_LOCK" />
  <uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />
  <permission android:name="REPLACE_WITH_YOUR_BUNDLE_IDENTIFIER.permission.C2D_MESSAGE" android:protectionLevel="signature" />
  <uses-permission android:name="REPLACE_WITH_YOUR_BUNDLE_IDENTIFIER.permission.C2D_MESSAGE" />

  <!-- Permissions for ADM -->
  <permission android:name="REPLACE_WITH_YOUR_BUNDLE_IDENTIFIER.permission.RECEIVE_ADM_MESSAGE" android:protectionLevel="signature" />
  <uses-permission android:name="REPLACE_WITH_YOUR_BUNDLE_IDENTIFIER.permission.RECEIVE_ADM_MESSAGE" />
  <uses-permission android:name="com.amazon.device.messaging.permission.RECEIVE" />

  <application android:icon="@drawable/app_icon" android:label="@string/app_name"
               android:debuggable="true">
    <amazon:enable-feature android:name="com.amazon.device.messaging" android:required="false"/>

    <activity android:name="com.appboy.unity.AppboyUnityPlayerNativeActivity" android:label="@string/app_name" android:configChanges="fontScale|keyboard|keyboardHidden|locale|mnc|mcc|navigation|orientation|screenLayout|screenSize|smallestScreenSize|uiMode|touchscreen" android:screenOrientation="sensor">
      <meta-data android:name="android.app.lib_name" android:value="unity" />
      <meta-data android:name="unityplayer.ForwardNativeEventsToDalvik" android:value="true" />
      <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
      </intent-filter>
    </activity>

      <activity android:name="com.appboy.ui.AppboyWebViewActivity" android:theme="@android:style/Theme" />

      <activity android:name="com.appboy.ui.activities.AppboyFeedActivity" android:theme="@android:style/Theme" />    <receiver android:name="com.appboy.AppboyGcmReceiver" android:permission="com.google.android.c2dm.permission.SEND" >
      <intent-filter>
        <action android:name="com.google.android.c2dm.intent.RECEIVE" />
        <action android:name="com.google.android.c2dm.intent.REGISTRATION" />
        <category android:name="REPLACE_WITH_YOUR_BUNDLE_IDENTIFIER" />
      </intent-filter>
    </receiver>

    <receiver android:name="com.appboy.AppboyAdmReceiver" android:permission="com.amazon.device.messaging.permission.SEND">
      <intent-filter>
        <action android:name="com.amazon.device.messaging.intent.RECEIVE" />
        <action android:name="com.amazon.device.messaging.intent.REGISTRATION" />
        <category android:name="REPLACE_WITH_YOUR_BUNDLE_IDENTIFIER" />
      </intent-filter>
    </receiver>

    <!-- Register an optional notification receiver here -->
    <receiver android:name="com.appboy.unity.AppboyUnityGcmReceiver" android:exported="false" >
      <intent-filter>
        <action android:name="REPLACE_WITH_YOUR_BUNDLE_IDENTIFIER.intent.APPBOY_NOTIFICATION_OPENED" />
      </intent-filter>
    </receiver>
</application>
</manifest>
```

5. OPTIONAL: Appboy will broadcast Intents whenever a push notification is received or opened. You can register a receiver to listen to and respond to these intents. The names of the actions are:

```java
REPLACE_WITH_YOUR_BUNDLE_IDENTIFIER.intent.APPBOY_PUSH_RECEIVED
REPLACE_WITH_YOUR_BUNDLE_IDENTIFIER.intent.APPBOY_NOTIFICATION_OPENED
```
Additionally, the sample project in the [Appboy SDK repository][13] contains a full working sample app that includes GCM.

__Run `grep -r REPLACE Assets/Plugins/` again from the command line. It should return no result. If there are any additional instances of `REPLACE` remaining, repeat prior steps.__

##  Step 4: Set your Google Project API Key

You need to input your Google Project API key into the Appboy dashboard. On [the app settings page][14] (where your API keys are located), select your Android app. Enter your Google Project API key in the field labeled GCM (Google Cloud Messaging) API Key under the Push Notifications section.

![GCMKey][15]

After completing the Google GCM [Getting Started page][9] ensure that you're using the API key for server applications. If you're not familiar with the location of that key follow these steps:

1. Login to the [Google Developers Console][22]
2. Select your GCM project
3. Select Credentials under APIs & auth

  ![GCMCredentials][20]
4. Copy your API key for server applications

  ![GCMKeyConsole][21]

__Confirm that your Android app is only targeting version 2.3 (Gingerbread) and above in the "Player Settings" pane within the "Build Settings".__

### Common Issues

1. I followed the integration instructions but I'm still not receiving any push notifications.
    - Not all devices can receive GCM messages. Please read through the [GCM device requirements][18]
2. The Appboy Dashboard isn't registering pushes received or opened within my app.
    - See the sample manifest and device registration instructions above for guidance on creating and registering your own receiver to listen for push reciepts and opens.
      - Refer to the [DroidBoy Sample Project][19] for an integration example.

## Deep Linking to In-App Resources

See our section on ["Deep Linking" to In-App Resources: Android][24]

[1]: #enable-gcm
[2]: #configure-app
[3]: #register-devices
[4]: #set-project-api
[5]: #unity
[6]: #common-issues
[7]: #deep-link
[8]: https://academy.appboy.com/Best_Practices/Push
[9]: http://developer.android.com/google/gcm/
[10]: http://developer.android.com/google/gcm/gs.html "Google's GCM Setup Documentation"
[11]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/AndroidManifest.xml
[12]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/res/values/appboy.xml
[13]: https://github.com/Appboy/appboy-android-sdk/tree/master/droidboy
[14]: https://dashboard.appboy.com/app_settings/app_settings
[15]: /assets/img/gcm_api_insert.png "GCMKey"
[18]: http://developer.android.com/google/gcm/gcm.html
[19]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/AppboyBroadcastReceiver.java "DroidBoy Sample Project"
[24]: /Advanced_Use_Cases/Deep_Linking_to_In-App_Resources/Android_and_FireOS "Protocol URLs"
[20]: /assets/img/google_gcm_credentials.png "GCMCredentials"
[21]: /assets/img/google_gcm_keyconsole.png "GCMKeyConsole"
[22]: https://console.developers.google.com/project "GCMDeveloperConsole"
[23]: /assets/img/android_push_sample.png
