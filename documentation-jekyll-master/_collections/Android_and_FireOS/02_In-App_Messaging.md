---
title: In-App Messaging
platform: Android and FireOS
---
# In-App Messaging

__Time Estimate: 15 Minutes__

## Enabling In-App Messages
In-App Messages are great for creating unobtrusive calls to action, notifying people of new content in the news feed and driving them toward it or communicating with users who have push turned off. They are also effective for other content that isn't time-sensitive enough to warrant a push notification, or permanent enough to warrant a news feed item. You can find a detailed explanation of in-app message behavior in [Appboy Academy][4].

### Step 1: Displaying In-App Messages

#### Part 1: Registering the In-App Message Manager

In-App Messages are managed by the [`AppboyInAppMessageManager`][34] class, which attaches the in-app message user interface to your Activity and displays messages that have been sent from the server.

In order for in-app messages to function appropriately, __EVERY__ activity must call the following within their `onResume()` and `onPause()` lifecycle methods respectively.

```java
// This should be called within the onResume() method
AppboyInAppMessageManager.getInstance().registerInAppMessageManager(Activity);
```

```java
// This should be called within the onPause() method
AppboyInAppMessageManager.getInstance().unregisterInAppMessageManager(Activity);
```

#### Part 2: Requesting In-App Messages
Appboy requests the latest in-app messages whenever the following is called:

```java
Appboy.getInstance(this).requestInAppMessageRefresh();
```

#### Part 3: Implementation Example

We recommend calling `requestInAppMessageRefresh()` within your `onResume()` method whenever `onResume()` immediately follows `onStart()` so that each time you start the application, your app checks for new in-app messages and displays them if available. The sample code below checks a boolean (`mRefreshData`) which is set to `true` during the `onStart()` method and then set to `false` immediately after `requestInAppMessageRefresh()` is called. This prevents the in-app message from being displayed when `onResume()` follows the `onPause()` lifecycle method.

```java
@Override
public void onStart() {
  super.onStart();
  // Opens (or reopens) an Appboy session.
  // Note: This must be called in the onStart lifecycle method of EVERY Activity. Failure to do so
  // will result in incomplete and/or erroneous analytics.
  if (Appboy.getInstance(this).openSession(this)) {
    mRefreshData = true;
  }
}
@Override
public void onResume() {
  super.onResume();
  // Registers the AppboyInAppMessageManager for the current Activity. This Activity will now listen for
  // slideup messages from Appboy.
  AppboyInAppMessageManager.getInstance().registerInAppMessageManager(this);
  if (mRefreshData) {
    Appboy.getInstance(this).requestInAppMessageRefresh();
    mRefreshData = false;
  }
}
@Override
public void onPause() {
  super.onPause();
  // Unregisters the AppboyInAppMessageManager.
  AppboyInAppMessageManager.getInstance().unregisterInAppMessageManager(this);
}
@Override
public void onStop() {
  super.onStop();
  // Closes the current Appboy session.
  // Note: This must be called in the onStop lifecycle method of EVERY Activity. Failure to do so
  // will result in incomplete and/or erroneous analytics.
  Appboy.getInstance(this).closeSession(this);
}
```

See [`AppboyFragmentActivity.java`][1] in our Droidboy sample app for an example implementation.

### Step 2: Enabling Click Behaviors
Properly launching web links from in-app messages requires registering the following activity within your `AndroidManifest.xml`:

```java
<activity android:name="com.appboy.ui.AppboyWebViewActivity" android:theme="@android:style/Theme" />
```

Properly launching the news-feed from in-app messages requires registering the following activity within your `AndroidManifest.xml`:

```java
<activity android:name="com.appboy.ui.activities.AppboyFeedActivity" android:theme="@android:style/Theme" />
```

See Droidboy's [`AndroidManifest.xml`][37] for an example implementation.

Congratulations, you've finished integrating in-app messages!  Read on for descriptions of our default in-app message types, customization options, and advanced features.

## In-App Message Types

Appboy currently offers three default in-app message types, each customizable with messages, images, [Font Awesome][15] icons, click actions, analytics, editable styling and color schemes.  The three types are called [`Slideup`][13], [`Modal`][17], and [`Full`][41].  It is also possible to [define your own custom in-app message view][12].

All in-app messages implement the [`IInAppMessage`][3] interface, which defines basic behavior and traits for all in-app messages.  [`InAppMessageBase`][27] is an abstract class that implements `IInAppMessage` and provides the foundational in-app message implementation.  All in-app message classes are subclasses of `InAppMessageBase`.

