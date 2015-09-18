---
title: App Group Configuration
---
# App Group Configuration

Appboy organizes your apps via "App Groups." Think of each of these app groups as an individual title. For example, you should group the iOS and Android version of the same application or a free and paid version. These two apps should be in the same group to allow for ease of navigation, segmentation, and messaging across both platforms.

__Time Estimate: 4 Minutes__

## Creating your App Group in "My Apps"

### Step 1: Click on the "<i class='icon-plus'> </i>  Add App Group" button in the sidebar

![Add App Group][3]

Type the name of your app group into the form.

Once you have created your app group, you will be taken to the app settings page. Generally, you can access this page by navigating to the apps tab at the top of the page and pressing the <i class='icon-cog'></i> icon on the sidebar.

![Appboy App Settings][4]

### Step 2: Add Your Apps

Using the form at the top right of your screen, select your platform, type in the name of your app, and click "Add App"

- If your app has not been published yet, you can add the app by simply typing the name
- Once your app is published, you will be able to update the iTunes ID or Android package name for automatic name and image refreshes
- After adding your app, you will have access to its API key, which you will need to complete SDK integration.
	- You must create separate app instances for each version of your your app on each platform. For example, if you have Free and Pro versions of your app on both iOS and Android you will have 4 app instances within your app group and must use the appropriate API key that is generated for each app.

![Appboy API Input][5]

### Step 3: Add a Testing App Group

Appboy recommends that you create a "Testing App Group" for integration and campaign testing. The App Group feature can also be utilized for app testing by completely sandboxing certain users from your production instance. Simply create a new app group and remember to switch your API codes so your production environments are not corrupted with false data. When you publish your application, be sure to change the API key that Appboy is using to match that of your "Production App Group" rather than your "Testing App Group"

![App Testing Groups][6]

[3]: /assets/img/addappgroup.gif
[4]: /assets/img/new_app_landing.png "Appboy App Settings"
[5]: /assets/img/App_Setup_API.png "Appboy API Input"
[6]: /assets/img/app_testing_groups.png "Group Testing"
