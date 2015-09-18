---
title: Setting Custom Attributes
platform: Windows
subplatform: Universal
---
## Setting Custom Attributes

Appboy provides methods for assigning attributes to users. You'll be able to filter and segment your users according to these attributes on the dashboard.

Before implementation, be sure to review examples of the segmentation options afforded by Custom Events vs. Custom Attributes vs Purchase Events in our [Best Practices section][7].

__Time Estimate: 5 Minutes__

User attributes can be assigned to the current `IAppboyUser`. To obtain a reference to the current `IAppboyUser`, call `Appboy.SharedInstance.AppboyUser`

The following attributes should be defined as properties of the `IAppboyUser`:

- `FirstName`
- `LastName`
- `Email`
- `Bio`
- `Gender`
- `DateOfBirth`
- `Country`
- `HomeCity`
- `PhoneNumber`
- `FacebookData`
- `TwitterData`

__Note__: It's still valuable to set `email` addresses even if you're not sending emails through Appboy. Email makes it easier to search for individual user profiles and troubleshoot issues as they arise.

**Example Implementation**

```csharp
Appboy.SharedInstance.AppboyUser.FirstName = "User's First Name"
```

### Assigning Custom User Attributes

Beyond the attributes above, Appboy also allows you to define Custom Attributes using a number of different data types:
For more information regarding the segmentation options each of these attributes will afford you see our ["Best Practices" documentation][1] within this section.

#### Custom Attribute with a Boolean Value
```csharp
bool SetCustomAttribute(STRING_KEY, BOOL_VALUE);
```

#### Custom Attribute with an Integer Value
```csharp
bool SetCustomAttribute(STRING_KEY, INT_VALUE);
```

#### Custom Attribute with a Double Value
```csharp
bool SetCustomAttribute(STRING_KEY, DOUBLE_VALUE);
```
__Note__: Appboy treats FLOAT and DOUBLE values exactly the same within our database.

#### Custom Attribute with a String Value
```csharp
bool SetCustomAttribute(STRING_KEY, "STRING_VALUE");
```

#### Custom Attribute with a Long Value
```csharp
bool SetCustomAttribute(STRING_KEY, LONG_VALUE);
```

#### Custom Attribute with a Date Value
```csharp
bool SetCustomAttribute(STRING_KEY, "DATE_VALUE");
```
__Note__: Dates passed to Appboy must be in the [ISO 8601][2] format. For example: `2014-03-18`

#### Setting a Custom Attribute with an Array Value

```csharp
// Setting a custom attribute with an array value
Appboy.SharedInstance.EventLogger.SetCustomAttributeArray("custom_attribute_array_test", testSetArray);
// Adding to a custom attribute with an array value
Appboy.SharedInstance.EventLogger.AddToCustomAttributeArray("custom_attribute_array_test", testAddString);
// Removing a value from an array type custom attribute
Appboy.SharedInstance.EventLogger.RemoveFromCustomAttributeArray("custom_attribute_array_test", testRemString);
```

#### Incrementing/Decrementing Custom Attributes

This code is an example of an incrementing custom attribute. You may increment the value of a custom attribute by any positive or negative integer value.

```csharp
bool IncrementCustomAttribute(STRING_KEY, INCREMENT_INTEGER_VALUE);
```

#### Unsetting a Custom Attribute

Custom Attributes can also be unset using the following method:

```csharp
bool UnsetCustomAttribute(STRING_KEY);
```

**Implementation Example**

See the following [`ProfilePage.xaml.cs` file in our Windows Sample Application][3]

#### Setting a Custom Atttribute via the REST API

You can also use our REST API to set user attributes. To do so refer to the [user API documentation][4].

#### Custom Attribute Value Limits

Custom attribute values have a maximum length of 255 characters; longer values will be truncated.

### Managing Notification Subscription Statuses

To set up a subscription for your users (either email or push), you can set the subscription statuses below as properties of the `IAppboyUser`. Subscription statuses in Appboy have three different states for both Email and Push:

| Subscription Status | Definition |
| ------------------- | ---------- |
| `OptedIn` | Subscribed, and explicitly opted in |
| `Subscribed` | Subscribed, but not explicitly opted in |
| `UnSubscribed` | Unsubscribed and/or explicitly opted out |

- `EmailNotificationSubscriptionType`
  - Users will be set to `Subscribed` automatically upon receipt of a valid email address, however we suggest that you establish an explicit opt-in process and set this value to `OptedIn` upon reciept of explicit consent from your user. [See Appboy Academy for details][10].
- `PushNotificationSubscriptionType`
  - Users will be set to `Subscribed` automatically upon valid push registration, however we suggest that you establish an explicit opt-in process and set this value to `OptedIn` upon reciept of explicit consent from your user. [See Appboy Academy for details][10].

__Note__: These types fall under `AppboyPlatform.PCL.Models.NotificationSubscriptionType`

[1]: /User_Data_Collection/Best_Practices/ "Best Practices - Data Collection"
[2]: http://en.wikipedia.org/wiki/ISO_8601
[3]: https://github.com/Appboy/appboy-windows-samples/blob/master/Phone/Pages/ProfilePage.xaml.cs "Windows Universal Sample Implementation"
[4]: /REST_APIs/User_Data "user API"
[7]: /User_Data_Collection/Best_Practices "Best Practices & Segmentation"
[10]: https://academy.appboy.com/Deep_Dives/Managing_User_Subscriptions "Subscription Academy"
