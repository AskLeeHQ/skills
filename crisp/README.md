# Crisp Skill

Manage Crisp live chat conversations from the command line.

## Features

- 📬 **List conversations** - View pending, resolved, or all conversations
- 💬 **Read messages** - See full conversation history
- ✉️ **Reply** - Send messages to customers
- ✅ **Resolve** - Mark conversations as resolved
- 🔄 **Reopen** - Reopen resolved conversations
- 🔍 **Search** - Find conversations by keyword
- 📋 **Info** - Get customer details and metadata

## Setup

1. Go to [Crisp Marketplace](https://marketplace.crisp.chat/)
2. Create account → New Plugin → Private
3. Request production token with scopes:
   - `website:conversation:sessions`
   - `website:conversation:messages`
   - `website:conversation:states`
4. Set environment variables:

```bash
export CRISP_IDENTIFIER="your-identifier"
export CRISP_KEY="your-key"
export CRISP_WEBSITE_ID="your-website-id"
```

## Usage

```bash
# List pending conversations
node crisp.js list --status pending

# Read a conversation
node crisp.js read <session_id>

# Reply to customer
node crisp.js reply <session_id> "Thanks for reaching out!"

# Resolve conversation
node crisp.js resolve <session_id>
```

## License

MIT
