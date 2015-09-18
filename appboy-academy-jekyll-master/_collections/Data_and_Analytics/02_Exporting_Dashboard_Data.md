---
title: Exporting Dashboard Data
---
# Exporting Dashboard Data

Appboy provides CSV exports of Dashboard data, allowing you to analyze them with a variety of tools. Below are the different types of data you can export from the Dashboard, as well as tips for opening the data in Excel and performing exports with our API.

## Things to Keep in Mind

- Whenever there is a graph on the Dashboard, you can export its data in a CSV or download the graph by clicking the symbol in the upper right corner:

![Export icon][6]

- Before performing your export, make sure you have selected the right time frame that you wish to view data from. This can be done using the "Display Data For" dropdown:

![Export timeframe][8]

## Segment Data

### Exporting to CSV

To request a CSV export of user data from a segment, click on the "User Data" button on the top-right side while editing a segment:

![csvexport][1]

You can also request a CSV export from the main Segments page by clicking the gear icon on the right side to access this dropdown menu:

![csvexport2][2]

The CSV output contains the data from each user profile captured in the segment at the time of export. You can export any segment by clicking the gear icon and CSV export. Appboy will generate the report in the background and email it to the user who is currently logged in.

If you have [linked your Amazon S3 credentials to Appboy][26], then the CSV will also be uploaded in your S3 bucket under the key `segment-export/SEGMENT_ID/YYYY-MM-dd/users-RANDOMSTRING.zip`. Otherwise, the link emailed to you will expire in a few hours.

Data included in the exports:

- All User Data
    - User ID
    - First Name
    - Last Name
    - Timezone
    - City
    - Gender
    - Email Address
    - Phone Number
    - Number of Push Tokens
    - Twitter Username
    - Session Count
    - First Session
    - Last Session
    - Last App Version Used
    - In-App Purchase Total
    - Email Subscription Status
    - Device Info
    - Number of IDFAs
    - Number of IDFVs
    - Custom Events
    - Custom Attributes
- Email Addresses
    - User ID
    - First Name
    - Last Name
    - Email Address
    - Email Unsubscribe Date
    - Email Opt-in Date

### Exporting to Facebook Audiences

Appboy provides Facebook marketing integration, allowing you to export segments as Facebook marketing audiences and target those users for ad campaigns. Here are instructions on setting up this feature.

#### Configuring Facebook App Settings

In order to export custom audiences from the dashboard, your Facebook app must be configured to allow Appboy to make requests to Facebook on behalf of the members of your team.

- You need to have a Facebook app that Appboy can use to access the Facebook Marketing API on your behalf. If you already have a Facebook app that you're using for Facebook sign-in in your app, you can use that or you can create a new one by following the instructions in the [Facebook marketing API documentation][29]. You will need to add each of your team members who should be able to export Facebook audiences as developers on whichever app you want to use.
- Head to the [Facebook app dashboard][30], and make sure to select the app you want Appboy to use for marketing API access.

![Facebook Settings 1][31]

- Before proceeding, make sure to note the app ID and the app secret, as you will need to enter these in the Appboy dashboard.
- Make sure you have proper permissions to export Facebook audiences. Click "Roles."
  - Within the roles tab, you should have either administrator or developer permissions. If not, please ask your administrator to give you the proper permissions.

![Facebook Settings 2][41]

- Next, click "Settings."
- Within the settings section, click on the "Advanced" tab.

![Facebook Settings 3][32]

- At the bottom, you should see "Valid OAuth redirect URIs" underneath "Client OAuth Settings."
  - Add `https://dashboard.appboy.com` in this field.
- Save your changes.
- Make sure that each of the members of your team who will be exporting audiences to Facebook has accepted the Facebook custom audience [terms of service][33].

#### Configuring Appboy 3rd Party Integration

- Once your Facebook app has been correctly configured, you'll need to add your credentials to the appropriate app group in Appboy. Within the Appboy dashboard, head to the 3rd Party Integrations section, and click on the [Facebook][38] tab. Make sure you've selected the correct app group.
- Enter your app ID and app secret in the "Facebook Marketing App ID" and "Facebook Marketing App Secret" fields.
  - The "Facebook App ID" field is optional. If users authenticate with Facebook in your app and you are providing Facebook data to the Appboy SDK, you will have the option to export those users to Facebook using their Facebook User ID. If you'd like to do this, save the Facebook app ID that you use to authenticate your users in the "Facebook App ID" field.

![Facebook Settings 4][34]

- Save your changes.

#### Exporting Your Users

- The Facebook audience export link will be in the settings menu of each segment in an app group that has Facebook credentials.
  - While this link will be present for all members of your app group, only users with permissions in your Facebook marketing app will be able to successfully export a segment.

![Facebook Export 1][35]

