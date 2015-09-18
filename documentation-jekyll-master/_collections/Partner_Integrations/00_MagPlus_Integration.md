---
title: MagPlus Integration
---
# MagPlus Integration

The Appboy and Mag+ partnership makes integration into your Mag+ application quick and easy. Follow the instructions on this page to get started. We recommend staying up-to-date with the [latest Mag+ releases][18] to take advantage of the latest Appboy features.

__Estimated Time: 15 Minutes__

## iOS Integration

### Step 1: Complete Setup of Your Appboy Account

1. If you have _not_ already registered, create an Appboy account on [appboy.com][12].
2. Follow the [app group configuration][9] documentation to setup your first app

### Step 2: Input Your API Key on the Mag+ Portal

1. Navigate to the [app settings page][16] in the dashboard and copy your `API Key`.
  ![Appboy API Key][11]
2. Add your `API KEY` to the Mag+ publisher portal by navigating to `Apps --> Live Settings --> Appboy Key` or [clicking here][13].
  ![MagPlus API Key][10]

### Step 3 (Optional): Add Your Push Certificate

_If you already have your push certifcate:_

1. Navigate to the [app settings page](https://dashboard.appboy.com/app_settings/app_settings/) in the dashboard and upload your production certificate for iOS or paste your GCM API Key in for Android.

_If you do not have a push certificate:_

1. Follow Steps 1 and 2 in our general push notification [integration instructions](/Enabling_Message_Channels/Push_Notifications/iOS).

### SDK Integration Complete

__Note__: A new build of your app must be generated to enable Appboy data collection. Data collection will not occur on previous versions of your app.

Appboy should now be integrated. To confirm a successful integration you should see new sessions tracked on the dashboard and the news feed integrated into your app once you generate a new build. For questions, please email [magplus@appboy.com][14].

## Android Integration

### Step 1: Complete Setup of Your Appboy Account

1. If you have _not_ already registered, create an Appboy account on [appboy.com][12].
2. Follow the [app group configuration][9] documentation to setup your first app

### Step 2: Input Your API Key on the Mag+ Portal

1. Navigate to the [app settings page](https://dashboard.appboy.com/app_settings/app_settings/) in the dashboard and copy your `API Key`.
  ![Appboy API Key][8]
2. Within the "Apps" tab of your Mag+ publisher portal, navigate to the Android Tab and click "Build Settings":
  ![MagPlus_Android_Pic][5]
3. Scroll down until you see "Appboy Settings" and insert your API Key.
  ![MagPlus_Android_Pic][6]

### Step 3: Enable Push Notifications

1. Follow the directions on [Mag+'s website][15] for adding GCM messaging to your Android app.

2. Add your [GCM sender ID][17] (also known as your project number) to your "Appboy Settings" within the build settings tab beneath your API Key:

![MagPlus_Android_Pic][7]

### SDK Integration Complete

__Note__: A new build of your app must be generated to enable Appboy data collection. Data collection will not occur on previous versions of your app.

Appboy should now be integrated. To confirm a successful integration you should see new sessions tracked on the dashboard and the news feed integrated into your app once you generate a new build. For questions, please email [magplus@appboy.com][14].

## Deep Linking in MagPlus

MagPlus has a URL scheme that supports deeplinking into many parts of the application. Please view their documentation [here][3] for more details.

[3]: http://support.magplus.com/entries/22378023-URL-Format-for-Links-in-Apps
[5]: /assets/img/mag_android_1.png
[6]: /assets/img/mag_android_2.png
[7]: /assets/img/mag_android_3.png
[8]: /assets/img/appboy_api_key_android.png "Appboy Android API Key"
[9]: /App_Group_Configuration
[10]: /assets/img/magplus_api_key.png "MagPlus API Key iOS"
[11]: /assets/img/appboy_api_key.png "Appboy API Key"
[12]: https://dashboard.appboy.com/developers/sign_up?referral_source=Magplus "Sign-Up Referral: Mag+"
[13]: https://publish.magplus.com/brands/mag-support/live_settings "Mag+ Live Settings"
[14]: mailto:magplus@appboy.com
[15]: https://support.magplus.com/hc/en-us/articles/204972667-Android-Enabling-Google-Cloud-Messaging-in-Your-Android-Apps
[16]: https://dashboard.appboy.com/app_settings/app_settings/ "App Settings"
[17]: https://developers.google.com/console/help/#projectnumber
[18]: https://support.magplus.com/entries/39851156-Version-5-x-Tools-and-Reviewers-Release-Notes "Mag+ Version Release Notes"
