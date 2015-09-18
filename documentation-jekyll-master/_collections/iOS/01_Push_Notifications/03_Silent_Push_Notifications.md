---
title: Silent Push Notifications
platform: iOS
---
## Silent Push Notifications

Remote notifications allow you to notify your app when important events occur. You might have new instant messages to deliver, breaking news alerts to send, or the latest episode of your user’s favorite TV show ready for him or her to download for offline viewing. Remote notifications are great for sporadic but immediately important content, where the delay between background fetches might not be acceptable. Remote Notifications can also be much more efficient than Background Fetch, as your application only launches when necessary.

A Remote Notification is really just a normal Push Notification with the `content-available` flag set. You might send a push with an alert message informing the user that something has happened, while you update the UI in the background. But Remote Notifications can also be silent, containing no alert message or sound, used only to update your app’s interface or trigger background work. You might then post a local notification when you’ve finished downloading or processing the new content.

Silent push notifications are rate-limited, so don’t be afraid of sending as many as your application needs. iOS and the APNS servers will control how often they are delivered, and you won’t get into trouble for sending too many. If your push notifications are throttled, they might be delayed until the next time the device sends a keep-alive packet or receives another notification.

### Sending Remote Notifications
To send a remote notification, set the `content-available` flag in a push notification payload. When you’re sending a Remote Notification, you might also want to include some data in the notification payload, so your application can reference the event. This could save you a few networking requests and increase the responsiveness of your app.

The `content-available` flag can be set in the Appboy dashboard (pictured below) as well as within our [User API][1].

![content-available][2]

### Use Silent Remote Notifications to Trigger Background Work
Silent remote notifications can wake your app from a "Suspended" or "Not Running" state, to update content or run certain tasks without notifying your users. To send a silent remote push notification, you just need to set up the `content-available` flag with no message nor sound.
Please set up your app's background mode to enable `remote notifications` under "Capabilities" tab in your project settings.

![background-mode-enabled][3]


[1]: /REST_APIs/User_Data
[2]: /assets/img/remote_notification.png "content available"
[3]: /assets/img/background_mode.png "background mode enabled"
