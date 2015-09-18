---
title: Email
---
# Email

Email is a tried and tested approach for communicating with your users. Email is extremely adaptable and can reach users across a variety of platforms -- mobile or otherwise -- with dynamic HTML content.

## Use Cases {#email-use-cases}

- Because email can reach users outside of the app, including those who have not installed the app, emails are well-suited for re-engagement.
- Email campaigns are also useful for onboarding new users and encouraging them to turn on push notifications or share the app via social networks.
- For content that requires more than a simple push or slide, emails allow for rich and dynamic HTML messages.
- Using email allows for the placement of multimedia content like videos and images that engage users.
- Emails are convenient for sending monthly/weekly newsletters to maintain user engagement.
- Transactional emails notify users of recent purchases and deliver important product and shipping information.

## IP Warming

### What is Email IP Warming?

IP warming is designed to help you establish a positive reputation with ISPs (Internet Service Providers) so that your messages are not filtered as spam. If you send emails from a new or "cold” IP address, ISPs will closely monitor the amount you are sending and how often your users are labeling your email as spam. They use that data to create an email reputation that will eventually determine whether or not your emails are filtered to spam automatically.

Abrupt, high volume email campaigns are regarded with the most skepticism by ISPs. Therefore, you should begin by sending small amounts of email and scale gradually towards the volume of email you ultimately intend to send. Regardless of volume, we suggest warming up your IP to be safe.

Warming up your IP, however, doesn't guarantee that your emails won't be filtered as spam. It is also important that you create engaging content and send email on a consistent basis to users who want to receive it.

Start out by deciding on a desired segment and total volume to email. You can now email this segment with a maximum of 10,000 recipients, preferably spread out over the course of a few days. Be sure to carefully monitor the bounce rates of your list. If any list exceeds 10%, re-evaluate how your emails are worded and make sure they do not fall into any spam-traps.

### IP Warming Schedules

__Note:__ Appboy offers automatic IP warming for customers using our services. Appboy will send the appropriate amount of email via your dedicated IPs each day during the warmup process (42 days) while letting any email in excess of that be delivered by a pool of shared IPs until your IPs are able to accommodate your full email volume.

```
/// Safe Formula ///

Maximum Single Send Email Volume / 30 = Daily Volume for first day

/// Accelerated Formula ///

Maximum Single Send Email Volume / 15 = Daily Volume for first day
```

You should be able to send more email each day safely. We suggest increasing the amount of email you send by about 30% daily.

### After Warming:

- Now that you have warmed your IP, it has to be maintained. In terms of volume, you can now safely double your daily mail volume every week. While you can email your entire list all at once, we recommend spreading out your emails throughout the week. As opposed to one-day mail spikes, consistency increases the likelihood of messages being sent and not marked as spam.
- As most systems only store data for 30 days, do not go more than a month without sending any mail, or you may need to warm your IP again.

### Limiting Users

Appboy's built-in user limiting feature serves as an useful tool to help you with warming your IP address. After you choose your desired messaging segments during campaign creation (Step 3: Target Users), select the 'Advanced Targeting Options' dropdown in order to limit your users. As your warming schedule continues, you can gradually raise this limit to increase the volume of email you send.

![Limit Users][18]

### Subdomain Segmentation

Many ISPs and email access providers no longer only filter by IP address reputation. These filtering technologies now also account for domain-based reputation.  This means that filters will look at all data associated with the sender's domain and not just single out the IP address. For this reason, in addition to warming up your email IP we also recommend having separate domains or subdomains for marketing, transactional, and corporate mail. We recommend segmenting your domains such that corporate mail is sent through your top level domain, and marketing and transactional mail are sent through different domains or subdomains.

__Note__: Subdomain segmentation is especially important for large-volume senders. These senders should work with their Customer Success Manager while setting up their account to ensure they are adhering to this practice.

## Duplicate Emails

Appboy automatically checks for and removes duplicate email addresses when an email campaign is sent. Even if multiple user profiles share a common email address, that address will not receive multiple messages.

## Best Practices {#email-best-practices}

### Making Your Email Effective

#### Technical Reminders

