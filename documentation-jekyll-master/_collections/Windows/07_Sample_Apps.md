---
title: Sample Apps
platform: Windows
---
## Sample Apps

Appboy's SDKs each come with a sample application within the repository for your convenience. Each of these apps is fully buildable so you can test Appboy features alongside implementing them within your own applications. Testing behavior within your own application versus expected behavior and codepaths within the sample applications is an excellent way to debug any problems you may run into.

### Building the Windows Sample Applications
Appboy's Windows test applications within are within the [Appboy Windows Samples Repository][2]. Follow the instructions below to build a fully functional copy of it alongside your project.

1. Create a new ["App Group"][25] and note the production API key.
2. Clone the root repository to a local drive with `git clone --recursive git@github.com:Appboy/appboy-windows-samples.git`.
3. Make sure nuget package restore is enabled for the solution. If it isn't, run nuget restore `TestApp.Phone.csproj`.
4. Replace the API key within the `AppboyConfiguration.xml` file with the prduction API key from the new App Group you created.
5. Build the solution and test on a Windows 8 Phone emulator or Windows 8 VM.

__Note:__ Push notifications for the Windows test application requires additional configuration. See the [Windows Push Documentation][8] for details.

[2]: https://github.com/Appboy/appboy-windows-samples "Appboy Windows Sample Applications"
[8]: /Windows/Phone8/#push-notifications
[25]: #app-group-configuration
