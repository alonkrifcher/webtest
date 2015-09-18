---
title: News Feed
platform: Windows
subplatform: Universal
---
# News Feed

The News Feed is a fully customizable in-app content feed for your users. Our targeting and segmentation allows you to create a stream of content that is individually catered to the interests of each user. Depending on their position in the user life cycle and the nature of your app, this could be an on-boarding content server, an advertisement center, an achievement center, or a generic news center.

__Time Estimate: 10 Minutes__

## Example News Feed

![Example Feed][2]

## Integrating the Windows News Feed

To integrate the Appboy News Feed into your app you will be utilizing our UI library integration:

### Step 1: Reference the UI Library in your page's root xml tag

Add `xmlns:appboy="clr-namespace:AppboyUI.Phone.Controls;assembly=AppboyUI.Phone"` as an attribute on your page's root xml tag.

### Step 2: Add the following to your page's .xaml

```xml
<appboy:Feed/>
```

#### Defining a News Feed Category

Instances of the Appboy News Feed can be configured to only receive cards from a certain "category". This allows for effective integration of multiple news feed streams within a single application. For more information on this feature see [Appboy Academy][40]

To support categories, Appboy has the Enum: CardCategory (AppboyPlatform.PCL.Models.Incoming.Cards).

- CardCategory Enum Values
  - ADVERTISING
  - ANNOUNCEMENTS
  - NEWS
  - SOCIAL
  - ALL (All Categories)
  - NO_CATEGORY (No Categories)

Categories can be controlled from within the UI library dynamically using the methods `SetCategory()` and `SetCategories()` on the feed control.

The `InitialCategory` field on the Appboy Feed object allows you to filter feeds to display one or more categories of cards:

```xaml
<appboy:Feed Name="AppboyFeed" InitialCategory="Social" Grid.Row="1" Margin="0,80,0,80" Width="400" HorizontalAlignment="Center"/>
```

**Implementation Example**

See the following [`FeedPage.xaml` file in our Windows Sample Application][1]

## Theming the Windows News Feed UI

You can customize the user interface to fit your app by overriding the default styles in `AppboyStyles.xaml` within the root directory of your project. The default styles for all of the UI controls are defined in the [`AppboyUI.Store` project](https://github.com/Appboy/appboy-windows-store-ui) in the [`/Styles/Default.xaml` file](https://github.com/Appboy/appboy-windows-store-ui/blob/master/Assets/Styles/Default.xaml). To override a default style, copy over the style element and one or more of the properties to your AppboyStyles.xaml file in the root directory of your app.

A modal version of the Appboy News Feed was also added to the UI library (`ModalFeed`)
  - If the `FeedModal` is set on the `SlideupManager`, slideup with `ClickAction` set to `NEWS_FEED` will open the modal news feed.
  - See our [In-App Messaging (slideup) documentation for additional details][7].

### Example Change - Changing the Slideup Border Color to RED

```xml
<Style x:Key="Appboy.Slideup.Border" TargetType="Border">
  <Setter Property="BorderBrush" Value="#ff0000"/>
  <Setter Property="BorderThickness" Value="1"/>
</Style>
```

**Implementation Example**

See the following [`AppboyStyles.xaml` file in our Windows Sample Application][3]

[1]: https://github.com/Appboy/appboy-windows-samples/blob/master/Universal/Pages/FeedPage.xaml "Windows Universal Sample Implementation") and [`FeedPage.xaml.cs` file in our Windows Sample Application](https://github.com/Appboy/appboy-windows-samples/blob/master/Universal/Pages/FeedPage.xaml.cs "Windows Universal Sample Implementation"
[2]: /assets/img/UONewsFeed.png
[3]: https://github.com/Appboy/appboy-windows-samples/blob/master/Universal/AppboyTestApps.Universal.Shared/AppboyStyles.xaml "Windows Universal Sample Implementation"
[6]: /assets/img/sample_news_feed.png
[7]: /Windows/Universal/#in-app-messaging
