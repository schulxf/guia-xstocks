# Guia Interativo xStocks

Projeto simples em React + Vite para publicar um guia interativo com links e acompanhamento de progresso.

## Estrutura

- `index.html`: shell da aplicação
- `src/App.jsx`: conteúdo e interações da página
- `src/main.jsx`: bootstrap do React
- `vercel.json`: rewrite simples para servir a SPA

## Rodando localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```

## Subir no GitHub

```bash
git init
git add .
git commit -m "Estrutura inicial do guia xStocks"
```

Depois crie o repositório no GitHub e conecte o remoto.

## Subir no Vercel

1. Importe o repositório no Vercel.
2. O Vercel deve detectar automaticamente `Vite`.
3. Use os comandos padrão:
   Build Command: `npm run build`
   Output Directory: `dist`
4. Publique.

Como o projeto é uma SPA de página única, o arquivo `vercel.json` já deixa o rewrite preparado.
