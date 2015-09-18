---
title: Integration
platform: iOS
---
## Integration

A push notification is an out-of-app alert that appears on the user's screen when an important update occurs. Push notifications are a valuable way to provide your users with time-sensitive and relevant content or to re-engage them with your app.

Sample push notification:

![Sample Push iOS][17]

For more information and best practices on push, visit our [Appboy Academy][0] page.

__Time Estimate: 7 Minutes__

### Step 1: Configure the Apple Developer Settings

1. Navigate to the [iOS Provisioning Portal][1]
2. Select Identifiers > App IDs in the left sidebar

 ![iOSPush3][2]

3. Select your application
4. If push notifications are not enabled, click Edit to update the app settings
  ![AppleProvisioningOptions][3]
5. Tick the Enable check box and click Create Certificate under the Production SSL Certificate
  ![iOSPush3][4]
6. Follow the instructions from the SSL certificate assistant. You should now see a green status to indicate that push is enabled.
__Note__: You must update your provisioning profile for the app after you create your SSL certificates. A simple "Refresh" in the organizer will accomplish this.

### Step 2: Export Your Push Certificate

1. Download the production push certificate that you just created and open it with the Keychain Access application
2. In Keychain Access, click on My Certificates and locate your push certificate private key
3. Export it as a `.p12` file and use a temporary, unsecure password (you will need this password when uploading your certificate to Appboy)
4. Navigate to the [app settings page][5] in the dashboard and upload your production certificate.

 ![push upload example][6]

__Note__: You can upload either your development or production push certificates to the dashboard for your distribution provisioning profile apps, but you can only have one active at a time. As such, if you wish to do repeated testing of push notifications once your app goes live in the App Store, we recommend setting up a separate App Group or App for the development version of your app.

### Step 3: Update Application Code

#### Step 1

The appropriate code sample below must be included within`application:didFinishLaunchingWithOptions` method for your users' device to register with APNS:

__Note: If you've implemented a custom push prompt as described in our [push best practices][0], make sure that you're calling the following code EVERY time the app runs after they grant push permissions to your app. Apps need to reregister with APNs as [device tokens can change arbitrarily][19].__

When building against iOS 8+ in XCode 6 use the following code:

**Objective-C**

```objc
  if (floor(NSFoundationVersionNumber) <= NSFoundationVersionNumber_iOS_7_1) {
    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:
     (UIRemoteNotificationTypeAlert |
      UIRemoteNotificationTypeBadge |
      UIRemoteNotificationTypeSound)];
  } else {
     UIUserNotificationSettings \*settings = [UIUserNotificationSettings settingsForTypes:(UIUserNotificationTypeBadge|UIUserNotificationTypeAlert | UIUserNotificationTypeSound) categories:nil];
     [[UIApplication sharedApplication] registerForRemoteNotifications];
     [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
    }
```

**Swift**

```swift
let types : UIUserNotificationType = UIUserNotificationType.Badge | UIUserNotificationType.Sound | UIUserNotificationType.Alert
var setting : UIUserNotificationSettings = UIUserNotificationSettings(forTypes: types, categories: nil)
UIApplication.sharedApplication().registerUserNotificationSettings(setting)
UIApplication.sharedApplication().registerForRemoteNotifications()
```

When building against iOS 7.x or lower in Xcode 5.x use the following code:

```objc
[[UIApplication sharedApplication] registerForRemoteNotificationTypes:
      (UIRemoteNotificationTypeAlert |
       UIRemoteNotificationTypeBadge |
       UIRemoteNotificationTypeSound)];
```

#### Step 2

Once APNS registration is complete, the following method must be altered to pass the resulting `deviceToken` to Appboy so the user becomes enabled for push notifications:

**Objective-C**

If your app is written in Objective-C you should add the following code to your `application:didRegisterForRemoteNotificationsWithDeviceToken` method:

```objc
[[Appboy sharedInstance] registerPushToken:
               [NSString stringWithFormat:@"%@", deviceToken]];
```

**Swift**

If your app is written in Swift you should add the following code to `application(application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: NSData)`

```swift
var deviceTokenString = String(format: "%@", deviceToken)
Appboy.sharedInstance().registerPushToken(deviceTokenString)
```

__Note:__ The `application:didRegisterForRemoteNotificationsWithDeviceToken` is called every time the app is launched from a ["Suspended" or "Not Running" state][11]. If you are migrating to Appboy from another push service and your user's device has already registered with APNS, this method will collect tokens from existing registrations the next time the method is called.

#### Step 3

In your app delegate, add the code below to your  `- (void) application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler` or `func application(application: UIApplication, didReceiveRemoteNotification userInfo: [NSObject : AnyObject], fetchCompletionHandler completionHandler: (UIBackgroundFetchResult) -> Void)` to enable open tracking on push notifications:

