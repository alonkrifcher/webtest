---
title: Export
---
# Export

- [User Export][1]
  - [Users by UserID Endpoint][2]
  - [Users By Segment Endpoint][3]
- [Segment Export][4]
  - [Segment List Endpoint][5]
  - [Segment Analytics Endpoint][6]
- [Campaign Export][7]
  - [Campaign List Endpoint][8]
  - [Campaign Analytics Endpoint][9]
- [News Feed Export][10]
  - [News Feed List Endpoint][11]
  - [News Feed Analytics Endpoint][12]
- [KPI Export][15]
  - [Monthly Active Users Endpoint][16]
  - [Daily Active Users Endpoint][17]
  - [New Users Endpoint][18]
- [Sessions Analytics Export][19]
  - [Sessions Series Endpoint][20]
- [Custom Events Analytics Export][21]
  - [Custom Events List Endpoint][22]
  - [Custom Events Series Endpoint][23]
- [Revenue Analytics Export][24]
  - [Products List Endpoint][25]
  - [Revenue Series Endpoint][26]
  - [Purchase Quantity Series Endpoint][27]
- [Raw Event Stream Export][28]

## User Export

### Users by UserID Endpoint

This endpoint allows you to export data from any user profile by specifying their external identifier (UserID). Up to 50 `external_ids` can be included in a single request.

```json
POST https://api.appboy.com/users/export/ids
Content-Type: application/json
{
    "app_group_id" : (required, string) App Group Identifier,
    "external_ids" : (required, array of string) external ids for the users to export,
    "fields_to_export" : (optional, array of string) name of user data fields to export, e.g. ['first_name', 'email', 'purchases'], defaults to all if not provided
}
```

#### Users by UserID Endpoint API Response:

```json
Content-Type: application/json
{
    "users" : (optional, array of object) the data for each of the exported users,
    "invalid_user_ids" : (optional, array of string) each of the identifiers provided in the request that did not correspond to a known user
}
```
For an example of the data that is accessible via this endpoint see the [Sample User Export Output section][14] of this documentation.

### Users by Segment Endpoint

This endpoint allows you to export all the users within a segment. User data is exported as files of user JSON objects separated by new lines (i.e. one JSON object per line).

If you have added your S3 credentials to Appboy, then the files will be uploaded in your bucket as zip files with the key format that looks like "segment-export/SEGMENT_ID/YYYY-MM-dd/RANDOM_UUID-TIMESTAMP_WHEN_EXPORT_STARTED/filename.zip". If you do not have S3 credentials provided, the response to the request provides the url where a zip file containing these files can be downloaded. The URL will only become a valid location once the export is ready.

In either scenario, you may optionally provide a `callback_endpoint` to be notified when the export is ready. If the `callback_endpoint` is provided, we will make a post request to the provided address when the download is ready. The body of the post will be "success":true. If you have not added S3 credentials to Appboy, then the body of the post will additionally have the attribute "url" with the download url as the value.

Larger user bases will result in longer export times. For example, an app with 20 million users could take an hour or more.

```json
POST https://api.appboy.com/users/export/segment
Content-Type: application/json
{
    "app_group_id" : (required, string) App Group Identifier,
    "segment_id" : (required, string) identifier for the segment to be exported,
    "callback_endpoint" : (optional, string) endpoint to post a download url to when the export is available,
    "fields_to_export" : (optional, array of string) name of user data fields to export, e.g. ['first_name', 'email', 'purchases'], defaults to all if not provided
}
```

__Note:__ The `segment_id` for a given segment can be found on our [Developer Console][13] within your dashboard or you can use the [Segment List Endpoint][5].

#### Users by Segment Endpoint API Response

```json
Content-Type: application/json
{
    "url" : (optional, string) the url where the segment export data can be downloaded if you do not have your own S3 credentials
}
```

__Note:__ Once made available, the url will only be valid for a few hours. As such, we highly recommend that you add your own S3 credentials to Appboy.

#### Sample User Export File Output

User export object (we will include the least data possible - if a field is missing from the object it should be assumed to be null, false, or empty):

