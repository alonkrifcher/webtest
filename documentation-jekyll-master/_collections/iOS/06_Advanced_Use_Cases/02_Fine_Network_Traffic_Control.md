---
title: Fine Network Traffic Control
platform: iOS
---
## Fine Network Traffic Control

Appboy allows the user the option to finely control network traffic using the following protocols.

- Automatic Request Processing (Default)
	- Data will flow to and from Appboy automatically in order to facilitate real-time dynamic segmentation updating
- Automatic Request Processing with the exception of Custom Event/Attribute Data Flushing
	- Same as above with the exception of Custom Event and Custom Attribute data flushing
- Manual Request Processing
	- All network traffic is manually controlled and no communication between the Appboy servers and the App will happen unless prompted

These policies can be set at app startup time in the `appboyOptions` dictionary by setting the `ABKRequestProcessingPolicyOptionKey` to any of the following three `ABKRequestProcessingPolicy` enum values defined below:

```objc
typedef enum [
  ABKAutomaticRequestProcessing,
  ABKAutomaticrequestProcessingExceptForDataFlush
  ABKManualRequestProcessing
]  ABKRequestProcessingPolicy
```

### To implement any of these protocols at startup:

The `NSDictionary` `appboyOptions` is optionally passed into the Appboy method `startWithApiKey:inApplication:withLaunchOptions:withAppboyOptions`.  For example:

```objc
[Appboy startWithApiKey:AppboyApiKey
          inApplication:application
      withLaunchOptions:launchOptions
      withAppboyOptions:@{ABKRequestProcessingPolicyOptionKey: [NSNumber numberWithInteger:ABKAutomaticRequestProcessing]}];
```

- You should call this method in your App Delegate `application:didFinishLaunchingWithOptions` method
	- `apiKey`= Application's ApiKey from Appboy Dashboard
	- `inApplication` = The current app
	- `withLaunchOptions` = The options `NSDictionary` that you get from `application:didFinishLaunchingWithOptions`
	- `withAppboyOptions` = An optional `NSDictionary` with startup configuration values for Appboy
		- Currently only supports setting the request processing policy via `ABKRequestProcessingPolicyOptionKey`

### Automatic Request Processing

- ENUM Value = `ABKAutomaticRequestProcessing`
	- This is the default value. All server communication is handled automatically. This includes:
		- Data flushing of custom events and attribute analytics data to the Appboy Servers
		- Updating the News Feed
		- Requesting new Slideups
		- Posting feedback
		- Immediate server requests are performed when user facing data is required for any of the aforementioned features
		- Periodic flushes also occur every few seconds
		- Data can be flushed to the server at any time using the following method:

			```
			[[Appboy sharedInstance] flushDataAndProcessRequestQueue]
			```

### Automatic Request Processing with the Exception of Custom Event/Attribute Data Flushing

- ENUM Value = `ABKAutomaticRequestProcessingExceptForDataFlush`
	- Same protocol as fully automatic EXCEPT:
		- Custom Attributes and Custom Event triggers are not automatically flushed to the server.
	- Data can be flushed to the server manually at any time in this mode using the following method:

		```
		[[Appboy sharedInstance] flushDataAndProcessRequestQueue]
		```

### Manual Request Processing

__This mode is only recommended for advanced use cases. If you're merely trying to control background flush behavior, try using `ABKAutomaticRequestProcessingExceptForDataFlush`__

- ENUM = `ABKManualRequestProcessing`
	- Standard Network Requests -- Feed Updates, User Attribute Flushes, Feedback Posts, etc. are still added to the network queue, but the communication with the server will not actually be performed until the following method is called at which point data will be flushed immediately:
		```
		[[Appboy sharedInstance] flushDataAndProcessRequestQueue]
		```

	- This instance method must be used after each network related activity in your app while in manual mode. These activities include:
		- Custom Events
		- Custom Attributes
		- Normally Automatically Collected Data
		- Flushing automatic analytics events such as starting and ending sessions
	- If the queue already contains a flush request for the current user, the new request will be merged into the pre-existing request such that only one request will be executed. This is done to minimize server load without impacting expected SDK behavior

### Manual Shutdown of In-Flight Server Communication

If at any time an "in-flight" server communication needs to be halted, you must call the following method:

```objc
[[Appboy sharedInstance] shutdownServerCommunication]
```
- After calling this method you must reset the request processing mode back to automatic
- For this reason we only recommend calling this if the OS if forcing you to stop background tasks or something similar

### Policy Regarding Network Requests by the SDK

__Note__: See the aforementioned enumeration values for more information on possible options. This value can be set at start-up as described above or at runtime.

```objc
@property (nonatomic, assign) ABKRequestProcessingPolicy requestProcessingPolicy;
```
