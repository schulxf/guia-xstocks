import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Droplets,
  ExternalLink,
  Globe,
  Info,
  LineChart,
  ShieldCheck,
  TrendingUp,
  Wallet,
  Zap,
} from 'lucide-react';

const STORAGE_KEY = 'xstocks-guide-completed-tasks';

const tutorialSteps = [
  {
    id: 'phase1',
    title: 'Fase 1: Cadastro e xPoints',
    description:
      'Ative sua conta, entenda os fundamentos e faça o check-in diário para maximizar seus ganhos.',
    icon: <Zap className="h-6 w-6 text-[#00E1FF]" />,
    tasks: [
      {
        id: 't1_1',
        title: 'Ativar conta na xStocks',
        desc:
          'Conecte sua carteira Solana (Phantom ou Solflare) à plataforma oficial para começar a pontuar. Caso possua, use um código de convite para ganhar bônus permanente.',
        link: 'https://defi.xstocks.fi/points?ref=SCHULX',
      },
      {
        id: 't1_2',
        title: 'Check-in diário (botão GM)',
        desc:
          'Acesse a aba de pontos diariamente e clique no botão "GM". Isso garante pontos todos os dias, de forma gratuita.',
        link: 'https://defi.xstocks.fi/points',
      },
      {
        id: 't1_3',
        title: 'Entrar no Telegram oficial',
        desc:
          'Junte-se ao grupo do Telegram da xStocks e vincule sua conta para receber um bônus permanente na pontuação.',
        link: 'https://defi.xstocks.fi/points',
      },
      {
        id: 't1_4',
        title: 'Verificar Proof of Reserves',
        desc:
          'Boas práticas: as xStocks são emitidas pela Backed e lastreadas na proporção de 1:1. Verifique as reservas on-chain antes de operar.',
        link: 'https://defi.xstocks.fi/proof-of-reserves',
      },
    ],
  },
  {
    id: 'phase2',
    title: 'Fase 2: Comprando xStocks',
    description:
      'Apenas manter ações tokenizadas na carteira já garante a pontuação do tier base.',
    icon: <Wallet className="h-6 w-6 text-[#00E1FF]" />,
    tasks: [
      {
        id: 't2_1',
        title: 'Ter SOL para taxas',
        desc:
          'Mantenha uma fração de SOL na carteira para pagar as taxas de transação da rede Solana.',
      },
      {
        id: 't2_2',
        title: 'Comprar ativos xStocks via DEX',
        desc:
          'Use agregadores como Jupiter ou DEXs como Raydium e Kamino para trocar USDC ou SOL pelas ações de sua preferência.',
        link: 'https://jup.ag',
        subLinks: [
          { name: 'Página de ativos xStocks', url: 'https://defi.xstocks.fi/' },
          { name: 'Kamino Swap', url: 'https://kamino.com/swap/SOL-NVDAx' },
        ],
      },
    ],
  },
  {
    id: 'phase3',
    title: 'Fase 3: Colateral e empréstimos',
    description:
      'Forneça seus tokens xStocks como colateral no DeFi. Empréstimos contra sua carteira de ações rendem mais pontos.',
    icon: <TrendingUp className="h-6 w-6 text-[#00E1FF]" />,
    tasks: [
      {
        id: 't3_1',
        title: 'Fazer supply na Kamino',
        desc:
          'Deposite ativos como QQQx, SPYx ou NVDAx. Você pode tomar empréstimos em stablecoins contra essas ações com LTV elevado.',
        link: 'https://kamino.com/borrow',
      },
      {
        id: 't3_2',
        title: 'Vault de SPYx na Falcon Finance',
        desc:
          'Use seus tokens como colateral na Falcon Finance para emitir USDf. O vault de SPYx pode render APR sobre a sua exposição ao S&P 500.',
        link: 'https://falcon.finance',
      },
      {
        id: 't3_3',
        title: 'Alavancagem na Loopscale',
        desc:
          'Interação avançada: utilize seus xStocks como colateral para realizar loops alavancados.',
        link: 'https://loopscale.com',
      },
    ],
  },
  {
    id: 'phase4',
    title: 'Fase 4: Provisão de liquidez',
    description:
      'Fornecer liquidez em pools AMM garante as maiores recompensas em xPoints, além das taxas de negociação.',
    icon: <Droplets className="h-6 w-6 text-[#00E1FF]" />,
    tasks: [
      {
        id: 't4_1',
        title: 'Adicionar liquidez no Raydium ou Orca',
        desc:
          'Forneça liquidez em pares consolidados como TSLAx/USDC ou NVDAx/USDC. Fique atento ao risco de perda impermanente.',
        subLinks: [
          { name: 'Raydium', url: 'https://raydium.io/' },
          { name: 'Orca', url: 'https://www.orca.so/' },
        ],
      },
    ],
  },
];

