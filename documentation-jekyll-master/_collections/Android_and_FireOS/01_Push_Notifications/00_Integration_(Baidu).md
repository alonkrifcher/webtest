---
title: Baidu Integration
platform: Android and FireOS
android_or_fireos: Android
---
### Baidu Integration

Appboy is capable of sending push notifications to Android devices using [Baidu Cloud Push][14].  Our Baidu push sample app, `China Push Sample`, provides a full implementation example.

__Time Estimate: 60 Minutes__

#### Step 1: Create a Baidu Account

1. Visit the [Baidu Portal][7].  You will see a homepage similar to the following.  Click 登录 (Log In) among the menu options on the top right to bring up a dialog that will allow you to log in or create a new account.
  ![Baidu Portal][33]

2. To create a new account, in the log-in dialog, click 立即注册 (New Account) directly to the bottom right of the large blue 登录 (Log In) button.
  ![Baidu Login Dialog][38]

3. Enter an email address, password, and captcha in the account creation page.  Accept the license agreement and click 注册 (Create Account) to register.
  ![Baidu Sign-up Page][17]

4. You will recieve an email from Baidu.  Follow the verification link.  Make sure to follow the verification link within 48 hours.
  ![Baidu Verification Email][34]

5. On the following page, you will complete an SMS verification.  Choose your country code (美国 in the example image denotes the United States).  Enter your phone number and click 发送验证短信 (Send SMS).  You should receive a text message containing a six-digit number, which you will enter in the 验证码 (Verification Code).  Make sure to enter your verification code within 30 minutes.  Click 提交 (Submit) to submit.  Congratulations!  You now have a Baidu account.
  ![Baidu Verification SMS][35]

#### Step 2: Register as a Baidu Developer

1. Visit the [Baidu Developer Portal][36].  Open the dropdown menu in the top right of the screen.  Choose 注册开发者 (Create New Developer Account) to begin registration.
  ![Baidu Developer Portal][37]

2. On the registration page, choose your account type (个人 for personal, 公司 for business) and developer type (Developer is preselected and correct for most cases).  Enter your name, a bio, and phone number with country code in parenthesis (For example, (1)xxxxxxxxxx). Click 发送验证码 (Send Verification Code) and enter the verification code in the following line.  The next two fields, developer website and developer logo, are optional.  Accept the license agreement and click 提交 (Submit) to submit.  Congratulations!  You now have a Baidu developer account.
  ![Baidu Developer Registration][13]

#### Step 3: Register your Application with Baidu

1. Visit the [Baidu Project Portal][11]. Click 创建工程 (Create Project).
  ![Baidu Project Portal][10]

2. On the following page, enter your application name.  The following two checkboxes are to activate additional Baidu services.  In most cases, these should be left blank.
  ![Baidu App Name][26]

3. Upon setting up your application, you will be taken to a console which displays information about your app, including the API Key.  Click on the cloud push link in the menu on the left hand side of the console.  On the following page, click 推送设置 (Set Up Push).
  ![Baidu App Console][14]
  ![Baidu Continue][29]

4. On the following page, enter your app package name (e.g. com.appboy.sample) and specify whether to cache messages, and if so, how long.  This indicates to Baidu how long to continue to attempt to send messages to offline users. Click 保存设置 (Save Settings) to save.
  ![Baidu Configure Cloud][39]

#### Step 4: Add Baidu to your Application

- Visit the [Baidu Push SDK Portal][40] and download the latest Android SDK.
  ![Baidu SDK Portal][41]

- Inside the SDK, you will find the push service jar and platform specific native libraries.  Integrate these into your project.  There is also a Baidu demo push application which can be used as a reference along with our [sample Baidu push application][50].  Make sure your app targets the highest SDK version currently supported by Baidu.