```json
{
    "external_id" : (string),
    "first_name" : (string),
    "last_name" : (string),
    "email" : (string),
    "dob" : (string) date for the user's date of birth,
    "home_city" : (string),
    "country" : (string),
    "phone" : (string),
    "language" : (string) ISO-639 two letter code,
    "time_zone" : (string),
    "last_coordinates" : (array of float) [lon, lat],
    "gender" : (string) "M" | "F",
    "total_revenue" : (float),
    "push_subscribe" : (string) "opted_in" | "subscribed" | "unsubscribed",
    "email_subscribe" : (string) "opted_in" | "subscribed" | "unsubscribed",
    "custom_attributes" : (object) custom attribute key value pairs,
    "custom_events" : [
        {
            "name" : (string),
            "first" : (string) date,
            "last" : (string) date,
            "count" : (int)
        },
        ...
    ],
    "purchases" : [
        {
            "name" : (string),
            "first" : (string) date,
            "last" : (string) date,
            "count" : (int)
        },
        ...
    ],
    "devices" : [
        {
            "model" : (string),
            "os" : (string),
            "carrier" : (string),
            "idfv" : (string) only included for iOS devices,
            "idfa" : (string) only included for iOS devices when IDFA collection is enabled,
            "ad_tracking_enabled" : (bool)
        },
        ...
    ],
    "push_tokens" : [
        {
            "app" : (string) app name,
            "platform" : (string),
            "token" : (string)
        },
        ...
    ],
    "apps" : [
        {
            "name" : (string),
            "platform" : (string),
            "version" : (string),
            "sessions" : (string),
            "first_used" : (string) date,
            "last_used" : (string) date
        },
        ...
    ],
    "campaigns_received" : [
        {
            "name" : (string),
            "last_received" : (string) date,
            "engaged" : {
                "opened_email" : (bool),
                "opened_push" : (bool),
                "clicked_email" : (bool),
                "clicked_in_app_message" : (bool)
            },
            "converted" : (bool),
            "api_campaign_id" : (string),
            "variation_name" : (optional, string) exists only if it is a multivariate campaign,
            "variation_api_id" : (optional, string) exists only if it is a multivariate campaign
        },
        ...
    ],
    "cards_clicked" : [
        {
            "name" : (string)
        },
        ...
    ]
}
```

## Segment Export

### Segment List Endpoint

This endpoint allows you to export a list of segments, each of which will include it's name, Segment Identifier, and whether it has analytics tracking enabled. The segments are returned in groups of 100 sorted by time of creation, most recent first. Archived segments are not included.

`GET https://api.appboy.com/segments/list`

| Parameter | Required | Data Type | Description |
| ---------------------| --------------- |
| `app_group_id` | Yes | String | App Group Identifier |
| `page` | No | Integer | The page of segments to return, defaults to 0 (returns the first set of up to 100) |

__Example URL:__
`https://api.appboy.com/segments/list?app_group_id=75480f9a-4db8-4057-8b7e-4d59bfd73709&page=1`

#### Segment List Endpoint API Response:

```json
Content-Type: application/json
{
    "segments" : [
        {
            "id" : (string) Segment Identifier,
            "name" : (string) segment name,
            "analytics_tracking_enabled" : (boolean) whether the segment has analytics tracking enabled
        },
        ...
    ]
}
```

### Segment Analytics Endpoint

This endpoint allows you to retrieve a daily series of the size of a segment over time for a segment with analytics tracking enabled.

`GET https://api.appboy.com/segments/data_series`

| Parameter | Required | Data Type | Description |
| ---------------------| --------------- |
| `app_group_id` | Yes | String | App Group Identifier |
| `segment_id` | Yes | String | Segment Identifier |
| `length` | Yes | Integer | Max number of days before ending_at to include in the returned series - must be between 1 and 100 inclusive |
| `ending_at` | No | DateTime (ISO 8601 string) | Point in time when the data series should end - defaults to time of the request |

__Note:__ The `segment_id` for a given segment can be found on our [Developer Console][13] within your dashboard or you can use the [Segment List Endpoint][5].

