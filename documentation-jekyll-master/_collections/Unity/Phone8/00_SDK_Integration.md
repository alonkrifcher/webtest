---
title: Initial SDK Setup
platform: Unity
subplatform: Windows Phone8
---
# Initial SDK Setup

Integrating the Appboy Windows Phone 8 Unity Plugin will provide you with analytics functionality, as well as push message and In-App message functionality.  Furthermore, it will provide user with Xaml controls for our News Feed and Feedback controls for custom integrations.

Before you can start using Appboy in your Unity scripts, you'll need to import the plugin files to your Unity project.

__Time Estimate: 20-30 Minutes__

## Step 1: Cloning the Unity SDK

Clone the [Appboy Unity SDK Github project][1]

```bash
$ git clone git@github.com:Appboy/appboy-unity-sdk.git
```

## Step 2: Copying Required Plugins

| Are you using other plugins? | What to Copy | Where to Copy |
| ---------------------------- | ------------ | ------------- |
| __NO__ | the `Plugins` directory from the Unity SDK | the `Assets` folder of your Unity Project |
| __YES__ | `Plugins/AppboyBinding.cs` | `/<your-project>/Assets/Plugins` |
| __YES__ | `Plugins/WindowsPhone8UnityAdapter.dll` | `/<your-project>/Assets/Plugins` |
| __YES__ | `Plugins/WP8` | `/<your-project>/Assets/Plugins/WP8` |

## Step 3: Ensuring the plugin was built correctly and completing integration

1.  Build your Unity project for the Windows Phone 8 platform.  Ensure that the DLLs from the `Assets/Plugins/WP8` folder and `WindowsPhone8UnityAdapter.dll` were copied to your C# project folder.
2.  Continue to do integration normally for a Windows Phone 8 project.  We provide native unity APIs under the `AppboyBinding` namespace for [User Data Collection methods][5] in Unity, as well as native Unity methods for submitting feedback and requesting in-app message(slideup) refreshes.  See `AppboyBinding.cs` for the full list of native methods.
3.  Note that when you add components requiring the [Windows Phone 8 UI library][6] (e.g. in-app messages, feedback or the newsfeed) you should ensure that the UI library and your project are building against the DLLs that Unity processed and put in the project directory (not the DLLs that our UI library would try to pull from nuget by default).  You can accomodate this by downloading the ui library source code and manually modifying the references to point to the local DLLs, or you can fork our [UI library from github][6] and modify the references there.

## SDK Integration Complete

[1]: https://github.com/appboy/appboy-unity-sdk
[5]: /User_Data_Collection/Setting_User_IDs/Unity
[6]: https://github.com/Appboy/appboy-windows-phone-ui "Windows Phone 8 UI Library"
