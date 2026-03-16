---
name: scenario-plot-hole-detective
description: Simular jornadas de usuario e agir como um "detetive de buracos na trama" em PRDs, specs, fluxos, features, UX, arquitetura e testes. Use quando Codex precisar transformar requisitos em cenarios concretos, identificar passos pulados, mecanismos de descoberta ausentes, edge cases, dependencias escondidas, risco de baixa adocao, falhas de feedback, friccao na jornada, ou validar se uma proposta realmente fecha a historia do ponto de vista do usuario.
---

# Scenario Plot-Hole Detective

Use esta skill quando houver uma ideia, PRD, spec, fluxo ou feature que pareca coerente no papel, mas possa quebrar quando um usuario real tentar atravessar a historia inteira.

A base desta skill vem da abordagem de Drew Hoskins: pensar produto como combinacao de persona, motivo e simulacao completa da jornada. O trabalho aqui nao e elogiar a proposta. E tensiona-la ate aparecerem passos pulados, edge cases e decisoes que so funcionam para quem tem "conhecimento proibido" de quem implementou.

## Resultado esperado

Produza a resposta em quatro blocos, salvo se o usuario pedir outro formato:

1. Cenario base
2. Simulacao passo a passo
3. Buracos na trama
4. Ajustes recomendados

Se o contexto estiver raso, declare as suposicoes em uma linha curta e siga em frente.

## Fluxo

1. Identificar o usuario principal.
2. Explicitar o motivo imediato e o contexto de uso.
3. Escrever a simulacao completa da jornada.
4. Procurar buracos na trama.
5. Converter os buracos em decisoes, testes ou perguntas.

## 1. Definir personagem e contexto

Monte um personagem minimo com:
- persona
- nivel de familiaridade
- objetivo imediato
- restricoes reais

Boas restricoes para considerar:
- pouco tempo
- memoria imperfeita
- multitarefa
- aversao a risco
- conhecimento parcial do produto

Evite personagens abstratos como "o usuario". Diga quem e, o que quer agora e o que sabe de verdade.

## 2. Escrever a simulacao completa

Conte a historia inteira, nao apenas o trecho que favorece a feature.

Empurre a simulacao em tres direcoes:
- O que aconteceu antes para o usuario chegar aqui?
- Como ele descobriu o que fazer?
- O que acontece logo depois da acao principal?

Uma boa simulacao:
- justifica cada passo
- mostra o que o usuario percebe
- nao presume conhecimento interno do time
- inclui consequencias e proximos passos

## 3. Investigar os buracos na trama

Procure primeiro estes dois tipos de falha:

- Passo pulado
- Edge case

Depois procure estas classes adicionais:

- descoberta ausente: nada leva o usuario a descobrir a feature
- aprendizado ausente: a interface nao ensina como usar
- transicao quebrada: login, pagamento, permissao, confirmacao ou retorno interrompem a historia
- dependencia invisivel: a proposta depende de outro time, dado, integracao ou comportamento nao garantido
- memoria heroica: o fluxo presume que o usuario lembra algo improvavel
- risco nao tratado: o usuario hesita porque pode perder dinheiro, tempo, dados ou contexto
- feedback insuficiente: o sistema nao confirma, nao orienta ou nao corrige
- incentivo desalinhado: a feature existe, mas nao ajuda a meta real da persona
- trade-off escondido: melhora um caso e piora outro publico importante
- abuso ou uso indevido: a affordance pode empurrar o usuario para um uso errado ou inseguro

## 4. Perguntas que o detetive deve fazer

Use perguntas curtas e agressivamente concretas:

- Como o usuario descobre que isso existe?
- O que ele precisa saber antes desse clique?
- O que ele ve quando da errado?
- O que acontece se ele interromper no meio?
- O que muda para usuario novo, casual e power user?
- O que acontece no segundo uso, nao so no primeiro?
- Qual etapa depende de memoria, paciencia ou sorte demais?
- Que caso comum ficou fora porque a historia ficou conveniente demais?
- Se a feature der certo tecnicamente e mesmo assim fracassar em adocao, por que seria?

## 5. Como reportar achados

Priorize por impacto na jornada, nao por elegancia tecnica.

Para cada buraco importante, reporte:
- o ponto da jornada
- o que foi assumido indevidamente
- o risco para usuario ou negocio
- a correcao mais simples

Formato recomendado:

```text
Buraco: O fluxo presume que o usuario lembra onde salvou o rascunho.
Risco: abandono e suporte desnecessario.
Correcao: exibir "Continuar de onde parei" na entrada principal e manter contexto apos login.
```

## Quando aprofundar

Se a tarefa tocar design, roadmap, arquitetura ou testes, leia [references/checklists.md](./references/checklists.md).

Use esse arquivo para:
- transformar achados em scenario tests
- avaliar descoberta, onboarding e retomada de fluxo
- tensionar PRDs e specs antes da implementacao
- simular cargas e impactos arquiteturais a partir de jornadas reais

## Regras operacionais

- Nao aceite o recorte mais favoravel ao autor da proposta.
- Nao critique so a tela; critique a jornada completa.
- Nao pule direto para solucao sem antes explicitar a falha narrativa.
- Nao trate "usuario" como massa uniforme; varie por persona quando isso mudar a decisao.
- Nao assuma que shipping encerra o trabalho; considere feedback, medicao e iteracao.

## Sinais de boa aplicacao

Esta skill esta sendo bem usada quando a resposta:
- revela ao menos um passo antes e um depois da feature principal
- encontra discovery gaps ou edge cases que nao estavam na spec
- transforma intuicao em cenarios verificaveis
- gera decisoes de produto, UX, arquitetura ou teste com base na jornada
