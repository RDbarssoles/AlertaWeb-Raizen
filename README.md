# AlertaWeb-Raizen

Um sistema de cadastro e gerenciamento de gerentes desenvolvido em **Angular 20** com **Angular Material**, utilizando tema personalizado nas cores roxo (Raízen) e verde. Projeto destinado a ilustrar um CRUD básico com serviço de mock em memória e contador interno de IDs.

---

## 📚 Sumário

1. [Sobre o Projeto](#sobre-o-projeto)  
2. [Funcionalidades](#funcionalidades)  
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)  
4. [Pré-requisitos](#pré-requisitos)  
5. [Instalação](#instalação)  
6. [Como Rodar](#como-rodar)  
7. [Estrutura de Pastas](#estrutura-de-pastas)  
8. [Customização de Tema](#customização-de-tema)  
9. [Contribuindo](#contribuindo)  
10. [Licença](#licença)  

---

## 📝 Sobre o Projeto

O **AlertaWeb-Raizen** é um exemplo didático de aplicação Angular que demonstra:

- Cadastro simples de gerentes (formulário reativo com validações).  
- Listagem em **MatTable** com paginação, ordenação e filtro.  
- Exclusão de itens com confirmação e atualização instantânea da tabela.  
- Serviço de mock em memória que gera IDs automáticos via contador interno (`nextId`).  
- Tema customizado do Angular Material usando roxo (primary) e verde (accent), seguindo identidade visual da Raízen.

> **Objetivo**: servir de base para projetos de CRUD com Angular + Material, ilustrando boas práticas de tema, formulários reativos, tabelas e feedback ao usuário.

---

## 🚀 Funcionalidades

- **Formulário de Cadastro**  
  - Campos obrigatórios:  
    - **Revisor** (Login)  
    - **Nível do Revisor** (select)  
  - Campos opcionais (grupo “Hierarquia”):  
    - *Sequencial Completo*  
    - *Polo* (select)  
    - *Unidade* (select)  
  - Validações com mensagens customizadas, exibidas em painel de erros.  
  - Reset completo do formulário sem exibir erros imediatamente (pristine/untouched).  

- **Tabela de Gerentes**  
  - Exibição de colunas:  
    - Checkbox de seleção (multiseleção)  
    - `CdSeqGerente` (ID auto-incrementado)  
    - `NmUsuGerente` (Login)  
    - `NmUsuarioCompleto` (Nome completo)  
    - `DsNivelCompleto` (descrição de hierarquia)  
    - `NmPolo`  
    - `NmUnidade`  
    - `NmTipoGerente` (nome do tipo)  
    - Ações (botão “Excluir”)  
  - Paginação via `MatPaginator` (opções: 5, 10, 20)  
  - Ordenação via `MatSort` em colunas habilitadas  
  - Filtro de texto para pesquisar login ou nome  
  - Seleção múltipla de linhas com `SelectionModel`  

- **Exclusão de Gerentes**  
  - Botão de lixeira abre `confirm()` de confirmação  
  - Remoção do item do array em memória e atualização imediata da tabela  
  - Snackbar de sucesso ou erro  

- **Tema Customizado**  
  - **Primary**: roxo (tom 500 da paleta roxa do Angular Material)  
  - **Accent**: verde (tom 500 da paleta verde do Angular Material, variantes 300 e 700)  
  - Arquivo `custom-theme.scss` que utiliza `@use '@angular/material' as mat;` e inclui `mat.all-component-themes($raizen-theme)`  
  - Importado no `styles.scss` via `@use './custom-theme' as _raizenTheme;`  

---

## 💻 Tecnologias Utilizadas

- **Framework**: Angular 20  
- **UI Library**: Angular Material 20  
- **Linguagem**: TypeScript  
- **Forms**: Reactive Forms (`FormBuilder`, `FormGroup`, `Validators`)  
- **Tabela**: `MatTableDataSource`, `MatPaginator`, `MatSort`, `SelectionModel`  
- **Feedback**: `MatSnackBar`  
- **Estilos**: SCSS (Sass) com tema customizado  
- **Mock/Serviço**: RxJS (`of`, `Observable`) para mock em memória  
- **Controle de Versão**: Git  

---

## ⚙️ Pré-requisitos

Antes de começar, verifique se você tem instalado em sua máquina:

- **Node.js** (versão ≥ 18.x) e **npm** (versão ≥ 12.x)  
- **Angular CLI** (versão ≥ 16.x)

Verifique as versões executando:

```bash
node -v
npm -v
ng version