In addition, there is a subinterface of `IInAppMessage` called [`IInAppMessageImmersive`][8], which adds click action and analytics enabled [buttons][50], as well as header text and a close button.  [`InAppMessageImmersiveBase`][28] is an abstract class that implements `IInAppMessageImmersive` and provides the foundational `immersive` in-app message implementation.  `Modal` and `Full` in-app messages are subclasses of `InAppMessageImmersiveBase`.

### Slideup In-App Messages

[`Slideup`][16] in-app messages are so-named because they "slide up" or "slide down" from the top or bottom of the screen.  They cover a small portion of the screen and provide an effective and non-intrusive messaging capability.

![Slideup Example][49]

### Modal In-App Messages

[`Modal`][32] in-app messages appear in the center of the screen and are framed by a translucent panel. Useful for more critical messaging, they can be equipped with up to two click action and analytics enabled buttons.

![Modal Example][48]

### Full In-App Messages

[`Full`][31] in-app messages are useful for maximizing the content and impact of your user communication.  The upper half of a `full` in-app message contains an image and the lower half allows up to eight lines of text as well as up to two click action and analytics enabled buttons.

![Full Example][47]

## In-App Message Customization

Before customizing in-app messages, it's important to understand the [`AppboyInAppMessageManager`][34], which handles the majority of in-app message handling.  As described in [Step 1][5], it must be registered for in-app messages to function appropriately.

`AppboyInAppMessageManager` is the nerve center for in-app message display on Android.  It manages helper class instances that help it manage the lifecycle and display of in-app messages.  All of these classes have standard implementations and defining custom classes is completely optional.  However, doing so can add another level of control over the display and behavior of in-app messages.  These customizable classes include:

- [`IInAppMessageManagerListener`][21] - Implement to [custom manage in-app message display and behavior][19].
- [`IInAppMessageViewFactory`][42] - Implement to [build custom in-app message views][12].
- [`IInAppMessageAnimationFactory`][20] - Implement to [define custom in-app message animations][22].

### Setting a Custom Manager Listener

The `AppboyInAppMessageManager` automatically handles the display and lifecycle of in-app messages.  If you require more control over the lifecycle of a message, setting a custom manager listener will enable you to recieve the in-app message object at various points in the in-app message lifecycle, allowing you to handle its display yourself, perform further processing, react to user behavior, process the object's [Extras][14], and much more.

#### Step 1: Implement an In-App Message Manager Listener
Create a class that implements [`IInAppMessageManagerListener`][21]

The callbacks in your `IInAppMessageManagerListener` will be called at various points in the in-app message lifecycle.  

For example, if you set a custom manager listener, when an in-app message is received from Appboy, the `onInAppMessageReceived()` method will be called. If this method returns true, that signals to `AppboyInAppMessageManager` that the in-app message will be handled by the host app and that it should not be displayed by Appboy.  If false is returned, the `AppboyInAppMessageManager` attempts to display the in-app message.  This method should be used if you choose to display the in-app message in a customized manner.

`IInAppMessageManagerListener` also includes delegate methods for clicks on the message itself or one of the buttons.  A common use case would be intercepting a message when a button or message is clicked for further processing.

- See [`CustomInAppMessageManagerListener.java`][36] in our Droidboy sample app for an implementation example.

#### Step 2: Instruct Appboy to use your In-App Message Manager Listener

Once your `IInAppMessageManagerListener` is created, call `AppboyInAppMessageManager.setCustomInAppMessageManagerListener()` to instruct `AppboyInAppMessageManager`
to use your custom `IInAppMessageManagerListener` instead of the default listener.

See [`InAppMessageTesterActivity.java`][2] in the DroidBoy sample app for an example implementation.

#### In-Depth: Altering In-App Messages Before Display

When a new in-app message is received, and there is already an in-app message being displayed, the new message will be put onto the top of the stack and can be displayed at a later time.

However, if there is no in-app message being displayed, the following delegate method in `IInAppMessageManagerListener` will be called:
```java
  @Override
  public InAppMessageOperation beforeInAppMessageDisplayed(IInAppMessage inAppMessageBase) {
    return InAppMessageOperation.DISPLAY_NOW;
  }
```

The `InAppMessageOperation()` return value can be used to control when the message should be displayed. A suggested usage of this method would be to delay messages in certain parts of the app by returning `DISPLAY_LATER` when in-app messages would be distracting to the user's app experience.

| `InAppMessageOperation` return value | Behavior |
| -------------------------- | -------- |
| `DISPLAY_NOW` | The message will be displayed |
| `DISPLAY_LATER` | The message will be returned to the stack and displayed at the next available opportunity |
| `DISCARD` | The message will be discarded |
| `null` | The message will be ignored. This method should __NOT__ return `null` |

