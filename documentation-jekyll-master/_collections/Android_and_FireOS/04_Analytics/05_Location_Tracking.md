---
title: Location Tracking
platform: Android and FireOS
---
## Location Tracking

Add at least one of the following the following permission to your `AndroidManifest.xml` file:

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```
Or:

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

__Note__: `ACCESS_FINE_LOCATION` includes GPS data in reporting user location while `ACCESS_COARSE_LOCATION` only includes data from Android's Network Location Provider. The coarse location will likely be sufficient for the majority of location data use-cases. You can read more about the differences between these location permissions and how you ought to utilize them [here.][1]

[1]: http://developer.android.com/guide/topics/location/strategies.html
