---
title: Customer Feedback
platform: iOS
---
# Customer Feedback

The Appboy feedback form allows users to submit feedback about your app that is immediately sent to your company's dashboard.

__Time Estimate: 10 Minutes__

## Feedback Integration Overview

![iOS ActivityFeed+FeedBack](/assets/img/iosfeed.png "News Feed and Feedback Form")

Integrating the ViewController `FeedbackViewController` will show a feedback form and allow users to post Feedback to Appboy.

If your app has a Facebook ID, you can put it in your app's plist under the key `FacebookAppID`. The Feedback page will automatically display the Facebook button when where is a Facebook account connected to the iOS device.

You have a great deal of flexibility in how you choose to display the view controllers. There are several different versions of the view controllers to accommodate different navigation structures.

## Feedback Display Options

The feedback form can be integrated with 3 view controller contexts:

### Modal Context

`ABKFeedbackControllerModalContext`
Presents the view controller in a modal with a navigation bar, "Cancel," and "Send" buttons

  - __When a delegate is not set:__
      - Both buttons will dismiss the modal view
  - __When a delegate is set:__  
    - The "Cancel" button will call the delegate when it is tapped
    - The "Send" button will call the delegate when feedback is successfully sent
    - The delegate must dismiss the view itself

**Objective-C**

```objc
ABKFeedbackViewControllerModalContext *modalFeedback =
[[[ABKFeedbackViewControllerModalContext alloc] init] autorelease];
[self presentViewController:modalFeedback animated:YES completion:nil];
```

**Swift**

```swift
presentViewController(ABKFeedbackViewControllerModalContext.init(), animated:true, completion: nil)
```

### Navigation Context

`ABKFeedbackControllerNavigationContext`

- A Feedback ViewController class for use in a navigation stack as a child of a `UINavigationController`. Includes a "Send" button.
- When a delegate is set, the "Send" button will call it when feedback is successfully sent.

```objc
ABKFeedbackViewControllerNavigationContext *navFeedback =
[[[ABKFeedbackViewControllerNavigationContext alloc] init] autorelease];
[navigationController pushViewController:navFeedback animated:YES];
```

### Popover Context

`ABKFeedbackControllerPopoverContext`
Used when the view controller is presented in a popover and includes a navigation bar, "Cancel", and "Send" button

  - You must set a delegate:  
    - The "Cancel" button will call the delegate when it is tapped
    - The "Send" button will call the delegate when feedback is successfully sent
    - The delegate must dismiss the view itself

```objc
ABKFeedbackViewControllerPopoverContext *popoverFeedback = [[[ABKFeedbackViewControllerModalContext alloc] init] autorelease];
  // We want to be notified when either "Cancel" or "Send" is tapped.
popoverFeedback.delegate = self;
self.feedbackPopoverController = [[[UIPopoverController alloc] initWithContentViewController:popoverFeedback] autorelease];
```

The following two methods are required -- they are how we know when to close the popover. Tapping outside the feedback popover will NOT close it. This is by designm we don't want the user to accidentally tap outside the popover and close it if there's text in the feedback form.


```objc
(void) feedbackViewControllerPopoverContextFeedbackSent:(ABKFeedbackViewControllerPopoverContext *)sender {
  [self.contactUsPopoverController dismissPopoverAnimated:YES];
}
```

#### Improving Animations in Popover View

To improve the feedback form animations in the popover view, we recommend overriding the navigation controller delegate method. For example:

```objc
#pragma mark
    #pragma navigation controller delegate method
    - (void)navigationController:(UINavigationController *)navigationController didShowViewController:(
          UIViewController *)viewController animated:(BOOL)animated {
      if ([viewController isKindOfClass:[ABKFeedbackViewControllerNavigationContext class]]) {
        [UIView animateWithDuration:0.5 animations:^{
          viewController.contentSizeForViewInPopover = CGSizeMake(320, 300);
        }];
      }
    }
```

### Configuring User Feedback Response Dialog

We recommend that you use the `FeedbackViewController` delegate to display a confirmation in response to user actions. For example, to display an alert telling the user the feedback has been successfully sent, your delegate callback method might look like this:

```objc
- (void) feedbackViewControllerModalContextFeedbackSent
                 (ABKFeedbackViewControllerModalContext \*)sender {

  [self dismissModalViewControllerAnimated:YES];

  UIAlertView \*feedbackAlert =
     [[UIAlertView alloc] initWithTitle:@"Thanks for your feedback."
                                message:nil
                               delegate:nil
                      cancelButtonTitle:@"OK"
                      otherButtonTitles:nil];

  [feedbackAlert show];

  [feedbackAlert release];

}
```

### Storyboard Implementation

The Appboy view controllers can also be integrated using Storyboards. Check out the Stopwatch Sample App in the iOS SDK for an example.