See [`InAppMessageOperation.java`][45] for more details.

### Setting a Custom View Factory

Appboy's suite of in-app messages types are versatile enough to cover the vast majority of custom use cases.  However, if you would like to fully define the visual appearance of your in-app messages instead of using a default type, Appboy makes this possible via setting a custom view factory.

#### Step 1: Implement an In-App Message View Factory

Create a class that implements [`IInAppMessageViewFactory`][42]

- See [`CustomInAppMessageViewFactory.java`][43] in our Droidboy sample app for an implementation example.

#### Step 2: Instruct Appboy to use your In-App Message View Factory

Once your `IInAppMessageViewFactory` is created, call `AppboyInAppMessageManager.setCustomInAppMessageViewFactory()` to instruct `AppboyInAppMessageManager`
to use your custom `IInAppMessageViewFactory` instead of the default view factory.

See [`InAppMessageTesterActivity.java`][2] in the DroidBoy sample app for an example implementation.

#### In-Depth: Implementing an Appboy View Interface

Appboy's `slideup` in-app message view implements [`IInAppMessageView`][25].  Appboy's `full` and `modal` type message views implement [`IInAppMessageImmersiveView`][24].  Implementing one of these classes will allow Appboy to add click listeners to your custom view where appropriate.  All Appboy view classes extend Android's [View][18] class.

Implementing `IInAppMessageView` allows you to define a certain portion of your custom view as clickable.  Implementing `IInAppMessageImmersiveView` allows you to define message button views and a close button view.

- See [`CustomInAppMessageView.java`][26] in our Droidboy sample app for an implementation example.

#### Client Example

The following image is an example custom In-App Message view from an Appboy client:

![Foodo In-App Message Customization Example][33]

### Setting a Custom Animation Factory

In-app messages have preset animation behavior. `Slideup` type messages slide into the screen; `full` and `modal` messages fade in and out.  If you would like to define custom animation behaviors for your in-app messages, Appboy makes this possible via setting a custom animation factory.

#### Step 1: Implement an In-App Message Animation Factory

Create a class that implements [`IInAppMessageAnimationFactory`][20]

- See [`CustomInAppMessageAnimationFactory.java`][9] in our Droidboy sample app for an implementation example.

#### Step 2: Instruct Appboy to use your In-App Message View Factory

Once your `IInAppMessageAnimationFactory` is created, call `AppboyInAppMessageManager.setCustomInAppMessageAnimationFactory()` to instruct `AppboyInAppMessageManager`
to use your custom `IInAppMessageAnimationFactory` instead of the default animation factory.

See [`InAppMessageTesterActivity.java`][2] in the DroidBoy sample app for an example implementation.

### Custom Styling

Appboy UI elements come with a default look and feel that matches the Android standard UI guidelines and provides a seamless experience. You can see these default styles in the Appboy SDK's [`styles.xml`][6] file.

```xml
  <style name="Appboy"/>
    <!-- In-app Message -->
  <style name="Appboy.InAppMessage">
  </style>
  <style name="Appboy.InAppMessage.Header">
    <item name="android:layout_height">wrap_content</item>
    <item name="android:layout_width">wrap_content</item>
    <item name="android:padding">0.0dp</item>
    <item name="android:background">@android:color/transparent</item>
    <item name="android:textColor">@color/com_appboy_inappmessage_header_text_light</item>
    <item name="android:textSize">19.0sp</item>
    <item name="android:layout_gravity">center</item>
    <item name="android:singleLine">true</item>
    <item name="android:textStyle">bold</item>
  </style>
```

If you would prefer, you can override these styles to create a look and feel that better suits your app. To override a style, copy it in its entirety to the `styles.xml` file in your own project and make modifications. The whole style must be copied over to your local `styles.xml` file in order for all of the attributes to be correctly set.

## Local In-App Messages

#### Local In-App Message Creation and Display

In-app messages can be created within the app and displayed locally in real-time.  All customization options available on the dashboard are also available locally.  This is particularly useful for displaying messages that you wish to trigger within the app in real-time.

```java
  // Initializes a new slideup type in-app message and specifies its message.
  InAppMessageSlideup inAppMessage = new InAppMessageSlideup();
  inAppMessage.setMessage("Welcome to Appboy! This is a slideup in-app message.");
```

__Note:__ Do not display in-app messages when the soft keyboard is displayed on screen as rendering is undefined in this circumstance.

