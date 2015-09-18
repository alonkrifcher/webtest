---
title: Setting Custom Attributes
platform: Android and FireOS
---
## Setting Custom Attributes

Appboy provides methods for assigning attributes to users. You'll be able to filter and segment your users according to these attributes on the dashboard.

Before implementation, be sure to review examples of the segmentation options afforded by Custom Events vs. Custom Attributes vs Purchase Events in our [Analytics Overview][7].

__Time Estimate: 5 Minutes__

### Assigning Standard User Attributes

To assign attributes to your users, call the `getCurrentUser()` method on your Appboy instance to get a reference to the current user of your app. Once you have a reference to the current user, you can call methods to set predefined or custom attributes.

Appboy provides predefined methods for setting the following user attributes within the [AppboyUser class][2]. See the [JavaDocs for method specifications][2]:

- First Names
- Last Names
- Biographical Strings (Max 255 Characters)
- Country
- Date of Birth
- Email
- Avatar Image URLs for Appboy User Profiles
- Gender
- Home City
- Phone Number
- Facebook Data
- Twitter Data

__We strongly recommend collecting email addresses__ even if you're not sending emails through Appboy. Email makes it easier to search for individual user profiles and troubleshoot issues as they arise.

##### Implementation Example
This is what setting a first name would look like in code:

```java
Appboy.getInstance(YOUR_ACTIVITY.this).getCurrentUser().setFirstName("SomeFirstName");
```

See [`UserProfileDialog.java`][1] in the Droidboy sample app.

### Assigning Custom User Attributes

In addition to our predefined user attribute methods, Appboy also provides custom attributes to track data from your applications. Appboy Custom Attributes can be set with the following data types:

- Strings
- Arrays
  - Includes methods to set arrays, add items to existing arrays, and delete items from existing arrays.
- Integers
- Booleans
- Dates
- Longs
- Floats

Full method specifications for custom attributes can be found here within the [AppboyUser class within the Javadocs][2].

#### Setting a Custom Attribute with a String Value

```java
Appboy.getInstance(YOUR_ACTIVITY.this).getCurrentUser().setCustomUserAttribute(
  YOUR_ATTRIBUTE_KEY_STRING,
  YOUR_STRING_VALUE
);
```

#### Setting a Custom Attribute with an Integer Value

```java
Appboy.getInstance(YOUR_ACTIVITY.this).getCurrentUser().setCustomUserAttribute(
  YOUR_ATTRIBUTE_KEY_STRING,
  YOUR_INT_VALUE
// Integer attributes may also be incremented using code like the following:
Appboy.getInstance(YOUR_ACTIVITY.this).getCurrentUser().incrementCustomUserAttribute(
  YOUR_ATTRIBUTE_KEY_STRING,
  THE_INTEGER_VALUE_BY_WHICH_YOU_WANT_TO_INCREMENT_THE_ATTRIBUTE
);
```

#### Setting a Custom Attribute with a Boolean Value

```java
Appboy.getInstance(YOUR_ACTIVITY.this).getCurrentUser().setCustomUserAttribute(
  YOUR_ATTRIBUTE_KEY_STRING,
  YOUR_BOOLEAN_VALUE
);
```

#### Setting a Custom Attribute with a Long Value

```java
Appboy.getInstance(YOUR_ACTIVITY.this).getCurrentUser().setCustomUserAttribute(
  YOUR_ATTRIBUTE_KEY_STRING,
  YOUR_LONG_VALUE
);
```

#### Setting a Custom Attribute with a Float Value

```java
Appboy.getInstance(YOUR_ACTIVITY.this).getCurrentUser().setCustomUserAttribute(
  YOUR_ATTRIBUTE_KEY_STRING,
  YOUR_FLOAT_VALUE
);
```

#### Setting a Custom Attribute with a Date Value

