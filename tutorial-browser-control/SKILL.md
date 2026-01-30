---
name: tutorial-browser-control
version: 1.0.0
description: Control browsers with ClawdBot. Screenshots, automation, form filling, and web scraping.
---

# Browser Control with ClawdBot

ClawdBot can see and control web browsers. Screenshots, clicking buttons, filling forms, scraping data.

## Two Modes

### 1. Managed Browser (Clawd Profile)

ClawdBot launches and controls its own browser:

> "Open a browser and go to github.com"
> "Take a screenshot of the page"
> "Click the Sign In button"

This is isolated - won't affect your browsing.

### 2. Chrome Extension Relay

Control your actual Chrome tabs:

1. Install the ClawdBot Browser Relay extension
2. Click the extension icon on a tab to attach it
3. Now ClawdBot can see and control that tab

> "What's on this page?"
> "Click the download button"
> "Fill in the search box with 'AI news'"

This sees your logged-in sessions, cookies, etc.

## Basic Commands

### Screenshots

> "Take a screenshot of my browser"
> "Screenshot the full page (scroll capture)"

### Navigation

> "Go to https://news.ycombinator.com"
> "Click the 'new' link"
> "Go back"

### Reading Content

> "What's on this page?"
> "Read the main article"
> "List all the links"

### Interaction

> "Click the login button"
> "Type 'hello world' in the search box"
> "Press Enter"
> "Scroll down"

## Form Automation

ClawdBot can fill forms:

> "Fill out this form with:
> - Name: Alex
> - Email: alex@example.com
> - Message: Hello!"

Or more complex:
> "Fill in the shipping address with my saved address from TOOLS.md"

## Web Scraping

Extract data from pages:

> "Get all the product names and prices from this page"
> "Extract the table data as JSON"
> "List all article titles with their links"

## Login Flows

ClawdBot can handle logins (use Chrome Relay for your sessions):

> "Log into Twitter" (if cookies are available)
> "Navigate through the OAuth flow"

For 2FA, it'll pause and ask you to complete the verification.

## Practical Examples

### Check Stock Price
> "Go to Yahoo Finance and get Apple's current stock price"

### Monitor a Page
> "Check if this product is back in stock"

### Fill Job Applications
> "Open this job posting and fill in my application"

### Research Mode
> "Open 5 tabs with the top Google results for 'best project management tools' and summarize each"

## Snapshot vs Screenshot

**Screenshot** = Image of the page (what you'd see)
**Snapshot** = Structured data of the DOM (what ClawdBot can interact with)

When ClawdBot "sees" a page, it gets a snapshot - elements with refs like `e12`, `button[Login]`, etc. This is how it knows what to click.

## Debugging

If clicking doesn't work:
> "Take a snapshot and show me the elements"

You'll see the page structure. Then:
> "Click element e15"

## Rate Limits and Ethics

- Don't scrape aggressively
- Respect robots.txt
- Don't automate logins to services that prohibit it
- Be careful with your Chrome Relay - ClawdBot sees everything

## Advanced: Headless Mode

For background automation, ClawdBot can run browsers headlessly:

> "In the background, check these 10 URLs and report which are down"

No visible browser window, just results.

## Tips

1. **Start with managed browser** - Safer for learning
2. **Use relay for logged-in stuff** - Your sessions, your data
3. **Be specific** - "Click the blue Submit button" > "Click submit"
4. **Verify actions** - "Take a screenshot after clicking"
5. **Timeouts exist** - Slow pages might need patience

## Example Workflow

```
You: Open a browser and go to producthunt.com
Bot: [Opens browser, navigates]

You: Screenshot
Bot: [Shows screenshot]

You: What are the top 5 products today?
Bot: [Reads page, lists products]

You: Click on the first one
Bot: [Clicks, page loads]

You: Summarize this product
Bot: [Reads product page, summarizes]
```

The web, at your command.
