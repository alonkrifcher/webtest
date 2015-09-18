---
title: News Feed
platform: Android and FireOS
---
# News Feed

The News Feed is a fully customizable in-app content feed for your users. Our targeting and segmentation allows you to create a stream of content that is individually catered to the interests of each user. Depending on their position in the user life cycle and the nature of your app, this could be an on-boarding content server, an advertisement center, an achievement center, or a generic news center.

__Time Estimate: 10 Minutes__

## Example News Feed

![Sample News Feed][23]

## News Feed Integration Overview

In Android, the news feed and feedback form are implemented as [Fragments][2] that are available in the Appboy Android UI project. View [Google's documentation on Fragments][3] for information on how to add a Fragment to an Activity.

__Note:__ The Android UI Fragments do not automatically track session analytics. To ensure that sessions are tracked correctly, you should call `IAppboy.openSession()` when your app is opened (learn more about [tracking user sessions][4]).

The `AppboyFeedFragment` class will automatically refresh and display the contents of the news feed and log usage analytics. The cards that can appear in a user's news feed are set on the Appboy dashboard.

Linking to the news feed from an in-app message must be enabled by registering the `AppboyFeedActivity` within your [AndroidManifest.xml][28] file.

**Implementation Example**

See [`DroidBoyActivity.java`][5] in the Droidboy sample app.

## News Feed Customization

### Default Styling

The Appboy UI elements (the feedback form and news feed) come with a default look and feel that matches the Android standard UI guidelines and provides a seamless experience. You can see these default styles in the `res/values/style.xml` file in the Appboy SDK distribution.

```xml
  <style name="Appboy"/>
  <!-- Feedback -->
  <style name="Appboy.Feedback"/>
  <style name="Appboy.Feedback.Layout"/>
  <style name="Appboy.Feedback.NavigationBar">
    <item name="android:padding">4dp</item>
    <item name="android:background">@color/com_appboy_feedback_form_navigation_bar_background</item>
  </style>
  <style name="Appboy.Feedback.NavigationBarCancelButton">
    <item name="android:layout_marginRight">2dp</item>
    <item name="android:text">@string/com_appboy_feedback_form_cancel</item>
    <item name="android:textStyle">bold</item>
  </style>
```

### Overriding Styles

If you would prefer, you can override these styles to create a look and feel that better suits your app. To override a style, copy it in its entirety to the `styles.xml` file in your own project and make modifications. The whole style must be copied over to your local `styles.xml` file in order for all of the attributes to be correctly set.

#### Correct Style Override

```xml
<style name="Appboy.Feed.List">
  <item name="android:background">@color/mint</item>
  <item name="android:cacheColorHint">@color/mint</item>
  <item name="android:divider">@android:color/transparent</item>
  <item name="android:dividerHeight">16.0dp</item>
  <item name="android:paddingLeft">12.5dp</item>
  <item name="android:paddingRight">5.0dp</item>
  <item name="android:scrollbarStyle">outsideInset</item>
</style>
```

#### Incorrect Style Override

```xml
<style name="Appboy.Feed.List">
  <item name="android:background">@color/mint</item>
  <item name="android:cacheColorHint">@color/mint</item>
</style>
```

### Feed Style Elements

Below is a description of the themable Appboy UI elements and their names for styling purposes:

![Android Feed][18]
![Android Cards][19]
![Android Empty][20]
![Android Network Error][21]

## Categories

### Defining a News Feed Category

Instances of the Appboy News Feed can be configured to only receive cards from a certain “category”. This allows for effective integration of multiple news feed streams within a single application. For more information on this feature see [Appboy Academy][14]

News Feed Categories can be defined by calling the following methods as you load the News Feed:

```xml
newsFeed.setCategories(CardCategory.ALL_CATEGORIES);
newsFeed.setCategories(CardCategory.ADVERTISING);
newsFeed.setCategories(CardCategory.ANNOUNCEMENTS);
newsFeed.setCategories(CardCategory.NEWS);
newsFeed.setCategories(CardCategory.SOCIAL);
newsFeed.setCategories(CardCategory.NO_CATEGORY);
```

You can also populate a feed with a combination of categories as in the following example:

```xml
newsFeed.setCategories:EnumSet.of(CardCategory.ANNOUNCEMENTS, CardCategory.NEWS);
```

## Read/Unread Indicators

Appboy allows you to optionally toggle on an Unread/Read indicator on news feed cards as pictured below:

![UnreadvsRead][25]

### Enabling the Indicators

In order to enable this functionality add the following line to your `appboy.xml` file:

```xml
<bool name="com_appboy_newsfeed_unread_visual_indicator_on">true</bool>
```

### Customizing the Indicators
These indicators can be customized by altering the values in [android-sdk-ui/src/main/res/drawable-hdpi/icon_unread.png][26] and [android-sdk-ui/src/main/res/drawable-hdpi/icon_read.png][27].

## Card Types
Appboy has 5 unique news feed card types which share a base model. Each card type also has additional card-specific properties which are listed below.

#### Base Card

The [Base Card][29] model provides foundational behavior for all cards.  

- `getId()` - returns the card’s ID set by Appboy
- `getViewed()` - returns a boolean reflects if the card is read or unread by the user
- `getExtras()` - returns a map of key-value extras for this card
- `setViewed(boolean)` - sets a card's viewed field
- `getCreated()` - returns the unix timestamp of the card’s creation time from Appboy dashboard
- `getUpdated()` - returns the unix timestamp of the card’s latest update time from Appboy dashboard
- `getCategories()` - returns the list of categories assigned to the card, cards without a category will be assigned ABKCardCategoryNoCategory
- `isInCategorySet(EnumSet)` - returns true if the card belongs to the given category set

#### Banner Image Card
[Banner Image Cards][30] are clickable full-sized images. In addition to the base card properties:

- `getImageUrl()` - returns the URL of the card’s image
- `getUrl()` - returns the URL that will be opened after the card is clicked on. It can be a http(s) URL or a protocol URL
- `getDomain()` - returns link text for the property url.

#### Captioned Image Card
[Captioned Image Cards][31] are clickable full-sized images with accompanying descriptive text. In addition to the base card properties:

- `getImageUrl()` - returns the URL of the card’s image
- `getTitle()` - returns the title text for the card
- `getDescription()` - returns the body text for the card
- `getUrl()` - returns the URL that will be opened after the card is clicked on. It can be a http(s) URL or a protocol URL
- `getDomain()` - returns the link text for the property url.

#### Text Announcement Card (Captioned Image without Image)
[Text Announcement Cards][32] are clickable cards containing descriptive text. In addition to the base card properties:

- `getTitle()` - returns the title text for the card
- `getDescription()` - returns the body text for the card
- `getUrl()` - returns the URL that will be opened after the card is clicked on. It can be a http(s) URL or a protocol URL
- `getDomain()` - returns the link text for the property url.

#### Short News Card
[Short News Cards][33] are clickable cards with images and accompanying descriptive text.  In addition to the base card properties:

- `getImageUrl()` - returns the URL of the card’s image
- `getTitle()` - returns the title text for the card
- `getDescription()` - returns the body text for the card
- `getUrl()` - returns the URL that will be opened after the card is clicked on. It can be a http(s) URL or a protocol URL
- `getDomain()` - returns the link text for the property url.

#### Cross Promotion Small Card
[Cross-Promotion Small Cards][34] link to items in the Google Play Store or Kindle Store. In addition to the base card properties:

- `getTitle()` - returns the title text for the card. This will be the promoted item’s name.
- `getSubtitle()` - returns the text of the category of the promoted item
- `getImageUrl()` - returns property is the URL of the card’s image.
- `getPackage()` - reutrns the package name of the promoted item.
- `getRating()` - returns the rating of the promoted app. This property will be 0.0 unless the promoted item is an app, in which case the rating will be in the range of [0.0, 5.0];
- `getPrice()` - returns the price of the promoted app.
- `getReviewCount()` - returns the number of reviews of the promoted app. This property will be 0 unless the promoted item is an app.
- `getCaption()` - returns the text that will be displayed in the tag on the top of the small cross promotion card.
- `getUrl()` - returns the url of the promoted item which leads to the item’s App Store page.

### Adding a Badge

You can request the number of unread cards at any time by calling:

```java
getUnreadCardCount()
```

See the [Javadoc][17] for more information.

### Refreshing the Feed

You can queue a manual refresh of the Appboy News Feed at any time by calling:

```java
requestFeedRefresh()
```

See the [Javadoc][16] for more information.

### Key/Value Pairs
`Card` objects may optionally carry key value pairs as `extras`. These can be used to send data down along with a `Card` for further handling by the application.

Call the following on a `Card` object to retrieve its extras:

```java
Map<String, String> getExtras()
```

See the [Javadoc][36] for more information.

[1]: /assets/img/UONewsFeed.png
[2]: http://developer.android.com/guide/components/fragments.html
[3]: http://developer.android.com/guide/components/fragments.html#Adding "Android Documentation: Fragments"
[4]: /SDK_Integration/Android_and_FireOS
[5]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/DroidBoyActivity.java
[14]: https://academy.appboy.com/Deep_Dives/News_Feed_Categories
[16]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/Appboy.html#requestFeedRefresh()
[17]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/events/FeedUpdatedEvent.html#getUnreadCardCount()
[18]: /assets/img/Image27Theming.png "Android Feed"
[19]: /assets/img/Image28Theming.png "Android Cards"
[20]: /assets/img/Image29Theming.png "Android Empty"
[21]: /assets/img/Image30Theming.png "Android Network Error"
[22]: /assets/img/sample_news_feed.png
[23]: /assets/img/android_news_feed.png
[25]: /assets/img/UnreadvsReadNewsFeedCard.png
[26]: https://github.com/Appboy/appboy-android-sdk/blob/master/android-sdk-ui/res/drawable-hdpi/icon_unread.png
[27]: https://github.com/Appboy/appboy-android-sdk/blob/master/android-sdk-ui/res/drawable-hdpi/icon_read.png
[28]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/AndroidManifest.xml "AndroidManifest.xml"
[29]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/models/cards/Card.html
[30]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/models/cards/BannerImageCard.html
[31]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/models/cards/CaptionedImageCard.html
[32]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/models/cards/TextAnnouncementCard.html
[33]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/models/cards/ShortNewsCard.html
[34]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/models/cards/CrossPromotionSmallCard.html
[36]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/models/cards/Card.html#getExtras()
