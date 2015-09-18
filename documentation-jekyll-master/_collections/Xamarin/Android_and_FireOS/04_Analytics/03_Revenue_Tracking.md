---
title: Logging Purchases
platform: Xamarin
subplatform: Android and FireOS
---
## Logging Purchases

See [the Android integration instructions][1] for in depth discussion of revenue tracking best practices and interfaces.

**Xamarin C#**

```csharp
Appboy.GetInstance(this).LogPurchase("YOUR_PURCHASE_NAME", 100);
```

[1]: /Android/#logging-purchases "Android Instructions"
