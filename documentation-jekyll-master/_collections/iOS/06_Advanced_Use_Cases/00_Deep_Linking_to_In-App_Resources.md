---
title: Deep Linking to In-App Resources
platform: iOS
---
## Deep Linking to In-App Resources

### What is Deep Linking?
"Deep Linking" is a way of launching a native app and providing additional information telling it do some specific action or show specific content.

There are three parts to this:

1. Identify which app to launch
2. Instruct the app which action to perform
3. Provide the action with any additional data it will need

"Deep Links" contain all of these things. The key is defining a custom scheme. "http:" is the scheme with which almost everyone is familiar but schemes can begin with any word. A scheme must start with a letter, but can then contain letters, numbers, plus-signs, minus-signs, and dots. Practically speaking, there is no central registry to prevent conflicts, so it is a Best Current Practice to include your domain name in the scheme.

Everything after the colon within a "Deep Link" is free-form text. It is up to you to define its structure and interpretation, however a common convention is to model it after "http:" urls, including a leading "//" (or "///", leaving a null string where the hostname would normally appear) and query parameters (e.g. "?foo=1&bar=2"). Following this approach, the action would be specified by the path and the additional data would be either in the path or in a query string. e.g. "/user/johndoe" or "/show?user=johndoe".

These "Deep Links" are a powerful tool when used in tandem with the Appboy News Feed. "Providing "Deep Links" as the URL within News Feed items allows you to utilize the News Feed as an individualized navigation tool to direct users to content inside or outside of your app.

### Implementing Deep Linking in iOS

#### Step 1: Registering A Scheme

The custom scheme must be stated in the `info.plist` file. The navigation structure is defined by an array of dictionaries. Each of those dictionaries contain an array of strings.

Using Xcode edit your `info.plist` file:

1. Add a new key `URL types`. Xcode will automatically make this an array containing a dictionary called "Item 0"
2. Within `Item 0`, add a key `URL identifier`. Set the value to your custom scheme.
3. Within `Item 0`, add a key `URL Schemes". This will automatically be an array containing a string called "Item 0".
4. Set `URL Schemes` >> `Item 0` to your custom scheme.

Alternatively, if you wish to edit your `info.plist` file directly, you can follow the spec below:

```html
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>YOUR.SCHEME</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>YOUR.SCHEME</string>
        </array>
    </dict>
</array>
```

#### Step 2: Implement a Handler

After activiating your app, iOS will call the method [application:openURL:sourceApplication:annotation:][1]. The important argument is the [NSURL][2] object.

```
- (BOOL)application:(UIApplication*)application
            openURL:(NSURL*)url
  sourceApplication:(NSString*)sourceApplication
         annotation:(id)annotation
{
    NSString *path  = [url path];
    NSString *query = [url query];
    // take some action based on the path and query
    return YES;
}
```

#### Step 3: Using Deep Links

Passing these URLs to the News Feed items will allow your app to handle the click and direct your users to your desired in-app content.

##### Sample Twitter Deep Links

```
twitter://user?screen_name=twitterhandle  ## Brings up the profile/timeline of the specified user
twitter://timeline  ## Brings up the user's timeline
twitter://mentions  ## Brings up the stream of mentions for the user
twitter://post?message=Hello%20World ## Brings up the compose tweet dialog, pre-populated with the specified message
twitter://search?query=%23hashtag ## Brings up search results for the specified query
twitter://messages #Brings up the user's mailbox
```

For further information see [Apple's documentation][3].

#### Step 4: Implementing Custom Push Handling for Deep Links

In order to open "Deep Links" that are sent to the user as a Key/Value pair along with a push notification you must implement a custom handler.

##### Sample Custom Push Handler Code

```objc
- (BOOL) application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  // Code should be inserted here to handle when the app just launched ...
  // eg, [Appboy startWithApiKey:@"API_KEY" inApplication:application withLaunchOptions:launchOptions];
  NSDictionary \*pushDictionary = [launchOptions valueForKey:UIApplicationLaunchOptionsRemoteNotificationKey];
  if (pushDictionary) {
    [self handleProtocolURL:pushDictionary];
  }
}
- (void) application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  [self handleProtocolURL:userInfo];
}
- (void) handleProtocolURL:(NSDictionary *)notification {
  NSLog(@"A push was received");
  if (notification !=nil && [notification objectForKey:@"TEST_URL"] != nil && [[notification objectForKey:@"TEST_URL"] length] > 0 ) {
    NSString \*urlLink=[NSString stringWithFormat:@"%@",[notification objectForKey:@"TEST_URL"]];  
    NSURL \*url = [NSURL URLWithString:urlLink];  
    if (![[UIApplication sharedApplication] openURL:url]) {  
      NSLog(@"Failed to open url:%@",[url description]);  
    }  
  }
}
```

### Deep Linking to the News Feed

To deeply link to the Appboy News Feed from a push notification we suggest you check for a specific Key/Value pair to queue your application to launch the News Feed. For example, you could use a key/value pair such as "Open_News_Feed" = "True". This Key/Value pair could be sent through the dashboard or via our [messaging REST API][9] as an `extras` property.

```objc
- (void) handleExtraFromPush:(NSDictionary *)notification {
  NSLog(@"A push was received");
  if (notification !=nil && [notification objectForKey:@"Open_News_Feed"] !=[NSNull null] && [[notification objectForKey:@"Open_News_feed"] length] > 0 ) {  
    NSString \*value=[NSString stringWithFormat:@"%@",[notification objectForKey:@"Open_News_Feed"]];  
    // Here based on the extras key-value pair, you can open the news feed that's integrated in your app
  }
}
```
![Open News Feed Key Value][10]

[1]: https://developer.apple.com/library/ios/DOCUMENTATION/UIKit/Reference/UIApplicationDelegate_Protocol/Reference/Reference.html#//apple_ref/occ/intfm/UIApplicationDelegate/application:openURL:sourceApplication:annotation:
[2]: https://developer.apple.com/library/ios/DOCUMENTATION/Cocoa/Reference/Foundation/Classes/NSURL_Class/Reference/Reference.html#//apple_ref/doc/c_ref/NSURL
[3]: https://developer.apple.com/library/ios/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/Inter-AppCommunication/Inter-AppCommunication.html#//apple_ref/doc/uid/TP40007072-CH6-SW10 "Apple's Documentation"
[4]: #register
[5]: #implement
[6]: #using
[7]: #handling
[8]: #news_feed_deep_link
[9]: /REST_APIs/Messaging
[10]: /assets/img/Open_News_Feed_Key_Value.png
