# Codex Agent Skills

A Codex-focused skills repository organized in the format expected by the Vercel `skills` CLI.

Each skill lives inside `skills/<skill-name>/` and includes at least one `SKILL.md` file. This layout matches the format accepted by `npx skills add`, which can install skills from a GitHub repository, git URL, or local path.

This repository currently has two families of skills:
- `ralph-tui*` skills for operating Ralph TUI workflows with Codex, PRDs, Beads, and remote execution
- product-engineering skills for critique, UX empathy, naming, NFR prioritization, and actionable diagnostics

## Included Skills

### Ralph TUI

- `ralph-tui`: base skill to set up, run, resume, and diagnose Ralph TUI flows
- `ralph-tui-codex`: specialized flow for running Ralph TUI with Codex as the agent
- `ralph-tui-prd-run`: takes a PRD from idea or Markdown to an executable Ralph TUI run
- `ralph-tui-remote`: configures and operates remote Ralph TUI instances
- `ralph-tui-beads`: uses Beads or Beads Rust as the source of work instead of `prd.json`

### Product Engineering: Journey Critique

- `scenario-plot-hole-detective`: simulates user journeys, finds skipped steps, discovery gaps, and edge cases; plain-language job: journey critique
- `product-plot-hole-roast`: a sharper, more adversarial critique for exposing fragile product narratives and adoption risks; plain-language job: proposal critique

### Product Engineering: UX Empathy and Discoverability

- `shoe-shifting-selective-amnesia`: reviews UX and flows as if the reviewer had no implementation knowledge, testing signifiers and discoverability

### Product Engineering: Language and Ontology

- `ontology-mapping-naming`: maps product concepts and improves naming so terminology matches the user's mental model

### Product Engineering: Product Architecture and NFRs

- `nfr-optimizer`: connects latency, availability, and reliability work to user journeys, scenario metrics, and business outcomes

### Product Engineering: Diagnostics and Prevention

- `actionable-diagnostics-shift-left`: rewrites errors and warnings so they are contextual, actionable, and triggered earlier when possible

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
    ├── shoe-shifting-selective-amnesia/
    ├── ontology-mapping-naming/
    ├── nfr-optimizer/
    └── actionable-diagnostics-shift-left/
```

## When To Use Which Skill

### Product Engineering Categories

The product-engineering skills can be selected by category:

1. Journey critique
   `scenario-plot-hole-detective`, `product-plot-hole-roast`
2. UX empathy and discoverability
   `shoe-shifting-selective-amnesia`
3. Language and ontology
   `ontology-mapping-naming`
4. Product architecture and NFRs
   `nfr-optimizer`
5. Diagnostics and prevention
   `actionable-diagnostics-shift-left`

These skills are complementary rather than redundant. A good sequence is often:
- simulate the journey
- pressure-test the proposal
- remove builder knowledge
- tighten naming
- prioritize NFR work
- improve diagnostics and prevention

### Skill Selection

Use `scenario-plot-hole-detective` when you want a structured review of a PRD, spec, feature flow, or UX journey through the lens of persona + motivation + full scenario simulation.

Use `product-plot-hole-roast` when you want a harder critique that calls out convenient assumptions, incomplete stories, discovery failures, bad recovery paths, and likely adoption problems without softening the message.

Use `shoe-shifting-selective-amnesia` when you want to test whether the interface, names, and flow still make sense after stripping away all internal knowledge that only the builders have.

Use `ontology-mapping-naming` when the problem is conceptual language itself: product terms, labels, categories, and names that do not match the user's ontology or make related concepts hard to distinguish.

Use `nfr-optimizer` when the question is where to improve latency, availability, consistency, or scale from a product perspective, based on which user journeys and business outcomes are most affected.

Use `actionable-diagnostics-shift-left` when the problem is confusing errors, weak warnings, late validations, or costly user mistakes that should be intercepted earlier.

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

Install one of the product-engineering skills:

```bash
npx skills add /path/to/codex-agent-skills --skill scenario-plot-hole-detective -a codex -g -y
npx skills add /path/to/codex-agent-skills --skill product-plot-hole-roast -a codex -g -y
npx skills add /path/to/codex-agent-skills --skill shoe-shifting-selective-amnesia -a codex -g -y
npx skills add /path/to/codex-agent-skills --skill ontology-mapping-naming -a codex -g -y
npx skills add /path/to/codex-agent-skills --skill nfr-optimizer -a codex -g -y
npx skills add /path/to/codex-agent-skills --skill actionable-diagnostics-shift-left -a codex -g -y
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

Install one of the product-engineering skills from GitHub:

```bash
npx skills add puppe1990/codex-agent-skills --skill scenario-plot-hole-detective -a codex -g -y
npx skills add puppe1990/codex-agent-skills --skill product-plot-hole-roast -a codex -g -y
npx skills add puppe1990/codex-agent-skills --skill shoe-shifting-selective-amnesia -a codex -g -y
npx skills add puppe1990/codex-agent-skills --skill ontology-mapping-naming -a codex -g -y
npx skills add puppe1990/codex-agent-skills --skill nfr-optimizer -a codex -g -y
npx skills add puppe1990/codex-agent-skills --skill actionable-diagnostics-shift-left -a codex -g -y
```

## Example Prompts

```text
Use $scenario-plot-hole-detective to review this PRD for skipped steps, edge cases, and discovery gaps.

Use $product-plot-hole-roast to tear apart this onboarding proposal and show why adoption might fail.

Use $shoe-shifting-selective-amnesia to review this UI as if you had no implementation knowledge and tell me where the interface is expecting mind-reading.

Use $ontology-mapping-naming to review this product's terminology and suggest more idiomatic, domain-native names.

Use $nfr-optimizer to tell me whether we should improve search latency or checkout latency first based on user journeys and conversion impact.

Use $actionable-diagnostics-shift-left to rewrite these error messages so users understand what failed and what to do next, and suggest where to validate earlier.

Use $ralph-tui-prd-run to turn this PRD into a runnable Ralph TUI workflow.
```

## Product Engineering Coverage

Taken together, the product-engineering skills cover five recurring product-minded engineering categories:

- Journey critique
  Is the journey complete, or does the story have plot holes? Is the proposal weak under stronger criticism?
- UX empathy and discoverability
  Does the interface still work when we remove builder-only knowledge?
- Language and ontology
  Do the names and concepts match the user's ontology?
- Product architecture and NFRs
  Are we optimizing the right nonfunctional requirement for user and business impact?
- Diagnostics and prevention
  Are failures explained clearly and prevented early enough?

## Notes

- `-g` installs into the agent's global directory.
- Without `-g`, installation is local to the current project.
- `-a codex` limits installation to the Codex agent.
- `-y` skips interactive prompts.

Reference for the repository layout and CLI behavior: [vercel-labs/skills](https://github.com/vercel-labs/skills).
