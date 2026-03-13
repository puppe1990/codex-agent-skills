---
name: ralph-tui
description: Configurar, operar e diagnosticar o Ralph TUI, um orquestrador terminal para loops autônomos de agentes de código com PRDs, trackers e skills. Use quando Codex precisar instalar o Ralph TUI, preparar um projeto com `ralph-tui setup`, criar ou converter PRDs, iniciar execuções com `ralph-tui run`, retomar sessões, inspecionar `status` ou `logs`, instalar skills empacotadas, ajustar configuração local/global ou configurar controle remoto de instâncias Ralph.
---

# Ralph TUI

Orquestre fluxos com Ralph TUI sem reinventar o processo a cada vez. Siga um fluxo curto: confirmar pré-requisitos, escolher o tracker e o agente, criar ou apontar a fonte de tarefas, rodar o loop, e então diagnosticar bloqueios com `status`, `logs`, `doctor` ou `info`.

## Fluxo de trabalho

1. Confirmar se o projeto já usa Ralph TUI.
2. Verificar se `ralph-tui` e o runtime esperado estão instalados.
3. Descobrir a fonte de tarefas.
4. Preparar configuração mínima.
5. Rodar, retomar ou diagnosticar.

### 1. Confirmar o contexto

Antes de agir, identificar:
- Se existe `.ralph-tui/config.toml` no projeto.
- Se o usuário quer usar `prd.json`, Beads, Beads Rust ou outro tracker suportado.
- Qual agente CLI deve ser usado: Claude Code, Codex, OpenCode, Gemini CLI, Kiro ou outro suportado.
- Se a meta é execução local, headless, ou remota com `--listen`.

Se o repositório já tiver convenções de tracker, preserve-as. Não migre de tracker sem necessidade explícita.

### 2. Verificar instalação

Usar primeiro comandos simples de detecção:
- `ralph-tui --version`
- `bun --version`
- `ralph-tui plugins agents`
- `ralph-tui plugins trackers`

Se o binário não existir, orientar ou executar a instalação padrão:

```bash
bun install -g ralph-tui
```

Se a tarefa for diagnosticar ambiente quebrado, prefira `ralph-tui doctor` e `ralph-tui info` antes de editar configuração manualmente.

### 3. Escolher a fonte de tarefas

Use este mapa rápido:
- Se o usuário já tem `prd.json`, rode com `--prd`.
- Se o usuário tem um PRD em Markdown e quer gerar tarefas, use `ralph-tui create-prd` ou `ralph-tui convert`.
- Se o projeto usa Beads ou Beads Rust, peça ou descubra o `epic` e rode com `--epic`.
- Se o usuário quer apenas preparar o projeto, comece com `ralph-tui setup`.

Se precisar da sintaxe exata dos comandos, leia [commands.md](./references/commands.md).

### 4. Configurar com o menor atrito possível

O caminho padrão para primeiro setup é:

```bash
ralph-tui setup
```

Esse wizard cria `.ralph-tui/config.toml` no projeto. Prefira o wizard em vez de escrever o TOML do zero, salvo quando o usuário pedir edição manual.

Ao revisar configuração:
- Configuração de projeto: `.ralph-tui/config.toml`
- Configuração global: `~/.config/ralph-tui/config.toml`
- Templates globais: `~/.config/ralph-tui/templates/`

Respeite a precedência projeto > global. Ao depurar comportamento inesperado, sempre verifique se há override local.

### 5. Executar o loop certo

Escolha o comando pela intenção:
- Execução padrão: `ralph-tui run`
- Execução com PRD JSON: `ralph-tui run --prd ./prd.json`
- Execução com epic: `ralph-tui run --epic <id>`
- Execução sem TUI: `ralph-tui run --headless`
- Execução limitada: `ralph-tui run --iterations <n>`
- Retomar sessão: `ralph-tui resume`

Prefira `resume` quando existir sessão interrompida. Não recomece do zero sem necessidade, porque isso pode duplicar trabalho ou perder contexto operacional salvo pelo Ralph.

## Diagnóstico

Quando algo falhar, siga esta ordem:

1. `ralph-tui status`
2. `ralph-tui logs`
3. `ralph-tui doctor`
4. `ralph-tui info`

Use `status` para saber se há sessão ativa, `logs` para ver uma iteração específica, `doctor` para problemas de integração com agentes, e `info` para coletar dados de ambiente.

Sinais comuns:
- Agente não detectado: verificar CLI instalada e `ralph-tui plugins agents`.
- Tracker inválido ou incompleto: revisar `setup`, `--prd`, `--epic` e a configuração resolvida.
- Sessão travada: tentar `resume` antes de reiniciar.
- Diferença entre máquinas: comparar config global e config do projeto.

## Skills empacotadas

O Ralph TUI já publica skills próprias para agentes compatíveis com `add-skill`. Use esse caminho quando o usuário quiser instalar skills do ecossistema Ralph em vez de apenas rodar o TUI.

Fluxo preferido:
- Listar skills disponíveis com `ralph-tui skills list`
- Instalar com `ralph-tui skills install`
- Restringir por agente com `--agent`
- Usar `--copy` se instalação por symlink falhar

Se o usuário quiser instalar direto no ecossistema `add-skill`, usar a sintaxe oficial documentada na referência.

## Execução remota

Use recursos remotos apenas quando o usuário explicitamente quiser controlar outra máquina.

Fluxo:
1. Na máquina remota, iniciar com `ralph-tui run --listen ...`
2. Salvar o token gerado.
3. Na máquina cliente, cadastrar com `ralph-tui remote add ... --token ...`
4. Validar com `ralph-tui remote test <alias>`

Ao propagar configuração para remotos, lembrar que o Ralph pode empurrar config global ou de projeto. Verificar o escopo antes de sobrescrever algo existente.

## Boas decisões operacionais

- Preferir setup guiado e comandos de inspeção antes de editar arquivos à mão.
- Preservar o tracker já adotado pelo projeto.
- Usar `--headless` para CI ou automação sem TUI.
- Usar `--sandbox` quando o objetivo exigir maior isolamento.
- Usar `logs`, `status` e `info` como fonte de verdade operacional antes de inferir o problema.
- Não assumir que uma skill do Ralph já está instalada no agente; verificar primeiro.

## Referência enxuta

Ler [commands.md](./references/commands.md) apenas quando precisar:
- sintaxe exata de comandos comuns
- instalação de skills
- comandos remotos
- arquivos importantes de configuração
