# AGENTS.md

## Purpose

This repository is a catalog of Codex-compatible skills in the Vercel `skills` format.

The main unit of work here is not an application feature. It is a skill folder under `skills/<skill-name>/` with:
- `SKILL.md` as the source of truth
- `agents/openai.yaml` for UI metadata
- optional `references/`, `scripts/`, and `assets/`

When working in this repository, optimize for skill quality, trigger clarity, and low-context instructions.

## Repository Goals

- Keep each skill narrowly scoped and easy to trigger.
- Prefer operationally useful skills over vague brainstorming prompts.
- Preserve progressive disclosure: compact `SKILL.md`, deeper material in `references/` only when needed.
- Keep the catalog consistent so it installs cleanly via `npx skills add`.

## Directory Conventions

Each skill should follow this structure:

```text
skills/<skill-name>/
├── SKILL.md
├── agents/
│   └── openai.yaml
├── references/        # optional
├── scripts/           # optional
└── assets/            # optional
```

Rules:
- Skill folder name must match the `name:` in frontmatter.
- Use lowercase letters, digits, and hyphens only.
- Do not add extra repo clutter such as per-skill `README.md`, changelogs, or installation notes.
- If a skill needs examples or deeper guidance, prefer `references/`.

## What Good Skills Look Like Here

A good skill in this repo:
- has a clear trigger in the `description`
- says when to use it and when not to use it
- gives a concrete workflow, not generic advice
- helps the agent make decisions under ambiguity
- stays concise in `SKILL.md`
- uses references only for details that would otherwise bloat the main file

A weak skill in this repo:
- overlaps heavily with another skill without a clear boundary
- explains obvious concepts at length
- reads like marketing copy
- lacks operational steps
- depends on hidden knowledge not bundled in the repo

## Editing Rules

When creating or updating a skill:

1. Start from the user task the skill should unlock.
2. Write or tighten the `description` so the trigger is explicit.
3. Keep `SKILL.md` action-oriented and compact.
4. Add `references/` only when there is enough variant-specific or detailed material to justify it.
5. Keep `agents/openai.yaml` aligned with the actual scope and tone of `SKILL.md`.
6. If a skill is listed in `README.md`, update the README in the same change.

Do not:
- duplicate long content between `SKILL.md` and `references/`
- create references that are never mentioned from `SKILL.md`
- add scripts unless determinism or reuse clearly justifies them
- silently expand a skill's scope into a second domain

## README Expectations

If the catalog changes, keep [README.md](/Users/matheuspuppe/Desktop/Projetos/github/codex-agent-skills/README.md) current.

Update the README when:
- a skill is added or removed
- a skill changes category or purpose
- installation examples need to include a new flagship skill
- product positioning of the repo changes

The README should stay high-signal:
- short description of the repo
- current skill list with one-line explanations
- install examples
- example prompts when useful

## Writing Style

Default style for skills in this repo:
- concise
- concrete
- procedural
- pragmatic

Prefer:
- "Use this skill when..."
- "Start by..."
- "If X, do Y"

Avoid:
- long theory sections
- repeated context the model already knows
- hype, fluff, or slogans
- excessively broad statements like "improve product quality"

## Metadata Rules

For `agents/openai.yaml`:
- `display_name` should be short and human-readable
- `short_description` should describe the job, not the aspiration
- `default_prompt` should be specific enough to show intended usage
- only include icons and `brand_color` when they are actually present and coherent

If icons are added:
- keep them lightweight SVGs
- match the visual simplicity of the existing catalog

## Existing Skill Families

This repository currently has two main families:

- `ralph-tui*`
  Use for Ralph TUI setup, execution, PRD-to-run workflows, Beads integration, Codex integration, and remote orchestration.

- product-thinking skills
  Use for user-journey simulation, scenario critique, and exposing product narrative weaknesses.

Do not blur these families unless a new skill genuinely spans both and the trigger surface is still clear.

## Validation Checklist

Before finishing a change, verify:
- the skill folder name matches frontmatter name
- `SKILL.md` has valid frontmatter with `name` and `description`
- `agents/openai.yaml` exists for user-facing skills
- every referenced local file actually exists
- `README.md` reflects the current catalog when relevant
- no unnecessary files were added

## Change Philosophy

Prefer small, composable skills over giant umbrella skills.

If a new request sounds adjacent to an existing skill, first ask:
- should this be a tighter update to an existing skill?
- should this be a sibling skill with a sharper boundary?
- is this a reference file, not a new skill?

Default to the smallest coherent addition.
