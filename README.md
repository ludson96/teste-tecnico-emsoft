# Projeto de Cadastro de Endereços por CEP

Este é um projeto de uma aplicação web simples para consultar CEPs e salvar os endereços correspondentes.

## Requisitos

- Node.js (versão 14 ou superior)

## Como Executar

1.  **Inicie o servidor:**
    Navegue até a pasta `backend` e execute o seguinte comando:
    ```bash
    node api.js
    ```
    O servidor estará rodando em `http://localhost:3000`.

2.  **Acesse a aplicação:**
    Abra seu navegador e acesse `http://localhost:3000`.

## Estrutura do Projeto

```
projeto/
│
├── index.html          # Página principal
├── style.css           # Estilos personalizados
├── script.js           # JavaScript
│
├── backend/
│   ├── api.js         # API Node.js
│
└── data/
    └── ceps.json       # Arquivo gerado para armazenar os dados
```

## Funcionalidades

-   Consulta de CEP utilizando a API ViaCEP.
-   Preenchimento automático dos campos de endereço.
-   Salvamento dos dados de endereço em um arquivo `ceps.json` no servidor.
-   Validação para não permitir CEPs duplicados.
-   Interface responsiva e feedback para o usuário em tempo real.
