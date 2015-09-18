---
title: Integration
platform: Android and FireOS
android_or_fireos: Android
---
## Integration

A push notification is an out-of-app alert that appears on the user's screen when an important update occurs. Push notifications are a valuable way to provide your users with time-sensitive and relevant content or to re-engage them with your app.

Sample push notification:

![Sample Push][27]

Check out [Appboy Academy][7] for additional best practices.

Appboy sends push notifications to Android devices using [Google Cloud Messaging (GCM)][8].

__Note__: Push notifications for Amazon Fire OS use the Amazon Device Messaging (ADM) service rather than GCM. See the [FireOS Push Integration instructions][28] for details on enabling push notifications for Fire OS apps.

__Time Estimate: 7 Minutes__

### Step 1: Enable GCM

If you do not already have a Google API project with GCM messaging enabled, follow the instructions from the Google GCM [Getting Started page][9]. It will take you through the necessary steps to create a Google API project. In order to turn on push notifications in Appboy, you will need to take note of your:

- Project Number
- GCM API Key

__Note:__ When generating your GCM API Key ensure that you leave the IP field blank. This will allow any IP to utilize your GCM API Key so Appboy can send push notifications appropriately.

### Step 2: Configure your Application

Once you have setup your Google API project, it is time to configure your app.

- Add the following permissions to your `AndroidManifest.xml`

  ```java
  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.GET_ACCOUNTS" />
  <uses-permission android:name="android.permission.WAKE_LOCK" />
  <uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />
  ```
- An additional special permission is required in your `AndroidManifest.xml` to ensure that push notifications are being sent to your app and that no other app can receive your push notifications.

  ```java
  <permission android:name="YOUR-APPLICATION-PACKAGE-NAME.permission.C2D_MESSAGE" android:protectionLevel="signature"/>
  <uses-permission android:name="YOUR-APPLICATION-PACKAGE-NAME.permission.C2D_MESSAGE" />
  ```

#### Implementation Example
See the [`AndroidManifest.xml` file][10] in the Droidboy sample app.

### Step 3: Register Devices

In order for a device to receive push notifications, it must register with the Google GCM server. The Appboy SDK can handle the registration process for you.

- To tell Appboy to handle GCM registration, add the following configuration to your `appboy.xml` file:

  ```xml
  <!-- Whether or not Appboy should handle registering the device to receive push notifications. Default is false. -->
  <bool name="com_appboy_push_gcm_messaging_registration_enabled">true</bool>
  ```
- Add the following configuration element to your `appboy.xml` file and replace `YOUR-GOOGLE-API-PROJECT-NUMBER` with your [Google API project number][11]:

  ```xml
  <!-- Replace with your Google API project number -->
  <string name="com_appboy_push_gcm_sender_id">YOUR-GOOGLE-API-PROJECT-NUMBER</string>
  ```

  __Note__: Make sure to use your [project number][11], not the project ID. The project number is also known as the GCM sender ID.

- OPTIONAL: Specify the icon that should be displayed in the push notification in your appboy.xml file.

  ```xml
  <!-- OPTIONAL: The drawable resource that should be displayed whenever a push notification is received. If no icon is given, the notification will use the application icon -->
  <drawable name="com_appboy_push_small_notification_icon">REPLACE_WITH_YOUR_ICON</drawable>
  ```

  #### Implementation Example

  See the [`appboy.xml` file][12] in the Droidboy sample app.
- Add the `AppboyGcmReceiver` to `AndroidManifest.xml`, the category should be set to your [application package name][13]:

  ```xml
  <receiver android:name="com.appboy.AppboyGcmReceiver" android:permission="com.google.android.c2dm.permission.SEND" >
   <intent-filter>
     <action android:name="com.google.android.c2dm.intent.RECEIVE" />
     <action android:name="com.google.android.c2dm.intent.REGISTRATION" />
     <category android:name="YOUR-APPLICATION-PACKAGE-NAME" />
   </intent-filter>
  </receiver>
  ```

  #### Implementation Example

  See the [`AndroidManifest.xml` file][10] in the Droidboy sample app.

### Step 4: Registering Opens and Receipts
Whenever a push notifications is received, `AppboyAdmReceiver.java` broadcasts a push received intent to mark receipt.  If the notification is subsequently opened by the user, a separate notification opened intent is broadcast to mark the open. Appboy requires you to create a receiver to handle these intents and, on notification opened intents, correctly launch your application.

#### Part 1: Registering the Receiver

Register a receiver which extends the closed source `BroadcastReceiver` to listen for the push opened and received intents within the [`AndroidManifest.xml` file][10].