- Add the following required Baidu permissions to your application's `AndroidManifest.xml`.  See our [sample app's AndroidManifest.xml][49] for a sample implementation.

  ```xml
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    <uses-permission android:name="android.permission.WRITE_SETTINGS" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.DISABLE_KEYGUARD" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  ```
- Baidu's library contains broadcast receivers which handle incoming push messages.  Declare the internal Baidu receivers in your application's `AndroidManifest.xml` inside the `<application>` element.

  ```xml
  <!-- 用于接收系统消息以保证 PushService 正常运行 -->
      <receiver
        android:name="com.baidu.android.pushservice.PushServiceReceiver"
        android:process=":bdservice_v1">
        <intent-filter>
          <action android:name="android.intent.action.BOOT_COMPLETED"/>
          <action android:name="android.net.conn.CONNECTIVITY_CHANGE"/>
          <action android:name="com.baidu.android.pushservice.action.notification.SHOW"/>
          <action android:name="com.baidu.android.pushservice.action.media.CLICK"/>
        </intent-filter>
      </receiver>
      <!-- Push 服务接收客户端发送的各种请求-->
      <!-- 注意:RegistrationReceiver 在 2.1.1 及之前版本有拼写失误,为 RegistratonReceiver ,用 新版本 SDK 时请更改为如下代码-->
      <receiver
        android:name="com.baidu.android.pushservice.RegistrationReceiver"
        android:process=":bdservice_v1">
        <intent-filter>
          <action android:name="com.baidu.android.pushservice.action.METHOD"/>
          <action android:name="com.baidu.android.pushservice.action.BIND_SYNC"/>
        </intent-filter>
        <intent-filter>
          <action android:name="android.intent.action.PACKAGE_REMOVED"/>
          <data android:scheme="package"/>
        </intent-filter>
      </receiver>
      <!-- Push 服务 -->
      <!-- 注意:在 4.0 (包含)之后的版本需加上如下所示的 intent-filter action -->
      <service
        android:name="com.baidu.android.pushservice.PushService"
        android:exported="true"
        android:process=":bdservice_v1">
        <intent-filter >
          <action android:name="com.baidu.android.pushservice.action.PUSH_SERVICE"/>
        </intent-filter>
      </service>
  ```

- You will also need to create a broadcast receiver which listens for incoming push messages and notifications.  Declare your own receiver in your application's `AndroidManifest.xml`, inside the `<application>` element.  This receiver will need to extend `FrontiaPushMessageReceiver` and implement methods that receive event updates from the Baidu push service.  See our [sample app's receiver][48] for a sample implementation.

  ```xml
      <receiver android:name=".MyPushMessageReceiver">
        <intent-filter>
          <action android:name="com.baidu.android.pushservice.action.MESSAGE"/>
          <action android:name="com.baidu.android.pushservice.action.RECEIVE"/>
          <action android:name="com.baidu.android.pushservice.action.notification.CLICK"/>
        </intent-filter>
      </receiver>
  ```

- In your application's `onCreate()` method, add the following line, which will register your application with Baidu and begin listening for incoming push messages.  Make sure to replace "Your-API-Key" with your project's Baidu API Key.

  ```
  PushManager.startWork(getApplicationContext(), PushConstants.LOGIN_TYPE_API_KEY, "Your-API-Key");
  ```

- For push to function, your app will need to extend FrontiaApplication.  This can be accomplished by creating an [Application][45] class for your application which extends FrontiaApplication.  You will also need to point your `AndroidManifest.xml`'s `<application>` element to this class.

  ```
  public class MyApplication extends FrontiaApplication {}
  ```

  ```xml
    <application android:name = ".MyApplication">
      ...
    </application>
  ```

