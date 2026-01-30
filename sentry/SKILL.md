---
name: sentry
description: Track errors and performance via Sentry API. Manage issues, releases, and alerts.
metadata: {"clawdbot":{"emoji":"🐛","requires":{"env":["SENTRY_AUTH_TOKEN","SENTRY_ORG"]}}}
---
# Sentry
Error tracking and monitoring.
## Environment
```bash
export SENTRY_AUTH_TOKEN="xxxxxxxxxx"
export SENTRY_ORG="my-org"
```
## List Projects
```bash
curl "https://sentry.io/api/0/organizations/$SENTRY_ORG/projects/" \
  -H "Authorization: Bearer $SENTRY_AUTH_TOKEN"
```
## List Issues
```bash
curl "https://sentry.io/api/0/projects/$SENTRY_ORG/{project}/issues/" \
  -H "Authorization: Bearer $SENTRY_AUTH_TOKEN"
```
## Resolve Issue
```bash
curl -X PUT "https://sentry.io/api/0/issues/{issueId}/" \
  -H "Authorization: Bearer $SENTRY_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "resolved"}'
```
## Create Release
```bash
curl -X POST "https://sentry.io/api/0/organizations/$SENTRY_ORG/releases/" \
  -H "Authorization: Bearer $SENTRY_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"version": "1.0.0", "projects": ["my-project"]}'
```
## Links
- Dashboard: https://sentry.io
- Docs: https://docs.sentry.io/api/
