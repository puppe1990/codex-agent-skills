# Codex Agent Skills

A Codex-focused skills repository organized in the format expected by the Vercel `skills` CLI.

Each skill lives inside `skills/<skill-name>/` and includes at least one `SKILL.md` file. This layout matches the format accepted by `npx skills add`, which can install skills from a GitHub repository, git URL, or local path.

## Included Skills

- `ralph-tui`
- `ralph-tui-codex`
- `ralph-tui-prd-run`
- `ralph-tui-remote`
- `ralph-tui-beads`

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
    └── ralph-tui-beads/
```

## Local Installation With Codex

List the skills available in the local repository:

```bash
npx skills add /home/pixxel-dev/Desktop/codex-agent-skills --list
```

Install all skills globally for Codex:

```bash
npx skills add /home/pixxel-dev/Desktop/codex-agent-skills -a codex -g -y
```

Install a single skill:

```bash
npx skills add /home/pixxel-dev/Desktop/codex-agent-skills --skill ralph-tui-codex -a codex -g -y
```

Install into the current project scope instead of the global scope:

```bash
npx skills add /home/pixxel-dev/Desktop/codex-agent-skills --skill ralph-tui
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

## Notes

- `-g` installs into the agent's global directory.
- Without `-g`, installation is local to the current project.
- `-a codex` limits installation to the Codex agent.
- `-y` skips interactive prompts.

Reference for the repository layout and CLI behavior: [vercel-labs/skills](https://github.com/vercel-labs/skills).
