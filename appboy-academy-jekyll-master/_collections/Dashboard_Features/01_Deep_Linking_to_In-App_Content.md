---
title: Deep-Linking to In-App Content
---
# Deep-Linking to In-App Content

## What is Deep-Linking?

Deep linking is a way of launching a native app and providing additional information telling it do some specific action or show specific content.

There are three parts to this:

- Identify which app to launch
- Instruct the app which action to perform
- Provide the action with any additional data it will need

Deep links are custom URIs that link to a specific part of the app and contain all of the above parts. The key is defining a custom scheme. "http:" is the scheme with which almost everyone is familiar but schemes can begin with any word. A scheme must start with a letter, but can then contain letters, numbers, plus-signs, minus-signs or dots. Practically speaking, there is no central registry to prevent conflicts, so it is a best practice to include your domain name in the scheme. For example, "twitter://" is the iOS URI to launch Twitter's mobile app.

Everything after the colon within a deep link is free-form text. It is up to you to define its structure and interpretation, however, a common convention is to model it after "http:" urls, including a leading "//" and query parameters (e.g. "?foo=1&bar=2"). For the Twitter example, "twitter://user?screen_name=[id]" would be utilized to launch a specific profile in the app.

These deep links are a powerful tool when used in tandem with the Appboy News Feed. Providing deep links as the URI within News Feed items allows you to utilize the News Feed as an individualized navigation tool to direct users to content inside in your app. They can also be utilized to direct users from [push notifications][1] and in-app messages to relevant app sections and content.

Keep in mind that enabling these deep links requires some additional setup within your app. Please reference our documentation [here][2] to understand the requirements for implementation.

[1]: https://documentation.appboy.com/Enabling_Message_Channels/Push_Notifications/iOS
[2]: https://documentation.appboy.com/Advanced_Use_Cases/Deep_Linking_to_In-App_Resources/iOS