- If you would like one email template for both mobile and desktop, keep the width below 500 pixels.
- Try to keep the size of the email under 25kb for just text, or 60kb with images.
- Use inline style sheets to format your email as CSS or it will not be recognized by Email Service Providers (ESPs).
- Always use alt-tags for images in case they don't appear in the email (blocked, fail to load, etc.)
- Don't set heights and widths for images as this will cause unnecessary white space in a degraded email.
- Div tags should not be used as most email clients do not support their use. Instead use nested tables.
- Don’t use Javascript because it does not work with any ESP.
- Appboy improves load times by using a global CDN to host all email images.
- The following HTML tags are disallowed as they may potentially let malicious code run in the browser. As a result, end user mail clients often filter emails which contain them.
  - `<script>`
  - `<applet>`
  - `<embed>`
  - `<iframe>`
  - `<object>`

#### General Things to Keep in Mind

- Remind users in a promotional email to drag your content into the "Primary" Gmail tab so your emails don't get lost.
- Campaign stats and conversion events will update as soon as users open their emails. Wait several hours to see more representative results.
  - Click-through statistics may lag behind other campaign stats.
  - ISPs deliver email in small batches to protect users from spam. If you are sending a high volume email campaign for the first time, it may take a day or more to deliver your email to 100% of it’s recipients.

#### Address Styling

- The **Subject Line** is one of the first things that recipients will see upon receiving your message.
  - Keeping it to 6 to 10 words will yield the highest open rates.
  - There are also different approaches to creating a good subject line, ranging from asking a question to pique the reader’s interest or being more direct, to personalizing it as to engage your clientele.
  - Don’t just stick with one subject line, try new ones out and gauge their effectiveness.
  - Subject line should be no more than 35 characters to display appropriately on mobile.


- The **“From Field”** should clearly show who the sender is.
  - Try not to use an unknown person’s name or an uncommon abbreviation, instead try using something recognizable like the company name.
  - If using a person’s name suits your company methods of personalizing email, stay consistent and retain the same “From Name” to develop a relationship with the recipient.
  -  “From” name should be no more than 25 characters to display appropriately on mobile.

#### Body Styling

- Many people use **Email Previewing**, either in Gmail or Outlook.
  - The body preview viewing area allows for around 300 pixels of content to be shown.
  - It is recommended that the email communicate the main point of the message efficiently within that space, engaging the reader’s interest to encourage opens.

- **No-reply** email addresses are generally not recommended for multiple reasons as they disengage your readers.
  - Many recipients reply to the email to unsubscribe, so if they are not allowed to do that, the next course of action is more often than not marking the email as spam.
  - Getting out of office replies can actually provide valuable information, increasing open rates and decreasing spam reports (by removing those who don’t want to be emailed).
  - On a personal level, a no-reply can appear impersonal, lazy and arrogant to recipients (suggesting “You aren’t worth my time”), and may turn them off from receiving further email from your company.

- **Call to actions** come into play once readers have opened your email.
  - Point your readers in the right direction, whether you want them to subscribe, purchase a product or visit your website.
  - Use strong words so that the reader knows exactly what you are asking of them, but make sure it reflects your company’s brand voice and that every call to action exhibits some sort of value to the consumer.
  - Pre-header should be no more than 85 characters and have some sort of descriptive call to action that supports the subject line.

- **Email and landing sites** to which you direct your users to should be mobile optimized:
  - No interstitial boxes
  - Large form-fields
  - Easy navigation
  - Large text
  - "Finger Friendly"
  - Generous white space
  - Short concise body copy
  - Clear calls to action

### Deep Linking

A high percentage of emails are read on mobile devices. Utilizing deep linking is a great practice for engaging with these mobile email recipients. With push notifications and in-app messages, a deep link takes the user directly to a specified destination within an app. Email, on the other hand, gives no way of knowing whether recipients have the app installed. As such, providing a deep link to the app could link to an error message for these recipients who do not have the app.

