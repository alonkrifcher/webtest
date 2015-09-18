---
layout: page
title: FAQs
permalink: "/FAQs/"
collection: FAQs
isPlatform: false
weight: 1
---
## Is Appboy compatible with other SDKs? {#compatibility}

**Yes.** We have done internal testing and verified that we are compatible with Urban Airship, Flurry, and Crittercism. That is not to say that we are not compatible with more, but that is what we have tested so far. If you are experiencing any issues you think might be due to incompatibility, feel free to [contact us][16].

## Is Appboy compatible with RubyMotion? {#ruby-motion}
**Yes.** The Appboy iOS SDK fully supports RubyMotion Apps.

## Will Appboy affect my app's performance? {#performance}
Appboy should have no negative impact on your app's performance. The Appboy SDKs have a very small footprint. We automatically change the rate that we flush user data depending on the quality of the network, in addition to allowing manual network control. We automatically batch API requests from the SDK to make sure that data is logged quickly while maintaining maximum network efficiency. Lastly, the amount of data sent from the client to Appboy within each API call is extremely small.

## What is the definition of a "session"? {#def-session}

### <i class='icon-apple'></i> iOS

 A session starts when the `UIApplicationWillEnterForegroundNotification` notification is fired and ends when the `UIApplicationDidEnterBackgroundNotification` notification is fired. The first session is started when you call `[[Appboy sharedInstance] startWithApiKey:inApplication:withLaunchOptions:withAppboyOptions]`, but subsequent sessions are started per the notification as mentioned. We also will close the existing session and open a new session when you change users.

### <i class='icon-android'></i> Android

Sessions are begun and ended when the following are called:

- `IAppboy.openSession(Activity)`
- `IAppboy.closeSession(Activity)`

They must be called in every activity. Check your `AndroidManifest.xml` file for the list of activities defined in your app and be sure to add these two method calls in the manner shown below. Forgetting to add them may result in an incorrect session count. Additionally, custom events will be ignored if there is no open session.

```java
   @Override
   public void onStart() {
     super.onStart();
     // Opens a new Appboy session.
     Appboy.getInstance(this).openSession(this);
   }
   @Override
   public void onStop() {
     // Closes the Appboy session.
     Appboy.getInstance(this).closeSession(this);
     super.onStop();
   }
```

By default, an Android SDK session times out after 10 seconds absent any communication from the host application. This means if a user backgrounds the app and returns 9 seconds later, the same session will be continued. Appboy allows you to configure the number of seconds which it takes for a session to timeout within `res/values/appboy.xml`. See the following example for details:

```xml
<integer name="com_appboy_session_timeout">NUMBER_OF_SECONDS_UNTIL_SESSION_TIMEOUT</integer>
```

__Note:__ If a session closes while the user has the app backgrounded, that data may not be flushed to the server until they open the app again.

### <i class='icon-windows'></i> Windows Phone

The Appboy class exposes methods to open and close sessions named `OpenSession` and `CloseSession`. These must be called at the proper times during the Windows Phone application lifecycle in order to properly collect session data. For more information about the Windows Phone application lifecycle, refer to the [Windows Phone documentation][17]. The Appboy OpenSession method must be called in Launching and Activated event handlers (`Application_Launching(object, LaunchingEventArgs)` and `Application_Activated(object, ActivatedEventArgs)`). The CloseSession method must be called in the Deactivated and Closing event handlers (`Application_Deactivated(object, DeactivatedEventArgs)` and `Application_Closing(object, ClosingEventArgs)`).

### <i class='icon-windows'></i> Windows Universal

The Appboy class exposes methods to open and close sessions named `OpenSession` and `CloseSession`. These must be called at the proper times during the Windows Universal application lifecycle in order to properly collect session data. For more information about the Windows Universal application lifecycle, refer to the [Windows Universal documentation][18]. The Appboy OpenSession method must be called in the `OnLaunched(LaunchActivatedEventArgs)` method, `OnActivated(IActivatedEventArgs)`, and in a Resuming event handler. The CloseSession method must be called in a Suspending event handler.

## What is the definition of an "active user"? {#def-activeuser}

Appboy defines an active user for a given time period as any users who has a session in that time period. If a user loses connectivity, we will cache the session data locally and upload it when the user regains a network connection. These sessions will also be applied to the active user count. Additionally, if your app has a registration process, Appboy will count all users as active - registered or unregistered.

