---
title: Initial SDK Setup
platform: Unity
subplatform: Windows Universal
---
# Initial SDK Setup

Integrating the Appboy Windows Universal Unity Plugin will provide you with analytics functionality, as well as push message and In-App message functionality.  Furthermore, it will provide user with Xaml controls for our News Feed and Feedback controls for custom integrations.

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
| __YES__ | `Plugins/Appboy/AppboyBinding.cs` | `/<your-project>/Assets/Plugins` |
| __YES__ | `Plugins/WindowsUniversalUnityAdapter.dll` | `/<your-project>/Assets/Plugins` |
| __YES__ | `Plugins/Metro` | `/<your-project>/Assets/Plugins/Metro` |

## Step 3: Ensuring the plugin was built correctly and completing integration

1.  Build your Unity project for the Windows Store platform.  Ensure that the DLLs from the `Assets/Plugins/Metro` folder and `WindowsUniversalUnityAdapter.dll` were copied to your project.
2.  Continue to do integration normally for a Windows Universal project.  Note that we provide native unity APIs under the `AppboyBinding` namespace for [User Data Collection methods][5] in Unity, as well as native Unity methods for submitting feedback and requesting slideup refreshes.  See `AppboyBinding.cs` for the full list of native methods.

## SDK Integration Complete

[1]: https://github.com/appboy/appboy-unity-sdk
[5]: /User_Data_Collection/Setting_User_IDs/Unity
[6]: https://github.com/Appboy/appboy-windows-universal-ui "Windows Universal UI Library"
