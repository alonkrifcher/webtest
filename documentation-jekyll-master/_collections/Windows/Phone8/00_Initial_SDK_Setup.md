---
title: Initial SDK Setup
platform: Windows
subplatform: Phone8
---
Installing the Appboy SDK will provide you with basic analytics functionality as well as a working in-app slideup message with which you can engage your users.

# Initial SDK Setup

## Step 1: Install the Appboy Windows Phone 8 SDK<a class="margin-fix" name="install-nuget"></a>
The Windows Store SDK is installed via the [Nuget Package Manager][14]. To install the Appboy Windows SDK via Nuget:

__Note__:  If you are doing a Unity integration, you should add references to the dlls that were output from the Unity Build in the root directory of your project.  Do not integrate via nuget for Windows Phone 8 Unity projects.

1. Right click on the project file
2. Click on "Manage Nuget Packages"
3. Click "Online" in the dropdown menu on the left
4. Search in "Nuget.org" for "Appboy"
5. Click on the "Appboy Windows Phone" Nuget Package and click Install
  - The id of the package is AppboyPlatform.Phone.Release

## Step 2: Create and Configure AppboyConfiguration.xml<a class="margin-fix" name="appboy-configuration"></a>
Next, you're going to have to create a file called `AppboyConfiguration.xml` in the root directory of your project and add the following code snippet into that file:
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

## Step 3: Enabling "Capabilities" in WMAppManifest.xml<a class="margin-fix" name="Capabilities"></a>
Within the `properties/WMAppManifest.xml` capabilities tab, ensure that `ID_CAP_IDENTITY_DEVICE` is checked.

**Implementation Example**
See the [`WMAppManifest.xml` file in our Windows Sample Application][3].

## Step 4: Edit your App.xaml.cs<a class="margin-fix" name="app-xaml-cs"></a>

1. Add the following to your `usings` within the `App.xaml.cs` file:

  ```csharp
  using AppboyPlatform.Phone;
  using AppboyPlatform.Phone;
  using AppboyPlatform.Phone.Managers.PushArgs;
  ```

2. Call `Appboy.SharedInstance.OpenSession()` in the application's Launching and Activated event handlers. These typically have the following signatures:
 - `Application_Launching(object, LaunchingEventArgs)`
 - `Application_Activated(object, ActivatedEventArgs)`

3. Call `Appboy.SharedInstance.CloseSession()` in the application's Deactivated and Closing event handlers. These typically have the following signatures:
 - `Application_Deactivated(object, DeactivatedEventArgs)`
 - `Application_Closing(object, ClosingEventArgs)`

**Implementation Example**

See the [`App.xaml.cs` file in our Windows Sample Application][4]

## Step 5: Adding UI Libraries<a class="margin-fix" name="ui-libraries"></a>

The Appboy Windows SDKs can optionally be integrated without the following UI Libraries and Resource Dictionaries. However, In-App Messaging, the News Feed, and Feedback will be rendered inoperable. Please note that these UI elements are open source and [fully customizable][1]. We strongly recommend integration of these features.

### Adding the Library to Your Project:

__Note__:  If you are doing a Unity integration, your Appboy UI project should add references to the dlls that were output from the Unity build in the root directory of your project (not ones from nuget).  Do not use the nuget packages for your UI library integration for Windows Phone 8 Unity projects, as Unity does processing on our plugin DLLs and will not work with unprocessed DLLs.  The easiest way to maintain this is by either downloading the UI code (recommended Method 2: Directly Adding the Library) or creating a fork of our git directory (and maintaining as a forked submodule).

#### Method 1: Maintaining a Git Submodule (Recommended)

Appboy recommends maintaining a [git submodule][5] of the Windows Phone UI Library within your project. To add the submodule use the following command:

  ```
  git submodule add "git@github.com:Appboy/appboy-windows-phone-ui.git" Externals/AppboyUI.Phone/
  ```

Keeping a git submodule up-to-date requires running `git submodule update --init` when new versions are available.

#### Method 2: Directly Adding the Library

If you would prefer to avoid maintaining a git submodule; you may choose to download the code directly from the [Windows Phone UI Github Repository][6].

