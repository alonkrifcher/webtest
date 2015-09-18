---
title: iOS 9 Changes
platform: iOS
---
## iOS 9 Changes

In iOS 9, there are two breaking changes which will cause issues for deep linking from in-app messages, news feed cards and push notifications.

All images served by Appboy to end devices is handled by a content delivery network ("CDN") that supports TLS 1.2 and is compatible with ATS. However, please be aware that it takes approximately 1 to 5 minutes for images uploaded on the dashboard to fully propagate to the worldwide CDN, during which time images may not render properly on iOS 9. We anticipate this issue being fixed September 30th as our intermediate image storage layer, Amazon Web Services, becomes fully compatible with Apple's ATS requirements, according to [this announcement][8].

### App Transport Security(ATS)

#### App Transport Security And Its Requirements
From [Apple's documentation][3], "App Transport Security is a feature that improves the security of connections between an app and web services. The feature consists of default connection requirements that conform to best practices for secure connections. Apps can override this default behavior and turn off transport security.".

ATS is applied by default on iOS 9. It requires all the connections use HTTPS and are encrypted using TLS 1.2 with forward secrecy. Connections that do not follow the requirements will fail unless they are specified as exceptions in the app’s Info.plist.

#### What Should You Do
You can handle the ATS in one of following three ways:

###### Enable ATS for all links
Your Appboy integration can satisfy ATS requirements most simply by ensuring that any existing links you drive users to (through in-app message/push campaigns or news feed cards) satisfy ATS requirements.

###### Partially disable ATS
You can allow a subset of links with certain domains or schemes to be treated as exceptions to the ATS rules. Your Appboy integration will satisfy ATS requirements if every link you use in an Appboy messaging channel is either ATS compliant or handled by an exception.

To add a domain as an exception of the ATS, add following to your app's .plist file:

```
<key>NSAppTransportSecurity</key>
<dict>
	<key>NSAllowsArbitraryLoads</key>
	<true/>
	<key>NSExceptionDomains</key>
	<dict>
		<key>example.com</key>
		<dict>
			<key>NSExceptionAllowsInsecureHTTPLoads</key>
			<false/>
			<key>NSIncludesSubdomains</key>
			<true/>
		</dict>
	</dict>
</dict>
```

###### Disable ATS entirely

You can turn off ATS entirely, though it's not recommended due to the security protections lost. To disable ATS, insert following to your app's .plist file:

```
<key>NSAppTransportSecurity</key>
<dict>
	<key>NSAllowsArbitraryLoads</key>
	<true/>
</dict>
```

For more information about how to debug ATS failures, please refer to Tim Ekl's blog "[Shipping an App With App Transport Security][4]"

### Custom Protocol URL

#### Deep Linking Updates

Appboy supports deep linking and offers [documentation][5] about it. Starting with iOS 9, apps are required to have a whitelist of custom schemes which the app can open, or the system will log an error in console and won't open the deep link.

For example, when a click on an in-app message should open Facebook app, the app has to put the Facebook App's custom scheme in the plist, otherwise the system will not allow the deep link. For deep links directed to a page or view inside your own app, you still have to put your app's custom scheme in the plist.

#### What You Should Do

You should add all the schemes that the app needs to deep link to in a whitelist in your app's plist like this:

```
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>stopwatch</string>
    <string>example</string>
    <string>twitter</string>
</array>
```

For more details about how to add the whitelist, you can refer to Facebook's tutorial of how to whitelist the Facebook App "[whitelist Facebook App][6]". For more details regarding about deep linking in iOS 9, you can check out Greg Pierce's article "[Quick Take on iOS 9 URL Scheme Changes][7]"

[3]: https://developer.apple.com/library/prerelease/mac/technotes/App-Transport-Security-Technote/
[4]: http://timekl.com/blog/2015/08/21/shipping-an-app-with-app-transport-security/?utm_campaign=iOS+Dev+Weekly&utm_medium=email&utm_source=iOS_Dev_Weekly_Issue_213
[5]: /Advanced_Use_Cases/Deep_Linking_to_In-App_Resources
[6]: https://developers.facebook.com/docs/ios/ios9#whitelistapp
[7]: http://awkwardhare.com/post/121196006730/quick-take-on-ios-9-url-scheme-changes
[8]: https://aws.amazon.com/security/security-bulletins/aws-to-switch-to-sha256-hash-algorithm-for-ssl-certificates/
