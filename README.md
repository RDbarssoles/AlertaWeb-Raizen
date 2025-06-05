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

## Instalação
Clone este repositório

bash
Copy
Edit
git clone https://github.com/seu-usuario/AlertaWeb-Raizen.git
cd AlertaWeb-Raizen
Instale as dependências

bash
Copy
Edit
npm install
Verifique se em angular.json a seção de estilos aponta para src/styles.scss:

jsonc
Copy
Edit
"styles": [
  "src/styles.scss"
]
Confirme que os arquivos de tema existem:

src/custom-theme.scss

src/styles.scss

## Como Rodar
Para executar a aplicação em modo de desenvolvimento:

bash
Copy
Edit
ng serve
Acesse no navegador: http://localhost:4200

Qualquer alteração no código será recompilada e recarregada automaticamente.

## Estrutura de Pastas
java
Copy
Edit
AlertaWeb-Raizen/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── cadastro-gerente/
│   │   │       ├── cadastro-gerente.component.ts
│   │   │       ├── cadastro-gerente.component.html
│   │   │       └── cadastro-gerente.component.css
│   │   ├── models/
│   │   │   └── gerente.model.ts
│   │   ├── services/
│   │   │   └── gerente.service.ts
│   │   └── app.module.ts
│   ├── assets/
│   │   └── (ícones, imagens, etc.)
│   ├── custom-theme.scss      ← Tema Material (roxo + verde)
│   ├── styles.scss            ← Importa custom-theme e estilos globais
│   ├── index.html
│   └── main.ts
├── angular.json
├── package.json
└── README.md                  ← Este arquivo
components/cadastro-gerente/: Componente de cadastro e tabela de gerentes, com lógica de gravação e exclusão.

models/gerente.model.ts: Interface TypeScript que define a estrutura de um objeto Gerente.

services/gerente.service.ts: Serviço mock que gerencia a lista de gerentes em memória e utiliza um contador interno (nextId) para gerar IDs sequenciais.

custom-theme.scss: Define as paletas de cores (roxo e verde) e aplica o tema em todos os componentes Angular Material.

styles.scss: Importa o custom-theme.scss via @use e contém estilos globais do projeto (fontes, resets, background, etc.).

## Customização de Tema
Para aplicar as cores originais da Raízen (roxo e verde) no Angular Material:

Crie ou edite src/custom-theme.scss:

scss
Copy
Edit
@use '@angular/material' as mat;

// Paleta PRIMARY: roxo 500
$raizen-primary-palette: mat.define-palette(mat.$purple-palette, 500);

// Paleta ACCENT: verde 500 (variantes 300, 700)
$raizen-accent-palette: mat.define-palette(mat.$green-palette, 500, 300, 700);

// (Opcional) Paleta WARN customizada:
// $raizen-warn-palette: mat.define-palette(mat.$green-palette, 900);

$raizen-theme: mat.define-light-theme((
  color: (
    primary: $raizen-primary-palette,
    accent:  $raizen-accent-palette,
    // warn:    $raizen-warn-palette
  )
));

@include mat.core();
@include mat.all-component-themes($raizen-theme);
Edite src/styles.scss para usar o tema:

scss
Copy
Edit
@use './custom-theme' as _raizenTheme;

body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  background-color: #fafafa;
}

*, *::before, *::after {
  box-sizing: border-box;
}
Nos templates, utilize:

html
Copy
Edit
<!-- Botão roxo -->
<button mat-flat-button color="primary">Salvar</button>

<!-- Botão verde -->
<button mat-stroked-button color="accent">Cancelar</button>
Contribuindo
Contribuições são bem-vindas! Caso queira melhorar este projeto:

## Faça um fork deste repositório.

Crie uma branch para a sua feature ou correção:

bash
Copy
Edit
git checkout -b feature/nome-da-feature
Faça as alterações necessárias e confirme em commits claros:

bash
Copy
Edit
git commit -m "Adiciona funcionalidade X"
Envie sua branch para o seu fork e abra um Pull Request.

