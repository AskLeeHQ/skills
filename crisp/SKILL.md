---
name: crisp
description: Manage Crisp live chat conversations - list, read, reply to support tickets and chat messages.
homepage: https://crisp.chat
metadata:
  {
    "openclaw":
      {
        "emoji": "💬",
        "requires": { "bins": ["node"], "env": ["CRISP_IDENTIFIER", "CRISP_KEY", "CRISP_WEBSITE_ID"] }
      }
  }
---

# Crisp

Manage Crisp live chat and support conversations.

## Setup

1. Go to [Crisp Marketplace](https://marketplace.crisp.chat/)
2. Create account → New Plugin → Private → Name it
3. Go to Tokens → Production → Request token with scopes:
   - `website:conversation:sessions` (list/read conversations)
   - `website:conversation:messages` (read/send messages)
   - `website:conversation:states` (resolve/reopen)
4. Copy identifier and key
5. Get website_id from Crisp dashboard → Settings → Website Settings

Set environment variables:
```bash
export CRISP_IDENTIFIER="your-identifier"
export CRISP_KEY="your-key"
export CRISP_WEBSITE_ID="your-website-id"
```

Or add to OpenClaw config.

## Commands

### List conversations
```bash
node crisp.js list [--status pending|resolved|all] [--limit 20]
```

### Read conversation
```bash
node crisp.js read <session_id>
```

### Reply to conversation
```bash
node crisp.js reply <session_id> "Your message here"
```

### Resolve conversation
```bash
node crisp.js resolve <session_id>
```

### Search conversations
```bash
node crisp.js search "query"
```

### Get conversation details
```bash
node crisp.js info <session_id>
```

## Examples

```bash
# List pending (unresolved) conversations
node crisp.js list --status pending

# Read latest messages from a conversation
node crisp.js read af8b2c1e-1234-5678-9abc-def012345678

# Reply to a customer
node crisp.js reply af8b2c1e-1234-5678-9abc-def012345678 "Hi! How can I help?"

# Mark as resolved
node crisp.js resolve af8b2c1e-1234-5678-9abc-def012345678
```

## Notes

- Session IDs are UUIDs that identify each conversation
- Messages are returned newest-first by default
- Rate limits apply (see Crisp API docs)
