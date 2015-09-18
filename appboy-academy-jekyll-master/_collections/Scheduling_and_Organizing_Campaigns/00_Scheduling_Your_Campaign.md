---
title: Scheduling Your Campaign
---
# Scheduling Your Campaign

Every savvy marketer knows that timing is key, which is why Appboy provides multiple scheduling options that will empower you to reach users at precisely the right time. Ample flexibility, however, may cause uncertainty over which type of schedule fits best with your campaign's goals. To help you get the most of Appboy's platform, we've created this handy guide that reviews your scheduling options, best practices and use cases.

## Scheduled Delivery

Campaigns sent using time-based scheduled delivery are delivered on specified days.

![Time based][3]

### Option 1: Sending Immediately

If you choose to send a message as soon as it's launched, it will begin sending as soon as you finish creating your campaign.

![Immediately][10]

This type of schedule is designed for one-off campaigns that you wish to send immediately, such as messages pertaining to a current event. A sports app, for instance, may schedule push notifications on score updates using this option. In addition, when sending test messages aimed at just yourself or your team, this option allows you to deliver them immediately. If you plan on editing the campaign and re-sending it after viewing the test, be sure to check the box that makes users [re-eligible][24] to receive the campaign. By default, Appboy sends a campaign to a user just once, unless that box is checked.

### Option 2: Sending at a Designated Time

Scheduling a campaign for a designated time allows you to specify the days and times your campaign will send. You can send a message once, daily, weekly or monthly at a certain time of day, as well as specify when your campaign should begin and end.

![Designated time][9]

#### Local Time Zone Campaigns

You can deliver the message in users' local time zones, so that members of your international audience won't receive a notification at 4am. Local time zone campaigns need to be scheduled 24 hours in advance to ensure that eligible users from all time zones can receive it. Read [our FAQ page on this feature][25] to understand how local time zone campaigns work and the associated delivery rules.

Lastly, segments targeted with local time zone campaigns should include at minimum a 2-day window to incorporate users from all time zones. For instance, if your campaign is scheduled to send in the evening but has just a 1-day window, then some users may have fallen out of the segment when their time zone is reached. Examples of filters that create a 2-day window are "last used more than 1 day ago" and "last used less than 3 days ago," or "first purchased more than 7 days ago" and "first purchased less than 9 days ago."

#### Use Cases

Designated time schedules are best suited for messages scheduled in advance and recurring campaigns - such as [onboarding][7] and retention - that run regularly on all qualified users.

### Option 3: Intelligent Delivery

Intelligent Delivery allows your to deliver a campaign to each user at a different time. Appboy calculates each individual's time based on when that user typically engages with your app and its notifications. You can optionally specify that intelligent delivery campaigns send only during a certain portion of the day - for instance, if you are notifying users of a promotion that ends at midnight, you may want your messages to send by 10pm at the latest. Read our [page on Intelligent Delivery][8] for more details on how this feature works.

![Intelligent Delivery][14]

#### Delivery Rules

Because a user's optimal time can be anytime over the course of 24 hours, all Intelligent Delivery campaigns must be scheduled 24 hours in advance. In addition, similar to designated time campaigns, messages with a 1-day window will miss users who fall out of the segment before their optimal time in their time zone is reached. Segments for intelligent delivery campaigns should incorporate at minimum a 3-day window to account for this.

#### Use Cases

Intelligent Delivery campaigns work best for one-off and recurring messages where there is some flexibility regarding delivery time - for instance, they aren't well suited for breaking news or timed announcements.

## Action-Based Delivery (Event Triggered Campaigns)

Instead of sending your campaign on certain days, you can trigger them to send after a user completes a certain event. Here are the steps for setting up an event-based schedule:

### Setting Up a Triggered Campaign

