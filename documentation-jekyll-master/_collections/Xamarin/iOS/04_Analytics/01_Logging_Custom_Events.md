---
title: Logging Custom Events
platform: Xamarin
subplatform: iOS
---
## Logging Custom Events

See [the iOS integration instructions][1] for in depth discussion of event tracking best practices and interfaces.

**Xamarin C#**

```csharp
Appboy.SharedInstance ().LogCustomEvent ("YOUR_EVENT_NAME");
```

**Implementation Example**

`logCustomEvent` is utilized within the `AppboySampleViewController.cs` within the TestApp.XamariniOS sample application.

[1]: /iOS/#tracking-custom-events "iOS Instructions"