We recommend using [Goo.gl][37] to solve this issue for emails. This service supports both iOS and Android, and allows a default destination for recipients who have the app installed as well as a back-up destination (such as the App Store) for recipients who do not.  Goo.gl also provides the additional benifit of being indexed by Google for search results on mobile devices. This implementation of deep linking in your emails can drive both user engagement and new app downloads.  


### Sunset Policies {#email-sunset-policies}

While you may be tempted to send campaigns to as many users as you can, there are situations where it's actually wise to discontinue messages to unengaged users.  For instance, in the case of emails, ISP and mailbox providers may view your messages as unimportant when users mark them as spam or ignore them.  Over time, ISP and mailbox filters might automatically sort your emails into a spam or low priority folder for all recipients, even engaged ones.  To prevent this from happening, you need to create a sunset policy that ensures your emails aren't delivered to inactive recipients. Appboy's segmentation filters help prevent your messaging from appearing spammy or irrelevant by letting you easily implement sunset policies for emails, pushes, in-app notifications, and News Feed cards.

Here are some things to consider when you create a sunset policy:

- What counts as an "unengaged" user? Is engagement defined by clicks and opens, purchases, app usage, or a combination of these behaviors?
- How long does the lapse in engagement need to be for you to stop sending messages?
- Will you deliver any special campaigns to users before excluding them from your segments?
- Which messaging channels will your sunset policy apply to?

To incorporate sunset policies into your campaigns, [create segments][19] that automatically exclude users who have marked your emails as spam or have not interacted with a your messages for a certain period of time.  To set up these segments, choose the "Has Marked You As Spam" and/ or "Last Engaged With Message" filters.  When you apply the "Last Engaged With Message" filter, you can specify the type of messaging (push, email, or in-app notification) that the user has or has not interacted with, as well as the number of days it has been since the user last interacted. After you create a segment, you can then choose to target this segment with any messaging channel.

![Sunset Policy][20]

While Appboy's platform automatically stops sending emails to users who have marked you as spam, the "Has Marked You As Spam" filter allows you to also send these users targeted push messages, in-app notifications, and News Feed cards.  This filter is useful for [retargeting campaigns][21] - for instance, you can send unengaged users messages or News Feed updates that remind them of the features and deals that they are missing out on when they don't open your emails.

Sunset policies can be especially helpful in email campaigns that target lapsing users.  While these campaigns focus on segments that have not interacted with your app for a period of time, they can put the deliverability of your emails at risk if they repeatedly include unengaged recipients. Sunset policies allow you to target lapsing users without landing in the spam folder.

### Managing Email Subscriptions

