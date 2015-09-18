---
title: Creating a Webhook
---
# Creating a Webhook

## Feature Overview

Creating a webhook campaign or including a webhook in a multichannel campaign allows you to trigger non-app actions. More specifically, [webhooks][14] can be used to provide other systems and applications with real-time information. You can use webhooks to send information to systems such as Salesforce or Marketo. You can also use webhooks to send information to your backend systems. For example, you might want to credit your customers account with a promotion once they’ve performed a custom event a certain number of times.

## Creating a Webhook

### Step 1: Create a New Campaign

From the campaign page, create a new campaign.

### Step 2: Enter the URL for Your Webhook

#### HTTP URL
Enter the HTTP URL. This HTTP URL specifies your endpoint. The endpoint is the place where you’ll be sending the information that you’re capturing in the webhook. If you’d like to send information to a vendor, the vendor should provide this URL in their API documentation. If you’re sending information to your own systems, check with your development or engineering team to ensure that you’re using the correct URL.

![Webhook_Url][21]

#### Personalization

[Personalization][15] is supported in our HTTP URLs. At times, certain endpoints may require you to identify a user or provide user-specific information as part of your URL. You’ll want to be sure to include a [default value][19] for each piece of user specific information that you use in your URL.

#### Internationalization

[Internationalization][16] is supported in the URL and the request body. To internationalize your message, click 'add languages' and fill out the flyout.

### Step 3: Create the Request Body

Create the body of your webhook request. This is the information that will be sent to the URL that you specified. There are two ways to create the body of your web hook request:

#### JSON Key/Value Pairs

JSON Key/Value Pairs allow you to easily write a request for an endpoint that expects a JSON format. Do note that you can only use this feature with an endpoint that expects a JSON request. For example, if your key is “message_body,” the corresponding value might be “Your order just arrived.” Once you’ve entered your key value pair, the composer will configure your request in JSON syntax and a preview of your JSON request will automatically populate.

![Webhook_JSON][21]

#### Raw Text

The raw text option gives you the flexibility to write a request for an endpoint that expects a body of any format. For example, you might use this feature to write a request for an endpoint that expects your request to be in XML format.

![Webhook_RawText][22]

#### Personalization

[Personalization][15] is supported in both the JSON Key/Value Pairs option and the raw text option. You can include any user attribute, [custom attribute][17] or [event property][18] in your request. For example, you can include a customer’s first name and email in your request. Don’t forget to include a [default value][19] for each attribute.

#### Internationalization

[Internationalization][16] is supported in raw text.

### Step 4: Request Headers and HTTP Method

Certain endpoints may require that you include headers in your request. In the settings section of the composer, you can add as many headers as you’d like. Common use cases for request headers include a content type specification (e.g XML or JSON) and authorization headers that contain your credentials with your vendor or system.

The HTTP Method that you should use will vary depending on the endpoint to which you are sending information. The majority of  the time, you’ll be using POST.

![Webhook_Request_Header][26]

### Step 5: Continue Campaign Creation
Continuing creating your campaign the way that you normally would. As with all of our message types, you can preview what your request will look like for a particular user, random user or user with specific attributes in the preview section of the webhook composer.

## Example Use Case

### About Twilio

For this example, we'll be using Twilio's [message sending API][20]. Twilio is a texting service with an API endpoint that allows you to text a particular message to a phone number. You can use Twilio’s API and Appboy’s webhooks to create a webhook campaign that will send users a text message after they purchase an item. We’ll go through the process of setting this campaign up in Appboy.

### Twilio’s Documentation

To get started, you should examine the documentation provided to you by the endpoint that you’re sending your information to. In this case, Twilio has a section that shows you the parameters that you'll need to include in your request and how they should be formatted. These screenshots are from a Twilio test account.

![Twilio_Documentation][27] 

### HTTP URL

The HTTP URL is specified by Twilio in the first line of the request. The URL contains your account number as well as some other information.

![Twilio_Doc][28]

### Request Body

The Twilio API expects the request body to be URL encoded, so that's what we'll show in this example. In this case, the required parameters for the body of the request are To, From and Body.  The screenshot below is an example of what your request might look like if you are sending a message to each user’s SMS phone number, from a trial send code and with the body “webhook demo.” This example only works if you have recorded each users SMS phone number as a custom attribute. Additionally,  you’ll want to include our url_param_escape liquid filter in your custom attribute template. This filter encodes a string such that none of the characters are disallowed in the body of a request that is written in encoded URL. For example, the plus character is disallowed in URL encoded parameters, so this filter will convert the value "+12126875309" to "%2B12126875309", but the Twilio API will understand "%2B" as "+".

![Webhook Body][29]

### Request Headers and Method

Twilio requires two request headers, a header that specifies the content type of the request as well as an [HTTP Basic Authentication][32] header. Basic Authentication requires that you encode credentials in base64, which is why we used our liquid Base64 filter in the header value: Basic {{ 'userName:password' | base64_encode }}. In other words, the syntax used to wrap the authorization credentials tells liquid, Appboy’s templating language, to encode your credentials before passing them to Twilio.

Twilio’s documentation specifies that the request method should be a post, so that’s what we’ll put.

![Webhook Method][30]

### Preview Your Request

You can preview the request for a random user, or for a user with particular credentials, to ensure that the request is rendering properly.

![Webhook Preview][31]

### Continue Creating Your Campaign

Continue creating your campaign as you normally would.

[14]: https://sendgrid.com/blog/whats-webhook
[15]: #personalized-messaging
[16]: /Campaign_Ideas_and_Strategies/#campaigns-in-multiple-languages
[17]: https://documentation.appboy.com/User_Data_Collection/Best_Practices#attributeoverview
[18]: /Data_and_Analytics/#custom-event-properties
[19]: #setting-default-values
[20]: https://www.twilio.com/docs/api/rest/sending-messages
[21]: /assets/img/webhook_JSON1.png
[22]: /assets/img/RawText_Body.png
[26]: /assets/img/Webhook_Request_Header.png
[27]: /assets/img/Twilio_Documentation.png
[28]: /assets/img/Twilio_Doc.png
[29]: /assets/img/Webhook_Body.png
[30]: /assets/img/Webhook_Method.png
[31]: /assets/img/Webhook_Preview.png
[32]: https://en.wikipedia.org/wiki/Basic_access_authentication#Client_side
