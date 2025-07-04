'use client';

import React from 'react';

export default function SimpleHeroSection() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-purple-900 to-indigo-900 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full text-center">
        <h1 className="text-6xl font-bold text-white mb-6">
          Locuções <span className="text-purple-300">Profissionais</span>
        </h1>
        
        <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
          Transforme a comunicação da sua empresa com nossas locuções de alta qualidade.
        </p>
        
        <div className="flex gap-4 justify-center">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Solicitar Orçamento
          </button>
          <button className="border-2 border-purple-400 text-purple-300 hover:bg-purple-500/10 px-8 py-3 rounded-lg font-semibold transition-colors">
            Ouvir Amostras
          </button>
        </div>
      </div>
    </section>
  );
}
