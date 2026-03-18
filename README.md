# GameFlow

Aplicacao em `Next.js` para catalogo de jogos, com busca, paginacao, persistencia em PostgreSQL via Prisma + Neon e consumo da API da RAWG por rota interna.

## Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Sass`
- `ESLint`
- `Prisma`
- `Neon PostgreSQL`

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
cp .env.example .env
```

3. Configure as variaveis em `.env`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
API_KEY=sua_chave_da_rawg
DATABASE_URL=postgresql://USER:SENHA@HOST/neondb?sslmode=require
```

4. Rode as migrations do banco:

```bash
npx prisma migrate dev
```

Se o `npx` bloquear no PowerShell:

```bash
cmd /c npx prisma migrate dev
```

5. Inicie o projeto:

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

## Banco de dados

O projeto usa:

- `Prisma` como ORM
- `Neon` como provedor do PostgreSQL
- `prisma.config.ts` para centralizar schema, migrations e datasource

Arquivos principais:

- [`prisma/schema.prisma`](/C:/Users/win/Repositorios/myGames/prisma/schema.prisma)
- [`prisma.config.ts`](/C:/Users/win/Repositorios/myGames/prisma.config.ts)
- [`src/lib/prisma.ts`](/C:/Users/win/Repositorios/myGames/src/lib/prisma.ts)

Comandos uteis:

- `npx prisma migrate dev`
- `npx prisma migrate status`
- `npx prisma generate`
- `npx prisma studio`

## Regras atuais do banco

- o banco local do projeto esta modelado em Prisma e persistido no Neon
- migrations devem ser versionadas em `prisma/migrations`
- `src/generated/prisma` e gerado localmente e nao deve subir
- o projeto agora suporta soft delete com `deletedAt`
- para remocao logica, a aplicacao deve usar `update` preenchendo `deletedAt`
- `delete` fisico deve ser evitado no codigo de negocio

Exemplo de soft delete:

```ts
await prisma.userGame.update({
  where: { id },
  data: { deletedAt: new Date() }
});
```

Exemplo de leitura apenas de registros ativos:

```ts
await prisma.userGame.findMany({
  where: { deletedAt: null }
});
```

## Rotas atuais

- `/`: redireciona para `/home`
- `/home`: pagina inicial atual
- `/catalogo`: tela de catalogo de jogos
- `/api/games`: proxy interno para a RAWG com suporte a `page`, `search` e `platforms`
- `/api/user`: leitura do usuario atual no banco local

## Fluxo atual do catalogo

O catalogo usa `CatalogProvider` para concentrar:

- estado de carregamento e erro
- pagina atual
- filtros da lista
- busca de jogos via `/api/games`
- calculo de `totalPages` com base no `count` retornado pela API

Quando os filtros mudam, a pagina volta para `1`. Hoje o filtro implementado no fluxo e o `search`.
No front da `GameList`, a barra de filtros ja expoe busca por texto e seletor de plataforma.

## Fluxo atual do usuario

O `UserProvider` carrega o usuario pela rota interna `/api/user`.

Observacao temporaria:

Hoje a chamada de usuario ainda usa um `id` fixo no fluxo de backend apenas para viabilizar a integracao inicial com o banco.
No futuro, quando a autenticacao estiver implementada, o id do usuario sera obtido a partir do token JWT do usuario autenticado. O local de armazenamento do token ainda nao esta definido e sera decidido depois do estudo da estrategia de autenticacao.

Ou seja:

- agora: `id` fixo temporario para desenvolvimento
- depois: `id` extraido do JWT do usuario autenticado

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
- o banco ja possui migrations iniciais e migration de soft delete
- o projeto ja esta integrado ao Neon via Prisma adapter
- ainda ha espaco para evoluir tratamento de erro, loading refinado e filtros adicionais

## Proximos passos sugeridos

- concluir os controles de paginacao do `GameList`
- adicionar skeletons nas telas de loading
- expandir filtros alem de `search`
- melhorar o tratamento de erro e retry
- substituir o `id` fixo do usuario por leitura real do JWT
- aplicar soft delete nas operacoes de remocao do dominio
- adicionar testes para provider e componentes principais
