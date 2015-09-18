---
title: Tracking Custom Events
platform: Web
---
# Tracking Custom Events

__Please Note!__ The Appboy Web SDK is currently in beta. If you have any questions, please contant support@appboy.com.

You can record custom events in Appboy to learn more about your app's usage patterns and to segment your users by their actions on the dashboard.

Before implementation, be sure to review examples of the segmentation options afforded by Custom Events vs. Custom Attributes vs Purchase Events in our [Best Practices section][0].

# Adding A Custom Event
__Time Estimate: 2 Minutes__

```javascript
appboy.logCustomEvent(YOUR_EVENT_NAME);
```

See the [logCustomEvent documentation][1] for more information.

## Adding Properties

You can optionally add metadata about custom events by passing a properties object with your custom event.

Properties are defined as key-value pairs.  Keys are strings and values can be `string`, `numeric`, `boolean`, or [`Date`][3] objects.

```javascript
appboy.logCustomEvent(YOUR_EVENT_NAME, {key: 'value'});
```

See the [logCustomEvent documentation][1] for more information.

[0]: /User_Data_Collection/Best_Practices "Best Practices & Segmentation"
[1]: https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#.logCustomEvent

</article>
</div>
<div class="signpost">
  <div class="title">
    <img src="/assets/img/cap.png">
    <br>
    Customizing Appboy
  </div>
  Completed Step 2 of 2<br>
    <div class="post">
        <a href="/User_Data_Collection/Attribute_Tracking/Web" class="back"><i class='icon-arrow-left'></i> Previous Step</a>  <a href="/Enabling_Message_Channels/Push_Notifications/Web" class="fwd">Next Part <i class='icon-arrow-right'></i></a>
    </div>
    <div class="clear"></div>
    <div class="postdesc">
        <div class="backdesc"><strong>Step 1: </strong>Recording Attributes</div><div class="fwddesc"><strong>Part 3: </strong>Enabling Messaging Channels (0-30 Mins)</div>
    </div>
    <div class="clear"></div>
</div>