```java
Appboy.getInstance(YOUR_ACTIVITY.this).getCurrentUser().setCustomUserAttribute(
  YOUR_ATTRIBUTE_KEY_STRING,
  YOUR_DATE_VALUE
);
// This method will assign the current time to a custom attribute at the time the method is called:
Appboy.getInstance(YOUR_ACTIVITY.this).getCurrentUser().setCustomUserAttributeToNow(
  YOUR_ATTRIBUTE_KEY_STRING
);
// This method will assign the date specified by secondsFromEpoch to a custom attribute:
Appboy.getInstance(YOUR_ACTIVITY.this).getCurrentUser().setCustomUserAttributeToSecondsFromEpoch(
  YOUR_ATTRIBUTE_KEY_STRING,
  long secondsFromEpoch
);
);
```
__Note__: Dates passed to Appboy with this method must be in the [ISO 8601][3] format. For example: `2014-03-18`

#### Setting a Custom Attribute with an Array Value

```java
// Setting a custom attribute with an array value
appboyUser.setCustomAttributeArray("custom_attribute_array_test", testSetArray);
// Adding to a custom attribute with an array value
appboyUser.addToCustomAttributeArray("custom_attribute_array_test", testAddString);
// Removing a value from an array type custom attribute
appboyUser.removeFromCustomAttributeArray("custom_attribute_array_test", testRemString);
```

#### Unsetting a Custom Attribute

Custom Attributes can also be unset using the following method:

```java
Appboy.getInstance(YOUR_ACTIVITY.this).getCurrentUser().unsetCustomUserAttribute(
  YOUR_ATTRIBUTE_KEY_STRING
);
```

#### Setting a Custom Attribute via the REST API

You can also use our REST API to set user attributes. To do so refer to the [User API documentation][4].

#### Custom Attribute Length

Custom attribute keys and values have a maximum length of 255 characters.  Longer strings will be truncated to 255 characters.

#### Reserved Key Prefixes
Custom attribute keys may not start with the following reserved prefixes:

- `appboy`

#### Reserved Keys
The following reserved keys may not be used as custom attribute keys:

- `first_name`
- `last_name`
- `email`
- `bio`
- `gender`
- `dob`
- `country`
- `home_city`
- `email_subscribe`
- `phone`
- `facebook`
- `twitter`
- `image_url`
- `push_subscribe`

##### Implementation Example

See [`CustomLoggingDialog.java`][5] in the Droidboy sample app.

Full class information can be found in the [javadocs][2].

### Setting Up User Subscriptions

To set up a subscription for your users (either email or push), call the functions `setEmailNotificationSubscriptionType()`  or `setPushNotificationSubscriptionType()`, respectively. Both of these functions take the enum type 'NotificationSubscriptionType' as arguments. This type has three different states:

| Subscription Status | Definition |
| ------------------- | ---------- |
| `OPTED_IN` | Subscribed, and explicitly opted in |
| `SUBSCRIBED` | Subscribed, but not explicitly opted in |
| `UNSUBSCRIBED` | Unsubscribed and/or explicitly opted out |

__Note:__ No explicit opt-in is required by Android to send users push notifications. When a user is registered for push, they are set to `SUBSCRIBED` rather than `OPTED_IN` by default. For more information on implementing subscriptions and explicit opt-ins, visit the topic on [Appboy Academy][10].

#### Sample Code

##### Setting Email Subscriptions

```java
Appboy.getInstance(YOUR_ACTIVITY.this).getCurrentUser().setEmailNotificationSubscriptionType(
  "NotificationSubscriptionType"
);
```

##### Setting Push Notification Subscription

```java
Appboy.getInstance(YOUR_ACTIVITY.this).getCurrentUser().setPushNotificationSubscriptionType(
  "NotificationSubscriptionType"
);
```

[1]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/UserProfileDialog.java
[2]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/AppboyUser.html "Javadocs"
[3]: http://en.wikipedia.org/wiki/ISO_8601
[4]: /REST_APIs/User_Data "User Data API"
[5]: https://github.com/Appboy/appboy-android-sdk/blob/master/droidboy/src/com/appboy/sample/CustomLoggingDialog.java
[7]: #overview
[10]: https://academy.appboy.com/Deep_Dives/Managing_User_Subscriptions "Subscription Academy"
