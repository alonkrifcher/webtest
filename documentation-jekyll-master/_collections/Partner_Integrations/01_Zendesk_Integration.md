---
title: Zendesk Integration
---
# Zendesk Integration

Follow the instructions on this page to get started with your Zendesk integration.

__Estimated Time: 10 Minutes__

## Obtaining Zendesk Credentials

__Note:__ These instructions assume that you have already created a Zendesk account. If you have not, follow the instructions [here][3].

#### Step 1:
Log in to Zendesk [here][4].

#### Step 2:
Navigate to the settings page on the bottom of the Zendesk dashboard as shown below:

![Zendesk Settings Page][5]

#### Step 3:
On your settings page, scroll down the dashboard on the left and click the 'API' label under the 'Channels' header. Once on this page, check the 'Enabled' box under 'Settings' to reveal the necessary information for your integration.

![Zendesk Token][6]

## Linking Appboy to Zendesk

If you have _not_ already registered, create an Appboy account on [appboy.com](https://dashboard.appboy.com/developers/sign_up). Then follow the [app group configuration](/App_Group_Configuration) documentation to setup your first app.

#### Step 1:
Navigate to the '3rd Party Integrations' page on the Appboy Dashboard under the 'APP SETTINGS' section and click the 'Feedback' tab.

![Feedback Settings][7]

#### Step 2:
On the Feedback Integration page, input your Zendesk URL, email address and Zendesk API in the designated fields.

![Linking Appboy and Zendesk][8]

## Integration Complete

Zendesk should now be integrated into your Appboy account. To confirm a successful integration you should see new user feeback data tracked as tickets on the Zendesk dashboard.

### Sync Direction

Currently, Appboy only supports single-way ticket creation through Zendesk. This mean that comments or changes to Zendesk changes will __not__ be reflected on the Appboy feedback page.

### What Appboy Sends to Zendesk

Once Zendesk is fully integrated into your Appboy dashboard, your Zendesk account will automatically receive any user-submitted feedback/issues that are sent __after__ that point. This means that pre-existing issues must be entered into your Zendesk dashboard manually.

![Succesful Zendesk Integration][10]

__Note:__ Appboy profile fields are included in the body of the ticket.

[3]: https://www.zendesk.com/register#company
[4]: https://www.zendesk.com
[5]: /assets/img/zendesk_settings.png "Zendesk Settings"
[6]: /assets/img/zendesk_token.png "Zendesk Token"
[7]: /assets/img/feedback_first_step.png "Zendesk Step One"
[8]: /assets/img/zendesk_second_step.png "Zendesk Step Two"
[10]: /assets/img/successful_zendesk.png "Setup Complete"
