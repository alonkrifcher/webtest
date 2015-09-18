---
title: Location Tracking
platform: Web
---
## Location Tracking

__Please Note!__ The Appboy Web SDK is currently in beta. If you have any questions, please contant support@appboy.com.

The Appboy Web SDK does not currently do any automatic GPS-based location tracking. To set a user's last known location yourself, you can use

```
appboy.getUser().setLastKnownLocation(latitude, longitude, accuracy, altitude, altitudeAccuracy);
```

See the [JSDocs][1] for more information.

Additionally, when the Web SDK sends data to Appboy servers, the user's country will be automatically detected from their IP Address if it has not been manually set by your application.

[1]: https://js.appboycdn.com/web-sdk/latest/doc/ab.User.html#setLastKnownLocation
