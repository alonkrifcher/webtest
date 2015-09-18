---
title: In-App Messaging
platform: Windows
subplatform: Phone8
---
# In-App Messaging

Appboy refers to in-app messages as "slideups". Slideups are great for creating unobtrusive calls to action, notifying people of new content in the news feed and driving them toward it or communicating with users who have push turned off. Slideups are also effective for other content that isn't time-sensitive enough to warrant a push notification, or permanent enough to warrant a news feed item. You can find a detailed explanation of in-app message behavior in [Appboy Academy][1].

Slideup messages are handled by the Appboy `SlideupManager`, which is exposed as a property of the Appboy class. To use the default Appboy slideup UI, do

```csharp
Appboy.SharedInstance.SlideupManager.SlideupControlFactory = new AppboyUI.Phone.Factories.SlideupControlFactory();
```

in your App.xaml.cs during initialization.  Also ensure that you have the following using at the top of your App.xaml.cs:

```csharp
using AppboyPlatform.PCL.Managers;
```

Also ensure you add the following to enable appropriate in-app messaging repositioning after page navigations:

```csharp
RootFrame.Navigated += Appboy.SharedInstance.SlideupManager.NavigationEvent;
```

## Implementation Example

See the following [`App.xaml.cs` file in our Windows Sample Application][2]

## Styling the In-App Messaging UI

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

### Customizing Slideup UI

If you want to provide your own slideup experience, you can implement your own `SlideupFactory`. The slideup returned from the `SlideupFactory` is animated in from the bottom of the screen by the `SlideupManager`. When a slideup is clicked, the `SlideupClickedEvent` is fired.

The `GetSlideupControl` method provides access to the entire `slideup` object. This allows for customization of the slideup. For example if clicking on the slideup will navigate the user to the Appboy news feed, you can choose to add a visual indicator that will let the user know that clicking on the slideup will perform an action.

You can customize the user interface to fit your app by overriding the default styles in `AppboyOverride.xaml`. The default styles for all of the UI controls are defined in the [`AppboyUI.Phone` project](https://github.com/Appboy/appboy-windows-samples/tree/master/Phone) in the [`/Styles/Default.xaml` file](https://github.com/Appboy/appboy-windows-phone-ui/blob/master/Assets/Styles/Default.xaml). To override a default style, copy over the style element and one or more of the properties to your `AppboyOverride.xaml` file in the root directory of your app.

- A `UriMapper` has been added to be able to point the SDK to your integrated Appboy news feed.
  - If the `UriMapper` is set, slideups with `ClickAction` set to `NEWS_FEED` will open the integrated news feed.

### Example Change

**Changing the Slideup Border Color to RED**

```xml
<Style x:Key="Appboy.Slideup.Border" TargetType="Border">
  <Setter Property="BorderBrush" Value="#ff0000"/>
  <Setter Property="BorderThickness" Value="1"/>
</Style>
```

### Implementation Example

See the following [`AppboyOverride.xaml` file in our Windows Sample Application](https://github.com/Appboy/appboy-windows-samples/blob/master/Phone/Assets/Styles/AppboyOverride.xaml "Windows Phone 8.0 Sample Implementation")

[1]: https://academy.appboy.com/Best_Practices/In-App_Messages#message-behavior
[2]: https://github.com/Appboy/appboy-windows-samples/blob/master/Phone/App.xaml.cs "Windows Phone 8.0 Sample Implementation"
[3]: #in-app-integration
[4]: #in-app-styling