Additionally, if you set User IDs to identify users, when a new user logs in they will be counted as a separate active user. Users who are updated via the API will also be counted as an active user in the time period that they are updated.

## What is the definition of "stickiness"? {#def-stickiness}

Your app's "Stickiness" value is a ratio of a given day's total number of users that visited the app to your Monthly Active Users (MAUs) on that day. MAUs are calculated nightly on a rolling monthly period.

## Why does my push failure rate seem low? {#push-failure}

You might assume that 1% of any given segment you target with a message will have uninstalled. Logically, you might assume that this would cause around that percentage of your pushes to register as failures depending on the segment that you have targeted.

### Google Cloud Messaging (GCM)
However, due to the asynchronous process through which GCM invalidates device registration IDs this process is can be significantly delayed and may be technically inaccurate with regard to actual failure rate. The push is only confirmed as a failure when when GCM invalidates the Device Push Registration ID through the following process:

### Apple Push Notification Service (APNs)
Apple offers a push feedback service that provides asynchronous updates on the status of a user's device token.

Appboy polls the service daily, which returns which tokens are invalid because the app is uninstalled or the device has been offline too long or delivery failed, etc. Appboy automatically removes invalid push tokens from user profiles. If the token has been updated, we'll refresh the user profile during the user's next session.

### Google Cloud Messaging Registration Invalidation Process
1. The end user uninstalls the application or revokes permission.
2. Appboy sends a push message to GCM server.
3. The GCM server sends the message to the device.
4. The user's device receives the message and queries Package Manager about whether there are broadcast receivers configured to receive it, which returns `false`.
5. The user's device informs the GCM server that the application was uninstalled.
6. The GCM server marks the registration ID for deletion.
7. Appboy sends a __second__ message to GCM.
8. The GCM server returns a `NotRegistered` error message to the Appboy.
9. Appboy deletes the registration ID and notes that second push as having failed.

__Note__: There may be a delay completely removing the registration ID from GCM. Therefore, in some cases Google does not inform Appboy when a particular push fails.

## How does Local Time Zone Delivery work? {#local-timezone-delivery}

Local time zone delivery allows you to deliver messaging campaigns to a segment based on a user's individual time zone. Without local time zone delivery, campaigns will be scheduled based on your company's time zone settings in Appboy. For example, a London-based company sending a campaign at 12pm will reach users on the west coast of America at 4am. If your app is only available in certain countries, this may not be a risk for you, otherwise we highly recommend avoiding sending early morning push notifications to your user base!

### How does Appboy recognize a user's time zone? {#recognize-time-zone}

Appboy will automatically determine a user's time zone from their device. This ensures time zone accuracy and full coverage of your users. Users created through the [User API][19] will have U.S. Eastern Time as their default time zone until they are recognized by in your app by the SDK.

### How does local time zone delivery work? {#local-timezone-delivery-how}

Appboy will begin delivering a campaign when the first time zone in the world reaches the specified time. After delivery begins, we will continue delivering the campaign throughout the day as additional time zones reach the campaign delivery time. Please allow for sufficient time to view full campaign results from a local time zone campaign. In addition, to the typical time lag seen for email results, full campaign analytics will be available shortly after the campaign completes a full 24 hour cycle.

### How do I schedule a local time zone campaign? {#schedule-local-timezone}

When scheduling a campaign, you need to choose to send it at a designated time, and then check the box next to "Send campaign to users in their local time zone."

