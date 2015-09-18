---
title: Setting Custom Attributes
platform: Unity
---
## Setting Custom Attributes

Appboy provides methods for assigning attributes to users. You'll be able to filter and segment your users according to these attributes on the dashboard.

Before implementation, be sure to review examples of the segmentation options afforded by Custom Events vs. Custom Attributes vs Purchase Events in our [Best Practices section][1].

__Time Estimate: 5 Minutes__

### Assigning Standard User Attributes

To assign user attributes, you need to call the appropriate method on the AppboyBinding object. The following is a list of built-in attributes that can be called using this method.

#### First Name
`AppboyBinding.SetUserFirstName("first name")`

#### Last Name
`AppboyBinding.SetUserLastName("last name");`

#### User Email
`AppboyBinding.SetUserEmail("email@email.com");`

__Note__: It's still valuable to set `email` addresses even if you're not sending emails through Appboy. Email makes it easier to search for individual user profiles and troubleshoot issues as they arise.

#### User Bio
`AppboyBinding.SetUserBio("user bio");`

#### Gender
`AppboyBinding.SetUserGender(Appboy.Models.Gender.Male or Appboy.Models.Gender.Female);`

#### Birth Date
`AppboyBinding.SetUserDateOfBirth("year(int)", "month(int)", "day(month)");`

#### User Country
`AppboyBinding.SetUserCountry("country name");`

#### User Home City
`AppboyBinding.SetUserHomeCity("city name");`

#### User Email Subscription
`AppboyBinding.SetUserIsSubscribedToEmails('boolean value');`

#### User Phone Number
`AppboyBinding.SetUserPhoneNumber("phone number without hyphens");`

#### User Avatar Image URL
`AppboyBinding.SetUserAvatarImageURL("URL");`


### Assigning Custom User Attributes<a class="margin-fix" name="custom-attributes"></a>

Beyond the attributes above, Appboy also allows you to define Custom Attributes using a number of different data types:
For more information regarding the segmentation options each of these attributes will afford you see our ["Best Practices" documentation][1] within this section.


#### Custom Attribute with a Boolean Value

```csharp
AppboyBinding.SetCustomUserAttribute("custom boolean attribute key", 'boolean value');
```

#### Custom Attribute with an Integer Value

```csharp
// Set Integer Attribute
AppboyBinding.SetCustomUserAttribute("custom int attribute key", 'integer value');
// Increment Integer Attribute
AppboyBinding.IncrementCustomUserAttribute("key", increment(int))
```

#### Custom Attribute with a Double Value

```csharp
AppboyBinding.SetCustomUserAttribute("custom float attribute key", 'float value');
```

__Note__:Appboy treats FLOAT and DOUBLE values exactly the same within our database.

#### Custom Attribute with a String Value

```csharp
AppboyBinding.SetCustomUserAttribute("custom string attribute key", "string custom attribute");
```

#### Custom Attribute with a Date Value

```csharp
 AppboyBinding.SetCustomUserAttributeToNow("custom date attribute key");
```


```csharp
AppboyBinding.SetCustomUserAttributeToSecondsFromEpoch("custom date attribute key", 'integer value');
```

#### Custom Attribute with an Array Value

```csharp
// Setting An Array
AppboyBinding.SetCustomUserAttributeArray("key", array(List), sizeOfTheArray(int))
// Adding to an Array
AppboyBinding.AddToCustomUserAttributeArray("key", "Attribute")
// Removing an item from an Array
AppboyBinding.RemoveFromCustomUserAttributeArray("key", "Attribute")
```

__Note__: Dates passed to Appboy must be in the [ISO 8601][2] format. For example: `2014-03-18`

#### Unsetting a Custom Attribute

Custom Attributes can also be unset using the following method:

```csharp
AppboyBinding.UnsetCustomUserAttribute("custom attribute key");
```

### Setting a Custom Atttribute via the REST API
You can also use our REST API to set user attributes. To do so refer to the [user API documentation][3].

### Custom Attribute Value Limits
Custom attribute values have a maximum length of 255 characters; longer values will be truncated.

### Setting Up User Subscriptions <a class="margin-fix" name="user-subscriptions"></a>

To set up a subscription for your users (either email or push), call the functions     
`SetUserEmailNotificationSubscriptionType()` or `setPushNotificationSubscriptionType`, respectively. Both of these functions take the paramaters 'Appboy.Models.AppboyNotificationSubscriptionType' as arguments. This type has three different states:'

| Subscription Status | Definition |
| ------------------- | ---------- |
| `OPTED_IN` | Subscribed, and explicitly opted in |
| `SUBSCRIBED` | Subscribed, but not explicitly opted in |
| `UNSUBSCRIBED` | Unsubscribed and/or explicitly opted out |

__Note:__ No explicit opt-in is required by Windows to send users push notifications. When a user is registered for push, they are set to `SUBSCRIBED` rather than `OPTED_IN` by default. For more information on implementing subscriptions and explicit opt-ins, visit the topic on [Appboy Academy][10].

- `EmailNotificationSubscriptionType`
  - Users will be set to `Subscribed` automatically upon receipt of a valid email address, however we suggest that you establish an explicit opt-in process and set this value to `OptedIn` upon reciept of explicit consent from your user. [See Appboy Academy for details][8].
- `PushNotificationSubscriptionType`
  - Users will be set to `Subscribed` automatically upon valid push registration, however we suggest that you establish an explicit opt-in process and set this value to `OptedIn` upon reciept of explicit consent from your user. [See Appboy Academy for details][8].

__Note__: These types fall under `AppboyPlatform.PCL.Models.NotificationSubscriptionType`

### Sample Code

#### Email Subscription:
```objc
[[Appboy sharedInstance].user setEmailNotificationSubscriptionType: ABKNotificationSubscriptionType]
```

#### Push Notification Subscription:
```java
[[Appboy sharedInstance].user setPushNotificationSubscriptionType: ABKNotificationSubscriptionType]
```


[1]: /User_Data_Collection/Best_Practices/ "Best Practices - Data Collection"
[2]: http://en.wikipedia.org/wiki/ISO_8601
[3]: /REST_APIs/User_Data "User Data API"
[4]: #standard-attributes
[5]: #custom-attributes
[8]: #standard-attributes
[10]: https://academy.appboy.com/Deep_Dives/Managing_User_Subscriptions "Subscription Academy"
