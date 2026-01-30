---
name: tutorial-automations
version: 1.0.0
description: Cron jobs, reminders, heartbeats, and proactive AI. Make ClawdBot work while you sleep.
---

# ClawdBot Automations

ClawdBot isn't just reactive. It can work in the background, check things, remind you, and take action on its own.

## Reminders

The simplest automation. Just ask:

> "Remind me in 2 hours to take out the trash"
> "Remind me tomorrow at 9am about the standup"
> "Remind me every Monday at 10am to review PRs"

ClawdBot creates a cron job and pings you when it fires.

## Cron Jobs

For more control, define cron jobs directly:

```bash
# List existing jobs
clawdbot cron list

# Add a job
clawdbot cron add --schedule "0 9 * * *" --text "Good morning! Here's your daily briefing..."
```

Or ask ClawdBot:
> "Set up a daily cron job at 8am that checks my email and summarizes unread messages"

### Cron Syntax

```
┌───────────── minute (0-59)
│ ┌───────────── hour (0-23)
│ │ ┌───────────── day of month (1-31)
│ │ │ ┌───────────── month (1-12)
│ │ │ │ ┌───────────── day of week (0-6, Sunday=0)
│ │ │ │ │
* * * * *
```

Examples:
- `0 9 * * *` - 9am daily
- `*/30 * * * *` - Every 30 minutes
- `0 9 * * 1` - 9am every Monday
- `0 9,18 * * *` - 9am and 6pm daily

## Heartbeats

Heartbeats are periodic check-ins. ClawdBot wakes up, reads `HEARTBEAT.md`, and acts on it.

Configure in your config:
```yaml
heartbeat:
  enabled: true
  intervalMinutes: 30
```

Create `HEARTBEAT.md` in your workspace:

```markdown
# HEARTBEAT.md

## Morning Check (7-8am UTC)
If current time is between 7:00-8:00 UTC:
- Check email for urgent messages
- Review today's calendar
- Send me a morning briefing

## Afternoon (14:00 UTC)
- Check if any meetings were missed
- Remind about unfinished tasks

## Evening (18:00 UTC)
- Summarize what got done today
```

### Heartbeats vs Cron

**Heartbeats:**
- Good for batching multiple checks
- Has conversational context
- Timing can drift

**Cron:**
- Exact timing
- Isolated execution
- Better for one-shot tasks

## Sub-Agents (Spawn)

Offload work to background agents:

> "Spawn a task to research competitor pricing and write a report"

ClawdBot creates a separate session, does the work, and reports back when done. You can keep chatting while it works.

### Spawn Options

```
spawn --task "Research X" --model claude-sonnet --timeout 600
```

- Different model for cost control
- Timeout to prevent runaway tasks
- Label for easy tracking

Check on spawned tasks:
> "What tasks are running?"
> "Check on the research task"

## Practical Automations

### Daily Briefing
```markdown
# HEARTBEAT.md
If it's 8am:
1. Check weather
2. List today's calendar events
3. Summarize unread emails (top 5)
4. Check GitHub notifications
5. Send all this to me on WhatsApp
```

### News Monitor
> "Set up a cron job to check Hacker News every 4 hours and alert me if anything about AI agents hits the front page"

### Inbox Zero Helper
> "Every evening at 6pm, summarize my unread emails and draft responses for anything that needs a reply"

### Health Reminder
> "Remind me every 2 hours between 9am and 6pm to stand up and stretch"

### Project Watchdog
> "Spawn a task that monitors our production logs and alerts me if error rate exceeds 1%"

## Managing Automations

```bash
# List all cron jobs
clawdbot cron list

# Remove a job
clawdbot cron remove --id <job-id>

# Disable temporarily
clawdbot cron disable --id <job-id>

# Run manually (test)
clawdbot cron run --id <job-id>
```

## Tips

1. **Start simple** - One reminder before building complex automations
2. **Test timing** - Make sure your timezone is set correctly in USER.md
3. **Don't over-automate** - 50 cron jobs = chaos
4. **Log outputs** - Check what your automations are doing
5. **Use heartbeats for related tasks** - Batch similar checks together

## Example: Full Daily Setup

```markdown
# HEARTBEAT.md

## Track last checks
Load from memory/heartbeat-state.json

## Morning Briefing (7-8am)
- Weather check
- Calendar preview
- Email summary
- GitHub notifications
- Send digest to WhatsApp

## Midday (12-13pm)
- Meeting prep for afternoon calls
- Remind about lunch

## Evening (18-19pm)
- Day summary
- Tomorrow preview
- Any urgent emails?

## Late Night (after 23:00)
- Stay quiet unless urgent
```

Your AI, working while you live your life.
