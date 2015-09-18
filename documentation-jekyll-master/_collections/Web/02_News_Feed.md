---
title: News Feed
platform: Web
---
# News Feed

The News Feed is a fully customizable in-app content feed for your users. Our targeting and segmentation allows you to create a stream of content that is individually catered to the interests of each user. Depending on their position in the user life cycle and the nature of your app, this could be an on-boarding content server, an advertisement center, an achievement center, or a generic news center.

__Time Estimate: 10 Minutes__

### Example News Feed:

<img src="/assets/img/WebNewsFeed.png" alt="Sample News Feed" height="600" />

## News Feed Integration

To display the news feed through the Appboy Web SDK, simply call

``` javascript
appboy.display.showFeed();
```

This will display the most recent cached news feed cards (kicking off a refresh if these cards are more than 1 minute stale, or if the news feed has never been refreshed) and will automatically update the display when new cards are received from Appboy servers for as long as it's on the screen.

By default, the feed will be shown in a fixed-position sidebar on the right-hand side of the website (or as a full-screen overlay on mobile devices, through responsive css). If you wish to override this behavior and display a statically positioned news feed inside your own parent element, simply provide this element as the first argument to showFeed, for instance:

``` javascript
appboy.display.showFeed(document.getElementById('my-news-feed-parent'));
```

If you wish to display a specific static set of news feed cards, filter the cards from the server, or provide your own refresh semantics, you can disable automatic updating and supply your own cards. For instance:

``` javascript
appboy.subscribeToFeedUpdates(function(feed) {
  var cards = feed.cards;
  appboy.showFeed(undefined, cards);
});
appboy.requestFeedRefresh();
```

See the [JSDocs][2] for full `showFeed` documentation.

## News Feed Customization

Appboy UI elements come with a default look and feel that matches the composers within the Appboy Dashboard and aims for consistency with other Appboy mobile platforms. Appboy's default styles are defined in CSS within `appboy.min.css`. By overriding selected styles in your application, it is possible to customize our standard feed with your own background images, font families, styles, sizes, animations, and more. For instance, the following is an example override that will cause the news feed to appear 800px wide:

``` css
.ab-feed {
  width: 800px;
}
.ab-feed .ab-card {
  width: auto;
}
.ab-feed .ab-card .ab-image-area img {
  width: 100%;
  height: auto;
}
```

## Categories

Instances of the Appboy News Feed can be configured to only receive cards from a certain “category”. This allows for effective integration of multiple news feed streams within a single application. For more information on this feature see [Appboy Academy][14]

News Feed Categories can be defined by providing the third "allowedCategories" parameter to `showFeed`:

``` javascript
appboy.display.showFeed(undefined, undefined, [appboy.ab.Card.Category.NEWS]);
```

You can also populate a feed with a combination of categories as in the following example:

``` javascript
appboy.display.showFeed(undefined, undefined, [appboy.ab.Card.Category.ANNOUNCEMENTS, appboy.ab.Card.Category.NEWS]);
```

## Read/Unread Indicators

Appboy provides an Unread/Read indicator on news feed cards as pictured below:

![UnreadvsRead][25]

### Disabling the Indicators

In order to disable this functionality add the following style to your css:

``` css
.ab-read-dot { display: none; }
.ab-read-indicator { display: none; }
```

## Card Types
The Appboy Web SDK supports 3 unique news feed card types, [ab.ClassicCard][3], [ab.Banner][4], [ab.CaptionedImage][5] which share a base model, [ab.Card][1].

### Requesting Unread Card Count

You can request the number of unread cards at any time by calling:

``` javascript
appboy.getCachedFeed().getUnreadCardCount();
```

This is often used to power badges signifying how many unread news-feed cards there are. See the [JSDocs][17] for more information. Note that Appboy will not refresh news feed cards on new page loads (and so this function will return 0) until you show the feed or call `appboy.requestFeedRefresh();`

### Key/Value Pairs
`ab.Card` objects may optionally carry key value pairs as `extras`. These can be used to send data down along with a card for further handling by the application.  Simply call `card.extras` to access these values.

See the JSDocs for [ab.ClassicCard][3], [ab.Banner][4], or [ab.CaptionedImage][5] for more information.

[1]: https://js.appboycdn.com/web-sdk/latest/doc/ab.Card.html
[2]: https://js.appboycdn.com/web-sdk/latest/doc/module-display.html#.showFeed
[3]: https://js.appboycdn.com/web-sdk/latest/doc/ab.ClassicCard.html
[4]: https://js.appboycdn.com/web-sdk/latest/doc/ab.Banner.html
[5]: https://js.appboycdn.com/web-sdk/latest/doc/ab.CaptionedImage.html
[14]: https://academy.appboy.com/Deep_Dives/News_Feed_Categories
[17]: https://js.appboycdn.com/web-sdk/latest/doc/ab.Feed.html
[25]: /assets/img/UnreadvsReadNewsFeedCard.png
