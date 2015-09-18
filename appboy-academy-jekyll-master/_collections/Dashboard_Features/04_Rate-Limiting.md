---
title: Rate-Limiting
---

# Rate-Limiting

Appboy allows you to implement two different types of rate-limiting for your campaigns. The first focuses on providing the best experience for the end user, while the second takes into consideration the bandwidth of your servers.

## User Centric Rate-Limiting

As you create more segments, there are going to be cases where the membership of those segments overlap. If you're sending out campaigns to those segments, you want to be sure that you are not messaging your users too often. If a user receives too many messages within a short time period, they will feel over-encumbered and either turn off push notifications or uninstall your app.

### Relevant Segment Filters
Appboy provides the following filters in order to help you limit the rate at which your users receive messages:

- Last Engaged With Message
- Last Received Any Campaign
- Last Received Push Campaign
- Last Received Email Campaign
- Last Viewed News Feed

### Implementing Filters
Consider the following example segment:

![Rate_Limit_Example][1]

This is a standard re-engagement segment. If you have other more targeted segments receiving notifications recently, you may not want your users to be targeted by more generic campaigns directed at this segment. Appending the "Last Received Push Campaign" filter to this campaign, the user has ensured that if they've received another notification in the past 24 hours, they will slide out of this campaign for the next 24 hours. If they still meet the other criteria of the segment 24 hours later and haven't received any more notifications they will slide back into the segment.

Appending this filter to all segments targeted by campaigns would cause your users to receive a maximum of one push every 24 hours. You could then prioritize your messaging by ensuring that your most important messages are delivered before less important messages.


### Setting A Max User Cap
Additionally, in the 'Target Users' section of your campaign composition, you can limit the total number of users that will receive your message. This feature serves as a check that is independent of your campaign filters, allowing you to freely segment users without needing to worry about over-spamming.

![Total Limit Example][2]

Using the filters in this way, you'll be able to limit the rate at which your users receive notifications on a per channel basis or globally across all message types.

## Delivery Speed Rate-Limiting

If you anticipate large campaigns driving a spike in user activity and overloading your servers, you can specify a per minute rate limit for sending messages. While targeting users during campaign creation, you can click into Advanced Options and select a rate limit (in various increments from 10K to 500K messages per minute).

![Per Minute Rate Limit Example] [3]

For instance, if you are trying to send out 75K messages with a 10K per minute rate limit, the delivery will be spread out over 8 minutes. Your campaign will deliver 10k for each of the first 7 minutes, and 5K over the last minute. Be wary of delaying time sensitive messages, however, with this form of rate-limiting. If the segment contains 30M users but we set the rate limit to 10K per minute, a large portion of the user base won't receive the message until the following day.

### Multi-Channel Campaigns
Keep in mind that the per minute rate limit is adjusted on a per campaign basis. If multiple channels are utilized within a campaign, the rate limit will apply to each of those channels. If your campaign utilizes email and in-app banners with a rate limit of 10K per minute, we will send 20K total messages each minute (10K email, 10K push).

### Multi-Platform Push Campaigns
For push campaigns delivering on multiple platforms, the rate limit selected will be equally distributed across platforms. A push campaign leveraging Android, iOS and Windows with a 10K rate limit per minute will equally distribute the 10K messages across the 3 platforms.

## Frequency Capping

As your user base continues to grow and your messaging scales to include life cycle, triggered, transactional and conversion campaigns, it’s important to prevent your notifications from appearing spammy or disruptive. By granting greater control over your users’ experience, Frequency Capping enables you to create the campaigns you desire without overwhelming your audience.

### Feature Overview

Frequency Capping can be set up for each app group by selecting the gear icon in the upper right corner of the Campaigns page. From here, you can choose:

- What message channel you’d like to cap - push, email, in-app or any of those three
- How many times each user should receive that channel within a certain time frame, which can be measured in minutes, days, weeks and months

Each line of frequency caps will be connected using an "AND," and you're able to add as many as you wish. In addition, you may include multiple caps for the same message types. For instance, you can cap users to no more than 1 push per day and no more than 3 pushes per week.

![Frequency Capping][14]

### Delivery Rules

There may be some campaigns - transactional messages, in particular - that you wish to always reach the user, even if she has already reached her frequency cap. If you want a particular campaign to override Frequency Capping rules, you can set this up when scheduling that campaign's delivery by checking the box next to "Ignore frequency capping settings for this campaign". When sending [API campaigns][15], which are often transactional, you'll have the ability to specify that a campaign should ignore Frequency Capping rules [within the API request][16] by setting "override_messaging_limits" to "true." Keep in mind that even if a particular campaign overrides Frequency Capping settings, it will still count towards users' overall frequency caps. For instance, if users are capped to one email per day, and a user receives an email that ignores Frequency Capping settings, then that user won't be able to receive any more emails that day unless that email also ignores Frequency Capping settings.

![Overriding Rate Limits][17]

- Different channels within a multi-channel campaign will individually count towards the frequency cap. For instance, if you create a multi-channel campaign with, say, both push and email, and have Frequency Capping set up for both of those channels, then the push will count toward 1 push campaign and the in-app message will count toward 1 in-app message campaign. The campaign will also count toward 1 "campaign of any type." If users are capped to 1 push and 1 in-app campaign per day and someone receives this multi-channel campaign, then she will no longer be eligible for push or in-app campaigns for the rest of the day (unless a campaign ignores Frequency Capping rules).

- Keep in mind that Frequency Capping applies to the campaigns a user receives, and not to individual messages. That is, if you have a recurring campaign that users are re-eligible to receive, each recurring message of each channel will be counted as just one campaign. For instance, if a user receives a recurring push campaign that delivers every day, and she is capped to 2 push campaigns per week, the recurring push messages will collectively count towards 1 push campaign for frequency capping purposes, and for that week, this user will still be eligible to receive a different campaign that contains push.

[1]: /assets/img/rate_limit_daily.png
[2]: /assets/img/total_limit.png
[3]: /assets/img/per_minute_rate_limit.png
[14]: /assets/img/rate_limiting_overview.png
[15]: https://documentation.appboy.com/REST_APIs/Messaging
[16]: https://documentation.appboy.com/Advanced_Use_Cases/API_Campaigns
[17]: /assets/img/rate_limiting_overriding.png
