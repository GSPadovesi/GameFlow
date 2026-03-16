# GameFlow

Aplicacao em `Next.js` para catalogo de jogos, com busca, paginacao e consumo da API da RAWG por uma rota interna.

## Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Sass`
- `ESLint`

## Requisitos

- `Node.js 20+`
- `npm 10+`

## Configuracao

1. Instale as dependencias:

```bash
npm install
```

2. Crie o arquivo de ambiente local:

```bash
cp .env.example .env.local
```

3. Configure a chave da RAWG em `.env.local`:

```env
API_KEY=sua_chave_da_rawg
```

4. Inicie o projeto:

```bash
npm run dev
```

App disponivel em `http://localhost:3000`.

## Scripts

- `npm run dev`: ambiente de desenvolvimento
- `npm run build`: build de producao
- `npm run start`: executa a aplicacao em producao
- `npm run lint`: analise de lint
- `npm run lint:fix`: corrige problemas de lint
- `npm run typecheck`: validacao de tipos TypeScript
- `npm run check`: executa lint + typecheck

## Rotas atuais

- `/`: redireciona para `/home`
- `/home`: pagina inicial atual
- `/catalogo`: tela de catalogo de jogos
- `/api/games`: proxy interno para a RAWG com suporte a `page`, `search` e `platforms`

## Fluxo atual do catalogo

O catalogo usa `CatalogProvider` para concentrar:

- estado de carregamento e erro
- pagina atual
- filtros da lista
- busca de jogos via `/api/games`
- calculo de `totalPages` com base no `count` retornado pela API

Quando os filtros mudam, a pagina volta para `1`. Hoje o filtro implementado no fluxo e o `search`.
No front da `GameList`, a barra de filtros ja expoe busca por texto e seletor de plataforma.

## Estrutura do projeto

```text
src/
  app/
    _components/
      Pages/
      Templates/
      Ui/
    _providers/
    _hooks/
    _styles/
    _types/
    api/
    catalogo/
    home/
```

## Componentes de UI

Em `src/app/_components/Ui` o projeto ja possui componentes base como:

- `Button`
- `Field`
- `GameCard`
- `GameList`
- `Header`
- `Paragraph`
- `Sidebar`
- `Skeleton`
- `Title`

O componente `Field` funciona como wrapper para tres variacoes:

- `input`
- `textarea`
- `select`

O `SelectField` usa dropdown customizado no front, com suporte a `placeholder`, `iconLeft` e lista de `options`.

O componente `Skeleton` e generico e pode simular qualquer bloco do layout por largura e altura:

```tsx
<Skeleton width="100%" height={48} />
<Skeleton width={320} height={180} borderRadius={16} />
<Skeleton width={56} height={56} circle />
```

## Observacoes do estado atual

- o catalogo ja consulta a RAWG pela rota interna `app/api/games`
- a busca por texto ja esta conectada ao provider
- o filtro de plataforma ja faz parte da estrutura de filtros do catalogo
- a paginacao ja considera `currentPage` e `totalPages`
- ainda ha espaco para evoluir tratamento de erro, loading refinado e filtros adicionais

## Proximos passos sugeridos

- concluir os controles de paginacao do `GameList`
- adicionar skeletons nas telas de loading
- expandir filtros alem de `search`
- melhorar o tratamento de erro e retry
- adicionar testes para provider e componentes principais
