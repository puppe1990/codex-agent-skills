# Ralph TUI Commands

## Instalação e detecção

```bash
bun install -g ralph-tui
ralph-tui --version
bun --version
ralph-tui plugins agents
ralph-tui plugins trackers
```

## Setup e criação de PRD

```bash
ralph-tui setup
ralph-tui create-prd
ralph-tui create-prd --chat
ralph-tui create-prd --agent claude
ralph-tui convert --to json ./prd.md
```

## Execução

```bash
ralph-tui run
ralph-tui run --prd ./prd.json
ralph-tui run --epic my-epic-id
ralph-tui run --agent claude --model sonnet
ralph-tui run --iterations 5
ralph-tui run --headless
ralph-tui run --sandbox
ralph-tui resume
ralph-tui status
ralph-tui logs
ralph-tui doctor
ralph-tui info
```

## Skills

```bash
ralph-tui skills list
ralph-tui skills install
ralph-tui skills install --agent claude
ralph-tui skills install --copy

bunx add-skill subsy/ralph-tui --all
bunx add-skill subsy/ralph-tui -a claude-code -g -y
```

## Remoto

```bash
ralph-tui run --listen --prd ./prd.json
ralph-tui run --listen --listen-port 8080 --epic my-epic
ralph-tui run --listen --rotate-token --prd ./prd.json

ralph-tui remote add prod server.example.com:7890 --token TOKEN
ralph-tui remote list
ralph-tui remote test prod
ralph-tui remote remove prod
ralph-tui remote push-config prod
ralph-tui remote push-config --all
ralph-tui remote push-config prod --preview
ralph-tui remote push-config prod --scope global
ralph-tui remote push-config prod --scope project
```

## Arquivos importantes

- Projeto: `.ralph-tui/config.toml`
- Global: `~/.config/ralph-tui/config.toml`
- Templates globais: `~/.config/ralph-tui/templates/`
- Registro de sessões: `~/.config/ralph-tui/sessions.json`
- Config remota: `~/.config/ralph-tui/remotes.toml`
- Token remoto: `~/.config/ralph-tui/remote.json`
- Auditoria remota: `~/.config/ralph-tui/audit.log`
