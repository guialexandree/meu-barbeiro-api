## Barbearia Client API

| RF | Requisitos funcionais | RN |
| --- | --- | --- |
| RF01 |Ativar cadastro por SMS| |
| RF02 |Login com numero de contato| |
| RF03 |Atualizar nome do usuário| RN01 |
| RF04 |Buscar informações da barbearia| RN01, RN02 |
| RF05 |Buscar tabela de servicos| RN01 |
| RF06 |Buscar historico de cortes| RN01 |
| RF07 |Buscar informações da fila| RN01 |
| RF08 |Entrar na fila| RN01 |
| RF09 |Consultar status na fila| RN01 |

| RN | Requisitos negócios |
| --- | --- |
| RN01 | Rota privada, requer um token válido e autorizado |
| RN02 | Deve ser válidado o status de expediente |
