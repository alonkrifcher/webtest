---
title: Setting User IDs
platform: Android and FireOS
---
## Setting User IDs

User IDs should be set for each of your users. These should be unchanging and accessible when a user opens the app. A database ID or a hashed email address/username is usually a good reference to use. We __strongly recommend__ providing this identifier as it will allow you to:

- Track your users across devices and platforms, improving the quality of your behaviorial and demographic data.
- Import data about your users using our [User Data API][1].
- Target specific users with our [Messaging API][2] for both general and transactional messages.

__Note__: If such an identifier is not available, Appboy will assign a unique identifier to your users, but you will lack the capabilities above. You should avoid setting User IDs for users for whom you lack a unique identifier that is tied to them as an individual. Passing a device identifier offers no benefit versus the automatic anonymous user tracking Appboy offers by default.

__Note__: These User IDs should be private and not easily obtained (e.g. not a plain email address or username).

### Assigning a User ID
__Time Estimate: 3 Minutes__

You should make the following call as soon as the user is identified (generally after logging in) in order to set the user id:

```java
Appboy.getInstance(YOUR_ACTIVITY.this).changeUser(YOUR_USER_ID_STRING);
```

__Note__: __Do not call `changeUser()` when a user logs out. `changeUser()` should only be called when the user logs into the application.__ Setting `changeUser()` to a static default value will associate ALL user activity with that default "user" until the user logs in again.
Additionally, we recommend against changing the user ID when a user logs out it makes you unable to target the previously logged-in user with reengagement campaigns. If you anticipate multiple users on the same device, but only want to target one of them when your app is in a logged out state, we recommend separately keeping track of the user ID you want to target while logged out and switching back to that user ID as part of your app's logout process.

Refer to the [changeUser documentation][4] for more information.

#### Implementation Example

See the [`UserProfileDialog.java` file][3] in the Droidboy sample app.

Full class information can be found in the [javadocs][4].

#### Automatic Preservation of Anonymous User History

| Identification Context | Preservation Behavior |
| ---------------------- | -------------------------- |
| User __has not__ been previously identified | Anonymous history __is merged__ with user profile upon identification |
| User __has been__ previously identified in-app or via API | Anonymous history __is not merged__ with user profile upon identification |

#### Additional Notes and Best Practices
Please note the following:

- __If your app is used by multiple people, you can assign each user a unique identifier to track them.__
- __Once a user ID has been set, you cannot revert that user to an anonymous profile__
- __Do Not change the user ID upon a user "log out".__
  - Doing so separates the device from the user profile. You will be unable to target the previously logged out user with re-engagement messages. If you anticipate multiple users on the same device, but only want to target one of them when your app is in a logged out state, we recommend separately keeping track of the user ID you want to target while logged out and switching back to that user ID as part of your app's logout process. By default, only the last user that was logged in will receive push notifications from your app.
- __Switching from one identified user to another is a relatively costly operation.__
  - When you request the user switch, the current session for the previous user is automatically closed and a new session is started. Furthermore, Appboy will automatically make a data refresh request for the news feed, slideup and other Appboy resources for the new user.
- __Note:__ If you opt to use a hash of a unique identifier as your userID take care to ensure that you're normalizing the input to your hashing function.
  - e.g. If you're going to use a hash of an email address, ensure that you're stripping leading and trailing whitespace from the input, and taking [localization problems][6] into account.


[1]: /REST_APIs/User_Data "User API"
[2]: /REST_APIs/Messaging "Messaging API"
[3]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/UserProfileDialog.java
[4]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/Appboy.html#changeUser(java.lang.String) "Javadocs"
[6]: http://developer.android.com/reference/java/util/Locale.html#default_locale "Android Developer Docs - Localization"