## Sample Code

Below are examples of how to integrate the Appboy view controllers into your app. We've included a one-button integration example so you can have one call to open the feedback view controller from within the stream view. This works well for apps migrating from V1 who would like to maintain their current interactions.

### One Button Integration - Modal View

```objc
ABKFeedViewControllerNavigationContext *streamModal = [[[ABKFeedViewControllerNavigationContext alloc] init]
    autorelease];
self.modalNavigationController = [[[UINavigationController alloc] initWithRootViewController:streamModal]
    autorelease];
UIBarButtonItem *feeddbackBarButtonItem = [[[UIBarButtonItem alloc] initWithTitle:@"Feedback"
    style:UIBarButtonItemStyleBordered target:self action:@selector(openFeedbackFromModalFeed:)] autorelease];
streamModal.navigationItem.leftBarButtonItem = feeddbackBarButtonItem;
UIBarButtonItem *closeButtonItem = [[[UIBarButtonItem alloc] initWithTitle:@"Close"
    style:UIBarButtonItemStyleBordered target:self action:@selector(closeModalNaviagationView:)] autorelease];
streamModal.navigationItem.rightBarButtonItem = closeButtonItem;
[self presentModalViewController:self.modalNavigationController animated:YES];
```

### One Button Integration - Popover View

```objc
ABKFeedViewControllerNavigationContext *streamModal = [[[ABKFeedViewControllerNavigationContext alloc] init]
      autorelease];
self.popoverNavigationController = [[[UINavigationController alloc] initWithRootViewController:streamModal]
    autorelease];
self.popoverNavigationController.delegate = self;
UIBarButtonItem *feeddbackBarButtonItem = [[[UIBarButtonItem alloc] initWithTitle:@"Feedback"
    style:UIBarButtonItemStyleBordered target:self action:@selector(openFeedbackFromModalFeed:)] autorelease];
streamModal.navigationItem.rightBarButtonItem = feeddbackBarButtonItem;
self.streamPopover = [[[UIPopoverController alloc]
  initWithContentViewController:self.popoverNavigationController] autorelease];
```


#### Popover View Animations

To improve the feedback form animations in the popover view, we recommend overriding the navigation controller delegate method. For example:

```objc
#pragma mark
    #pragma navigation controller delegate method
    - (void)navigationController:(UINavigationController *)navigationController didShowViewController:(
          UIViewController *)viewController animated:(BOOL)animated {
      if ([viewController isKindOfClass:[ABKFeedbackViewControllerNavigationContext class]]) {
        [UIView animateWithDuration:0.5 animations:^{
          viewController.contentSizeForViewInPopover = CGSizeMake(320, 300);
        }];
      }
    }
```

## Manual Feedback Collection

The following method will allow you to pass Feedback to Appboy from a form or field within your app. This is perfect for passing feedback from an existing UI element to Appboy. The method will return a boolean which indicates whether or not the feedback was queued for delivery.

- `replyToEmail`: The user email address feedback replies will be directed towards.
- `message`: The message input by the user. Must be non-null and non-empty.
- `isReportingABug`: Flag which indicates whether or not the feedback describes a bug, or is merely a suggestion / question.

**Objective-C**

```objc
- (BOOL) submitFeedback:(NSString *)replyToEmail message:(NSString *)message isReportingABug:(BOOL)isReportingABug;
```

**Swift**

```swift
Appboy.sharedInstance().submitFeedback("USERS_EMAIL_ADDRESS", message: "USERS_FEEDBACK_STRING", isReportingABug: Bool)
```

When manually collecting feedback, you can also log when the form is displayed using `- (void) logFeedbackDisplayed;` in `Appboy.h`. For example:

**Objective-C**

```objc
[[Appboy sharedInstance] logFeedbackDisplayed];
```

**Swift**

```swift
Appboy.sharedInstance().logFeedbackDisplayed()
```

## Third Party Provider Integrations

Appboy has easy integrations with both [Desk.com][13] and [Zendesk][14]. So long as you are collecting feedback through our ready-made UI or manually using the `submitFeedback` method, you can pass that feedback through to either third party provider. This will afford you the benefit of having the entire user profile card available to the CSR handling the case, and allow you to segment based upon the number of feedback requests a user has submitted.

To take advantage of these integrations, please visit the ["feedback" section within the "app settings" page][15]

## Implementation Examples

The `FeedBackViewControllerNavigationContext` and `FeedBackViewControllerPopoverContext` are utilized within the [`InitialViewController.m` file][10] within the Stopwatch Sample App.

- For further details see the [`ABKFeedBackViewController` header files][11]
__Note__: You should only implement the `FeedBackViewController` using the contexts as outlined above. Never directly.

## Theming

Appboy's built in feedback UI is themable via NUI. See the following section for details on how you can customize this UI to suit the look and feel of your app.

