---
title: Customer Feedback
platform: Windows
subplatform: Universal
---
# Customer Feedback

The Appboy feedback form allows users to submit feedback about your app that is immediately sent to your company's dashboard.

__Time Estimate: 10 Minutes__

To use our UI Library implementation of a Feedback form, simply add the following in the root tag of your page:

```csharp
xmlns:appboy="clr-namespace:AppboyUI.Phone.Controls;assembly=AppboyUI.Phone"
```

In the page xaml put:

```csharp
<appboy:Feedback OnCancel="Feedback_OnCancel" AfterSubmit="Feedback_AfterSubmit"/>\
```

## Manual Feedback Collection
The following method will allow you to pass Feedback to Appboy from a form or field within your app. This is perfect for passing feedback from an existing UI element to Appboy. The method will return a boolean which indicates whether or not the feedback was queued for delivery.

- `replyToEmail`: The user email address feedback replies will be directed towards.
- `message`: The message input by the user. Must be non-null and non-empty.
- `isReportingABug`: Flag which indicates whether or not the feedback describes a bug, or is merely a suggestion / question.

```csharp
Appboy.SharedInstance.SubmitFeedback(replyToEmail, message, isReportingABug);
```

__Note:__ The result can be determined by examining the IResult.
__Note:__ This must be called after the application has been initialized and is able to make network requests. Feedback will appear under the "Feedback" section of the Appboy dashboard.

## Third Party Provider Integrations

Appboy has easy integrations with both [Desk.com][13] and [Zendesk][14]. So long as you are collecting feedback through our ready-made UI or manually using the `submitFeedback` method, you can pass that feedback through to either third party provider. This will afford you the benefit of having the entire user profile card available to the CSR handling the case, and allow you to segment based upon the number of feedback requests a user has submitted.

To take advantage of these integrations, please visit the ["feedback" section within the "app settings" page][15]

**Implementation Example**\

See the following [`FeedBackPage.xaml` file in our Windows Sample Application][1]

## Theming the Appboy Feedback UI

You can customize the user interface to fit your app by overriding the default styles in `AppboyStyles.xaml` within the root directory of your project. The default styles for all of the UI controls are defined in the [`AppboyUI.Store` project](https://github.com/Appboy/appboy-windows-store-ui) in the [`/Styles/Default.xaml` file](https://github.com/Appboy/appboy-windows-store-ui/blob/master/Assets/Styles/Default.xaml). To override a default style, copy over the style element and one or more of the properties to your AppboyStyles.xaml file in the root directory of your app.

## Example Change

### Changing the Slideup Border Color to RED

```xml
<Style x:Key="Appboy.Slideup.Border" TargetType="Border">
  <Setter Property="BorderBrush" Value="#ff0000"/>
  <Setter Property="BorderThickness" Value="1"/>
</Style>
```

**Implementation Example**

See the following [`AppboyStyles.xaml` file in our Windows Sample Application][17]

[1]: https://github.com/Appboy/appboy-windows-samples/blob/master/Universal/AppboyTestApps.Universal.Windows/Pages/FeedbackPage.xaml "Windows Universal Sample Implementation") and [`FeedBackPage.xaml.cs` file in our Windows Sample Application](https://github.com/Appboy/appboy-windows-samples/blob/master/Universal/AppboyTestApps.Universal.Windows/Pages/FeedbackPage.xaml.cs "Windows Universal Sample Implementation"
[13]: http://www.desk.com
[14]: http://www.zendesk.com
[15]: https://dashboard.appboy.com/app_settings/app_settings/feedback/
[17]: https://github.com/Appboy/appboy-windows-samples/blob/master/Universal/AppboyTestApps.Universal.Shared/AppboyStyles.xaml "Windows Universal Sample Implementation"
