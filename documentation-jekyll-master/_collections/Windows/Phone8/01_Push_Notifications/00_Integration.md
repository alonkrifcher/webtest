---
title: Integration
platform: Windows
subplatform: Phone8
---
## Integration

A push notification is an out-of-app alert that appears on the user's screen when an important update occurs. Push notifications are a valuable way to provide your users with time-sensitive and relevant content or to re-engage them with your app.

Sample push notification:

![Sample Push][13]

Check out [Appboy Academy][12] for additional best practices.

__Time Estimate: 7 Minutes__

### Step 1: Obtain a Push Certificate from Microsoft<a class="margin-fix" name="get-push-cert"></a>

Set up Appboy as an authenticated push sender:
  - [MSFT Instructions for Push Authentication][6].
1. Get a push certificate from a [Windows Root Certificate Authority][6].
2. Ensure that that the key-usage value is set to `client-authentication`.
3. Take note of the CN, or CommonName, property of the certificate.  You will need this for configuration.

### Step 2: Upload your Push Certificate to Appboy<a class="margin-fix" name="upload-push-cert"></a>

On [the app settings page][7] upload the push certificate to Appboy at the bottom of the settings page.

![Windows Phone 8 Dashboard][8]

### Step 3: Configuring AppboyConfiguration.xml<a class="margin-fix" name="appboyconfiguration-xml"></a>

Add `PushChannelName` and `PushServiceName` values to your `AppboyConfiguration.xml`

```xml
<PushChannelName>YOUR_PUSH_CHANNEL_NAME</PushChannelName>
<PushServiceName>THE_CN_NAME_OF_YOUR_AUTHENTICATED_SENDER_CERT</PushServiceName>
```

For an example, see the [`AppboyConfiguration.xml` file in our Windows Sample Application][9].

### Step 4: Opting Users Into Push<a class="margin-fix" name="opting-in"></a>

Users must be explicitly asked to opt-in to push messages in Windows Phone 8.  Once you have done this, set `Appboy.SharedInstance.PushManager.ToastOptInStatus`.

### Step 5: Creating Push Event Handlers<a class="margin-fix" name="push-handlers"></a>

Add the following using to the top of your App.xaml.cs:

```csharp
using AppboyPlatform.PCL.Managers;
using AppboyPlatform.Phone.Managers.PushArgs;
```

To listen to events that are fired when the push is received and activated (clicked by user), create event handlers and add them to the PushManager events:
 - `Appboy.SharedInstance.PushManager.RawPushReceivedEvent += YourRawPushReceivedEventHandler;`
 - `Appboy.SharedInstance.PushManager.ToastPushReceivedEvent += YourToastPushReceivedEventHandler;`

Your event handlers should have the signatures:
 - `void YourOnRawPushReceived(object sender, RawPushReceivedEventArgs args);`
 - `void OnToastPushReceived(object sender, ToastPushReceivedEventArgs args);`

__Note__: Only add these event handlers once per app execution.
__Note__: The receipt of a push does not guarantee it was shown.  Push is not shown if the user is in an app.

Appboy tracks push open events by inspecting navigation event arguments. You must add the following line of code to the `InitializePhoneApplication` method:
 - `RootFrame.Navigated += Appboy.SharedInstance.PushManager.NavigationEvent;`

__Note__: We've added `{tracking_id}_ab_pn_cid` to the launch string from push activations.

### Step 6: Enabling "Capabilities" in WMAppManifest.xml<a class="margin-fix" name="wmappmanifest"></a>
Within the `properties/WMAppManifest.xml` capabilities tab, ensure that `ID_CAP_PUSH_NOTIFICATION` is checked.

##### Implementation Example<a class="margin-fix" name="example"></a>

See the [`App.xaml.cs` file in our Windows Sample Application][10].

[1]: #get-push-cert
[2]: #upload-push-cert
[3]: #appboyconfiguration.xml
[4]: #push-handlers
[5]: #example
[6]: http://msdn.microsoft.com/en-us/library/windowsphone/develop/ff941099
[7]: https://dashboard.appboy.com/app_settings/app_settings
[8]: /assets/img/windows_phone_push_cert.png "Windows Phone 8.0 Dashboard"
[9]: https://github.com/Appboy/appboy-windows-samples/blob/master/Phone/AppboyConfiguration.xml
[10]: https://github.com/Appboy/appboy-windows-samples/blob/master/Phone/App.xaml.cs
[11]: /assets/img/push_notification_example.png
[12]: https://academy.appboy.com/Best_Practices/Push "Push Notifications: Best Practices"
[13]: /assets/img/windows_push_sample.png
[14]: #opting-in
[15]: #wmappmanifest