**Objective-C**

```objc
[[Appboy sharedInstance] registerApplication:application didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
```

**Swift**

```swift
Appboy.sharedInstance().registerApplication(application, didReceiveRemoteNotification: userInfo, fetchCompletionHandler: completionHandler)
```

__Note:__ If you are unable to use the methods above you may also call the following, although it is [not recommended][18] by Apple:

```objc
[[Appboy sharedInstance] registerApplication:application didReceiveRemoteNotification:userInfo];`.
```

__Note:__ If the app is foregrounded and a push notification comes in, Appboy will still count the open.

### Step 4: Verify Code Modifications

Verify the code modifications you made against this [sample AppDelegate.m file][7] file. We also strongly advise looking through the below section on customization to determine if any additional changes need to be implemented.

### Push Customization

#### iOS Badge Counts

__Note__: If badge counts are enabled, Appboy will only clear the badge count when the app is opened directly from an Appboy push notification. This is to avoid interfering with any other badges stemming from other notifications within the app. If you do not have or do not plan to have other ways of altering your app's badge count, you should add the following code to `- (void) applicationDidBecomeActive:(UIApplication *)application` method:

**Objective-C**

```objc
[UIApplication sharedApplication].applicationIconBadgeNumber = 0;
```

**Swift**

```swift
UIApplication.sharedApplication().applicationIconBadgeNumber = 0
```

#### Sample Appboy Apple Push Payload

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

#### Custom Sounds and Push

##### Step 1: Hosting the Sound in the App

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

##### Step 2: Providing the Dashboard with a Protocol URL for the Sound

Your sound must be hosted locally within the app. You must specify a Protocol URL which directs to the location of the sound file in the app within the "Sound" field pictured below:

![Push Notification Sound][8]

For additional information see the Apple Developer Documentation regarding ["Preparing Custom Alert Sounds"][9]

#### Deep Linking to In-App Resources {#push-deep-linking}

See our documentation on ["Deep Linking" to In-App Resources: iOS][10]

#### Action Buttons

On iOS 8+ devices you can now offer your users the ability to interact with your application from notifications themselves via [categories][14].

![Illustration of Notification Action][13]

[Categories][14] define a type of notification that your application sends and contains actions that a user can perform in response. These actions manifest as buttons on the push notification. For example, a messaging application might want to notify you that your friend has sent you a new picture, and you could choose to either respond on the notification or mute the thread.

For an example of setting up actions and categories, please see `- (void)setupPushCategories` within the [AppDelegate.m][15] file of Stopwatch.

These categories can then be assigned to push notifications via our dashboard to trigger the action button configurations of your design. Here's an example which leverages the "LIKE_CATEGORY" from the [Stopwatch example][15].

![Dashboard Category Send][16]

Here's what that looks like on the device!

![Push Example with Buttons][17]

[0]: https://academy.appboy.com/Best_Practices/Push
[1]: https://developer.apple.com/ios/manage/overview/index.action "iOS Provisioning Portal"
[2]: /assets/img/ios_provisioning.png "pushNotification2.png"
[3]: /assets/img/AppleProvisioningOptions.png "AppleProvisioningOptions.png"
[4]: /assets/img/push_cert_gen.png "pushNotification3.png"
[5]: https://dashboard.appboy.com/app_settings/app_settings
[6]: /assets/img/push_cert_upload.png "push upload example image"
[7]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Stopwatch/AppDelegate.m#L34-56 "sample AppController.mm"
[8]: /assets/img/sound_push_ios.png
[9]: https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/IPhoneOSClientImp.html#//apple_ref/doc/uid/TP40008194-CH103-SW6
[10]: /Advanced_Use_Cases/Deep_Linking_to_In-App_Resources/iOS "Protocol URLs"
[11]: https://developer.apple.com/library/ios/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/TheAppLifeCycle/TheAppLifeCycle.html#//apple_ref/doc/uid/TP40007072-CH2-SW3 "iOS Lifecycle Methods"
[12]: #action-buttons
[13]: /assets/img/iOS8Action.gif
[14]: https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/IPhoneOSClientImp.html#//apple_ref/doc/uid/TP40008194-CH103-SW26 "Categories Docs"
[15]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Stopwatch/AppDelegate.m
[16]: /assets/img/ExampleCategory.png
[17]: /assets/img/push_example_w_category.PNG
[18]: https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplicationDelegate_Protocol/index.html#//apple_ref/occ/intfm/UIApplicationDelegate/application:didReceiveRemoteNotification:
[19]: https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/IPhoneOSClientImp.html#//apple_ref/doc/uid/TP40008194-CH103-SW2
