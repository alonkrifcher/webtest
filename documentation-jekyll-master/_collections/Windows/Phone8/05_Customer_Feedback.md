---
title: Customer Feedback
platform: Windows
subplatform: Phone8
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

**Implementation Example**

See the following [`FeedBackPage.xaml` file in our Windows Sample Application][1]

## Theming the Appboy Feedback UI

You can customize the user interface to fit your app by overriding the default styles in `AppboyOverride.xaml`. The default styles for all of the UI controls are defined in the [`AppboyUI.Phone` project](https://github.com/Appboy/appboy-windows-samples/tree/master/Phone) in the [`/Styles/Default.xaml` file](https://github.com/Appboy/appboy-windows-phone-ui/blob/master/Assets/Styles/Default.xaml). To override a default style, copy over the style element and one or more of the properties to your `AppboyOverride.xaml` file in the root directory of your app.

## Example Change {#example_feedback}

#### Changing the Slideup Border Color to RED

```xml
<Style x:Key="Appboy.Slideup.Border" TargetType="Border">
  <Setter Property="BorderBrush" Value="#ff0000"/>
  <Setter Property="BorderThickness" Value="1"/>
</Style>
```

**Implementation Example**

See the following [`AppboyOverride.xaml` file in our Windows Sample Application][21]

[1]: https://github.com/Appboy/appboy-windows-samples/blob/master/Phone/Pages/FeedBackPage.xaml "Windows Phone 8.0 Sample Implementation") and [`FeedBackPage.xaml.cs` file in our Windows Sample Application](https://github.com/Appboy/appboy-windows-samples/blob/master/Phone/Pages/FeedBackPage.xaml.cs "Windows Phone 8 Sample Implementation"
[7]: #feedback-integration
[8]: #manual-feedback
[9]: #third-party
[10]: #theming-feedback
[13]: http://www.desk.com
[14]: http://www.zendesk.com
[15]: https://dashboard.appboy.com/app_settings/app_settings/feedback/
[16]: #third-party
[21]: https://github.com/Appboy/appboy-windows-samples/blob/master/Phone/Assets/Styles/AppboyOverride.xaml "Windows Phone 8.0 Sample Implementation"
