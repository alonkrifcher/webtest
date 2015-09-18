---
title: mParticle Integration
---
# mParticle Integration

Appboy is dedicated to creating partner integrations that allow you to send data from multiple sources to your Dashboard. [mParticle][10] is an analytics data hub that allows you to track your users and route that data to a wide variety of user analytics providers, such as Appboy. mParticle has a basic core integration which only allows access to our push notification and segmentation, as well as an embedded SDK option which ensures your ability to take advantage of in-app messages, the news-feed and feedback as well.

## Getting Started

Appboy recommends using the [embedded SDK flavor][6] of the mParticle/Appboy integration as push notifications alone don't form a complete mobile marketing strategy. You can enable the additional functionality by following their [Appboy specific documentation][6].

## Enabling Push Notifications

Push Notifications via mParticle and Appboy must be enabled through the integration steps included in this [section of the mParticle documentation][2].

## Enabling Location Tracking

Location Tracking via mParticle and Appboy must be enabled through the integration steps included in this [section of the mParticle documentation][3].

## News Feed Customization & Integration

In addition to using the embedded SDK, you must also integrate the news-feed directly into your application as it functions as a rich message inbox for users that updates in real time based upon the segments they're a member of. For directions on integrating the news-feed, see our [iOS][4] and [Android][5] documentation.

[2]: http://docs.mparticle.com/?java#push-notifications
[3]: http://docs.mparticle.com/#location-tracking
[4]: /Enabling_Message_Channels/The_News_Feed/iOS
[5]: /Enabling_Message_Channels/The_News_Feed/Android_and_FireOS
[6]: http://docs.mparticle.com/#appboy
[10]: https://www.mparticle.com/
