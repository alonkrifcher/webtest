---
title: Attribution Integration
---
# Attribution Integration

## Attribution Overview
Appboy supports integrations with several partners that track the users you acquire through paid advertising campaigns. These integrations make it possible to segment your users by acquistion channel and even by specific paid advertising campaigns. This is useful for determining the real value of users from a given acquisition channel by measuring their engagement throughout the customer lifecycle.

### Available Partners

| Partner | iOS Support? | Android Support? | Windows Support? |
| ------- | ------------ | ---------------- | ---------------- |
| Adjust | Yes | Yes | No |
| AppsFlyer | Yes | Yes | No |
| Apsalar | Yes | No | No |
| Kochava | Yes | No | No |
| Tune (MobileAppTracking) | Yes | Yes | Yes |

Don't see your attribution service listed here? We might be able to add them! Contact [support@appboy.com][12] and let us know who you're working with.

### Available Segment Filters
* Attributed Source
* Attributed Campaign
* Attributed Adgroup
* Attributed Ad

### Facebook and Twitter Attribution Data
Please note that attribution data for Twitter and Facebook campaigns is not available through our partners. Facebook and Twitter do not permit their partners to share attribution data with third-parties and, therefore, our partners cannot send that data to Appboy.

### API Restrictions
Appboy's attribution integrations (except Adjust) are built on top of our REST API and subject to the same limits. In particular:

- Access for enterprise customers is unlimited, but subject to contract terms.
- Access for non-enterprise customers is limited to 100 requests (i.e. up to 100 attributed installs) per hour.
- If you have questions about these limits, please contact [support@appboy.com][12].

## Integration Instructions by Partner

### Adjust

__Step 1: Integration Requirements__

* This integration supports iOS and Android apps.
* Your app will need Appboy's SDK and Adjust's SDK installed.

__Step 2: Modifying your app code__

Appboy's integration with Adjust is an SDK-to-SDK integration, meaning that attribution data is collected by Adjust's API and then sent to Appboy through the Appboy SDK. For this to work, you will need to modify your app's code.

**On iOS**, you will need to modify your app code to [register an attribution callback with Adjust][20] that calls `setAttributionData` from Appboy's SDK. Example code snippet:

```
- (void)adjustAttributionChanged:(ADJAttribution *)attribution {
  ABKAttributionData *attributionData = [[ABKAttributionData alloc]
                                         initWithNetwork:attribution.network
                                         campaign:attribution.campaign
                                         adGroup:attribution.adgroup
                                         creative:attribution.creative];
  [[Appboy sharedInstance].user setAttributionData:attributionData];
}
```

**On Android**, you will need to modify your app code to [set a listener for Adjust attribution changes]
[21] that calls `setAttributionData` from Appboy's SDK. Example code snippet:

```
config.setOnAttributionChangedListener(new OnAttributionChangedListener() {
  @Override
  public void onAttributionChanged(AdjustAttribution attribution) {
    Appboy.getInstance(getApplicationContext()).getCurrentUser().setAttributionData(new AttributionData(
        attribution.network,
        attribution.campaign,
        attribution.adgroup,
        attribution.creative));
  }
});
```

Assuming you configure your integration as suggested above, Appboy will map Adjust's data to segment filters in the following way:

| Adjust Attribution Parameter | Appboy Segment Filter |
| -------------------- | --------------------- |
| {network_name} | Attributed Source |
| {campaign_name} | Attributed Campaign |
| {adgroup_name} | Attributed Adgroup |
| {creative_name} | Attributed Ad |

### AppsFlyer
__Step 1: Integration Requirements__

* This integration supports iOS and Android apps.
* If you expect more than 100 attributed installs per hour, you will need an Appboy Enterprise account. See [API Restrictions][5] for more information.
* Your app will need Appboy's SDK and AppsFlyer's SDK installed.
* If you have an iOS app, you will need to [enable IDFA collection][13] in Appboy's SDK.
* If you have an Android app, you will need to include the code snippet below, which passes a unique Appboy device id to AppsFlyer. For most setups, this code should be included alongside all calls to `AppsFlyerLib.setAppsFlyerKey`, typically in an activity's `onCreate` callback.
```java
AppsFlyerLib.setAppUserId(Appboy.getInstance(MyActivity.this).getInstallTrackingId());
```

