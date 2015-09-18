---
title: Tracking Custom Events
platform: Android and FireOS
---
## Tracking Custom Events

You can record custom events in Appboy to learn more about your app's usage patterns and to segment your users by their actions on the dashboard.

Before implementation, be sure to review examples of the segmentation options afforded by Custom Events vs. Custom Attributes vs Purchase Events in our [Analytics Overview][0].

### Adding A Custom Event
__Time Estimate: 5 Minutes__

```java
Appboy.getInstance(YOUR_ACTIVITY.this).logCustomEvent(YOUR_EVENT_NAME);
```

See the [Javadoc][2] for more information.

#### Adding Properties

You can add metadata about custom events by passing an [Appboy Properties][4] object with your custom event.

Properties are defined as key-value pairs.  Keys are `String` objects and values can be `String`, `int`, `float`, `boolean`, or [`Date`][3] objects.

```java
AppboyProperties eventProperties = new AppboyProperties();
eventProperties.addProperty("key", "value");
Appboy.getInstance(YOUR_ACTIVITY.this).logCustomEvent(YOUR_EVENT_NAME, eventProperties);
```

See the [Javadoc][6] for more information.

#### Implementation Examples

See [`DecisionFragment.java`][1] and [`CustomLoggingDialog.java`][5] in the Droidboy sample app.

[0]: #overview
[1]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/DecisionFragment.java
[2]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/Appboy.html#logCustomEvent(java.lang.String) "Javadocs"
[3]: http://developer.android.com/reference/java/util/Date.html
[4]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/models/outgoing/AppboyProperties.html
[5]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/CustomLoggingDialog.java
[6]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/Appboy.html#logCustomEvent(java.lang.String,%20com.appboy.models.outgoing.AppboyProperties)
