---
title: Initial SDK Setup
platform: Android
---
# Initial SDK Setup

Installing the Appboy SDK will provide you with basic analytics functionality as well as a working in-app slideup message with which you can engage your users.

__Time Estimate: 10-15 Minutes__

## Android SDK Integration

### Step 1: Integrate the Appboy Library
The Appboy Android SDK can optionally be integrated without UI components. However, In-App Messaging, the News Feed, and Feedback will be rendered inoperable unless you pass the custom data to a UI solely of your design. Please note that these UI elements are open source and [fully customizable][1]. We strongly recommend integration of these features. Please refer to the [Appboy Academy][2] for the benefits of using the Appboy News Feed, In-App Message, and Feedback UI.

#### Basic Integration
In order to access Appboy's messaging features, you must integrate the UI library. Please see the following directions to integrate the UI library depending on your IDE:

#### Using Eclipse:

##### Step 1: In your command line, clone the [Appboy Android Github Repository][3]

```bash
$ git clone git@github.com:Appboy/appboy-android-sdk.git
```

##### Step 2: Import the Appboy project into your local workspace
In Eclipse:

  - Navigate to File > Import

    ![File Import][16]
  - Select Android > Existing Android Code into Workspace

    ![Android Import][17]
  - Click "Browse"

    ![Browse][18]
  - Check the Appboy UI project folder as well as "copy project into workspace" and click "Finish"

    ![Select Android UI Project][19]
##### Step 3: Reference Appboy in your own project

In Eclipse:

  - Right click your project and select "Properties"

    ![Click Properties][22]
  - Click "Project References" and select the Appboy UI Library

    ![Project References][21]

##### Step 4: Set Build Targets
In Eclipse:

  - Right click your project and select "Properties"

    ![Click Properties][22]
  - Ensure that you're targeting the latest version of Android available (API Level 19 as of May 1, 2014)

    ![Build Targets][23]

#### Using Android Studio

##### Step 1: In your top-level project `build.gradle` put `maven { url "http://appboy.github.io/appboy-android-sdk/sdk" }` as a repository under `allprojects` -> `repositories`.
![MavenScreen1][31]

Note: Alternatively, you may install the `android-sdk-ui` as an AAR file to your local maven repository. See the [SDK Readme][37] for details.

##### Step 2: In your project submodule `build.gradle`, put `compile 'com.appboy:android-sdk-ui:1.8.'` as a dependency.

![MavenScreen2][32]

__Note:__ Be sure to use the highest Appboy SDK version available here.

##### Step 3: Perform Gradle Sync

Be sure to perform a Gradle Sync to build your project and incorporate the dependency additions noted above.

![GradleSync][38]

### Step 2: Configure the Appboy SDK in appboy.xml
Now that the libraries have been integrated, you have to create an `appboy.xml` file in your project's `res/values` folder. The contents of that file should resemble the following code snippet:

__Note__: Be sure to substitute the API key found within the [App Settings][5] page of the Appboy dashboard for `REPLACE_WITH_YOUR_API_KEY`.

```java
    <?xml version="1.0" encoding="utf-8"?>
    <resources>
    <string name="com_appboy_api_key">REPLACE_WITH_YOUR_API_KEY</string>
    </resources>
```

### Step 3: Add Required Permissions to Android Manifest
Now that you've added your API key, you need to add the following permissions to your `androidmanifest.xml` file:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

#### Implementation Example
See the [`appboy.xml` file][6] in the Droidboy sample app for an implementation example.

### Step 4: Tracking User Sessions in Android
To enable tracking of user sessions and the gathering of basic user data, add the following calls to the `onStart()` and `onStop()` lifecycle methods of __every__ [Activity][7] class in your app:

```java
public void onStart() {
    super.onStart();
    Appboy.getInstance(YOUR_ACTIVITY.this).openSession(YOUR_ACTIVITY.this);
}
```

```java
public void onStop() {
    super.onStop();
    Appboy.getInstance(YOUR_ACTIVITY.this).closeSession(YOUR_ACTIVITY.this);
}
```

##### Notes:

1. You must put these method calls in every Activity in your app. You can choose to add these method calls to a base Activity class from which all your other Activity classes inherit (if applicable). Failure to call these methods will cause inaccurate session data.
2. Ensure that these methods are not called anywhere except the `onStart()` and `onStop()` lifecycle methods of an activity. Calling these methods within fragments, or UI elements will cause inaccurate session data.
3. When using Eclipse, it may also be necessary to add the Appboy UI library to the project's build path. This can be done by right-clicking the project then selecting 'Configure Build Path.' From there, clicking on the bar at the top of the screen labeled 'Projects' will lead to a menu with an 'Add' option on the right. Click this button, check the android-sdk-ui folder, and press 'Okay' to finish.

### Step 5: Building the Droidboy Test Application (Optional)
Appboy includes a test application within the [Android SDK github repository][3] which can be built easily to test the behavior of Appboy within your application vs. expected behavior.

