---
layout: doc
title: "Broccolini v1.2 Feature Drop — Backup, Recipe Embedding, & Privacy-First Metrics"
date: 2026-10-12
aside: false
---

Since its initial launch two weeks ago, I've been busy adding a batch of new features to <b><i>Broccolini</i></b>: a free, self-hostable nutrition tracker using the [OpenNutrition](https://www.opennutrition.app) dataset.

Version 1.2 includes the following quality-of-life improvements while maintaining the foundation that matters most to me: <b>zero data retention</b>. Everything still lives on your device, and the server stays stateless.

### New Features
- **Backup &amp; Restore** — Export your recipes and daily log entries as JSON files. Share a recipe, merge entries from multiple devices, or use the files as context for a conversation with your favorite LLM agent. No server-side storage of anything personal.
- **Server Recipes** — Have a favorite recipe you want to share with everyone? Drop the exported JSON into your server's `data/recipes/` folder and it'll show up read-only for every user. Each card offers an "Import to my recipes" button that copies it into your own editable collection. LLM agents also get access via the new `getServerRecipes` endpoint.
- **Recipe Embedding** — When building a recipe, you can now pull in other saved recipes as ingredients (by portion count). They flatten into plain food items on save, so it's a snapshot — consistent with the rest of the app — and exported files stay food-only.
- **Anonymous Performance Metrics** — Off by default and strictly opt-in. When enabled, the server writes privacy-respecting hourly and daily rollups: requests per endpoint, latency, errors, and unique daily clients (derived from a rotating, salted hash of the request IP). No IPs, payloads, tool arguments, or user data are ever stored. Toggling it off touches nothing.

#### <a href="https://broccolini.epeters.dev" target="_blank">→ Try the Demo Now!</a>

View code on <a href="https://github.com/edp8489/nutrition-tracker-mcp" target="_blank">GitHub</a>

### Screenshots

<div align="center">
<a href="/assets/nutrition-tracker/feature_v1_2_backup_restore.png" target="_blank"><img src="/assets/nutrition-tracker/feature_v1_2_backup_restore.png" alt="backup-restore" width=720 /></a>
<br /><hr /><br />
<a href="/assets/nutrition-tracker/feature_v1_2_server_recipes.png" target="_blank"><img src="/assets/nutrition-tracker/feature_v1_2_server_recipes.png" alt="server-recipes" width=720 /></a>
<br /><hr /><br />
<a href="/assets/nutrition-tracker/feature_v1_2_recipe_embedding.png" target="_blank"><img src="/assets/nutrition-tracker/feature_v1_2_recipe_embedding.png" alt="recipe-embedding" width=720 /></a>
<br /><hr /><br />
</div>

```
[METRICS] hourly Usage - 2026-10-11T23:00:00–23:59:30 (UTC-07:00 America/Los_Angeles)
     total requests: 119
     http:static: 118
     http:static:404: 1
======
[METRICS] daily Usage - 2026-10-11T00:00:00–23:59:30 (UTC-07:00 America/Los_Angeles)
     total requests: 620
     http:/mcp: 4
     http:static: 611
     http:static:404: 1
     mcp:tool:getIngredientMacros: 1
     mcp:tool:getServerRecipes: 1
     mcp:tool:searchIngredient: 2
     uniqueClients: 2
```

### What's Next
The next pieces are building on the same stateless architecture: cloud backup adapters (Dropbox and Google Drive via the existing `BackupAdapter` seam, OneDrive deferred), continued hardening of the PWA/offline experience, and more. If you have a preference, drop it in the issues.

### Support
If you found this useful and would like to support future projects: 

<a href="https://www.buymeacoffee.com/epetersio" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="height: 48px !important;width: 174px !important;" >
</a>
