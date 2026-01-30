---
name: tutorial-whatsapp-setup
version: 1.0.0
description: Connect ClawdBot to WhatsApp. QR linking, multi-device, and troubleshooting.
---

# WhatsApp Setup for ClawdBot

Turn WhatsApp into your AI command center.

## Quick Start

```bash
# 1. Start the gateway
clawdbot gateway start

# 2. Generate QR code
clawdbot link

# 3. Scan with WhatsApp
#    Settings → Linked Devices → Link a Device
```

That's it. Message yourself to test.

## How It Works

ClawdBot uses WhatsApp Web's multi-device feature. It's a linked device, just like WhatsApp Desktop or Web. Your messages stay end-to-end encrypted.

The session persists until you unlink it or it expires (~14 days of inactivity).

## Configuration

Edit your config (`clawdbot config`) to customize:

```yaml
channels:
  whatsapp:
    enabled: true
    # Only respond to these numbers (optional)
    allowlist:
      - "+33670178760"
      - "+1234567890"
    # Or block specific numbers
    blocklist:
      - "+0000000000"
```

### Owner Numbers

Messages from owner numbers get full access. Others may have limited permissions.

```yaml
channels:
  whatsapp:
    owners:
      - "+33670178760"
```

## Group Chats

ClawdBot can join group chats. By default, it only responds when mentioned.

To enable listening to all messages:
```yaml
channels:
  whatsapp:
    groups:
      enabled: true
      listenAll: false  # true = hear everything, false = mentions only
```

## Media Support

ClawdBot can:
- **Receive images** - Describes them using vision
- **Receive voice notes** - Transcribes audio
- **Send images** - When generating or finding images
- **Send files** - PDFs, documents, etc.

## Troubleshooting

### QR Code Won't Scan

1. Make sure gateway is running: `clawdbot gateway status`
2. Try regenerating: `clawdbot link --force`
3. Check your internet connection
4. Update WhatsApp app if needed

### Connection Drops

Sessions expire after ~14 days without activity. If this happens:
1. `clawdbot gateway restart`
2. `clawdbot link` (re-scan QR)

### Messages Not Arriving

1. Check gateway logs: `clawdbot gateway logs`
2. Verify your number is in the allowlist (if using one)
3. Make sure you're messaging the right number

### Rate Limits

WhatsApp has undocumented rate limits. If you're sending many messages:
- Add delays between sends
- Don't bulk-message groups
- Avoid looking like spam

## Security Tips

1. **Use allowlist** - Only let trusted numbers message your bot
2. **Set owners** - Give elevated access only to yourself
3. **Review logs** - Check what commands are being run
4. **Unlink when not needed** - `clawdbot unlink`

## Multi-Account

Want ClawdBot on multiple WhatsApp accounts? Run separate gateway instances with different configs:

```bash
clawdbot gateway start --config ~/config2.yml
```

## Voice Notes

ClawdBot transcribes incoming voice notes automatically. You can also ask it to respond with voice:

> "Send me a voice message explaining quantum computing"

Uses TTS to generate audio responses.

## What Can You Do?

Once connected, try:
- "What's on my calendar today?"
- "Remind me in 30 minutes to call mom"
- "Search the web for best restaurants near me"
- "Take a screenshot of my desktop"
- Send an image: "What's in this photo?"
- "Draft an email to John about the meeting"

Your AI assistant, in your pocket.
