---
title: User Data
---
# User Data

The User API allows you to track information on your users by logging data about your users that comes from outside your mobile app. You can also use this API to delete users for testing or other purposes.

## User Track Endpoint

This endpoint can be used to record custom events, user attributes, and purchases for users. You can include up to 50 Attributes, Event, and Purchase Objects per request.

### User Track Request

```json
POST https://api.appboy.com/users/track
Content-Type: application/json
{
   "app_group_id" : (required, string) see App Group Identifier below,
   "attributes" : (optional, array of Attributes Object),
   "events" : (optional, array of Event Object),
   "purchases" : (optional, array of Purchase Object)
}
```

__Note__: Customers using the API for server-to-server calls may need to whitelist `api.appboy.com` if they're behind a firewall.

###  User Attributes Object Specification

An API request with any fields in the Attributes Object will create or update an attribute of that name with the given value on the specified user profile. Use the Appboy User Profile Field names below to update those special values on the user profile in the dashboard or add your own custom attribute data to the user.

```json
{
  "external_id" : (required, string) see External User ID below,
  // Setting this flag to true will put the API in "Update Only" mode. Attributes objects regarding
  // external_ids which Appboy is unaware of will return a non-fatal error. See Server Responses for details.
  "_update_existing_only" : (optional, boolean),
  // See note below regarding legacy push token importation
  "push_token_import" : (optional, boolean).
  // Appboy User Profile Fields
  "first_name" : "Jon",
  "email" : "bob@example.com",
  // Custom Attributes
  "my_custom_attribute" : value,
  "my_custom_attribute_2" : {"inc" : int_value},
  "my_array_custom_attribute":[ "Value1", "Value2" ],
  // Adding a new value to an array custom attribute
  "my_array_custom_attribute" : { "add" : ["Value3"] },
  // Removing a value from an array custom attribute
  "my_array_custom_attribute" : { "remove" : [ "Value1" ]},
}
```

__Note:__ `"push_token_import"` should be set to `true` if you are importing push tokens from outside of Appboy without a UserID. This will create temporary user profiles with those push tokens and no device information so you can maintain your effective reach while transitioning solutions. As users come into an Appboy enabled version of their app, their push tokens will be moved over to new user profiles, and the extraneous temporary profiles will be cleaned up automatically. `external_id` should NOT be specified if you use this solution and the attribute object must contain a push token.

#### Custom Attribute Data Types

The following data types can be stored as a custom attribute:

- Dates (Must be stored in the [ISO 8601][19] format)
- Strings
- Floats
- Booleans
- Integers
  - Integer custom attributes may be incremented by positive or negative integers by assigning them an object with the field "inc" and the value by which you would like to increment them.
    - Example: `"my_custom_attribute_2" : {"inc" : int_value},`
- Arrays
  - In addition to setting the values of an array by saying something like `"my_array_custom_attribute":[ "Value1", "Value2" ]` you may add to existing arrays by doing something like `"my_array_custom_attribute" : { "add" : ["Value3"] },` or remove values from an array by doing something like `"my_array_custom_attribute" : { "remove" : [ "Value1" ]}`

For information regarding when you should use a Custom Event vs a Custom Attribute, see our [Best Practices - User Data Collection][15] documentation.

#### Appboy User Profile Fields

| User Profile Field | Data Type Specification |
| ---------------------| --------------- |
| `first_name` | string |
| `last_name` | string |
| `email` | string |
| `dob` | (Date of Birth) string in format "YYYY-MM-DD", e.g., 1980-12-21 |
| `country` | string, we require that country codes be passed to Appboy in the [ISO-3166-1 alpha-2 standard][17] |
| `language` | string, we require that language be passed to Appboy in the [ISO-639-1 standard][24] |
| `home_city` | string |
| `current_location` | object of the form {"longitude": -73.991443, "latitude": 40.753824} |
| `bio` | string |
| `gender` | string, "M" or "F" |
| `phone` | string of digits |
| `email_subscribe` | string, available values are "opted_in" (explicitly registered to receive email messages), "unsubscribed" (explicitly opted out of email messages), and "subscribed" (neither opted in nor out).  |
| `push_subscribe` | string, available values are "opted_in" (explicitly registered to receive push messages), "unsubscribed" (explicitly opted out of push messages), and "subscribed" (neither opted in nor out).  |
| `image_url` | string, url of image to be associated with user profile |
| `push_tokens` | array of objects with `app_id` and token string, e.g., `[{"app_id": App Identifier, "token": "abcd"}]` |
| `facebook` | array of `id` (string), `likes`, `num_friends` (integer) |
| `twitter` | array of `id` (integer), `screen_name` (string, Twitter handle), `followers_count`, `friends_count`, `statuses_count` (integers) |
| `foursquare_access_token` | string, Foursquare OAuth3 token |
| `foursquare` | __reserved__, __do not use__ |

