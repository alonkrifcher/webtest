---
title: Analytics Overview
placement_logic: at top of Analytics section
---
## Overview

Before completing your Appboy implementation, ensure that you have a conversation between your marketing team and your development team regarding your marketing goals. When deciding what you want to track, and how you want to track it with Appboy, it's useful to consider these goals and work backwards from there. Please reference our case of a [Taxi/Ride-Sharing App][16] at the end of this guide for an example of this process.

This best practice guide will help you to understand exactly what Appboy considers to be a "Custom Event" vs. a "Custom Attribute". Remember that the following events and attributes are captured automatically by the Appboy SDK and should __NOT BE__ recorded via Custom Events or Attributes:

### Automatically Captured Data

- First Used App (Date)
- Last Used App (Date)
- Clicked Card (Integer)
- Number of Feedback Items (Integer)
- Total Session Count (Integer)
- Email Available (Boolean)
- Location Available (Boolean)
- Most Recent Location (if location permission is granted to your app)
- Push Enabled (Boolean)
- Last Received Any Campaign (Date)
- Last Received Email Campaign (Date)
- Last Received Push Campaign (Date)
- Last Viewed News Feed (Date)
- News Feed View Count (Integer)
- Received Campaign
  - This filter allows you to target users based on their having (not) received a previous campaign.
- Retarget Campaign
  - This filter allows you to target users based on whether or not they have opened, or clicked on a specific email, push, or slideup in the past
- Connected Facebook
- Connected Twitter
- Country (taken from Device Locale)
- Language (taken from Device Locale)
- Device Model
- Device OS Version
- Device Resolution
- Device Wireless Carrier
- Uninstalled (date)

###  Custom Event Overview
Custom Events are best suited for tracking high value user interactions with your application, so adding these events gives you a ton of added messaging and analytical power!

Appboy Custom Events also track how often an event occurs within our database so you can use segmentation filters like:

| Segmentation Options | Dropdown Filter | Input Options |
| ---------------------| --------------- | ------------- |
| Check if the custom event has occured __more than X number of times__ | __MORE THAN__ | __INTEGER__ |
| Check if the custom event has occured __less than X number of times__ | __LESS THAN__ | __INTEGER__ |
| Check if the custom event has occured __exactly X number of times__ | __EQUAL TO__ | __INTEGER__ |
| Check if the custom event last occured __after X date__ | __AFTER__ | __DATE__ |
| Check if the custom event last occured __before X date__ | __BEFORE__ | __DATE__ |
| Check if the custom event last occured __more than X days ago__ | __MORE THAN__ | __NUMBER OF DAYS AGO__ (Positive) Integer) |
| Check if the custom event last occured __less than X days ago__ | __LESS THAN__ | __NUMBER OF DAYS AGO__ (Positive) Integer) |


Appboy notes the number of times these events have occured as well as the last time they were performed by each user for segmentation. On the [custom events analytics page][7] you can view in aggregate how often each custom event occurs, as well as by segment over time for more detailed analysis. This is particularly useful to view how your campaigns have affected custom event activity by looking at the gray lines Appboy overlays on the time-series to indicate the last time a campaign was sent.

![custom_event_analytics_example.png][8]

__Note__: [Incrementing Custom Attributes][12] can be used to keep a counter on a user action similar to a custom event which doesn't count against your agreed upon monthly data points cap. However, you will not be able to view custom attribute data in a time-series. User actions which do not need to be analyzed in time-series should be recorded via this method.

### Custom Attribute Overview

Custom Attributes are best for storing attributes about your users, or information about low-value actions within your application. You should keep in mind that we don't store time-series information for Custom Attributes, so you're not going to get any graphs based upon them like the above example for Custom Events.

### Custom Attribute Data Types
Custom Attributes are extraordinarily flexible tools that allow for great targeting. The following data types may be stored as custom attributes:

#### Strings (Alpha-Numeric Characters)
String attributes are useful for storing user input, such as a favorite brand, a phone number, or a last search string within your application.

