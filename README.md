# Desafio Técnico `EMSOFT Sistemas`

Projeto desenvolvido como parte do processo seletivo para a vaga de `Programador Web Junior`.

## 🛠️ Linguagens e ferramentas usadas

[![HTML5][HTML5-logo]][HTML5-url]
[![CSS3][CSS3-logo]][CSS3-url]
[![JavaScript][JavaScript-logo]][JavaScript-url]
[![NodeJS][NodeJS-logo]][NodeJS-url]
[![Bootstrap][Bootstrap-logo]][Bootstrap-url]


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

[HTML5-logo]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[HTML5-url]: https://developer.mozilla.org/pt-BR/docs/Web/HTML
[CSS3-logo]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://developer.mozilla.org/pt-BR/docs/Web/CSS
[JavaScript-logo]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[JavaScript-url]: https://www.javascript.com/
[NodeJS-logo]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en/
[Bootstrap-logo]: https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com/