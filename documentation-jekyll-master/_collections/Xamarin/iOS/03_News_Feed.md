---
title: News Feed
platform: Xamarin
subplatform: iOS
---
# News Feed

See [the iOS integration instructions][1] for information on how to integrate the news feed into your Xamarin iOS app.  Furthermore, you can look at the [sample application][2] implementation samples.

Of all the implementation options, the quickest to implement is the Modal, which can be added by doing

```csharp
ABKFeedViewControllerModalContext m = new ABKFeedViewControllerModalContext ();
this.PresentViewController (m, true, null);
```

in your ViewController.

[1]: /iOS/#news-feed "iOS Instructions"
[2]: https://github.com/Appboy/appboy-xamarin-bindings/tree/master/appboy-component/samples