__Example URL:__
`https://api.appboy.com/segments/data_series?app_group_id=75480f9a-4db8-4057-8b7e-4d59bfd73709&segment_id=3bbc4555-8fa0-4c9b-a5c0-4505edf3e064&length=7&ending_at=2014-12-10T23:59:59-05:00`

#### Segment Analytics Endpoint API Response

```json
Content-Type: application/json
{
    "data" : [
        {
            "time" : (string) date as ISO 8601 date,
            "size" : (int) size of the segment on that date
        },
        ...
    ]
}
```

### Segment Details Endpoint

This endpoint allows you to retrieve relevant information on the segment, which can be identified by the `segment_id`.

`GET https://api.appboy.com/segments/details`

| Parameter | Required | Data Type | Description |
| ---------------------| --------------- |
| `app_group_id` | Yes | String | App Group Identifier |
| `segment_id` | Yes | String | Segment Identifier |

__Note:__ The `segment_id` for a given segment can be found on our [Developer Console][13] within your dashboard or you can use the [Segment List Endpoint][5].

__Example URL:__
`https://api.appboy.com/segments/details?app_group_id=75480f9a-4db8-4057-8b7e-4d59bfd73709&segment_id=3bbc4555-8fa0-4c9b-a5c0-4505edf3e064`

#### Segment Details Endpoint API Response

```json
Content-Type: application/json
{
      "created_at" : (string) date created as ISO 8601 date,
      "updated_at" : (string) date last updated as ISO 8601 date,
      "name" : (string) segment name,
      "description" : (string) human-readable description of filters
}
```

## Campaign Export

### Campaign List Endpoint

This endpoint allows you to export a list of campaigns, each of which will include it's name, Campaign Identifier, and whether it is an API Campaign. The campaigns are returned in groups of 100 sorted by time of creation, most recent first. Archived campaigns are not included.

`GET https://api.appboy.com/campaigns/list`

| Parameter | Required | Data Type | Description |
| ---------------------| --------------- |
| `app_group_id` | Yes | String | App Group Identifier |
| `page` | No | Integer | The page of campaigns to return, defaults to 0 (returns the first set of up to 100) |
| `include_archived` | No | Boolean | Whether or not to include archived campaigns, defaults to false |

__Example URL:__
`https://api.appboy.com/campaigns/list?app_group_id=75480f9a-4db8-4057-8b7e-4d59bfd73709&page=1&include_archived=true`

#### Campaign List Endpoint API Response:

```json
Content-Type: application/json
{
    "campaigns" : [
        {
            "id" : (string) Campaign Identifier,
            "name" : (string) campaign name,
            "is_api_campaign" : (boolean) whether the campaign is an API Campaign
        },
        ...
    ]
}
```

### Campaign Analytics Endpoint

This endpoint allows you to retrieve a daily series of various stats for a campaign over time.

`GET https://api.appboy.com/campaigns/data_series`

| Parameter | Required | Data Type | Description |
| ---------------------| --------------- |
| `app_group_id` | Yes | String | App Group Identifier |
| `campaign_id` | Yes | String | Campaign Identifier |
| `length` | Yes | Integer | Max number of days before ending_at to include in the returned series - must be between 1 and 100 inclusive |
| `ending_at` | No | DateTime (ISO 8601 string) | Point in time when the data series should end - defaults to time of the request |

__Note:__ The `campaign_id` for API campaigns can be found on the [Developer Console][13] page and the campaign details page within your dashboard or you can use the [Campaign List Endpoint][8].

__Example URL:__
`https://api.appboy.com/campaigns/data_series?app_group_id=75480f9a-4db8-4057-8b7e-4d59bfd73709&campaign_id=3bbc4555-8fa0-4c9b-a5c0-4505edf3e064&length=7&ending_at=2014-12-10T23:59:59-05:00`

#### Campaign Analytics Endpoint API Response

