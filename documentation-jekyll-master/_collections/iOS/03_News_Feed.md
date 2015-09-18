---
title: News Feed
platform: iOS
---
# News Feed

The News Feed is a fully customizable in-app content feed for your users. Our targeting and segmentation allows you to create a stream of content that is individually catered to the interests of each user. Depending on their position in the user life cycle and the nature of your app, this could be an on-boarding content server, an advertisement center, an achievement center, or a generic news center.

## Example News Feed: Urban Outfitters
![iOS ActivityFeed+FeedBack][10]

## News Feed Integration Overview
Integrating the ViewController `FeedViewController` will display the Appboy news feed.

You have a great deal of flexibility in how you choose to display the view controllers. There are several different versions of the view controllers to accommodate different navigation structures.

__Time Estimate: 10 Minutes__

__Note__: The News Feed that is called by the default behavior of the slideup on click will not respect any delegates that you set for the News Feed. If you want to respect that, you must define `slideupWasTapped`.See [Slideup Customization][11]

## News Feed View Controller Integration Options

The news feed can be integrated with 4 view controller contexts, either in code, or via a storyboard implementation.

### Generic Context -- ABKFeedViewControllerGenericContext

- The most basic type of `FeedViewController`, which can be used in:
  - A tab view
  - A master-detail view
  - Any other context where dismissal or navigation buttons are not needed

```objc
ABKFeedViewControllerGenericContext *genericFeed =
[[[ABKFeedViewControllerGenericContext alloc] init] autorelease];
```

### Navigation Context -- ABKFeedViewControllerNavigationContext

- You can set the instance's title and navigation items before pushing it into a navigation controller

```objc
ABKFeedViewControllerNavigationContext *navFeed =
[[[ABKFeedViewControllerNavigationContext alloc] init]
    autorelease];
```

### Modal Context -- ABKFeedViewControllerModalContext

- Used to present the view controller in a modal view, with a navigation bar on top and a Done button on the right side of the bar
- Set the modal's title via the `navigationBarTitle` property
- If a delegate __is NOT set__ the Done button will dismiss the modal view
- If a delegate __is set__ the Done button will call the delegate, and the delegate itself will be responsible for dismissing the view

```objc
ABKFeedViewControllerModalContext *modalFeed = [[[ABKFeedViewControllerModalContext alloc] init] autorelease];
[self presentViewController:modalFeed animated:YES completion:nil];
```

### Popover Context -- ABKFeedViewControllerPopoverContext

- Used when the view controller is presented in a popover, with a navigation bar on top and a "Done" button on the right side of the bar.
- You must implement a delegate to allow the "Done" button to dismiss the popover. Users can also dismiss the popover by clicking outside of the view. You can change the title by setting the `navigationBarTitle` property.

```objc
// Present a feedViewController in a popover
ABKFeedViewControllerPopoverContext *popoverFeed = [[[ABKFeedViewControllerPopoverContext alloc] init] autorelease];
// We want to be notified when either "Cancel" or "Send" is tapped.
popoverFeed.delegate = self;
self.feedpopoverController =
        [[[UIPopoverController alloc] initWithContentViewController:popoverFeed] autorelease];
```

__Note__: There are header files for `ABKFeedViewController`, `ABKFeedViewControllerContext`, and `ABKFeedbackViewController` in the AppboyKit folder. These are not meant to be instantiated directly -- use one of the context-specific view controllers listed above. The AppboySampleProject contains examples of each type of view controller in a storyboard. Refer to the [SDK documentation][12] for more information.

### Storyboard Implementation

The Appboy view controllers can also be integrated using Storyboards. Check out the [Stopwatch Sample App in the iOS SDK][13] for an example.
__Note__: These implementations must be viewed within XCode.

## News Feed View Controller Delegate (SDK v2.7+)

As of Appboy iOS SDK v2.7, there is a delegate method that allows you to customize the behavior after a card click action. This is useful for opening URLs in your own webview or mobile Safari.

```objc
- (BOOL) onCardClicked:(ABKCard *)clickedCard feedViewController:(UIViewController *)newsFeed;
```

You need to ensure that you assign the delegate object to the News Feed's Appboy delegate:

```objc
@property (assign, nonatomic) id<ABKFeedViewControllerDelegate> appboyDelegate;
```