### Referencing the Library in Your Project:
To reference the library in your project:

1. Right Click on your project.
2. Click Add Reference.
3. Select the Appboy Phone UI to add it as a reference in your project.

## Step 6: Adding Style Resource Dictionaries to App.xaml<a class="margin-fix" name="resource-dictionaries"></a>

Next, add our style Resource Dictionaries to your Application's Resource Dictionary in `App.xaml`:
- Remember to replace `YOUR_PROJECT_NAME` with the name of your Phone Project (e.g. if your project is `MyApp.csproj`, use `MyApp`)

__Note__: If you've already added a `<ResourceDictionary.MergedDictionaries>` tag to your `App.xaml`, you may simply add our resource dictionaries into that tag
__Note__: If you already have resources as direct children of your `Application.Resources` tag, include them as children of a `<ResourceDictionary>` element and include that as a child of the `ResourceDictionary.MergedDictionaries` element.  Also, if you have any references to `ResourceDictionaries` in your `Application.Resources` element, move them to be children of the `ResourceDictionary.MergedDictionaries` element as well.

```xml
<Application.Resources>
<ResourceDictionary>
  <ResourceDictionary.MergedDictionaries>
  <!-- Applies the default Appboy stylesheet which contains styles for all of the AppboyUI UserControls -->
  <ResourceDictionary Source="/AppboyUI.Phone;component/Assets/Styles/Default.xaml"/>
 <!-- Applies your own custom stylesheet which overrides the default Appboy styles -->
  <ResourceDictionary Source="/YOUR_PROJECT_NAME;component/Assets/Styles/AppboyOverride.xaml"/>
  </ResourceDictionary.MergedDictionaries>
</ResourceDictionary>
</Application.Resources>
```

**Implementation Example**

See the following [`App.xaml` file in our Windows Sample Application][7].

## Step 7: Adding AppboyOverride.xaml to the /Assets/Styles Directory<a class="margin-fix" name="appboy-override-required"></a>

Add a resource dictionary named `Assets/Styles/AppboyOverride.xaml` to your project. This will enable you to customize styles of our UI elements.

- __Note__: It is necessary to add this style override file regardless of whether or not you intend to add custom styling to Appboy UI elements.

**Implementation Example**
See the following [`AppboyOverride.xaml` file in our Windows Sample Application][8].

## Step 8 (Optional): Install Test Apps for Sample Integrations<a class="margin-fix" name="install-test"></a>
Appboy provides Test Applications which you may clone, build and run at your convenience to test out our feature set. To install these apps:

1. Clone the root repository to a local drive with `git clone --recursive git@github.com:Appboy/appboy-windows-samples.git`
2. Make sure Nuget package restore is enabled for the solution. If it isn't, run `nuget restore TestApp.Phone.csproj`
3. Build the solution and test on a Windows Phone emulator or device.

## SDK Integration Complete

Appboy should now be collecting data from your application and your basic integration should be complete. Please see the following sections in order to enable custom event tracking, push messaging, the news-feed and the complete suite of Appboy features.

[1]: https://dashboard.appboy.com/app_settings/app_settings/ "App Settings"
[2]: https://github.com/Appboy/appboy-windows-samples/blob/master/Phone/AppboyConfiguration.xml
[3]: https://github.com/Appboy/appboy-windows-samples/blob/master/Phone/Properties/WMAppManifest.xml
[4]: https://github.com/Appboy/appboy-windows-samples/blob/master/Phone/App.xaml.cs
[5]: http://git-scm.com/docs/git-submodule
[6]: https://github.com/Appboy/appboy-windows-phone-ui
[7]: https://github.com/Appboy/appboy-windows-samples/blob/master/Phone/App.xaml
[8]: https://github.com/Appboy/appboy-windows-samples/blob/master/Phone/Assets/Styles/AppboyOverride.xaml
[9]: #install-nuget
[10]: #appboy-configuration
[11]: #Capabilities
[12]: #app-xaml-cs
[14]: #ui-libraries
[15]: #resource-dictionaries
[16]: #appboy-override-required
[17]: #install-test
