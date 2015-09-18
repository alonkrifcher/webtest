---
title: Creating a Push Message
---
# Creating a Push Message

Push notifications are wonderful for time-sensitive calls to action, as well as re-engaging users who haven't come into the app in a while. 

Successful Push Campaigns are going to drive the user directly to content or demonstrate the value of your app. 

To see examples of push notifications, check out our [Client Integration Gallery][8]. 

## Step 1: Create a New Campaign {#create-new-campaign-push}

From the Messaging Page, click "Create New Campaign."

![newcampaign][1]

## Step 2: Name Your Campaign, Choose Messaging Types, and Compose your Message

Next, you need to name your campaign and select the messaging types that will be included in the campaign. You select the platform(s) you're sending a Push message to by clicking on the toggle buttons on the right hand side. 

![Push2][2]

Time to write your push message! Type it into the box and watch a preview appear on the device in the box.

## Step 3: Schedule Your Messaging Campaign {#schedule-push-campaign}

![Schedule][3] 

Message scheduling features include:

- Schedule messages to send immediately, at a specific time, using "Optimized Notification Timing".
- __Optimized Notification Timing__: Appboy allows you to define a window during which you would like a user to receive a notification and Appboy will send it to each individual user at the time we determine they are most likely to engage. We make this calculation based upon a statistical analysis of the user's past interactions with the app.
- ![Optimized Push Scheduling][7]
- Automatically schedule campaigns to send at a certain time with respect to the local time of each of your users. 
- Messages can also be configured to recur on a daily, weekly (optionally on specific days), or monthly basis.
- __Note:__ Unless you check the box titled "Allow users to become re-eligible to receive campaign" under the __Schedule__ portion of the campaign wizard, each user will only receive the contents of a campaign once, and only new users that meet the criteria will receive the campaign on subsequent deliveries.

## Step 4: Target Users

On the "Target Users" step of campaign setup, you can choose the target audience for your campaign. In the Audience Statistics section at the top of this page, you'll automatically be given a snapshot of how many users qualify for that target group right now, including how many are eligible to receive email and push notifications. Keep in mind that exact segment membership is always calculated just before the message is sent.

![Segment Statistics][24]

Under the Targeting Options section, you'll find a few options for who you can send your campaign to:

	1. __Members of a previously created segment.__ To do this, simply select one segment from the dropdown under "Target Users By Segment."

	2. __Users that fall into multiple previously created segments.__ To do this, add multiple segments from the dropdown under "Target Users By Segment." The resulting target audience will be users that are in the first segment *and* the second segment *and* the third segment, etc.

	3. __Users of one or more previously created segments that also fall under additional filters.__ After first selecting your segment(s), you can further refine your audience under the "Additional Filters" section. This is demonstrated in the screenshot below, which targets users that are in the 10 Unread Messages segment *and* are in the Active Users segment *and* have made a purchase less than 30 days ago.

	4. __Users that fall under a series of filters (and are not defined by pre-existing segments).__ This means you do not need to target a campaign at a pre-existing segment - you can make an ad hoc audience during campaign creation by just using the additional filters, and not selecting any segments under "Target Users By Segment. This will allow you to skip segment creation when sending campaigns to one-off audiences.

![Segmenter][25]

Above the Audience Statistics chart, there will be an Audience Summary that spells out which users you're targeting.

## Step 5: Choose Conversion Event

Appboy allows you to track whether users perform specific actions (Conversion Events) after receiving a campaign. You can specify any of the following actions as a "Conversion Event":

- Opens App
- Makes Purchase
- This can be a generic purchase or a specific item
- Performs specific custom event

You have the option of allowing a 3, 7, 14 or 30 day window during which it will be counted as a "conversion" if the user takes the specified action.

![Conversion Event][15] 

## Step 6: Review and Deploy {#review-and-deploy-push}

The final page will give you a summary of the campaign you've just designed. Clicking "Launch Campaign" will enable it to send. Confirm all the relevant details and watch the data roll in!

![Launch Push Campaign][5]

## Results Data {#results-data-push}

Appboy will show you the number of messages sent and opened over time for each push campaign you deploy as shown below:

![Results][6]

For push notifications, you'll be able to view statistics for the number of messages sent, delivered, bounced, opened and directly opened. 

## Video Walkthrough

Need more assistance? Check out our video overview on creating a campaign!
<div class="video-container">
<iframe width="700" height="400" src="//www.youtube.com/embed/nRndfzpazF8" frameborder="0" allowfullscreen></iframe>
</div>

[1]: /assets/img/newcampaign.png
[2]: /assets/img/push2.png
[3]: /assets/img/schedule.png
[5]: /assets/img/push_launch.png
[6]: /assets/img/push-results-statistics.png
[7]: /assets/img/intelligent_delivery.png
[8]: https://academy.appboy.com/Best_Practices/Client_Integration_Gallery#push
[15]: /assets/img/conversion_event_tracking.png
[24]: /assets/img/target_segment_statistics.png
[25]: /assets/img/target_segmenter.png