- When you click on this link, a modal will appear to ask which type of user data to export. Unfortunately, Facebook only allows exporting by 1 data type per custom audience. If you choose more than 1 type, Appboy will create a separate custom audience for each.
  - There are 4 possible user data types we can use for the export: email, device IDFA, Facebook UID, and phone number. If you haven't entered a Facebook app ID in your 3rd Party Integration settings, you won't be able to select Facebook UID.

![Facebook Export 2][36]

- Click on export. As with CSV exports, you will receive an email when the segment has finished exporting.
- You can view the custom audience on the [Facebook Ad Manager][39].
  - Due to Facebook privacy restrictions, you cannot see the users or the exact size of the audience. Facebook provides an estimate of your custom audience size.

![Facebook Export 3][37]

#### Lookalike Audiences

Once you've successfully exported a segment as a Facebook Audience, you can create additional groups using Facebook's [Lookalike Audiences][40]. This feature looks at demographics, interests, and other attributes of your chosen audience and creates a new audience of people with similar attributes.

## App Usage Data

The App Usage page of the Dashboard contains high level data, as well as detailed statistics of different KPIs by date. To obtain CSVs of information from this page, first set the time frame you want to view, then go to the graph at the bottom of the page and choose what data to include in your export.

You can export CSVs with the following data:

![App usage graph][27]

- Session Count by Date
    - (Optional) Session Count for Different Segments
    - (Optional) Session Count for Different App Versions
- DAUs by Date
    - (Optional) DAUs for Different Segments
- Email Statistics by Date
    - Number of Emails Sent
    - Number of Emails Delivered
    - Number of Emails Opened
    - Number of Email Clicks
    - Number of Email Bounces
    - Number of Emails Reported as Spam
- In-App Messages by Date
    - Number of In-App Messages Sent
    - In-App Message Impressions
    - Number of In-App Messages Opened
- MAUs by Date
- Number of New Users by Date
- News Feed Impressions by Date
- Push Notifications by Date
    - (Optional) Push Notifications for Different App Platforms
    - Number of Push Notifications Sent
    - Total Opens
    - Direct Opens
    - Bounces
- Session Count by Hour
- Session Count per MAU by Date
- Stickiness by Date

## Revenue Data

On the Revenue page of the Dashboard, you can view data on revenue or purchases over specific periods of time, or your app's total revenue or purchases.

### Detailed Statistics Graph
![Revenue graph][9]

The following data can be accessed via the Detailed Statistics graph:

- Revenue by Date
    - (Optional) Revenue for Different Segments
    - (Optional) Revenue for Different Products
- Purchases by Date
    - (Optional) Purchases for Different Products
- Revenue by Hour
    - (Optional) Hourly Revenue for Different Segments
- Revenue per User

### Product Breakdown Chart
![Revenue chart][10]

The following data can be accessed via the Product Breakdown chart:

- Purchases
    - Total number of purchases for each product
    - Percentage of total purchases for each product
- Revenue
    - Total revenue for each product
    - Percentage of total revenue for each product

## Campaign Results Data

All of the analytics from your Appboy campaigns can be exported to a CSV. From the Campaigns page of the Dashboard, select the campaign you wish to view, and scroll down to the Message Deliveries graphs, which can be exported.

![Message deliveries][28]

### Multi-Channel Campaigns

For multi-channel campaigns, the data that can be exported will depend on which messaging channels were used. Here's a list of all the data that can be exported from a campaign that used iOS push, Android push, email and in-app messages:

- Messages Sent by Date
    - Total Messages Sent
    - Messages Sent Across Campaign's Channels (can include Push, Email and In-App Message)
- Email Message Engagement by Date
    - Number of Emails Delivered
    - Number of Emails Sent
    - Number of Emails Opened
    - Number of Email Clicks
    - Number of Email Bounces
    - Number of Emails Reported as Spam
- In-App Message Engagement by Date
    - Number of In-App Messages Sent
    - In-App Message Impressions
    - Number of In-App Message Clicks
- iOS Push Engagement by Date
    - Number of iOS Push Notifications Sent
    - Total Opens
    - Direct Opens
    - Bounces
- Android Push Engagement by Date
    - Number of Android Push Notifications Sent
    - Total Opens
    - Direct Opens
    - Bounces
- Windows Phone 8 Push Engagement by Date
    - Number of Windows Phone 8 Push Notifications Sent
    - Total Opens
    - Direct Opens
    - Bounces

### Multivariate Campaigns

For multivariate campaigns, which use just one messaging channel, you'll be able to export data that shows how each variant performed on the specific messaging channel's analytics over time.

![Multivariate data][11]

Push campaign results contain graphs for the following analytics:

