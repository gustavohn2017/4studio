'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useFeaturedAudioSamples, useVoiceCategories } from '@/hooks/useApi';
import { AudioSample as ApiAudioSample } from '@/lib/api/client';

// Transform API model to component model
type AudioSample = {
  id: number;
  title: string;
  description: string;
  audioUrl: string;
  category: string;
  categoryId: number;
  voiceType: string;
  gender: string;
};

export default function AudioSamplesSection() {
  const { featuredSamples, loading, error } = useFeaturedAudioSamples();
  const { categories, loading: loadingCategories, error: categoriesError } = useVoiceCategories();
  
  // Categorias fallback caso a API falhe
  const [fallbackCategories] = useState([
    { id: 1, name: 'URA Receptiva', slug: 'ura-receptiva', description: 'Unidade de Resposta Audível para atendimento de chamadas recebidas' },
    { id: 2, name: 'URA Ativa', slug: 'ura-ativa', description: 'Unidade de Resposta Audível para chamadas realizadas pela empresa' },
    { id: 3, name: 'Espera Telefônica', slug: 'espera-telefonica', description: 'Mensagens e músicas para o período de espera em chamadas telefônicas' },
    { id: 4, name: 'Locução para Vídeos', slug: 'locucao-videos', description: 'Narrações profissionais para vídeos institucionais e promocionais' },
    { id: 5, name: 'Voz IA', slug: 'voz-ia', description: 'Locuções geradas por inteligência artificial' }
  ]);
    const [activeCategory, setActiveCategory] = useState<string>('all');
  const [audioSamples, setAudioSamples] = useState<AudioSample[]>([]);

  // Transform API samples to component format
  useEffect(() => {
    if (featuredSamples.length > 0) {
      const transformedSamples = featuredSamples.map((sample: ApiAudioSample): AudioSample => ({
        id: sample.id,
        title: sample.title,
        description: sample.description,
        audioUrl: sample.audio_file,
        category: sample.category_name.toLowerCase().replace(/\s+/g, '-'),
        categoryId: sample.category,
        voiceType: sample.voice_type_name,
        gender: sample.voice_gender.toLowerCase().includes('feminino') ? 'female' : 
               sample.voice_gender.toLowerCase().includes('masculino') ? 'male' : 'ai'
      }));
      
      setAudioSamples(transformedSamples);
    }
  }, [featuredSamples]);

  // Fallback sample data if API fails
  useEffect(() => {
    if (error) {
      console.error('Error loading audio samples:', error);
      setAudioSamples([
        {
          id: 1,
          title: 'URA Receptiva - Feminina',
          description: 'Exemplo de URA para atendimento receptivo com voz feminina.',
          audioUrl: '/audio/sample1.mp3',
          category: 'ura',
          categoryId: 1,
          voiceType: 'Feminina',
          gender: 'female'
        },
        {
          id: 2,
          title: 'URA Receptiva - Masculina',
          description: 'Exemplo de URA para atendimento receptivo com voz masculina.',
          audioUrl: '/audio/sample2.mp3',
          category: 'ura',
          categoryId: 1,
          voiceType: 'Masculina',
          gender: 'male'
        },
        {
          id: 3,
          title: 'Espera Telefônica - Feminina',
          description: 'Exemplo de mensagem de espera telefônica com voz feminina.',
          audioUrl: '/audio/sample3.mp3',
          category: 'espera',
          categoryId: 2,
          voiceType: 'Feminina',
          gender: 'female'
        },
        {
          id: 4,
          title: 'Espera Telefônica - Masculina',
          description: 'Exemplo de mensagem de espera telefônica com voz masculina.',
          audioUrl: '/audio/sample4.mp3',
          category: 'espera',
          categoryId: 2,
          voiceType: 'Masculina',
          gender: 'male'
        },
        {
          id: 5,
          title: 'URA com IA - Feminina',
          description: 'Exemplo de URA com voz feminina gerada por IA.',
          audioUrl: '/audio/sample5.mp3',
          category: 'ia',
          categoryId: 3,
          voiceType: 'IA Feminina',
          gender: 'female'
        },
        {
          id: 6,
          title: 'URA com IA - Masculina',
          description: 'Exemplo de URA com voz masculina gerada por IA.',
          audioUrl: '/audio/sample6.mp3',
          category: 'ia',
          categoryId: 3,
          voiceType: 'IA Masculina',
          gender: 'male'
        }
      ]);
    }  }, [error]);  
  
  // Derived category list from API or fallback
  const categoryOptions = categories && categories.length > 0
    ? [{ id: 'all', name: 'Todas' }, 
       ...categories.map(cat => ({ id: cat.slug, name: cat.name }))]
    : [{ id: 'all', name: 'Todas' }, 
       ...fallbackCategories.map(cat => ({ id: cat.slug, name: cat.name }))
    ];

  const filteredSamples = activeCategory === 'all' 
    ? audioSamples 
    : audioSamples.filter(sample => sample.category === activeCategory);
  return (
    <section id="amostras" className="section-padding bg-gradient-to-b from-neutral-900 to-black">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/30 rounded-full text-sm font-medium text-purple-300 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
            Locuções Profissionais
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Amostras de
            <span className="text-gradient-primary block mt-2">Áudio</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Ouça exemplos de nossas locuções profissionais e descubra a qualidade que podemos oferecer para sua empresa.
          </p>
        </div>
        
        {/* Categories Filter */}        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categoryOptions.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-500/20 transform scale-105'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 border border-slate-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>        {/* Audio Samples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSamples.map((sample, index) => (
            <div 
              key={sample.id} 
              className="glass rounded-xl overflow-hidden hover:shadow-lg hover:shadow-purple-500/10 transition-all transform hover:scale-[1.02]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                <div className="flex items-center mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    sample.gender === 'female' 
                      ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30' 
                      : 'bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/30'
                  }`}>
                    {sample.gender === 'female' ? (
                      <svg className={`w-6 h-6 ${sample.category === 'ia' ? 'text-purple-400' : 'text-pink-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className={`w-6 h-6 ${sample.category === 'ia' ? 'text-violet-400' : 'text-indigo-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg text-white">{sample.title}</h3>
                    <p className="text-sm text-slate-400">{sample.voiceType}</p>
                  </div>
                </div>
                
                <p className="text-slate-300 mb-5">{sample.description}</p>
                
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-lg -z-10 transform scale-105 opacity-0 group-hover:opacity-100 transition-all"></div>
                  <audio 
                    controls 
                    className="w-full rounded-lg bg-slate-800/40 audio-player"
                    style={{ 
                      height: '40px',
                      colorScheme: 'dark'
                    }}
                  >
                    <source src={sample.audioUrl} type="audio/mpeg" />
                    Seu navegador não suporta o elemento de áudio.
                  </audio>
                </div>
              </div>
            </div>
          ))}
        </div>          <div className="text-center mt-12">
          <Link 
            href="/amostras" 
            className="btn-primary inline-flex items-center gap-2 group"
          >
            Ver Todas as Amostras
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
