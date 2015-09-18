---
title: Managing User Subscriptions
---
# Managing User Subscriptions
{% raw %}

## Subscription States {#subscription-states}
Appboy has a three-level subscription status for email and push messages:

| State | Definition |
| ----- | ---------- |
| Opted-in | User has explicitly confirmed he/she wants to receive messages. |
| Subscribed | User has neither unsubscribed, nor explicitly opted-in to receive messages. This is the default for new users. |
| Unsubscribed | User has explicitly unsubscribed from messages. |

## Changing Subscriptions {#changing-subscriptions}

### Changing Email Subscriptions {#changing-email-subscriptions}
In most cases, your users will manage their email subscription through subscription links that are included in the emails they receive.

Appboy automatically inserts a footer with an unsubscribe link at the bottom of every email you send, in accordance with the [CAN-SPAM Act of 2003][8]. When users click on the unsubscribe url in this footer, they are unsubscribed and taken to a landing page that confirms the change to their subscription.

#### Custom Footers {#custom-unsubscribe}
While Appboy automatically inserts a footer with an unsubscribe url at the bottom of each email you send, you may optionally suppress this behavior by clicking the "Suppress Footer" checkbox pictured below:

![Suppress Footer Image][9]

If you do so, we recommend including your own custom footer in the body of your email. To do so, a footer tag should be inserted just before the closing `</html>` tag. The following attributes can be used to insert subscription urls into your custom footer:

| Attribute | Tag |
| --------- | --- |
| User's Email Address | {{${email_address}}} |
| User's Custom Unsubscribe URL | {{${set_user_to_unsubscribed_url}}} |
| User's Custom Opt In URL | {{${set_user_to_opted_in_url}}} |
| User's Custom Subscribe URL | {{${set_user_to_subscribed_url}}} |

As a best practice, Appboy recommends including both an unsubscribe link (i.e. {{${set_user_to_unsubscribed_url}}} ) and an opt in link (i.e. {{${set_user_to_opted_in_url}}} ) in your custom footer. This way users will be able to both unsubscribe or opt in and you can passively collect opt in data for a portion of your users.

Remember that compliance with the [CAN-SPAM Act of 2003][8] requires you to include a mailing address for your company and an unsubscribe link in your emails. If you suppress Appboy's default footer, it is your responsibility to make sure that your custom footer meets those requirements.

#### Custom Unsubscribe Landing Page
When a user clicks on an unsubscribe url in an email, they are taken to a default landing page that confirms the change to their subscription.

Optionally, you may provide HTML for your own custom landing page, which users will be directed to (instead of the default page) upon unsubscribing. This feature is available on the ["App Settings - Email"][10] page. We recommend including a resubscribe link (i.e. {{${set_user_to_subscribed_url}}} ) on this page so that users have the option to resubscribe in case they unsubscribed by accident.

![Custom ReSubscribe][11]

### Changing Push Subscriptions {#changing-push-subscriptions}
Appboy's Mobile SDKs provide methods for changing a user's push message subscription. Please refer to Appboy's technical documentation for your mobile platform for information on configuring these methods:

- [iOS][12]
- [Android and FireOS][13]
- [Windows Universal][14]
- [Windows Phone 8][15]

### Manually Changing User Subscriptions {#manually-changing-subscriptions}
You can manually change the subscription status for any user in his/her individual user profile. You can find individual user profiles by searching for a user's ID or email address on the "User Search" page. Under the user profile's "Engagement" tab, you'll find a user's current push and email subscription status. Clicking on the "Unsubscribed", "Subscribed", or "Opted In" buttons will allow you to change that user's subscription status. If available, the user profile also displays a timestamp for when the user's subscription was last changed.

![User Profile Subscription UI][16]

## Subscriptions and Campaign Targeting {#subscriptions-and-campaign-targeting}
Campaigns with push or email messages are targeted at users who are subscribed or opted-in by default. You can change this targeting preference when editing a campaign by going to the "Target Users" step and clicking "Advanced Options."

Appboy supports three targeting states:

- Users who are subscribed or opted-in (default).
- Only users who are opted-in.
- All users, including those who have unsubscribed.

Please note that it is your responsibility to comply with any applicable [spam laws][8] when using these targeting settings.

![Campaign Targeting Subscription UI][17]

## Segmenting by User Subscriptions {#segmenting-by-user-subscriptions}
The "Email Subscription Status" and "Push Subscription Status" filters allow you to segment your users by their subscription status.

This can be useful - for example, if you want to target users who have neither opted in nor out and encourage them to explicitly opt-in to email or push. In that case, you would create a segment with a filter for "Email/Push Subscription Status is Subscribed" and campaigns to this segment will go to users who are subscribed but not opted in.

![Subscription Filter][18]
{% endraw %}

[1]: #subscription-states
[2]: #changing-subscriptions
[3]: #changing-email-subscriptions
[4]: #changing-push-subscriptions
[5]: #manually-changing-subscriptions
[6]: #subscriptions-and-campaign-targeting
[7]: #segmenting-by-user-subscriptions
[8]: /Best_Practices/Spam_Regulations
[9]: /assets/img/suppress_footer.png
[10]: https://dashboard.appboy.com/app_settings/app_settings/email/ "Email App Settings"
[11]: /assets/img/custom_resubscribe.png
[12]: https://documentation.appboy.com/User_Data_Collection/Attribute_Tracking/iOS#user-subscriptions
[13]: https://documentation.appboy.com/User_Data_Collection/Attribute_Tracking/Android_and_FireOS#user-subscriptions
[14]: https://documentation.appboy.com/User_Data_Collection/Attribute_Tracking/Windows/Universal#subscription-status
[15]: https://documentation.appboy.com/User_Data_Collection/Attribute_Tracking/Windows/Phone8#subscription-status
[16]: /assets/img/user-profile-subscription-ui.png
[17]: /assets/img/campaign-targeting-subscription-ui.png
[18]: /assets/img/not_optin.png
