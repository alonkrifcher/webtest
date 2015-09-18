---
title: Customer Feedback
platform: Xamarin
subplatform: Android and FireOS
---
# Customer Feedback

See [the Android integration instructions][1] for information on how to integrate the feedback form into your Xamarin Android app.  Furthermore, you can look at the [sample application][2] for implementation samples.

In brief:  add an AppboyFeedbackFragment

```csharp
AppboyFeedbackFragment feedbackFragment = new AppboyFeedbackFragment();
```

to your view hierarchy.  The default way to handle returning from submitting a Feedback form is popping the back stack.  Do this when the feed is finished by adding an
IFeedbackFinishedListener to the feedbackFragment.

```csharp
feedbackFragment.SetFeedbackFinishedListener(new FeedbackFinishedListener(Activity.SupportFragmentManager));
...

```csharp
class FeedbackFinishedListener : Java.Lang.Object, AppboyFeedbackFragment.IFeedbackFinishedListener {
  FragmentManager mFragmentManager;

  public FeedbackFinishedListener(FragmentManager supportFragmentManager) {
    mFragmentManager = supportFragmentManager;
  }

  public void OnFeedbackFinished () {
    Console.WriteLine ("Feedback finished");
    mFragmentManager.PopBackStack ();
  }
}
```

[1]: /Android/#customer-feedback "Android Instructions"
[2]: https://github.com/Appboy/appboy-xamarin-bindings/tree/master/appboy-component/samples