__Note__: For the importation of push tokens, it is only possible to import one push token per user, per app. That is, you can import a user's push token for an iOS app and for an Android app in the same app group, but you cannot import two push tokens for a user for a single iOS app (e.g., tokens for that user's iPad and iPhone devices). Multiple device push tokens for the same app for a single user is only supported by the Appboy SDK.

Be aware that while you can import language, information Appboy receives from the device takes precedence, and if different, will replace the imported value the next time the user opens your app.

####  User Attribute Example Request

```json
POST https://api.appboy.com/users/track
Content-Type: application/json
{
  "app_group_id" : "your app group ID",
  "attributes" : [
    {
      "external_id" : "user1",
      "first_name" : "Jon",
      "has_profile_picture" : true,
      "dob": "1988-02-14",
      "music_videos_favorited" : { "add" : [ "calvinharris-summer" ], "remove" : ["nickiminaj-anaconda"] }
    },
    {
      "external_id" : "user2",
      "first_name" : "Jill",
      "has_profile_picture" : false,
      "push_tokens": [{"app_id": App Identifier, "token": "abcd"}]
    }
  ]
}
```

This example contains two User Attribute objects of the allowed 50 per API call.

### Event Object Specification

```json
{
  "external_id" : (required, string) see External User ID below,
  "app_id" : (optional, string) see App Identifier below,
  "name" : (required, string) the name of the event,
  "time" : (required, datetime as string in ISO 8601),
  "properties" : (optional, Properties Object) properties of the event
  // Setting this flag to true will put the API in "Update Only" mode. Event objects regarding
  // external_ids which Appboy is unaware of will return a non-fatal error. See Server Responses for details.
  "_update_existing_only" : (optional, boolean)
}
```

Each Event Object in the _events_ array represents a single occurrence of a Custom Event by a particular user at a particular time.

- [ISO 8601 Time Code Wiki][19]

For information regarding when you should use a Custom Event vs a Custom Attribute, see our [Best Practices - User Data Collection][15] documentation.

#### Event Example Request

```json
POST https://api.appboy.com/users/track
Content-Type: application/json
{
  "app_group_id" : "your app group ID",
  "events" : [
    {
      "external_id" : "user1",
      "app_id" : "your-app-id",
      "name" : "watched_trailer",
      "time" : "2013-07-16T19:20:30+01:00"
    },
    {
      "external_id" : "user1",
      "app_id" : "your-app-id",
      "name" : "rented_movie",
      "time" : "2013-07-16T19:20:45+01:00"
    }
  ]
}
```


###  Purchase Object Specfication

```json
{
  "external_id" : (required, string) see External User ID below,
  "app_id" : (optional, string) see App Identifier below,
  "product_id" : (required, string) identifier for the purchase, e.g. SKU,
  "currency" : (required, string) ISO 4217 Alphabetic Currency Code,
  "price" : (required, float) value in the base currency unit (e.g. Dollars for USD, Yen for JPY),
  "quantity" : (optional, integer) the quantity purchased (defaults to 1, must be <= 100 -- currently, Appboy treats a quantity _X_ as _X_ separate purchases with quantity 1),
  "time" : (required, datetime as string in ISO 8601),
  "properties" : (optional, Properties Object) properties of the event
  // Setting this flag to true will put the API in "Update Only" mode. Event objects regarding
  // external_ids which Appboy is unaware of will return a non-fatal error. See Server Responses for details.
  "_update_existing_only" : (optional, boolean)
}
```
Each Purchase Object in the _purchases_ array represents a single purchase by a particular user at a particular time.

- [ISO 4217 Currency Code Wiki][20]


#### Purchase Example Request

