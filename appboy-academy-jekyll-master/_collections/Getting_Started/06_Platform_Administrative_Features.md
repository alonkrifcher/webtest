---
title: Platform Administrative Features
---
# Platform Administrative Features

## App Group Management
App groups allow you to manage, segment, and communicate with multiple applications simlutaneously. Primarily, app groups are designed to house versions of the same application across multiple platforms. Many clients also use app groups to contain free and premium variants of their application on the same platform.

### Renaming or Deleting Your App Group
You may rename your app group on the ["App Settings"][19] page by clicking on the gear pictured below. The name of your app group controls the title that will be displayed for iOS push notifications.

![Rename App Group][18]

### Custom Event and Attribute Management

#### Blacklisting Events
If for any reason you want to stop tracking a specific custom event or attribute (e.g., accidental creation during testing, no longer useful), you may do so via our Custom Events and Attributes management pages under "Manage App Groups":

![Blacklist Attribute/Event][41]

Once a custom event or attribute is blacklisted:

- We will stop collecting any data regarding that event/attribute
- Existing data will not be wiped
- Blacklisted events/attributes will not show up in filters or graphs
- You should still remove the event/attribute from your app code during your next release
- You may re-enable any event or attribute at any time

#### Forcing Data Type Comparisons
Appboy automatically recognizes data types for attribute data that is sent to us. However, in the event you send us multiple data types for a single attribute accidentally, you can force the data type of any attribute or event using this menu:

![Force Data Type][42]

If you elect to force the data type for an attribute, any data that comes in that isn't the specified type will be ignored.

For more information on specific filter options exposed by different data type comparisons please see ["Configuring Reporting - Appboy Academy"][43]

## User Account Management

### Adding Users to Your Dashboard

Adding users to your dashboard is very simple: visit the Manage Users page under your username and click the Add New User button as indicated below:

![Add New User1][27]

![Add New User2][28]

### Deleting Users From Your Account

Deleting users is also accomplished via the Manage Users page. To delete a user click on the trash icon pictured below.

![Delete a User][34]

### User Permissions

#### Setting User Permissions

Appboy's user permission feature allows you to choose who can access your apps on the Appboy dashboard by assigning different users with either admin (designated by a yellow crown next to your username) or limited permission. The creator of the app group will automatically be granted admin access.

![User Permissions][30]

#### Editing User Permissions

Easily change a given user's access at any time.

![Edit User Permission][29]

Individual users can be granted different degrees of access on an app-by-app basis.

![Permissions App to App][31]

There is no limit on the number of users (either admins or limited users) you can have on your dashboard. However, if there is only one admin left in your app group, that individual will not be able to remove admin permission.

__Note__: The above permission features are only available to pro-plan clients. For basic-plan clients, all dashboard users of the app will have admin access.

## Company Wide Settings Management

### Configuring Reporting and Contact Options

#### Campaign Delivery Notifications & Time Zone Selection <a class="margin-fix" name="delivery-notifications"></a>

The [company settings][1] page is where you can configure who (if anyone) receives notifications about campaign deliveries sent through Appboy. You also can select the time-zone relative to which all your analytics will be displayed as pictured below:

![Notifications][4]

__Note__: This email address is not the only address that will receive weekly analytics reports.


##### Consequences of Switching your Time Zone

If you choose to switch your time zone, you may face a variety of consequences:

- While campaigns scheduled for specific times in specific locations (i.e. 9pm Eastern Time) will run properly on schedule until edited, both campaign analytics and future campaign schedules will be affected by the change.
- Any card scheduling that is not assigned to Local Time may be affected, with active cards potentially appearing as finished (or vice versa).
- Segmentation filters of the form "Has done X before/after `Date`" will have the time adjusted because the initial date will now be localized in Pacific Time.
- Retention analytics will not change automatically. Retention is calculated by timezone which, if changed, will default to Pacific Time going forward.


#### Weekly Analytics Reporting

Appboy optionally sends a weekly report via email to individuals you designate within your company every Monday at 5AM EST. Below you will see an example report:

![Example Weekly Report][23]

The custom events to be included in the weekly report are selected on the Custom Events Management Tab within the ["Manage App Group"][19] page of the dashboard. You may select up to 5 events to be included in your weekly report:

![Analytics Report Event Selection][22]

##### Receiving a Weekly Analytics Report

You can choose whether or not you wish to receive a weekly analytics report for your apps. First navigate to your account settings page, then check or uncheck the box as shown below:

![Analytics Report 1][35]

![Analytics Report 2][36]

__Note:__ Please ensure that emails from [support@appboy.com][24] are not being relegated to spam.

#### Additional Email Settings <a class="margin-fix" name="additional-email-settings"></a>

You also can access the [App Settings - Email Tab][8] to edit:

- Where user feedback notifications are directed
- The name which will be displayed by default on your emails
- The default reply-to address for your emails
- Your custom unsubscribe page
  - If you do not provide a custom unsubscribe page Appboy will handle unsubscribes automatically

![email settings][7]



[1]: https://dashboard.appboy.com/company_settings/company_settings/ "Company Settings Page"
[2]: /assets/img/add_new_user_company_settings.png "Add a New User"
[3]: /assets/img/subscribe_delete_company_settings.png "Delete an Existing User"
[4]: /assets/img/campaign_notifications.png
[5]: /assets/img/custom_event_report.png
[6]: https://dashboard.appboy.com/app_settings/app_settings/analytics_report/
[7]: /assets/img/email_settings_custom.png
[8]: https://dashboard.appboy.com/app_settings/app_settings/email/ "Email App Settings"
[18]: /assets/img/rename_app_group.png
[19]: https://dashboard.appboy.com/app_settings/app_settings/ "App Settings Page"
[22]: /assets/img/company_analytics_report.png
[23]: /assets/img/appboy_weekly_report_example.png
[24]: mailto:support@appboy.com
[27]: /assets/img/add_new_user1.png "Add a New User1"
[28]: /assets/img/add_new_user2.png "Add a New User2"
[29]: /assets/img/editing_user_permission.png "Edit User Permission"
[30]: /assets/img/user_accesses.png "User Permissions"
[31]: /assets/img/permission_diff_apps.png "Permissions App to App"
[33]: http://dashboard.appboy.com/company_settings/manage_users/ "Manage Users Page"
[34]: /assets/img/delete_user.png "Delete a User"
[35]: /assets/img/weekly_report1.png "Analytics Report 1"
[36]: /assets/img/weekly_report2.png "Analytics Report 2"
[37]: http://dashboard.appboy.com/company_settings/account_settings/ "Account Settings Page"
[41]: /assets/img/blacklist.png
[42]: /assets/img/force_data_type.png
[43]: /Deep_Dives/Configuring_Reporting