Make sure you are familiar with the tools that Appboy provides for [managing users' email subscriptions and targeting campaigns at users with particular subscription states][22]. These tools are critical for compliance with [anti-spam laws][23].

### Email Validation

#### Adjusting Email Addresses

Appboy automatically adjusts inputted email addresses in the following ways:

- Switches any '.con' suffix to '.com'
- Removes dots on either side of the '@' symbol
- Trims any whitespace

#### Validation

Email addresses targeted via the Appboy servers must be validated per the [RFC 2822][24] standards.  If an email is bounced, Appboy automatically unsubscribes the corresponding email address but does not remove the email address from user profiles.

### Implementing 'ALT' Tags

Since spam filters watch for both an HTML and a plain text version of a message, utilizing plain text alternatives is a great way to lower your spam score. In addition, ALT texts can serve to complement and in some cases stand in lieu of images included in your email body that may have been filtered out by a user's email provider.

## Tips for Different Types of Emails

### Onboarding

- Provide tips to help users get started.
- Showcase only the most essential features - too much information can be overwhelming and potentially confusing if the user is still unfamiliar with your app.
- Provide links to your documentation and let users know how they can get support.
- For more tips, check out our page on [User Onboarding][25].
- Try to always send a welcome email after a user signs up. Below is an example from LivingSocial that contains simple but clear calls to action and lets users know about a deal:

![LivingSocial email][26]

### Sale and Promotional

- Within seconds of opening your email, users should know the value of the promotion (what the discounts are and what is on sale) and how long the offer lasts.
- Provide graphics to illustrate any products that you're promoting.
- Keep your copy concise and simple so that it doesn't clutter your email and distract users from the essential content.
- Make your call to action clear and give recipients an easy way to immediately participate in the promotion.
- If you're recommending certain products, try to present them as curated, personal suggestions that the user may like.
- Use social proof to promote your products. Show users any items their friends have liked or purchased.
- If you're promoting a limited time offer, be sure to let users know! Ideeli does a great job at conveying urgency in this email:

![Ideeli email][27]

### Transactional
- If the user just made an in-app purchase, you should thank them and provide any tips that can help them make the most of that purchase.
- If the user just made an out-of-app purchase, provide them with shipping confirmation and a way to ask questions about their shipment.
- Asking users to give feedback after a purchase is a good way to solicit input without being pushy. Because you've just provided users with a service, they may be more likely to share their thoughts. Here's an example of an email from Restaurant.com:

![Restaurant email][28]

### Retention

- Keep your tone friendly.
- This may be your last chance to win users back, so be sure to include content that showcases your app's value.
- If the user has been relatively inactive since installing, offer helpful hints for getting started.
- For social apps, keep users updated on their friends' activities.
- Offer discounts or any other incentives that may bring users back.
- Try to make your message personal to show the user that he is still valued. Rue La La, for instance, frames its retention email as a note from its CEO:

![Ruelala email][29]

### Social

- Email can help you build up a social fanbase by directing recipients toward your Facebook, Twitter, Instagram, Pinterest, Youtube channel, etc.
- Include links to your social media accounts within the email to make it easy for users to connect.
- Make it fun! Try running a photo contest, promoting a hashtag, or having a giveaway. Below is an email from Hailo that offers a reward for participating in photo challenges:

![Hailo social email][30]

### Updates

- Send updates of new or improved features to all of your users.
- Updating users on new features is also a re-engagement tool because it reminds lapsing users of your app's value.
- If your feature requires an explanation or demo, include a link in the message. Here's an example by Allrecipes.com:

![Allrecipes_email][31]

## Email Reporting

The Appboy SDK provides you with a detailed report of each of your email campaigns. Navigate to the 'Campaigns' tab on your dashboard and click on the 'Details' tab of your desired campaign. On this page, you will be able to comprehensively view and analyze the success of your campaign in an organized format.

![Campaign Data][33]

![Campaign Data][34]

![Campaign Data][35]

| Statistic | Description |
| --------- | --- |
| Bounces | The emails sent to these users were undeliverable. These users have been automatically unsubscribed from all future emails. |
| Emailable | Users who have an email address on record and have either opted in or not explicitly opted out of email messages. |
| Clicks | A campaign's total number of unique successfully delivered emails that recorded a click. |
| Click Rate| The percentage of successfully delivered emails within a campaign that recorded a click. |
| Opens | A campaign's total number of unique successfully delivered emails that recorded an open. |
| Open Rate | The percentage of successfully delivered emails within a campaign that recorded an open. |
| Spam | An email reported by your user as spam. The ISP notifies our email delivery system which associates the spam report with your campaign. |
| Unsubscribe | The total number of users who clicked the unsubscribe link in an email campaign. |

[18]: /assets/img/limit_email.png
[19]: /Quick_Wins/Creating_a_Segment
[20]: /assets/img/Email_Sunset_Policies.png
[21]: /Deep_Dives/Retargeting_Campaigns
[22]: /Deep_Dives/Managing_User_Subscriptions
[23]: /Best_Practices/Spam_Regulations
[24]: http://tools.ietf.org/html/rfc2822
[25]: /Best_Practices/User_Onboarding
[26]: /assets/img/Livingsocial_email.png
[27]: /assets/img/Ideeli_email.png
[28]: /assets/img/Restaurant_email.png
[29]: /assets/img/Ruelala_email.png
[30]: /assets/img/Hailo_social_email.png
[31]: /assets/img/Allrecipes_email.png
[33]: /assets/img/campaign_data_0.png
[34]: /assets/img/campaign_data_1.png
[35]: /assets/img/campaign_data_2.png
[36]: #deep-linking
[37]: http://googlewebmastercentral.blogspot.com/2015/05/app-deep-linking-with-googl.html
