---
title: Social Data Tracking
platform: iOS
---
## Social Data Tracking

### Versions 2.10 and Above

#### Collecting Social Network User Data

##### Prompting the User to Connect Facebook

`promptUserForAccessToSocialNetwork:ABKSocialNetworkFacebook` has been deprecated. If you were relying on this method to prompt your users for access to their Facebook data, refer to the following code in our sample Stopwtach app to fetch data from Facebook and pass it to Appboy. Specifically, see the method `promptUserToConnectFacebookAccountOnDeviceAndFetchAccountData` in [SocialNetworkViewController.m][11]. Please note that you still must pass the data manually through the interface described below.

##### Collecting Facebook Data

For versions 2.10 and above, the Appboy iOS SDK no longer automatically collects Facebook user data. If you want to integrate Facebook user data in Appboy user profiles, you need to fetch the user's data and pass it to Appboy.

You can get a user's Facebook data from the iOS system or Facebook's iOS SDK. For more information about integrating the Facebook SDK, follow the steps in [Facebook SDK documentation][2]. You can also refer to the sample code for accessing Facebook accounts in [class SocialNetworkViewController][1] in our Stopwatch sample application.

##### Passing Facebook Data To Appboy

Initialize `ABKFacebookUser` objects with the Facebook data you have collected and pass it to Appboy:

**Objective-C**

```objc
ABKFacebookUser *facebookUser = [[ABKFacebookUser alloc] initWithFacebookUserDictionary:self.facebookUserProfile numberOfFriends:self.numberOfFacebookFriends likes:self.facebookLikes];
  [Appboy sharedInstance].user.facebookUser = facebookUser;
```

**Swift**

```swift
var facebookUser : ABKFacebookUser = ABKFacebookUser(facebookUserDictionary: facebookUserDictionary, numberOfFriends: numberOfFriends, likes: likes);
    Appboy.sharedInstance().user = facebookUser;
```

__Note__: In ABKFacebookUser's init method `initWithFacebookUserDictionary:numberOfFriends:likes:`, all the parameters should be dictionaries and arrays returned directly from Facebook:

| Parameter | Definition |
| --------- | ---------- |
|`facebookUserProfile`| The dictionary returned from the endpoint "/me".|
| `numberOfFriends`| The length of the friends array returned from the endpoint "/me/friends".|
| `likes` | The array of user's Facebook likes from the endpoint "/me/likes". |

__Note__: For additional information regarding the Facebook Graph API, please refer to [the Facebook Graph API Developer Documentation][10].

Additionally, you can tailor what Facebook data you're sending to Appboy, in case you don't want to include the entire basic profile. For example:

```objc
ABKFacebookUser *facebookUser = [[ABKFacebookUser alloc] initWithFacebookUserDictionary:facebookUserPublicProfile numberOfFriends:-1 likes:nil];  
```

##### Collecting User Twitter Data

In iOS, Appboy will automatically collect Twitter account information for your users if they have granted access. For information on disabling this social data collection, or collecting information of a specific Twitter identifier, please see [Setting Social Account Acquisition Policy - iOS][9].

If your app does not already prompt for Twitter access, you can use the methods below to prompt the user.

**Objective-C**

```objc
[[Appboy sharedInstance] promptUserForAccessToSocialNetwork:ABKSocialNetworkTwitter];
```

**Swift**

```swift
Appboy.sharedInstance().promptUserForAccessToSocialNetwork(ABKSocialNetwork.Twitter)
```

#### Recording Social Network Shares

Appboy lets you segment users based upon whether or not they have shared on social networks. To record social network shares, add this method after a successful share action in your app:

**Objective-C**

```objc
// Facebook
[[Appboy sharedInstance] logSocialShare:ABKSocialNetworkFacebook];
// Twitter
[[Appboy sharedInstance] logSocialShare:ABKSocialNetworkTwitter];
```

**Swift**

```swift
// Facebook
Appboy.sharedInstance().logSocialShare(ABKSocialNetwork.Facebook)
// Twitter
Appboy.sharedInstance().logSocialShare(ABKSocialNetwork.Twitter)
```

##### Implementation Example

`logSocialShare` is used within the [`InitialViewController.m` file][1] within the stopwatch sample application.

