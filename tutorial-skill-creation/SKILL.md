---
name: tutorial-skill-creation
version: 1.0.0
description: Build your own ClawdBot skills. From simple prompts to full CLI integrations.
---

# Creating ClawdBot Skills

Skills are how you teach ClawdBot new tricks. They range from simple (a markdown file with instructions) to complex (TypeScript with API integrations).

## Anatomy of a Skill

At minimum, a skill is a folder with a `SKILL.md`:

```
my-skill/
└── SKILL.md
```

That's it. The SKILL.md contains instructions ClawdBot follows when the skill is triggered.

## Your First Skill

Let's make one that helps write commit messages:

```bash
mkdir -p ~/clawd/skills/commit-helper
```

Create `SKILL.md`:

```markdown
---
name: commit-helper
version: 1.0.0
description: Generate conventional commit messages from staged changes.
---

# Commit Helper

When asked to help with a commit:

1. Run `git diff --staged` to see changes
2. Analyze what changed
3. Generate a conventional commit message:
   - feat: new feature
   - fix: bug fix
   - docs: documentation
   - refactor: code restructure
   - test: adding tests
   - chore: maintenance

Keep messages under 72 chars. Be specific about what changed.

Example:
- ❌ "Updated code"
- ✅ "fix(auth): handle expired tokens in refresh flow"
```

Done. Now "help me write a commit message" triggers this skill.

## Adding Tools

Skills can include executable scripts. ClawdBot runs them when needed.

Add a helper script:

```bash
#!/usr/bin/env bash
# commit-helper/suggest.sh
git diff --staged --stat
echo "---"
git diff --staged | head -100
```

Reference it in SKILL.md:

```markdown
## Tools

Run `./suggest.sh` to get a summary of staged changes.
```

## Skill Metadata

The frontmatter controls how your skill appears:

```yaml
---
name: my-skill              # Unique identifier
version: 1.0.0              # Semver
description: Does X and Y   # Shows in search results
allowed-tools:              # Optional: restrict what tools the skill can use
  - Read
  - exec
  - web_search
---
```

## API Integration Example

Let's make a skill that checks Hacker News:

```markdown
---
name: hackernews
version: 1.0.0
description: Get top stories from Hacker News.
---

# Hacker News

Fetch top stories:

\`\`\`bash
curl -s "https://hacker-news.firebaseio.com/v0/topstories.json" | jq '.[0:10]'
\`\`\`

Get story details:

\`\`\`bash
curl -s "https://hacker-news.firebaseio.com/v0/item/{id}.json"
\`\`\`

When asked about HN:
1. Fetch top 10 story IDs
2. Get details for each
3. Format as a readable list with title, score, and URL
```

## TypeScript Skills

For complex logic, write TypeScript:

```
my-api-skill/
├── SKILL.md
├── client.ts
└── package.json
```

`client.ts`:
```typescript
#!/usr/bin/env npx ts-node

const API_KEY = process.env.MY_API_KEY;

async function main() {
  const response = await fetch('https://api.example.com/data', {
    headers: { 'Authorization': `Bearer ${API_KEY}` }
  });
  console.log(await response.json());
}

main();
```

Reference in SKILL.md:
```markdown
## Setup

Set `MY_API_KEY` in environment or TOOLS.md.

## Usage

Run `./client.ts` to fetch data.
```

## Best Practices

1. **Clear triggers** - Describe when the skill should activate
2. **Examples** - Show input/output examples
3. **Error handling** - What to do when things fail
4. **Keep it focused** - One skill = one job

## Publishing to ClawdHub

Share your skill with others:

```bash
clawdhub login
clawdhub publish ./my-skill --slug my-skill --name "My Skill" --version 1.0.0
```

Updating:
```bash
clawdhub publish ./my-skill --slug my-skill --version 1.0.1 --changelog "Fixed edge case"
```

## Skill Ideas

- **PR reviewer** - Analyze pull requests against coding standards
- **Meeting prep** - Pull calendar + context before meetings
- **Email drafter** - Generate responses matching your tone
- **Code explainer** - Break down complex functions
- **Dependency checker** - Find outdated packages

The limit is your imagination (and API rate limits).
