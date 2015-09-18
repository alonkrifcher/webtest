---
title: In-App Messages
---
# In-App Messages

## Message Types {#in-app-message-types}

With the ability to leverage multiple in-app message formats, you can now choose a layout that best suits your content and campaign goal. Because these formats look and interact with your users differently, they are best suited for different use cases. Here’s some guidelines and ideas to help you choose the right message type:

### Full-Screen
These are the most engaging, but also the most intrusive since they cover your user’s entire screen. They are great for displaying large, rich images, and can be useful in conveying very important information, such as crucial new features and expiring promotions. Since they are more disruptive of the user experience, use these sparingly for top priority content.

![Full-Screen Message][10]

#### Customizable Features

- Header and body text
- A large image
- Up to two call to action buttons with separate on click behavior and deep links
- Different colors for the header and body text, buttons and background
- Key/value pairs

### Modal
These messages aren’t as intrusive as full-screen messages, as they still allow users to see part of your app’s UI. Since they still contain buttons and images, modal messages may be a better option than slideups if you desire a more interactive, visual campaign. These are great for medium priority content, such as app updates and non-urgent deals and events.

![Modal Message][11]

#### Customizable Features

- Header and body text
- An image or customizable badge icon
- Up to two call to action buttons with separate on click behavior and deep links
- Different colors for the header and body text, buttons and background
- Key/value pairs

### Traditional Slideup
These are the least intrusive message type, though they can be more or less attention-grabbing depending on your usage of colors and badge icons. This may be the message format to use when onboarding new users and directing them towards particular in-app features, as they don’t pause the app experience and allow for continuous exploration.

![Slideup Message][12]

#### Customizable Features

- Body text
- A customizable badge icon
- Different colors for slideup background, text and icon
- Message close behavior
- Slideup position (top or bottom of the app screen)
- Key/value pairs

## In-App Message Behavior

### How to Create an In-App Message

In-app messages are created on the dashboard in 3 ways: (1) messaging campaigns, (2) attached to news items and (3) the Messaging API.

### In-App Message Delivery Rules

The in-app message's default behavior is to trigger at the beginning of the session, unless it has been customized to display at a different time. If you send an in-app message to a user while he is using the app, then the user will see the in-app message the next time he begins a session.

__Note__: A new session is also defined as when a new user logs in and the app changes the user ID.  Therefore, a user may receive in-app messages targeted at them upon logging in.

The most recently sent in-app message will always display first. Messages created as campaigns or via the API will not be displayed if a more recent message overrides it.

In-app messages triggered from the news feed will display the most recently published message as long as the corresponding card remains unread.

#### Delivery on First Session

In-app messages *cannot* be delivered during the user's first session. New messages are received at the beginning of each session and in the case of the first session the user does not yet exist in Appboy. Therefore, they're not eligible for any campaigns until after data is flushed for the first time.

#### Segment Membership at Time of Message Delivery

[Segment membership][7] updates when new session data has been processed for a user. Since the in-app message is delivered at the beginning of a session, changes to users' profiles and therefore their segments that occur at the beginning of the session may not update until after the message delivery.

Keep this in mind when composing content and targeting the in-app message. For example, a message targeted at users on an old version of the app may appear during their first session with the new version because their segment membership has not yet been updated.

### Example Scenario

- News feed card 1 and message sent on January 1st
- News feed card 2 and message sent on January 2nd
- Campaign 1 sent on January 3rd

When the user opens the app on January 4th, the in-app message for Campaign 1 will display. On January 5th, the user opens the app again and has not viewed cards 1 or 2. The in-app message for card 2 will display. The user then clicks on the message and views both cards 1 and 2. The next time the user opens the app, they'll have no in-app messages.

## Use Cases {#in-app-use-cases}

Simple and quick no-action-required messages are best sent via in-app messages.

### Examples

- Quick tour of new app features.
- Welcoming users back after a long absence.
- Reminding users of where they left off in a given game.
- Quick announcements (e.g., "Patriots are Super Bowl Champions!")
- Personalized, thoughtful notices (“Merry Christmas,” “Happy Birthday” etc.)

### Asynchronous Messaging

If you send multiple in-app messages to your user's device, the Appboy SDK will, by default, deliver these messages to your user in reverse chronological order (i.e. the most recently sent messages will be displayed first). If you wish to cue certain in-app messages to appear at specific locations within your app, refer to the methods on Manually Cueing In-App Message Display for [iOS][8] and [Android][9] detailed in our documentation. These instructions will allow you to choose exactly when your in-app message will be displayed for your user.

### Message Duration

For in-app messages, duration length is 50 milliseconds per character, with a minimum of 5000 milliseconds (i.e. 5 seconds). Given that we support messages of up to 140 characters, the maximum in-app message duration is 7 seconds.

## Best Practices {#in-app-best-practices}

- This type of message is best for users who regularly visiting your app, as your audience will only see the greeting when the app is opened.
- Compared to an email correspondence or News Feed card, an in-app message generally appears for a set amount of time, so the text should be concise.
- They can be particularly effective in driving feature discovery, encouraging and rewarding discovery or upselling via in-app purchases.
- Add [protocol URLs][1] to direct your audience to another part of your app and personalize their experience.
- For in-app messages containing an image, Appboy improves load times by using a global CDN to host the image.

[1]: /Deep_Dives/Deep_Linking_to_In-App_Content
[5]: /assets/img/inappexample.png
[7]: https://documentation.appboy.com/Frequently_Asked_Questions#when-segment-calc
[8]: https://documentation.appboy.com/Enabling_Message_Channels/In-App_Messages/iOS#manual-cue
[9]: https://documentation.appboy.com/Enabling_Message_Channels/In-App_Messages/Android_and_FireOS#slideup-manual-cue
[10]: /assets/img/FullscreenImagePreview.png
[11]: /assets/img/ModalImagePreview.png
[12]: /assets/img/SlideupImagePreview.png