- Also, see the method declaration within the [`Appboy.h` file][5].
- Additionally, you may refer to the [`logSocialShare` documentation][6] for more information.

### Versions Earlier than 2.10

#### Social Data Integration

__For SDK versions 2.9.4 and earlier, apps that integrate AppboyKit instead of AppboyKitWithoutFacebookSupport must integrate the Facebook SDK."__

##### Step 1: Integrating the Facebook SDK

The Facebook SDK is integrated automatically as a dependency of `AppboyKit` via the [Cocoapod][7].

- If you are using `AppboyKitWithoutFacebookSupport` integration of the Facebook SDK is not necessary.
- If you are using a [manual integration process][8] and `AppboyKit` follow the steps noted within the [Facebook SDK documentation][2] to incorporate the Facebook SDK into your App.

##### Step 2: Prompting the User for Permission to Access Social Network Data

In iOS, Appboy will automatically collect social network information about your users if your users have granted access. For information on disabling this social data collection please see [Setting Social Account Acquisition Policy - iOS][9].

If your app does not already prompt for Facebook or Twitter access, you can use the methods below to prompt the user for access.

**Objective-C**

```objc
// An `ABKSocialNetwork` indicates the network that you wish to access.
* @param socialNetwork
- (void) promptUserForAccessToSocialNetwork:
    (ABKSocialNetwork)socialNetwork;
```

**Swift**

```swift
Appboy.sharedInstance().promptUserForAccessToSocialNetwork(ABKSocialNetwork.Facebook)
// or
Appboy.sharedInstance().promptUserForAccessToSocialNetwork(ABKSocialNetwork.Twitter)
```

- `ABKSocialNetworkTwitter`
    - This only works for iOS5 and higher
  - In legacy versions of iOS this method is a no-op

- `ABKSocialNetworkFacebook`
    - This requires your Facebook App ID, which you enter in your app's plist under the key `FacebookAppID`
    - You must have configured a Facebook app with your bundle ID. See [Facebook's documentation for more details on creating an app][3].
    - Calls to this method without a defined `FacebookAppID` will NSLog an error and do nothing
  - We *highly* recommmend that you install the Facebook iOS SDK in your app. If you include the Facebook SDK in your app, this method will work for all iOS versions and provide a high-quality integration experience for the end user. If you do not include the Facebook SDK, this method call will only work on iOS6 or higher.

###### Recording Social Network Shares

Appboy lets you segment users based upon whether or not they have shared on social networks. To record social network shares, add this method after a successful share action in your app:

**Objective-C**

```objc
[[Appboy sharedInstance] logSocialShare:ABKSocialNetworkFacebook];
// or
[[Appboy sharedInstance] logSocialShare:ABKSocialNetworkTwitter];
```

**Swift**

```swift
Appboy.sharedInstance().logSocialShare(ABKSocialNetwork.Facebook)
// or
Appboy.sharedInstance().logSocialShare(ABKSocialNetwork.Twitter)
```

##### Implementation Example

`logSocialShare` is utilized within the [`InitialViewController.m` file][1] within the stopwatch sample application.

- Also, see the method declaration within the [`Appboy.h` file][5].
- Additionally, you may refer to the [`logSocialShare` documentation][6] for more information.


[1]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Stopwatch/InitialViewController.m
[2]: https://developers.facebook.com/docs/ios "Facebook iOS SDK Docs"
[3]: https://developers.facebook.com/docs/getting-started/facebook-sdk-for-ios/ "Create A Facebook App"
[4]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Stopwatch/SocialNetworkViewController.m
[5]: https://github.com/Appboy/appboy-ios-sdk/blob/master/AppboyKit/headers/AppboyKitLibrary/Appboy.h
[6]: http://appboy.github.io/appboy-ios-sdk/docs/interface_appboy.html#ae16a3ae4f33d7ae23da740d67e4cd277 "logsocialShare"
[7]: /iOS/#initial-sdk-setup
[8]: /Advanced_Use_Cases/Manual_iOS_Integration
[9]: /Advanced_Use_Cases/Setting_Social_Account_Acquisition_Policy_iOS
[10]: https://developers.facebook.com/docs/graph-api/reference/v2.2/user "Facebook Graph API Docs"
[11]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Stopwatch/SocialNetworkViewController.m