```json
Content-Type: application/json
{
    "data" : [
        {
            "time" : (string) date as ISO 8601 date,
            "conversions" : (int),
            "messages" : {
                "email" : [
                    {
                        "variation_name" : (optional, string) exists only if it is a multivariate campaign,
                        "sent" : (int),
                        "opens" : (int),
                        "unique_opens" : (int),
                        "clicks" : (int),
                        "unique_clicks" : (int),
                        "unsubscribes" : (int),
                        "bounces_including_dropped" : (int),
                        "delivered" : (int),
                        "reported_spam" : (int),
                        "conversions" : (optional, int) exists only if it is a multivariate campaign
                    },
                    ...
                ],
                "in_app_message" : [
                    {
                        "variation_name" : (optional, string) exists only if it is a multivariate campaign,
                        "sent" : (int),
                        "impressions" : (int),
                        "opens" : (int),
                        "conversions" : (optional, int) exists only if it is a multivariate campaign
                    },
                    ...
                ],
                "android_push" : [
                    {   
                        "variation_name" : (optional, string) exists only if it is a multivariate campaign,
                        "sent" : (int),
                        "direct_opens" : (int),
                        "total_opens" : (int),
                        "bounces" : (int),
                        "conversions" : (optional, int) exists only if it is a multivariate campaign
                    },
                    ...
                ],
                ...
            }
        },
        ...
    ]
}
```

Possible message types are `email`, `in_app_message`, `android_push`, `apple_push`, `kindle_push`, `windows_phone8_push`, and `windows_universal_push`. All push message types will have the same statistics shown for `android_push` above.

### Campaign Details Endpoint

This endpoint allows you to retrieve relevant information on the campaign, which can be identified by the `campaign_id`.

`GET https://api.appboy.com/campaigns/details`

| Parameter | Required | Data Type | Description |
| ---------------------| --------------- |
| `app_group_id` | Yes | String | App Group Identifier |
| `campaign_id` | Yes | String | Campaign Identifier |

__Note:__ The `campaign_id` for API campaigns can be found on the [Developer Console][13] page and the campaign details page within your dashboard or you can use the [Campaign List Endpoint][8].

__Example URL:__
`https://api.appboy.com/campaigns/details?app_group_id=75480f9a-4db8-4057-8b7e-4d59bfd73709&campaign_id=3bbc4555-8fa0-4c9b-a5c0-4505edf3e064`

#### Campaign Details Endpoint API Response

```json
Content-Type: application/json
{
    "created_at" : (string) date created as ISO 8601 date,
    "updated_at" : (string) date last updated as ISO 8601 date,
    "name" : (string) campaign name,
    "schedule_type" : (string) type of scheduling action,
    "channels" : (array) list of channels to send via,
    "first_sent" : (string) date first sent as ISO 8601 date,
    "last_sent" : (string) date last sent as ISO 8601 date
}
```

## News Feed Export

### News Feed List Endpoint

This endpoint allows you to export a list of news feed cards, each of which will include it's name and Card Identifier. The cards are returned in groups of 100 sorted by time of creation, most recent first.

`GET https://api.appboy.com/feed/list`

| Parameter | Required | Data Type | Description |
| ---------------------| --------------- |
| `app_group_id` | Yes | String | App Group Identifier |
| `page` | No | Integer | The page of cards to return, defaults to 0 (returns the first set of up to 100) |
| `include_archived` | No | Boolean | Whether or not to include archived cards, defaults to false |

__Example URL:__
`https://api.appboy.com/feed/list?app_group_id=75480f9a-4db8-4057-8b7e-4d59bfd73709&page=1&include_archived=true`

#### News Feed List Endpoint API Response:

```json
Content-Type: application/json
{
    "cards" : [
        {
            "id" : (string) Card Identifier,
            "name" : (string) card name
        },
        ...
    ]
}
```

### News Feed Analytics Endpoint

This endpoint allows you to retrieve a daily series of engagement stats for a card over time.

`GET https://api.appboy.com/feed/data_series`

| Parameter | Required | Data Type | Description |
| ---------------------| --------------- |
| `app_group_id` | Yes | String | App Group Identifier |
| `card_id` | Yes | String | Card Identifier |
| `length` | Yes | Integer | Max number of units (days or hours) before ending_at to include in the returned series - must be between 1 and 100 inclusive |
| `unit` | No | String | Unit of time between data points - can be "day" or "hour" (defaults to "day") |
| `ending_at` | No | DateTime (ISO 8601 string) | Point in time when the data series should end - defaults to time of the request |