```json
POST https://api.appboy.com/users/track
Content-Type: application/json
{
  "app_group_id" : "your-app-group-id",
  "purchases" : [
    {
      "external_id" : "user1",
      "app_id" : "11ae5b4b-2445-4440-a04f-bf537764c9ad",
      "product_id" : "backpack",
      "currency" : "USD",
      "price" : 40.00,
      "time" : "2013-07-16T19:20:30+01:00",
      "properties" : {
        "color" : "red",
        "monogram" : "ABC",
        "checkout_duration" : 180
      }
    },
    {
      "external_id" : "user1",
      "app_id" : "11ae5b4b-2445-4440-a04f-bf537764c9ad",
      "product_id" : "pencil",
      "currency" : "USD",
      "price" : 2.00,
      "time" : "2013-07-17T19:20:20+01:00",
      "properties" : {
        "number" : 2,
        "sharpened" : true
      }
    }
  ]
}
```

### Properties Object

Custom events and purchases may have event properties. The "properties" values should be an Object where the keys are the property names and the values are the property values. Property names must be non-empty strings less than or equal to 255 characters, with no leading dollar signs. Property values can be integers, floats, booleans, datetimes (as strings in ISO8601), or strings less than or equal to 255 characters.

### User Track Responses

Upon using any of the aforementioned API requests you should receive one of the following three general responses:

#### Successful Message

Successful messages will be met with the following response:

```json
{
  "message" : "success"
}
```

#### Successful Message with Non-Fatal Errors

If your message is successful but has non-fatal errors such as one invalid Event Object out of a longer list of events you will receive the following response:

```json
{
  "message" : "success",
  "errors" : [<minor error message>]
}
```

#### Update Only Non-Fatal Errors

If you set `'_update_existing_only': true,` then you may see non fatal errors which return the index of  attribute objects for which Appboy didn't have an existing user:

```json
{
  "type" : "external_id is not an existing user",
  "input_array" : "attributes",
  "index" : 0
}
```

#### Message with Fatal Errors

In the case of a success, any data that was not affected by an error in the _errors_ array will still be processed. If your message has a fatal error you will receive the following response:

```json
{
  "message" : <fatal error message>,
  "errors" : [<minor error message>]
}
```

#### Queued Responses

