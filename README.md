# GameFlow

Projeto base em Next.js para evolucao de um app de listagem organizada de jogos.

## Requisitos

- Node.js 20+
- npm 10+

## Configuracao inicial

1. Instale dependencias:

```bash
npm install
```

2. Crie seu arquivo local de ambiente:

```bash
cp .env.example .env.local
```

3. Rode o projeto em desenvolvimento:

```bash
npm run dev
```

App disponivel em `http://localhost:3000`.

## Scripts

- `npm run dev`: ambiente de desenvolvimento
- `npm run build`: build de producao
- `npm run start`: executa build em producao
- `npm run lint`: analise de lint
- `npm run lint:fix`: corrige problemas de lint automaticamente
- `npm run typecheck`: validacao de tipos TypeScript
- `npm run check`: executa lint + typecheck

## Estrutura atual

- `src/app`: rotas e UI (App Router)
- `src/app/home/page.tsx`: tela inicial atual
- `src/app/page.tsx`: redireciona `/` para `/home`
- `public`: arquivos estaticos

## Proximos passos sugeridos

- Definir dominio funcional (features de jogos)
- Estruturar camadas (`components`, `lib`, `services`)
- Adicionar testes (unitarios e integracao)
- Configurar CI para rodar `npm run check`
