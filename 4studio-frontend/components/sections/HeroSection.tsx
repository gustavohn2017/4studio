'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Mic, PlayCircle, Volume2 } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    // Inicia a animação após o componente ser montado
    setIsAnimated(true);
    
    // Configura a animação das ondas sonoras
    const interval = setInterval(() => {
      const waves = document.querySelectorAll('.sound-wave');
      waves.forEach(wave => {
        const randomHeight = Math.random() * 100 + 20;
        wave.setAttribute('height', randomHeight.toString());
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-28 md:py-32 min-h-screen flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content - Text */}
          <div className="text-left lg:col-span-7 space-y-8 animate-fade-in-up">
            
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-purple-500/30 rounded-full pl-1.5 pr-4 py-1.5 animate-fade-in-scale">
              <div className="flex space-x-1 items-center bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full p-1.5">
                <Volume2 className="w-3.5 h-3.5 text-emerald-950" />
              </div>
              <span className="text-sm font-medium text-emerald-400">Disponível 24/7</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Dê <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Voz</span> à 
              <br className="hidden sm:block" /> 
              Sua <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Marca</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl">
              Locuções profissionais que transformam a experiência do cliente em sua 
              <span className="text-purple-400"> URA, espera telefônica </span> 
              e canais de comunicação.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-left">
              <Link 
                href="#contact" 
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-br from-purple-600 to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
              >
                <span>Solicitar Orçamento</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/amostras"
                className="inline-flex items-center justify-center px-8 py-4 border border-purple-500/50 text-purple-400 hover:bg-gradient-to-br hover:from-purple-600/10 hover:to-indigo-600/10 hover:border-purple-500 font-semibold rounded-xl transition-all duration-300"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                <span>Ouvir Amostras</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 mt-4 border-t border-gray-800/50 animate-fade-in-right">
              {[
                { value: "+1000", label: "Clientes Satisfeitos" },
                { value: "+5000", label: "Locuções Entregues" },
                { value: "24h", label: "Entrega Expressa" }
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Audio Visual Element */}
          <div className="lg:col-span-5 flex justify-center items-center animate-fade-in-up">
            <div className="relative w-full max-w-md aspect-square">
              {/* Background radial glow */}
              <div className="absolute inset-0 bg-purple-600/10 rounded-full blur-3xl"></div>
              
              {/* Animated Background Circle */}
              <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 animate-pulse"></div>
              <div className="absolute inset-8 rounded-full border-4 border-indigo-500/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              
              {/* Center Piece */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  {/* Círculos concêntricos animados */}
                  <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-pulse"></div>
                  <div className="absolute inset-4 rounded-full border-2 border-indigo-600/30 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                  <div className="absolute inset-8 rounded-full border-2 border-purple-400/30 animate-pulse" style={{ animationDelay: '1.2s' }}></div>
                  
                  {/* Efeito de brilho com rotação */}
                  <div className="absolute inset-0 rounded-full overflow-hidden animate-spin-slow">
                    <div className="absolute -inset-1">
                      <div className="w-full h-full bg-gradient-conic from-purple-600/40 via-transparent to-indigo-600/40"></div>
                    </div>
                  </div>
                  
                  {/* Efeito de brilho radial */}
                  <div className="absolute inset-12 rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-sm animate-pulse"></div>
                  
                  {/* Inner Circle with Mic */}
                  <div className="absolute inset-12 bg-gradient-to-br from-purple-600 to-indigo-800 rounded-full shadow-xl shadow-purple-500/30 flex items-center justify-center animate-pulse">
                    {/* Reflexo na superfície */}
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-br from-white/30 to-transparent"></div>
                      </div>
                    </div>
                    <Mic className="w-20 h-20 text-white drop-shadow-lg" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-5 right-10 w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full opacity-80 animate-float"></div>
              <div className="absolute bottom-10 left-5 w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full opacity-70 animate-float" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute top-1/2 -left-4 w-6 h-6 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full opacity-60 animate-float" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-slate-900/50 z-10"></div>
      <svg className="absolute bottom-0 left-0 right-0 z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#0f1729" fillOpacity="0.3" d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,218.7C840,213,960,171,1080,165.3C1200,160,1320,192,1380,208L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      </svg>
    </section>
  );
}