| Segmentation Options | Dropdown Filter | Input Options |
| ---------------------| --------------- | ------------- |
| Check if the string attribute __exactly matches__ an inputted string| __EQUALS__ | __STRING__ |
| Check if the string attribute __partially matches__ an inputted string __OR__ Regular Expression | __MATCHES__ | __STRING__ __OR__ __REGULAR EXPRESSION__ |
| Check if the string attribute __does not match__ an inputted string| __DOES NOT EQUAL__ | __STRING__ |

__Note__: We use [Perl compatible regular expressions (PCRE)][11].

#### Arrays
Array attributes are good for storing related lists of information about your users. For example, storing the last 100 pieces of content a user watched within an array would allow specific interest segmentation.

| Segmentation Options | Dropdown Filter | Input Options |
| ---------------------| --------------- | ------------- |
| Check if the array attribute __contains a value which exactly matches__ an inputted value| __EQUALS__ | __STRING__ |
| Check if the array attribute __contains a value which partially matches__ an inputted value __OR__ Regular Expression | __MATCHES__ | __STRING__ __OR__ __REGULAR EXPRESSION__ |
| Check if the array attribute __does not contain a value which matches__ an inputted value| __DOES NOT EQUAL__ | __STRING__ |

__Note__: We use [Perl compatible regular expressions (PCRE)][11].

#### Dates
Date attributes are useful for storing the last time a specific action was taken, so you can offer content specific re-engagement messaging to your users.

__Note:__ The last date a custom event or purchase event occurred is automatically recorded, and should not be recorded in duplicate via a custom date attribute.

Date filters using relative dates (e.g., more than 1 day ago, less than 2 days ago) measure 1 day as 24 hours. Any campaign that you run using these filters will include all users in 24 hour increments. For example, last used app more than 1 day ago will capture all users who "last used the app more than 24 hours" from the exact time the campaign runs. The same will be true for campaigns set with longer date ranges – so five days from activation will mean the prior 120 hours.

| Segmentation Options | Dropdown Filter | Input Options |
| ---------------------| --------------- | ------------- |
| Check if the date attribute __is before__ a __selected date__| __BEFORE__ | __CALENDAR DATE SELECTOR__ |
| Check if the date attribute __is after__ a __selected date__| __AFTER__ | __CALENDAR DATE SELECTOR__ |
| Check if the date attribute is __more than X number__ of __days ago__ | __MORE THAN__ | __NUMBER OF DAYS AGO__ (Positive Integer) |
| Check if the date attribute is __more than X number__ of __days in the future__ | __MORE THAN__ | __NUMBER OF DAYS AGO__ (Negative Integer) |
| Check if the date attribute is __less than X number__ of __days ago__| __LESS THAN__ | __NUMBER OF DAYS AGO__ (Positive Integer) |
| Check if the date attribute is __less than X number__ of __days in the future__ | __LESS THAN__ | __NUMBER OF DAYS AGO__ (Negative Integer) |