- Messages Sent by Date for Each Variant
- Conversions by Date for Each Variant
- Unique Recipients by Date for Each Variant
- Opens by Date for Each Variant
- Direct Opens by Date for Each Variant
- Bounces by Date for Each Variant

Email campaign results contain graphs for the following analytics:

- Number Delivered by Date for Each Variant
- Number Sent by Date for Each Variant
- Opens by Date for Each Variant
- Clicks by Date for Each Variant
- Bounces by Date for Each Variant
- Spam Reports by Date for Each Variant

In-app message campaign results contain graphs for the following analytics:

- Sent by Date for Each Variant
- Impressions by Date for Each Variant
- Clicks by Date for Each Variant

## News Feed Data

When analyzing the performance of a specific News Feed card, you can export the data that is found in the Performance Breakdown graphs:

- Impressions by Date
    - Clickthrough Rate
    - Impressions
    - Unique Impressions
- Clicks by Date
    - Clickthrough Rate
    - Clicks
    - Unique Clicks

## Custom Event Data

The Custom Events page of the Dashboard allows you to view the occurrences of one or more custom event over time. If you view Detailed Statistics for custom events or custom events by hour, you'll have the option of also viewing the data by specific segments.

![Custom events][14]

You can export the following CSVs:

- Custom Events by Date
    - (Optional) Custom Events for Different Segments
- Custom Events by Hour
    - (Optional) Custom Events for Different Segments
- Custom Events per MAU

## Device and Carrier Data

For information on your users' phone operating systems, screen resolutions, wireless carriers and device models, go to the Devices & Carriers page, where you can export the following data:

- Operating Systems
    - Number count for each device
    - Percentage of total for each device
- Screen Resolutions
    - Number count for each resolution
    - Percentage of total for each resolution
- Wireless Carriers
    - Number count for each carrier
    - Percentage of total for each carrier
- Device Models
    - Number count for each model
    - Percentage of total for each model

## Opening CSV Exports in Excel

### Setting Excel as the Default Program

While CSV files are usually automatically opened in Excel by default, that is sometimes not the case on Windows 7. [Here are instructions and screenshots][20] on how to set Excel as your default program for CSVs on Windows 7.

### Converting CSV to XLSX or XLS

To convert a CSV to XLSX or XLS, or get rid of the comma in between data values, [refer to this guide][19] for importing CSVs into Excel.

### Leading Zeroes Stripped From User IDs

You may sometimes find that leading zeroes are stripped from User IDs in your CSV export. This happens because Excel treats the numbers in a CSV as data, as opposed to text. [Here are steps on how to remedy this][22] by running Excel's Text Import Wizard.

## Export APIs

Appboy's export APIs allow you to programatically export a JSON file of Dashboard data. Our [documentation page on export APIs][24] contains a list of data that you can access, as well as instructions and sample code for the export.

There are a few reasons why you would prefer this method over exporting a CSV directly from the Dashboard:

 - Your file is very large. From our Dashboard, you can export a CSV with at most 500,000 rows. If you're exporting data on a segment with over 500,000 users, you'll need to use our export API, which places no limit on how much you can export.
 -  You wish to interact with the data programatically.

[1]: /assets/img/csvexport.png
[2]: /assets/img/csvexport2.png
[6]: /assets/img/Export_Icon.png
[8]: /assets/img/Export_time.png
[9]: /assets/img/Export_revenue_graph.png
[10]: /assets/img/Export_revenue_chart.png
[11]: /assets/img/Export_multivariate.png
[14]: /assets/img/Export_events.png
[19]: https://www.ablebits.com/office-addins-blog/2014/05/01/convert-csv-excel/#import-csv-wizard
[20]: http://www.solveyourtech.com/how-to-open-csv-files-with-excel-by-default/
[22]: https://www.ablebits.com/office-addins-blog/2014/05/01/convert-csv-excel/#csv-leading-zero
[24]: https://documentation.appboy.com/REST_APIs/Export
[26]: https://documentation.appboy.com/Partner_Integration/AWS_S3_Integration
[27]: /assets/img/app_usage.png
[28]: /assets/img/message_deliveries.png
[29]: https://developers.facebook.com/docs/marketing-api/overview#configure-app
[30]: https://developers.facebook.com/apps/
[31]: /assets/img/fbk_1.png
[32]: /assets/img/fbk_2.png
[33]: https://www.facebook.com/ads/manage/customaudiences/tos.php
[34]: /assets/img/fbk_3.png
[35]: /assets/img/fbk_4.png
[36]: /assets/img/fbk_5.png
[37]: /assets/img/fbk_6.png
[38]: https://dashboard.appboy.com/app_settings/integration/facebook_credentials/
[39]: https://www.facebook.com/ads/manager/audiences/manage/
[40]: https://www.facebook.com/business/a/online-sales/lookalike-audiences
[41]: /assets/img/fbk_7.png
