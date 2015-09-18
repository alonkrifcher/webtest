---
title: Setting Custom Attributes
platform: iOS
---
## Setting Custom Attributes

Appboy provides methods for assigning attributes to users. You'll be able to filter and segment your users according to these attributes on the dashboard.

Before implementation, be sure to review examples of the segmentation options afforded by Custom Events vs. Custom Attributes vs Purchase Events in our [Best Practices section][1].

__Time Estimate: 5 Minutes__

### Assigning Standard User Attributes

To assign user attributes, you need to set the appropriate field on the shared `ABKUser` object. For example, to assign the current user's first name to be "Jeff," you would use the following line of code:

**Objective-C**

```objc
[Appboy sharedInstance].user.firstName = @"Jeff";
```

**Swift**

```swift
Appboy.sharedInstance().user.firstName = "Jeff"
```

The following attributes should be set on the `ABKUser` object:

- `firstName`
- `lastName`
- `email`
- `dateOfBirth`
- `country`
- `homeCity`
- `bio`
- `phone`
- `foursquareAccessToken`
- `userID`
- `avatarImageURL`
- `twitterAccountIdentifier`
- `gender`

__We strongly recommend collecting email addresses__ even if you're not sending emails through Appboy. Email makes it easier to search for individual user profiles and troubleshoot issues as they arise.

### Assigning Custom User Attributes

Beyond the attributes above, Appboy also allows you to define Custom Attributes using a number of different data types:
For more information regarding the segmentation options each of these attributes will afford you see our ["Best Practices" documentation][1] within this section.

#### Custom Attribute with a Boolean Value

**Objective-C**

```objc
[[Appboy sharedInstance].user setCustomAttributeWithKey:@"your-attribute-string" andBOOLValue:yourBOOLValue];
```

**Swift**

```swift
Appboy.sharedInstance().user.setCustomAttributeWithKey("your-attribute-string", andBOOLValue: yourBoolValue)
```

#### Custom Attribute with an Integer Value

**Objective-C**

```objc
[[Appboy sharedInstance].user setCustomAttributeWithKey:@"your-attribute-string" andIntegerValue:yourIntegerValue];
```

**Swift**

```swift
Appboy.sharedInstance().user.setCustomAttributeWithKey("your-attribute-string", andIntegerValue: yourIntegerValue)
```

#### Custom Attribute with a Double Value

**Objective-C**

```objc
[[Appboy sharedInstance].user setCustomAttributeWithKey:@"your-attribute-string" andDoubleValue:yourDoubleValue];
```

**Swift**

```swift
Appboy.sharedInstance().user.setCustomAttributeWithKey("your-attribute-string", andDoubleValue: yourDoubleValue)
```
__Note__: Appboy treats FLOAT and DOUBLE values exactly the same within our database.

#### Custom Attribute with a String Value

**Objective-C**

```objc
[[Appboy sharedInstance].user setCustomAttributeWithKey:@"your-attribute-string" andStringValue:"Your String"];
```

**Swift**

```swift
Appboy.sharedInstance().user.setCustomAttributeWithKey("your-attribute-string", andStringValue: "Your String")
```

#### Custom Attribute with a Date Value

**Objective-C**

```objc
[[Appboy sharedInstance].user setCustomAttributeWithKey:@"your-attribute-string" andDateValue:yourDateValue];
```

**Swift**

```swift
Appboy.sharedInstance().user.setCustomAttributeWithKey("your-attribute-string", andDateValue:yourDateValue)
```
__Note__: Dates passed to Appboy must be in the [ISO 8601][2] format. For example: `2014-03-18`

#### Custom Attribute with an Array Value

**Objective-C**

```objc
// Setting a custom attribute with an array value
[[Appboy sharedInstance].user setCustomAttributeArrayWithKey:@"array_name" array:@[@"value1",  @"value2"]];
// Adding to a custom attribute with an array value
[[Appboy sharedInstance].user addToCustomAttributeArrayWithKey:@"array_name" value:@"value3"];
// Removing a value from an array type custom attribute
[[Appboy sharedInstance].user removeFromCustomAttributeArrayWithKey:@"array_name" value:@"value2"];
// Removing an entire array and key
[[Appboy sharedInstance].user setCustomAttributeArrayWithKey:@"array_name" array:nil];
```

**Swift**

