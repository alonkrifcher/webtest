---
title: Deep Linking to In-App Resources
platform: Android and FireOS
---
## Deep Linking to In-App Resources

### What is Deep Linking?

"Deep Linking" is a way of launching a native app and providing additional information telling it do some specific action or show specific content. It also allows Google to crawl your app content and allows users to enter your app from search results.

There are three parts to this:

1. Identify which app to launch
2. Instruct the app which action to perform
3. Provide the action with any additional data it will need

"Deep Links" contain all of these things. The key is defining a custom scheme. "http:" is the scheme with which almost everyone is familiar but schemes can begin with any word. A scheme must start with a letter, but can then contain letters, numbers, plus-signs, minus-signs, and dots. Practically speaking, there is no central registry to prevent conflicts, so it is a Best Current Practice to include your domain name in the scheme.

Everything after the colon within a "Deep Link" is free-form text. It is up to you to define its structure and interpretation, however a common convention is to model it after "http:" urls, including a leading "//" (or "///", leaving a null string where the hostname would normally appear) and query parameters (e.g. `?foo=1&bar=2`). Following this approach, the action would be specified by the path and the additional data would be either in the path or in a query string. e.g. "/user/johndoe" or "/show?user=johndoe".

These "Deep Links" are a powerful tool when used in tandem with the Appboy News Feed. "Providing "Deep Links" as the URL within News Feed items allows you to utilize the News Feed as an individualized navigation tool to direct users to content inside or outside of your app.

### Implementing Deep Linking in Android

Please follow the instructions found within the [Android Developer Documentation on Deep Linking][16].

### Deep Linking from a Push Notification

In order to open "Deep Links" that are sent to the user via the "Custom URI" field within a push notification you must implement a custom handler.

![Deep_Link_Dash_Example][15]

#### Modifying your Broadcast Receiver

When setting up Android push notifications, you added a [broadcast receiver to listen for opens and received intents][17]. This receiver should be using [AppboyBroadcastReceiver.java][18] as a model.

You can use the following code to check the extras bundle of a push notification for the key "deep_link":

```java
string stringValue = intent.getStringExtra(Constants.APPBOY_PUSH_CUSTOM_URI_KEY);
```

If `Constants.APPBOY_PUSH_CUSTOM_URI_KEY != null` you should use the "deep link/protocol URL" contained within the value of that constant to navigate to the appropriate activity within the application.

##### Implementation Example

The following code is an example from our Droidboy sample application and can be found within [AppboyBroadcastReceiver.java][18].

```java
// If a custom URI is defined, start an ACTION_VIEW intent pointing at the custom URI.
      // The intent returned from getStartActivityIntent() is placed on the back stack.
      // Otherwise, start the intent defined in getStartActivityIntent().
      if (intent.getStringExtra(Constants.APPBOY_PUSH_CUSTOM_URI_KEY) != null) {
        Intent uriIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(intent.getStringExtra(Constants.APPBOY_PUSH_CUSTOM_URI_KEY)));
        TaskStackBuilder stackBuilder = TaskStackBuilder.create(context);
        stackBuilder.addNextIntent(getStartActivityIntent(context, extras));
        stackBuilder.addNextIntent(uriIntent);
        stackBuilder.startActivities(extras);
      } else {
        context.startActivity(getStartActivityIntent(context, extras));
      }
    } else {
      Log.d(TAG, String.format("Ignoring intent with unsupported action %s", action));
    }
  }
```

### Deep Linking to the News Feed
To deeply link to the Appboy News Feed from a push notification we suggest you check for a specific Key/Value pair to queue your application to launch the FeedFragmentActivity. For example, you could use a key/value pair such as "Open_News_Feed" = "True". This Key/Value pair could be sent through the dashboard or via our [messaging REST API][9] as an `extras` property. Please see the example code below:

```java
  @Override
  public void onReceive(Context context, Intent intent) {
    Intent activityIntent;
    if (intent.getExtras() != null && getBooleanExtra(intent.getExtras().getBundle("extra"), "Open_News_Feed")) {
      activityIntent = new Intent(context, com.yourapp.NewsFeedActivity.class);
    } else {
      activityIntent = new Intent(context, com.yourapp.MainActivity.class);
    }
    // Set appropriate Intent flags.
    activityIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
    context.startActivity(activityIntent);
  }

  public boolean getBooleanExtra(Bundle extras, String key) {
    return extras != null && Boolean.parseBoolean(extras.getString(key));
  }
```

![News Feed Key Value][11]

[1]: http://developer.android.com/guide/components/intents-filters.html
[2]: http://en.wikipedia.org/wiki/Data_URI_scheme
[3]: http://developer.android.com/guide/components/activities.html
[4]: http://developer.android.com/training/basics/intents/filters.html#HandleIntent
[5]: http://developer.android.com/training/basics/intents/filters.html#AddIntentFilter
[9]: #deep-linking-from-a-push-notification
[11]: /assets/img/Open_News_Feed_Key_Value.png
[12]: http://developer.android.com/reference/android/content/Intent.html
[13]: #test-deep-links
[14]: http://developer.android.com/tools/help/adb.html
[15]: /assets/img/Android_Deep_Link_Example.png
[16]: http://developer.android.com/training/app-indexing/deep-linking.html
[17]: /Enabling_Message_Channels/Push_Notifications/Android#registering-opens
[18]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/AppboyBroadcastReceiver.java
