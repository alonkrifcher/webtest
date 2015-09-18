---
title: Integration
platform: Android and FireOS
android_or_fireos: FireOS
---
## Integration

A push notification is an out-of-app alert that appears on the user's screen when an important update occurs. Push notifications are a valuable way to provide your users with time-sensitive and relevant content or to re-engage them with your app.

__Note:__ ADM (Android Device Messaging) is not supported on non-Amazon devices. In order to test Kindle Push you must have a FireOS device ([see Amazon Listing of supported devices][32]).

Check out [Appboy Academy][8] for additional best practices.

Appboy sends push notifications to Amazon devices using [Amazon Device Messaging (ADM)][14].

__Time Estimate: 60 Minutes__

__Note__: Android Device Messaging (ADM) is __only__ supported on Fire phones and tablets (except for Kindle Fire 1st Generation). You cannot test ADM messaging on a regular Android device.

### Step 1: Enable ADM

- Create an account with the [Amazon Apps & Games Developer Portal][10] if you have not already done so.
- Obtain OAuth credentials (Client ID and Client Secret) and an ADM API key by following the instructions in [Obtaining Amazon Device Messaging Credentials][11].
- Add the following line to your `res/values/Appboy.xml` file to enable ADM:

  ```xml
  <bool name="com_appboy_push_adm_messaging_registration_enabled">true</bool>
  ```

  See [Appboy.xml][17] within the Droidboy Sample app for an example implementation.

### Step 2: Update AndroidManifest.xml

- In your app's AndroidManifest.xml, add Amazon's namespace to the `<tt>manifest</tt>` tag.

  ```xml
  xmlns:amazon="http://schemas.amazon.com/apk/res/android"
  ```
- Declare permissions required to support ADM by adding `<tt>permission</tt>` and `<tt>uses-permission</tt>` elements after the `<tt>manifest</tt> element`.

  ```xml
  <manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:amazon="http://schemas.amazon.com/apk/res/android"
    package="[YOUR PACKAGE NAME]"
    android:versionCode="1"
    android:versionName="1.0">

  <!-- This permission ensures that no other application can intercept your ADM messages. -->
  <permission
    android:name="[YOUR PACKAGE NAME].permission.RECEIVE_ADM_MESSAGE"
    android:protectionLevel="signature" />
  <uses-permission android:name="[YOUR PACKAGE NAME].permission.RECEIVE_ADM_MESSAGE" />

   <!-- This permission allows your app access to receive push notifications from ADM. -->
  <uses-permission android:name="com.amazon.device.messaging.permission.RECEIVE" />

  <!-- ADM uses WAKE_LOCK to keep the processor from sleeping when a message is received. -->
  <uses-permission android:name="android.permission.WAKE_LOCK" />
    ...
  </manifest>
  ```

- Declare that your app uses the device's ADM feature and declare that your app is designed to remain functional without ADM present on the device (android:required="false") by adding an amazon:enable-feature element to the manifest's application element.  It is safe to set android:required to "false" because Appboy ADM code degrades gracefully when ADM is not present on the device.

  ```xml
  ...
  <application
    android:icon="@drawable/ic_launcher"
    android:label="@string/app_name"
    android:theme="@style/AppTheme">

    <amazon:enable-feature android:name="com.amazon.device.messaging" android:required="false"/>
  ...
  ```
- Add intent filters to handle `REGISTRATION` and `RECEIVE` intents from ADM within your Appboy broadcast receiver's `AndroidManifest.xml` file. Immediately after `amazon:enable-feature`, add the following elements:

  ```xml
  <receiver android:name="com.appboy.AppboyAdmReceiver" android:permission="com.amazon.device.messaging.permission.SEND">
    <intent-filter>
        <action android:name="com.amazon.device.messaging.intent.RECEIVE" />
        <action android:name="com.amazon.device.messaging.intent.REGISTRATION" />
        <category android:name="com.yourapp.packagename" />
    </intent-filter>
  </receiver>
  ```

  #### Implementation Example

  See the [`AndroidManifest.xml`][13] in the Droidboy sample app.

### Step 3: Store Your ADM API Key

  - Save your ADM API key to a file named <tt>api_key.txt</tt> and save it in your project's <tt>assets</tt> folder.
  - For how to obtain an ADM API Key for your app, consult Amazon's documentation on [obtaining an ADM API Key][11].
  - Note: Amazon will not recognize your key if <tt>api_key.txt</tt> contains any white space characters, such as a trailing line break.

