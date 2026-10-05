#  Jogo do Bicho - Sistema Web

##  Descrição

Este projeto é um sistema web completo do jogo do bicho, desenvolvido com foco em práticas modernas de desenvolvimento, incluindo autenticação JWT, testes automatizados e integração contínua (CI).

O sistema permite que usuários realizem apostas, acompanhem seu saldo e visualizem o histórico de jogadas em tempo real.

---

##  Tecnologias utilizadas

###  Backend

* Node.js
* Express
* MongoDB (Mongoose)
* JWT (autenticação)
* Jest (testes)
* ESLint

###  Frontend

* React
* JavaScript
* CSS

###  DevOps

* GitHub Actions (CI)
* Yarn

---

##  Estrutura do projeto

```
meu-projeto/
├── backend/
├── frontend/
├── .github/workflows/ci.yml
└── README.md
```

---

##  Como rodar o projeto

###  Pré-requisitos

* Node.js instalado
* MongoDB rodando localmente

---

###  Backend

```bash
cd backend
yarn
yarn start
```

Servidor rodando em:

```
http://localhost:3333
```

---

###  Frontend

```bash
cd frontend
yarn
yarn dev
```

---

##  Funcionalidades

* Cadastro de usuário
* Login com autenticação JWT
* Saldo inicial de R$1000
* Apostas nos modos:

  * Grupo (animal)
  * Dezena
  * Milhar
* Histórico de apostas
* Controle de saldo
* Sistema de prêmio

---

##  Testes

Para rodar os testes do backend:

```bash
cd backend
yarn test
```

---

##  Lint (qualidade de código)

```bash
cd backend
yarn lint
```

---

##  Integração Contínua (CI)

O projeto utiliza GitHub Actions para:

* Verificação de código (lint)
* Execução de testes
* Build do frontend

O CI é executado automaticamente em:

* push
* pull_request

---

##  API (Endpoints principais)

| Método | Rota               | Descrição           |
| ------ | ------------------ | ------------------- |
| POST   | /api/users         | Cadastro de usuário |
| POST   | /api/users/login   | Login               |
| GET    | /api/users/balance | Consultar saldo     |
| POST   | /api/users/play    | Realizar aposta     |
| GET    | /api/users/history | Histórico           |

---

##  Responsividade

A interface foi desenvolvida para funcionar em:

* Desktop 
* Mobile 

---

##  Autor

Gabriel Mendes Almeida

---

## 📄 Licença

Este projeto está sob a licença ISC.
