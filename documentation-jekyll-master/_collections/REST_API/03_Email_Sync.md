---
title: Email Sync
---
# Email Sync

Users' email subscription status can be updated and retrieved via Appboy using a RESTful API. You can use the API to setup bi-directional sync between Appboy and other email systems or your own database.

## API Specification

API access is done over HTTPS to `https://api.appboy.com/`.

All endpoints also need to have an `app_group_id` parameter similar to the [User and Messaging endpoints][4]. This parameter is not listed below but is required on all API calls.

| URL | HTTP Verb | Functionality |
| ---------------------| --------------- |
| /email/unsubscribes | GET | Retrieving Objects|
| /email/status | POST | Creating Objects |

## Querying Unsubscribed Emails

`GET https://api.appboy.com/email/unsubscribes`

| Parameter | Required | Data Type | Description |
| ---------------------| --------------- |
| `start_date` | No | String in YYYY-MM-DD format| Start date of the range to retrieve unsubscribes, must be earlier than end_date. This will be taken as UTC time by the API. |
| `end_date` | No | String in YYYY-MM-DD format | End date of the range to retrieve unsubscribes. This will be taken as UTC time by the API |
| `limit` | No | Integer | Optional field to limit the number of results returned. Defaults to 100 |
| `offset` | No | Integer | Optional beginning point in the list to retrieve from |
| `email` | No | String | If provided, we will return whether or not the user has unsubscribed |

__Note:__ You must provide either an `email` or a `start_date`, and an `end_date`.

## Changing Email Subscription Status

`POST https://api.appboy.com/email/status`

| Parameter | Required | Data Type | Description |
| ---------------------| --------------- |
| `email` | Yes | String | Email address to modify |
| `subscription_state` | Yes | String | Either “subscribed”, “unsubscribed”, or “opted_in”. |

### Example Unsubscribe CURL

The following example CURL demonstrates how to unsubscribe a user from receiving email via the Appboy APIs:

```
curl -X POST -H "Content-Type: application/json" -d "{\"app_group_id\":\"YOUR_APP_GROUP_ID\",\"email\":\"EMAIL_TO_UNSUBSCRIBE\",\"subscription_state\":\"unsubscribed\"}" https://api.appboy.com/email/status
```

[4]: /REST_APIs/User_Data
