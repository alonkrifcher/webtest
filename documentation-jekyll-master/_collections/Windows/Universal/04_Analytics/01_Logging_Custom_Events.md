---
title: Logging Custom Events
platform: Windows
subplatform: Universal
---
## Logging Custom Events

You can record custom events in Appboy to learn more about your app's usage patterns and to segment your users by their actions on the dashboard.

Before implementation, be sure to review examples of the segmentation options afforded by Custom Events vs. Custom Attributes vs Purchase Events in our [Best Practices section](/User_Data_Collection/Best_Practices "Best Practices & Segmentation").

__Time Estimate: 5 Minutes__

All events are be logged by using the `EventLogger`, which is a property exposed in IAppboy. To obtain a reference to the `EventLogger`, call `Appboy.SharedInstance.EventLogger`. You can use the following methods to track important user actions and custom events:

```csharp
bool LogCustomEvent(string YOUR_EVENT_NAME)
bool LogFeedbackDisplayed()
bool LogFeedDisplayed()
bool LogFeedCardImpression(string cardId)
bool LogFeedCardClick(string cardId)
bool LogSlideupShown()
bool LogSlideupClicked()
```

**Implementation Example**

See the following [`MiscPage.xaml.cs` file in our Windows Sample Application][1]

[1]: https://github.com/Appboy/appboy-windows-samples/blob/master/Universal/AppboyTestApps.Universal.Shared/Pages/MiscPage.xaml.cs "Windows Universal 8 Sample Implementation"
