---
name: ralph-tui-codex
description: Configurar e operar o Ralph TUI usando Codex como agente principal. Use quando Codex precisar verificar se o `codex` CLI está disponível, selecionar Codex no setup do Ralph, executar `ralph-tui run` com Codex, depurar detecção do agente, validar instalação de skills do Ralph para Codex, ou ajustar um fluxo em que o Ralph deve orquestrar iterações do Codex em vez de outros agentes.
---

# Ralph TUI With Codex

Use esta skill quando a decisão principal for "rodar Ralph TUI com Codex". Ela reduz o problema a quatro checagens: detectar os binários, garantir que o Ralph reconhece o agente Codex, configurar o projeto e só então iniciar ou retomar execuções.

## Fluxo

1. Verificar se `codex`, `ralph-tui` e `bun` estão instalados.
2. Confirmar que o Ralph detecta Codex como agente disponível.
3. Rodar `ralph-tui setup` se o projeto ainda não estiver configurado.
4. Executar com o tracker já adotado pelo projeto.
5. Se falhar, diagnosticar como problema de agente antes de culpar o tracker.

## Verificação mínima

Comece por:

```bash
codex --help
ralph-tui --version
ralph-tui plugins agents
ralph-tui doctor
```

Se `codex` existir mas não aparecer corretamente no fluxo do Ralph, prefira depurar integração do agente antes de reconfigurar todo o projeto.

## Setup recomendado

Se ainda não houver `.ralph-tui/config.toml`, use:

```bash
ralph-tui setup
```

Durante o setup:
- Escolher Codex como agente quando disponível.
- Preservar o tracker já usado pelo projeto.
- Evitar mudanças desnecessárias em limites de iteração, sandbox ou auto-commit sem pedido explícito.

## Execução

Usar o menor comando compatível com o contexto:

```bash
ralph-tui run
ralph-tui run --prd ./prd.json
ralph-tui run --epic <id>
ralph-tui resume
```

Se a intenção for CI, scripts ou execução sem interface, preferir `--headless`.

## Diagnóstico focado em Codex

Quando o loop não subir com Codex:

1. Validar `codex` CLI fora do Ralph.
2. Rodar `ralph-tui plugins agents`.
3. Rodar `ralph-tui doctor`.
4. Inspecionar `ralph-tui info` para coletar contexto de ambiente.
5. Só depois revisar setup e config.

Sinais comuns:
- `codex` não instalado ou não está no `PATH`
- Ralph detecta outros agentes, mas não Codex
- Configuração global conflita com a do projeto
- Sessão anterior precisa de `ralph-tui resume`

## Skills do Ralph para Codex

Se o usuário quiser instalar skills do ecossistema Ralph para o agente Codex, usar:

```bash
ralph-tui skills install --agent codex
```

Se o wrapper não bastar, usar a rota oficial `add-skill` documentada pelo Ralph.

## Decisões importantes

- Não trocar de agente só porque houve uma falha inicial de detecção.
- Não reescrever config manualmente antes de tentar `setup`, `doctor` e `info`.
- Não reiniciar sessão interrompida sem tentar `resume`.
- Se o usuário pedir orquestração com outro agente, usar a skill mais geral `ralph-tui` em vez desta.