### Step 4: Register Push Opens and Receipts

Whenever a push notifications is received, `AppboyAdmReceiver.java` broadcasts a push received intent to mark receipt.  If the notification is subsequently opened by the user, a separate notification opened intent is broadcast to mark the open. Appboy requires you to create a receiver to handle these intents and, on notification opened intents, correctly launch your application.

#### Part 1: Registering the Receiver

Register a broadcast receiver to listen for Appboy push opened and received intents within your [`AndroidManifest.xml`][10].

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

Your Receiver should launch your app's main activity when intents from Appboy are received. Your receiver should inherit from the built-in BroadcastReceiver class and include `onReceive()` and `startYourAppNameWithIntent()` methods. Visit this page for a basic tutorial on creating receivers for an Android app. [Android Receiver Help][26]

For an example receiver, see [`AppboyBroadcastReceiver.java`][14] within the DroidBoy Sample Application.

#### Part 3: [Deprecated] Logging Opens in your Activity

__Note:__ This step is deprecated as of Appboy SDK 1.9.  In Appboy SDK 1.9 or above, logging push opens from your activity is unnecessary as push opens are logged automatically by Appboy. If you are updating to Appboy SDK 1.9, remove all calls to `Appboy.logPushNotificationOpened()` in your code to avoid double logging.

If integrating a version of the Appboy SDK lower than 1.9 (not recommended), log push opens within your activity by calling:

```java
Appboy.getInstance(this).logPushNotificationOpened(campaignId);
```

### Step 5: Add Client Secret and Client ID to Appboy Dashboard

Lastly, you must add the Client Secret and Client ID you obtained in [Step 1][2] to the Appboy dashboard's ["Manage App Group" page][35] as pictured below:

![FireOS Dashboard][34]

### Manual Push Registration
If you need to handle ADM registration yourself, you should do the following:

- Within [Appboy.xml][12] add the following:

  ```xml
  <!-- This will disable automatic registration for ADM via the Appboy SDK-->
  <bool name="com_appboy_push_adm_messaging_registration_enabled">false</bool>
  ```
- Use the [registerAppboyPushMessages()][37] method to pass your user's ADM `registration_id` to Appboy:

  ```java
  Appboy.getInstance(this).registerAppboyPushMessages(registration_id);
  ```

  __Note:__ Appboy does not recommend using manual registration if possible.

### ADM Extras

Users may send custom Key/Value pairs with a Kindle push message as "extras" for ["Deep Linking"][29], tracking urls, etc.  Please note that unlike in Android push, Kindle push users may not use Appboy reserved keys as keys when defining "extra" key-value pairs.

Reserved Keys Include:

- `_ab`
- `a`
- `cid`
- `p`
- `s`
- `t`
- `ttl`
- `uri`

If a Kindle reserved key is detected, Appboy returns Status Code 400: Kindle Push Reserved Key Used.


[2]: #step-1-enable-adm
[8]: http://academy.appboy.com/Best_Practices/#push
[9]: /FireOS/#initial-sdk-setup
[10]: https://developer.amazon.com/public
[11]: https://developer.amazon.com/public/apis/engage/device-messaging/tech-docs/02-obtaining-adm-credentials
[12]: https://developer.amazon.com/public/apis/engage/device-messaging/tech-docs/03-setting-up-adm
[13]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/AndroidManifest.xml "AndroidManifest.xml"
[14]: https://developer.amazon.com/public/apis/engage/device-messaging
[15]: https://developer.amazon.com/public/apis/engage/device-messaging/tech-docs/05-requesting-an-access-token"
[16]: https://developer.amazon.com/public/apis/engage/device-messaging/tech-docs/06-sending-a-message
[17]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/res/values/appboy.xml "Appboy.xml"
[20]: /download/amazon-device-messaging-1.0.1.jar
[28]: /assets/img/android_push_sample.png
[29]: /Advanced_Use_Cases/Deep_Linking_to_In-App_Resources/Android_and_FireOS
[32]: https://developer.amazon.com/appsandservices/apis/engage/device-messaging/tech-docs/04-integrating-your-app-with-adm
[34]: /assets/img/fire_os_dashboard.png
[35]: https://dashboard.appboy.com/app_settings/app_settings/
[37]: https://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/Appboy.html#registerAppboyPushMessages(java.lang.String) "registerAppboyPushMessages()"
