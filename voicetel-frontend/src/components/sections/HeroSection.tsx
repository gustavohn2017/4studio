'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { value: '98%', label: 'Taxa de Satisfação' },
    { value: '+1000', label: 'Clientes Atendidos' },
    { value: '+5000', label: 'Locuções Entregues' }
  ];

  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      <div className="container-responsive relative z-10">
        <div className="grid lg:grid-cols-2 items-center gap-12 lg:gap-20">
          {/* Hero Content */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/30 rounded-full text-sm font-medium text-purple-300 backdrop-blur-sm">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-ping"></span>
                VoiceTel Brasil
              </div>
            </div>
            
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6">
                Locução profissional para
                <span className="block mt-2 text-gradient-primary">
                  URA e Telefonia
                </span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mb-10">
                Transforme o atendimento da sua empresa com locuções profissionais
                de alta qualidade para sistemas de URA, espera telefônica e mensagens personalizadas.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link href="#contato" 
                className="btn-primary"
                scroll={false}
              >
                Solicitar orçamento
              </Link>
              <Link href="#servicos" 
                className="btn-secondary"
                scroll={false}
              >
                Conheça nossos serviços
              </Link>
            </div>
            
            {/* Stats */}
            <div className="pt-8 mt-8 border-t border-slate-700/50">
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-4xl font-bold text-gradient-primary">{stat.value}</div>
                    <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className={`relative transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Background glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/30 to-violet-600/20 blur-2xl animate-pulse-slow"></div>
              
              {/* Main visual element */}              <div className="absolute inset-0 rounded-full border-2 border-slate-700 backdrop-blur-sm bg-black/30 flex items-center justify-center overflow-hidden">
                {/* Substituindo a visualização de áudio dinâmica por uma estática para evitar erros de hidratação */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(0deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(15deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(30deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(45deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(60deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(75deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(90deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(105deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(120deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(135deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(150deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(165deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(180deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(195deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(210deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(225deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(240deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(255deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(270deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(285deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(300deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(315deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(330deg)' }}></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-80 audio-line" style={{ transform: 'rotate(345deg)' }}></div>
                </div>
                
                {/* Center icon */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-10 -right-10 lg:-right-20 w-24 h-24 rounded-xl border border-slate-700 backdrop-blur-sm bg-black/30 flex items-center justify-center transform rotate-12 animate-float">
              <svg className="w-10 h-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            
            <div className="absolute -bottom-10 -left-10 lg:-left-20 w-28 h-28 rounded-xl border border-slate-700 backdrop-blur-sm bg-black/30 flex items-center justify-center transform -rotate-12 animate-float" style={{ animationDelay: '1s' }}>
              <svg className="w-12 h-12 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute left-0 right-0 bottom-0 transform translate-y-1/2 w-full h-24 z-0">
          <svg viewBox="0 0 1440 320" className="w-full h-full fill-current text-slate-900/40">
            <path d="M0,128L48,138.7C96,149,192,171,288,186.7C384,203,480,213,576,208C672,203,768,181,864,160C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>
        {/* Global float animation style */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(-12deg); }
          50% { transform: translateY(-10px) rotate(-8deg); }
          100% { transform: translateY(0px) rotate(-12deg); }
        }
      `}</style>
    </section>
  );
}