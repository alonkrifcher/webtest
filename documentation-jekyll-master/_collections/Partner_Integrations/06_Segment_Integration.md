---
title: Segment Integration
---
# Segment Integration

Appboy is dedicated to creating partner integrations that allow you to send data from multiple sources to your Dashboard. [Segment][10] is an analytics data hub that allows you to track your users and route that data to a wide variety of user analytics providers, such as Appboy. We offer a server-to-server [integration][11] so that with one simple click you can immediately start building richer user profiles.

## Getting Started

Once the Segment library is [integrated with your server][6], toggle Appboy on in your [Segment integrations][7], and add your App Group Identifier which you can find in the Appboy Dashboard in your [Developer Console][8].

Appboy supports the _identify_, _track_, and _group_ methods.

## Identify

When you _identify_ a user, we will record information for that user with `userId` as the External User ID. Segment's special traits recognized as Appboy's standard user profile fields (in parentheses) are `firstName` (`first_name`), `lastName` (`last_name`), `birthday` (`dob`), `avatar` (`image_url`), `address.city` (`home_city`), `address.country` (`country`), and `gender` (`gender`). All other traits will be recorded as [custom attributes][14].

## Track

When you _track_ an event, we will record that event as a [custom event][13] using the name provided.

### Completed Order

When you _track_ an event with the name `Completed Order` using the format described in Segment's [ECommerce API][9], we will record the products you've listed as [purchases][12].

## Group

When you call _group_, we will record a custom attribute with the name `ab_segment_group_<groupId>`, where `groupId` is the group's ID in the method's parameters. For example, if the group's ID is `1234`, then the custom attribute name will be `ab_segment_group_1234`. The value of the custom attribute will be set to true.

[6]: https://segment.com/docs/
[7]: https://segment.com/integrations/
[8]: https://dashboard.appboy.com/app_settings/api_settings/
[9]: https://segment.com/docs/spec/ecommerce/
[10]: https://segment.com
[11]: https://segment.com/docs/integrations/appboy/
[12]: https://documentation.appboy.com/User_Data_Collection/Best_Practices#revenue
[13]: https://documentation.appboy.com/User_Data_Collection/Best_Practices#overview
[14]: https://documentation.appboy.com/User_Data_Collection/Best_Practices#attributeoverview
