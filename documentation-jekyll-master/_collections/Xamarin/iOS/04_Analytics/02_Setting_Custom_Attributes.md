---
title: Setting Custom Attributes
platform: Xamarin
subplatform: iOS
---
## Setting Custom Attributes

See [the iOS integration instructions][1] for in depth discussion of attribute tracking best practices and interfaces.

**Xamarin C#**

```csharp
Appboy.SharedInstance ().User.FirstName = "YOUR_NAME";
```

**Implementation Example**

You can see user properties being set in the sample application's `UserPropertyButtonHandler` method inside `AppboySampleViewController.cs`.

[1]: /iOS/#setting-custom-attributes "iOS Instructions"
