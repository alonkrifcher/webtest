---
title: Logging Purchases
platform: Web
---
## Logging Purchases

__Please Note!__ The Appboy Web SDK is currently in beta. If you have any questions, please contant support@appboy.com.

Record in-app purchases so that you can track your revenue over time and across revenue sources, as well as segment your users by their lifetime value.

Appboy supports purchases in multiple currencies. Purchases that you report in a currency other than USD will be shown in the dashboard in USD based on the exchange rate at the date they were reported.

Before implementation, be sure to review examples of the segmentation options afforded by Custom Events vs. Custom Attributes vs Purchase Events in our [Best Practices section][3].

__Time Estimate: 3-5 Minutes__

To use this feature, add this method call after a successful purchase in your app:

```javascript
appboy.logPurchase(productId, "USD", price, quantity);
```

See the [JSdocs][8] for more information.

### Adding Properties

You can add metadata about purchases by passing an object of key-value pairs with your purchase information. Keys are `string` objects and values can be `string`, `numeric`, `boolean`, or `Date` objects.

```javascript
appboy.logPurchase(productId, "USD", price, quantity, {key: "value"});
```

See the [Jsdocs][8] for more information.

### REST API

You can also use our REST API to record purchases. Refer to the [User API documentation][1] for details.

[1]: /REST_APIs/User_Data "User Data API"
[3]: /User_Data_Collection/Best_Practices "Best Practices & Segmentation"
[8]: https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#.logPurchase
