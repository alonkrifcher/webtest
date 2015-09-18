---
title: Creating an In-App Message
---
# Creating an In-App Message

In-App messages are great for getting content to your user without interrupting their day via a push notification. Customized and tailored in-app messages will enhance the user experience and help your audience get the most value out of your app. They'll be more engaged than ever before.

To see examples of in-app messages, check out our [Client Integration Gallery][11].

## Step 1: Create New Campaign {#create-new-campaign-in-app}

From the Messaging Page, click "Create New Campaign."

![Newcampaign][1]

## Step 2: Compose In-App Message

When composing an in-app message, you’ll now see four tabs on the right hand side - click on them to customize different aspect of your message.

![InAppComposerSteps][2]

Edit all aspects of your message’s content and behavior. Insert text for the header, body and buttons, adding personalization and multiple languages if necessary. Specify how the message’s on-click behavior and deep link, as well as how the message can be dismissed.

![InAppComposer1][3]

## Step 3: Design In-App Message

Adjust all visual aspects of your message. Upload an image or badge, or pick a pre-designed badge icon. Change the colors of the header and body text, buttons and background by selecting from a palette or entering a hex, RGB or HSB code.

![InAppComposer2][4]

## Step 4: Configure Additional Settings

Add key/ value pairs to your message if needed.

![InAppComposer3][13]

## Step 5: Preview Message

Preview what your message will look like to a random user, a specific user or a customized user - the latter two are especially useful if your message contains personalization or multiple languages.

![InAppComposer4][14]

__Note__: Additional customization of the appearance of your In-App messages can be accomplished by your developers. See [our documentation on In-App Messages][5] for more details.

## Step 6: Schedule Your Messaging Campaign

![Schedule][6]

Message scheduling features include:

- Schedule messages to send immediately, at a specific time, using "Optimized Notification Timing".
  - __Optimized Notification Timing __: Appboy allows you to define a window during which you would like a user to receive a notification and Appboy will send it to each individual user at the time we determine they are most likely to engage. We make this calculation based upon a statistical analysis of the user's past interactions with the app.
  - ![Optimized Push Scheduling][10]
- Automatically schedule campaigns to send at a certain time with respect to the local time of each of your users.
- Messages can also be configured to recur on a daily, weekly (optionally on specific days), or monthly basis.
  - __Note:__ Unless you check the box titled "Allow users to become re-eligible to receive campaign" under the __Schedule__ portion of the campaign wizard, each user will only receive the contents of a campaign once, and only new users that meet the criteria will receive the campaign on subsequent deliveries.

## Step 7: Choose Conversion Event

Appboy allows you to track how often users perform specific actions (Conversion Events) after receiving a campaign. You can specify any of the following actions as a "Conversion Event":

- Opens App
- Makes Purchase
  - This can be a generic purchase or a specific item
- Performs specific custom event

You have the option of allowing a 3, 7, 14 or 30 day window during which it will be counted as a "conversion" if the user takes the specified action.

![Conversion Event][12]

## Step 8: Choose Target Segment

Next, you need to choose the target segment from the dropdown menu. You'll automatically be given a snapshot of what that segment population looks like right now. Keep in mind that exact segment membership is always calculated just before the message is sent.

![Target Segment][7]

__Note__: Unless you check the "Message Repeatedly" Your users will only recieve each message once. That way only new members of the segment upon each recurrence of a campaign will receive it.

## Step 9: Review and Deploy

The final page will give you a summary of the campaign you've just designed. Clicking "Start Campaign" will enable it to send. Confirm all the relevant details and watch the data roll in!

![confirm][8]

## Step 10: Analyze Results Data

Appboy will show you the number of messages sent and opened over time for each push campaign you deploy as shown below:

![Results][9]

## Campaign Video Overview {#campaign-video-overview-in-app}

Need more assistance? Check out our video overview on creating a campaign!
<div class="video-container">
    <iframe width="700" height="400" src="//www.youtube.com/embed/nwp7prafy3Y" frameborder="0" allowfullscreen></iframe>
</div>

[1]: /assets/img/newcampaign.png
[2]: /assets/img/InAppComposerSteps.png
[3]: /assets/img/InAppComposer1.png
[4]: /assets/img/InAppComposer2.png
[5]: https://documentation.appboy.com/Enabling_Message_Channels/In-App_Messages/iOS
[6]: /assets/img/schedule.png
[7]: /assets/img/targetsegment.png
[8]: /assets/img/confirm.png
[9]: /assets/img/results.png
[10]: /assets/img/intelligent_delivery.png
[11]: https://academy.appboy.com/Best_Practices/Client_Integration_Gallery#in-app
[12]: /assets/img/conversion_event_selection.png
[13]: /assets/img/InAppComposer3.png
[14]: /assets/img/InAppComposer4.png
