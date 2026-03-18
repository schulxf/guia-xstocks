# Guia Interativo xStocks

Projeto simples em React + Vite para publicar um guia interativo com links e acompanhamento de progresso.

## Estrutura

- `index.html`: shell da aplicacao
- `src/App.jsx`: conteudo e interacoes da pagina
- `src/main.jsx`: bootstrap do React
- `vercel.json`: rewrite simples para servir a SPA

## Rodando localmente

```bash
npm install
npm run dev
```

## Build de producao

```bash
npm run build
```

## Subir no GitHub

```bash
git init
git add .
git commit -m "Estrutura inicial do guia xStocks"
```

Depois crie o repositorio no GitHub e conecte o remoto.

## Subir no Vercel

1. Importe o repositorio no Vercel.
2. O Vercel deve detectar automaticamente `Vite`.
3. Use os comandos padrao:
   Build Command: `npm run build`
   Output Directory: `dist`
4. Publique.

Como o projeto e uma SPA de pagina unica, o arquivo `vercel.json` ja deixa o rewrite preparado.
