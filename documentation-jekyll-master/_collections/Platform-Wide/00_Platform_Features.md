---
title: Platform Features
---
# Platform Features

Appboy provides a comprehensive user engagement solution for your mobile apps. The Appboy platform has three primary components:

__Mobile SDK:__ The Appboy mobile SDK is integrated into your iOS or Android mobile applications and provides powerful marketing, customer support, and analytics tools.

__Dashboard:__ The dashboard controls all of the data and interactions at the heart of the Appboy platform. Marketers can use the site to manage notifications, setup targeted messaging campaigns, and view analytics or feedback. Developers can use the dashboard to manage settings for integrating apps, such as API keys and push notification credentials.

__Data API:__ The Appboy Data API provides a web service where you can record actions taken by your users directly via HTTP, rather than through the mobile SDKs. This allows you to add custom events for segmentation purposes directly from a web-based application.

## Granular Targeting and Analysis

### App Analytics
The Appboy dashboard displays graphs that are updated in real-time based upon a number of analytics metrics as well as custom events which you instrument in your application.

![Analytics Chart][1]

### User Segmentation

Segmentation allows you to create groups of users based on powerful filters of their in-app behavior, demographic data, social data, etc. Appboy also allows you to define any in-app user action as a "custom event" if the desired action is not captured by default. The same is true of user characteristics via "custom attributes". Once a user segment is created on the dashboard, your users will move in and out of the segment as they meet (or fail to meet) the defined criteria. For example, the below image shows a segment which includes all users who have spent money in-app and last used the app more than two weeks ago.

![Segmentation Example][2]

## Multi-Channel Messaging

Once you have defined a segment, Appboy's messaging tools allow for multi-channel communication with your users. For example, send a push notification and email to the example segment defined in the previous section. Messaging channels are best used in concert and with regularity to re-engage lost users, retain active users, and energize your brand ambassadors. Moreover, you can use our advanced scheduling options to automate campaigns to specific groups of those users going forward.

![Messaging Channels][3]

### News Feed {#platform-features-news-feed}

When your app opens, the Appboy SDK automatically pulls down the user's news feed -- a set of News Items and Cross-Promotions cards that are controlled on the Appboy dashboard. By making a call to the Appboy library, you can display the news feed when a button or action is triggered in your app, providing an in-app notification center that can be updated by non-technical team members without having to change your code or database.

- Appboy will track how many clicks and impressions each card in the news feed receives
- You can schedule a specific time-frame when cards will display, allowing for deep [dayparting][4]
- Cards within the news feed may be targeted at user segments just like any other message
- In-app messages will automatically appear when a user has new items in their news feed
- News Feed Items can ["Deeply Link"][5] to in-app content enabling the marketer to provide individualized content navigation for each user. Every process from onboarding, to the surfacing of rich in-app content can be behaviorially targeted and customized using the News Feed and ["Deep Links"][5]

![News Feed Dashboard][6]

#### Cross Promotion Cards

Cross-Promotions are a type of news feed card which display content from the App Store or Google Play that you have recommended to users.  Cross-promotions are a wonderful way to leverage your user data to accelerate the adoption of other content within your network by moving audiences from one of your apps to another.

- Touching a Cross-Promotion will bring users to the relevant store so that they can download the content
- Users will only see Cross-Promotions for their device's platform in the news feed
- In iOS, you may recommend books, music, or other content available in the App Store in addition to apps

#### News Feed User Interface

Here is an example news feed that a user might see in a sports app working to engage their fans:

![News Feed User Interface][7]

### Push Notifications {#platform-features-push}

Appboy supports the Apple Push Notification Service (APNS) for iOS and Google Cloud Messaging (GCM) for Android. Push notifications can be triggered by the publication of messaging campaigns, news items, and replying to user feedback.

![Example Push Dashboard][8]

### In-App Messaging {#platform-features-in-app-messaging}

Appboy provides unobtrusive in-app notifications via our custom-built native user interface. The message is presented when users start a new session -- ensuring that your message arrives when the user is engaged.

![Slideup Example][9]

### Email {#platform-features-email}

Send your users rich HTML messages by adding your existing HTML templates or or using our rich text editor. Appboy makes it easy to include email as part of your mobile engagement strategy.

![Email Dashboard][10]

### Webhooks {#platform-features-webhooks}

Appboy's webhooks allow you to trigger non-app actions such as SMS text message delivery. You can use webhooks to provide other systems and applications with real-time information. The flexibility of this feature allows you to send information to any endpoint.

![Webhooks][22]

### Feedback {#platform-features-feedback}

The Appboy SDK provides a feedback widget that can be added to your app to allow users to leave feedback. Feedback is managed on the dashboard, where you can add internal notes and respond to users via multiple messaging channels. Because we show the user's Appboy profile side-by-side with their feedback, you can easily see the user's device, OS version, app version, and behavioral data. This minimizes the work your support team has to do to understand technical issues.

#### Feedback Response Dashboard Interface

![Feedback Response Dashboard][11]

In Android, you can also configure the SDK to send feedback programmatically if you prefer to use your own UI elements. The Appboy library exposes hooks that let you submit feedback through the SDK, allowing you to leverage your existing UI framework. This feedback can still be viewed and replied to on the dashboard.

[1]: /assets/img/analytic_metrics.png "Analytics Chart"
[2]: /assets/img/dashboard_segment_example.png "Segmentation Example"
[3]: /assets/img/Message_Types.png "Messaging Channels"
[4]: http://en.wikipedia.org/wiki/Dayparting
[5]: /Advanced_Use_Cases/Deep_Linking_to_In-App_Resources/iOS "Deeply Link"
[6]: /assets/img/news_feed_dashboard_example.png "News Feed Dashboard"
[7]: /assets/img/News_Feed_Ad.png "News Feed User Interface"
[8]: /assets/img/UOiOSPush.png "Example Push Dashboard"
[9]: /assets/img/slideupAndroid.png "Slideup Example"
[10]: /assets/img/TextPlusEmailWizard.png "Email Dashboard"
[11]: /assets/img/feedback_dashboard_example.png "Feedback Response Dashboard"
[22]: /assets/img/Webhook_Body.png
