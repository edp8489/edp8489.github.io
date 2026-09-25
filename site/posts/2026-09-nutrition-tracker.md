---
layout: doc
title: "Launch Annoucement! Nutrition Tracker + MCP Server"
date: 2026-09-21
aside: false
---

In a complete detour from engineering content, I'm excited to announce a project that'll be useful to the everyday lives of a much wider audience. 

<b><i>Broccolini</i></b>: a free, self-hostable nutrition tracker using the [OpenNutrition](https://www.opennutrition.app) dataset.

Maintaining a journal of your daily food habits, whether for health or fitness purposes, and getting insights into the full nutrient content should be as easy as picking up that afternoon treat you already feel guilty about. After trying a few apps, I got frustrated with bad interfaces, subscription-gated features, and constant attempts to upsell custom recipe plans. 

So I decided to make my own! 

### Features
- Create custom recipes and track meals in a daily food log.
- Weekly reports with daily macronutrient summaries.
- Detailed micronutrient breakdowns for individual recipes and daily logs.
- **Zero data retention**. All recipes and log entries remain on your device. 
- Powered by an MCP server backend that enables integration with your favorite LLM agents and chat interfaces.

#### <a href="https://broccolini.epeters.dev" target="_blank">→ Try the Demo Now!</a>

View code on <a href="https://github.com/edp8489/nutrition-tracker-mcp" target="_blank">GitHub</a>

### Screenshots &mdash; App Interface

<div align="center">
<a href="/assets/nutrition-tracker/app_recipe_editor.png" target="_blank"><img src="/assets/nutrition-tracker/app_recipe_editor.png" alt="recipe-editor" width=720 /></a>
<br />
<a href="/assets/nutrition-tracker/app_day_log.png" target="_blank"><img src="/assets/nutrition-tracker/app_day_log.png" alt="food-log" width=720 /></a>
</div>

### Screenshots &mdash; Chat Agent
Here are two examples of <i>Coach Broccolini</i> acting in agentic mode with the MCP server connected to the OpenWebUI chat interface. Model: [Ornith 1.5:9b](https://huggingface.co/ornith-ai/Ornith-1.5-9B-GGUF)

<div align="center">
<a href="/assets/nutrition-tracker/mcp_chat_1.png" target="_blank"><img src="/assets/nutrition-tracker/mcp_chat_1.png" alt="chat-response-1" width=720 /></a>
<a href="/assets/nutrition-tracker/mcp_chat_2.png" target="_blank"><img src="/assets/nutrition-tracker/mcp_chat_2.png" alt="chat-response-2" width=720 /></a>
<a href="/assets/nutrition-tracker/mcp_chat_3.png" target="_blank"><img src="/assets/nutrition-tracker/mcp_chat_3.png" alt="chat-response-3" width=720 /></a>
<a href="/assets/nutrition-tracker/mcp_chat_4.png" target="_blank"><img src="/assets/nutrition-tracker/mcp_chat_4.png" alt="chat-response-4" width=720 /></a>
</div>

### What's Next
Today's version is fully functional for single-user, single-device use cases. The following quality-of-life features will be rolled out in the coming weeks:

- Import/Export recipe and food log entries
- Cross-device sync
- Printable nutrient reports
- Progressive Web App (PWA) mode for mobile device / offline use


### Support
If you found this useful and would like to support future projects: 

<a href="https://www.buymeacoffee.com/epetersio" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="height: 48px !important;width: 174px !important;" >
</a>
