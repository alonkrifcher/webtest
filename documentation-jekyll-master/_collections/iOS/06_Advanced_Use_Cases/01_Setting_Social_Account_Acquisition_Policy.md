---
title: Setting Social Account Acquisition Policy
platform: iOS
---
## Setting Social Account Acquisition Policy

If you want to set the social account acquisition policy at app startup time in order to avoid automatic social account data requests made by Appboy. you can include one of the `ABKSocialAccountAcquisitionPolicy` enum values as the `ABKSocialAccountAcquisitionPolicyOptionKey` in the `appboyOptions` dictionary.

### Enabling the `appboyOptions` dictionary

The `NSDictionary` `appboyOptions` is optionally passed into the Appboy method `startWithApiKey:inApplication:withLaunchOptions:withAppboyOptions`.  For example:

```objc
[Appboy startWithApiKey:AppboyApiKey
          inApplication:application
      withLaunchOptions:launchOptions
      withAppboyOptions:@{ABKSocialAccountAcquisitionPolicyOptionKey: [NSNumber numberWithInteger:ABKSocialAccountAcquisitionPolicy]}];
```

### Valid ABKSocialAccountAcquisitionPolicy Enum Values

`ABKAutomaticSocialAccountAcquisition` (default) — At app startup and after you've set a social account identifier on the user object, Appboy will automatically attempt to fetch Twitter social account data for the user and flush it to the server. In all cases, Appboy's automatic data acquisition will ensure that the user is not prompted or that the UI of your application is otherwise affected. For this reason, when Appboy tries to perform the data acquisition, your app must have already been granted the relevant permissions to obtain social account data. If you've specified the twitterAccountIdentifier, Appboy will only attempt to grab data for that twitter account. If you haven't specified it, Appboy will grab data for the first Twitter account returned by the system. An upcoming release will enable identifier targeting for Facebook as well. Note: If you have not integrated the Facebook SDK into your app, there is no way to grab Facebook data without prompting the user, so you must call `[[Appboy sharedInstance] promptUserForAccessToSocialNetwork:ABKSocialNetworkFacebook];` and allow the user to be prompted. If you have integrated the Facebook SDK, you must ensure that the user has allowed read permissions. If permission is granted, Appboy will collect the user's basic public profile info "user_about_me" "email" "user_hometown" "user_birthday" and, if permission is granted, "user_likes".

`ABKAutomaticSocialAccountAcquisitionWithIdentifierOnly` — Appboy will only attempt to obtain social account information when an identifier is set on the user for the corresponding social network. Note: This currently only works for Twitter accounts. An upcoming release will enable identifier targeting for Facebook as well.

`ABKManualSocialAccountAcquisition` — Appboy will NOT try to acquire social account data. You must call `[[Appboy sharedInstance] promptUserForAccessToSocialNetwork:(ABKSocialNetwork)];`

```
/*!
* If you want to set the social account acquisition policy at app startup time (useful for avoiding automatic
* social account data requests made by Appboy at startup). You can include one of the ABKSocialAccountAcquisitionPolicy
* enum values as the value for the ABKSocialAccountAcquisitionPolicyOptionKey in the appboyOptions dictionary.
*/
extern NSString *const ABKSocialAccountAcquisitionPolicyOptionKey;
```
