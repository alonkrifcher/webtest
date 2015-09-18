---
title: Troubleshooting
platform: Android and FireOS
---
## Troubleshooting

### Understanding the Appboy/GCM Workflow
The Google Cloud Messaging (GCM) service is Google's infrastructure for push notifications sent to Android applications. Here is the simplified structure of how push notifications are enabled for your users' devices and how Appboy is able to send push notifications to them:

#### Step 1: Configuring Your Google Cloud API Key
In the development of your app, you'll need to provide the Appboy Android SDK with your Google Project Number (also referred to as the Sender ID). Additionally, you'll need to provide an API Key for server applications to the Appboy dashboard. Appboy will use this API key when we attempt to send messages to your devices. You will need to ensure that GCM service is enabled in the Google Developer's console as well. More information about completing these steps is found in our [Enabling Messaging Channels][5] documentation for Android. __Note__: A common mistake in this step is using an API key for Android applications. This is a different, incompatible API key for the type of access Appboy needs.

#### Step 2: Devices Register for GCM and Provide Appboy with Push Tokens
In typical integrations, the Appboy Android SDK will handle the process of registering devices for GCM capability. This will usually happen immediately upon opening the app for the first time. After registration, Appboy will be provided with a GCM Registration ID which is used to send messages to that device specifically. We will store the Registration ID for that user and that user will become "Push Registered" if they previously did not have a push token for any of your apps.

#### Step 3: Launching an Appboy Push Campaign
When a push campaign is launched, Appboy will make requests to GCM to deliver your message. Appboy will use the API key copied in the dashboard to authenticate and verify that we are allowed to send push notifications to the push tokens provided.

#### Step 4: Removing Invalid Tokens
If GCM informs us that any of the push tokens we were attempting to send a message to are invalid, we remove those tokens from the user profiles they were associated with. If that user has no other push tokens, they will no longer show up as "Push Registered" under the Segments page.

Google has more details about GCM in their [Developers page][6].

### Utilizing the Push Error Log
Appboy provides a ["Push Message Error Log" within the Developer Console][13]. This error log provides a variety of warnings which can be very helpful for identifying why your campaigns aren't working as expected. These warnings include but not are limited to:

- Errors in integration
- APNS Push Token & GCM Registration ID Invalidation

![Push Error Log][11]

### Troubleshooting Scenarios

#### No "Push Registered" Users Showing in the Appboy Dashboard (Prior to Sending Messages)
  - Ensure that your app is correctly configured to allow push notifications. Common failure points to check include:
    - The correct Google Project Number is included in the `appboy.xml` file.
      - Additionally, in the [Google Developers Console][7], under "APIs & auth" > "APIs", make sure that "Google Cloud Messaing for Android" is set to "ON".
        ![GCMon][8]
    - Appboy is set up to [register devices for push notifications][5]
    - The AppboyGcmReceiver is properly registered in `AndroidManifest.xml` with an intent filter for:
      - `<action android:name="com.google.android.c2dm.intent.REGISTRATION" />`
  - __Note__: It may be useful to monitor your device's logcat while opening the app for the first time to verify that registration can be completed for your device. You should be looking for a message such as:

    ```
    I/Appboy v1.5.5 .com.appboy.Appboy( 5083): Google Cloud Messaging found.  Setting up Google Cloud Messaging
    ```
    or

    ```
    E/Appboy v1.5.5 .com.appboy.Appboy(27790): Did not find support for Google Cloud Messaging or Amazon Device Messaging
    ```
    These messages can help you interpret whether GCM registration is occuring properly on your device.

#### Push Notifications Not Displayed on Users' Devices
There are a few scenarios why this is occurring:

  - If you force-quit your application, your push notifications will not be displayed while your app is not running.
  - Your app is foregrounded when the notification is received.
  - The AppboyGcmReceiver is properly registered in `AndroidManifest.xml` with intent filters for:
    - `<action android:name="com.google.android.c2dm.intent.RECEIVE" />`
    - `<category android:name:"Your Application's Package Name" />`
  - If you are testing push over Wi-Fi, your firewall may be blocking ports necessary for GCM to receive messages. Please ensure that ports 5228, 5229 and 5230 are open. Additionally, since GCM doesn't specify its IPs, also allow your firewall to accept outgoing connections to all IP addresses contained in the IP blocks listed in [Google's ASN of 15169] [14] .  

#### "Push Registered" Users No Longer Enabled After Sending Messages
There are a few reasons why this could be happening:

  - Users have uninstalled the application. This will make their GCM Registration ID invalid.
  - The GCM API key provided in the Appboy dashboard is invalid. You will need to verify:
    - The API key is for server applications. It should look like this in your Google Developers Console:
      ![Server apps key][9]
    - The API key provided is for the same Google Project that is referenced in your app's `appboy.xml` file. Make sure that the Project Number matches what you entered in `appboy.xml`.
      ![Google Project Number][10]

[5]: /Enabling_Message_Channels/Push_Notifications/Android#register-devices
[6]: http://developer.android.com/google/gcm/index.html
[7]: https://console.developers.google.com/
[8]: /assets/img/gcm_on.png
[9]: /assets/img/serverappskey.png
[10]: /assets/img/googleprojectnumber.png
[11]: /assets/img/push_error_log.png
[13]: https://dashboard.appboy.com/app_settings/developer_console/errorlog/
[14]: http://tcpiputils.com/browse/as/15169
