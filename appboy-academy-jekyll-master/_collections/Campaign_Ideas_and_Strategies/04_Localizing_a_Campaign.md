---
title: Localizing a Campaign
---
# Localizing a Campaign

Appboy automatically collects relevant data to help you localize campaigns. Our customers send localized content on a daily basis to their audience to keep content relevant and accessible.

## Technical Details

Appboy automatically collects locale information from user devices after the SDK has been integrated. The locale contains a language and region identifier.

For example, a user who has set their device to English (US) will have a locale `en-US`. These filters will be available in Appboy's segmentation tool under Country and Language.

![Filter Select Screenshot][7]

More technical details on how locale is retrieved can be accessed by platform:

- [iOS][1]
- [Android][2]
- [Windows Store][3]
- [Windows Phone][4]

### Step 2: Set Headers and Http Method

## Localizing Campaigns

You can take advantage of this language identifier and our personalization capabilities to internationalize campaigns. For more information on internationalization, see [Campaigns in Multiple Languages][12]
 
Appboy automatically collects the most recent location of users' devices (if location permission is granted to your app). You can use this information to run a localized campaign that is targeted at users within a specific geographic area. For more information, see [Location Targeting][13].
 
[1]: https://developer.apple.com/library/ios/documentation/MacOSX/Conceptual/BPInternational/LanguageandLocaleIDs/LanguageandLocaleIDs.html
[2]: http://developer.android.com/reference/java/util/Locale.html
[3]: http://msdn.microsoft.com/en-us/library/windows/apps/dd373814.aspx
[4]: http://msdn.microsoft.com/en-us/library/windowsphone/develop/dd373814(v=vs.85).aspx
[7]: /assets/img/language-filter-select.png
[10]: /Quick_Wins/Creating_a_Segment
[12]: /Deep_Dives/Campaigns_in_Multiple_Languages
[13]: /Quick_Wins/Location_Targeting