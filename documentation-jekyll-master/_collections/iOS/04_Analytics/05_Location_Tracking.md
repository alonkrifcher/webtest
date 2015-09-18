---
title: Location Tracking
platform: iOS
---
## Location Tracking

### Enabling iOS Location Targeting

1. Click on the target for your project (using the left-side navigation), and select the “Build Phases” tab.
2. Click the button under “Link Binary With Libraries”
3. In the menu, select `CoreLocation.framework`
4. Mark this library as required using the pull-down menu next to `CoreLocation.framework`
5. Add `NSLocationWhenInUserUsageDescription` and/or `NSLocationAlwaysUsageDescription` as keys to your plist.
  - The value should be a string, which will be displayed when the system asking permission from your users.
6. See the following sample code to authorize `CLLocationManager` so Appboy can collect location from your app:

```objc
@property (retain, nonatomic) CLLocationManager *locationManager;

- (void)startLocationUpdates {
  // Create the location manager if this object does not
  // already have one.
  if (self.locationManager == nil) {
    CLLocationManager \*locationManager = [[CLLocationManager alloc] init];
    self.locationManager = locationManager;
    [locationManager release];
  }

  self.locationManager.delegate = self;
  self.locationManager.desiredAccuracy = kCLLocationAccuracyBest;

  // Set a movement threshold for new events.
  self.locationManager.distanceFilter = 500; // meters

  if ([self.locationManager respondsToSelector:@selector(requestWhenInUseAuthorization)]) {
    [self.locationManager requestWhenInUseAuthorization];
  }
  /* When you want to request authorization even when the app is in the background, use requestAlwaysAuthorization.
   if ([self.locationManager respondsToSelector:@selector(requestAlwaysAuthorization)]) {
    [self.locationManager requestAlwaysAuthorization];
  } \*/
  [self.locationManager startUpdatingLocation];
}

#pragma location manager delegate method
- (void)locationManager:(CLLocationManager *)manager didUpdateToLocation:(CLLocation *)newLocation fromLocation:(CLLocation *)oldLocation {
  // test that the horizontal accuracy does not indicate an invalid measurement
  if (newLocation.horizontalAccuracy < 0) return;
  // test the age of the location measurement to determine if the measurement is cached
  // in most cases you will not want to rely on cached measurements
  NSTimeInterval locationAge = -[newLocation.timestamp timeIntervalSinceNow];
  if (locationAge > 5.0) return;
}

- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error {
  // The location "unknown" error simply means the manager is currently unable to get the location.
  if ([error code] != kCLErrorLocationUnknown) {
    [self stopUpdatingLocation];
  }
}

- (void)stopUpdatingLocation {
  [self.locationManager stopUpdatingLocation];
  self.locationManager.delegate = nil;
}
```

For additional details please see this [helpful blog post][2].


[1]: https://github.com/Appboy/AppboyKit/blob/develop/Stopwatch/Stopwatch/InitialViewController.m#L388-L403 "Stopwatch InitialViewController.m"
[2]: http://nevan.net/2014/09/core-location-manager-changes-in-ios-8/
