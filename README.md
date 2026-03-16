# Codex Agent Skills

A Codex-focused skills repository organized in the format expected by the Vercel `skills` CLI.

Each skill lives inside `skills/<skill-name>/` and includes at least one `SKILL.md` file. This layout matches the format accepted by `npx skills add`, which can install skills from a GitHub repository, git URL, or local path.

This repository currently has two clusters of skills:
- `ralph-tui*` skills for operating Ralph TUI workflows with Codex, PRDs, Beads, and remote execution
- product-thinking skills for simulating user journeys, stress-testing product ideas, and exposing weak assumptions in PRDs and specs

## Included Skills

- `ralph-tui`: base skill to set up, run, resume, and diagnose Ralph TUI flows
- `ralph-tui-codex`: specialized flow for running Ralph TUI with Codex as the agent
- `ralph-tui-prd-run`: takes a PRD from idea or Markdown to an executable Ralph TUI run
- `ralph-tui-remote`: configures and operates remote Ralph TUI instances
- `ralph-tui-beads`: uses Beads or Beads Rust as the source of work instead of `prd.json`
- `scenario-plot-hole-detective`: simulates user journeys, finds skipped steps, discovery gaps, and edge cases
- `product-plot-hole-roast`: a sharper, more adversarial critique for exposing fragile product narratives and adoption risks
- `shoe-shifting-selective-amnesia`: reviews UX and flows as if the reviewer had no implementation knowledge, testing signifiers and discoverability

## Structure

```text
codex-agent-skills/
├── README.md
├── .gitignore
└── skills/
    ├── ralph-tui/
    ├── ralph-tui-codex/
    ├── ralph-tui-prd-run/
    ├── ralph-tui-remote/
    ├── ralph-tui-beads/
    ├── scenario-plot-hole-detective/
    ├── product-plot-hole-roast/
    └── shoe-shifting-selective-amnesia/
```

## When To Use Which Skill

Use `scenario-plot-hole-detective` when you want a structured review of a PRD, spec, feature flow, or UX journey through the lens of persona + motivation + full scenario simulation.

Use `product-plot-hole-roast` when you want a harder critique that calls out convenient assumptions, incomplete stories, discovery failures, bad recovery paths, and likely adoption problems without softening the message.

Use `shoe-shifting-selective-amnesia` when you want to test whether the interface, names, and flow still make sense after stripping away all internal knowledge that only the builders have.

Use the `ralph-tui*` skills when the task is operational: setting up Ralph, choosing the right tracker, converting PRDs, resuming sessions, or controlling remote runs.

## Local Installation With Codex

List the skills available in the local repository:

```bash
npx skills add /path/to/codex-agent-skills --list
```

Install all skills globally for Codex:

```bash
npx skills add /path/to/codex-agent-skills -a codex -g -y
```

Install a single skill:

```bash
npx skills add /path/to/codex-agent-skills --skill ralph-tui-codex -a codex -g -y
```

Install into the current project scope instead of the global scope:

```bash
npx skills add /path/to/codex-agent-skills --skill ralph-tui
```

Install one of the product-thinking skills:

```bash
npx skills add /path/to/codex-agent-skills --skill scenario-plot-hole-detective -a codex -g -y
npx skills add /path/to/codex-agent-skills --skill product-plot-hole-roast -a codex -g -y
npx skills add /path/to/codex-agent-skills --skill shoe-shifting-selective-amnesia -a codex -g -y
```

## GitHub Installation

Once the repository is published to GitHub, you can install from the `owner/repo` shortcut:

```bash
npx skills add puppe1990/codex-agent-skills -a codex -g -y
```

Install a specific skill from GitHub:

```bash
npx skills add puppe1990/codex-agent-skills --skill ralph-tui-remote -a codex -g -y
```

Install one of the product-thinking skills from GitHub:

```bash
npx skills add puppe1990/codex-agent-skills --skill scenario-plot-hole-detective -a codex -g -y
npx skills add puppe1990/codex-agent-skills --skill product-plot-hole-roast -a codex -g -y
npx skills add puppe1990/codex-agent-skills --skill shoe-shifting-selective-amnesia -a codex -g -y
```

## Example Prompts

```text
Use $scenario-plot-hole-detective to review this PRD for skipped steps, edge cases, and discovery gaps.

Use $product-plot-hole-roast to tear apart this onboarding proposal and show why adoption might fail.

Use $shoe-shifting-selective-amnesia to review this UI as if you had no implementation knowledge and tell me where the interface is expecting mind-reading.

Use $ralph-tui-prd-run to turn this PRD into a runnable Ralph TUI workflow.
```

## Notes

- `-g` installs into the agent's global directory.
- Without `-g`, installation is local to the current project.
- `-a codex` limits installation to the Codex agent.
- `-y` skips interactive prompts.

Reference for the repository layout and CLI behavior: [vercel-labs/skills](https://github.com/vercel-labs/skills).