#### Manually Triggering In-App Message Display
The following method will manually display an in-app message by adding it to the stack and pushing it out.

```java
  /**
   * Provides a in-app message that will then be handled by the in-app message manager. If no in-app message is being
   * displayed, it will attempt to display the in-app message immediately.
   *
   * @param inAppMessageBase The in-app message to add.
   */
  public void addInAppMessage(IInAppMessage inAppMessage) {
    mInAppMessageBaseStack.push(inAppMessage);
    requestDisplayInAppMessage();
  }
```
See [`InAppMessageTesterActivity.java`][2] in the DroidBoy sample app for an example implementation.

#### In-Depth: Defining Custom In-App Message Types

Appboy's `slideup` in-app message object extends [`InAppMessageBase`][27].  Appboy's `full` and `modal` type messages extend [`InAppMessageImmersiveBase`][28].  Extending one of these classes gives you the option of adding custom functionality to your locally generated in-app messages.

See [`CustomInAppMessage.java`][29] in the DroidBoy sample app for an example implementation.

## Key/Value Pair Extras

In-app message objects may carry Key/Value pairs as `extras`. They are specified on the dashboard under "Advanced Settings" when creating an in-app message campaign. These can be used to send data down along with an in-app message for further handling by the application.

Call the following when you get an in-app message object to retrieve its extras:

```java
Map<String, String> getExtras()
```

See the [Javadoc][44] for more information.


[1]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/AppboyFragmentActivity.java
[2]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/InAppMessageTesterActivity.java
[3]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/models/IInAppMessage.html
[4]: https://academy.appboy.com/Best_Practices/In-App_Messages#message-behavior
[5]: #step-1-displaying-in-app-messages
[6]: https://github.com/Appboy/appboy-android-sdk/blob/master/android-sdk-ui/res/values/styles.xml
[7]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/CustomInAppMessageManagerListener.java
[8]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/models/IInAppMessageImmersive.html
[9]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/CustomInAppMessageAnimationFactory.java
[12]: #setting-a-custom-view-factory
[13]: #slideup-in-app-messages
[14]: #keyvalue-pair-extras
[15]: http://fortawesome.github.io/Font-Awesome/
[16]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/models/InAppMessageSlideup.html
[17]: #modal-in-app-messages
[18]: http://developer.android.com/reference/android/view/View.html
[19]: #setting-a-custom-manager-listener
[20]: https://github.com/Appboy/appboy-android-sdk/blob/master/android-sdk-ui/src/com/appboy/ui/inappmessage/IInAppMessageAnimationFactory.java
[21]: https://github.com/Appboy/appboy-android-sdk/blob/master/android-sdk-ui/src/com/appboy/ui/inappmessage/IInAppMessageManagerListener.java
[22]: #setting-a-custom-animation-factory
[23]: http://developer.android.com/reference/android/R.integer.html#config_shortAnimTime
[24]: https://github.com/Appboy/appboy-android-sdk/blob/master/android-sdk-ui/src/com/appboy/ui/inappmessage/IInAppMessageImmersiveView.java
[25]: https://github.com/Appboy/appboy-android-sdk/blob/master/android-sdk-ui/src/com/appboy/ui/inappmessage/IInAppMessageView.java
[26]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/CustomInAppMessageView.java
[27]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/models/InAppMessageBase.html
[28]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/models/InAppMessageImmersiveBase.html
[29]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/CustomInAppMessage.java
[30]: https://academy.appboy.com/Quick_Wins/Creating_an_In-App_Message
[31]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/models/InAppMessageFull.html
[32]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/models/InAppMessageModal.html
[33]: /assets/img/foodo-slideup.gif
[34]: https://github.com/Appboy/appboy-android-sdk/blob/master/android-sdk-ui/src/com/appboy/ui/inappmessage/AppboyInAppMessageManager.java
[36]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/CustomInAppMessageManagerListener.java
[37]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/AndroidManifest.xml
[41]: #full-in-app-messages
[42]: https://github.com/Appboy/appboy-android-sdk/blob/master/android-sdk-ui/src/com/appboy/ui/inappmessage/IInAppMessageViewFactory.java
[43]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/CustomInAppMessageViewFactory.java
[44]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/models/IInAppMessage.html#getExtras()
[45]: https://github.com/Appboy/appboy-android-sdk/blob/master/android-sdk-ui/src/com/appboy/ui/inappmessage/InAppMessageOperation.java
[47]: /assets/img/In-App_Full.png
[48]: /assets/img/In-App_Modal.png
[49]: /assets/img/In-App_Slideup.png
[50]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/models/MessageButton.html
