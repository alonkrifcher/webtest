---
title: Testing
platform: iOS
---
## Testing

If you'd like to test in-app and push notifications via the command-line, you can send a single notification through the terminal via CURL and the [Messaging API][29]. You will need to replace the following fields with the correct values for your test case:

- `YOUR_APP_GROUP_ID` — available on the [Developer Console][30] page
- `YOUR_EXTERNAL_USER_ID` — available on the [User Profile Search Page][31]
- `YOUR_KEY1` (optional)
- `YOUR_VALUE1` (optional)

```bash
curl -X POST -H "Content-Type: application/json" -d "{\"app_group_id\":\"YOUR_APP_GROUP_ID\",\"external_user_ids\":[\"YOUR_EXTERNAL_USER_ID\"],\"messages\":{\"apple_push\":{\"alert\":\"Test push\",\"extra\":{\"YOUR_KEY1\":\"YOUR_VALUE1\"}}}}" https://api.appboy.com/messages/send
```

[29]: /REST_APIs/Messaging
[30]: https://dashboard.appboy.com/app_settings/api_settings/
[31]: https://dashboard.appboy.com/users/user_search/user-search/
