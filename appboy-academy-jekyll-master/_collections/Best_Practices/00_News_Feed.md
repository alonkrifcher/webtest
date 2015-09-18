---
title: News Feed
---
# News Feed

The Appboy News Feed is a targeted, dynamic stream of rich content. It offers a powerful way to reach users with continuously updated content that does not require additional development work. The feed includes the ability to deep link within the app, link directly to the App Store, Google Play etc. or direct users to a web view.

![imagenewsfeed][1]

__Note__: This unique Appboy UI element must be enabled during [integration][2]. Make sure to discuss it with your developers.

## News Feed Cards

News Feed cards allow a non-technical marketer to provide new content to a user in-app on a daily basis. This content can be targeted at various segments and scheduled in exactly the same way as other Appboy messages. Each card consists of a title, short summary, an image and optionally a URL.

__Note__: Appboy improves load times by using a global CDN to host all News feed images.

### Standard News Feed Cards

#### Classic Cards

![newsfeed2][3]

Standard news feed cards consist of:

- 110x110 image
- Title
- Body Text
- Link (In-App/Web)

#### Captioned Image Cards

![newsfeed][4]

Captioned Image cards consist of:

- 600x450 image
- Title
- Body Text
- Link (In-App/Web)

#### Banner Cards

![NewsFeedBanner][5]

Banner cards consist of:

- 600x100 image
- Link (In-App/Web)

#### Cross Promotions Cards

![crosspromo][6]

Cross promotion cards consist of:

- Cross Promoted App Advertisement
  - __Note__:You may not advertise apps which are the property of companies other than your own.

## News Feed Ordering

- Cards in the feed are ordered first by whether or not they have been seen by the user, unseen items are at the top of the feed.
  - A card is considered read if it has received an impression in the feed.
  - Impressions are only counted if the card is viewable in the feed (ie, if a user does not scroll down to read a card, an impression is not counted).
- Cards are then ordered by the date and time of creation, where more recent items are first.

## Use Cases {#news-feed-use-cases}

- Advertising app updates
- "Drip Marketing" Welcome Campaigns
- Teasing out a user's willingness to pay.
  - Offering a schedule of steadily increasing discounts using targeted News Feed cards can help you see exactly how much your service is worth to different user segments.
- Achievements and badges
  - When a user completes a noteworthy task or takes a desired action after being targeted by a marketing campaign, you can isolate that segment in order to recognize their accomplishment with a News Feed card.
    - You might even want to tie a specific reward to this acknowledgement such as an in-app discount.
- Prompting users to share to various social networks.
Highlighting other apps or content your company has created via [cross-promotion][7] cards.
- ["Deep-linking"][8]
  - You can use protocol URLs to point users at any resource housed within your app.
  - For example, a video messaging app might want to have a News Feed card point at a video that is elsewhere within the app.
  - You could even potentially use this to design your entire app navigation scheme around our News Feed!

## Best Practices {#news-feed-best-practices}

- Use the News Feed to help make your app feel dynamic and regularly updated by showcasing new content.
- Provide announcements that encourage interaction, highlight news and promote sales.
- Take advantage of the visual space by incorporating images and graphics that stand out.
- Customize the News Feed to reflect your brand’s identity and create a seamless app experience.
- Keep in mind that targeted modules can immediately inspire action within the app, and protocol URLs can direct attention to different section of the app, encouraging specific behavior like reviews, purchases and more.
- Develop a schedule for campaigns like onboarding etc., and determine the proper cadence and frequency of messaging.
- Diversify the type of templated card announcements to keep the News Feed interesting
- Strengthen and reinforce campaigns by integrating other multi-channel messages in the News Feed
- Segment users and tailor certain announcements to inspire specific action.

### Feed Impression Segments

Appboy automatically tracks when users view the feed and how many times they have viewed it. There are two filters available:

- Last Viewed News Feed
- News Feed View Count

'Last Viewed News Feed' is an effective way to use other channels to draw users back into the feed. This can be easily done with push and in-app notifications. Appboy has seen over 100% increases in news feed impressions with effective targeting. As awareness of the feed increases, these benefits are sustained.

'News Feed View Count' can be used to target users who have never viewed the feed or seldom viewed the feed to encourage more impressions of your cards.

Consider, using these filters in tandem or with other filters to create an even more targeted call to action.

### Clicked Card Segments

You can create segments based on how users have interacted with specific cards in the feed. The filter is in the Retargeting section of the filter list and called Clicked Card.

#### Has Clicked Card

- Works well to retarget users who have clicked on a card, but not followed through on your call to action.
- It is also useful to retarget users with related content that may of interest to them.

#### Has Not Clicked Card

- This version of the filter can be used to automatically remove cards from a user's feed after they click the card.
  - To set this up, after you create a card go back and edit the target segment to include 'Has not clicked YOUR NEW CARD'.
  - After a user clicks the card, the card will automatically leave the feed when the user's next session starts.
  - Avoid over-using this targeting because user's may end up with empty feeds. Best practice is to use a combination of static and automatically removed content.
- It also works well to retarget users who do not click on a card to follow up with another call to action.

![has not clicked card][14]

## Integration Example

![shapefeed][9]

Shape uses the News Feed to deliver relevant information to its users. The SDK integration remains entirely transparent: there is no mention of Appboy in the app itself and the News Feed module has a design aesthetic that is consistent with the rest of the app.

You can view more examples of News Feeds in our [Client Integration Gallery][18].


[1]: /assets/img/newsfeed10.png
[2]: https://documentation.appboy.com/Enabling_Message_Channels/The_News_Feed/iOS
[3]: /assets/img/classiccard.png
[4]: /assets/img/captionedimage.png
[5]: /assets/img/newsfeedbanner.png
[6]: /assets/img/crosspromo.png
[7]: https://blog.appboy.com/2014/01/cross-promote-to-grow-your-audience/
[8]: /Deep_Dives/Deep_Linking_to_In-App_Content
[9]: /assets/img/shapefeed.png
[14]: /assets/img/segment_hasnotclickedcard.png
[18]: https://academy.appboy.com/Best_Practices/Client_Integration_Gallery#news-feed
