---
title: Setting User IDs
platform: Xamarin
subplatform: Android and FireOS
---
## Setting User IDs

**Xamarin C#**

See [the Android integration instructions][1] for an in depth discussion of when to set and change a user ID.

```csharp
Appboy.GetInstance(this).ChangeUser("YOUR_USER_ID");
```

[1]: /Android/#setting-user-ids
