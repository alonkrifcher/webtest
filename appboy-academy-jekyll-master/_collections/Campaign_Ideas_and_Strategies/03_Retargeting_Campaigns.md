---
title: Retargeting Campaigns
---
# Retargeting Campaigns

Appboy provides out of the box support for retargeting users based on the messaging they have received in the past. You can retarget users by creating segments of users who have already received a campaign or who have clicked a card in the news feed.

![SCREENSHOT][1]

Each of these retargeting filters provides you with several options after you add them.

## Retargeting Filters

### Clicked Card Filter

![clickedcard][2]

You can set the filter to find users who Have/Have Not clicked a specific News Feed card (which you specify in the drop-down).

### Clicked/Opened Campaign Filter

![clickedopened][3]

You can set this filter to find users who Have/Have Not:

- Clicked Email
- Clicked In-App Message
- Directly Opened Push Notification
- Opened Email
- Viewed In-App Message

This can be further specified by selecting which campaign you want to retarget in the drop-down.

### Converted From Campaign Filter

![converted from campaign][12]

You can set this filter to find users who Have/Have Not converted as part of your target campaign, which is selected in the drop-down menu.

__Note__: For recurring campaigns this filter refers to whether users have converted on the _most recent_ message from the campaign.

### In Campaign Control Group Filter

![control group][13]

You can set this filter to find users who Are/Are Not in the control group of your target campaign, which can be selected in the drop-down.

### Received Campaign Filter

![receivedcamp][4]

You can set this filter to find users who Have/Have Not received your target campaign, which you select in the drop-down.

## Why Use Retargeting Campaigns?

Retargeting is particularly effective when the original segment also included a specific action you want to see users take. For example, let's say you have a card targeted at users who have never made a purchase. The card advertises a promotion for a discounted in-app purchase. The initial segment looks like:

- Money Spent in App is exactly 0
- Last Used App less than 14 days ago

The total number of users in the segment is 100,000 and you know from the news feed stats that 60,000 unique users viewed the card and 20,000 unique users clicked the card. Through the segmenter we can see how many of those users who clicked the card actually made a purchase:

- Money Spent in App is more than 0
- Clicked Card is {Name of Card}

After examining those stats, we can make a segment of users who clicked the card, but did not make a purchase:

- Money Spent in App is exactly than 0
- Clicked Card is {Name of Card}

We can retarget this segment with additional messaging around the promotion or another in-app purchase. Retargeting can be done via another news feed card or through a messaging campaign. A multi-channel approach allows you to reach users where they’re most likely to respond, thus increasing the effectiveness of your campaigns.

[1]: /assets/img/retarget.png
[2]: /assets/img/clickedcard.png
[3]: /assets/img/clickedopened.png
[4]: /assets/img/receivedcamp.png
[12]: /assets/img/converted_from_campaign.png
[13]: /assets/img/campaign_control_group.png
