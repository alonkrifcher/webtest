---
title: Initial SDK Setup
platform: Web
---
# Initial SDK Setup

__Please Note!__ The Appboy Web SDK is currently in beta. If you have any questions, please contant support@appboy.com.

Integrating the Appboy SDK will provide you with basic analytics functionality as well as in-app messages with which you can engage your users.

__Time Estimate: 10-15 Minutes__

## Step 1: Integrate the Appboy Library

To integrate the Appboy Web SDK, simply follow the instructions in the "Getting Started" section of the [Appboy Web SDK Github Repository][2]. Be sure to substitute the API key found within the [App Settings][5] page of the Appboy dashboard for `YOUR-API-KEY-HERE`. For more detailed technical documentation, refer to [the complete JSDocs][9].

## Error Logging

To enable logging, you can pass the option `enableLogging: true` to your initialize function (or call `appboy.toggleAppboyLogging()` after initialization), which will cause Appboy to log to the javascript console. This is useful for development but is visible to all users, so you should remove this option or provide an alternate logger with `appboy.setLogger()` before you release your page to production.

[1]: https://www.appboy.com/academy "Appboy"
[2]: https://github.com/Appboy/appboy-web-sdk#getting-started "Appboy Web SDK Github Repository"
[5]: https://dashboard.appboy.com/app_settings/app_settings/ "App Settings"
[9]: https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html "JSDocs"
