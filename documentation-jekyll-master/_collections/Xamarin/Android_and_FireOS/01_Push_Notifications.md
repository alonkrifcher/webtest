---
title: Push Notifications
platform: Xamarin
subplatform: Android and FireOS
---
# Push Notifications

See [the Android integration instructions][1] for information on how to integrate push into your Xamarin Android app.  Furthermore, you can look at the [sample application][2] to see how the namespaces change from java to c#.

In particular, look at: 1) the [application's BroadcastReciever][3] to see how to route Appboy intents and start your app from push, 2) the [the MainActivty][4] to see how to log push opens,
3) the [Appboy.xml][5] to see how to set up credentials, and 4) the [AndroidManifest][6] to see how to set permissions for Appboy GCM.

[1]: /Android/#push-notifications "Android Instructions"
[2]: https://github.com/Appboy/appboy-xamarin-bindings
[3]: https://github.com/Appboy/appboy-xamarin-bindings/blob/master/appboy-component/samples/android/TestApp.XamarinAndroid/AppboyBroadcastReceiver.cs
[4]: https://github.com/Appboy/appboy-xamarin-bindings/blob/master/appboy-component/samples/android/TestApp.XamarinAndroid/MainActivity.cs
[5]: https://github.com/Appboy/appboy-xamarin-bindings/blob/master/appboy-component/samples/android/TestApp.XamarinAndroid/Resources/values/Appboy.xml
[6]: https://github.com/Appboy/appboy-xamarin-bindings/blob/master/appboy-component/samples/android/TestApp.XamarinAndroid/Properties/AndroidManifest.xml
