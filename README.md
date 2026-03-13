# Codex Agent Skills

Repositório local de skills para Codex, organizado no formato esperado pela CLI `skills` da Vercel.

Cada skill fica dentro de `skills/<nome-da-skill>/` e contém pelo menos um `SKILL.md`. Esse layout segue o formato aceito pela CLI `npx skills add`, que instala skills a partir de um repositório GitHub, URL git ou caminho local.

## Skills incluídas

- `ralph-tui`
- `ralph-tui-codex`
- `ralph-tui-prd-run`
- `ralph-tui-remote`
- `ralph-tui-beads`

## Estrutura

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

## Instalação local com Codex

Listar as skills disponíveis no repositório local:

```bash
npx skills add /home/pixxel-dev/Desktop/codex-agent-skills --list
```

Instalar todas para o Codex globalmente:

```bash
npx skills add /home/pixxel-dev/Desktop/codex-agent-skills -a codex -g -y
```

Instalar apenas uma skill:

```bash
npx skills add /home/pixxel-dev/Desktop/codex-agent-skills --skill ralph-tui-codex -a codex -g -y
```

Instalar no escopo do projeto atual, em vez do escopo global:

```bash
npx skills add /home/pixxel-dev/Desktop/codex-agent-skills --skill ralph-tui
```

## Publicação no GitHub

Depois de subir este repositório para o GitHub, você poderá instalar com o atalho `owner/repo`:

```bash
npx skills add SEU_USUARIO/codex-agent-skills -a codex -g -y
```

Ou instalar uma skill específica:

```bash
npx skills add SEU_USUARIO/codex-agent-skills --skill ralph-tui-remote -a codex -g -y
```

## Notas

- `-g` instala no diretório global do agente.
- Sem `-g`, a instalação é local ao projeto.
- `-a codex` restringe a instalação ao agente Codex.
- `-y` evita prompts interativos.

Fonte do formato e dos comandos: [vercel-labs/skills](https://github.com/vercel-labs/skills).
