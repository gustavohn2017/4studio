'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { useAudioSamples, useVoiceCategories, useVoiceTypes } from '@/hooks/useApi';
import { AudioSample } from '@/lib/api/client';

export default function AudioSamplesPage() {
  const { audioSamples, loading: loadingSamples, error: samplesError } = useAudioSamples();
  const { categories, loading: loadingCategories } = useVoiceCategories();
  const { voiceTypes, loading: loadingTypes } = useVoiceTypes();
  
  const [filteredSamples, setFilteredSamples] = useState<AudioSample[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');
  const [activeVoiceType, setActiveVoiceType] = useState<number | 'all'>('all');
  const [activeGender, setActiveGender] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Set up filtered samples
  useEffect(() => {
    if (!audioSamples.length) return;
    
    let samples = [...audioSamples];
    
    // Filter by category
    if (activeCategory !== 'all') {
      samples = samples.filter(sample => sample.category === activeCategory);
    }
    
    // Filter by voice type
    if (activeVoiceType !== 'all') {
      samples = samples.filter(sample => sample.voice_type === activeVoiceType);
    }
    
    // Filter by gender
    if (activeGender !== 'all') {
      samples = samples.filter(sample => {
        if (activeGender === 'male') return sample.voice_gender.toLowerCase().includes('masculino');
        if (activeGender === 'female') return sample.voice_gender.toLowerCase().includes('feminino');
        if (activeGender === 'ai') return sample.voice_gender.toLowerCase().includes('inteligência artificial');
        return true;
      });
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      samples = samples.filter(sample => 
        sample.title.toLowerCase().includes(query) || 
        sample.description.toLowerCase().includes(query) ||
        sample.category_name.toLowerCase().includes(query) ||
        sample.voice_type_name.toLowerCase().includes(query)
      );
    }
    
    setFilteredSamples(samples);
  }, [audioSamples, activeCategory, activeVoiceType, activeGender, searchQuery]);

  // Reset filters
  const resetFilters = () => {
    setActiveCategory('all');
    setActiveVoiceType('all');
    setActiveGender('all');
    setSearchQuery('');
  };

  // Loading state
  const isLoading = loadingSamples || loadingCategories || loadingTypes;
  
  // Format audio duration
  const formatDuration = (duration: string | null): string => {
    if (!duration) return '--:--';
    return duration;
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Amostras de Áudio</h1>
            <p className="text-xl text-gray-600">
              Explore nossa biblioteca de locuções profissionais e encontre o estilo perfeito para seu projeto.
            </p>
          </div>

          {/* Search and filters section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Search input */}
              <div className="col-span-1 md:col-span-4 mb-4">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Pesquisar
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="search"
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Buscar por título, descrição..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Category filter */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  id="category"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={activeCategory === 'all' ? 'all' : String(activeCategory)}
                  onChange={(e) => setActiveCategory(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                >
                  <option value="all">Todas as Categorias</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Voice type filter */}
              <div>
                <label htmlFor="voiceType" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Voz
                </label>                <select
                  id="voiceType"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={activeVoiceType === 'all' ? 'all' : String(activeVoiceType)}
                  onChange={(e) => setActiveVoiceType(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                >
                  <option value="all">Todos os Tipos</option>
                  {Array.isArray(voiceTypes) ? voiceTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  )) : null}
                </select>
              </div>
              
              {/* Gender filter */}
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Gênero
                </label>
                <select
                  id="gender"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={activeGender}
                  onChange={(e) => setActiveGender(e.target.value)}
                >
                  <option value="all">Todos</option>
                  <option value="male">Masculino</option>
                  <option value="female">Feminino</option>
                  <option value="ai">IA</option>
                </select>
              </div>
              
              {/* Reset filters */}
              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Limpar Filtros
                </button>
              </div>
            </div>
          </div>

          {/* Audio samples content */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : samplesError ? (
            <div className="text-center py-12">
              <p className="text-red-500">Erro ao carregar amostras de áudio. Por favor, tente novamente mais tarde.</p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-gray-600">{filteredSamples.length} amostra(s) encontrada(s)</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSamples.length > 0 ? (
                  filteredSamples.map((sample) => (
                    <div key={sample.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            sample.voice_gender.toLowerCase().includes('feminino') 
                              ? 'bg-pink-100' 
                              : sample.voice_gender.toLowerCase().includes('masculino')
                                ? 'bg-blue-100'
                                : 'bg-purple-100'
                          }`}>
                            {sample.voice_gender.toLowerCase().includes('feminino') ? (
                              <svg className="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            ) : sample.voice_gender.toLowerCase().includes('masculino') ? (
                              <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            ) : (
                              <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            )}
                          </div>
                          <div className="ml-3">
                            <h3 className="font-semibold text-lg">{sample.title}</h3>
                            <p className="text-sm text-gray-500">
                              {sample.voice_type_name} • {sample.category_name}
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{sample.description}</p>
                        
                        <div className="flex justify-between items-center mb-2 text-xs text-gray-500">
                          <span>Duração: {formatDuration(sample.duration)}</span>
                          {sample.featured && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                              Destaque
                            </span>
                          )}
                        </div>
                        
                        <audio controls className="w-full">
                          <source src={sample.audio_file} type="audio/mpeg" />
                          Seu navegador não suporta o elemento de áudio.
                        </audio>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma amostra encontrada</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Tente ajustar seus filtros ou limpar a pesquisa.
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={resetFilters}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Limpar filtros
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
