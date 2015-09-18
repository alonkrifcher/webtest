---
title: Social Data Tracking
platform: Xamarin
subplatform: iOS
---
## Social Data Tracking {#xamarin_social_ios}

In iOS, Appboy will automatically collect social network information about your users if your users have granted access. If your app does not already prompt for Facebook or Twitter access, you can use the methods below to prompt the user for access.

```csharp
Appboy.SharedInstance ().PromptUserForAccessToSocialNetwork (ABKSocialNetwork.Facebook);
// or
Appboy.SharedInstance ().PromptUserForAccessToSocialNetwork (ABKSocialNetwork.Twitter);
```

- `ABKSocialNetwork.Twitter`
    - This only works for iOS5 and higher
  - In legacy versions of iOS this method is a no-op

- `ABKSocialNetwork.Facebook`
    - This requires your Facebook App ID, which you enter in your app's plist under the key `FacebookAppID`
    - You must have configured a Facebook app with your bundle ID. See [Facebook's documentation for more details on creating an app][1].
    - Calls to this method without a defined `FacebookAppID` will NSLog an error and do nothing

### Recording Social Network Shares

Appboy lets you segment users based upon whether or not they have shared on social networks. To record social network shares, add this method after a successful share action in your app:

```csharp
Appboy.SharedInstance ().LogSocialShare (ABKSocialNetwork.Facebook);
// or
Appboy.SharedInstance ().LogSocialShare (ABKSocialNetwork.Twitter);
```

[1]: https://developers.facebook.com/docs/getting-started/facebook-sdk-for-ios/ "Create A Facebook App"
