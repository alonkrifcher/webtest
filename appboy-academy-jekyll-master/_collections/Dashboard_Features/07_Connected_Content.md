---
title: Connected Content
---
# Connected Content

{% raw %}

Appboy's Connected Content feature expands on marketing personalization to boost customer engagement and conversions.  This feature allows you to insert any information accessible via API directly into messages you send to users. Connected Content allows for pulling content either directly from your web server or from publicly accessible APIs.

## Making an API Call

Messages sent by Appboy can hit a web server to pull content to be included in a message using the `{% connected_content %}` tag. The `connected_content` tag simply gets the content at that web address and directly inserts it. For example, this message body will hit the url `http://numbersapi.com/random/trivia` and include a fun trivia fact in your message:

```
Hi there, here is fun some trivia for you!: {% connected_content http://numbersapi.com/random/trivia %}
```

You can also include attribute variables in the URL string to allow Appboy to hit your web service with the right parameters. As an example, you may have a web service that returns content based on a user's attributes.

```
Hi, here are some articles that you might find interesting:

{% connected_content http://www.yourwebsite.com/articles?email={{${email_address}}}&user_id={{${user_id}}} %}
```

If the URL cannot be reached, Appboy will render an empty string in its place. Because Appboy delivers messages at a very fast rate, be sure that your server can handle thousands of concurrent connections so we do not overload your server when pulling down content. If you are using a public API, be sure that your usage will not violate any rate-limiting that the API provider may employ. Appboy requires that server response time is less than 2 seconds for performance reasons. If the server takes longer than 2 seconds to respond, the content will not be inserted. If the endpoint returns JSON, you can detect that by checking if the `connected` value is null, and then [conditionally abort the message][1]. Additionally, Connected Content messages are processed with lower priority in our systems as not to roadblock other messaging campaigns due to long response times from servers. As a result, you may notice that delivery on Connected Content messages are slightly slower than other messages you send normally.

__Note:__ Attribute values must be surrounded by `${}` in order to operate properly within Appboy's version of Liquid Syntax.
__Note:__ Connected Content is not turned on for accounts by default. If you're interested in using Connected Content, please contact [success@appboy.com](mailto:success@appboy.com)

## Local Connected Content Variables
Appboy makes a standard GET request to the endpoint specified within the `connected_content` tag. If the endpoint returns JSON, it is automatically parsed and stored in a variable called `connected`. If the endpoint returns text, it will be directly inserted into the message in place of the `connected_content` tag.

You can also specify `:save your_variable_name` after the url in order to save the data as something else. For example, the following `connected_content` tag will store the response to a local variable called `localweather`:

```
{% connected_content http://api.openweathermap.org/data/2.5/weather?zip=10001 :save localweather %}
```

__Note:__ The stored variable can only be accessed within the field which contains the `connected_content` request. For example, if you wanted to use the `localweather` variable in both the message and title field, you should make the `connected_content` request within both fields. Rest assured however, that if the request is identical, Appboy will use a cached value rather than making a second request to the server.

### JSON Parsing
Connected Content also allows you to parse through any JSON object you save as a local variable. For example, let's imagine you save the following JSON object as a local variable called `localweather`.

```json
{"coord":{"lon":139,"lat":35},
"sys":{"country":"JP","sunrise":1369769524,"sunset":1369821049},
"weather":[{"id":804,"main":"rain","description":"overcast clouds","icon":"04n"}],
"main":{"temp":289.5,"humidity":89,"pressure":1013,"temp_min":287.04,"temp_max":292.04},
"wind":{"speed":7.31,"deg":187.002},
"rain":{"3h":0},
"clouds":{"all":92},
"dt":1369824698,
"id":1851632,
"name":"Shuzenji",
"cod":200}
```

You could see whether or not it was raining by referencing `{{localweather.weather[0].main}}` which if used on the above object would return `rain`. The following image illustrates the type of syntax highlighting you should see in the dashboard if you're setting things up correctly. It also demonstrates how you could leverage the `connected_content` request above!

![Connected Content Syntax Example][6]

If the API responded as before with {{localweather.weather[0].main}} returning 'rain', the user would then receive this push.

![Connected Content Push Example][17]

### HTTP Status Codes

You can utilize the HTTP status from a Connected Content call by first saving it as a local variable and then using the `__http_status_code__` key. For example:

```html
{% connected_content https://example.com/api/endpoint :save connected %}
{% if connected.__http_status_code__ != 200 %}
  {% abort_message('Connected Content returned a non-200 status code') %}
{% endif %}
```

__Note__: Be aware that this key will only be automatically added to the Connected Content object if the endpoint returns a JSON object. If the endpoint returns an array or other type, then that key cannot be set automatically in the response.

