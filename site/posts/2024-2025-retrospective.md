---
layout: doc
title: "Biennial Retrospective: 2024-2025"
date: 2025-12-31
---

As we enter the final weeks of 2025, maybe it's <i>finally</i> time to post the 2024 
retrospective that has been sitting dormant in my drafts folder for the last 11 months. 
With another year's worth of updates, of course :grimace: 

<del>Hello</del> Farewell 2025! I've been derelict in my posting duties over the last two years, 
but I promise I've been working on things (just ask the folders of half-completed posts, "hello 
world" tech stack demos, and an ever-growing list of tool ideas).

Strap in for an abridged list of updates.

## Website
First of all, new website theme! Part of why I haven't been posting is because I messed up the 
build environment for my previous site generator and after several attempts to sort 
it out, I gave up and decided it would be easier to switch to something more modern. 
So, <i>adieu</i>, Jekyll / Ruby, and welcome to the team, Vitepress / Vue.

### Enginuity
[Enginuity](https://enginuity.epeters.io) is a unified interface for all of my web-apps. 
Each tool will be deployed as a new module. 
See the the [launch announcement](enginuity-launch-announcement.md) for more details.

## Work
December marked my <b>9 year</b> anniversary at Blue Origin. It's weird to think that I've been 
there for more year post-pandemic than I was prior. (I swear 2019 was just 2 years ago, right?)

As I mentioned in my 2023 year-end 
<a href="https://www.linkedin.com/posts/epetersio_im-happy-to-share-that-im-starting-a-new-activity-7185330690689843200-CXH1?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAN_tzQBjQdRhBKc1vSSR_8I8-JcbnhJTjc">LinkedIn post</a>, 
I made a significant position switch for the first time in my tenure at Blue. After 7 years as 
the responsible engineer for the New Shepard Crew Capsule aft structure &mdash; 
during which saw the delivery of the first two CC2.0 increment capsules; <b>human flight 
certification</b> and <a href="">first human flight</a>; 
design, build, and delivery of a <a href="https://www.blueorigin.com/news/blue-origin-debuts-second-human-rated-new-shepard-rocket">third capsule</a>; 
and six successful passenger flights* &mdash;
I became a full-time structural analyst supporting the Crew Capsule escape motor subsystem.

> \* As of January 2024, when I switched roles. The current tally is 17 crewed flights and 96 unique passengers.

The last two years have thrown an endless number of challenging technical problems onto my plate 
and I have learned learned immensely &mdash; especially in the realms of damage tolerance and 
nonlinear analyses.


## LLM Experiments

As my list of analysis tool ideas grew, so did the list of <i>tools to build the tools</i> 
projects. I allowed myself to veer down that second path with the goal of setting up a system 
that could accelerate the implementation of my other ideas, which we'll call a 70% success.

It's no secret that LLM assistants* have been skyrocketing in recent years. I definitely wanted 
to start using these powerful tools, but not through the generic chat interface of ChatGPT or 
Claude that abstracted away every aspect of the implementation. So, in true engineer fashion, I 
decided "screw it, I'll do it myself". Cue a computer upgrade that would allow me to run LLMs 
locally.

> \* Side note: I think it's dangerously misleading to refer to the entire space broadly and 
colloquially as "AI"; it's important to understand the foundation, limitations, and appropriate 
use cases of the technology in order to use them effectively and responsibly.

One of my MIT professors had an interesting take on software that I didn't understand at the 
time but increasingly do as I get older. He loved applications with unintuitive user 
interfaces because they forced you to fully understand how the software worked before you could 
**properly** use it to accomplish your goal. Fancy, polished UIs usually made it easy to produce 
results that **looked** right, even if they weren't. There's no fix for garbage in --> garbage out.

Through [Ollama](https://ollama.com) I was able to run models locally and access them via simple CLI 
interface or Python API. I tinkered with LangChain and countless small Python scripts for 
specific, one-off tasks. I learned, but it definitely wasn't convenient. 

That detour was... marginally successful, at best. Many early document parsing and 
code-generation experiments devolved into nonsense due to limited documentation and
an <span style="color:red;"><b>undocumented</b></span> default setting that limited the context window to 2048 tokens. 
Even as open-source models grew to support 8k, 16k, 32k tokens, that extra capability 
was only utilized if you defined custom model settings (and, frustratingly, knew that you 
needed to).

### Agentic Coding

Throughout 2024, every week brought a new "best new LLM for coding" announcement along with another agentic tool. I didn't come anywhere close to trying all of them, but after testing some of the major players (Cursor, Cline, Bolt, Windsurf IDE) I discovered that <a href="https://aider.chat">aider</a> 
was the best match for my workflow.

This year I took a short training course that leveled-up my usage &mdash; 
<a href="https://agenticengineer.com/principled-ai-coding">Principled AI Coding</a>.

## Home Lab

The unexpected hero of that side quest was my RaspberryPi. Initially its only purpose was to be 
a retro video game emulator console. Fast forward 1.5 years, it's now primarily a Docker host 
and has yet to run a single game. Here's a quick rundown of the setup:

#### Hardware

- RaspberryPi 5, 8GB RAM
    - <a href="https://www.amazon.com/dp/B0CSWB3V4Y?ref=ppx_yo2ov_dt_b_fed_asin_title">Metal case</a>, heatsink, and <a href="https://www.amazon.com/dp/B0CPPGGDQT?ref=ppx_yo2ov_dt_b_fed_asin_title">SSD hat</a>
    - 1 TB SSD (read/write operations are 4x faster compared to the built-in MicroSD card. The boot time alone went from 30+ seconds down to 5 seconds.)
- <a href="https://www.oracle.com/cloud/free/">Cloud VMs</a>: Oracle offers a generous "always free" plan that allows me to have a pair of virtual machines to play around with private and public hosting configurations to figure out my infrastructure needs before I pay for a dedicated provider.

#### Containers

<a href="https://hub.docker.com/r/portainer/portainer-ce">Portainer</a>: Web-based container management interface. It's so easy to create, update, and manage the environment variables of every running container.

<a href="https://www.twingate.com/product/ztna">Twingate Connector</a>: Zero-trust security platform that enables remote access to resources on my home and cloud networks.

<a href="https://pi-hole.net">PiHole</a>: DNS-level ad blocker for every device on my home network.

<a href="https://github.com/open-webui/open-webui">Open-WebUI</a>: 
Web-based chat interface for LLMs, similar to the proprietary ones. 
Originally configured to connect to my local Ollama models, 
I've since pivoted to use all the major league models through the 
<a href="https://openrouter.ai">OpenRouter</a> API.

<a href="https://about.gitea.com/products/gitea/">gitea</a>: Open-source, self-hosted git service with a familiar web interface. Why pay a monthly subscription for private GitHub repos when I can host everything myself?

<a href="https://github.com/Renovamen/oh-my-cv">Oh-My-CV!</a>:
 My least favorite part about r&eacute;sum&eacute; updates &mdash; 
besides having to figure out how to make an accented e &mdash; 
is fixing all of the formatting any time I want to add, edit, or rearrange lines. 
OhMyCV! is a simple single-page-app that decouples the content and formatting, 
allowing you to define all your entries in a simple list-like Markdown file and customize the theme formatting via HTML templates.

<a href="https://adam.dullage.com/posts/flatnotes/">flatnotes</a>: 
Markdown based notes app with a web interface. Over the last few years I've tried a 
few different knowledge databases (Obsidian, its open-source counterpart Logseq, Anytype...) and 
liked the ease of Markdown-based formatting. But each one had unique drawbacks that deterred me from continued use. 
Time and time again I found myself reverting to writing simple markdown files in VS 
Code, then saving them in a local folder that may or may not have been version controlled.