During times of maintenance, Appboy might pause real-time processing of the API. In these situations, the server will return an HTTP Accepted 202 response code and the following body, which indicates that we have received and queued the API call but have not immediately processed it. All scheduled maintenance will be posted to [http://status.appboy.com](http://status.appboy.com) ahead of time.

```json
{
  "message" : "queued"
}
```

#### Fatal Error Response Codes

The following status codes and associated error messages will be returned if your request encounters a fatal error. Any of these error codes indicate that no data will be processed.

| Error Code | Reason / Cause |
| ---------------------| --------------- |
| 400 Bad Request | Bad Syntax |
| 401 Unauthorized | Unknown or missing app group id |
| 404 Not Found | Unknown App Group ID (if provided) |
| 429 Rate Limited | Over rate limit |
| 5XX | Internal server error, you should retry with exponential backoff |


###  Importing Legacy User Data

You may submit data through the Appboy API for a user who has not yet used your mobile app in order to generate a user profile. If the user subsequently uses the application all information following their identification via the SDK will be merged with the existing user profile you created via the API call. Any user behavior that is recorded anonymously by the SDK prior to identification will be lost upon merging with the existing API generated user profile.

The segmentation tool will include these users regardless of whether they have engaged with the app. If you want to exclude users uploaded via the User API whom have not yet engaged with the app you should add the filter -- Session Count > 0.

## User Delete Endpoint

This endpoint allows you to delete any user and all their associated data by specifying their external identifier (UserID). Up to 50 `external_ids` can be included in a single request. Note that this action CANNOT be undone.

### User Delete Request

```json
POST https://api.appboy.com/users/delete
Content-Type: application/json
{
  "app_group_id" : (required, string) App Group Identifier,
  "external_ids" : (required, array of string) external ids for the users to delete
}
```

### Users Delete Response

```json
Content-Type: application/json
{
  "deleted" : (required, integer) number of users successfully deleted,
  "invalid_user_ids" : (optional, array of string) each of the identifiers provided in the request that did not correspond to a known user
}
```

## Sample POST Requests in Various Languages<a class="margin-fix" name="sample-requests"></a>

### Python

__Note__: This request can alternately be completed using the external library [Requests][21].

```python
# Necessary built-in imports to be utilized later
import json
import urllib2

# Define your static variables (app group ID, request url)
request_url = 'https://api.appboy.com/users/track'
app_group_id = "your-app-group-id"

# Define the content type as a dictionary
headers_params = {'Content-Type':'application/json'}

# Store the attribute values of your users as a list of dictionaries
attributes =[
            {'external_id':"python user ID", 'first_attribute':
             "your user's first attribute", 'second_attribute': "your user's second attribute"},
            {'external_id':"your second user's external id",'first_attribute':
             "first attribute", 'second_attribute': "second attribute"}
             ]

# Store the request data as a dictionary
data = {  'app_group_id':app_group_id,
          'attributes' : attributes   }
# Convert the data into JSON format
JSONdata = json.dumps(data)
# Create the request
req = urllib2.Request(request_url, JSONdata, headers_params)
# Open the request
f = urllib2.urlopen(req)
# Get the response code
response = f.read()
# Close the opened request
f.close
# Check that the request worked correctly
print response

# This process can alternately be completed by using the external library
# 'Requests' with the commented out code below:

# import requests
# r = requests.post(request_url, data=data, headers=headers_params)
# print r.status_code
# print r.text
```

### Ruby (using REST Client & MultiJSON)

__Note__: This post request requires the downloading of the external gems [Rest Client][23] and [MultiJSON][22]

```ruby
# Required libraries to import
require 'rest-client'
require 'multi_json'

# Define your static variables (app group ID, request url)
request_url = 'https://api.appboy.com/users/track'
app_group_id = 'your-app-group-id'

# Define the content type as a hash
headers_params = {'Content-Type'=>'application/json'}

# Store the attribute values of your users as an array of hashes
attributes =[
        {'external_id'=>"ruby user ID", 'first_attribute'=>
            "your user's first attribute", 'second_attribute'=> "your user's second attribute"},
        {'external_id'=>"your second user's external id",'first_attribute'=>
            "first attribute", 'second_attribute'=> "second attribute"}
        ]

# Store the request data as a hash
data = {:app_group_id => app_group_id,
        :attributes => attributes}
# Convert the data into JSON format
JSONdata = MultiJson.encode(data)
# Send and check the POST request
puts RestClient.post(request_url, JSONdata, headers_params)
```

### PHP

```php
<?php
# Define your static variables (app group ID, request url)
$app_group_id = 'your-app-group-id';
$request_url = 'https://api.appboy.com/users/track';

// Initialize your users by creating a map containing
// your desired attributes and associated attribute values.

$user1 = array(
       'external_id'=>"php user ID",
       'first_attribute'=> "your user's first attribute",
       'second_attribute'=> "your user's second attribute"
             );
$user2 = array(
       'external_id'=>"your second user's external id",
       'first_attribute'=> "your user's first attribute",
       'second_attribute'=> "your user's second attribute"
             );

// Note: Arrays in php are really ordered maps, hence
// the 'array' initialization associated with each user.

// Instantiate your attributes array using your previously
// defined user maps.
$attributes = array($user1, $user2);

// Organize the data to send to the API as another map
// comprised of your previously defined variables.
$postData = array(
  'app_group_id' => $app_group_id,
    'attributes' => $attributes,
);

// Create the context for the request
$context = stream_context_create(array(
    'http' => array(
        'method' => 'POST',
        'header' => "Content-Type: application/json\r\n",
        'content' => json_encode($postData)
    )
));

// Send the request
$response = file_get_contents($request_url, FALSE, $context);

// Post the response to ensure a successful request
echo $response;

?>
```

[15]: /User_Data_Collection/Best_Practices
[16]: #not-used-app
[17]: http://en.wikipedia.org/wiki/ISO_3166-1 "ISO-3166-1 codes"
[19]: http://en.wikipedia.org/wiki/ISO_8601 "ISO 8601 Time Code Wiki"
[20]: http://en.wikipedia.org/wiki/ISO_4217 "ISO 4217 Currency Code"
[21]: http://docs.python-requests.org/en/latest/ "Requests"
[22]: https://rubygems.org/gems/multi_json "multiJSON"
[23]: https://rubygems.org/gems/rest-client "Rest Client"
[24]: http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes "ISO-639-1 codes"
