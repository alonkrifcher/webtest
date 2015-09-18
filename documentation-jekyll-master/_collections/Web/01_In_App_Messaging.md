---
title: In-App Messaging
platform: Web
---
# In-App Messaging

__Please Note!__ The Appboy Web SDK is currently in beta. If you have any questions, please contant support@appboy.com.

__Time Estimate: 0-15 Minutes__

In-App Messages are great for creating unobtrusive calls to action, notifying people of new content in the news feed and driving them toward it or communicating with users who have push turned off. They are also effective for other content that isn't time-sensitive enough to warrant a push notification, or permanent enough to warrant a news feed item. You can find a detailed explanation of in-app message behavior in the [Appboy Academy][4].

## Automatic In-App Message Display (Recommeneded)

By default, in-app messages are automatically displayed as part of our [recommended integration instructions][1]. In this configuration, Appboy will automatically request and immediately display 1 new in-app message when `appboy.openSession()` is called (if they have not been refreshed for this user in the last 10 minutes), or whenver `appboy.requestInAppMessageRefresh()` is called.

## Manual In-App Message Display

If you don't want your site to immediately display new in-app messages when they're received, you can disable automatic display and register your own display subscribers. First, find and remove the call to `appboy.automaticallyShowNewInAppMessages()` from within your loading snippet.  Then, create your own subscriber:

```javascript
appboy.subscribeToNewInAppMessages(function(inAppMessages) {
  // Display the first in-app message. You could defer display here by pushing this message to code within in your own application.
  // If you don't want to use Appboy's built-in display capabilities, you could alternatively pass the in-app message to your own display code here.
  appboy.display.showInAppMessage(inAppMessages[0]);

  // Return an array with any remaining, unhandled messages to appboy's internal queue.
  // These will be part of the inAppMessages param the next time this subscriber is invoked.
  return inAppMessages.slice(1);
});
```

The `inAppMessages` parameter will be an array of [`appboy.ab.InAppMessage`][2] subclass objects, each of which has various lifecycle event subscription methods. See the [JSDocs][2] for full documentation.

__Note:__ In this configuration, you can call `appboy.requestInAppMessageRefresh(count)` to request multiple in-app messages at once from the server. In-app messages are only retrieved for a given user from the server once, so be sure you can handle all retrieved messages before page close or they will be lost for this user. Pass 0 to avoid a server refresh entirely and invoke your subscribers with previously unhandled messages. Appboy will automatically request 1 new in-app message when `appboy.openSession()` is called (if they have not been refreshed for this user in the last 10 minutes).

__Note:__ Only one [`Modal`][17] or [`Full`][41] in-app message can be displayed at a given time. If you attempt to show a second Modal or Full message while one is already showing, `appboy.display.showInAppMessage` will return false, and the message will automatically be returned to Appboy's internal queue, where it will part of the `inAppMessages` array parameter the next time your subscriber is invoked.

## In-App Message Types

Appboy currently offers three default in-app message types, each customizable with messages, images, [Font Awesome][15] icons, click actions, analytics, editable styling and color schemes.  The three types are called [`Slideup`][13], [`Modal`][17], and [`Full`][41].

All in-app messages inherit their prototype from [`appboy.ab.InAppMessage`][2], which defines basic behavior and traits for all in-app messages. The protypical subclasses are [appboy.ab.SlideUpMessage][3], [appboy.ab.ModalMessage][6], and [appboy.ab.FullScreenMessage][7].

### Slideup In-App Messages

[`SlideUp`][3] in-app messages are so-named because traditionally on mobile platforms they "slide up" or "slide down" from the top or bottom of the screen. In the Appboy Web SDK, these messages are actually displayed as more of a Growl or Toast style notification, to align with the web's dominant paradigm. They cover a small portion of the screen and provide an effective and non-intrusive messaging capability.

![Slideup Example][49]

### Modal In-App Messages

[`Modal`][6] in-app messages appear in the center of the screen and are framed by a translucent panel. Useful for more critical messaging, they can be equipped with up to two click action and analytics enabled buttons.

![Modal Example][48]

### Full In-App Messages

[`Full`][7] in-app messages are useful for maximizing the content and impact of your user communication. On narrow browser windows (e.g. the mobile web), `full` in-app messages take up the entire browser window. On larger browser windows, `full` in-app messages appear similarly to `modal` in-app messages. The upper half of a `full` in-app message contains an image and the lower half allows up to eight lines of text as well as up to two click action and analytics enabled buttons

![Full Example][47]

## In-App Message Customization

### Custom Styling

Appboy UI elements come with a default look and feel that matches the composers within the Appboy Dashboard and aims for consistency with other Appboy mobile platforms. Appboy's default styles are defined in CSS within `appboy.min.css`. By overriding selected styles in your application, it is possible to customize our standard in-app message types with your own background images, font families, styles, sizes, animations, and more. For instance, the following is an example override that will cause a in-app messages' headers to appear italicized:

```css
  .ab-in-app-message .ab-message-header {
    font-style: italic;
  }
```

## Local In-App Messages

In-app messages can also be created within your site and displayed locally in real-time.  All customization options available on the dashboard are also available locally.  This is particularly useful for displaying messages that you wish to trigger within the app in real-time. However, analytics on these locally-created messages will not be available within the Appboy dashboard.

```javascript
  // Displays a slideup type in-app message.
  var message = new appboy.ab.SlideUpMessage("Welcome to Appboy! This is an in-app message.");
  message.slideFrom = appboy.ab.InAppMessage.SlideFrom.TOP;
  appboy.display.showInAppMessage(message);
```

## Key/Value Pair Extras

In-app message objects may carry Key/Value pairs as their `extras` property. These are specified on the dashboard under "Additional Message Settings" when creating an in-app message campaign. These can be used to send data down along with an in-app message for further handling by your site.

See the [JSDocs][2] for more information.

[1]: https://github.com/Appboy/appboy-web-sdk#getting-started
[2]: https://js.appboycdn.com/web-sdk/latest/doc/ab.InAppMessage.html
[3]: https://js.appboycdn.com/web-sdk/latest/doc/ab.SlideUpMessage.html
[4]: https://academy.appboy.com/Best_Practices/In-App_Messages#message-behavior
[5]: #display-in-app
[6]: https://js.appboycdn.com/web-sdk/latest/doc/ab.ModalMessage.html
[7]: https://js.appboycdn.com/web-sdk/latest/doc/ab.FullScreenMessage.html
[11]: #inapp-customization
[13]: /Web/#slideup-in-app-messages
[14]: #key-value
[15]: http://fortawesome.github.io/Font-Awesome/
[17]: /Web/#modal-in-app-messages
[35]: #styling
[40]: #message-types
[41]: /Web/#full-in-app-messages
[46]: #inapp-control
[47]: /assets/img/In-App_Full.png
[48]: /assets/img/In-App_Modal.png
[49]: /assets/img/Web_Slideup.png
