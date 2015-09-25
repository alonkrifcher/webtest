---
title: Sending Test Messages
---
# Sending Test Messages

Before sending out a messaging campaign to your users, you may want to test it to make sure it looks right and operates in the intended manner. Creating and sending test messages to select devices or members of your team is very simple using the tools in the dashboard.

## Creating a Designated Test Segment

Once you set up a test segment, you can utilize it to test __any__ of our messaging channels. The process is very simple and if configured properly will only need to be done once.

Navigate to the "Segments" page in the dashboard and create a new segment. In the dropdown menu under "Add Filter", you'll find our testing filters at the bottom of the list.

![Testing Filters][1]

Our testing filters allow you to select users with specific email addresses or external [user IDs][2].

![Testing Filter Options][3]

These filters have three options:

1. __"Equals"__ - This will look for an exact match of the email or user ID that you provide. Use this if you only want to send the test campaigns to devices associated with a single email or user ID.
2. __"Does Not Equal"__ - Use this if you want to exclude a particular email  or user ID from test campaigns.
3. __"Matches"__ - This will find users that have email addresses or user IDs that match part of the search term you provide. You could use this to find only the users that have an "@yourcompany.com" address, allowing you to send messages to everyone on your team.

These filters can also be used in conjunction with each other to narrow down your list of test users. For example, the test segment could include an email address filter that `matches` "@appboy.com" and another filter that `does not equal` "sales@appboy.com". You can also select multiple specific emails by using the   `matches` option and separating the email addresses with a "\|" character (e.g. `matches` "email1@appboy.com\|email2@appboy.com").

After adding the testing filters to your test segment, you can verify that you've selected only the users you intended by clicking "Preview" at the top of the segment editor or by exporting that segment's user data to CSV by clicking on the gear icon in the right hand corner of the editor and selecting "CSV Export All User Data" from the dropdown menu.

![Verify Test Segment][4]

__Note__: Exporting the segment's User Data to CSV will give you the most accurate picture of who falls under that segment. The "Preview" tab is only a sample of the users in the segment - [see more details about this in our FAQ][7] - and therefore may appear to have not selected all intended members.

Once you've confirmed that you're only targeting the users that you want to receive the test message, you can either select this segment in an existing campaign that you want to test or click the "Start Campaign" button in the segment menu.

## Sending a Test Push Notification or In-App Messages

In order to send test push notifications and/or in-app messages, you need to target your previously created test segment. Begin by creating your campaign and following the usual steps. When you reach the 'Target Users' section, select your test segment as shown below.

![Test Segment][8]

Finish confirming your campaign and launch it to test your push notification and in-app messages.

__Note:__ Be sure to check the box titled "Allow users to become re-eligible to receive campaign" under the __Schedule__ portion of the campaign wizard if you intend to use a single campaign to send a test message to yourself more than once.

__Note:__ If you're only testing email messages, you do not have to set up a test segment. In the first step of the campaign wizard where you compose your campaign's email message, there is a "Send Test" button in the bottom left corner.

## Sending a Test Email Message

![Send Test Button][5]

Clicking on this button causes a pop-up window to appear where you can enter the email address you would like the test email to be sent to. Click "Send" and your test email will be delivered shortly.

![Send Test Pop-Up][6]


[1]: /assets/img/testmessages1.png
[2]: /User_Data_Collection/Setting_User_IDs/iOS
[3]: /assets/img/testmessages2.png
[4]: /assets/img/testmessages3.png
[5]: /assets/img/testmessages4.png
[6]: /assets/img/testmessages5.png
[7]: /FAQs/#one-user-segment
[8]: /assets/img/test_segment.png