__Step 2: Getting the Postback URL__

In Appboy's Dashboard, navigate to ["3rd Party Integrations" > "Attribution"][14] and find the Postback URL in the AppsFlyer section. This url represents the API endpoint that an attribution partner will send data to. You will need this url in the next step when setting up a callback in AppsFlyer's dashboard.

__Step 3: Setting Up AppsFlyer's Push API__

Follow [these instructions][16] to configure AppsFlyer's Push API so that it sends attribution data to Appboy. This should be configured to send to the Postback URL you copied from Appboy's Dashboard in Step 2. Also configure the Push API to only send data for non-organic installs.

Appboy maps AppsFlyer's data fields to segment filters in the following way

| AppsFlyer Data Field | Appboy Segment Filter |
| -------------------- | --------------------- |
| media_source | Attributed Source |
| campaign | Attributed Campaign |
| N/A | Attributed Adgroup |
| N/A | Attributed Ad |

__Step 4: Confirming the Integration__

Once Appboy recieves attribution data from AppsFlyer, the status connection indicator on ["3rd Party Integrations" > "Attribution"][14] will change to green and a timestamp of the last successful request will be included. Note that this will not happen until we receive data about an __attributed__ install. Organic installs, which should be excluded by the AppsFlyer Push API, are ignored by our API and are not counted when determining if a successful connection was established.

### Apsalar
__Step 1: Integration Requirements__

* This integration supports iOS apps only.
* If you expect more than 100 attributed installs per hour, you will need an Appboy Enterprise account. See [API Restrictions][5] for more information.
* Your app will need Appboy's SDK and Apsalar's SDK installed.
* You will need to [enable IDFA collection][13] in Appboy's SDK.

__Step 2: Getting the Postback URL__

In Appboy's Dashboard, navigate to ["3rd Party Integrations" > "Attribution"][14] and find the Postback URL in the Apsalar section. This url represents the API endpoint that an attribution partner will send data to. You will need this url in the next step when setting up a callback in Apsalar's dashboard.

__Step 3: Setting Up A Postback from Apsalar__

Follow [these instructions][17] to add a postback in Apsalar's dashboard. The postback should point to the Postback URL you copied from Appboy's Dashboard in Step 2. The postback should be for install events only and should be configured to exclude organic installs.

Appboy maps Apsalar's Postback Macros to segment filters in the following way:

| Apsalar Postback Macro| Appboy Segment Filter |
| -------------------- | --------------------- |
| {NETWORK} | Attributed Source |
| {CID} | Attributed Campaign |
| {GID} | Attributed Adgroup |
| {CREATIVE} | Attributed Ad |

__Step 4: Confirming the Integration__

Once Appboy recieves attribution data from Apsalar, the status connection indicator on ["3rd Party Integrations" > "Attribution"][14] will change to green and a timestamp of the last successful request will be included. Note that this will not happen until we receive data about an __attributed__ install. Organic installs, which should be excluded from the Apsalar postback, are ignored by our API and are not counted when determining if a successful connection was established.

### Kochava
__Step 1: Integration Requirements__

* This integration supports iOS apps only.
* If you expect more than 100 attributed installs per hour, you will need an Appboy Enterprise account. See [API Restrictions][5] for more information.
* Your app will need Appboy's SDK and Kochava's SDK installed.
* You will need to [enable IDFA collection][13] in Appboy's SDK.

__Step 2: Getting the Attribution ID__

In Appboy's Dashboard, navigate to ["3rd Party Integrations" > "Attribution"][14] and find the API Key in the Kochava section. This key is used in the next step when setting up a postback in Kochava's dashboard.

