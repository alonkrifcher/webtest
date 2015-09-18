---
title: In-App Messaging
platform: Windows
subplatform: Universal
---
# In-App Messaging

Appboy refers to in-app messages as "slideups". Slideups are great for creating unobtrusive calls to action, notifying people of new content in the news feed and driving them toward it or communicating with users who have push turned off. Slideups are also effective for other content that isn't time-sensitive enough to warrant a push notification, or permanent enough to warrant a news feed item. You can find a detailed explanation of in-app message behavior in [Appboy Academy][1].

__Time Estimate: 5 Minutes__

## Integrating the In-App Messaging UI <a class="margin-fix" name="in-app-integration"></a>

Slideup messages are handled by the Appboy `SlideupManager`, which is exposed as a property of the Appboy class. To use the default Appboy slideup UI, do

```csharp
Appboy.SharedInstance.SlideupManager.SlideupControlFactory = new AppboyUI.Universal.Factories.SlideupControlFactory();
```

in your App.xaml.cs during initialization.  Also ensure that you have the following using at the top of your App.xaml.cs:

```csharp
using AppboyPlatform.PCL.Managers;
using AppboyUI.Universal.Factories;
```

**Implementation Example**

See the following [`MiscPage.xaml.cs` file in our Windows Sample Application][2]

## Styling the In-App Messaging UI <a class="margin-fix" name="in-app-styling"></a>

### Customizing Slideup Behavior
These options can be configured on a per-slideup basis from [within the dashboard](https://academy.appboy.com/Quick_Wins/Creating_an_In-App_Message). In addition to these built-in options, Appboy also exposes key-value pair functionality, allowing you to add custom behaviors on top of what Appboy provides.

### Hooks to Alter Slideups at Different Points

Delegate methods are provided for `SlideupManager` to control which slideups are displayed, when they are displayed as well as what action(s) to perform when a slideup is clicked or dismissed.

- `SlideupReceivedDelegate`
  - The delegate method that will be executed when a slideup is received from Appboy. Set this delegate method (with a return value of true) if you decide to bypass the Appboy `SlideupManager` and want to handle and display slideups yourself.
- `BeforeSlideupDisplayedDelegate`
  - The delegate method that will be executed just before the slideup is to be displayed. The `SlideupOperation` return value determines whether the slideup will be displayed, put back onto the stack so that it can be displayed at a later time, or discarded.
- `SlideupClickedDelegate`
  - The delegate method that will be executed when the currently displayed slideup is clicked. A return value of true means that the delegate has handled the click and the default behaviour should not be performed.
  - __Warning__: Only return true if you are sure that you do not want the `SlideupManager` to perform the default action that was set when creating the slideup on the Appboy dashboard! If you return true, you MUST call the `CloseSlideupDelegate` yourself.
- `SlideupDismissedDelegate`
  - The delegate method that will be executed when the currently displaying slideup is dismissed. This can happen if the slideup has a `DismissType` set to `AUTO_DISMISS` and the slideup was automatically dismissed or if the slideup was swiped away.

Custom slideups created locally in the app can be provided to the `SlideupManager` which will be displayed using the slideup UI.

### Linking to the News Feed
Optionally, you can set a `FeedModal` for NEWS_FEED click actions:

```csharp
Appboy.SharedInstance.SlideupManager.FeedModal = new AppboyUI.Universal.Popups.FeedPopup();
```

### Customizing Slideup UI

If you want to provide your own slideup experience, you can implement your own `SlideupFactory`. The slideup returned from the `SlideupFactory` is animated in from the bottom of the screen by the `SlideupManager`. When a slideup is clicked, the `SlideupClickedEvent` is fired.

The `GetSlideupControl` method provides access to the entire `slideup` object. This allows for customization of the slideup. For example if clicking on the slideup will navigate the user to the Appboy news feed, you can choose to add a visual indicator that will let the user know that clicking on the slideup will perform an action.

You can customize the user interface to fit your app by overriding the default styles in `AppboyStyles.xaml` within the root directory of your project. The default styles for all of the UI controls are defined in the [`AppboyUI.Universal` project](https://github.com/Appboy/appboy-windows-universal-ui) in the [`/Styles/Default.xaml` file](https://github.com/Appboy/appboy-windows-universal-ui/blob/master/Assets/Styles/Default.xaml). To override a default style, copy over the style element and one or more of the properties to your AppboyStyles.xaml file in the root directory of your app.

A modal version of the Appboy News Feed was also addd to the UI library (`ModalFeed`)
  - If the `ModalFeed` is set on the `SlideupManager`, slideup with `ClickAction` set to `NEWS_FEED` will open the modal news feed.

### Example Change

**Changing the Slideup Border Color to RED**

```xml
<Style x:Key="Appboy.Slideup.Border" TargetType="Border">
  <Setter Property="BorderBrush" Value="#ff0000"/>
  <Setter Property="BorderThickness" Value="1"/>
</Style>
```

**Implementation Example**

See the following [`AppboyStyles.xaml` file in our Windows Sample Application](https://github.com/Appboy/appboy-windows-samples/blob/master/Universal/AppboyStyles.xaml "Windows Universal Sample Implementation")

[1]: https://academy.appboy.com/Best_Practices/In-App_Messages#message-behavior
[2]: https://github.com/Appboy/appboy-windows-samples/blob/master/Universal/App.xaml.cs "Windows Universal Sample Implementation"
