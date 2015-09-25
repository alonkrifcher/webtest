---
title: Troubleshooting
platform: iOS
---
## Troubleshooting

### Understanding the Appboy/APNs workflow

  The Apple Push Notification service (APNs) is Apple's infrastructure for push notifications sending to iOS and OS X applications. Here is the simplified structure of how push notifications are enabled for your users' devices and how Appboy is able to send push notifications to them:

#### Step 1: Configuring the push certificate and provisioning profile

In the development of your app, you'll need to create an SSL certificate to enable push notifications. This certificate will be included in the provisioning profile your app is built with and will also need to be uploaded to the Appboy dashboard. The certificate allows Appboy to tell APNs that we are allowed to send push notifications on your behalf.

There are two types of provisioning profiles and certificates - development and distribution. We recommend just using distribution profiles/certificates to avoid any confusion. If you choose to use different profiles and certificates for development and distribution, make sure that the certificate uploaded to the dashboard matches the provisioning profile you are currently using. You can read more about provisioning profiles [here][provisioning profiles].

#### Step 2: Devices register for APNs and provide Appboy with push tokens

When users open your app, they will be prompted to accept push notifications. If they accept this prompt, then APNs will generate a push token for that particular device. The Appboy SDK will send this token along when the current session is closed. After we have a push token associated with a user, they will show as "Push Registered" in the dashboard on their user profile under the "Engagement" tab and will be eligible to receive push notifications from Appboy campaigns. __Note__: This does not work with the iOS Simulator. You cannot test push notifications with the iOS Simulator as a result.

#### Step 3: Launching an Appboy push campaign

When a push campaign is launched, Appboy will make requests to APNs to deliver your message. Appboy will use the SSL push certificate uploaded in the dashboard to authenticate and verify that we are allowed to send push notifications to the push tokens provided. If a device is online, the notification should be received shortly after the campaign has been sent. Appboy sets the default APNs [expiration date][14] for notifications to 30 days.

#### Step 4: Removing invalid tokens
If APNs informs us that any of the push tokens we were attempting to send a message to are invalid, we remove those tokens from the user profiles they were associated with.

Apple has more details about APNs in their [Developer Library][20].

### Utilizing the Push Error Log
Appboy provides a ["Push Message Error Log" within the Developer Console][27]. This error log provides a variety of warnings which can be very helpful for identifying why your campaigns aren't working as expected. These warnings include but not are limited to:

- Errors in integration
- APNs Push Token & GCM Registration ID Invalidation

![Push Error Log][26]

### Troubleshooting Scenarios

#### No "Push Registered" Users Showing in the Dashboard

  - Ensure that your app is prompting you to allow push notifications. Typically this prompt will appear upon your first open of the app, but it can be programmed to appear elsewhere. If it is not appearing where it should be, then the problem is likely with the basic configuration of your app's push capabilities.
    - Verify the steps under ["Enabling Message Channels" > "Push Notifications"][21] were successfully completed.
    - Make sure that the provisioning profile your app was built with includes permissions for push. Make sure that you're pulling down all of the available provisioning profiles from your Apple Developer account, as well. You can confirm this by navigating to "Preferences" > "Accounts" in Xcode (Command+,).

    ![Provisioning Profile Refresh Step 1][23]

    Click on the Apple ID you use for your developer account and then "View Details...". In the bottom left corner of the pane that opens up, click on the refresh icon.

    ![Provisioning Profile Refresh Step 2][24]

#### Devices Not Receiving Push Notifications

##### Users No Longer "Push Registered" After Sending a Push Notification

This would likely indicate that user had an invalid push token. This can happen for several reasons:

###### Dashboard/App Certificate Mismatch

If the push certificate that you uploaded in the dashboard is not the same one in the provisioning profile that your app was built with, APNs will reject the token. Verify that you have uploaded the correct certificate and complete another session in the app before attempting another test notification.

###### Uninstalls

If a user has uninstalled your application, then their push token will be invalid and removed upon the next send.

###### Regenerating Your Provisioning Profile

As a last resort, starting over fresh and creating a whole new provisioning profile can clear up configuration errors that come from working with multiple environments, profiles and apps at the same time. There are many "moving parts" in setting up push notifications for iOS apps, so sometimes it is best to retry from the beginning. This will also help isolate the problem if you need to continue troubleshooting.

##### Users Still "Push Registered" After Sending a Push Notification

###### App Is Foregrounded

On iOS, if the app is in the foreground when the push message is received it will not be displayed. You should background the app on your test devices before sending test messages.

###### Test Notification Scheduled Incorrectly

Check the schedule you set for your test message. If it is set to local time zone delivery or Intelligent Delivery, you may have just not received the message yet (or had the app in the foreground when it was received).

###### User Not "Push Registered" For the App Being Tested

Check the user profile of the user you are trying to send a test message to. Under the "Engagement" tab, there should be a list of "Pushable Apps". Verify the app you are trying to send test messages to is in this list. Users will show up as "Push Registered" if they have a push token for any app in your app group, so this could be something of a false positive.

The following would indicate a problem with push registration, or that the user's token had been returned to Appboy as invalid by APNs after being pushed:

![Push Problem][25]

[20]: https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/ApplePushService.html
[21]: /Enabling_Message_Channels/Push_Notifications/iOS
[22]: /assets/img/pushenabled.png
[23]: /assets/img/prov_profile_refresh_step1.png
[24]: /assets/img/prov_profile_refresh_step2.png
[25]: /assets/img/RegistrationProblem.png
[26]: /assets/img/push_error_log.png
[27]: https://dashboard.appboy.com/app_settings/developer_console/errorlog/
[28]: https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/CommunicatingWIthAPS.html
[14]: https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/CommunicatingWIthAPS.html
[provisioning profiles]: https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/ProvisioningDevelopment.html