__Note:__ The `card_id` for a given card can be found the [Developer Console][13] page and on the card details page within your dashboard or you can use the [News Feed List Endpoint][11].

__Example URL:__
`https://api.appboy.com/feed/data_series?app_group_id=75480f9a-4db8-4057-8b7e-4d59bfd73709&card_id=3bbc4555-8fa0-4c9b-a5c0-4505edf3e064&length=24&unit=hour&ending_at=2014-12-10T23:59:59-05:00`

#### News Feed Analytics Endpoint API Response

```json
Content-Type: application/json
{
    "data" : [
        {
            "time" : (string) point in time - as ISO 8601 extended when unit is "hour" and as ISO 8601 date when unit is "day",
            "clicks" : (int) ,
            "impressions" : (int),
            "unique_clicks" : (int),
            "unique_impressions" : (int)
        },
        ...
    ]
}
```

### News Feed Details Endpoint

This endpoint allows you to retrieve relevant information on the card, which can be identified by the `card_id`.

`GET https://api.appboy.com/feed/details`

| Parameter | Required | Data Type | Description |
| ---------------------| --------------- |
| `app_group_id` | Yes | String | App Group Identifier |
| `card_id` | Yes | String | Card Identifier |

__Note:__ The `card_id` for a given card can be found the [Developer Console][13] page and on the card details page within your dashboard or you can use the [News Feed List Endpoint][11].

__Example URL:__
`https://api.appboy.com/feed/details?app_group_id=75480f9a-4db8-4057-8b7e-4d59bfd73709&card_id=3bbc4555-8fa0-4c9b-a5c0-4505edf3e064`

#### News Feed Details Endpoint API Response

```json
Content-Type: application/json
{
    "created_at" : "2015-08-10T15:19:03-04:00",
    "updated_at" : "2015-08-11T15:19:03-04:00",
    "name" : "News Flash!",
    "publish_at" : "2015-08-15T15:19:03-04:00",
    "end_at" : "2015-08-18T15:19:03-04:00"
}
```

## KPI Export

### Monthly Active Users Endpoint

This endpoint allows you to retrieve a daily series of the total number of unique active users over a 30 day rolling window.

`GET https://api.appboy.com/kpi/mau/data_series`

| Parameter | Required | Data Type | Description |
| ---------------------| --------------- |
| `app_group_id` | Yes | String | App Group Identifier |
| `length` | Yes | Integer | Max number of days before ending_at to include in the returned series - must be between 1 and 100 inclusive |
| `ending_at` | No | DateTime (ISO 8601 string) | Point in time when the data series should end - defaults to time of the request |

__Example URL:__
`https://api.appboy.com/kpi/mau/data_series?app_group_id=75480f9a-4db8-4057-8b7e-4d59bfd73709&length=7&ending_at=2014-12-10T23:59:59-05:00`

#### Monthly Active Users Endpoint API Response

```json
Content-Type: application/json
{
    "data" : [
        {
            "time" : (string) date as ISO 8601 date,
            "mau" : (int)
        },
        ...
    ]
}
```

### Daily Active Users Endpoint

This endpoint allows you to retrieve a daily series of the total number of unique active users on each date.

`GET https://api.appboy.com/kpi/dau/data_series`

| Parameter | Required | Data Type | Description |
| ---------------------| --------------- |
| `app_group_id` | Yes | String | App Group Identifier |
| `length` | Yes | Integer | Max number of days before ending_at to include in the returned series - must be between 1 and 100 inclusive |
| `ending_at` | No | DateTime (ISO 8601 string) | Point in time when the data series should end - defaults to time of the request |

__Example URL:__
`https://api.appboy.com/kpi/dau/data_series?app_group_id=75480f9a-4db8-4057-8b7e-4d59bfd73709&length=7&ending_at=2014-12-10T23:59:59-05:00`

#### Daily Active Users Endpoint API Response

```json
Content-Type: application/json
{
    "data" : [
        {
            "time" : (string) date as ISO 8601 date,
            "dau" : (int)
        },
        ...
    ]
}
```

### New Users Endpoint