- Finally, you will need to register your users with Appboy.  In the `onBind()` method of the Baidu broadcast receiver that you created in part 5, send the `userId` to Appboy using `Appboy.registerAppboyPushMessages(userId)`.  See our [sample app's main activity][47] for a sample implementation.

  ```java
  Appboy.getInstance(context).registerAppboyPushMessages(userId);
  ```

#### Step 5: Registering Push Opens

- Baidu supports sending extra key value pairs with push messages in JSON format. Your broadcast receiver's `public void onNotificationClicked(Context context, String title, String description, String customContentString)` method will be called whenever a user clicks an incoming push message.  The parameter `customContentString` contains the extras in JSON format.  All messages from Appboy will contain the following two key value pairs:

  ```json
  {
    "source": "Appboy",
    "cid": "your-campaign-Id"
  }
  ```
- Whenever `onNotificationClicked` is called your Baidu receiver, your receiver should send an [Intent][44] to your application containing `customContentString`.  Your application will log the click to Appboy using the `customContentString`.  See our [sample app's main activity][47] for a sample implementation.

- The following sample code passes `customContentString` to Appboy and logs a click.

  ```java
  String customContentString = intent.getStringExtra(ChinaPushMessageReceiver.NOTIFICATION_CLICKED_KEY);
  AppboyNotificationUtils.logBaiduNotificationClick(mApplicationContext, customContentString);
  ```

#### Step 6: Extras

- Aside from reserved keys used by Appboy, the parameter `customContentString` will also contain all user defined custom key value pairs.  To extract your key value pairs, wrap `customContentString` in a JSONObject and retrieve your extras.

  ```java
  try {
      JSONObject myExtras = new JSONObject(customContentString);
      String myValue = myExtras.optString("my_key", null);
    } catch (Exception e) {
      Log.e(TAG, String.format("Caught an exception processing customContentString: %s", customContentString), e);
    }
  ```

#### Step 7: Set Up Baidu Keys

You need to input your Baidu API Key and Baidu Secret Key into the Appboy dashboard.  Both keys are available from the [Baidu application console][52].

On [the app settings page][18] (where your API keys are located), select your Android China app. Enter your Baidu API Key and Baidu Secret Key in their respective fields in the Push Notifications section.

![APIKey][19]

#### Resources

- [Baidu Portal][7]
- [Baidu Developer Portal][36]
- [Baidu Project Portal][11]
- [Baidu Push SDK Portal][40]
- [Baidu Integration Docs][43]

[7]: https://www.baidu.com/
[8]: http://academy.appboy.com/Best_Practices/Push
[9]: /SDK_Integration/Android_and_FireOS
[10]: /assets/img/baidu_project.png
[11]: http://developer.baidu.com/console#app/project
[12]: https://developer.amazon.com/public/apis/engage/device-messaging/tech-docs/03-setting-up-adm
[13]: /assets/img/baidu_dev_reg.png
[14]: /assets/img/baidu_app_console.png
[15]: https://developer.amazon.com/public/apis/engage/device-messaging/tech-docs/05-requesting-an-access-token"
[16]: https://developer.amazon.com/public/apis/engage/device-messaging/tech-docs/06-sending-a-message
[17]: /assets/img/baidu_signup.png
[18]: https://dashboard.appboy.com/app_settings/app_settings "App Settings Page"
[19]: /assets/img/baidu_api_key.png "APIKey"
[26]: /assets/img/baidu_app_name.png
[28]: /assets/img/Gallery_Push_Baidu.png
[29]: /assets/img/baidu_continue.png
[33]: /assets/img/baidu_portal.png
[34]: /assets/img/baidu_email.png
[35]: /assets/img/baidu_text.png
[36]: http://developer.baidu.com/
[37]: /assets/img/baidu_dev_portal.png
[38]: /assets/img/baidu_login_dialog.png
[39]: /assets/img/baidu_configure_cloud.png
[40]: http://developer.baidu.com/wiki/index.php?title=docs/cplat/push/sdk/clientsdk
[41]: /assets/img/baidu_sdk.png
[43]: http://developer.baidu.com/wiki/index.php?title=docs/frontia/guide-android/overview
[44]: http://developer.android.com/reference/android/content/Intent.html
[45]: http://developer.android.com/reference/android/app/Application.html
[47]: https://github.com/Appboy/appboy-android-sdk/blob/master/china-push-sample/src/main/java/com/appboy/chinapush/ChinaPushActivity.java
[48]: https://github.com/Appboy/appboy-android-sdk/blob/master/china-push-sample/src/main/java/com/appboy/chinapush/ChinaPushMessageReceiver.java
[49]: https://github.com/Appboy/appboy-android-sdk/blob/master/china-push-sample/src/main/AndroidManifest.xml
[50]: https://github.com/Appboy/appboy-android-sdk/tree/master/china-push-sample