For more information see [ABKFeedViewControllerDelegate.h][38]

### Defining a News Feed Category

Instances of the Appboy News Feed can be configured to only receive cards from a certain "category". This allows for effective integration of multiple news feed streams within a single application. For more information on this feature see [Appboy Academy][40]

News Feed Categories can be defined by calling the following methods as you load the News Feed:

```objc
[newsFeed setCategories:ABKCardCategoryAll];
[newsFeed setCategories:ABKCardCategoryAnnouncements];
[newsFeed setCategories:ABKCardCategoryAdvertising];
[newsFeed setCategories:ABKCardCategorySocial];
[newsFeed setCategories:ABKCardCategoryNews];
[newsFeed setCategories:ABKCardCategoryNoCategory];
```

You can also populate a feed with a combination of categories as in the following example:

```objc
[newsFeed setCategories:ABKCardCategoryAnnouncements|ABKCardCategoryAdvertising];
```

## Sample Code

Below are examples of how to integrate the Appboy view controllers into your app. We've included a one-button integration example so you can have one call to open the feedback view controller from within the stream view. This works well for apps migrating from V1 who would like to maintain their current interactions.

### One Button Integration - Modal View

```objc
ABKFeedViewControllerNavigationContext *streamModal = [[[ABKFeedViewControllerNavigationContext alloc] init]
    autorelease];
self.modalNavigationController = [[[UINavigationController alloc] initWithRootViewController:streamModal]
    autorelease];
UIBarButtonItem *feedbackBarButtonItem = [[[UIBarButtonItem alloc] initWithTitle:@"Feedback"
    style:UIBarButtonItemStyleBordered target:self action:@selector(openFeedbackFromModalFeed:)] autorelease];
streamModal.navigationItem.leftBarButtonItem = feedbackBarButtonItem;
UIBarButtonItem *closeButtonItem = [[[UIBarButtonItem alloc] initWithTitle:@"Close"
    style:UIBarButtonItemStyleBordered target:self action:@selector(closeModalNaviagationView:)] autorelease];
streamModal.navigationItem.rightBarButtonItem = closeButtonItem;
[self presentModalViewController:self.modalNavigationController animated:YES];
```

### One Button Integration -- Popover View

```objc
ABKFeedViewControllerNavigationContext *streamModal = [[[ABKFeedViewControllerNavigationContext alloc] init]
      autorelease];
self.popoverNavigationController = [[[UINavigationController alloc] initWithRootViewController:streamModal]
    autorelease];
self.popoverNavigationController.delegate = self;
UIBarButtonItem *feedbackBarButtonItem = [[[UIBarButtonItem alloc] initWithTitle:@"Feedback"
    style:UIBarButtonItemStyleBordered target:self action:@selector(openFeedbackFromModalFeed:)] autorelease];
streamModal.navigationItem.rightBarButtonItem = feedbackBarButtonItem;
self.streamPopover = [[[UIPopoverController alloc]
  initWithContentViewController:self.popoverNavigationController] autorelease];
```

### Popover View Animations

To improve the feedback form animations in the popover view, we recommend overriding the navigation controller delegate method. For example:

```objc
#pragma mark
    #pragma navigation controller delegate method
    - (void)navigationController:(UINavigationController *)navigationController didShowViewController:(
          UIViewController *)viewController animated:(BOOL)animated {
      if ([viewController isKindOfClass:[ABKFeedbackViewControllerNavigationContext class]]) {
        [UIView animateWithDuration:0.5 animations:^{
          viewController.contentSizeForViewInPopover = CGSizeMake(320, 300);
        }];
      }
    }
```

#### Implementation Examples