#### Integers (Standard and Incrementing) and Decimals (Floats/Doubles) {#integers}
Numeric attributes have a wide variety of use-cases. Incrementing integer custom attributes are useful for storing the number of times a given action or event has occurred without counting against your data cap. Standard integers and decimals have all sorts of usages, for example : (Recording shoe size, waist size, number of times a user has viewed a certain product feature, or category.
__Note__: Money spent in app should not be recorded by this method. Rather it should be recorded via our [purchase methods][4].

| Segmentation Options | Dropdown Filter | Input Options |
| ---------------------| --------------- | ------------- |
| Check if the numeric attribute __is greater than__ an __integer or decimal value__| __GREATER THAN__ | __INTEGER__ or __DECIMAL__ |
| Check if the numeric attribute __is less than__ an __integer or decimal value__| __LESS THAN__ | __INTEGER__ or __DECIMAL__ |
| Check if the numeric attribute __is equal to__ an __integer or decimal value__| __EQUAL TO__ | __INTEGER__ or __DECIMAL__ |

#### Booleans (True/False)
Boolean attributes are useful for storing subscription statuses, and other simple binary data about your users.

| Segmentation Options | Dropdown Filter | Input Options |
| ---------------------| --------------- | ------------- |
| Check if the boolean value is | __Equal To__ | __TRUE__ or __FALSE__ |

### Revenue Tracking Overview

Using our purchase methods to record in-app purchases establishes the Life-time Value(LTV) for each individual user profile. This data is viewable within our revenue page in time-series.

| Segmentation Options | Dropdown Filter | Input Options |
| ---------------------| --------------- | ------------- |
| Check if the total number of dollars spent __is greater than__ an __integer or decimal value__| __GREATER THAN__ | __INTEGER__ or __DECIMAL__ |
| Check if the total number of dollars spent __is less than__ an __integer or decimal value__| __LESS THAN__ | __INTEGER__ or __DECIMAL__ |
| Check if total number of dollars spent __is equal to__ an __integer or decimal value__| __EQUAL TO__ | __INTEGER__ or __DECIMAL__ |
| Check if the purchase last occured __after X date__ | __AFTER__ | __DATE__ |
| Check if the purchase last occured __before X date__ | __BEFORE__ | __DATE__ |
| Check if the purchase last occured __more than X days ago__ | __MORE THAN__ | __DATE__ |
| Check if the purchase last occured __less than X days ago__ | __LESS THAN__ | __DATE__ |

__Note__: If you would like to segment on the number of times a specific purchase has occurred you should also record that purchase individually as an [incrementing custom attribute][12].

### Taxi/Ride-Sharing App Use Case {#example-case}
For this example case, let's consider a Taxi/Ride-Sharing app (such as Hailo, Uber, Lyft, etc.) that wants to decide what user data to collect. The questions and brainstorming process below are a great model for marketing and development teams to follow. By the end of this exercise, both teams should have a solid understanding of what custom events and attributes make sense to collect in order to help meet their goal.

__Case Question #1: What is the goal?__

Their goal is straightforward in that they want users to hail taxi rides via their app.

__Case Question #2: What are the intermediate steps on the way to that goal from app installation?__

1. They need users to begin the registration process and fill out their personal information.
2. They need users to complete & verify the registration process by inputting a code into the app they receive via SMS.
3. They need to attempt to hail a taxi.
4. In order to hail a taxi, they must be available when they search.

The above actions could then be tagged as the following Custom Events:

- Began Registration
- Completed Registration
- Successful Taxi Hails
- Unsuccessful Taxi Hails

After implementing the events, you can now run the following campaigns:

1. Message users who Began Registration, but didn't Completed Registration within a certain time frame.
2. Send congratulation messages to users who complete registration.
3. Send apologies and promotional credit to users who had unsuccessful taxi hails, that weren't followed by a successful taxi hail within a certain amount of time.
4. Send promotions to power users with lots of Successful Taxi Hails to thank them for their loyalty.
5. Many, Many More.

__Case Question #3: What other information might we want to know about our users that will inform our messaging?__

- Whether or not they have any promotional credit?
- The average rating they give to their drivers?
- Unique Promo Codes for the user?

The above characteristics could then be tagged as the following Custom Attributes:

- Promotional Credit Balance (Decimal Type)
- Average Driver Rating (Integer Type)
- Unique Promo Code (String Type)

Adding these attributes would afford you the ability to send campaigns to users like:

1. Reminding users who haven't used the app in 7 days who have promotional credit remaining on their account that it is there and that they should come back to the app and use it!
2. Messaging users who give low driver ratings to get direct customer feedback to see why they didn't enjoy their rides.
3. Use our [message templating and personalization features][17] to drag the unique promo code attribute into messaging directed at users.

## Best Practices

### General Best Practices

#### Don’t Over-Segment Your Tracking

- Being more generic will help you target more users and draw more useful divisions between user segments
- For example, rather than capturing a separate event for watching each of 50 different movies, it would be more effective to capture simply watching a movie as an event
- If you over segment your user data, your findings will lose statistical significance and won’t guide the development of your app and marketing initiatives as effectively
    - You will “miss the forest for the trees” when evaluating user-trend data
    - Events should be tied directly to your marketing and conversion goals

__Note__: Multiple user actions within an app can be labeled with the same custom event or attribute designation. This is useful when you want to track something generically such as "played a song" rather than recording each individual song within a music app as a separate and distinct event.

### Development Best Practices

#### Set User IDs for Every User

User IDs should be set for each of your users. These should be unchanging and accessible when a user opens the app. A database ID or a hashed email address/username is usually a good reference to use. We __strongly recommend__ providing this identifier as it will allow you to:

- Track your users across devices and platforms, improving the quality of your behaviorial and demographic data.
- Import data about your users using our [User Data API][9].
- Target specific users with our [Messaging API][10] for both general and transactional messages.

__Note__: If such an identifier is not available, Appboy will assign a unique identifier to your users, but you will lack the capabilities above. You should avoid setting User IDs for users for whom you lack a unique identifier that is tied to them as an individual. Passing a device identifier offers no benefit versus the automatic anonymous user tracking Appboy offers by default.

__Note__: These User IDs should be private and not easily obtained (e.g. not a plain email address or username).

#### Give Custom Events and Attributes Readable Names
Imagine you're a marketer who begins using Appboy a year or two after implementation, reading a dropdown list full of names like "usr_no_acct" without further context may be intimidating. Giving your event and attributes identifiable and readable names will make things easier for all users of your platform. Consider the following best-practices:

- Do not begin a custom event with a numeric character. The drop-down list is sorted alphabetically and beginning with a numerical character makes it more difficult to segment by your filter of choice
- Try not to use obscure abbreviations or technical jargon where possible
  - Example: `usr_ctry` may be fine as a variable name for a user's country within a piece of code, but the custom attribute ought be sent to Appboy as `user_country` at very least to lend some clarity to a marketer using the dashboard down the line.

#### Avoid Programmatically Generating Events
If you are constantly creating new event names it is going to be impossible to meaningfully segment your users. You are going to run into the same over-segmentation problems described above. Additionally, programmatic custom events run a risk of containing more than 255 characters which is a constraint placed upon events and attributes (see below). You should generally capture generic events (“Watched a Video” or “Read an Article”) instead of highly specific events such as (“Watched Gangnam Style” or “Read Article: Best 10 Lunch Spots in Midtown Manhattan”).

### Technical Limitations & Constraints
Please be mindful of the following limitations and constraints when implementing custom events:

#### Length Constraints
All custom events, custom attribute names (keys), and custom event string values of 255 characters or longer will be truncated. Ideally, these should be as short as possible to improve network and battery performance for your app. If possible limit them to 50 characters.

#### Content Constraints
The following content will be trimmed programmatically from your attributes and events. Please take care not to use the following:

- Leading and trailing whitespace
- Newlines
- All non-digits within phone numbers
  - Example: "(214) 450-7900" will be condensed to "2144507900"
- Non-whitespace characters must be converted into spaces
- $ should not be used as a prefix for any custom events
- Any invalid UTF-8 encoding values
  -  "My \x80 Field" would be condensed to "My Field"

#### Reserved Keys
The following keys are __RESERVED__ and __CANNOT__ be used:

- `email`
- `facebook`
- `foursquare`
- `foursquare_access_token`
- `weibo`
- `twitter`
- `first_name`
- `last_name`
- `dob`
- `external_id`
- `country`
- `home_city`
- `bio`
- `gender`
- `phone`
- `email_subscribe`
- `push_subscribe`

#### Value Definitions

- Integer values are 64 bit
- Decimals have 15 decimal digits by default

### Parsing a Generic Name Field

If only a single generic name field exists for a user (e.g. 'JohnDoe'), you can assign this entire title to your user's First Name attribute. Additionally, you can attempt to parse out both the first and last name of the user using spaces, but this latter method carries the potential risk of misnaming some of your users.

[4]: #revenue-tracking-overview
[7]: https://dashboard.appboy.com/dashboard/custom_events/
[8]: /assets/img/custom_event_analytics_example.png "custom_event_analytics_example.png"
[9]: /REST_APIs/User_Data "User Data API"
[10]: /REST_APIs/Messaging "Messaging API"
[11]: http://www.regextester.com/pregsyntax.html
[12]: #integers
[16]: #example-case
[17]: https://academy.appboy.com/Quick_Wins/Personalized_Messaging