__Step 3: Setting Up A Postback from Kochava__

Follow [these instructions][18] to add a postback in Kochava's dashboard. You will be prompted for the key that you found in Appboy's Dashboard in Step 2.

__Step 4: Confirming the Integration__

Once Appboy recieves attribution data from Kochava, the status connection indicator on ["3rd Party Integrations" > "Attribution"][14] will change to green and a timestamp of the last successful request will be included. Note that this will not happen until we receive data about an __attributed__ install. Organic installs are ignored by our API and are not counted when determining if a successful connection was established.

### Tune (MobileAppTracking)
__Step 1: Integration Requirements__

* This integration supports iOS, Android, and Windows Universal apps.
* If you expect more than 100 attributed installs per hour, you will need an Appboy Enterprise account. See [API Restrictions][5] for more information.
* Your app will need Appboy's SDK and Tune's SDK installed.
* If you have an iOS app, you will need to [enable IDFA collection][13] in Appboy's SDK.
* If you have an Android app, you will need to include the code snippet below, which passes a unique Appboy device id to Tune. For most setups, this code should be included alongside all calls to `mobileAppTracker.setAndroidId` or `mobileAppTracker.setGoogleAdvertisingId`, typically in an activity's `onCreate` callback.

```java
mobileAppTracker.setUserId(Appboy.getInstance(MyActivity.this).getInstallTrackingId());
```

__Step 2: Getting the Postback URL__

In Appboy's Dashboard, navigate to ["3rd Party Integrations" > "Attribution"][14] and find the Postback URL in the MobileAppTracking section. This url represents the api endpoint that an attribution partner will send data to. You will need this url in the next step when setting up a callback in Tune's dashboard.

__Step 3: Setting Up A Postback from Tune__

Follow [these instructions][19] to set up a postback in Tune's dashboard so that it sends attribution data to Appboy. This should be configured to send to the Postback URL you copied from Appboy's Dashboard in Step 2. Also configure the Postback to only send data for non-organic installs.

Appboy maps Tune's Postback Macros to segment filters in the following way

| Tune Postback Macro | Appboy Segment Filter |
| -------------------- | --------------------- |
| {advertiser_sub_publisher} | Attributed Source |
| {advertiser_sub_campaign} | Attributed Campaign |
| {advertiser_sub_adgroup} | Attributed Adgroup |
| {advertiser_sub_ad} | Attributed Ad |

__Step 4: Confirming the Integration__

Once Appboy recieves attribution data from Tune, the status connection indicator on ["3rd Party Integrations" > "Attribution"][14] will change to green and a timestamp of the last successful request will be included. Note that this will not happen until we receive data about an __attributed__ install. Organic installs, which should be excluded from the Tune postback, are ignored by our API and are not counted when determining if a successful connection was established.

[5]: #api-restrictions
[12]: mailto:support@appboy.com
[13]: /SDK_Integration/iOS#idfa-collection "IDFA Collection"
[14]: https://dashboard.appboy.com/app_settings/integration/attribution "Attribution Integrations"
[15]: https://docs.adjust.com/en/callbacks/ "Adjust Callbacks"
[16]: http://support.AppsFlyer.com/entries/23657913-Push-APIs-Real-Time-Installation-Conversion-Notification-APIs "AppsFlyer Push API"
[17]: http://support.apsalar.com/customer/portal/articles/1503188-creating-and-managing-postbacks "Apsalar Postbacks"
[18]: http://support.kochava.com/support/solutions/articles/1000185675-create-a-kochava-certified-postback "Kochava Postbacks"
[19]: http://support.mobileapptracking.com/entries/22560357-Setting-Up-Postback-URLs "Tune Postbacks"
[20]: https://github.com/adjust/ios_sdk#9-implement-the-attribution-callback "Adjust SDK-to-SDK Integrations on iOS"
[21]: https://github.com/adjust/android_sdk#16-set-listener-for-attribution-changes "Adjust SDK-to-SDK Integrations on Android"