## Configurable Caching
Connected content will cache the value it returns from a given endpoint for a minimum of 5 minutes. If a cache time is not specified, the default cache time is also 5 minutes. However, this cache time can be configured to be longer. For example:

```
#  Will cache for 900 seconds (15 minutes)
{% connected_content https://example.com/webservice.json :cache 900 %}
```

## Aborting Messages {#aborting-connected-content}
Using Liquid templating, you have the option of aborting messages within conditionals. For example:

```
{% connected_content https://example.com/webservice.json %}
   {% if connected.recommendations.size < 5 or connected.foo.bar == nil %}
     {% abort_message() %}
   {% endif %}
```

You can also have the abort_message log something to your Developer's Console log:

`{% abort_message('Could not get enough recommendations') %}`
{% endraw %}

## Public APIs

There are a variety of publically available APIs that can be used for Connected Content. As seen in the examples above, public APIs allow you to insert custom data in messages.  We've compiled a list below of public APIs that could be used for Connected Content. However, there are many more APIs out there, providing a wide variety of potential Connected Content uses.  [Let us know](mailto:success@appboy.com) if you have an API to share!  

__Note__: Public APIs can be subject to usage restrictions and rate limiting.  Be sure to read through API documentations and contact API providers about your intended use.

### News and Information

|	 API 	| Description |
| --------- | --- |
| [OpenWeatherMap][7] | Provides current weather data, 5 and 16 day forecast, and historical data. |
| [NYT Article Search][8] | Provides NYT article data which includes headline, topic, URL, date, abstract, etc. |
| [The Guardian API][9] | Provides Guardian article data which includes headline, topic, URL, date, abstract, etc.|
| [Alchemy][10] | Provides data from an index of 250-300 thousand news articles and blogs. |


### Events and Ticketing

|	 API 	| Description |
| --------- | --- |
| [SeatGeek][11]| Provides ticket information for concerts, sports, and theater events.  |
| [OnConnect][12] | Provides box-office movie information and showtimes in US and Canadian theaters. |
| [Eventbrite][19] | Provides data on a variety of public events. |
| [Eventful][20] | Provides data on a variety of public events |

### Music

|	 API 	| Description |
| --------- | --- |
| [Last.fm][14] | Provides a variety of music data including artist information, recommended artists, and more. |
| [iTunes][24] | Provides data on a variety of items in the iTunes, App Store, and iBooks stores. |
| [Bands in Town][13] | Provides local concert information and recommends live music events. |
| [Songkick][22] | Provides live music information with artists, venues, locations, etc. |
| [Discogs][21] | Provides information on artists, labels, and recordings. |

### Product Information

|	 API 	| Description |
| --------- | --- |
| [Semantics3][25] | Provides product metadata in a variety of categories. |
| [Factual][26] | Provides various product data including nutrition and ingredients data. |
| [eBay][15] | Provides live eBay data including item data, popular searches, and more. |

### Miscellaneous

|	 API 	| Description |
| --------- | --- |
| [Yahoo Finance][23] | Provides a variety of stock data. |
| [Numbers API][18] | Provides random numerical trivia facts. |
| [Clearbit][27] | Provides company logo images. |
| [London Unified][28] and [NYC MTA][29] | Provide realtime public transit data including line statuses, arrival times, etc. |

[1]: #aborting-connected-content
[6]: /assets/img/Connected_Content_Syntax.png "Connected Content Syntax Usage Example"
[7]: http://openweathermap.org/api
[8]: http://developer.nytimes.com/docs/read/article_search_api_v2
[9]: http://open-platform.theguardian.com/documentation/
[10]: http://alchemyapi.readme.io/v1.0/docs/introduction
[11]: http://platform.seatgeek.com/
[12]: http://developer.tmsapi.com/docs/read/data_v1_1/movies/Movie_showtimes
[13]: http://www.bandsintown.com/api/overview
[14]: http://www.last.fm/api
[15]: http://developer.ebay.com/devzone/shopping/docs/Concepts/ShoppingAPIGuide.html
[16]: [success@appboy.com](mailto:success@appboy.com)
[17]: /assets/img/connected_weather_push.png "Connected Content Push Usage Example"
[18]: http://numbersapi.com/
[19]: http://developer.eventbrite.com/
[20]: http://api.eventful.com/
[21]: http://www.discogs.com/developers/
[22]: http://www.songkick.com/developer
[23]: http://www.enclout.com/api/v1/yahoo_finance
[24]: http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html
[25]: http://www.semantics3.com/products/pull
[26]: http://factual.com/products/cpg  
[27]: http://blog.clearbit.com/logo
[28]: http://api.tfl.gov.uk/#Line
[29]: http://datamine.mta.info/