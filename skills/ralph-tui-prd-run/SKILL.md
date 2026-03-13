---
name: ralph-tui-prd-run
description: Conduzir o fluxo de um PRD até uma execução real no Ralph TUI. Use quando Codex precisar pegar um PRD em texto ou Markdown, criar/refinar o documento com `ralph-tui create-prd`, converter para tracker quando necessário, escolher entre `prd.json` e Beads, e iniciar ou retomar `ralph-tui run` com uma fonte de tarefas pronta para iterações autônomas.
---

# Ralph TUI PRD To Run

Use esta skill quando o trabalho começa em um PRD e precisa terminar com o Ralph TUI efetivamente rodando tarefas. A prioridade é transformar um documento ambíguo em uma fonte de tarefas executável sem pular etapas importantes.

## Decisão principal

Escolha o fluxo pelo ponto de partida:
- Se o usuário ainda está ideando o PRD, usar `ralph-tui create-prd`.
- Se já existe um PRD em Markdown, revisar e então converter.
- Se já existe `prd.json`, pular conversão e ir para execução.
- Se o projeto usa Beads ou Beads Rust, converter para esse tracker em vez de forçar JSON.

## Fluxo recomendado

1. Identificar o artefato inicial.
2. Garantir que o PRD está claro e dividido em trabalho iterável.
3. Escolher o tracker alvo.
4. Gerar ou apontar a fonte de tarefas.
5. Rodar Ralph.

## 1. Identificar o artefato

Descobrir se o usuário tem:
- ideia bruta
- PRD em texto
- PRD em Markdown
- `prd.json`
- epic já criado em Beads

Não assuma conversão se o artefato final já existir.

## 2. Validar se o PRD é executável

Antes de rodar qualquer conversão, conferir se o PRD:
- descreve objetivo e escopo com clareza
- tem histórias ou tarefas pequenas o bastante para uma iteração
- inclui critérios de aceite ou ao menos checkpoints verificáveis
- não mistura trabalho demais em um único item

Se o PRD estiver grande demais, dividir antes de converter. O Ralph funciona melhor quando cada tarefa cabe em uma iteração de agente.

## 3. Escolher o tracker

Use esta regra:
- `prd.json` quando o usuário quer o caminho mais simples.
- Beads ou Beads Rust quando o projeto já usa dependências explícitas, épicos e cadeia de bloqueios.

Não migrar um projeto existente para outro tracker só por conveniência.

## 4. Gerar a fonte de tarefas

Comandos típicos:

```bash
ralph-tui create-prd
ralph-tui create-prd --chat
ralph-tui convert --to json ./prd.md
```

Se o fluxo do projeto envolver skills customizadas de PRD, respeitar `skills_dir` e a convenção local antes de inventar outra etapa.

## 5. Executar

Depois da fonte de tarefas pronta:

```bash
ralph-tui run --prd ./prd.json
ralph-tui run --epic <id>
ralph-tui resume
```

Se a execução já foi iniciada antes, priorize `resume`.

## Erros comuns

- Converter um PRD ruim e culpar o Ralph pelo resultado fraco.
- Criar tarefas grandes demais para uma iteração.
- Ignorar o tracker já adotado pelo projeto.
- Recomeçar do zero sem verificar se há sessão em andamento.

## Boas decisões

- Refinar o PRD antes de converter.
- Preferir tarefas pequenas, independentes e verificáveis.
- Usar o caminho mais curto entre o artefato atual e a execução.
- Quando houver dúvida operacional, complementar com a skill `ralph-tui`.
