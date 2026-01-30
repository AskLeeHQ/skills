---
name: reddit
description: Browse, post, comment, and vote on Reddit as a human user. Use when you need to participate in subreddit communities, research discussions, or promote content organically.
---

# Reddit Skill

Control Reddit as a human user via session cookies.

## 🧠 Content Humanization (MANDATORY)

Reddit users have zero tolerance for AI-generated content. They'll downvote you to oblivion and call you out.

**Instant tells you're a bot:**
- Starting with "Great question!" or "Interesting point!"
- Bullet points with bold headers: **Key insight:** blah
- "Additionally," "Furthermore," "Moreover"
- Generic positive conclusions: "I hope this helps!"
- Overly structured responses (intro → 3 points → conclusion)
- Perfect grammar with no personality

**Write like a Redditor:**
- Casual tone, lowercase is fine
- Opinions matter: "honestly this kinda sucks" is valid
- Tangents are human: "bit off topic but..."
- Abbreviations: tbh, imo, ngl, lmao
- Self-deprecation works: "took me 3 tries to figure this out lol"
- Imperfect punctuation... sometimes trails off
- Match the sub's vibe (r/startups ≠ r/ProgrammerHumor)

**Before posting, ask:** Does this sound like someone typing on their phone while eating cereal?

## Setup

Export cookies from your browser after logging into Reddit:
1. Open Reddit in browser, log in
2. Open DevTools → Application → Cookies → reddit.com
3. Copy these cookies: `reddit_session`, `token_v2`, `loid`, `session_tracker`
4. Add to TOOLS.md:

```markdown
### Reddit
- reddit_session: `your_session_cookie`
- token_v2: `your_token`
```

Or set env vars: `REDDIT_SESSION`, `REDDIT_TOKEN_V2`

## Commands

### Browse a subreddit
```bash
reddit browse r/SideProject --sort hot --limit 25
```

### Read a post and comments
```bash
reddit read <post_url_or_id>
```

### Post to a subreddit
```bash
reddit post r/SideProject --title "Show r/SideProject: My AI assistant" --text "Built this over the weekend..."
reddit post r/pics --title "Amazing sunset" --image /path/to/image.jpg
reddit post r/videos --title "Demo" --url "https://youtube.com/..."
```

### Comment on a post
```bash
reddit comment <post_id> "Great project! How did you handle X?"
reddit reply <comment_id> "Thanks! I used Y approach..."
```

### Vote
```bash
reddit upvote <post_or_comment_id>
reddit downvote <post_or_comment_id>
```

### Search
```bash
reddit search "AI chatbot" --subreddit SideProject --sort relevance --time week
```

### Check notifications
```bash
reddit inbox
reddit inbox --unread
```

### Get user info
```bash
reddit user <username>
reddit me  # current user
```

## Best Practices for Organic Promotion

1. **Build karma first** - Comment helpfully before posting
2. **Follow subreddit rules** - Each sub has different self-promo policies
3. **Be genuine** - Help people, don't just drop links
4. **Timing matters** - Post when US is awake (14:00-22:00 UTC)
5. **Engage with comments** - Reply to everyone on your posts

## Target Subreddits for Asklee

| Subreddit | Karma Req | Self-promo rules |
|-----------|-----------|------------------|
| r/SideProject | Low | Allowed, be helpful |
| r/selfhosted | Medium | Show technical depth |
| r/artificial | Medium | News/discussion focus |
| r/ChatGPT | Low | High volume, stand out |
| r/LocalLLaMA | Medium | Technical audience |
| r/startups | High | Provide value first |

## Rate Limits

- Posts: 1 per 10 minutes (new accounts stricter)
- Comments: ~1 per minute
- Votes: No strict limit but don't spam
- Wait 24h between posts to same subreddit

## Example Workflow

```bash
# Research what's being discussed
reddit browse r/SideProject --sort new --limit 50

# Find relevant posts to engage with
reddit search "AI assistant" --subreddit SideProject

# Comment helpfully on a few posts first
reddit comment abc123 "Have you tried using webhooks for this? Here's how I solved it..."

# After building presence, share your project
reddit post r/SideProject --title "Show r/SideProject: Asklee - Deploy an AI assistant to WhatsApp in 60 seconds" --text "Hey everyone! I built this because..."

# Engage with all responses
reddit inbox --unread
```
