---
title: Testing
platform: Android and FireOS
android_or_fireos: FireOS
---
## Testing

If you'd like to test in-app and push notifications via the command-line, you can send a single notification through the terminal via cURL and the [Messaging API][13]. You will need to replace the following fields with the correct values for your test case:

- `YOUR_APP_GROUP_ID` - available on the [Developer Console][14] page
- `YOUR_EXTERNAL_USER_ID` - available on the [User Profile Search Page][15]
- `YOUR_KEY1` (optional)
- `YOUR_VALUE1` (optional)

```bash
curl -X POST -H "Content-Type: application/json" -d "{\"app_group_id\":\"YOUR_APP_GROUP_ID\",\"external_user_ids\":[\"YOUR_EXTERNAL_USER_ID\"],\"messages\":{\"kindle_push\":{\"title\":\"Test push title\",\"alert\":\"Test push\",\"extra\":{\"YOUR_KEY1\":\"YOUR_VALUE1\"}}}}" https://api.appboy.com/messages/send
```

[13]: /REST_APIs/Messaging
[14]: https://dashboard.appboy.com/app_settings/api_settings/
[15]: https://dashboard.appboy.com/users/user_search/user-search/
