---
title: Logging Custom Events
platform: Xamarin
subplatform: Android and FireOS
---
## Logging Custom Events

See [the Android integration instructions][1] for in depth discussion of event tracking best practices and interfaces.

**Xamarin C#**

```csharp
Appboy.GetInstance(this).LogCustomEvent("YOUR_EVENT_NAME");
```

[1]: /Android/#logging-custom-events "Android Instructions"
