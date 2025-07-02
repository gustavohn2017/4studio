'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function BenefitsSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const benefits = [
    {
      title: "Qualidade Profissional",
      description: "Equipamentos de última geração e locutores experientes garantem um resultado impecável para sua empresa.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      stats: "99.8%",
      statLabel: "de satisfação",
      color: "purple"
    },
    {
      title: "Entrega Rápida",
      description: "Seus projetos prontos em até 24 horas, sem comprometer a qualidade. Urgência? Temos soluções express.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      stats: "24h",
      statLabel: "entrega média",
      color: "violet"
    },
    {
      title: "Preço Justo",
      description: "Investimento que cabe no seu orçamento. Qualidade profissional não precisa custar uma fortuna.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      stats: "50%",
      statLabel: "economia média",
      color: "indigo"
    },
    {
      title: "Suporte Completo",
      description: "Acompanhamento em todas as etapas do projeto, com revisões ilimitadas até sua total satisfação.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 00-9.75 9.75c0 5.385 4.365 9.75 9.75a9.75 9.75 0 009.75-9.75A9.75 9.75 0 0012 2.25z" />
        </svg>
      ),
      stats: "24/7",
      statLabel: "suporte ativo",
      color: "emerald"
    }
  ];

  const features = [
    {
      title: "Tecnologia de Ponta",
      description: "Utilizamos os mais avançados equipamentos de gravação e softwares de edição profissional.",
      details: [
        "Microfones de alta fidelidade",
        "Estúdio acusticamente tratado",
        "Software de edição profissional",
        "Processamento digital avançado"
      ]
    },
    {
      title: "Processo Otimizado",
      description: "Metodologia comprovada que garante eficiência sem comprometer a qualidade.",
      details: [
        "Briefing detalhado",
        "Aprovação prévia do roteiro",
        "Gravação profissional",
        "Revisões ilimitadas"
      ]
    },
    {
      title: "Flexibilidade Total",
      description: "Adaptamos nossos serviços às suas necessidades específicas e prazos.",
      details: [
        "Diversos formatos de entrega",
        "Múltiplas vozes disponíveis",
        "Urgências atendidas",
        "Projetos personalizados"
      ]
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

  // Auto-cycle through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 40000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-b from-neutral-900 to-black">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/30 rounded-full text-sm font-medium text-purple-300 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
            Por que nos escolher
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Benefícios que fazem a
            <span className="text-gradient-primary block mt-2">diferença</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Mais de 500 empresas já confiam em nossos serviços. 
            Descubra por que somos referência em locução profissional.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              data-index={index}
              className={`text-center group transition-all duration-500 transform ${
                visibleItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Stats */}
              <div className="mb-6">
                <div className="text-4xl md:text-5xl font-bold text-gradient-primary mb-2">
                  {benefit.stats}
                </div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">
                  {benefit.statLabel}
                </div>
              </div>

              {/* Icon */}
              <div className="mb-6">
                <div className={`w-16 h-16 mx-auto glass rounded-xl flex items-center justify-center text-${benefit.color}-400 group-hover:text-${benefit.color}-300 transition-colors`}>
                  {benefit.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4">
                {benefit.title}
              </h3>
              
              <p className="text-slate-400 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Features Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Features List */}
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Como trabalhamos
            </h3>

            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-1200 ${
                  activeFeature === index
                    ? 'glass border-purple-500/50'
                    : 'bg-zinc-900/30 border-zinc-800 hover:bg-zinc-900/50'
                } border`}
                onClick={() => setActiveFeature(index)}
              >
                <h4 className={`text-xl font-bold mb-3 transition-colors ${
                  activeFeature === index ? 'text-gradient-primary' : 'text-white'
                }`}>
                  {feature.title}
                </h4>
                <p className="text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Feature Details */}
          <div className="glass p-8 rounded-2xl">
            <h4 className="text-2xl font-bold text-white mb-6">
              {features[activeFeature].title}
            </h4>
            <p className="text-slate-300 mb-8 leading-relaxed">
              {features[activeFeature].description}
            </p>
            
            <div className="space-y-4">
              {features[activeFeature].details.map((detail, index) => (
                <div
                  key={index}
                  className="flex items-center text-slate-300 animate-slide-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-4"></div>
                  {detail}
                </div>
              ))}
            </div>

            {/* Progress Indicator */}
            <div className="flex space-x-2 mt-8">
              {features.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeFeature === index ? 'bg-purple-400 w-8' : 'bg-slate-600 w-4'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="glass p-8 md:p-12 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Experimente a diferença da qualidade profissional
            </h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Solicite um orçamento gratuito e descubra como podemos elevar o padrão da sua comunicação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#contato" className="btn-primary text-lg px-8 py-4">
                Solicitar Orçamento Gratuito
              </a>
              <a href="/amostras" className="btn-outline text-lg px-8 py-4">
                Ouvir Amostras
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
