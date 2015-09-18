---
title: Quark App Studio Integration
---
# Quark App Studio Integration

The instructions on this page will help Quark App Studio apps get started on their Appboy integration. You'll find details on how to fill out the following form:

![Form][15]

## Getting Set Up

Before you begin filling out the form, take the following steps:

1. If you have _not_ already registered, create an Appboy account on [appboy.com][13].
2. Follow the [app group configuration][14] documentation to set up your first app. During this step, you can set up your production and development (testing) apps. Completing this will give you information necessary for filling out the form.

## App Group ID

1. In your Appboy Dashboard, go to the menu bar and click on Developer Console, which is located under App Settings.
2. You will see your App Group ID in the API Settings tab:

![App_group_ID][16]

## iOS Segment ID

1. In your Appboy Dashboard, make sure you're in your Production app group.
2. Navigate to the Segments page, which is located under Engagement in the lefhand menu bar.
3. Check to see if there is a segment called "All Users (Your App's Name - iOS)." If so, click on that segment and skip to step 5. If not, go to step 4.
4. [Create a segment][20] called All iOS Users that contains all of your app's iOS users. When creating the segment, go to the Apps Used section and ensure that only your iOS app is checked. In addition, make sure there are no filters are applied. (The segment statistics for your app will differ from what you see in our sample screenshot).
5. Staying on the page for the segment of all iOS users, scroll down to find your Segment API Identifier.

![All_iOS][21]


## Android Segment ID

1. In your Appboy Dashboard, make sure you're in your Production app group.
2. Navigate to the Segments page, which is located under Engagement in the lefhand menu bar.
3. Check to see if there is a segment called "All Users (Your App's Name - Android)." If so, click on that segment and skip to step 5. If not, go to step 4.
4. [Create a segment][20] called All Android Users that contains all of your app's Android users. When creating the segment, go to the Apps Used section and ensure that only your Android app is checked. In addition, make sure there are no filters are applied. (The segment statistics for your app will differ from what you see in this sample screenshot).
5. Staying on the page for the segment of all Android users, scroll down to find your Segment API Identifier.

![All_Android][22]


## All Devices Segment ID

1. In your Appboy Dashboard, make sure you're in your Production app group.
2. Navigate to the Segments page, which is located under Engagement in the lefhand menu bar.
3. [Create a segment][20] called All Users that contains all iOS and Android users. In the Apps Used section, check "Include users from all apps," which will select both your Android and iOs app. Do not apply any filters. (The segment statistics for your app will differ from what you see in this sample screenshot).
4. Staying on the page for the All Users segment, scroll down to find your Segment API Identifier.

![All][23]

## GCM Sender ID

Your GCM Sender ID is your Google Project Number. [Here are instructions][17] on how to access it in the Google Developers Console.

## Production Details

### iOS API Key

1. In your Appboy Dashboard, make sure you are in your Production App Group.
2. Go to the menu bar and click on Manage App Group, which is located under App Settings.
3. In the App Settings tab, select your iOS production app. Make sure to click on the correct app.
4. You'll see your app's iOS API key:

![Production_iOS][18]

### Android API Key

1. In your Appboy Dashboard, make sure you are in your Production App Group.
2. Go to the menu bar and click on Manage App Group, which is located under App Settings.
3. In the App Settings tab, select your Android production app. Make sure to click on the correct app.
4. You'll see your app's Android API key:

![Production_Android][19]

## Development Details

### iOS API Key

The steps below are similar to those for accessing your Production iOS API Key, except for you carry them out within your Development app group.

1. In your Appboy Dashboard, make sure you are in your Development App Group.
2. Go to the menu bar and click on Manage App Group, which is located under App Settings.
3. In the App Settings tab, select your iOS development app. Make sure to click on the correct app.
4. You'll see your app's iOS API key listed.

### Android API Key

The steps below are similar to those for accessing your Production Android API Key, except for you carry them out within your Development app group.

1. In your Appboy Dashboard, make sure you are in your Development App Group.
2. Go to the menu bar and click on Manage App Group, which is located under App Settings.
3. In the App Settings tab, select your Android development app. Make sure to click on the correct app.
4. You'll see your app's Android API key listed.

[13]: https://www.appboy.com/
[14]: https://documentation.appboy.com/App_Group_Configuration
[15]: /assets/img/Quark_form.png
[16]: /assets/img/App_group_ID.png
[17]: http://developer.android.com/google/gcm/gs.html
[18]: /assets/img/Production_iOS.png
[19]: /assets/img/Production_android.png
[20]: https://academy.appboy.com/Quick_Wins/Creating_a_Segment
[21]: /assets/img/All_iOS.png
[22]: /assets/img/All_android.png
[23]: /assets/img/All_segment.png
