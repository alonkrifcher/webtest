---
title: Initial SDK Setup
platform: Windows
subplatform: Universal
---
# Initial SDK Integration

Installing the Appboy SDK will provide you with basic analytics functionality as well as a working in-app slideup message with which you can engage your users.

__Note:__ The Windows Universal SDK is also compatible with Xamarin Windows Apps.

__Time Estimate: 20-30 Minutes__

## Step 1: Install the SDK via the Nuget Package Manager<a class="margin-fix" name="install-nuget"></a>
The Windows Universal SDK is installed via the [Nuget Package Manager][14]. To install the Appboy Windows SDK via Nuget:

1. Right click on the project file
2. Click on "Manage Nuget Packages"
3. Click "Online" in the dropdown menu on the left
4. Search in "Nuget.org" for "Appboy"
5. Click on the "Appboy SDK for Windows Store and Windows Phone 8.1+ Apps" Nuget Package and click Install

__Note:__ The Windows Universal Library is meant for all Windows Store and Windows Phone 8.1+ applications. For Windows Phone 8.0 releases, please see our documentation for [Windows Phone 8 apps][17].

## Step 2: Creation and Configuration of AppboyConfiguration.xml<a class="margin-fix" name="appboyconfig"></a>
Create a file called `AppboyConfiguration.xml` in the root directory of your project and add the following code snippet into that file:

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <AppboyConfig>
        <ApiKey>YOUR_API_KEY_HERE</ApiKey>
    </AppboyConfig>
```
__Note__: Be sure to update `YOUR_API_KEY_HERE` with your API key which can found on the [App Settings][1] page within the Appboy Dashboard.

Once you've added that snippet, be sure to modify the following file properties for `AppboyConfiguration.xml`

1. Set the `Build Action` to `Content`
2. Set `Copy to Output Directory` to `Copy Always`

**Implementation Example**

See the [`AppboyConfiguration.xml` file in our Windows Sample Application][2].

## Step 3: Configuring Package.appxmanifest<a class="margin-fix" name="package-appxmanifest"></a>

Ensure that in your `Package.appxmanifest` file, the following settings are configured as noted below:

1. Within the "Application" tab, ensure that `Toast Capable` is set to YES.
  ![Toast_Capable][19]

2. Within the "Capabilities tab, ensure `Internet (Client)` is checked.
  ![Internet_Client][18]

__Note__: These are required capabilities.

**Implementation Example**

See the [`Package.appxmanifest` file in our Windows Sample Application][3].

## Step 4: Add Appboy UI Libraries <a class="margin-fix" name="integrate-library"></a>

The Appboy Windows SDKs can optionally be integrated without the following UI Libraries and Resource Dictionaries. However, In-App Messaging, the News Feed, and Feedback will be rendered inoperable. Please note that these UI elements are open source and [fully customizable][1]. We strongly recommend integration of these features.

## Step 5: Editing your `app.xaml.cs` file <a class="margin-fix" name="app-xaml-cs"></a>

1. Add the following to the `usings` of your `App.xaml.cs` file:

  ```csharp
  using AppboyPlatform.PCL.Managers;
  using AppboyPlatform.Universal;
  using AppboyPlatform.Universal.Managers.PushArgs;
  ```

2. Call the following within your `OnLaunched` lifecycle method:

  ```csharp
  Appboy.SharedInstance.OpenSession();
  ```

3. Call the following within your `OnSuspending` lifecycle method:

  ```csharp
  Appboy.SharedInstance.CloseSession();
  ```

For more information, see the ["App.xaml.cs" file within the Windows Sample Applications][16]

### Part 1: Adding the Library to Your Project:

#### Method 1: Maintaining a Git Submodule (Recommended)

Appboy recommends maintaining a [git submodule][4] of the Windows Universal UI Library within your project. To add the submodule use the following command:
  ```
  git submodule add "git@github.com:Appboy/appboy-windows-universal-ui.git" Externals/AppboyUI.Universal/.
  ```
Keeping a git submodule up-to-date requires running `git submodule update --init` when new versions are available.

#### Method 2: Directly Adding the Library

If you would prefer to avoid maintaining a git submodule; you may choose to download the code directly from the [Windows Universal UI Github Repository][5].

### Part 2: Referencing the Library in Your Project:

Next, you must reference the library within your project:

1. Right Click on your project.

2. Click Add Reference.

3. Select the Appboy Universal UI to add it as a reference in your project.

4. Add the following to the `usings` of your `App.xaml.cs` file:

  ```csharp
  using AppboyUI.Universal.Factories;
  using AppboyUI.Universal.Assets.Localization;
  using Windows.UI.Xaml.Resources;
  ```

5. Call the following within your App Initialization:

  ```csharp
  CustomXamlResourceLoader.Current = new TranslationResourceProvider();
  ```

## Step 6: Adding Style Resource Dictionaries<a class="margin-fix" name="resource-dictionaries"></a>

Add a file named `AppboyStyles.xaml` to the root folder of your app.  In it, define a resource dictionary that you can override styles in:

```xml
<ResourceDictionary
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
  <!--
    This is the Appboy styles override XAML.
    The default styles for all of the UI controls are defined in the AppboyUI.Universal project in the Assets/Styles/default.xaml file.
    To override a default style, copy over the style element and one or more of the properties.
  -->
  <!--Example: Changing the slideup border color to RED -->
  <!--
  <Style x:Key="Appboy.Slideup.Border" TargetType="Border">
    <Setter Property="BorderBrush" Value="#ff0000"/>
    <Setter Property="BorderThickness" Value="1"/>
  </Style>
  -->
</ResourceDictionary>
```

**Implementation Example**

See the [`AppboyStyles.xaml` file in our Windows Sample Application][6].

## Step 7: (Optional): Install Test Apps for Sample Integrations<a class="margin-fix" name="test-apps"></a>
Appboy provides Test Applications which you may clone, build and run at your convenience to test out our feature set. To install these apps:

1. Clone the root repository to a local drive with `git clone --recursive git@github.com:Appboy/appboy-windows-samples.git`
2. Make sure nuget package restore is enabled for the solution. If it isn't, run `nuget restore TestApp.Universal.csproj`
3. Build the solution and test on your local Windows 8 machine.

## SDK Integration Complete

Appboy should now be collecting data from your application and your basic integration should be complete. Please see the following sections in order to enable custom event tracking, push messaging, the news-feed and the complete suite of Appboy features.

__NOTE:__ If you are using the Appboy Unity project in the same app, you may have to fully qualify calls to Appboy as “AppboyPlatform.Universal.Appboy”

[1]: https://dashboard.appboy.com/app_settings/app_settings "App Settings"
[2]: https://github.com/Appboy/appboy-windows-samples/blob/master/Universal/AppboyTestApps.Universal.Windows/AppboyConfiguration.xml
[3]: https://github.com/Appboy/appboy-windows-samples/blob/master/Universal/AppboyTestApps.Universal.Windows/Package.appxmanifest
[4]: http://git-scm.com/docs/git-submodule
[5]: https://github.com/Appboy/appboy-windows-universal-ui
[6]: https://github.com/Appboy/appboy-windows-samples/blob/master/Universal/AppboyTestApps.Universal.Shared/AppboyStyles.xaml
[14]: http://www.nuget.org/
[16]: https://github.com/Appboy/appboy-windows-samples/blob/master/Universal/AppboyTestApps.Universal.Shared/App.xaml.cs
[17]: /SDK_Integration/Windows/Phone8
[18]: /assets/img/internet_client.png
[19]: /assets/img/toast_capable.png
