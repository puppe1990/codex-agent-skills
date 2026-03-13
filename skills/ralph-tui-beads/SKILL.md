---
name: ralph-tui-beads
description: Preparar e executar o Ralph TUI com Beads ou Beads Rust como fonte de tarefas. Use quando Codex precisar descobrir ou validar um `epic`, manter dependências entre tarefas, escolher Beads em vez de `prd.json`, converter um PRD para um fluxo baseado em épicos, ou rodar `ralph-tui run --epic ...` preservando a estrutura de bloqueios do projeto.
---

# Ralph TUI With Beads

Use esta skill quando o tracker do projeto é Beads ou Beads Rust. A ideia é preservar a modelagem de dependências do tracker e garantir que o Ralph rode sobre um `epic` correto, em vez de forçar um fluxo simplificado de `prd.json`.

## Fluxo

1. Confirmar se o projeto usa Beads ou Beads Rust.
2. Descobrir o `epic` alvo.
3. Verificar se as dependências fazem sentido.
4. Configurar Ralph para esse tracker.
5. Rodar com `--epic`.

## Verificação inicial

Antes de rodar Ralph:
- localizar o tracker do projeto
- identificar se o time usa `bd`, `br` ou convenção equivalente
- confirmar o ID do épico
- confirmar que existem tarefas desbloqueáveis ou uma cadeia de dependências válida

Não substitua Beads por `prd.json` apenas por conveniência.

## Execução

O caminho típico é:

```bash
ralph-tui setup
ralph-tui run --epic <id>
ralph-tui resume
```

Se já houver `.ralph-tui/config.toml`, preserve o tracker configurado e evite reconfiguração desnecessária.

## Quando começar de um PRD

Se o usuário quer partir de um PRD mas o destino final é Beads:
- primeiro refinar o PRD em tarefas pequenas
- depois converter para um epic com tarefas-filhas
- garantir ordem de dependências lógica
- só então iniciar `ralph-tui run --epic <id>`

O principal erro aqui é criar histórias grandes demais ou dependências confusas; isso reduz muito a qualidade das iterações.

## Diagnóstico

Quando o Ralph não escolhe o trabalho esperado:

1. Verificar se o `epic` é o certo.
2. Verificar se as tarefas estão abertas e não bloqueadas.
3. Verificar se o tracker selecionado no Ralph corresponde ao tracker real do projeto.
4. Só depois revisar agente, modelo e outras opções.

Sinais comuns:
- epic errado
- dependências travando tudo
- tarefas grandes demais para uma iteração
- configuração local do Ralph apontando para outro tracker

## Boas decisões

- Preservar a ordem natural schema -> backend -> UI quando existir.
- Preferir tarefas pequenas e verificáveis.
- Usar Beads quando dependências são parte importante do fluxo.
- Complementar com `ralph-tui-prd-run` quando o trabalho ainda estiver em nível de PRD.