1. Create a new ["App Group"][25] and note the API key.
2. Copy your [GCM sender ID (project number)][36] and Appboy API Key into the appropriate places within `/Droidboy/res/values/Appboy.xml`.
3. Copy your [GCM API Key][35] ["App Settings"][5] page.
4. To assemble the Droidboy APK run the following command within the SDK directory:
  ```
  ./gradlew assemble
  ```

__Note:__ Use `gradlew.bat` on Windows

5. To automatically install the Droidboy APK on a test device run the following command within the SDK directory:
  ```
  ./gradlew installDebug
  ```

__Note:__ If you don't have your `ANDROID_HOME` variable properly set or don't have a `local.properties` folder with a valid `sdk.dir` folder, this plugin will also install the base SDK for you. See the [plugin repo][27] for more information.

__Note:__ Droidboy is completely independent of your project and will not change how the Appboy SDK affects your app.

For more information on the Android SDK build system see the [Github Repository readme][26].

### Step 6: Building the Hello Appboy Test Application (Optional)
The Hello Appboy test application shows a minimal use case of the Appboy SDK, and additionally shows how to easily integrate the Appboy SDK into a gradle project.

1. Copy your API key from your ["App Settings"][5] page into the `appboy.xml` file within the `res/values` folder.
![HelloAppboy][34]

2. To install the sample app to a device or emulator, run the following command within the SDK directory:
  ```
  ./gradlew installDebug
  ```

#### Implementation Example & Class Documentation
See the [`DroidGirlActivity.java` file][8] in the Droidboy sample app for an implementation example.
Full class information can be found in the [javadocs][9].

## SDK Integration Complete
Appboy should now be collecting data from your application and your basic integration should be complete. Please see the following sections in order to enable custom event tracking, push messaging, the news-feed and the complete suite of Appboy features.

### Configuring Proguard
Appboy uses Proguard to obfuscate its private libraries. If you use Proguard to obfuscate your app, you will need to make sure Appboy classes don't get reobfuscated. Otherwise, it will not be possible for Appboy to interpret stack traces that come from your app.

To do this, add the following options to your proguard configuration file:

```
-dontwarn com.amazon.device.messaging.**
-dontwarn bo.app.**
-dontwarn com.appboy.ui.**
-keep class bo.app.** { *; }
-keep class com.appboy.** { *; }
```

If you are integrating Baidu Cloud Push with Appboy, add:

```
-dontwarn com.baidu.**
-keep class com.baidu.** { *; }
```

If using Fresco, add the latest proguard rules from the [Fresco Library Documentation][41].

Lastly, for [Google Play Services][42], add:

```
-dontwarn com.google.android.gms.**
```

### App Indexing
If you have Google App Indexing enabled for your application, Google will use emulators (i.e. Google app crawlers) to crawl your application and index it for search results.  While your application should
behave normally in this scenario (otherwise it is violating the Google Search Guidelines), allowing Appboy to function normally during indexing crawls will generate a large amount
of useless data points.  To avoid this, follow the directions at https://developers.google.com/app-indexing/android/referrer  to detect Google app crawlers, and call
```Appboy.disableAllAppboyNetworkRequests()``` before any other Appboy method to not report data for that bot on that emulator.

### Error Logging

Note: If the Appboy API Key from the ["App Settings"][5] page is not present in `appboy.xml` then an error message is logged to the Android logcat.

Note: If required permissions `ACCESS_NETWORK_STATE` and `INTERNET` are not declared in the manifest, an error message is logged to the Android logcat.

[1]: /Enabling_Message_Channels/The_News_Feed/Android_and_FireOS#news-feed-customization
[2]: https://www.appboy.com/academy "Appboy"
[3]: https://github.com/appboy/appboy-android-sdk "Appboy Android Github Repository"
[4]: https://raw.github.com/appboy/appboy-android-sdk/master/android-sdk-ui/libs/appboy.jar
[5]: https://dashboard.appboy.com/app_settings/app_settings/ "App Settings"
[6]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/res/values/appboy.xml
[7]: http://developer.android.com/reference/android/app/Activity.html
[8]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/DroidGirlActivity.java
[9]: http://appboy.github.io/appboy-android-sdk/javadocs/index.html "Javadocs"
[16]: /assets/img/file_import.png
[17]: /assets/img/android_import.png
[18]: /assets/img/click_browse.png
[19]: /assets/img/select_project_android.png
[20]: /assets/img/import_android_ui.png
[21]: /assets/img/reference_project.png
[22]: /assets/img/click_properties.png
[23]: /assets/img/NewBuildPath.png
[25]: /App_Group_Configuration
[26]: https://github.com/Appboy/appboy-android-sdk/blob/master/README.md
[27]: https://github.com/JakeWharton/sdk-manager-plugin
[31]: /assets/img/androidstudio1.png
[32]: /assets/img/androidstudio2.png
[34]: /assets/img/hello_appboy.png
[35]: https://documentation.appboy.com/Enabling_Message_Channels/Push_Notifications/Android#gp-api-key
[36]: https://developers.google.com/console/help/#projectnumber
[37]: https://github.com/Appboy/appboy-android-sdk/blob/master/README.md
[38]: /assets/img/androidstudio3.png
[41]: http://frescolib.org/docs/proguard.html
[42]: https://developers.google.com/android/guides/setup
