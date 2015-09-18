---
title: Logging Purchases
platform: Windows
subplatform: Phone8
---
## Logging Purchases

Record in-app purchases so that you can track your revenue over time and across revenue sources, as well as segment your users by their lifetime value.

Appboy supports purchases in multiple currencies. Purchases that you report in a currency other than USD will be shown in the dashboard in USD based on the exchange rate at the date they were reported.

Before implementation, be sure to review examples of the segmentation options afforded by Custom Events vs. Custom Attributes vs Purchase Events in our [Best Practices section][3].

__Time Estimate: 3-5 Minutes__

To use this feature, add this method call after a successful purchase in your app:

Purchases are logged by using the `EventLogger`, which is a property exposed in IAppboy. To obtain a reference to the `EventLogger`, call `Appboy.SharedInstance.EventLogger`.

```Csharp
bool LogPurchase(string productId, string currencyCode, decimal price)
```

**Implementation Example**

See the following [`MiscPage.xaml.cs` file in our Windows Sample Application][1].

### REST API

You can also use our REST API to record purchases. Refer to the [user API documentation][2] for details.

[1]: https://github.com/Appboy/appboy-windows-samples/blob/master/Phone/Pages/MiscPage.xaml.cs
[2]: /REST_APIs/User_Data "User Data API"
[3]: /User_Data_Collection/Best_Practices "Best Practices & Segmentation"
