---
title: Web SDK
---
# Web SDK

With Appboy’s Web SDK, you can collect session data, identify users (with the same set of attributes that we support across our other platforms), and record purchases and custom events via a web/mobile browser. Implementing Appboy’s Web SDK enables you to create a more complete view of your users across web and mobile channels. You can also use the Web SDK to engage with your users by sending in-app web messages. 

## Implementation

For information on integrating the Appboy Web SDK, see our [documentation][6]. After implementing the Web SDK, your website will appear as an app in your app group and will be grouped with your mobile apps.

![Web_App_Group][7]

## In-App Web Messaging

You can send web messages to engage with users directly in their web/mobile browser. Web messages are sent as in-app messages, and can also be sent as slideup, modal, or fullscreen types. For more information on composing an in-app message, see our page on [creating an in-App message][8]. Check out a sample web in-app message sent by Appboy below.

![appboy-in-app][9]

## Delivery Rules

By default, a campaign containing an in-app message will send an in-app web message as well as an in-app mobile message. To send an in-app message exclusively to web or mobile, you will need to segment your campaign accordingly.

## Segmenting for Web Users

You can create a segment of your web users by selecting only your website’s app icon in the Apps Used section.

![web-users-segment][10]

This will allow you to target users based on their behavior on the web only. If you wanted to target web users to encourage them to download your mobile app, you’d create this segment as your target audience. If you wanted to send a messaging campaign that included a mobile in-app message but not a web message, you would simply uncheck your website’s icon in your segment.

[6]: https://documentation.appboy.com/SDK_Integration/Web
[7]: /assets/img/web-app-group.png
[8]: /Quick_Wins/Creating_an_In-App_Message
[9]: /assets/img/appboy-web-inapp-message.png
[10]: /assets/img/web-users-segment.png