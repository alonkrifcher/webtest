---
title: In App Messages
platform: Xamarin
subplatform: iOS
---
# In-App Messages

In-App messages will work by default if you've included the Appboy.bundle folder in your application.  On Xamarin we don't currently support In-App message custom styling.  If you would like to customize your in-app message UI, please implement the ABKSlideupControllerDelegate method `bool OnSlideupReceived (ABKSlideup slideup);` and reply `true`. That will make sure Appboy passes you the in-app message object rather than displaying it for you. You will then have the option of displaying the in-app message object's content manually.

See [the iOS integration instructions][1] for information on In-App best practices.  Furthermore, you can look at the [sample application][2] for implementation samples.

[1]: /iOS/#in-app-messaging "iOS Instructions"
[2]: https://github.com/Appboy/appboy-xamarin-bindings/tree/master/appboy-component/samples