This endpoint allows you to retrieve a daily series of the total number of new users on each date.

`GET https://api.appboy.com/kpi/new_users/data_series`

| Parameter | Required | Data Type | Description |
| ---------------------| --------------- |
| `app_group_id` | Yes | String | App Group Identifier |
| `length` | Yes | Integer | Max number of days before ending_at to include in the returned series - must be between 1 and 100 inclusive |
| `ending_at` | No | DateTime (ISO 8601 string) | Point in time when the data series should end - defaults to time of the request |

__Example URL:__
`https://api.appboy.com/kpi/new_users/data_series?app_group_id=75480f9a-4db8-4057-8b7e-4d59bfd73709&length=7&ending_at=2014-12-10T23:59:59-05:00`

#### New Users Endpoint API Response

```json
Content-Type: application/json
{
    "data" : [
        {
            "time" : (string) date as ISO 8601 date,
            "new_users" : (int)
        },
        ...
    ]
}
```

## Sessions Analytics Export

### Sessions Series Endpoint

This endpoint allows you to retrieve a series of the number of sessions for your app over a designated time period.

`GET https://api.appboy.com/sessions/data_series`

| Parameter | Required | Data Type | Description |
| ---------------------| --------------- |
| `app_group_id` | Yes | String | App Group Identifier |
| `length` | Yes | Integer | Max number of units (days or hours) before ending_at to include in the returned series - must be between 1 and 100 inclusive |
| `unit` | No | String | Unit of time between data points - can be "day" or "hour" (defaults to "day") |
| `ending_at` | No | DateTime (ISO 8601 string) | Point in time when the data series should end - defaults to time of the request |
| `app_id` | No | String | App Identifier retrieved from the Developer Console to limit analytics to a specific app |
| `segment_id` | No | String | Segment Identifier indicating the analytics enabled segment for which sessions should be returned |

__Example URL:__
`https://api.appboy.com/sessions/data_series?app_group_id=75480f9a-4db8-4057-8b7e-4d59bfd73709&length=24&unit=hour&ending_at=2014-12-10T23:59:59-05:00&app_id=3bbc4555-8fa0-4c9b-a5c0-4505edf3e064`

#### Sessions Series Endpoint API Response

```json
Content-Type: application/json
{
    "data" : [
        {
            "time" : (string) point in time - as ISO 8601 extended when unit is "hour" and as ISO 8601 date when unit is "day",
            "sessions" : (int)
        },
        ...
    ]
}
```

## Custom Events Analytics Export

### Custom Events List Endpoint

This endpoint allows you to export a list of custom events that have been recorded for your app. The event names are returned in groups of 250, sorted alphabetically.

`GET https://api.appboy.com/events/list`

| Parameter | Required | Data Type | Description |
| ---------------------| --------------- |
| `app_group_id` | Yes | String | App Group Identifier |
| `page` | No | Integer | The page of event names to return, defaults to 0 (returns the first set of up to 250) |

__Example URL:__
`https://api.appboy.com/events/list?app_group_id=75480f9a-4db8-4057-8b7e-4d59bfd73709&page=1`

#### Custom Events List Endpoint API Response:

```json
Content-Type: application/json
{
    "events" : [
        "Event A",
        "Event B",
        "Event C",
        ...
    ]
}
```

### Custom Events Series Endpoint

This endpoint allows you to retrieve a series of the number of occurrences of a custom event in your app over a designated time period.

`GET https://api.appboy.com/events/data_series`

| Parameter | Required | Data Type | Description |
| ---------------------| --------------- |
| `app_group_id` | Yes | String | App Group Identifier |
| `event` | Yes | String | The name of the custom event for which to return analytics |
| `length` | Yes | Integer | Max number of units (days or hours) before ending_at to include in the returned series - must be between 1 and 100 inclusive |
| `unit` | No | String | Unit of time between data points - can be "day" or "hour" (defaults to "day") |
| `ending_at` | No | DateTime (ISO 8601 string) | Point in time when the data series should end - defaults to time of the request |
| `app_id` | No | String | App Identifier retrieved from the Developer Console to limit analytics to a specific app |
| `segment_id` | No | String | Segment Identifier indicating the analytics enabled segment for which event analytics should be returned |