### Using NUI

Appboy's iOS SDK supports powerful theming options based on the NUI customization framework. NUI allows you customize almost everything about the look and feel of an app using style sheets similar to CSS.

Appboy has its own specific set of UI elements which must be customized independently from the rest of your app -- they do not inherit property settings from the standard NUI classes. This allows you to customize Appboy without affecting the rest of your app.

To theme your app, integrate NUI into your project by adding `pod 'NUI'` in your Podfile, or follow [these instructions](https://github.com/tombenner/nui "ARC").

For swift, you need to Add `#import "NUISettings.h"` to your bridging header file.

**Objective-C**
Add this line to `- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions` in your `AppDelegate.m` file:

```objc
[NUISettings initWithStylesheet:@"Your_Theme"];
[Appboy sharedInstance].useNUITheming = YES;
```

**Swift**
Add this line to `application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool` in your `AppDelegate.swift` file:

```swift
NUISettings.initWithStylesheet("Your_Theme")
Appboy.sharedInstance().useNUITheming = true
```

NUI allows you to customize the behavior of many UI elements, such as labels, buttons, views, and text fields. For each component, there is a set of properties you can set via a style sheet -- `NUIStyle.nss` -- which you include in your project.

#### Implementation Examples

See the [`Appdelegate.m` file](https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Stopwatch/AppDelegate.m) in the Stopwatch sample app.

Refer to the [`useNUITheming` documentation](http://appboy.github.io/appboy-ios-sdk/docs/interface_appboy.html#a2559b9e425866a5c34ad23ab2274d410 "useNUITheming documentation)") for more information.

### Navigation Contexts

In navigation contexts, the navigation bar and its buttons cannot be themed using the Appboy NUI classes.  This limitation occurs because the navigation context view controller does not own its navigation bar when it is the child of a navigation context. Instead, properties of the navigation bar are set at the parent level.

There are two ways to theme the navigation bar and buttons in a navigation context:

- Programmatically set properties directly in the parent view controller
- Use standard NUI classes to theme all navigation bars in your app

### Warnings:

- If you are using a navigation bar in a non-ARC app, ensure that your `NSNotificationCenter` removes it as an observer when it is released or deallocated.  NUI adds all navigation bars as an observer for the custom method `orientationDidChange`, so in a non-ARC app you will need to manually remove the observer. Otherwise, you will receive a SIGSEGV error that the notification center tried to post a notification to a released object.

```objc
[[NSNotificationCenter defaultCenter] removeObserver:yourNavigationBar];
```

- Due to a bug in how NUI parses the .nss file, setting text-shadow-offset to a single number, instead of two comma separated numbers, will cause a crash
- In iOS 6.1, if you do no customize `UIButton`, buttons will show up as just the title text with no background; in other words, customizing `UIButton` is mandatory if you use NUI.  
    - This issue is not related to Appboy;  this is a general problem with NUI
    - Put an entry for the `Button` style class in your `NUIStyle.nss` style sheet

      ```objc
      Button {
       background-color: #FFFFFF;
       corner-radius: 8;
      }
      ```

### Themable Feedback Elements & Associated Properties

Subsequent sections have example UI screenshots of the feedback form and news feed. In the screenshots, all the customizable UI elements are pointed out with their custom classes. These class names are directly used in `NUIStyle.nss`. For the attributes that can be set for each class, please refer to the theming directory below.

![Feedback Page][26]

Customizable elements and properties:

| ABKFeedbackCancelBarButtonItem |
| ------------------------------ |
| background-color |
| background-color-top/background-color-bottom |
| background-color-highlighted |
| background-image |
| background-image-insets |
| background-tint-color |
| border-color |
| border-width |
| corner-radiu |
| font-color |
| font-name |
| font-size |
| text-shadow-color |
| text-shadow-offset |

| ABKFeedbackSendBarButtonItem |
| ------------------------------ |
| background-color |
| background-color-top/background-color-bottom |
| background-color-highlighted |
| background-image |
| background-image-insets |
| background-tint-color |
| border-color |
| border-width |
| corner-radiu |
| font-color |
| font-name |
| font-size |
| text-shadow-color |
| text-shadow-offset |

| ABKFeedbackNavigationBar |
| ------------------------------ |
| bar-tint-color |
| font-color |
| font-name |
| font-size |
| text-shadow-color |
| text-shadow-offset |
| title-vertical-offset |
| background-tint-color |
| background-image |
| background-image-insets |

| ABKFeedbackBackgroundView |
| -------------------- |
| background-color |
| background-image |
| border-color |
| border-width |
| corner-radius |

| ABKFeedbackEmailAddressBarView |
| -------------------- |
| background-color |
| background-image |
| border-color |
| border-width |
| corner-radius |

| ABKFeedbackMessageLabel |
| ------------------------ |
| background-color |
| border-color |
| border-width |
| corner-radius |
| font-color |
| font-name |
| font-size |
| text-align |
| text-alpha |
| text-shadow-color |
| text-shadow-offset |
| text-auto-fit |
| font-size |

| ABKFeedbackMessageRequiredLabel |
| ------------------------ |
| background-color |
| border-color |
| border-width |
| corner-radius |
| font-color |
| font-name |
| font-size |
| text-align |
| text-alpha |
| text-shadow-color |
| text-shadow-offset |
| text-auto-fit |
| font-size |

| ABKFeedbackProvideContactLabel |
| ------------------------ |
| background-color |
| border-color |
| border-width |
| corner-radius |
| font-color |
| font-name |
| font-size |
| text-align |
| text-alpha |
| text-shadow-color |
| text-shadow-offset |
| text-auto-fit |
| font-size |

| ABKFeedbackContactRequiredLabel |
| ------------------------ |
| background-color |
| border-color |
| border-width |
| corner-radius |
| font-color |
| font-name |
| font-size |
| text-align |
| text-alpha |
| text-shadow-color |
| text-shadow-offset |
| text-auto-fit |
| font-size |

| ABKFeedbackEmailButton |
| ------------------------ |
| background-color |
| background-color-top/background-color-bottom |
| background-color-highlighted |
| background-color-selected |
| background-color-selected-highlighted |
| background-image |
| background-image-insets |
| background-image-highlighted |
| background-image-highlighted-insets |
| background-image-selected |
| background-image-selected-insets |
| border-color |
| border-width |
| corner-radius |

| ABKFeedbackFacebookButton |
| ------------------------ |
| background-color |
| background-color-top/background-color-bottom |
| background-color-highlighted |
| background-color-selected |
| background-color-selected-highlighted |
| background-image |
| background-image-insets |
| background-image-highlighted |
| background-image-highlighted-insets |
| background-image-selected |
| background-image-selected-insets |
| border-color |
| border-width |
| corner-radius |

| ABKFeedbackIssueButton |
| ------------------------ |
| background-color |
| background-color-top/background-color-bottom |
| background-color-highlighted |
| background-color-selected |
| background-color-selected-highlighted |
| background-image |
| background-image-insets |
| background-image-highlighted |
| background-image-highlighted-insets |
| background-image-selected |
| background-image-selected-insets |
| border-color |
| border-width |
| corner-radius |

| ABKFeedbackTextField |
| ------------------------ |
| background-color |
| border-color |
| border-width |
| border-style |
| corner-radius |
| font-color |
| font-name |
| font-size |
| vertical-align |

Additionally, you can customize the checkmark graphic by adding your own checkmark.png to `AppboyKit` Resources.

### Style Value Types

- Boolean - A boolean (`true` or `false`)
- BorderStyle - A border style, as rendered by a `UITextBorderStyle`. Accepted values are `none`, `line`, `bezel`, and `rounded`
- Box - A series of 1 to 4 integers that specify the widths of a box's edges. Interpreted like CSS's `padding` and `margin` properties (top, right, bottom, left). Examples:
  - `15` (a box with a width of 15 for each edge),
  - `10 15` (a box with a width of 10 for the top and bottom edges and 15 for the right and left edges)
- Color - A hex color (e.g. `#FF0000`), rgba, hsl, or hsla expression (e.g. `rgb(255,0,0)` or `hsla(0.5, 0, 1.0, 0.5)`); or a color name that `UIColor` has a related method name for (e.g. `red`, `yellow`, `clear`). If `[UIColor fooColor]` is supported, then `foo` is supported.
- FontName - A font name (see available values [here](http://iosfonts.com/))
- Gradient - Two Colors that will create a vertical gradient. background-color-top and background-color-bottom need to be defined in separate .nss properties
- Image - A name of an image, as used in `[UIImage imageNamed:name]` (e.g. `MyImage.png`)
- Number - A number (e.g. `-1`, `4.5`)
- Offset - Two numbers comprising the horizontal and vertical values of an offset (e.g. `-1,1`)
- TextAlign - A text alignment (e.g. `left`, `right`, `center`)
- VerticalAlign - A vertical alignment (e.g. `top`, `center`, `bottom`, `fill`)

[10]: https://github.com/Appboy/appboy-ios-sdk/blob/master/Example/Stopwatch/InitialViewController.m
[11]: https://github.com/Appboy/appboy-ios-sdk/tree/master/AppboyKit/headers/AppboyKitLibrary
[13]: http://www.desk.com
[14]: http://www.zendesk.com
[15]: https://dashboard.appboy.com/app_settings/app_settings/feedback/
[26]: /assets/img/iOSFeedbackFinal.png
