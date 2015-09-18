---
title: Creating an Email Campaign
---
# Creating an Email Campaign

Email messages are great for delivering content to the user on their terms. They are also wonderful tools to re-engage users who may have even uninstalled your app! Customized and tailored email messages will enhance the user experience and help your user get the most value out of your app.

To see examples of email campaigns, check out our [Client Integration Gallery][9].

## Step 1: Create a New Campaign
From the Messaging Page, click "Create New Campaign."

![newcampaign][1]

## Step 2: Choose your Template and Compose your Email

Choose an existing email template from the drop-down menu highlighted below and then draft your message.

__Note__: If you've never created an email template before, see our section on ["Creating an Email Template"][2].

__Note__: An email template must be saved to send an email campaign. Be careful not to over-write existing templates that may be currently in use by other active campaigns.

![email1][3]

## Step 3: Schedule Your Messaging Campaign

![Schedule][4]

Message scheduling features include:

- Schedule messages to send immediately, at a specific time, using "Optimized Notification Timing."
  - __Optimized Notification Timing__: Appboy allows you to define a window during which you would like a user to receive a notification and Appboy will send it to each individual user at the time we determine they are most likely to engage. We make this calculation based upon a statistical analysis of the user's past interactions with the app.
  - ![Optimized Push Scheduling][8]
- Automatically schedule campaigns to send at a certain time with respect to the local time of each of your users.
- Messages can also be configured to recur on a daily, weekly (optionally on specific days), or monthly basis.
  - __Note:__ Unless you select the option to "Message Repeatedly" in step 3 of the campaign wizard, each user will only receive the contents of a campaign once, and only new users that meet the criteria will receive the campaign on subsequent deliveries.

## Step 4: Choose Conversion Event

Appboy allows you to track how often users perform specific actions (Conversion Events) after receiving a campaign. You can specify any of the following actions as a "Conversion Event":

- Opens App
- Makes Purchase
  - This can be a generic purchase or a specific item
- Performs specific custom event

You have the option of allowing a 3, 7, 14 or 30 day window during which it will be counted as a "conversion" if the user takes the specified action.  

![Conversion Event][15]

## Step 5: Choose your Target Segment

Next, you need to choose the target segment from the dropdown menu. You'll automatically be given a snapshot of what that segment population looks like right now, including how many users within that segment are reachable via email. Keep in mind that exact segment membership is always calculated just before the message is sent.

![Target Segment][5]

Optionally, you can also choose to limit delivery to a specified number of users within the segment, or allow users to recieve the same message twice upon a recurrence of the campaign as well.

## Step 6: Review and Deploy

The final page will give you a summary of the campaign you've just designed. Clicking "Start Campaign" will enable it for sending. Confirm all the relevant details and watch the data roll in!

![email2][6]

## Results Data

Appboy will show you the number of emails sent, opened, clicked through, and bounced for each campaign you deploy as shown below:

![Results][7]

## Campaign Video Overview

Need more assistance? Check out our video overview on creating a campaign!

<div class="video-container">
    <iframe width="700" height="400" src="//www.youtube.com/embed/nRndfzpazF8" frameborder="0" allowfullscreen></iframe>
</div>

[1]: /assets/img/newcampaign.png
[2]: /Quick_Wins/Creating_an_Email_Template "Creating an Email Template"
[3]: /assets/img/email1.png
[4]: /assets/img/schedule.png
[5]: /assets/img/targetsegment.png
[6]: /assets/img/confirm.png
[7]: /assets/img/emailresults.png
[8]: /assets/img/intelligent_delivery.png
[9]: https://academy.appboy.com/Best_Practices/Client_Integration_Gallery#emails
