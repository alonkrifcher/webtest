---
title: Attribution Integration
---
# Attribution Integration

## Attribution Overview
Appboy supports integrations with several partners that track the users you acquire through paid advertising campaigns. These integrations make it possible to segment your users by acquistion channel and even by specific paid advertising campaigns. This is useful for determining the real value of users from a given acquisition channel by measuring their engagement throughout the customer lifecycle.

### Available Partners

| Partner | iOS Support? | Android Support? | Windows Support? |
| ------- | ------------ | ---------------- | ---------------- |
| Adjust | Yes | No | No |
| Appsflyer | Yes | Yes | No |
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
Appboy's attribution integrations are built on top of our REST API and subject to the same limits. In particular:

- Access for enterprise customers is unlimited, but subject to contract terms.
- Access for non-enterprise customers is limited to 100 requests (i.e. up to 100 attributed installs) per hour.
- If you have questions about these limits, please contact [support@appboy.com][12].

## Integration Instructions by Partner

### Adjust

__Step 1: Integration Requirements__

* This integration supports iOS apps only.
* If you expect more than 100 attributed installs per hour, you will need an Appboy Enterprise account. See [API Restrictions][5] for more information.
* Your app will need Appboy's SDK and Adjust's SDK installed.
* You will need to [enable IDFA collection][13] in Appboy's SDK.

__Step 2: Getting the Postback URL__

In Appboy's Dashboard, navigate to ["3rd Party Integrations" > "Attribution"][14]. This page has postback urls for every attribution partner. This url represents the api endpoint that an attribution partner will send data to. Find the url for Adjust. You will need this url in the next step when setting up a callback in Adjust's dashboard.

__Step 3: Setting Up A Callback from Adjust__

Follow [these instructions][15] to add a callback in Adjust's dashboard. The callback should point to the Postback URL you copied from Appboy's Dashboard in Step 2. The callback should be for install events only and should be configured to exclude organic installs.

Appboy maps Adjust's url parameters to segment filters in the following way:

| Adjust URL Parameter | Appboy Segment Filter |
| -------------------- | --------------------- |
| {network_name} | Attributed Source |
| {campaign_name} | Attributed Campaign |
| {adgroup_name} | Attributed Adgroup |
| {creative_name} | Attributed Ad |

__Step 4: Confirming the Integration__

Once Appboy recieves attribution data from Adjust, the status connection indicator on ["3rd Party Integrations" > "Attribution"][14] will change to green and a timestamp of the last successful request will be included. Note that this will not happen until we receive data about an __attributed__ install. Organic installs, which should be excluded from the Adjust callback, are ignored by our API and are not counted when determining if a successful connection was established.

### Appsflyer
__Step 1: Integration Requirements__

* This integration supports iOS and Android apps.
* If you expect more than 100 attributed installs per hour, you will need an Appboy Enterprise account. See [API Restrictions][5] for more information.
* Your app will need Appboy's SDK and Appsflyer's SDK installed.
* If you have an iOS app, you will need to [enable IDFA collection][13] in Appboy's SDK.
* If you have an Android app, you will need to include the code snippet below, which passes a unique Appboy device id to Appsflyer. For most setups, this code should be included alongside all calls to `AppsFlyerLib.setAppsFlyerKey`, typically in an activity's `onCreate` callback.
```java
AppsFlyerLib.setAppUserId(Appboy.getInstance(MyActivity.this).getInstallTrackingId());
```

__Step 2: Getting the Postback URL__

In Appboy's Dashboard, navigate to ["3rd Party Integrations" > "Attribution"][14]. This page has postback urls for every attribution partner. This url represents the api endpoint that an attribution partner will send data to. Find the url for Appsflyer. You will need this url in the next step when setting up a callback in Appsflyer's dashboard.

__Step 3: Setting Up Appsflyer's Push API__

Follow [these instructions][16] to configure Appsflyer's Push API so that it sends attribution data to Appboy. This should be configured to send to the Postback URL you copied from Appboy's Dashboard in Step 2. Also configure the Push API to only send data for non-organic installs.

Appboy maps Appsflyer's data fields to segment filters in the following way

| Appsflyer Data Field | Appboy Segment Filter |
| -------------------- | --------------------- |
| media_source | Attributed Source |
| campaign | Attributed Campaign |
| N/A | Attributed Adgroup |
| N/A | Attributed Ad |

__Step 4: Confirming the Integration__

Once Appboy recieves attribution data from Appsflyer, the status connection indicator on ["3rd Party Integrations" > "Attribution"][14] will change to green and a timestamp of the last successful request will be included. Note that this will not happen until we receive data about an __attributed__ install. Organic installs, which should be excluded by the Appsflyer Push API, are ignored by our API and are not counted when determining if a successful connection was established.

### Apsalar
__Step 1: Integration Requirements__

* This integration supports iOS apps only.
* If you expect more than 100 attributed installs per hour, you will need an Appboy Enterprise account. See [API Restrictions][5] for more information.
* Your app will need Appboy's SDK and Apsalar's SDK installed.
* You will need to [enable IDFA collection][13] in Appboy's SDK.

__Step 2: Getting the Postback URL__

In Appboy's Dashboard, navigate to ["3rd Party Integrations" > "Attribution"][14]. This page has postback urls for every attribution partner. This url represents the api endpoint that an attribution partner will send data to. Find the url for Apsalar. You will need this url in the next step when setting up a callback in Apsalar's dashboard.

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

In Appboy's Dashboard, navigate to ["3rd Party Integrations" > "Attribution"][14]. This page has postback urls for every attribution partner. This url represents the api endpoint that an attribution partner will send data to. Find the url for Kochava. This urls contains an `attribution_id` field that you will neec in the next step when setting up a postback in Kochava's dashboard.

__Step 3: Setting Up A Postback from Kochava__

Follow [these instructions][18] to add a postback in Kochava's dashboard. You will be prompted for the attribution_id that you found in Appboy's Dashboard in Step 2.

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

In Appboy's Dashboard, navigate to ["3rd Party Integrations" > "Attribution"][14]. This page has postback urls for every attribution partner. This url represents the api endpoint that an attribution partner will send data to. Find the url for Tune. You will need this url in the next step when setting up a callback in Tune's dashboard.

__Step 3: Setting Up A Postback from Tune__

Follow [these instructions][19] to set up a postback in Tune's dashboard so that it sends attribution data to Appboy. This should be configured to send to the Postback URL you copied from Appboy's Dashboard in Step 2. Also configure the Postback to only send data for non-organic installs.

Appboy maps Tune's Postback Macrots to segment filters in the following way

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
[16]: http://support.appsflyer.com/entries/23657913-Push-APIs-Real-Time-Installation-Conversion-Notification-APIs "Appsflyer Push API"
[17]: http://support.apsalar.com/customer/portal/articles/1503188-creating-and-managing-postbacks "Apsalar Postbacks"
[18]: http://support.kochava.com/support/solutions/articles/1000071246-postback-configuration "Kochava Postbacks"
[19]: http://support.mobileapptracking.com/entries/22560357-Setting-Up-Postback-URLs "Tune Postbacks"
