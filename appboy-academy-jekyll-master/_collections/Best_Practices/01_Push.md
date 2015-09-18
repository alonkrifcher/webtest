---
title: Push
---
# Push

Being able to communicate with your users whether or not they’re “in-app” can be extremely useful, making push notifications a powerful tool. But with power comes responsibility, and used incorrectly, they can be potentially invasive. To escape being pushy, follow the best practices and use cases below to make sure your push messages inspire engagement rather than annoyance.

## Message Format

### iOS

- Message Length:
  - iOS Lock Screen: 110 Characters
  - iOS Notification Center: 110 Characters
  - iOS Banner Alert: 62 Characters
  - iOS Pop Up Alert: 235 Characters
- Payload Size: 2 kilobytes
- Number of Lines:
  - iOS Lock Screen: 4 Lines
  - iOS Notification Center: 4 Lines
  - iOS Banner Alert: 2 Lines
  - iOS Pop Up Alert: 8 Lines
- Customizable UI: No
- Deep Link Capable: Yes

#### iOS Example 

![iOS_Push][42]

### Android
- Message Length: Depends on Device
- Payload Size: 4 kilobytes
- Number of Lines: 1 Line Preview, Expandable to 8
- Customizable UI: Yes
- Deep Link Capable: Yes

#### Android Example

![Android_Push][43]

#### Large Image Format Example

![Large Android Image][27]

- Large image notifications display best when using an image of at least 600x300 pixels 

### Windows Universal
- Message Length: Depends on Device
- Payload Size: 3 kilobytes
- Number of lines: 1-3 Lines
- Customizable UI: No
- Deep Link Capable: No 

#### Windows Universal Example

![Push_Window_Universal][46]

### Windows Phone 8
- Message Length: Varies. If only title is set, about 40 characters can be displayed. If only content is set, about 47 characters can be displayed. If title and content is set, then about 41 characters can be displayed.  
- Payload Size: 5 kilobytes 
- Number of lines: 1 
- Customizable UI: No
- Deep Link Capable: No 

#### Windows Phone 8 Example

![Push_Window8][47]

## Use Cases {#push-use-cases}

### Attracting New Users

##### Initial Onboarding
Until users takes the initial steps towards using your app (such as registering an account), their value is severely limited. Use push notifications to urge users to complete these steps so they can begin using your app in full. 

For more information on onboarding, see our [Quick Wins page][22] on the topic.

##### First Purchases
After users are comfortable using your app, you can use push notifications to help convert them into in-app purchasers.

### Re-Engagement Campaigns

If you don't have an email address and your users aren't using the app, this may be the only hope you have of bringing them back. Be warned that these can be taken negatively if they're poorly timed or not relevant to the user.

##### New Features
Push notifications can be effective in notifying disengaged users about new features that might attract them back to your app. 

##### Time-Sensitive Offers
If you have a clock ticking on an offer, sometimes Push is a great way to let your users know about it before it expires. These messages generally carry a high sense of urgency and are optimal for reminding recently-lapsed users about your app.

Example: Maybe your app is a game and you offer your users an in-game currency bonus if they maintain a streak of playing the game daily. Alerting a user that that streak is in danger of being broken could be a reasonable push if they've exceeded a certain number of days.

For more information on re-engaging lapsed users, see our [Quick Wins page][23] on the topic.

__Note__:Push should be formatted in plain-text. Key-value pairs allow for ["Deep-linking"][3] to external URLs or in-app features.

## Best Practices {#push-best-practices}

### Develop a Push Cadence

#### Developing a steady rate at which you communicate with your users is important.
Push can seem invasive to an end-user if used improperly. For example, if a user received a push for the first time ever 20 days after they last used the app they're not going to be happy. They are more likely to uninstall than re-engage.

#### If you routinely and positively communicate with your users via push over time, they will come to associate positive experiences with your messages.
If you send a push 20 days since their last session they might just remember the good ol' days and come back!

#### Higher standards for content and relevancy with Push.
Push notifications can be abrasive. They interrupt the flow of whatever the user is doing whether or not they are within an app. If you're going to tell a user to drop what they’re doing for your message, you should have a good reason.

Time-sensitive and location-based notifications are best sent via Push Notifications; e.g "Severe weather coming, head for a covered area" or "Flash sale starts now until Wednesday at 11:59 PM ET.”

### Detailed Push Preferences

Push notifications should be treated with care to target users with timely and relevant notifications. Appboy will collect useful device and usage information that can be used to target relevant segments. This should be supplemented with custom events and attributes specific to your app. Using that data you can carefully target messages to increase open rates and decrease instances of users disabling push.

![Circa Message Settings][15]

Additionally, you can create a settings page in your app that allows users to directly tell you which notifications they want to receive. This can be set as a boolean attribute in Appboy that corresponds to the app setting status. For example, a news app could have subscription settings for the following:

