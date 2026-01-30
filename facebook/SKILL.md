---
name: facebook
description: Manage Facebook Pages, posts, and insights via Graph API. Post content, read comments, and analyze engagement.
metadata: {"clawdbot":{"emoji":"👤","requires":{"env":["FACEBOOK_ACCESS_TOKEN","FACEBOOK_PAGE_ID"]}}}
---

# Facebook

Social media platform (Pages API).

## 🧠 Content Humanization (MANDATORY)

Facebook audiences are mixed but AI-slop is universally annoying.

**Avoid:**
- Corporate speak: "We're thrilled to announce..."
- Emojis on every line 🚀💡✨🔥
- "Here are 5 reasons why..."
- Generic engagement bait: "What do you think? Comment below!"
- Overly polished language

**Write naturally:**
- Conversational tone, like texting a friend
- One thought per post, not a thesis
- Questions that you'd actually want answered
- Share stories, not bullet points
- Match your audience's language level

## Environment

```bash
export FACEBOOK_ACCESS_TOKEN="xxxxxxxxxx"  # Page Access Token
export FACEBOOK_PAGE_ID="xxxxxxxxxx"
```

## Get Page Info

```bash
curl "https://graph.facebook.com/v18.0/$FACEBOOK_PAGE_ID?fields=name,followers_count,fan_count" \
  -H "Authorization: Bearer $FACEBOOK_ACCESS_TOKEN"
```

## Get Page Posts

```bash
curl "https://graph.facebook.com/v18.0/$FACEBOOK_PAGE_ID/posts?fields=message,created_time,shares,likes.summary(true)" \
  -H "Authorization: Bearer $FACEBOOK_ACCESS_TOKEN"
```

## Create Post

```bash
curl -X POST "https://graph.facebook.com/v18.0/$FACEBOOK_PAGE_ID/feed" \
  -H "Authorization: Bearer $FACEBOOK_ACCESS_TOKEN" \
  -d "message=Hello from automation!"
```

## Post with Image

```bash
curl -X POST "https://graph.facebook.com/v18.0/$FACEBOOK_PAGE_ID/photos" \
  -H "Authorization: Bearer $FACEBOOK_ACCESS_TOKEN" \
  -F "url=https://example.com/image.jpg" \
  -F "caption=Check this out!"
```

## Get Post Comments

```bash
curl "https://graph.facebook.com/v18.0/{post_id}/comments" \
  -H "Authorization: Bearer $FACEBOOK_ACCESS_TOKEN"
```

## Get Page Insights

```bash
curl "https://graph.facebook.com/v18.0/$FACEBOOK_PAGE_ID/insights?metric=page_impressions,page_engaged_users&period=day" \
  -H "Authorization: Bearer $FACEBOOK_ACCESS_TOKEN"
```

## Reply to Comment

```bash
curl -X POST "https://graph.facebook.com/v18.0/{comment_id}/comments" \
  -H "Authorization: Bearer $FACEBOOK_ACCESS_TOKEN" \
  -d "message=Thanks for your comment!"
```

## Links
- Business: https://business.facebook.com
- Docs: https://developers.facebook.com/docs/graph-api
