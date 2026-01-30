---
name: tutorial-getting-started
version: 1.0.0
description: Your first 10 minutes with ClawdBot. Quick setup, first commands, and understanding how it all works.
---

# Getting Started with ClawdBot

So you installed ClawdBot. Now what?

## What You Just Installed

ClawdBot is an AI assistant that lives in your terminal and connects to messaging apps. Think of it as Claude with superpowers: it can read files, run commands, browse the web, send messages, and remember things across sessions.

The key parts:
- **Gateway** - The daemon that runs in the background, handles channels (WhatsApp, Telegram, etc.)
- **CLI** - How you interact directly: `clawdbot chat`, `clawdbot status`
- **Skills** - Plugins that teach ClawdBot how to do specific things
- **Workspace** - A folder where ClawdBot keeps its memory and config

## First Run

```bash
# Check everything's working
clawdbot status

# Start a chat
clawdbot chat
```

You're now talking to Claude. Try:
- "What's the weather in Paris?"
- "List files in my home directory"
- "Search the web for latest AI news"

Type `exit` or Ctrl+C to leave.

## Connect WhatsApp (Optional but Recommended)

This is where it gets fun. ClawdBot can be your WhatsApp assistant.

```bash
clawdbot gateway start   # Start the background service
clawdbot link            # Show QR code
```

Scan with WhatsApp (Settings → Linked Devices → Link a Device).

Now message yourself on WhatsApp - ClawdBot responds.

## Your Workspace

ClawdBot works from a folder (default: `~/clawd`). Key files:

```
~/clawd/
├── SOUL.md      # ClawdBot's personality
├── USER.md      # Info about you (timezone, preferences)
├── MEMORY.md    # Long-term memory
├── TOOLS.md     # Your local tool configs (API keys, etc.)
├── memory/      # Daily logs
└── skills/      # Installed skills
```

Edit `USER.md` first - tell ClawdBot your name and timezone:

```markdown
# USER.md
- **Name:** Alex
- **Timezone:** Europe/Paris
```

## Install Skills

Skills extend what ClawdBot can do:

```bash
clawdhub search "weather"
clawdhub install weather
```

Now ClawdBot knows weather commands. Try: "What's the weather in Tokyo?"

## Set Up Reminders

ClawdBot can remind you of things:

> "Remind me in 2 hours to check the oven"

It creates a cron job and pings you when the time comes.

## Background Tasks

Need something done while you do other stuff?

> "Spawn a task to research the top 5 AI news stories today"

ClawdBot creates a sub-agent, does the work, and reports back.

## Tips

1. **Be direct** - "Search for X" not "Could you please search for X if you don't mind"
2. **It has memory** - Reference past conversations: "That project we discussed yesterday"
3. **It can see images** - Send photos on WhatsApp, it'll describe them
4. **Mistakes happen** - If it does something wrong, just tell it

## What's Next?

- Set up your preferred channels (Telegram, Discord, Slack)
- Create custom skills for your workflows
- Configure heartbeats for proactive check-ins
- Explore the docs: https://docs.clawd.bot

## Common Commands

```bash
clawdbot status          # Check what's running
clawdbot chat            # Interactive chat
clawdbot gateway start   # Start background service
clawdbot gateway stop    # Stop it
clawdbot link            # WhatsApp QR
clawdbot config          # Edit config
```

That's it. You're ready. Go break things.
