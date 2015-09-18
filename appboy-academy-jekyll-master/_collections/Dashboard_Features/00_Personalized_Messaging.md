---
title: Personalized Messaging
---
{% raw %}

# Personalized Messaging

Appboy allows you to personalize your campaigns by inserting user-specific information, such as the user's name, into messages. Campaign messages support templated messaging using the Liquid templating language. Detailed documentation of Liquid syntax and usage is available [here][1].

## Adding Personalizable Attributes

Appboy can automatically substitute values from a given user into your messages. Put your expression inside of two sets of curly brackets to notify Appboy that you'll be using an interpolated value. Inside of these brackets, any user values that you want to substitute must be surrounded by an additional set of brackets with a dollar sign in front of them. For example, if you include the following text in your message: "`{{${first_name}}}`", the appropriate value from the user will be interpolated when the message is sent. If you would like to use the value of a custom attribute, you must add the namespace "custom_attribute" to the variable. For example, to use a custom attribute named "zip code", you would include "`{{custom_attribute.${zip code}}}`" in your message.

The following user values can be substituted into a message:

- Basic information (e.g. `first_name`, `last_name`, `email_address`)
- [Custom Attributes][2]
- [Custom Event Properties][11]

You can also pull content directly from a web server via Appboy's [Connected Content][9] feature.

The full range of personalizable attributes are available from the campaign message composing screen by clicking the link titled "View All Attributes."

## Setting Default Values

We highly recommend that you use set default fallback values for any personalization attribute that you use in your messages. Default values can be added by specifying a [Liquid Filter][3] with the name "default." If a default value is not provided and the field is missing or not set on the user, the field will be blank in the message.

The example below shows the correct syntax for adding a default value. In this case, the words "Valued User" will replace the attribute `{{${first_name}}}` if a user's first_name field is blank or unavailable.

```
Hi {{${first_name} | default: 'Valued User' }}, thanks for using the App!
```

![Personalization][4]

## Conditional Logic
You can include many types of [intelligent logic within messages][1] -- one example is a conditional statement. See the following example which uses a [conditional][8] to handle multiple languages within a single campaign:

```
{% if ${language} == 'en' %}
This is a message in English from Appboy!
{% elsif ${language} == 'es' %}
Este es un mensaje en español de Appboy !
{% elsif ${language} == 'zh' %}
这是一条来自Appboy的中文消息。
{% else %}
This is a message from Appboy! This is going to go to anyone who did not match the other specified languages!
{% endif %}
```

### Aborting Messages
Optionally, you can also now abort messages within conditionals. For example:

```
{% if ${language} == 'en' %}
	Send this message in english!
{% elsif ${language} == nil %}
	{% abort_message() %}
{% endif %}
```

You can also have the abort_message log something to your Developer's Console log:

```
{% abort_message('Language was nil') %}
```

### HTTP Status Codes

You can utilize the HTTP status from a Connected Content call by first saving it as a local variable and then using the `__http_status_code__` key. For example:

```html
{% connected_content https://example.com/api/endpoint :save connected %}
{% if connected.__http_status_code__ != 200 %}
  {% abort_message('Connected Content returned a non-200 status code') %}
{% endif %}
```

__Note__: Be aware that this key will only be automatically added to the Connected Content object if the endpoint returns a JSON object. If the endpoint returns an array or other type, then that key cannot be set automatically in the response.

{% endraw %}

[1]: http://docs.shopify.com/themes/liquid-documentation/basics
[2]: https://documentation.appboy.com/User_Data_Collection/Best_Practices#attributeoverview
[3]: http://docs.shopify.com/themes/liquid-documentation/filters
[4]: /assets/img/Personalization_screenshot.png
[8]: http://docs.shopify.com/themes/liquid-documentation/tags/control-flow-tags "Control Flow Tags"
[9]: #connected-content
[10]: /assets/img/Connected_Content_Syntax.png "Connected Content Syntax Usage Example"
[11]: /Data_and_Analytics/#custom-event-properties
