---
title: Sample Apps
platform: Android and FireOS
---
# Sample Apps

Appboy's SDKs each come with a sample application within the repository for your convenience. Each of these apps is fully buildable so you can test Appboy features alongside implementing them within your own applications. Testing behavior within your own application versus expected behavior and codepaths within the sample applications is an excellent way to debug any problems you may run into.

## Building the Droidboy Test Application
Appboy's test application within the [Android SDK github repository][3] is called Droidboy. Follow the instructions below to build a fully functional copy of it alongside your project.

- Create a new ["App Group"][25] and note the Appboy API key.
- Copy your GCM Project Number and Appboy API key into the appropriate places within `/Droidboy/res/values/Appboy.xml` (in between the tags for the strings named "com_appboy_push_gcm_sender_id" and "com_appboy_api_key", respectively).
- Copy your GCM API Key into your ["App Settings"][5] page.
- To assemble the Droidboy APK run the following command within the SDK directory:

  ```
  ./gradlew assemble
  ```
  __Note:__ Use `gradlew.bat` on Windows

- To automatically install the Droidboy APK on a test device run the following command within the SDK directory:

  ```
  ./gradlew installDebug
  ```

__Note:__ If you don't have your `ANDROID_HOME` variable properly set or don't have a `local.properties` folder with a valid `sdk.dir` folder, this plugin will also install the base SDK for you. See the [plugin repo][27] for more information.

For more information on the Android SDK build system see the [Github Repository readme][26].

[25]: /Android/#app-group-configuration
[26]: https://github.com/Appboy/appboy-android-sdk/blob/master/README.md
[27]: https://github.com/JakeWharton/sdk-manager-plugin
[5]: https://dashboard.appboy.com/app_settings/app_settings/ "App Settings"
[3]: https://github.com/appboy/appboy-android-sdk "Appboy Android Github Repository"
