---
title: Setting Custom Attributes
platform: Xamarin
subplatform: Android and FireOS
---
## Setting Custom Attributes

See [the Android integration instructions][1] for in depth discussion of attribute tracking best practices and interfaces.

**Xamarin C#**

```csharp
Appboy.GetInstance(Activity).CurrentUser.SetFirstName("FirstName");
```

[1]: /Android/#setting-custom-attributes "Android Instructions"