Appboy highly recommends that all local time zone campaigns are scheduled 24 hours in advance. Since such campaign need to send over the course of an entire day, scheduling them 24 hours in advance ensures that your message will reach your entire segment. However, you do have the ability to schedule these campaigns less than 24 hours in advance if necessary. Keep in mind that Appboy will not send messages to any users that has missed the send time by more than 1 hour. For example, if it is 1pm and you schedule a local time zone campaign campaign for 3pm, then the campaign will immediately send to all users whose local time is 3-4pm, but not to users whose local time is 5pm. In addition, the send time you choose for your campaign needs to have not yet occurred in [your company's time zone][42].

Editing a local time zone campaign that is scheduled less than 24 hours in advance will alter the message's schedule for certain users. If you decide to edit a local time zone campaign to send at a later time (for instance, 7pm instead of 6pm), users who were in the targeted segment when the original send time was chosen will still receive the message at the original time (6pm). If you edit a local time zone to send at an earlier time (for instance, 4pm instead of 5pm), then the campaign will send to all segment members at the earlier time (4pm). If you have allowed users to become re-eligible for the campaign, then they will receive it again at the original time (5pm). For all subsequent occurrences of your campaign, however, your messages only send at your updated time.

### When do changes to local time zone campaigns take effect? {#local-timezone-changes}

Target segments for local time zone campaigns should include at least a 48 hour window for any time-based filters to guarantee delivery to the entire segment. For example, consider a segment targeting users on their second day with the filters:

- First used app more than 1 day ago
- First used app less than 2 days ago

Local time zone delivery may miss users in this segment based on the delivery time and the users' local time zone. This is because a user can leave the segment by the time their time zone triggers delivery.

## Can I create single-user segments? {#one-user-segment}

**Yes.** You can create single user segments using unique attributes that identify users, like a user name or a user ID. The segmentation stats or preview may not show this individual user though because segment stats are calculated based on a random sample with a 95% confidence interval that the result is within +/- 1%. A single user will be outside the confidence interval in almost all cases, but this does not mean that it will incorrectly message users - full segmentation membership is calculated when a campaign is sent or a news item is targeted.

Appboy has testing filters to target specific users by user ID or email address.

![Appboy Debug Filters][31]

## Can I send myself test messages? {#test-messages}

**Yes.** Check out our [section on sending test messages here within the troubleshooting section.][35]

## What's the default APNs expiration date? {#apns-expiration-date}

Appboy sets the default [expiration date][46] for push notifications sent through APNs to 30 days.

## When does the client download new content? {#when-download}

Appboy sends data to the SDK at the beginning of a session based on which segments the user falls into at the time of the session. The news feed or new in-app messages will not be updated during the session. However, user data during the session will be continually processed as it is sent from the client. For example, a lapsed user (last used app more than 7 days ago) will still receive content targeted at lapsed users on their first session back in the app.

## When is segment membership calculated? {#when-segment-calc}

Appboy updates the user's segment membership as data is sent back to our servers and processed, typically instantaneously. A user's segment membership will not change until that session has been processed. For example, a users who falls into a lapsed user segement when the session first starts will be immediately moved out of the lapsed user segment when the session is processed.

## When does Appboy upload data? {#when-upload}

The Appboy SDK caches data (sessions, custom events, etc) and uploads it periodically. Only after the data has been uploaded will the values be updated on the dashboard. The upload interval takes into account the state of the device and is governed by the quality of the network connection:

| Network Connection Quality | Data Flush Interval |
| ------------------------------------------------ |
| Great | 10 Seconds|
| Good | 30 Seconds |
| Poor | 60 Seconds |

- If there is no network connection, data is cached locally on the device until the network connection is re-established at which time it is uploaded to Appboy.
- No data is uploaded after a session is closed.

## How do I "warm up" my email IP? {#warmup-email}

### Warming Up an IP Address

Appboy will isolate customers who send large volumes of email on their own IP address to prevent the email reputation of our other customers from affecting your delivery rates and vice versa. As a result, you will have to warm your IP.

### What does it actually mean to “warm up” an IP address?

IP warming is designed to ensure that you establish a positive email reputation with ISPs (Internet Service Providers) so that your messages are not filtered to spam. If you send email from a new or "cold” IP address, ISPs closely monitor the amount of email you are sending and how often your users are labeling your email as SPAM. They use that data to create an email reputation will eventually determine whether or not your emails are filtered to SPAM automatically.

Abrupt, high volume email campaigns are regarded with the most skepticism by ISPs. Given that, you should begin by sending small amounts of email, and scale gradually towards the volume of email you ultimately intend to send. Irregardless of volume, we suggest warming up your IP to be safe.

This process doesn't guarantee that your emails won't be filtered to spam. It is also important that you send engaging content, and send email on a consistent basis to users who want to receive it.

For more information see our [Email Best Practices][27] in [Appboy Academy][28].

## Why don't I see "Appboy Is Working" anymore with a debug API key? {#api-key-diff}

Appboy deprecated the Debug API keys in August 2014. As a result, you will no longer see "Appboy is Working" when using any legacy debug API keys you may have. You should migrate your application to the API key on your ["App Settings"][34] page in order to test messaging and recording functionality.

The production key should used with [production provisioning profiles][29] and apps that are live in the app store.

## How does rate limiting work? {#rate-limiting}

Appboy allows you to limit the rate at which your users are messaged both globally and on a per channel basis using the following filters.

- Last Received Any Campaign
- Last Received Email Campaign
- Last Received Push Campaign

__Note__: If your push campaign fails to reach the intended user we still mark that user has having received a push campaign on that day. We record the campaign receipt at the time of delivery because push token invalidation notifications from iOS and GCM are not synchronous.

## What is a UserID? {#user-id}

A UserID is a unique identifier for a given user. A UserID can have multiple devices associated with it which provides a few benefits:

- Provide a consistent user experience across multiple devices and platforms e.g. not sending lapsing user notifications to a user's Android tablet when they are a loyal user of the app on the iPhone.
- Improve the accuracy of your analytics by ensuring users aren't creating a new user profile every time they uninstall and reinstall, or install the app on a different device.
- Enable import of user data from sources outside the app using our [RESTful User API][37], and target users with transactional messages using our [RESTful Messaging API][38].
- Search for individual users using our "Testing" filters within the segmenter, and on the "User Search" page.

We __strongly recommend__ providing a UserID for users who have logged into your application. These should be unchanging and accessible when a user opens the app. Something like a username, or a unique identifier from your database is usually a good reference to use.

If you are unsure if you've set a UserID for your users, or are trying to perform a user search and are unaware of how UserIDs have been assigned within your app please contact your developers. Refer them to [success@appboy.com](mailto:success@appboy.com) if they require additional details.

## Can I target users who have downloaded but not opened my app? {#generate-profiles}

No, Appboy does not generate profiles for users until they have used the app for the first time.

## When can GCM Registration IDs change? {#gcm-registration-id-change}

[GCM Registration IDs][44] are created when the app is installed and registers for push notifications. Google will not change this registration ID except in the following cases:

- Client App Update
- Backup and Restore

Appboy automatically handles the deletion of the old token, and the addition of the new token to a user's profile so long as our SDK is instrumented properly as outlined in our [Android Push Documentation][43].


## When should I put multiple apps in the same app group? {#app-group}

The draw to have multiple apps under one App group can be enticing as it can lead to the ability to rate limit messaging across your entire app portfolio. However as a best practice we suggest only putting only different versions of the same or very similar apps together under one app group. For example, your iOS and Android versions of the same app or your free and premium versions of the same app.

Whichever apps you choose to have in one app group will have their data aggregated which will have a notable impact on filters in Appboy:

- Last Used App
- First Used App
- Session Count
- Money Spent In-App
- Push subscription (this becomes an all or none situation, in other words if your users unsubscribe from one app they will be unsubscribed from all of your apps under the app group)
- Email subscription (this becomes an all or none situation - and can leave you open to compliance issues)

__Note:__ This is not an exhaustive list. The aggregation of the data across dissimilar apps in filters like those listed above is why we do not recommend housing substantially different apps within the same app group.

## When does Appboy collect location? {#collectlocation}
Appboy only collects location when the application is in the foreground. As a result, our last known location filters target users based upon where they last opened the application.

[16]: mailto:support@appboy.com "contact us"
[17]: http://msdn.microsoft.com/en-us/library/windowsphone/develop/ff817008(v=vs.105).aspx
[18]: http://msdn.microsoft.com/en-us/library/windows/apps/hh464925.aspx
[19]: /REST_APIs/User_Data
[24]: /REST_APIs/Messaging
[25]: https://dashboard.appboy.com/app_settings/api_settings/
[26]: https://dashboard.appboy.com/users/user_search/user-search/
[27]: https://academy.appboy.com/Best_Practices/Email
[28]: https://www.appboy.com/academy
[29]: https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/ProvisioningDevelopment.html
[31]: /assets/img/debug-filters.png
[32]: /assets/img/debug-example.png
[34]: https://dashboard.appboy.com/app_settings/app_settings/ "App Settings"
[35]: /Troubleshooting/Sending_Test_Messages "Sending Test Messages"
[37]: /REST_APIs/User_Data
[38]: /REST_APIs/Messaging
[41]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/configuration/XmlAppConfigurationProvider.html
[42]: https://academy.appboy.com/Deep_Dives/Platform_Administrative_Features#delivery-notifications
[46]: #gcm-registration-id-change
[43]: /Enabling_Message_Channels/Push_Notifications/Android "Android Push Notifications"
[44]: https://developer.android.com/google/gcm/gcm.html#reg "GCM Android Developer Docs"
[46]: https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/CommunicatingWIthAPS.html