__Step 1: Select a trigger event, which can be:__
- Opening the app
- Purchasing an item
- Interacting with Newsfeed cards (see [Appboy's Campaign Connector][33])
- Interating with other campaigns
- Entering a location
- Completing any custom event

You can also further filter trigger events through Appboy's [Custom Event Properties][32] which allows for customizable event properties for both custom events and in-app purchases. This feature allows you to further tailor which users receive a message based off of the specific attributes of the custom event, allowing for greater campaign personalization and more sophisticated data collection. For example, in the following screenshot, an Abandoned Cart custom event is further targeted to only reach users who've left between $100 and $200 worth of goods in their carts. 

![Custom Event Properties Pic][34]

Note that the trigger event "app open" can be the user's very first app open, if your campaign's segment applies to new users (for instance, if your segment consists of those with no sessions). 

Keep in mind that you can still send a triggered campaign to a specific segment of users, so users who aren't a part of the segment won't be able to receive the campaign even if they complete the trigger event.

In addition, triggered in-app messages still abide by [in-app message delivery rules][29] and will appear at the beginning of an app session.

![triggered 1][17]


__Step 2: Select how long to wait before sending the campaign, after the trigger criteria is met.__ Choose how long to delay your message after the user completes the trigger event.

In choosing your delay length, note that if you set a delay that is longer than the message's duration for sending (see Step 4), no users will receive your campaign.

![triggered 2][19]

__Step 3: Select an exception event that will disqualify users from receiving this campaign.__ You can only do this if your triggered message sends after a time delay. Exception events can be making a purchase, opening the app, performing the campaign's designated [conversion event][18], or performing a custom event. If a user completes the trigger event but then completes your exception event before the message sends due to the time delay, she will not receive the campaign. Users who do not receive the campaign due to the exception event will automatically be eligible to receive it in the future, the next time they complete the trigger event, even if you do not elect for users to become [re-eligible][24].

You can read more about how to employ exception events in our section on [use cases][22].  

![triggered 3][20]

__Step 4: Assign the campaign's duration by specifying a start time and optional end time.__ If a user completes a trigger event during the specified time frame, but actually qualifies for the message outside of the time frame due to a scheduled delay, then she will not receive the campaign. Therefore, if you set a time delay that is longer than the message's time frame, no users will receive your campaign. In addition, you can elect to send the message in users' [local time zones][5].

![triggered 4][21]

__Step 5: Select whether the user will receive the campaign during a specific portion of the day.__ If you give the message a time frame and the user either completes the trigger event outside the time frame or the message delay causes her to miss the time frame, then by default the user will not receive your message.

![triggered 5][27]

In the case where a user completes the trigger event within the time frame, but the message delay causes the user to fall out of the time frame, you can check the box below so that these users will still receive the campaign:

![triggered next available][31]

If a user doesn't receive the message because she misses the time frame, then she will still be qualified to get it the next time she completes the trigger event, even if you did not elect for users to become [re-eligible][24]. If you do elect for users to become re-eligible, then users can receive the campaign each time they complete the trigger event, assuming they qualify during the specified time frame.

If you have also assigned the campaign a certain duration, then in order to receive the message, a user must qualify within both the duration and the specific portion of the day.

__Step 6: Determine whether users can become [re-eligible][24] for the campaign.__ If you allow users to become re-eligible, you may specify a time delay before the user can receive the campaign again. This will prevent your triggered campaigns from becoming spammy.

![triggered 6][28]


### Use Cases

Triggered campaigns are very effective for transactional or achievement-based messages.

Transactional campaigns include messages sent after the user completes a purchase or adds an item to her cart. The latter case is a great example of a campaign that would benefit from an exception event. Say your campaign reminds users of items in their cart that they haven't purchased. The exception event in this case would be the user buying the products in her cart. For achievement-based campaigns, you can send a message 5 minutes after the user completes a conversion or beats a game level.

In addition, when creating welcome campaigns, you can trigger messages to send after the user registers or sets up an account. Staggering messages to be sent on different days following registration will allow you to create a thorough [onboarding process][30].

### Why Did a User Not Receive My Triggered Campaign?

Any of these things will prevent a user who has completed the trigger event from receiving the campaign:

- The user completed the exception event before the time delay had fully elapsed.
- The time delay caused the user to become qualified to receive the campaign after the duration has ended.
- The time delay caused the user to become qualified to receive the campaign outside of the specified portion of the day.
- The user has already received the campaign, and users do not become re-eligible.
- While users are re-eligible to receive the campaign, they can only re-trigger it after a certain period of time, and that period of time has not yet elapsed.

## API Triggered Campaigns (Server Triggered Campaigns)

API Triggered Campaigns are ideal for more advanced transactional use-cases. Appboy API Triggered Campaigns allow marketers to manage campaign copy, multivariate testing and re-eligibility rules within the Appboy dashboard while triggering the delivery of that content from their own servers and systems. The API request to trigger the message can also include additional data to be templated into the message in real time.

### Setting up an API Triggered Campaign

Setting up an API Triggered Campaign is easy. Simply configure your copy and notifications the same way as you would were it a normally scheduled notification and select "API Triggered Delivery". For more information on the triggering of these campaigns from your server please see the documentation referenced on that page.

![API Triggered Delivery Step][37]

### Using the Templated Content Included With an API request

In addition to triggering the message, you can also include content with the API request to be templated into the message within the `trigger_properties` object. This content can be referenced in the body of the message by saying something like `{{api_trigger_properties.${some_value_included_with_request}}}`. See the following social notification example use-case for additional context:

![Social Example Delivery Window][38]


## Making Users Re-Eligible for Campaigns

Whenever you schedule a recurring or triggered campaign, you have the option of allowing users to become re-eligible for it. By default, Appboy sends a campaign to a user only once, even if they re-qualify. By checking "Allow users to become re-eligible to receive campaign," you are overriding this default behavior and allowing qualified members to receive the campaign repeatedly.

In the case of triggered campaigns, users who [did not actually receive the campaign][26] (despite completing the trigger event) will automatically qualify for the message the next time they complete the trigger event, even if you did not make users re-eligible. By making users re-eligible for a triggered campaign, you are enabling them to actually receive (and not simply trigger) the message more than once.

![re-eligible][24]

[1]: #scheduled-delivery
[2]: #immediately
[3]: /assets/img/time_based.png
[4]: #designated
[5]: #local
[6]: #local-use
[7]: /Best_Practices/User_Onboarding
[8]: /Quick_Wins/Intelligent_Delivery
[9]: /assets/img/schedule_designated.png
[10]: /assets/img/schedule_immediately.png
[11]: #delivery-rules
[12]: #intelligent-delivery
[13]: #intelligent-use
[14]: /assets/img/schedule_intelligent.png
[15]: #triggered
[16]: #setup
[17]: /assets/img/schedule_triggered1.png
[18]: /Deep_Dives/Conversion_Events
[19]: /assets/img/schedule_triggered22.png
[20]: /assets/img/schedule_triggered32.png
[21]: /assets/img/schedule_triggered43.png
[22]: #triggered-use
[23]: #re-eligible
[24]: /assets/img/ReEligible.png
[25]: https://documentation.appboy.com/Frequently_Asked_Questions#local-timezone-delivery
[26]: #not-receive
[27]: /assets/img/schedule_triggered5.png
[28]: /assets/img/schedule_triggered6.png
[29]: /Best_Practices/In-App_Messages#message-behavior
[30]: /Best_Practices/User_Onboarding
[31]: /assets/img/schedule_triggered_next_available.png
[32]: /Best_Practices/User_Data_Collection#customeventproperties
[33]: /Quick_Wins/Campaign_Connector
[34]: /assets/img/customEventProperties.png
[34]: /assets/img/customEventProperties.png
[37]: /assets/img/api_triggered_campaign_delivery.png
[38]: /assets/img/api_trigger_photo_social_example_1.png
