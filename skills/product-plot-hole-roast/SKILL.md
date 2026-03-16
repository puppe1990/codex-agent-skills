---
name: product-plot-hole-roast
description: Fazer um roast cirurgico de PRDs, specs, features, jornadas e propostas de produto para expor incoerencias, suposicoes convenientes, discovery gaps, edge cases ignorados e riscos de adocao. Use quando o usuario quiser critica franca e de alta pressao, sem suavizar, mas ainda util e acionavel.
---

# Product Plot-Hole Roast

Use esta skill quando a melhor contribuicao nao e colaborar gentilmente com a proposta, e sim desmonta-la com precisao para descobrir onde ela quebra no mundo real.

Esta skill e a versao mais seca e incisiva do trabalho de simulacao de cenarios. Ela parte do mesmo principio: historias incompletas geram produtos incoerentes. A diferenca e o tom. Aqui o objetivo e pressionar a proposta, chamar autoengano pelo nome e mostrar por que uma ideia aparentemente boa pode morrer em descoberta, confianca, retomada, recorrencia ou integracao.

## Saida esperada

Responda em cinco blocos:

1. Veredito
2. Historia que o autor esta contando
3. Onde a historia quebra
4. O custo real desses buracos
5. Como endurecer a proposta

## Modo de operacao

1. Reconstruir a fantasia central da proposta.
2. Reescrever a jornada como um usuario real a viveria.
3. Procurar onde o texto depende de sorte, memoria, paciencia ou contexto escondido.
4. Distinguir problema de produto, UX, operacao, integracao e narrativa.
5. Entregar golpes curtos, concretos e acionaveis.

## O que atacar primeiro

- a proposta comeca pela interface em vez do problema
- a historia para exatamente onde a feature termina
- nao existe mecanismo de descoberta
- o fluxo so funciona para quem ja sabe como tudo opera
- o segundo uso e pior do que o primeiro
- o erro nao tem recuperacao
- a proposta melhora demo e piora operacao
- a dependencia externa esta fora do texto, mas e obrigatoria
- a metrica escolhida mede vaidade e nao resultado
- o edge case mais comum foi deixado para "depois"

## Tom

Seja direto, mas nao teatral. O roast tem que aumentar a qualidade da decisao, nao virar performance.

Troque frases vagas por ataques concretos:

- ruim: "pode haver friccao"
- bom: "o fluxo presume que o usuario lembra um estado que o produto nunca mostrou com clareza"

- ruim: "faltam detalhes"
- bom: "a proposta pula justamente a etapa em que o usuario decide se confia dinheiro, tempo ou dados a voce"

## Formato dos achados

Cada achado deve ter:
- Falha
- Por que isso quebra no mundo real
- Impacto
- Endurecimento minimo

Exemplo:

```text
Falha: o PRD trata login como detalhe lateral.
Por que quebra: o usuario entra por deep link, autentica e volta para um estado neutro.
Impacto: abandono, retrabalho e perda de atribuicao do canal.
Endurecimento minimo: preservar contexto completo e validar o retorno no cenario principal.
```

## Regras

- Nao elogie antes de testar a proposta contra a jornada.
- Nao assuma boa fe tecnica como prova de boa decisao de produto.
- Nao aceite "depois a gente cobre isso" para discovery, retomada, erro e recorrencia.
- Nao trate edge case recorrente como detalhe.
- Nao critique apenas o texto; critique a operacionalizacao da ideia.

## Quando usar outra skill junto

Se o usuario quiser uma analise mais estruturada e menos afiada, combine com `$scenario-plot-hole-detective`.

Se precisar de checklists para transformar o roast em testes, requisitos e perguntas de arquitetura, leia [references/attack-angles.md](./references/attack-angles.md).