- Breaking News
- Sports News
- Politics
- Business News

When the news app wants to create a campaign targeting only users interested in Politics, they simply add the 'Subscribes to Politics' attribute filter to the segment. When set to true, only users who subscribe to notifications will receive them.

![Example of Opt-In Prompts][14]

The general stats that you see for push enabled will relate to whether the user has approved notifications with the OS. If users disable notifications on iOS they'll be automatically removed from our system since Apple won't allow the push token to be sent. Android subscribes users to notifications by default.

Documentation for setting custom attributes:

- [iOS][4]
- [Android][5]
- [Windows Store][6]
- [Windows Phone][7]
- [REST API][10]

#### Android Push Priority

Android push notifications provide the option of dictating where notifications are displayed relative to other apps' notifications.  When composing the message for your push campaign, select "Notification Priority" in the settings tab to set a priority for your notification. 

![Dashboard Push Priority Location][41]

The provided options correspond to different priorities with which the notification will be displayed if a receiving user has multiple notifications. A more in-depth explanation of Android Push Priority and the priority options can be found [here][40].

### Creating Custom Opt-In Prompts

Even if you keep best practices in mind when designing and sending push messages, some users may turn them off before realizing any of the benefits that they would provide. Users may have had previous negative experiences with spammy, irrelevant push messages from other apps and now will decline any request to receive push messages from any app.

