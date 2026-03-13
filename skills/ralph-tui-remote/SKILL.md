---
name: ralph-tui-remote
description: Configurar, conectar e operar instâncias remotas do Ralph TUI. Use quando Codex precisar subir `ralph-tui run --listen` em outra máquina, registrar remotos com `ralph-tui remote add`, testar conectividade, empurrar configuração com `remote push-config`, diagnosticar tokens, portas e escopo de configuração, ou controlar múltiplas instâncias Ralph a partir de uma interface local.
---

# Ralph TUI Remote

Use esta skill quando o trabalho envolve mais de uma máquina. O objetivo é manter o fluxo remoto seguro e previsível: iniciar o listener no servidor, registrar o remoto no cliente, validar a conexão e só então propagar configuração ou começar a operar.

## Fluxo

1. Confirmar qual máquina é servidor e qual é cliente.
2. Iniciar o listener na máquina remota.
3. Salvar o token gerado.
4. Registrar o remoto no cliente.
5. Testar conectividade.
6. Só depois empurrar configuração ou operar sessões.

## Listener remoto

Na máquina remota, usar:

```bash
ralph-tui run --listen --prd ./prd.json
ralph-tui run --listen --listen-port 8080 --epic <id>
```

Se o usuário quiser invalidar o token anterior, usar `--rotate-token`.

Não prossiga sem registrar o token gerado. Ele é parte central do acesso remoto.

## Cadastro no cliente

Na máquina local:

```bash
ralph-tui remote add <alias> <host:port> --token <token>
ralph-tui remote test <alias>
ralph-tui remote list
```

Sempre testar o remoto logo após adicionar. Isso separa problemas de cadastro de problemas do loop de execução.

## Push de configuração

Se o usuário quiser alinhar ambiente entre máquinas:

```bash
ralph-tui remote push-config <alias>
ralph-tui remote push-config <alias> --preview
ralph-tui remote push-config <alias> --scope global
ralph-tui remote push-config <alias> --scope project
```

Antes de sobrescrever configuração:
- verificar se o alvo correto é escopo global ou de projeto
- preferir `--preview` quando houver dúvida
- evitar sobrescrever config existente sem pedido explícito

## Diagnóstico

Quando o remoto não conectar:

1. Confirmar `host:port`
2. Confirmar token
3. Confirmar que o listener está rodando
4. Rodar `ralph-tui remote test <alias>`
5. Revisar se a máquina remota está ouvindo na interface correta

Sinais comuns:
- token errado ou expirado
- porta incorreta
- listener não iniciado
- config empurrada para o escopo errado

## Boas decisões

- Não empurrar configuração antes de provar conectividade.
- Não girar token sem alinhar impacto com o usuário.
- Não assumir que config global e de projeto devem ser iguais.
- Tratar operação remota como fluxo separado do setup local.
