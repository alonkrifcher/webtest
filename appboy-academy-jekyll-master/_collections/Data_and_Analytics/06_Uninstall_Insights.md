---
title: Uninstall Insights
---
# Uninstal Insights

Appboy's Uninstall Insights provides daily app-level uninstall statistics in a time series graph on the App Usage page. Showing aggregate uninstalls over time can help you visualize trends and anomalies so that you can monitor app installs with ease. Appboy automatically collects a base level of uninstall information from your regular push campaigns. However, because the frequency that different users receive push campaigns may vary, Appboy offers Uninstall Insights to provide a more accurate snapshot of uninstall activity among your users. You must opt-in to Uninstall Insights on the dashboard; this feature is currently available for apps on iOS, Android, and Fire OS.

## Implementation

You can enable Uninstall Insights in the App Settings section of the "Manage App Group" page. For each app you are interested in tracking, check the box in the uninstall tracking section.

![Uninstall Tracking Checkbox][1]

When uninstall tracking is enabled for an app, background push messages will be sent nightly to users who have not recorded a session or received a push in 24 hours. If you are interested in filtering Appboy background push, you can use the utility methods that were released in the [iOS SDK version 2.13][iOS] and [Android SDK version 1.8.2][droid]; documentation for the methods can be found [here][iOS docs], and [here][droid docs], respectively. When Appboy detects an uninstall, whether from Uninstall Insights or normal push campaign delivery, we will record the best estimated time of the uninstall on the user. This time is stored in the user profile as a standard attribute.

![Uninstall Attribute][4]

This time can be used to define a segment of users for win-back campaigns. Using the Uninstalled filter on the Segments page, you can select users who uninstalled within a time range. Since determining the exact time of an uninstall is difficult, we recommend that uninstall filters have wider time ranges to make sure everyone who uninstalls falls into the segment at some point.

![Uninstall Segment][5]

## Analysis

Daily statistics on uninstalls are found on the App Usage page. The visualization can be broken down by segment, similar to other statistics Appboy provides. View statistics for usage analytics, and then select Uninstalls from the dropdown to display the graph. The graph can then be broken down by segment, and by app, using the dropdowns. Note that apps without uninstall tracking enabled will report uninstalls from only a subset of their users (those who were targeted with push notifications), so daily uninstall totals may be higher than what is shown.

![Uninstall Graph Selection][2]

![Uninstall Graph][3]

Uninstalls can be triggered by a variety of issues. With Uninstall Insights you should have the tools to make informed decisions about your app's health, and identify key segments for win-back campaigns. For more on using Uninstall Insights, see [this blog post][blog post].

[1]: /assets/img/Uninstall_insights_checkbox.png "Uninstall Tracking Checkbox"
[2]: /assets/img/Uninstall_insights_graph_selection.png "Uninstall Graph Selection"
[3]: /assets/img/Uninstall_insights_segment_graph.png "Uninstall Graph"
[4]: /assets/img/Uninstall_insights_attribute.png "Uninstall Attribute"
[5]: /assets/img/Uninstall_insights_segment.png "Uninstall Segment"
[blog post]: https://blog.appboy.com/2015/08/uninstall-tracking-an-industry-look-at-its-strengths-and-limitations/
[iOS]: https://github.com/Appboy/appboy-ios-sdk/blob/master/CHANGELOG.md "iOS Changelog"
[droid]: https://github.com/Appboy/appboy-android-sdk/blob/master/CHANGELOG.md "Android Changelog"
[iOS docs]: https://documentation.appboy.com/User_Data_Collection/Uninstall_Insights/iOS "iOS"
[droid docs]: https://documentation.appboy.com/User_Data_Collection/Uninstall_Insights/Android_and_Fire_OS "Android and Fire OS"