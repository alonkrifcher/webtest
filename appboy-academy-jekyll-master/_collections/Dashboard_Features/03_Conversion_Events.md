---
title: Conversion Events
---
# Conversion Events
Appboy allows you to track how often users perform specific actions (Conversion Events) after receiving a campaign. Conversion Events allow you to go beyond tracking engagement with notifications and see exactly how your messaging drives your KPIs.

## Step 1: Create a Campaign
Navigate to the [Appboy Campaigns page][1] in your company dashboard and click "Create Campaign," then select the type of campaign you'd like to create.

After setting up your campaign's messages and, for non-API campaigns, schedule, you'll have the option to add a conversion event for tracking.

## Step 2: Add a Conversion Event
1. Select the general type of event you'd like to use.

	![Conversion Event Selection][2]

	- __Opens App__: A user is counted as having converted when they open any one of the apps that you specify (defaults to all apps in the app group).
	- __Makes Purchase__: A user is counted as having converted when they purchase the product you specify (defaults to any product).
	- __Performs Custom Event__: A user is counted as having converted when they perform one of your existing custom events (no default, you must specify the event).
	- __None__: No conversion event will be tracked for this campaign.

2. Set a "conversion deadline." You have the option of allowing a 3, 7, 14 or 30 day window during which it will be counted as a "conversion" if the user takes the specified action.  

3. Once you've selected an event, continue the campaign creation process and begin sending your campaign.

## Step 3: View Results
Navigate to the Details page for the campaign you just created. You can now see the number of conversions caused by this campaign.
![Campaign Stats Overview][3]

In addition, for multivariate messages, you can see the number of conversions and conversion percentage caused by each variant.
![Multivariate Stat Bars][4]

## Conversion Tracking Rules

- A user can only convert once for a campaign. Therefore, if a user who receives a campaign where the conversion event is "makes any purchase" makes 2 separate purchases within the deadline, this will only count as one conversion.
- If a user receives two conversion campaigns and completes one conversion event within the deadline of both, then both campaigns will register one addition conversion.

## Conversion Events Video Overview

If you're looking for more information, check out the following video for a complete run-down!
<div class="video-container">
    <iframe width="700" height="400" src="//www.youtube.com/embed/uH0bogZjuW0" frameborder="0" allowfullscreen></iframe>
</div>

[1]: https://dashboard.appboy.com/engagement/campaigns/ "Campaigns Page"
[2]: /assets/img/conversion_event_selection.png
[3]: /assets/img/campaign_stats_overview.png
[4]: /assets/img/multivariate_stat_bars.png