```xml
<receiver android:name="YOURBROADCASTRECEIVERNAME" android:exported="false" >
  <intent-filter>
    <!-- Replace YOUR-APPLICATION-PACKAGE-NAME with the package name of your app -->
    <action android:name="YOUR-APPLICATION-PACKAGE-NAME.intent.APPBOY_PUSH_RECEIVED" />
    <action android:name="YOUR-APPLICATION-PACKAGE-NAME.intent.APPBOY_NOTIFICATION_OPENED" />
  </intent-filter>
</receiver>
```

#### Part 2: Creating the Receiver
The receiver you create should handle those intents broadcast from [AppboyGCMReceiver.java][25] and launch your activity with them:

- Your reciever should inherit from the built-in `BroadcastReceiver` class.
- Your reciever should include an `onReceive()` method which listens to intents broadcast within [AppboyGCMReceiver.java][25].
  - If the `APPBOY_PUSH_RECEIVED` intent contains an action, you optionally can log that a push notification was received.
  - If the `APPBOY_NOTIFICATION_OPENED` intent contains an action, you must bundle the `AppboyGcmReceiver.CAMPAIGN_ID_KEY` strings and any other extras you'd like your app to handle such as [deep links][18]. The `AppboyGcmReceiver.CAMPAIGN_ID_KEY` can be bundled by calling:

    ```java
    Bundle extras = new Bundle();
    extras.putString(AppboyGcmReceiver.CAMPAIGN_ID_KEY, intent.getStringExtra(AppboyGcmReceiver.CAMPAIGN_ID_KEY));
    ```
- Your receiver should launch your activity with the bundled extras from the intent.

__Note:__ A detailed example of this receiver is [`AppboyBroadcastReceiver.java`][14] within the DroidBoy Sample Application. Visit this page for a basic tutorial on creating receivers for an android app. [Android Receiver Help][26]

#### Part 3: [Deprecated] Logging Opens in the Activity

__Note:__ This step is deprecated as of Appboy SDK 1.9.  In Appboy SDK 1.9 or above, logging push opens from your activity is unnecessary as push opens are logged automatically by Appboy. If you are updating to Appboy SDK 1.9, remove all calls to `Appboy.logPushNotificationOpened()` in your code to avoid double logging.

If integrating a version of the Appboy SDK lower than 1.9 (not recommended), log push opens within your activity by calling:

```java
Appboy.getInstance(this).logPushNotificationOpened(campaignId);
```

For a detailed example, see the `processIntent()` method within [DroidBoyActivity.java][29]

### Step 5: Set your Google Project API Key

You need to input your Google Project API key into the Appboy dashboard. On [the app settings page][15] (where your API keys are located), select your Android app. Enter your Google Project API key in the field labeled GCM (Google Cloud Messaging) API Key under the Push Notifications section.

![GCMKey][16]

After completing the Google GCM [Getting Started page][9] ensure that you're using the API key for server applications. If you're not familiar with the location of that key follow these steps:

1. Login to the [Google Developers Console][21]

2. Select your GCM project

3. Select Credentials under APIs & auth
  ![GCMCredentials][19]
4. Copy your API key for server applications
  ![GCMKeyConsole][20]

### Step 6: Configure Your Notification Icons
__[Android design guidelines][31] require that notification icons are all white on a transparent background__. Appboy allows you to configure your notification icon by specifying a drawable resource within your [Appboy.xml][12] file:

```xml
<drawable name="com_appboy_push_small_notification_icon">REPLACE_WITH_YOUR_ICON</drawable>
```

The icons pictured below are examples of properly designed icons:

![Android Icon Example][32]

For additional information on Android iconography, please see the [Android Iconography Design Guidelines][31].

__Note:__ If you do not comply with the [Android design guidelines][31] mentioned above, Android will force your icon to be all white on version 5.0+(Lollipop) and higher.

#### Manual Push Registration
If you need to handle GCM registration yourself, you should do the following:

- Within [Appboy.xml][12] add the following:

  ```xml
  <bool name="com_appboy_push_gcm_messaging_registration_enabled">false</bool>
  ```
- Use the [registerAppboyPushMessages()][35] method to pass your user's GCM `registration_id` to Appboy:

  ```java
  Appboy.getInstance(this).registerAppboyPushMessages(registration_id);
  ```

__Note:__ Appboy does not recommend using manual registration if possible.

#### Common Issues:

1. I followed the integration instructions but I'm still not receiving any push notifications.
    - Not all devices can receive GCM messages. Please read through the [GCM device requirements][17]