__Example URL:__
`https://api.appboy.com/events/data_series?app_group_id=75480f9a-4db8-4057-8b7e-4d59bfd73709&event=Event%20A&length=24&unit=hour&ending_at=2014-12-10T23:59:59-05:00&app_id=3bbc4555-8fa0-4c9b-a5c0-4505edf3e064`

#### Custom Events Series Endpoint API Response

```json
Content-Type: application/json
{
    "data" : [
        {
            "time" : (string) point in time - as ISO 8601 extended when unit is "hour" and as ISO 8601 date when unit is "day",
            "count" : (int)
        },
        ...
    ]
}
```

## Revenue Analytics Export

### Products List Endpoint

This endpoint allows you to export a list of products that have been purchased in your app. The product names are returned in groups of 250, sorted alphabetically.

`GET https://api.appboy.com/purchases/product_list`

| Parameter | Required | Data Type | Description |
| ---------------------| --------------- |
| `app_group_id` | Yes | String | App Group Identifier |
| `page` | No | Integer | The page of product names to return, defaults to 0 (returns the first set of up to 250) |

__Example URL:__
`https://api.appboy.com/purchases/product_list?app_group_id=75480f9a-4db8-4057-8b7e-4d59bfd73709&page=1`

#### Products List Endpoint API Response:

```json
Content-Type: application/json
{
    "products" : [
        "Product A",
        "Product B",
        "Product C",
        ...
    ]
}
```

### Revenue Series Endpoint

This endpoint allows you to retrieve a series of the money spent in your app over a designated time period.

`GET https://api.appboy.com/purchases/revenue_series`

| Parameter | Required | Data Type | Description |
| ---------------------| --------------- |
| `app_group_id` | Yes | String | App Group Identifier |
| `length` | Yes | Integer | Max number of units (days or hours) before ending_at to include in the returned series - must be between 1 and 100 inclusive |
| `product` | No | String | The name of the product to which revenue numbers should be limited (defaults to total revenue across all products) |
| `unit` | No | String | Unit of time between data points - can be "day" or "hour" (defaults to "day") |
| `ending_at` | No | DateTime (ISO 8601 string) | Point in time when the data series should end - defaults to time of the request |
| `app_id` | No | String | App Identifier retrieved from the Developer Console to limit analytics to a specific app |

__Example URL:__
`https://api.appboy.com/purchases/revenue_series?app_group_id=75480f9a-4db8-4057-8b7e-4d59bfd73709&product=Product%20A&length=24&unit=hour&ending_at=2014-12-10T23:59:59-05:00&app_id=3bbc4555-8fa0-4c9b-a5c0-4505edf3e064`

#### Revenue Series Endpoint API Response

```json
Content-Type: application/json
{
    "data" : [
        {
            "time" : (string) point in time - as ISO 8601 extended when unit is "hour" and as ISO 8601 date when unit is "day",
            "revenue" : (float) revenue in USD
        },
        ...
    ]
}
```

### Purchase Quantity Series Endpoint

This endpoint allows you to retrieve a series of the number of purchases made in your app over a designated time period.

`GET https://api.appboy.com/purchases/quantity_series`

| Parameter | Required | Data Type | Description |
| ---------------------| --------------- |
| `app_group_id` | Yes | String | App Group Identifier |
| `length` | Yes | Integer | Max number of units (days or hours) before ending_at to include in the returned series - must be between 1 and 100 inclusive |
| `product` | No | String | The name of the product to which purchase numbers should be limited (defaults to total purchases across all products) |
| `unit` | No | String | Unit of time between data points - can be "day" or "hour" (defaults to "day") |
| `ending_at` | No | DateTime (ISO 8601 string) | Point in time when the data series should end - defaults to time of the request |
| `app_id` | No | String | App Identifier retrieved from the Developer Console to limit analytics to a specific app |

__Example URL:__
`https://api.appboy.com/purchases/quantity_series?app_group_id=75480f9a-4db8-4057-8b7e-4d59bfd73709&product=Product%20A&length=24&unit=hour&ending_at=2014-12-10T23:59:59-05:00&app_id=3bbc4555-8fa0-4c9b-a5c0-4505edf3e064`