Furthermore, the legal environment surrounding electronic messaging in some locales is becoming increasingly strict. For example, [Canada's Anti-Spam Legislation][13] requires explicit consent from users to send them marketing-related messages. Other countries may make similar legislative moves, so acquiring that explicit consent from your users should be a priority. Not having a double opt-in system in place now may leave you with time-consuming migration to a compliant system in the future.

Creating an opt-in prompt that clearly lists and demonstrates the benefits of push can only help you, given the evolving attitudes of both consumers and governments toward push messaging. Instead of ambushing your users with a permission request when they open the app for the first time, explain the benefits of your push messages and THEN ask for permission.

![Breaking News 1][16]

![Breaking News 2][17]

Adding a simple pop-up to prompt user action can allow you to effectively request permission from your users more than once, if needed. Relying on iOS's permission request alone means that most users will never think twice about enabling your push messages.

For example, the Fandango app has a pop-up that states the benefits of enabling push notifications in a clear and concise manner. After recieving this notification, users have enough information to decide if they will find Fandango's pushes valuable and can act accordingly.

![fandango_prompt][37]

Another example of an app that does a great job with custom opt-in prompts is textPlus. Upon downloading textPlus, a user receives a pop-up prompt that explains the benefits of push notifications and walks the user through the process of enabling them. 

![textplus_prompt][24]

After the user clicks "Next," the user receives the real iOS push prompt. If the user doesn't enable push notifications at this stage, then he will have to enable them in Settings. textPlus makes this easier for users to do by featuring a reminder on their Inbox page. 

![textplus_reminder][25]

If users click "Turn on," they are presented with detailed steps for how to enable push notifications. This removes some of the effort involved in turning on push notifications

![textplus_directions][26]

__Note: If you've implemented a custom push prompt as described above in an iOS app, make sure that you're [reregistering with APNs][44] every time the app runs after they grant push permissions to your app. Apple advises this as [device tokens can change arbitrarily][45].__

Additional information on managing user subscriptions is available [here][36].

### Sunset Policies {#push-sunset-policies}

Even when you make sure to send only relevant, timely push notifications, some users may still be unresponsive to them and find them spammy.  If a user shows a history of repeatedly ignoring your push notifications, it's a good idea to stop sending them pushes before they become annoyed with your app's communications or uninstall your app altogether.  To do this, create a sunset policy that eventually stops sending push notifications to users who haven't had a direct or influenced open for a long period of time. You can read about the advantages of a sunset policy and learn how to create one within our platform [here][19].

Before you stop sending push notifications to a segment of users, you should deliver one final notification that explains why they will no longer receive pushes and gives them a chance to demonstrate their interest in continued pushes by opening that notification. After the sunset policy goes into effect, use an in-app message and/ or Newsfeed card to remind these users that while they will no longer receive pushes, in-app messaging channels will continue to deliver interesting, helpful information.

Although you may be reluctant to stop sending pushes to users who originally opted in to them, keep in mind that there are other messaging channels that can more effectively reach these users, especially if they have previously ignored your pushes.  If the user opens your emails, then email campaigns are a good way to reach him outside of your app.  If not, then in-app messages and News Feed cards are the best way to deliver content without risking the user uninstalling your app.  

### Conversion Tracking

When assigning a [conversion event][34] to a push campaign, you'll have the option to track app opens for a certain period after the campaign is received. Setting app opens as the conversion event provides different insight from the results statistics you normally receive after after a push campaign. While all push campaigns results break down a message's direct opens and opens (which include both direct and [influenced opens][35]), conversion tracking will track any type of open, whether it is direct or influenced. 

In addition, by using the conversion event "opens app," you are tracking app opens that occur before the conversion deadline (for instance, 3 days). This differs from an influenced open in that the time a user has to register an influenced open differs based from individual to individual, and is on each user's past engagement behavior.

## Push Reporting

The Appboy SDK provides you with a detailed report of each of your push campaigns. Navigate to the 'Campaigns' tab on your dashboard and click on the 'Details' tab of your desired campaign as shown below:

![Campaign Details][29]

On this page, you will be able to comprehensively view and analyze the success of your campaign in an organized format.

![Campaign Data][30]

![Campaign Data][31]

![Campaign Data][32]

| Statistic | Description |
| --------- | --- |
| Bounces | The push notifications sent to these users were undeliverable. These users have been automatically unsubscribed from all future push notifications. See [Bounced Push Notifications][38]. |
| Direct Opens | Instances in which a user opened your app by interacting directly with a push notification. |
| Opens | Instances including both Direct Opens (defined above) and Influenced Opens in which the Appboy SDK has determined, using a proprietary algorithm, that a push notification has caused a user to open the app. |

### Bounced Push Notifications

#### Apple Push Notification Service

Bounces occur in the APNs when a push notification attempts delivery to a device that does not have the intended app installed.  The APNs provides a feedback service that stores a list of device tokens, where a device's token is added to the list when a bounce occurs.  
__Note:__ Push notifications that expire before delivery are not considered as failed and will not be added to the feedback service.

#### Google Cloud Messaging

GCM bounces could occur in three cases:

- **Uninstalled Applications**

When a message attempts delivery to a device and the intended app is uninstalled on that device, the message will be discarded and the device's registration ID will be invalidated. Any future attempts at messaging the device will return a NotRegistered error.  

- **Backed Up Applications**

When an application is backed up, its registration ID could become invalid before the application is restored. In this case, GCM will no longer store the application's registration ID and the application will no longer receive messages. As such, registration IDs should _not_ be saved when an application is backed up.

- **Updated Applications**

When an application is updated, the previous version's registration ID may no longer work. As such, an updated application should replace its existing registration ID.

For more information, refer to the [Google Developers documentation on GCM][39].


[3]: /Deep_Dives/Deep_Linking_to_In-App_Content
[4]: https://documentation.appboy.com/User_Data_Collection/Attribute_Tracking/iOS
[5]: https://documentation.appboy.com/User_Data_Collection/Attribute_Tracking/Android
[6]: https://documentation.appboy.com/User_Data_Collection/Attribute_Tracking/Windows/Store
[7]: https://documentation.appboy.com/User_Data_Collection/Attribute_Tracking/Windows/Phone
[10]: https://documentation.appboy.com/REST_APIs/User_Data#user-attribute-object
[13]: /Best_Practices/Spam_Regulations#CAN-SPAM
[14]: /assets/img/circa_push1.png
[15]: /assets/img/circa_push2.png
[16]: /assets/img/bn_push1.png
[17]: /assets/img/bn_push2.png
[19]: /Best_Practices/Email#sunset-policies 
[22]: /Quick_Wins/Creating_a_Welcome_Campaign
[23]: /Quick_Wins/Capturing_Lapsing_Users
[24]: /assets/img/textplus_prompt.png
[25]: /assets/img/textplus_reminder.png
[26]: /assets/img/textplus_directions.png
[27]: /assets/img/android_push_image.png
[29]: /assets/img/Push_Report_Campaign_Selector.png
[30]: /assets/img/Push_Reporting_iOS_Push_Metric.png
[31]: /assets/img/Push_Reporting_Campaign_Statistics.png
[32]: /assets/img/Push_Reporting_Message_Deliveries.png
[34]: /Deep_Dives/Conversion_Events
[35]: https://blog.appboy.com/2014/05/product-update-announcing-influenced-push-notification-stats/
[36]: /Deep_Dives/Managing_User_Subscriptions
[37]: /assets/img/PushPrimeFandango.png
[38]: #bounced-push-notifications
[39]: https://developers.google.com/cloud-messaging/
[40]: https://blog.appboy.com/2014/11/breakdown-android-lollipops-new-notification-priorities-push-flexibility/
[41]: /assets/img/push_priority.png
[42]: /assets/img/Push_iOS.png
[43]: /assets/img/Push_Android.png
[44]: https://documentation.appboy.com/Enabling_Message_Channels/Push_Notifications/iOS#update-code
[45]: https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/IPhoneOSClientImp.html#//apple_ref/doc/uid/TP40008194-CH103-SW2
[46]:/assets/img/Push_Window8_Toast.png
[47]:/assets/img/Push_Windows_Universal_Toast.png