function loadCompletedTasks() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [completedTasks, setCompletedTasks] = useState(() => loadCompletedTasks());
  const [expandedPhase, setExpandedPhase] = useState('phase1');

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completedTasks));
  }, [completedTasks]);

  const totalTasks = tutorialSteps.reduce((acc, phase) => acc + phase.tasks.length, 0);
  const progressPercentage = Math.round((completedTasks.length / totalTasks) * 100);

  function toggleTask(taskId) {
    setCompletedTasks((previousValue) =>
      previousValue.includes(taskId)
        ? previousValue.filter((id) => id !== taskId)
        : [...previousValue, taskId]
    );
  }

  function togglePhase(phaseId) {
    setExpandedPhase((previousValue) => (previousValue === phaseId ? null : phaseId));
  }

  return (
    <div className="min-h-screen bg-[#070707] pb-12 font-sans text-gray-200 selection:bg-[#00E1FF] selection:text-black">
      <nav className="sticky top-0 z-50 border-b border-gray-800 bg-[#070707]/90 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-28 items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://i.imgur.com/QAqVuyN.png"
                alt="Mercurius Crypto"
                className="h-16 object-contain py-2 sm:h-[96px]"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                  event.currentTarget.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="hidden items-center gap-2 text-xl font-bold tracking-widest text-white">
                MERCURIUS <span className="font-light text-gray-500">CRYPTO</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <img
                src="https://docs.xstocks.fi/~gitbook/image?url=https%3A%2F%2F3077926259-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FDCdVAUr4qPUmZONgfTGR%252Fuploads%252F7JXxJJ3cWSzCEOeDpfbL%252FLogo%2520Lockup%2520V%2520White%2520wGradient%25402x.svg%3Falt%3Dmedia%26token%3D3189e91f-13d1-4d7d-880c-6119148664fb&width=768&dpr=3&quality=100&sign=4430e36a&sv=2"
                alt="xStocks"
                className="h-12 object-contain py-2 drop-shadow-lg sm:h-16 lg:h-20"
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-4 pb-8 pt-12 sm:px-6 lg:px-8">
        <div className="relative mb-6 flex flex-col items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-[#00E1FF] to-[#0088FF] p-6 shadow-[0_0_40px_rgba(0,225,255,0.15)] md:flex-row md:p-8">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-10">
            <svg
              viewBox="0 0 200 200"
              className="absolute -right-10 -top-10 h-64 w-64 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <circle cx="100" cy="100" r="80" />
              <circle cx="100" cy="100" r="60" />
              <path d="M100 20 L100 180 M20 100 L180 100" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-start">
            <h1 className="mb-1 text-3xl font-extrabold uppercase leading-none tracking-tighter text-black md:text-4xl">
              Programa de Pontos{' '}
              <span className="ml-2 inline-block -skew-x-6 rounded-lg bg-black px-3 py-1 text-[#00E1FF]">
                xStocks
              </span>
            </h1>

            <div className="mt-3 flex items-center gap-2 text-lg font-medium text-black/80">
              <ShieldCheck className="h-5 w-5" />
              Interações oficiais na rede Solana
            </div>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-gray-800 bg-[#111] p-5 transition-all hover:border-gray-700">
            <BookOpen className="mb-3 h-6 w-6 text-[#00E1FF]" />
            <h3 className="mb-2 font-bold text-white">O que é xStocks?</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Ações americanas tokenizadas como ativos SPL nativos na Solana, lastreadas em
              1:1 e emitidas pela Backed.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-[#111] p-5 transition-all hover:border-gray-700">
            <LineChart className="mb-3 h-6 w-6 text-[#00E1FF]" />
            <h3 className="mb-2 font-bold text-white">Crescimento do ecossistema</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Use este guia para centralizar os links mais importantes e acompanhar as
              interações mais relevantes dentro do programa.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-[#111] p-5 transition-all hover:border-gray-700">
            <Info className="mb-3 h-6 w-6 text-[#00E1FF]" />
            <h3 className="mb-2 font-bold text-white">Uso prático</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Marque tarefas como concluídas, abra os links oficiais e acompanhe o progresso
              do seu roteiro em uma página única.
            </p>
          </div>
        </div>

        <div className="mb-8 mt-12">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-white">Guia de interações</h3>
            <span className="rounded-md bg-[#00E1FF]/10 px-3 py-1 font-mono font-bold text-[#00E1FF]">
              {progressPercentage}% concluído
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full border border-gray-800 bg-gray-900">
            <div
              className="h-full bg-[#00E1FF] shadow-[0_0_10px_#00E1FF] transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {tutorialSteps.map((phase) => {
            const isExpanded = expandedPhase === phase.id;
            const phaseTasksCompleted = phase.tasks.filter((task) =>
              completedTasks.includes(task.id)
            ).length;
            const isPhaseComplete = phaseTasksCompleted === phase.tasks.length;

            return (
              <div
                key={phase.id}
                className="overflow-hidden rounded-xl border border-gray-800 bg-[#111] transition-all duration-200 hover:border-gray-700"
              >
                <button
                  onClick={() => togglePhase(phase.id)}
                  className="flex w-full items-center justify-between bg-[#151515] px-6 py-5 text-left transition-colors hover:bg-[#1a1a1a] focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-lg p-2 ${
                        isPhaseComplete
                          ? 'bg-[#00E1FF]/20 text-[#00E1FF]'
                          : 'bg-gray-800 text-gray-400'
                      }`}
                    >
                      {isPhaseComplete ? <CheckCircle2 className="h-6 w-6" /> : phase.icon}
                    </div>
                    <div>
                      <h3
                        className={`text-lg font-bold ${
                          isPhaseComplete
                            ? 'text-gray-500 line-through decoration-gray-600'
                            : 'text-white'
                        }`}
                      >
                        {phase.title}
                      </h3>
                      <p className="mt-0.5 hidden text-sm text-gray-400 sm:block">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-mono text-gray-500">
                      {phaseTasksCompleted}/{phase.tasks.length}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="space-y-4 border-t border-gray-800 bg-[#0a0a0a] p-6">
                    {phase.tasks.map((task) => {
                      const isTaskDone = completedTasks.includes(task.id);

                      return (
                        <div
                          key={task.id}
                          className={`rounded-xl border p-5 transition-all ${
                            isTaskDone
                              ? 'border-[#00E1FF]/20 bg-[#00E1FF]/5'
                              : 'border-gray-800 bg-[#111]'
                          }`}
                        >
                          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                            <div className="flex-1">
                              <h4
                                className={`flex items-center gap-2 text-base font-bold ${
                                  isTaskDone ? 'text-gray-400' : 'text-white'
                                }`}
                              >
                                {task.title}
                              </h4>
                              <p className="mt-1.5 text-sm leading-relaxed text-gray-400">
                                {task.desc}
                              </p>

                              {task.subLinks && (
                                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                  {task.subLinks.map((subLink) => (
                                    <a
                                      key={subLink.url}
                                      href={subLink.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="group flex items-center justify-between rounded-lg border border-gray-800 bg-black px-3 py-2.5 text-xs font-medium text-gray-300 transition-colors hover:bg-gray-900 hover:text-[#00E1FF]"
                                    >
                                      <span className="truncate pr-2">{subLink.name}</span>
                                      <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-gray-600 group-hover:text-[#00E1FF]" />
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="mt-4 flex w-full flex-row items-center gap-3 sm:mt-0 sm:w-auto sm:flex-col sm:items-stretch">
                              {task.link && (
                                <a
                                  href={task.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
                                >
                                  Acessar <ExternalLink className="h-4 w-4" />
                                </a>
                              )}

                              <button
                                onClick={() => toggleTask(task.id)}
                                className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors ${
                                  isTaskDone
                                    ? 'border-[#00E1FF]/30 bg-[#00E1FF]/10 text-[#00E1FF] hover:bg-[#00E1FF]/20'
                                    : 'border-gray-600 bg-transparent text-gray-400 hover:border-gray-400 hover:text-white'
                                }`}
                              >
                                {isTaskDone ? (
                                  <>
                                    <CheckCircle2 className="h-4 w-4" /> Concluído
                                  </>
                                ) : (
                                  <>
                                    <Circle className="h-4 w-4" /> Marcar feito
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <footer className="mt-20 border-t border-gray-800 bg-[#070707] py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 text-center sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-gray-500">
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium uppercase tracking-widest">Solana Mainnet</span>
          </div>
          <p className="mt-2 max-w-2xl text-xs text-gray-600">
            Este material possui caráter educativo. Provisão de liquidez e empréstimos em
            DeFi envolvem riscos de mercado, como perda impermanente e liquidação. Não é
            recomendação de investimento.
          </p>
        </div>
      </footer>
    </div>
  );
}

