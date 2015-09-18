---
title: Campaigns in Multiple Languages
---
{% raw %}

# Campaigns in Multiple Languages

Appboy allows you to send messages in different languages from our Dashboard. When composing a campaign, our language templating feature enables you to easily create one message that appears in different languages depending on the user's phone settings.

Here's how you can set up a message in multiple languages:

## Step 1: Feature Opt-In
Click on the "Add Languages" button when composing your campaign.

![Add Languages][1]

## Step 2: Select Languages
__Select the languages that your message will be in.__ The selections offered in the dropdown menu will be all of the languages that your users currently have. Appboy automatically tracks the language in users' device settings and includes this information in each user's profile. After you select your languages, the snippet textbox will alter to feature a template that you can copy and paste into the content of your message. This template uses [conditional logic][3] to handle multiple languages in a single campaign.

![Select Languages][2]

## Step 3: Select Fields
__Select the fields that you want to appear in different languages.__ These fields will differ depending on the message channel:

- Email: Subject and body
- Android Push: Message, Title, Summary Text, Sound, and Custom URL
- iOS Push: Message, Sound, and Custom URL
- In-App Message: Message
- Windows Universal Push: Text 1, Text 2, Text 3, and Image Name
In addition, a warning will display if you have already entered content in any of the selected fields. You can choose to replace existing content with the templated text, or insert the templated text after the existing text.

![Select Fields][4]

## Step 4: Insert Fields
__Using the buttons at the bottom of the dialogue, choose how you wish to insert the templated text into the message composer. Or, copy and paste the template into the desired location.__

## Step 5: Add Language Variations
__After your templated text is inserted into the desired fields, type in different variations for each language.__ For each field where there is templating, you should enter the variations after bracketed segment of templating. The variation should correspond to the language code referenced in the brackets before it. For instance, in the message's body, this might look like:

```
{% if ${language} == 'en' %}
Hello!
{% elsif ${language} == 'fr' %}
Bonjour!
{% else %}
Hello!
{% endif %}
```

In the title of an Android push, this might look like:
```
{% if ${language} == 'en' %}Hello!{% elsif ${language} == 'fr' %}Bonjour!{% else %}Hello!{% endif %}
```

The text you enter after `{% else %}` will display to users who:
- Have a language that was not selected in Step 2.
- Have a language that is not supported by Appboy. Appboy supports all of the languages represented by [ISO 639-1 two letter codes][5].
- Have a device where the language is undetectable. (This is highly unlikely).
A best practice is to enter text here that you think your users are most likely to understand. To ensure smooth delivery, you should always enter content after `{% else %}`.

Anything entered outside of the template block will behave like normal content and display for all users.

![Type Variations][6]

## Step 6: Preview Message
Click the Personalized Preview button and enter a user's ID or email to see how the message would appear to that individual, depending on his or her language. In addition, you'll be able to see how your entire message looks as a whole and decide whether to add languages to more fields than the ones you had previously chosen.

![Preview Message][7]

## Step 7: Finish Campaign
__Continue through the remaining steps of message creation.__ This includes finishing composing the message (for instance, editing Advanced Settings).

{% endraw %}

[1]: /assets/img/languages_1.png
[2]: /assets/img/languages_2.png
[3]: https://academy.appboy.com/Quick_Wins/Personalized_Messaging#conditionals
[4]: /assets/img/languages_3.png
[5]: http://www.loc.gov/standards/iso639-2/php/code_list.php
[6]: /assets/img/languages_5.png
[7]: /assets/img/languages_6.png
