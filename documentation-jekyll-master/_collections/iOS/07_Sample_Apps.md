---
title: Sample Apps
platform: iOS
---
# Sample Apps

Appboy's SDKs each come with a sample application within the repository for your convenience. Each of these apps is fully buildable so you can test Appboy features alongside implementing them within your own applications. Testing behavior within your own application versus expected behavior and codepaths within the sample applications is an excellent way to debug any problems you may run into.

## Building the Stopwatch Test Application
Appboy's test application within the [iOS SDK Github repository][1] is called Stopwatch. Follow the instructions below to build a fully functional copy of it alongside your project.

1. Create a new ["App Group"][25] and note the production API key.
2. Place your production API key within the appropriate field in the `appdelegate.m` file.

__Note:__ Push notifications for the iOS test application requires additional configuration. See the [iOS Push Documentation][7] for details.

[1]: https://github.com/appboy/appboy-ios-sdk "Appboy iOS Github Repository"
[25]: /iOS/#app-group-configuration
[7]: /iOS/#integration
