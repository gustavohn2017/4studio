'use client';

import React from 'react';

export default function UraExplanationSection() {
  return (
    <section id="o-que-e-ura" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">O que é URA e por que investir?</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p>
              <strong>URA (Unidade de Resposta Audível)</strong> é uma tecnologia que permite 
              interação automatizada entre uma empresa e seus clientes através de um sistema telefônico. 
              Quando você liga para uma empresa e ouve mensagens como "Digite 1 para vendas, 2 para suporte", 
              você está interagindo com uma URA.
            </p>
            
            <h3 className="text-2xl font-semibold mt-8 mb-4">Por que a qualidade da locução importa?</h3>
            
            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <ul className="space-y-3">
                <li className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3"><strong>Primeira Impressão:</strong> A URA é frequentemente o primeiro contato que um cliente tem com sua empresa.</p>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3"><strong>Profissionalismo:</strong> Uma locução de qualidade reflete o profissionalismo e seriedade da sua empresa.</p>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3"><strong>Clareza:</strong> Instruções claras e bem pronunciadas reduzem a frustração do cliente e otimizam o fluxo de atendimento.</p>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3"><strong>Identidade de Marca:</strong> O tom e estilo da voz podem ser alinhados à identidade da sua marca.</p>
                </li>
              </ul>
            </div>
            
            <h3 className="text-2xl font-semibold mt-8 mb-4">A diferença que uma URA profissional faz</h3>
            
            <p>
              Uma URA bem implementada com locução profissional pode transformar completamente 
              a experiência do cliente ao ligar para sua empresa. Além de transmitir seriedade e competência, 
              ela otimiza o direcionamento de chamadas, reduz o tempo de espera e permite que sua equipe 
              se concentre em atendimentos mais complexos.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div className="bg-red-50 p-5 rounded-lg">
                <h4 className="text-lg font-semibold text-red-700 mb-2">URA Amadora</h4>
                <ul className="space-y-2 text-red-700">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-red-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Ruídos de fundo e baixa qualidade de áudio
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-red-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Dicção imprecisa e pausas incorretas
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-red-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Transmite impressão de empresa improvisada
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-red-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Pode irritar ou confundir clientes
                  </li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-5 rounded-lg">
                <h4 className="text-lg font-semibold text-green-700 mb-2">URA Profissional</h4>
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Áudio limpo e de alta qualidade
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Locução clara com entonação adequada
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Projeta imagem de credibilidade e profissionalismo
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Melhora a experiência do cliente
                  </li>
                </ul>
              </div>
            </div>
            
            <p>
              Na VoiceTel, oferecemos locuções profissionais gravadas em estúdio de alta qualidade, 
              com vozes selecionadas e treinadas para transmitir a mensagem da sua empresa da 
              melhor forma possível. Além disso, contamos com tecnologia de Inteligência Artificial 
              para oferecer opções ainda mais ágeis e personalizáveis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
