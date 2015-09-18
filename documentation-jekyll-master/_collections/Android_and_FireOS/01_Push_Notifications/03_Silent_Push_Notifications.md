---
title: Silent Push Notifications
platform: Android and FireOS
---
## Silent Push Notifications

Silent notifications ([AKA "Send to Sync messages"][1]) allow you to notify your app when important events occur. You might have new instant messages to deliver, new issues of a magazine to publish, breaking news alerts to send, or the latest episode of your user’s favorite TV show ready for him or her to download for offline viewing. Silent notifications are great for sporadic but immediately important content, where the delay between background fetches might not be acceptable.

Silent notifications are available through our [Messaging RESTful API][2]. You need only set the `send_to_sync` flag to `true` within the [Android Push Object][3]. You should ensure there are no `title` or `alert` fields set within the [Android Push Object][3] as it will cause errors when `send_to_sync` is set to `true`. You can however still include data `extras` within the [Android Push Object][3].

This message will cause an intent to be received with an action `.intent.APPBOY_PUSH_RECEIVED`. Handling of this intent to cause any action such as a refresh of app content must be defined within the broadcast receiver you defined in [Step 4 of Enabling Push Notifications - Android][4]. Please see [AppboyBroadcastReceiver.java][5] for an example of this receiver.

[1]: https://developer.android.com/google/gcm/adv.html#s2s "Send to Sync Messages : Android Developer Documentation"
[2]: /REST_APIs/Messaging
[3]: /REST_APIs/Messaging#android-push
[4]: /Enabling_Message_Channels/Push_Notifications/Android#registering-opens
[5]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/AppboyBroadcastReceiver.java "AppboyBroadcastReceiver.java -- DroidBoy Sample Project"