```swift
// Setting a custom attribute with an array value
Appboy.sharedInstance().user.setCustomAttributeArrayWithKey("array_name", array: ["value1",  "value2"])
// Adding to a custom attribute with an array value
Appboy.sharedInstance().user.addToCustomAttributeArrayWithKey("array_name", value: "value3")
// Removing a value from an array type custom attribute
Appboy.sharedInstance().user.removeFromCustomAttributeArrayWithKey("array_name", value: "value2")
```

#### Unsetting a Custom Attribute

Custom Attributes can also be unset using the following method:

**Objective-C**

```objc
[[Appboy sharedInstance].user unsetCustomAttributeWithKey:@"your-attribute-string"];
```

**Swift**

```swift
Appboy.sharedInstance().user.unsetCustomAttributeWithKey("your-attribute-string")
```

#### Incrementing/Decrementing Custom Attributes

This code is an example of an incrementing custom attribute. You may increment the value of a custom attribute by any positive or negative integer or long value.

**Objective-C**

```objc
[[Appboy sharedInstance].user incrementCustomUserAttribute:@"Attribute Key" by:incrementIntegerValue];
```

**Swift**

```swift
Appboy.sharedInstance().user.incrementCustomUserAttribute("Attribute Key", by: incrementIntegerValue)
```

#### Setting a Custom Attribute via the REST API

You can also use our REST API to set user attributes. To do so refer to the [user API documentation][3].

#### Custom Attribute Value Limits

Custom attribute values have a maximum length of 255 characters; longer values will be truncated.

### Implementation Example

User Attributes are set within the [`UserAttributeViewController.m` file][4] within the stopwatch sample application.

- More details can be found within the [`ABKUser.h` file][5].
- In addition, you may refer to the [ABKUser documentation][6] for more information.

### Setting Up User Subscriptions

To set up a subscription for your users (either email or push), call the functions `setEmailNotificationSubscriptionType` or `setPushNotificationSubscriptionType`, respectively. Both of these functions take the enum type `ABKNotificationSubscriptionType` as arguments. This type has three different states:

| Subscription Status | Definition |
| ------------------- | ---------- |
| `ABKOptedin` | Subscribed, and explicitly opted in |
| `ABKSubscribed` | Subscribed, but not explicitly opted in |
| `ABKUnsubscribed` | Unsubscribed and/or explicitly opted out |

- __Note:__ Users who grant permission for an app to send them push notifications are defaulted to the status of `ABKOptedin` as iOS requires an explicit optin.
- Users will be set to `ABKSubscribed` automatically upon receipt of a valid email address, however we suggest that you establish an explicit opt-in process and set this value to `OptedIn` upon reciept of explicit consent from your user. [See Appboy Academy for details][12].

#### Setting Email Subscriptions

**Objective-C**

```objc
[[Appboy sharedInstance].user setEmailNotificationSubscriptionType: ABKNotificationSubscriptionType]
```

**Swift**

```swift
Appboy.sharedInstance().user.setEmailNotificationSubscriptionType(ABKNotificationSubscriptionType)
```

#### Setting Push Notification Subscriptions

**Objective-C**

```objc
[[Appboy sharedInstance].user setPushNotificationSubscriptionType: ABKNotificationSubscriptionType]
```

**Swift**

```swift
Appboy.sharedInstance().user.setPushNotificationSubscriptionType(ABKNotificationSubscriptionType)
```

__Note:__ Users who grant permission for an app to send them push notifications are defaulted to the status of `ABKOptedin` as iOS requires an explicit optin.

For more information on implementing subscriptions, visit the topic on [Appboy Academy][10].

[1]: /User_Data_Collection/Best_Practices
[2]: http://en.wikipedia.org/wiki/ISO_8601
[3]: /REST_APIs/User_Data
[4]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Stopwatch/UserAttributesViewController.m
[5]: https://github.com/Appboy/appboy-ios-sdk/blob/master/AppboyKit/headers/AppboyKitLibrary/Appboy.h
[6]: http://appboy.github.io/appboy-ios-sdk/docs/interface_a_b_k_user.html
[10]: https://academy.appboy.com/Deep_Dives/Managing_User_Subscriptions "Subscription Academy"
[12]: https://academy.appboy.com/Deep_Dives/Data_Opt-in#explicit-opt-ins "Explicit Opt-In: Appboy Academy"
