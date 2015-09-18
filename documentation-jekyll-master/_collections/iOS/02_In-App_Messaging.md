---
title: In-App Messaging
platform: iOS
---
# In-App Messaging

In-app messages are great for creating unobtrusive calls to action, notifying people of new content in the news feed and driving them toward it or communicating with users who have push turned off. In-app messages are also effective for other content that isn't time-sensitive enough to warrant a push notification, or permanent enough to warrant a news feed item. You can find a detailed explanation of in-app message behavior in [Appboy Academy][13].

The in-app message is enabled by default after completing SDK integration. Additional customization can be done following the steps in this guide.

__Time Estimate: 15 Minutes__

## Dashboard In-App Message Customization
These options can be configured on a per in-app message basis from [within the dashboard][13]. In addition to these built-in options, Appboy also exposes key-value pair functionality, allowing you to add custom behaviors on top of what Appboy provides.

### Key-Value Pairs
`In-app message` objects may carry key-value pairs as `extras`. These may be specified on the dashboard.

## Advanced In-App Message Customization Options
Customization is an optional feature of our in-app messages. The in-app message is highly customizable and can be made to match the look and feel of your app.

![Foodo In-App Message Customization Example][21]

_An example of in-app message customization from an Appboy client._


### Setting a Delegate

Additional customizations can be accomplished in code by setting a delegate. All of these customizations are entirely optional.

Set the `delegate` on `ABKInAppMessageController` by calling:

**Objective-C**

```objc
[Appboy sharedInstance].inAppMessageController.delegate = self;
```

**Swift**

```swift
Appboy.sharedInstance().inAppMessageController.delegate = self
```

### Customizing In-App Message Display Behavior

#### Customizing and Overriding In-App Message Before Display

The following delegate method is called each time right before the in-app message is displayed. If you would like to alter the display behavior of the in-app message due to something going on within the app, the methods which provide that customization should be called here. For example, you might want to display the in-app message from the top if the keyboard is currently being displayed.

**Objective-C**

```objc
- (ABKInAppMessageDisplayChoice) beforeInAppMessageDisplayed:(ABKInAppMessage *)inAppMessage withKeyboardIsUp:(BOOL)keyboardIsUp;
```

**Swift**

```swift
func beforeInAppMessageDisplayed(inAppMessage: ABKInAppMessage!, withKeyboardIsUp keyboardIsUp: Bool) -> ABKInAppMessageDisplayChoice
```

#### Manually Cue In-App Message Display

By default, in-app messages are automatically offered to `ABKInAppMessageControllerDelegate` when the app is foregrounded, launched or a push comes in while the app is open. However, you may want to display a in-app message at other times within your app. You may manually prompt a in-app message to be offered to `ABKInAppMessageControllerDelegate` by calling the following method:

```objc
[[Appboy sharedInstance].inAppMessageController displayNextInAppMessageWithDelegate:YOUR_IN_APP_MESSAGE_DELEGATE]
// YOUR_IN_APP_MESSAGE_DELEGATE should be replaced with your in-app message delegate.
```

#### Context Specific In-App Message Display

In certain situations, you may wish the in-app message to be queued for later display, or discarded entirely. For example, if the keyboard is displayed, you probably don't want the in-app message to supercede that.

Whenever a in-app message is offered to `ABKInAppMessageControllerDelegate` for display there is a callback to allow you determine whether the in-app message is displayed, returned to the stack, or discarded you may determine the handling behavior by setting `ABKInAppMessageDisplayChoice` to one of the three following values.

- `ABKDisplayInAppMessageNow`
  - The in-app message will be displayed immediately.
- `ABKDisplayInAppMessageLater`
  - The in-app message will be not be displayed and will be placed back onto the top of the stack.
- `ABKDiscardInAppMessage`
  - The in-app message will be discarded and will not be displayed.

For an implementation example, see our [Stopwatch Sample Application][22].

#### The In-App Message Stack

If multiple in-app messages are present within the "stack" and waiting to be displayed Appboy will display the most recently received in-app message first. In-app message can be returned to the stack in the following situations:

- Another in-app message is visible
- If the `beforeSInAppMessageDisplayed:withKeyboardIsUp:` delegate method HAS NOT been implemented and keyboard is being displayed currently.
- `beforeInAppMessageDisplayed:withKeyboardIsUp:` delegate method returned `ABKDisplayInAppMessageLater`

### Customizing In-App Message Behavior on Click
The `inAppMessageClickActionType` property defines the action behavior after the in-app message is clicked: displaying a news feed, redirect to a uri, or nothing but dismissing the in-app message. This property is read only. If you want to change the in-app message's click behavior, you can call following method:

```objc
- (void) setInAppMessageClickAction:(ABKInAppMessageClickActionType)clickActionType withURI:(NSURL *)uri;
```
    - When you pass a `ABKInAppMessageDisplayNewsFeed` or `ABKInAppMessageNoneClickAction` as the parameter `clickActionType`, the parameter `uri` will be ignored, and the `URI` property on the in-app message object will be set to nil.
    - When you pass a `ABKInAppMessageRedirectToURI` as the parameter `clickActionType`, this method will display a given URI on click. Please note that in this case, the parameter `uri` cannot be nil.

The following delegate method is notified when the in-app message is clicked. You can also use this delegate method to customize in-app message behavior on click:

**Objective-C**

