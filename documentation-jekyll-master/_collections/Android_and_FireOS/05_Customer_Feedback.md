---
title: Customer Feedback
platform: Android and FireOS
---
# Customer Feedback

The Appboy feedback form allows users to submit feedback about your app that is immediately sent to your company's dashboard.

__Time Estimate: 10 Minutes__

![Android ActivityFeed+FeedBack][1]

In Android, the news feed and feedback form are implemented as [Fragments][2] that are available in the Appboy Android UI project. View [Google's documentation on Fragments][3] for information on how to add a Fragment to an Activity.

__Note__: The Android UI Fragments do not automatically track session analytics. To ensure that sessions are tracked correctly, you should call `IAppboy.openSession()` when your app is opened (learn more about [tracking user sessions][6]).

## Appboy Feedback Form

The `AppboyFeedbackFragment` class creates a Feedback form and makes calls to the core Appboy library to send feedback to Appboy. The `AppboyFeedbackFragment` contains two buttons, "cancel" and "send", which when pressed will call a `FeedbackFinishedListener`. You must set a `FeedbackFinishedListener` on your fragment to handle navigation when a user interacts with the form:

```java
AppboyFeedbackFragment appboyFeedbackFragment = new AppboyFeedbackFragment();
appboyFeedbackFragment.setFeedbackFinishedListener(new AppboyFeedbackFragment.FeedbackFinishedListener() {
  @Override
  public void onFeedbackFinished() {
    // Pops the top of the back stack and displays the previous fragment
    mFragmentManager.popBackStack();
  }
});
```

## Manual Feedback Collection

Appboy has a [method][5] allows you to pass Feedback to Appboy from a form or field within your app. This is perfect for passing feedback from an existing UI element to Appboy. The method will return a boolean which indicates whether or not the feedback was queued for delivery.

## Third Party Provider Integrations

Appboy has easy integrations with both [Desk.com][13] and [Zendesk][14]. So long as you are collecting feedback through our ready-made UI or manually using the `submitFeedback` method, you can pass that feedback through to either third party provider. This will afford you the benefit of having the entire user profile card available to the CSR handling the case, and allow you to segment based upon the number of feedback requests a user has submitted.

To take advantage of these integrations, please visit the ["feedback" section within the "app settings" page][15]

#### Implementation Example

See the [`DroidBoyActivity.java` file][4] in the Droidboy sample app.

## Theming the Appboy Feedback UI

The Appboy UI elements (the feedback form and news feed) come with a default look and feel that matches the Android standard UI guidelines and provides a seamless experience. You can see these default styles in the `res/values/style.xml` file in the Appboy SDK distribution. They are completely open source and completely customizable to suit your application's aesthetic.

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

## Overriding Styles <a class="margin-fix" name="style-overrides"></a>

If you would prefer, you can override these styles to create a look and feel that better suits your app. To override a style, copy it in its entirety to the `styles.xml` file in your own project and make modifications. The whole style must be copied over to your local `styles.xml` file in order for all of the attributes to be correctly set.

### Correct Style Override

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

### Incorrect Style Override

```xml
<style name="Appboy.Feed.List">
  <item name="android:background">@color/mint</item>
  <item name="android:cacheColorHint">@color/mint</item>
</style>
```

### Feedback Form Style Elements

![Android Feedback][20]

[1]: /assets/img/droidfeed.png "Android News Feed and Feedback Form"
[2]: http://developer.android.com/guide/components/fragments.html
[3]: http://developer.android.com/guide/components/fragments.html#Adding "Android Documentation: Fragments"
[4]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/DroidBoyActivity.java
[5]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/models/outgoing/Feedback.html "Feedback documentation"
[6]: /SDK_Integration/Android_and_FireOS
[7]: #feedback-integration
[8]: #feedback-form
[9]: #manual-feedback
[10]: #implementation
[13]: http://www.desk.com
[14]: http://www.zendesk.com
[15]: https://dashboard.appboy.com/app_settings/app_settings/feedback/
[16]: #third-party
[17]: #theming-overview
[18]: #style-overrides
[20]: /assets/img/Image31Theming.png "Android Feedback"
