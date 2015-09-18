---
title: Push Notifications
platform: Unity
subplatform: iOS
---
# Push Notifications

A push notification is an out-of-app alert that appears on the user's screen when an important update occurs. Push notifications are a valuable way to provide your users with time-sensitive and relevant content or to re-engage them with your app.

Sample push notification:

![Sample Push][19]

Check out [Appboy Academy](https://academy.appboy.com/Best_Practices/Push) for additional best practices.

__Time Estimate: 7 Minutes__

## Step 1: Configure the Apple Developer Settings

1. Navigate to the [iOS Provisioning Portal][9]

2. Select Identifiers > App IDs in the left sidebar

  ![iOSPush3][10]
3. Select your application

4. If push notifications are not enabled, click Edit to update the app settings

  ![AppleProvisioningOptions][11]
5. Tick the Enable check box and click Create Certificate under the Production SSL Certificate

  ![iOSPush3][12]
6. Follow the instructions from the SSL certificate assistant --you should now see a green status to indicate that push is enabled.
__Note__: You must update your provisioning profile for the app after you create your SSL certificates. A simple "Refresh" in the organizer will accomplish this.


## Step 2: Export Your Push Certificate

1. Download the production push certificate that you just created and open it with the Keychain Access application
2. In Keychain Access, click on My Certificates and locate your push certificate private key
3. Export it as a `.p12` file and use a temporary, unsecure password (you will need this password when uploading your certificate to Appboy)
4. Navigate to the [app settings page][13] in the dashboard and upload your production certificate.
 ![push upload example][14]
__Note__: You can upload either your development or production push certificates to the dashboard for your distribution provisioning profile apps, but you can only have one active at a time. As such, if you wish to do repeated testing of push notifications once your app goes live in the App Store, we recommend setting up a separate App Group or App for the development version of your app.


## Step 3: Update Application Code

- Add the code below to your `application:didRegisterForRemoteNotificationsWithDeviceToken` method

  ```objc
  [[Appboy sharedInstance] registerPushToken:
                 [NSString stringWithFormat:@"%@", deviceToken]];
  ```
- Call the registerForRemoteNotificationTypes: in your `application:didFinishLaunchingWithOptions`: method

  ```objc
    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:
              (UIRemoteNotificationTypeAlert |
               UIRemoteNotificationTypeBadge |
               UIRemoteNotificationTypeSound)];
    [[AppboyUnityManager sharedInstance] addPushReceivedListenerWithObjectName:@"Your Unity Game Object Name" callbackMethodName:@"Your Unity Call Back Method Name"];
    [[AppboyUnityManager sharedInstance] addPushOpenedListenerWithObjectName:@"Your Unity Game Object Name" callbackMethodName:@"Your Unity Call Back Method Name"];
  ```
- In your app delegate, add the code below to your `application:didReceiveRemoteNotification` method:

### Method to Count Opens while Foregrounded

Appboy will use this code to determine if a push notification was opened. If the app is foregrounded and a push notification comes in, Appboy will still count the open.

```objc
[[AppboyUnityManager sharedInstance] registerApplication:application
                didReceiveRemoteNotification:userInfo];
```

### Alternate Method to Disgregard Opens while Foregrounded

If you don't want to count opens for pushes that come in while the app is foregrounded use the following method instead:

```objc
UIApplicationState state = [application applicationState];
if (state != UIApplicationStateActive) {
 [[AppboyUnityManager sharedInstance] registerApplication:application
                 didReceiveRemoteNotification:userInfo];
}
```

## Step 4: Verify Code Modifications

Verify the code modifications you made against this [sample AppController.mm][15] file.

## Push Customization

### iOS Badge Counts

__Note__: If badge counts are enabled, Appboy will only clear the badge count when the app is opened directly from an Appboy push notification. This is to avoid interfering with any other badges stemming from other notifications within the app.

### Manually Clearing the Badge Count

```objc
[UIApplication sharedApplication].applicationIconBadgeNumber = 0;
```

### Sample Appboy Apple Push Payload

When Appboy sends a push notification, the payload will look like this. You should avoid handling a top-level dictionary called "ab" in your application:

```objc
// Example push payload
{
  aps: {
    alert: "your push message",
    badge: 1,
    ...
  }
  custom_key: "foo",
  ab: {
    ... Appboy Reserved Properties ...
  }
}
```

## Custom Sounds and Push

### Step 1: Hosting the Sound in the App

Custom push notification sounds must be hosted locally within the main bundle of the client application. The following audio data formats are accepted:

- Linear PCM
- MA4
- µLaw
- aLaw

You can package the audio data in an aiff, wav, or caf file. Then, in Xcode, add the sound file to your project as a nonlocalized resource of the application bundle.

You may use the afconvert tool to convert sounds. For example, to convert the 16-bit linear PCM system sound Submarine.aiff to IMA4 audio in a CAF file, use the following command in the Terminal application:

```bash
afconvert /System/Library/Sounds/Submarine.aiff ~/Desktop/sub.caf -d ima4 -f caff -v
```

You can inspect a sound to determine its data format by opening it in QuickTime Player and choosing Show Movie Inspector from the Movie menu.

Custom sounds must be under 30 seconds when played. If a custom sound is over that limit, the default system sound is played instead.

### Step 2: Providing the Dashboard with a Protocol URL for the Sound

Your sound must be hosted locally within the app. You must specify a Protocol URL which directs to the location of the sound file in the app within the "Sound" field pictured below:

![Push Notification Sound][16]

For additional information see the Apple Developer Documentation regarding ["Preparing Custom Alert Sounds"][17] as well as our resources regarding the use of ["Protocol URLs."][18]

## Deep Linking to In-App Resources

See our documentation on ["Deep Linking" to In-App Resources: iOS][18]


[9]: https://developer.apple.com/ios/manage/overview/index.action "iOS Provisioning Portal"
[10]: /assets/img/ios_provisioning.png "pushNotification2.png"
[11]: /assets/img/AppleProvisioningOptions.png "AppleProvisioningOptions.png"
[12]: /assets/img/push_cert_gen.png "pushNotification3.png"
[13]: https://dashboard.appboy.com/app_settings/app_settings
[14]: /assets/img/push_cert_upload.png "push upload example image"
[15]: https://github.com/Appboy/appboy-unity-sdk/blob/master/unity-samples/iOS/Roll-A-Ball-Ios/Classes/UnityAppController.mm "sample AppController.mm"
[16]: /assets/img/sound_push_ios.png
[17]: https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/IPhoneOSClientImp.html#//apple_ref/doc/uid/TP40008194-CH103-SW6
[18]: /Advanced_Use_Cases/Deep_Linking_to_In-App_Resources/iOS "Protocol URLs"
[19]: /assets/img/ios_push_sample.png