2. The Appboy Dashboard isn't registering pushes received or opened within my app.
    - See the sample manifest and device registration instructions above for guidance on creating and registering your own receiver to listen for push receipts and opens.
      - Refer to the [DroidBoy Sample Project][14] for an integration example.

### Deep Linking to In-App Resources

See our section on ["Deep Linking" to In-App Resources: Android][18]

### Accessing Push Titles & Content For Additional Display
Notifications on Android Froyo and Gingerbread are limited to one line of text. Starting with Honeycomb, notifications contain a title and two lines of content. This may not be enough room to get your message across clearly. However, the title and content of the notification are accessible programmatically. By using the following methods, you may extract the content and display it however you so choose within your application:

- Extract the title and content from the Intent extras within your BroadcastReceiver you created above in [Step 4][23].

  ```java
  String title = intent.getExtras().getString(AppboyGcmReceiver.TITLE_KEY);
  String content = intent.getExtras().getString(AppboyGcmReceiver.CONTENT_KEY);
  ```

### Customizing Notification Icon Background Color

The notification icon background color can be overriden within your [Appboy.xml][12] file. If the color is not specified, the default background color is the same gray Lollipop uses for system notifications. Please see the example color override below:

```xml
<integer name="com_appboy_default_notification_accent_color">0xFFf33e3e</integer>
```

### Additional Customization
In some scenarios you may wish to customize push notifications in ways that would be cumbersome or unavailable server side.  To give you complete control of notification functionality, we've exposed a method on the Appboy interface to set your own `IAppboyNotificationFactory`:

```java
setCustomAppboyNotificationFactory(IAppboyNotificationFactory appboyNotificationFactory);
```

If a custom `IAppboyNotificationFactory` is set, upon push receipt, Appboy will call your factory's `createNotification()` method with the notification object generated by Appboy - allowing you to modify it before display.  You can return `null` to not show the notification at all, modify or add fields to it, or generate a separate notification for display.  Example use cases include: setting a delete intent, delaying notification display, or adding a custom notification action button.

The recommended place to set your custom `IAppboyNotificationFactory` is in the `onCreate()` method of your application (not activity).  This will allow the notification factory to be set correctly whenever your app process is active.  See [`DroidboyApplication.java`][36] for an example.

__Note:__ Creating your own notification from scratch is an advanced use case and should be done only with thorough testing and deep understanding of Appboy's push functionality (you must, for example, ensure your notification logs push opens correctly).

[7]: https://academy.appboy.com/Best_Practices/#push "Push Notifications: Best Practices"
[8]: http://developer.android.com/google/gcm/
[9]: http://developer.android.com/google/gcm/gs.html
[10]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/AndroidManifest.xml "AndroidManifest.xml"
[11]: https://developers.google.com/console/help/#projectnumber
[12]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/res/values/appboy.xml "Appboy.xml"
[13]: http://stackoverflow.com/questions/6273892/android-package-name-convention
[14]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/AppboyBroadcastReceiver.java "DroidBoy Sample Project"
[15]: https://dashboard.appboy.com/app_settings/app_settings "App Settings Page"
[16]: /assets/img/gcm_api_insert.png "GCMKey"
[17]: http://developer.android.com/google/gcm/gcm.html "GCM Developer Page"
[18]: /Advanced_Use_Cases/Deep_Linking_to_In-App_Resources/Android_and_FireOS "Protocol URLs"
[19]: /assets/img/google_gcm_credentials.png "GCMCredentials"
[20]: /assets/img/google_gcm_keyconsole.png "GCMKeyConsole"
[21]: https://console.developers.google.com/project "GCMDeveloperConsole"
[23]: #step-4-registering-opens-and-receipts
[25]: https://github.com/Appboy/appboy-android-sdk/blob/master/android-sdk-ui/src/com/appboy/AppboyGcmReceiver.java "AppboyGcmReceiver.java"
[26]: http://www.compiletimeerror.com/2013/03/android-broadcast-receiver-in-detail.html#.U5nCZxYmbww "Android Receiver Tutorial"
[27]: /assets/img/Gallery_Push_Epix.png
[28]: /Enabling_Message_Channels/Push_Notifications/FireOS
[29]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/DroidBoyActivity.java "DroidBoyActivity.java"
[31]: https://developer.android.com/design/style/iconography.html#notification
[32]: /assets/img/android_design_icon_guideline_example.png "Android Design Icon Example"
[35]: https://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/Appboy.html#registerAppboyPushMessages(java.lang.String) "Manual Registration Method"
[36]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/DroidboyApplication.java
