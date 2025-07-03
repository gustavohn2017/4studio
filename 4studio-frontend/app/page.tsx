'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
// import UraExplanationSection from '@/components/sections/UraExplanationSection';
import ServicesSection from '@/components/sections/ServicesSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import AudioSamplesSection from '@/components/sections/AudioSamplesSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Verificar se é um usuário administrativo (apenas para desenvolvimento)
  useEffect(() => {
    // Em produção, essa verificação seria feita com autenticação real
    const checkAdminMode = () => {
      const urlParams = new URLSearchParams(window.location.search);
      setIsAdmin(urlParams.get('admin') === 'true');
    };
    
    checkAdminMode();
  }, []);

  return (
    <Layout>
      {isAdmin && (
        <div className="fixed top-24 right-6 z-50 flex flex-col space-y-4">
          <a 
            href="http://localhost:8000/admin/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-indigo-900 font-bold py-2 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105"
          >
            <span className="hidden sm:inline">Painel Admin</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.34-.035-.67-.1-.99A5.001 5.001 0 0010 7z" clipRule="evenodd" />
            </svg>
          </a>
          <a 
            href="http://localhost:8000/api/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105"
          >
            <span className="hidden sm:inline">API</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </a>
        </div>
      )}
      <HeroSection />
      {/* <UraExplanationSection /> */}
      <ServicesSection />
      <BenefitsSection />
      <AudioSamplesSection />
      <ContactSection />
    </Layout>
  );
}
