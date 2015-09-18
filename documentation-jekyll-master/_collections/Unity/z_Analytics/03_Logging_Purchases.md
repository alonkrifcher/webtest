---
title: Logging Purchases
platform: Unity
---
## Logging Purchases

Record in-app purchases so that you can track your revenue over time and across revenue sources, as well as segment your users by their lifetime value.

Appboy supports purchases in multiple currencies. Purchases that you report in a currency other than USD will be shown in the dashboard in USD based on the exchange rate at the date they were reported.

Before implementation, be sure to review examples of the segmentation options afforded by Custom Events vs. Custom Attributes vs Purchase Events in our [Best Practices section][5].

__Time Estimate: 3-5 Minutes__

To use this feature, add this method call after a successful purchase in your app:

```csharp
LogPurchase("product ID", "USD", 12.5m)
```

- Supported currency symbols include: USD, CAD, EUR, GBP, JPY, AUD, CHF, NOK, MXN, NZD, CNY, RUB, TRY, INR, IDR, ILS, SAR, ZAR, AED, SEK, HKD, SPD, DKK, and TWD.
  - Any other provided currency symbol will result in a logged warning and no other action taken by the SDK.

### REST API

You can also use our REST API to record purchases. Refer to the [user API documentation][4] for details.

[1]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Stopwatch/InitialViewController.m
[2]: https://github.com/Appboy/appboy-ios-sdk/blob/master/AppboyKit/headers/AppboyKitLibrary/Appboy.h
[3]: http://appboy.github.io/appboy-ios-sdk/docs/interface_appboy.html#a63d8c390bff05f87c7f8f86f2fc0deb6 "logPurchase:inCurrency:atPrice"
[4]: /REST_APIs/User_Data "User Data API"
[5]: /User_Data_Collection/Best_Practices "Best Practices & Segmentation"
