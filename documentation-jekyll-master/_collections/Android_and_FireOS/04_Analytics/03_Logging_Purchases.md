---
title: Logging Purchases
platform: Android and FireOS
---
## Logging Purchases

Record in-app purchases so that you can track your revenue over time and across revenue sources, as well as segment your users by their lifetime value.

Appboy supports purchases in multiple currencies. Purchases that you report in a currency other than USD will be shown in the dashboard in USD based on the exchange rate at the date they were reported.

Before implementation, be sure to review examples of the segmentation options afforded by Custom Events vs. Custom Attributes vs Purchase Events in our [Analytics Overview][3].

### Tracking Purchases & Revenue
__Time Estimate: 3-5 Minutes__

To use this feature, add this method call after a successful purchase in your app:

```java
Appboy.getInstance(YOUR_ACTIVITY.this).logPurchase(
   String productId,
   String currencyCode,
   BigDecimal price,
   int quantity
);
```

See the [Javadoc][8] for more information.

#### Adding Properties

You can add metadata about purchases by passing an [Appboy Properties][4] object with your purchase information.

Properties are defined as key-value pairs.  Keys are `String` objects and values can be `String`, `int`, `float`, `boolean`, or [`Date`][5] objects.

```java
AppboyProperties purchaseProperties = new AppboyProperties();
purchaseProperties.addProperty("key", "value");
Appboy.getInstance(YOUR_ACTIVITY.this).logPurchase(..., purchaseProperties);
```

See the [Javadoc][6] for more information.

#### REST API

You can also use our REST API to record purchases. Refer to the [User API documentation][1] for details.

#### Implementation Examples

See [`PreferencesActivity.java`][2] and [`CustomLoggingDialog.java`][7] in the Droidboy sample app.

[1]: /REST_APIs/User_Data "User Data API"
[2]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/PreferencesActivity.java
[3]: #overview
[4]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/models/outgoing/AppboyProperties.html
[5]: http://developer.android.com/reference/java/util/Date.html
[6]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/Appboy.html#logPurchase(java.lang.String,%20java.lang.String,%20java.math.BigDecimal,%20int,%20com.appboy.models.outgoing.AppboyProperties)
[7]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/CustomLoggingDialog.java
[8]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/Appboy.html#logPurchase(java.lang.String,%20java.lang.String,%20java.math.BigDecimal,%20int)
