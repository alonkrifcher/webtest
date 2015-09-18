---
title: Social Data Tracking
platform: Android and FireOS
---
## Social Data Tracking
Unlike the Appboy iOS SDK, the Appboy Android SDK does not automatically collect Facebook and Twitter data. However, it's possible to add social media data to an Appboy user's profile from the Android SDK as well:

- Obtain social media data within your app via the Facebook SDK and Twitter APIs.
  - [Facebook Documentation][1] // [Twitter Documentation][2]
- Initialize Facebook and Twitter User objects with social media data and pass them to Appboy.

### Social Network Data Constructors

```java
FacebookUser(
  String facebookId,
  String firstName,
  String lastName,
  String email,
  String bio,
  String cityName,
  // Gender is an Appboy enum.
  // Specify either Gender.MALE or Gender.FEMALE.
  Gender gender,
  Integer numberOfFriends,
  // Names of pages the user likes.
  Collection<String> likes,
  // mm/dd/yyyy format.
  String birthday
)
TwitterUser(
  Integer twitterUserId,
  String twitterHandle,
  String name,
  String description,
  Integer followerCount,
  Integer followingCount,
  Integer tweetCount,
  String profileImageUrl
)
```

To pass data retrieved from social networks to Appboy, you'll create a new FacebookUser or TwitterUser and then pass them to the method `AppboyUser.setFacebookData()`/`AppboyUser.setTwitterData()`. For example:

```java
FacebookUser facebookUser = new FacebookUser("100000", "FirstName", "LastName", "email@email.com", "bio", "City", Gender.MALE, 3, ,"04/13/1990");
AppboyUser.setFacebookData(facebookUser);

String imageUrl = "https://si0.twimg.com/profile_images/000/0000.jpeg";
TwitterUser twitterUser = new TwitterUser(100000, "handle", "Name", "description", 100, 50, 150, imageUrl);
AppboyUser.setTwitterData(twitterUser);

```

### Recording Social Network Shares

Appboy lets you segment users based upon whether or not they have shared on social networks. To record social network shares, add this method after a successful share action in your app: Recording Social Network Shares

```java
logShare(socialNetwork network)
```

Refer to the [socialNetwork documentation][3] for more information.

[1]: https://developers.facebook.com/docs/howtos/androidsdk/3.0/login-with-facebook/#step1
[2]: https://dev.twitter.com/docs/auth
[3]: http://appboy.github.io/appboy-android-sdk/javadocs/com/appboy/enums/SocialNetwork.html "socialNetwork"
