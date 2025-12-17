# 📊 Sistema de Controle de Diaristas e Presenças

## 🎯 Objetivo do Projeto

Este projeto tem como objetivo **cadastrar funcionários diaristas**, registrar suas **presenças diárias**, controlar **quantos dias trabalharam** e **quanto devem receber**, mantendo um **histórico completo e confiável** dessas informações para melhor gestão administrativa.

O sistema foi desenvolvido para resolver um problema comum em empresas que trabalham com diaristas: a falta de controle centralizado sobre **presença**, **pagamentos**, **inatividade** e **histórico de trabalho**.

---

## 🧠 Ideia Central do Sistema

O sistema é baseado em três pilares principais:

### 1️⃣ Cadastro de Colaboradores

Permite o registro de diaristas e funcionários, contendo informações como:

* Nome
* Tipo de contratação (`diarista` ou `funcionario`)
* Valor da diária
* Status do colaborador (`ativo` ou `inativo`)

O cadastro de colaboradores serve como **base de dados principal** para todas as outras funcionalidades do sistema.

---

### 2️⃣ Controle de Presença

O sistema registra a presença diária dos colaboradores, armazenando:

* Data da presença
* Se esteve presente ou não
* Comentários opcionais

Cada colaborador pode possuir **múltiplos registros de presença**, permitindo acompanhar sua frequência ao longo do tempo.

Esses dados são utilizados para:

* Contabilizar dias trabalhados
* Calcular valores a receber
* Detectar períodos de inatividade

---

### 3️⃣ Cálculo e Controle de Pagamentos

O cálculo de pagamento dos diaristas é realizado com base em:

* Quantidade de dias trabalhados
* Valor da diária cadastrada

O sistema possibilita:

* Consulta de valores semanais e mensais
* Base para registro de histórico de pagamentos

O cálculo automatizado reduz erros manuais e facilita a conferência financeira.

---

## 🔍 Controle Automático de Inatividade

O sistema possui uma rotina automática que:

* Verifica diaristas sem presença registrada há **30 dias**
* Marca automaticamente esses colaboradores como **INATIVOS**
* Permite reativação apenas de forma **manual**

Esse mecanismo garante que o cadastro esteja sempre atualizado e evita pagamentos indevidos.

---

## 🗄️ Banco de Dados e Histórico

Todas as informações são armazenadas em banco de dados SQLite, incluindo:

* Colaboradores
* Presenças
* Dias trabalhados
* Status de atividade

O histórico completo permite:

* Auditoria
* Conferência retroativa
* Transparência administrativa

---

## 🚀 Benefícios do Sistema

* ✔️ Centralização das informações
* ✔️ Redução de erros manuais
* ✔️ Facilidade no cálculo de pagamentos
* ✔️ Histórico confiável
* ✔️ Estrutura preparada para crescimento futuro

---

## 🛣️ Evolução Planejada (Roadmap)

Funcionalidades previstas para versões futuras:

* Histórico de pagamentos mensal
* Dashboard com indicadores
* Exportação de relatórios (PDF / Excel)
* Controle de usuários (login e permissões)
* Interface frontend mais robusta

---

## 🛠️ Tecnologias Utilizadas

* Node.js
* Express
* SQLite
* JavaScript

---

## 📌 Observação

Este projeto está em constante evolução e foi estruturado para facilitar manutenção, escalabilidade e futuras melhorias.

---

👨‍💻 Desenvolvido para controle eficiente de diaristas e gestão de presença.