```objc
- (BOOL) onInAppMessageClicked:(ABKInAppMessage *)inAppMessage;
```

**Swift**

```swift
func onInAppMessageClicked(inAppMessage: ABKInAppMessage!) -> Bool
```

The method returns a BOOL value to indicate if Appboy should continue to execute the click action.

### Refreshing the In-App Message

As of SDK v2.7, you can manually request a new in-app message for the user in `Appboy.h` using `- (void) requestInAppMessageRefresh;`. For example:

**Objective-C**
```objc
[[Appboy sharedInstance] requestInAppMessageRefresh];
```

**Swift**
```swift
Appboy.sharedInstance().requestInAppMessageRefresh()
```

### Display In-App Messages In a Custom View Controller
In-app messages can also be displayed within a custom view controller which you pass to Appboy. The view controller must meet the following requirements:

- It must be a subclass or an instance of `ABKInAppMessageViewController`.
- The view of the returned view controller should be an instance of `ABKInAppMessageView` or its subclass.

The following delegate method checks every time a in-app message is offered as to whether or not the app would like to pass a custom view controller to Appboy to display the in-app message:

**Objective-C**

```objc
- (ABKInAppMessageViewController *) inAppMessageViewControllerWithInAppMessage:(ABKInAppMessage *)inAppMessage;
```

**Swift**

```swift
func inAppMessageViewControllerWithInAppMessage(inAppMessage: ABKInAppMessage!) -> ABKInAppMessageViewController!
```

### Real Time In-App Message Creation & Display

In-app message can also be locally created within the app and displayed via Appboy. This is particularly useful for displaying messages that you wish to trigger within the app in real-time.

```objc
- (IBAction)createAndDisplayACustomInAppMessage:(id)sender {
  ABKInAppMessageSlideup *customInAppMessage = [[ABKInAppMessageSlideup alloc] init];
  customInAppMessage.message = @"YOUR_CUSTOM_SLIDEUP_MESSAGE";
  customInAppMessage.duration = 2.5;
  customInAppMessage.extras = @{"key" : @"value"};
  [[Appboy sharedInstance].slideupController addSlideup:customInAppMessage];
  [customInAppMessage release];
}
```

For a complete list of properties that can be defined on the in-app message object see the [`ABKInAppMessage.h` file ][14].

### Cirumventing Appboy In-App Message Handling

The following delegate method is called every time new in-app message is received from the Appboy server. If this method returns __YES__ you can completely circumvent Appboy handling of the in-app message display.

__Advanced Users Only:__ To implement completely custom handling of the Appboy in-app message use the following code:

**Objective-C**

```objc
- (BOOL) onInAppMessageReceived:(ABKInAppMessage *)inAppMessage;{
  //Return NO when you want Appboy to handle the display of the in-app message.
  return YES;
}
```

**Swift**

```swift
func onInAppMessageReceived(inAppMessage: ABKInAppMessage!) -> Bool {
  //Return false when you want Appboy to handle the display of the in-app message.
  return true;
}
```

#### Logging Impressions and Clicks

Logging impressions and clicks is not automatic when you implement completely custom handling but it is possible using the following two methods:

```objc
- (void) logInAppMessageImpression;
// Registers that a user has viewed a in-app message with the Appboy server.
- (void) logInAppMessageClicked;
// Registers that a user has clicked on a in-app message with the Appboy server.
```

```swift
func logInAppMessageImpression()
func logInAppMessageClicked()
```

## Method Declarations

For additional information see the following header files:

- [`ABKInAppMessage.h`][14]
- [`ABKInAppMessageController.h`][15]
- [`ABKInAppMessageControllerDelegate.h`][16]
- [`ABKInAppMessageView.h`][17]
- [`ABKInAppMessageViewController.h`][18]

## Implementation Samples

See the [`InAppMessageControlsTestController.m` file][19] in the Stopwatch sample app.



[1]: #customize-inAppMessage-dashboard
[2]: #customize-inAppMessage-code
[3]: #set-delegate
[4]: #customize-inAppMessage-display
[5]: #before-display
[6]: #manual-cue
[7]: #situational-display
[8]: #inAppMessage-click
[9]: #custom-view
[10]: #custom-inAppMessage
[11]: #custom-complete
[12]: #method-declarations
[13]: https://academy.appboy.com/Quick_Wins/Creating_an_In-App_Message
[14]: https://github.com/Appboy/appboy-ios-sdk/blob/master/AppboyKit/headers/AppboyKitLibrary/ABKInAppMessage.h
[15]: https://github.com/Appboy/appboy-ios-sdk/blob/master/AppboyKit/headers/AppboyKitLibrary/ABKInAppMessageController.h
[16]: https://github.com/Appboy/appboy-ios-sdk/blob/master/AppboyKit/headers/AppboyKitLibrary/ABKInAppMessageControllerDelegate.h
[17]: https://github.com/Appboy/appboy-ios-sdk/blob/master/AppboyKit/headers/AppboyKitLibrary/ABKInAppMessageView.h
[18]: https://github.com/Appboy/appboy-ios-sdk/blob/master/AppboyKit/headers/AppboyKitLibrary/ABKInAppMessageViewController.h
[19]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Stopwatch/InAppMessageControlsTestController.m
[20]: #deprecated
[21]: /assets/img/foodo-slideup.gif
[22]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Stopwatch/InAppMessageTestViewController.m
[23]: #inAppMessage-refresh
