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
    }, 200);
    
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
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 text-purple-400 rounded-full px-6 py-3 border border-purple-500/20 animate-fade-in-scale">
              <Mic className="w-5 h-5" />
              <span className="text-sm font-semibold">Estúdio de Locução Profissional</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Transforme sua{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
                Comunicação
              </span>
              <br />
              com Locuções{' '}
              <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                Profissionais
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl">
              Conecte-se com seu público através de vozes autênticas e profissionais. 
              Especializados em URA, espera telefônica e conteúdo empresarial de alta qualidade.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-left">
              <Link 
                href="#contact" 
                className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 inline-flex items-center justify-center space-x-3"
              >
                <span>Solicitar Orçamento</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="#amostras" 
                className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 border border-white/20 hover:border-white/40 inline-flex items-center justify-center space-x-3"
              >
                <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Ouvir Amostras</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-8 pt-6 animate-fade-in-right">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-gray-400">Projetos Concluídos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-sm text-gray-400">Satisfação</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">24h</div>
                <div className="text-sm text-gray-400">Entrega Rápida</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Visual */}
          <div className="lg:col-span-5 relative animate-fade-in-up">
            {/* Main Microphone Visual */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="relative">
                {/* Gradient Orb Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl scale-150 animate-pulse"></div>
                
                {/* Microphone Container */}
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-full p-12 border border-purple-500/30 shadow-2xl shadow-purple-500/25">
                  <div className="relative">
                    {/* Microphone Icon */}
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-8 shadow-2xl shadow-purple-500/50">
                      <Mic className="w-16 h-16 text-white" />
                    </div>
                    
                    {/* Sound Waves */}
                    <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <div className="sound-wave bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse" style={{width: '4px', height: '20px'}}></div>
                      <div className="sound-wave bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse" style={{width: '4px', height: '40px', animationDelay: '0.1s'}}></div>
                      <div className="sound-wave bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse" style={{width: '4px', height: '60px', animationDelay: '0.2s'}}></div>
                      <div className="sound-wave bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse" style={{width: '4px', height: '30px', animationDelay: '0.3s'}}></div>
                      <div className="sound-wave bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse" style={{width: '4px', height: '50px', animationDelay: '0.4s'}}></div>
                    </div>
                    
                    {/* Left Sound Waves */}
                    <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <div className="sound-wave bg-gradient-to-t from-pink-500 to-purple-500 rounded-full animate-pulse" style={{width: '4px', height: '25px', animationDelay: '0.5s'}}></div>
                      <div className="sound-wave bg-gradient-to-t from-pink-500 to-purple-500 rounded-full animate-pulse" style={{width: '4px', height: '45px', animationDelay: '0.6s'}}></div>
                      <div className="sound-wave bg-gradient-to-t from-pink-500 to-purple-500 rounded-full animate-pulse" style={{width: '4px', height: '35px', animationDelay: '0.7s'}}></div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-10 -left-10 bg-purple-500/20 rounded-full p-4 backdrop-blur-sm animate-bounce">
                  <Volume2 className="w-6 h-6 text-purple-400" />
                </div>
                <div className="absolute -bottom-10 -right-10 bg-pink-500/20 rounded-full p-4 backdrop-blur-sm animate-bounce" style={{animationDelay: '0.5s'}}>
                  <PlayCircle className="w-6 h-6 text-pink-400" />
                </div>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute top-8 right-0 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 animate-float">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 rounded-full w-3 h-3 animate-pulse"></div>
                <div>
                  <div className="text-white font-semibold">Online Agora</div>
                  <div className="text-gray-400 text-sm">Atendimento 24/7</div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-8 left-0 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 animate-float" style={{animationDelay: '1s'}}>
              <div className="flex items-center space-x-3">
                <div className="bg-purple-500 rounded-full p-2">
                  <Mic className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">Qualidade Premium</div>
                  <div className="text-gray-400 text-sm">Estúdio Profissional</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
