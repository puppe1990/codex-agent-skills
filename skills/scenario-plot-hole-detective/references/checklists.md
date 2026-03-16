# Scenario Detective Checklists

Use estas checklists apenas quando precisar ir alem da critica inicial.

## 1. Checklist de simulacao

- Quem e a persona exata?
- Qual o motivo imediato?
- Em que ambiente isso acontece?
- O usuario esta com pressa, distraido ou interrompivel?
- O que ele sabe antes de abrir o produto?
- Como ele descobre a funcionalidade?
- Qual e a primeira acao visivel?
- O que confirma progresso?
- O que pode dar errado?
- Como ele retoma depois de interromper?
- O que acontece apos concluir?

## 2. Tipos comuns de buraco na trama

- passo pulado
- edge case ignorado
- canal de descoberta inexistente
- nomenclatura pouco intuitiva
- dependencia externa nao tratada
- estado vazio sem orientacao
- erro sem proxima acao
- retorno apos login sem preservacao de contexto
- fluxo bom para power user e ruim para novato
- feature util no demo e fraca no uso recorrente

## 3. Personas para tensionar

Rode a simulacao ao menos por estes tres filtros quando relevante:

- usuario novo: baixa familiaridade, mais medo e menos contexto
- usuario recorrente: quer atalhos, menos atrito e continuidade
- usuario avancado: explora limites, quer velocidade e previsibilidade

Se houver marketplace, plataforma ou produto B2B, simule tambem os lados diferentes do sistema.

## 4. Converter em scenario tests

Ao sair da critica e entrar em execucao:

- nomeie o cenario pelo objetivo do usuario
- descreva pre-condicoes
- liste a sequencia de passos observaveis
- defina o sucesso visivel para o usuario
- defina falhas importantes e mensagens esperadas
- cubra retomada, segundo uso e variacoes prioritarias

## 5. Critica de PRD ou spec

Pergunte:

- a historia termina ou para no meio da feature?
- ha evidencia de que esse fluxo importa para a persona?
- a proposta resolve o problema ou apenas adiciona interface?
- o que precisa ser verdadeiro em dados, permissoes ou integracoes?
- quais metricas mostrariam sucesso na jornada?
- quais perguntas precisam ser respondidas antes de implementar?

## 6. Arquitetura guiada por jornada

Quando a proposta implicar backend, plataforma ou escala, transforme a jornada em requisitos:

- latencia aceitavel por etapa
- consistencia percebida pelo usuario
- tolerancia a atraso, duplicidade ou reordenacao
- estados que precisam sobreviver a refresh, login ou troca de dispositivo
- cenarios reais que devem ser reproduzidos em simulacoes de carga

Nao simule chamadas isoladas se o problema real e uma sequencia de acoes do usuario.