The `FeedViewControllerNavigationContext` and `FeedViewControllerPopoverContext` are utilized within the [`InitialViewController.m` file](https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Stopwatch/InitialViewController.m) within the Stopwatch Sample App.
For further details see the [`ABKFeedViewController` header files](https://github.com/Appboy/appboy-ios-sdk/tree/master/AppboyKit/headers/AppboyKitLibrary)
__Note__: You should only implement the `FeedViewController` using the contexts as outlined above. Never directly.

## Requesting Unread Card Count

![News Feed Badge Example][45]

Badges are a great way to call attention to new content awaiting your users in the News Feed. If you'd like to add a badge to your news feed, the Appboy SDK provides methods to query the following:

- Unread News Feed Cards for the current user
- Total Viewable News Feed Cards for the current user

The method declarations in [ABKFeedController][44] below describe this in detail

```objc
/*!
 * This method returns the number of currently active cards which have not been viewed in the given categories.
 * A "view" happens when a card becomes visible in the feed view.  This differentiates
 * between cards which are off-screen in the scrolling view, and those which
 * are on-screen; when a card scrolls onto the screen, it's counted as viewed.
 *
 * Cards are counted as viewed only once -- if a card scrolls off the screen and
 * back on, it's not re-counted.
 *
 * Cards are counted only once even if they appear in multiple feed views or across multiple devices.
 */
- (NSInteger) unreadCardCountForCategories:(ABKCardCategory)categories;

/*!
 * This method returns the total number of currently active cards belongs to given categories. Cards are
 * counted only once even if they appear in multiple feed views.
 */
- (NSInteger) cardCountForCategories:(ABKCardCategory)categories;
```

### Displaying Number of Unread News Feed Items on App Badge Count

![Badge Example][42]

In addition to serving as push notification reminders for an app, badges can also be utilized to denote unviewed items in the user's news feed. Updating the badge count based off unread news feed updates can be a valuable tool in attracting users back to your app and increasing sessions.

Call this method which records the badge count once the app is closed and the user's session ends.

```objc
(void)applicationDidEnterBackground:(UIApplication *)application
```

Within the above method, implement the following code which actively updates the badge count while the user views cards during a given session.

```objc
[UIApplication sharedApplication].applicationIconBadgeNumber = [[Appboy sharedInstance].feedController unreadCardCountForCategories:ABKCardCategoryAll];
```

For more information see the [`Appboy.h` header file][15] or a sample implementation of a badge in the [`TestingViewController.m` file within the Stopwatch sample project][31]

## Refreshing the News Feed (SDK v2.7+)

As of SDK v2.7, you can manually request Appboy to refresh the user's News Feed in `Appboy.h` using `- (void) requestFeedRefresh;`. For example:

```objc
[[Appboy sharedInstance] requestFeedRefresh];
```

For more information see the [`Appboy.h` header file][15]

## Theming the News Feed

Appboy's iOS SDK supports powerful theming options based on the NUI customization framework. NUI allows you customize almost everything about the look and feel of an app using style sheets similar to CSS.

Appboy has its own specific set of UI elements which must be customized independently from the rest of your app -- they do not inherit property settings from the standard NUI classes. This allows you to customize Appboy without affecting the rest of your app.

### Getting Started - Theming & NUI

To theme your app, integrate NUI into your project by adding `pod 'NUI'` in your Podfile, or follow [these instructions][23].

For swift, you need to Add `#import #NUISettings.h"` to your bridging header file.

**Objective-C**
Add this line to `- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions` in your `AppDelegate.m` file:

```objc
[NUISettings initWithStylesheet:@"Your_Theme"];
[Appboy sharedInstance].useNUITheming = YES;
```

**Swift**
Add this line to `application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool` in your `AppDelegate.swift` file:

```swift
NUISettings.initWithStylesheet("Your_Theme")
Appboy.sharedInstance().useNUITheming = true
```

NUI allows you to customize the behavior of many UI elements, such as labels, buttons, views, and text fields. For each component, there is a set of properties you can set via a style sheet -- `NUIStyle.nss` -- which you include in your project.

### Navigation Context Theming Guidelines

In navigation contexts, the navigation bar and its buttons cannot be themed using the Appboy NUI classes.  This limitation occurs because the navigation context view controller does not own its navigation bar when it is the child of a navigation context. Instead, properties of the navigation bar are set at the parent level.

There are two ways to theme the navigation bar and buttons in a navigation context:

- Programmatically set properties directly in the parent view controller
- Use standard NUI classes to theme all navigation bars in your app

#### General Warnings

- If you are using a navigation bar in a non-ARC app, ensure that your `NSNotificationCenter` removes it as an observer when it is released or deallocated.  NUI adds all navigation bars as an observer for the custom method `orientationDidChange`, so in a non-ARC app you will need to manually remove the observer. Otherwise, you will receive a SIGSEGV error that the notification center tried to post a notification to a released object.

```objc
[[NSNotificationCenter defaultCenter] removeObserver:yourNavigationBar];
```

- Due to a bug in how NUI parses the .nss file, setting text-shadow-offset to a single number, instead of two comma separated numbers, will cause a crash
- In iOS 6.1, if you do no customize `UIButton`, buttons will show up as just the title text with no background; in other words, customizing `UIButton` is mandatory if you use NUI.  
    - This issue is not related to Appboy;  this is a general problem with NUI
    - Put an entry for the `Button` style class in your `NUIStyle.nss` style sheet
    
      ```objc
      Button {
      background-color: #FFFFFF;
      corner-radius: 8;
      }
      ```

### Themable News Feed Elements

Subsequent sections have example UI screenshots of the feedback form and news feed. In the screenshots, all the customizable UI elements are pointed out with their custom classes. These class names are directly used in `NUIStyle.nss`. For the attributes that can be set for each class, please refer to the theming directory below.

![iOS NUI Cards][25]

#### Full List Customizable Elements & Associated Properties

| ABKFeedCloseBarButton |
| --------------------- |
| background-color |
| background-color-top/background-color-bottom |
| background-color-highlighted |
| background-image |
| background-image-insets |
| background-tint-color|
| border-color
| border-width |
| corner-radius |
| font-color  |
| font-name |
| font-size  |
| text-shadow-color  |
| text-shadow-offset  |

| ABKFeedBarButtonBack |
| -------------------- |
| font-name |
| font-color |
| font-size |
| background-image |
| background-image-insets |

| ABKFeedNavigationBar |
| -------------------- |
| bar-tint-color |
| font-color |
| font-name |
| font-size |
| text-shadow-color |
| text-shadow-offset |
| title-vertical-offset |
| background-tint-color |
| background-image |
| background-image-insets |

| ABKFeedBackgroundView |
| -------------------- |
| background-color |
| background-image |
| border-color |
| border-width |
| corner-radius |

| ABKFeedItemTabView |
| -------------------- |
| background-color |
| background-image |
| border-color |
| border-width |
| corner-radius |

| ABKFeedItemBackgroundView |
| ------------------------ |
| background-color  |
| background-image |
| shadow-color |
| shadow-opacity |
| border-color |
| border-width |
| corner-radius |
| width |

| ABKFeedItemTitleBackgroundView |
| ------------------------ |
| border-color |
| border-width |
| corner-radius |
| width |

| ABKFeedItemTabLabel |
| ------------------------ |
| background-color |
| border-color |
| border-width |
| corner-radius |
| font-color |
| font-name |
| font-size |
| text-align |
| text-alpha |
| text-shadow-color |
| text-shadow-offset |
| text-auto-fit |
| font-size |

| ABKFeedItemStaticLinkLabel |
| ------------------------ |
| background-color |
| border-color |
| border-width |
| corner-radius |
| font-color |
| font-name |
| font-size |
| text-align |
| text-alpha |
| text-shadow-color |
| text-shadow-offset |
| text-auto-fit |
| font-size |

| ABKFeedItemBodyLabel |
| ------------------------ |
| background-color |
| border-color |
| border-width |
| corner-radius |
| font-color |
| font-name |
| font-size |
| text-align |
| text-alpha |
| text-shadow-color |
| text-shadow-offset |
| text-auto-fit |
| font-size |

| ABKFeedItemTitleLabel |
| ------------------------ |
| background-color |
| border-color |
| border-width |
| corner-radius |
| font-color |
| font-name |
| font-size |
| text-align |
| text-alpha |
| text-shadow-color |
| text-shadow-offset |
| text-auto-fit |
| font-size |

| ABKFeedItemSubtitleLabel |
| ------------------------ |
| background-color |
| border-color |
| border-width |
| corner-radius |
| font-color |
| font-name |
| font-size |
| text-align |
| text-alpha |
| text-shadow-color |
| text-shadow-offset |
| text-auto-fit |
| font-size |

| ABKFeedItemPurchaseButton |
| ------------------------- |
| background-color-top/background-color-bottom |
| background-image |
| background-image-insets |
| background-image-highlighted |
| background-image-highlighted-insets |
| border-color |
| border-width |
| corner-radius |
| font-name |
| font-color |
| text-align |
| text-alpha |
| text-shadow-color |
| text-shadow-offset |

### Style Value Types

- Boolean - A boolean (`true` or `false`)
- BorderStyle - A border style, as rendered by a `UITextBorderStyle`. Accepted values are `none`, `line`, `bezel`, and `rounded`
- Box - A series of 1 to 4 integers that specify the widths of a box's edges. Interpreted like CSS's `padding` and `margin` properties (top, right, bottom, left). Examples:
  - `15` (a box with a width of 15 for each edge),
  - `10 15` (a box with a width of 10 for the top and bottom edges and 15 for the right and left edges)
- Color - A hex color (e.g. `#FF0000`), rgba, hsl, or hsla expression (e.g. `rgb(255,0,0)` or `hsla(0.5, 0, 1.0, 0.5)`); or a color name that `UIColor` has a related method name for (e.g. `red`, `yellow`, `clear`). If `[UIColor fooColor]` is supported, then `foo` is supported.
- FontName - A font name (see available values [here][27])
- Gradient - Two Colors that will create a vertical gradient. background-color-top and background-color-bottom need to be defined in separate .nss properties
- Image - A name of an image, as used in `[UIImage imageNamed:name]` (e.g. `MyImage.png`)
- Number - A number (e.g. `-1`, `4.5`)
- Offset - Two numbers comprising the horizontal and vertical values of an offset (e.g. `-1,1`)
- TextAlign - A text alignment (e.g. `left`, `right`, `center`)
- VerticalAlign - A vertical alignment (e.g. `top`, `center`, `bottom`, `fill`)

## Implementation Examples

See the [`Appdelegate.m` file][28] in the Stopwatch sample app.

Refer to the [`useNUITheming` documentation][29] for more information.

## News Feed Data Model (SDK v2.7+)

The News Feed data model is available in the iOS SDK as of v2.7.

If you want to change the card data after it's been sent by Appboy, we recommend storing (deep copy) the card data locally, updating the data and displaying yourself. The cards are accessible via [ABKFeedController][44]

### Base Card Model

Appboy has 5 unique card types that share a base model. Each type of card also has additional properties that are specific to each card which are listed below.

### Base Card Model Properties

- idString (read only) - The card's ID set by Appboy
- viewed - This property reflects if the card is read or unread by the user
- created (read only) - The property is the unix timestamp of the card's creation time from Appboy dashboard
- updated (read only) - The property is the unix timestamp of the card's latest update time from Appboy dashboard
- categories - The list of categories assigned to the card, cards without a category will be assigned `ABKCardCategoryNoCategory`
- extras - An optional NSDictionary of NSString values.

#### Categories (SDK v2.7+)

- `ABKCardCategoryNoCategory`
- `ABKCardCategoryNews`
- `ABKCardCategoryAdvertising`
- `ABKCardCategoryAnnouncements`
- `ABKCardCategorySocial`
- `ABKCardCategoryAll`

### Banner Properties
In addition to the base card properties:

- image (required) - This property is the URL of the card's image
- url (optional) - The URL that will be opened after the card is clicked on. It can be a http(s) URL or a protocol URL
- domain (optional) - The link text for the property url, like @"blog.appboy.com". It can be displayed on the card's UI to indicate the action/direction of clicking on the card, but is hidden in the default Appboy News Feed.

### Captioned Image Properties
In addition to the base card properties:

- image (required) - This property is the URL of the card's image
- title (required) - The title text for the card
- description (required) - The body text for the card
- url (optional) -The URL that will be opened after the card is clicked on. It can be a http(s) URL or a protocol URL
- domain (optional) - The link text for the property url, like @"blog.appboy.com". It can be displayed on the card's UI to indicate the action/direction of clicking on the card.

### Text Announcement (Captioned Image without Image) Properties
In addition to the base card properties:

- title (required) - The title text for the card
- description (required) - The body text for the card
- url (optional) -The URL that will be opened after the card is clicked on. It can be a http(s) URL or a protocol URL
- domain (optional) - The link text for the property url, like @"blog.appboy.com". It can be displayed on the card's UI to indicate the action/direction of clicking on the card.

### Classic Card Properties
In addition to the base card properties:

- image (required) - This property is the URL of the card's image
- title (optional) - The title text for the card
- description (required) - The body text for the card
- url (optional) -The URL that will be opened after the card is clicked on. It can be a http(s) URL or a protocol URL
- domain (optional) - The link text for the property url, like @"blog.appboy.com". It can be displayed on the card's UI to indicate the action/direction of clicking on the card.

### Cross Promotion (Small) Properties
In addition to the base card properties:

- mediaType - The type of iTunes media
    - ItunesAlbum
    - ItunesAudiobook
    - ItunesCompilation
    - ItunesEbook
    - ItunesFeatureMovie
    - ItunesPodcast
    - ItunesSoftware
    - ItunesSong
    - ItunesTvEpisode
    - ItunesTvSeason
- title - The title text for the card. This will be the promoted item's name.
- subtitle - The text of the category of the promoted item
- image - This property is the URL of the card's image.
- iTunesId - The iTunes ID number of the promoted item
- rating (required for mediaType ItunesSoftware, optional otherwise) - The rating of the promoted app. This property will be 0.0 unless the promoted item is an app, and the rating will be in the range of [0.0, 5.0];
- price - The number of reviews of the promoted app. This property will be 0 unless the promoted item is an app.
- reviews - This property is the text that will be displayed in the tag on the top of the small cross promotion card.
- caption - The itunes url of the promoted item which leads to the item's App Store page.
- url - The itunes url of the promoted item which leads to the item's App Store page.
- universal (optional) - This property indicates if the promoted item is universal or not.

### Card Methods:

- `logCardImpression` - Manually log an impression to Appboy for a particular card.
- `logCardClicked` - Manually log a click to Appboy for a particular card.

### Specific Card Dimensions:

Card titles can be no longer than two lines long. Titles longer than two lines will be abbreviated with an ellipsis (...). Card widths and all text lengths (with the exceptions of titles and subtitles) are dynamic. Aspect ratios are defined as width/height.

__Note__: Fixed card image ratios are no longer required as of version 2.8.1 of the iOS SDK.

#### News

Image Aspect Ratio: 1
Image/Card Ratio (image's width/card's width): 0.177

#### Banner

Image Aspect Ratio: 5.988

#### Captioned Image

Image Aspect Ratio: 1.333

#### Cross Promotion Card

Tab Height (the "Recommended" tab): 22.0
Tab lines: 1
Image Aspect Ratio: 1
Image/Card Ratio: 0.177
Purchase Button Width: 60.0
Subtitle lines: 1


### Log Feed Display

As of SDK v2.7, when displaying the news feed in your own user interface, you can manually record news feed impressions via `- (void) logFeedDisplayed;`. For example:

```objc
[[Appboy sharedInstance] logFeedDisplayed];
```


[10]: /assets/img/UONewsFeed.png "Urban Outfitters News Feed"
[11]: /Enabling_Message_Channels/In-App_Messages/iOS
[12]: http://appboy.github.io/appboy-ios-sdk/docs/annotated.html "ios sdk docs"
[13]: https://github.com/Appboy/appboy-ios-sdk/tree/master/Example/Stopwatch/en.lproj
[14]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Stopwatch/InitialViewController.m
[15]: https://github.com/Appboy/appboy-ios-sdk/blob/master/AppboyKit/headers/AppboyKitLibrary/Appboy.h "Appboy.h Header File"
[23]: https://github.com/tombenner/nui "ARC"
[24]: https://github.com/Appboy/nui "non ARC"
[25]: /assets/img/iOSFeedFinal.png
[27]: http://iosfonts.com/
[28]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Stopwatch/AppDelegate.m
[29]: http://appboy.github.io/appboy-ios-sdk/docs/interface_appboy.html#a2559b9e425866a5c34ad23ab2274d410 "useNUITheming documentation)"
[31]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Stopwatch/TestingViewController.m "TestingViewController.m file in Stopwatch"
[38]: https://github.com/Appboy/appboy-ios-sdk/blob/master/AppboyKit/headers/AppboyKitLibrary/ABKFeedViewControllerDelegate.h
[40]: https://academy.appboy.com/Deep_Dives/News_Feed_Categories
[42]: /assets/img/badge_example.png "Badge Example"
[43]: /assets/img/sample_news_feed.png
[44]: http://appboy.github.io/appboy-ios-sdk/docs/interface_a_b_k_feed_controller.html "ABK Feed Controller"
[45]: /assets/img/newsfeed_badges.png