#### Purchase Quantity Series Endpoint API Response

```json
Content-Type: application/json
{
    "data" : [
        {
            "time" : (string) point in time - as ISO 8601 extended when unit is "hour" and as ISO 8601 date when unit is "day",
            "purchase_quantity" : (int)
        },
        ...
    ]
}
```

#### Fatal Error Response Codes

The following status codes and associated error messages will be returned if your request encounters a fatal error. Any of these error codes indicate that no data will be processed.

| Error Code | Reason / Cause |
| ---------------------| --------------- |
| 400 Bad Request | Bad Syntax |
| 401 Unauthorized | Unknown or missing app group id |
| 429 Rate Limited | Over rate limit |
| 5XX | Internal server error, you should retry with exponential backoff |

## Raw Event Stream Export

Appboy allows you to export the entire raw event stream of data from your application. The export will consist of a series of zipped CSV files of events and event properties. These CSV files contain both the information sent by your application (such as custom events and purchases) as well as data automatically collected and logged by Appboy (such as session starts and ends, news feed card impressions, email and push opens, campaign conversions, etc.).

In order to use the raw data export, you must have [your Amazon S3 credentials linked to Appboy][29]. Data will be uploaded to your S3 bucket with object keys matching the patterns "appboy-event-data/app_groups/APP_GROUP_ID/YYYY-mm-dd-HH-MM.events.csv.zip" and "appboy-event-data/app_groups/APP_GROUP_ID/YYYY-mm-dd-HH-MM.event_properties.csv.zip". Depending on the time interval you have selected, there may be multiple files included in the export.

`POST https://api.appboy.com/raw_data/export`

| Parameter | Required | Data Type | Description |
| ---------------------| --------------- |
| `app_group_id` | Yes | String | App Group Identifier |
| `app_ids` | Yes | Array | App Identifiers retrieved from the Developer Console to limit export to specific apps |
| `starting_at` | Yes | DateTime (ISO 8601 string) | Point in time in which the data export should begin
| `ending_at` | Yes | DateTime (ISO 8601 string) | Point in time in which the data export should end
| `callback_endpoint` | No | String | Endpoint URL Appboy will hit once the export has finished |

#### Raw Event Stream Endpoint API Response

```json
Content-Type: application/json
{
    "success":true,
    "message":"success"
}
```

Please be aware of the following limitations to this endpoint:

* You can only have one raw data export going on at any point in time. If you post multiple requests while a data export is in progress, Appboy will return a 429 error code indicating that you have hit your rate limit.
* You may only export up to one week's worth of data at a time. If you wish to export larger time periods, wait for the first export to finish before triggering the next export time period. We recommend making use of the `callback_endpoint` parameter in order to automate larger exports.
* The data exported in this endpoint is delayed by 24 to 48 hours. All other endpoints return data in realtime except for this endpoint.
* We will show a `$campaign_received` event for each message type a user received from a single campaign. For example, if a user receives a push notification, an in-app message, and an email from a single campaign, they will have three total `$campaign_received` events reported. Each of those events will have a different message variation ID recorded in the event_properties table.

[1]: #user-export
[2]: #user-id
[3]: #users-by-segment
[4]: #segment
[5]: #segment-list
[6]: #segment-analytics
[7]: #campaign
[8]: #campaign-list
[9]: #campaign-analytics
[10]: #news-feed
[11]: #news-feed-list
[12]: #news-feed-analytics
[13]: https://dashboard.appboy.com/app_settings/api_settings
[14]: #sample-user-output
[15]: #kpi
[16]: #kpi-mau
[17]: #kpi-dau
[18]: #kpi-new-users
[19]: #sessions
[20]: #sessions-series
[21]: #custom-events
[22]: #custom-events-list
[23]: #custom-events-series
[24]: #revenue
[25]: #revenue-products
[26]: #revenue-series
[27]: #revenue-quantity-series
[28]: #raw-export
[29]: https://documentation.appboy.com/Partner_Integration/AWS_S3_Integration
