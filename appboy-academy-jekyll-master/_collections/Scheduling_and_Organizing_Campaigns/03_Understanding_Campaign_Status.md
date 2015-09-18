---
title: Understanding Campaign Status
---
# Understanding Campaign Status

On your Appboy Dashboard, your campaigns are grouped by their status. Below are the different statuses your campaigns could have and descriptions on what they mean:

- __Inactive Multivariate Test - Winner Selection Needed__

	These [multivariate tests][1] have finished running - you can now view the results, select a winner and continue sending the winning variant.

- __Draft__

	These are saved campaigns that were never launched. Clicking on them allows you to continue editing the campaigns and begin sending.

- __Multivariate Testing in Progress__

	These multivariate tests are still running. The duration of a test is determined during the campaign's creation and Appboy recommends that you do not end tests before they are completed, as this may bias test results.

- __API Campaign__

	Campaigns sent via Appboy's [Messaging API][2] are listed here. Click on their names to view campaign results.

- __Active__

	Active campaigns are in the process of sending and fall under one of the following behaviors:

	- Scheduled to send once and has not yet begun sending
	- Scheduled to send once and is currently sending (local time zone and Intelligent Delivery campaigns send over the course of 24 hours)
	- Scheduled to send on a recurring schedule and has at least one occurrence that hasn't finished sending

- __Completed__

	Completed campaigns have finished sending and are not scheduled to send again in the future.

- __Inactive__

	Inactive campaigns have been paused. You can resume a paused campaign by clicking the gear icon by the campaign's name and selecting "Resume."

- __Archived__

	If you'd like to store some campiagns out of view, you can [archive them][3] by clicking on the gear icon. Drafts cannot be archived.


[1]: /Deep_Dives/Multivariate_Testing
[2]: https://documentation.appboy.com/REST_APIs/Messaging
[3]: /Quick_Wins/Archiving%20Campaigns
