'use client';

import { useState, useEffect, useRef } from 'react';

export default function ServicesSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      id: 1,
      title: "URA Receptiva e Ativa",
      description: "Gravamos todas as locuções necessárias para sua URA, seja para recepção de ligações ou para campanhas ativas de telemarketing.",
      features: ["Gravação profissional", "Entrega em 24h", "Qualidade HD"],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Espera Telefônica Personalizada",
      description: "Crie uma experiência agradável para seus clientes durante a espera, com mensagens informativas ou promocionais personalizadas.",
      features: ["Música de fundo", "Mensagens customizadas", "Formato profissional"],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Locução para Vídeos e VSL",
      description: "Locuções profissionais para vídeos corporativos, apresentações, treinamentos e vídeos de vendas que capturam a atenção do público.",
      features: ["Sincronização perfeita", "Diversos estilos", "Revisões incluídas"],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Limpeza de Áudios e Ruídos",
      description: "Recuperamos e melhoramos a qualidade de gravações existentes, removendo ruídos e imperfeições para um resultado profissional.",
      features: ["Remoção de ruídos", "Equalização", "Masterização"],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m0 0l3-3m-3 3l-3-3m3 3l3 3m-3-6l-3-3m3 3l3 3" />
        </svg>
      )
    },
    {
      id: 5,
      title: "Locução com IA",
      description: "Utilize nossa tecnologia de IA para criar locuções de alta qualidade, com agilidade e custo reduzido, em diversos idiomas.",
      features: ["Tecnologia avançada", "Múltiplos idiomas", "Entrega instantânea"],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: 6,
      title: "Consultoria Especializada",
      description: "Receba orientação estratégica para otimizar sua comunicação telefônica e melhorar a experiência do cliente.",
      features: ["Análise completa", "Estratégias personalizadas", "Suporte contínuo"],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = sectionRef.current?.querySelectorAll('[data-index]');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-b from-black to-neutral-900">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/30 rounded-full text-sm font-medium text-purple-300 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
            Nossos Serviços
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Soluções Completas em
            <span className="text-gradient-primary block mt-2">Áudio Profissional</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Transformamos sua comunicação com tecnologia de ponta e experiência comprovada. 
            Cada projeto é único e merece uma solução personalizada.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-index={index}
              className={`card group hover:bg-zinc-900/70 transition-all duration-500 transform ${
                visibleItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-xl flex items-center justify-center text-purple-400 group-hover:text-purple-300 transition-colors">
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gradient-primary transition-all">
                {service.title}
              </h3>
              
              <p className="text-slate-400 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm text-slate-300">
                    <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-violet-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="glass p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Pronto para começar seu projeto?
            </h3>
            <p className="text-slate-300 mb-6">
              Entre em contato conosco e descubra como podemos transformar sua comunicação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#contato" className="btn-primary">
                Solicitar Orçamento
              </a>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="btn-outline">
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
