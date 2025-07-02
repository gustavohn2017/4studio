'use client';

import React, { useState } from 'react'
import Link from 'next/link'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-slate-800/50">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="font-bold text-xl md:text-2xl lg:text-3xl text-gradient-primary tracking-tight inline-flex items-center h-14 transition-all hover:scale-105">
              VOICETEL
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/#servicos" className="font-medium text-slate-300 hover:text-white transition-all py-2 relative group">
              Serviços
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-violet-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/#beneficios" className="font-medium text-slate-300 hover:text-white transition-all py-2 relative group">
              Benefícios
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-violet-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/amostras" className="font-medium text-slate-300 hover:text-white transition-all py-2 relative group">
              Amostras
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-violet-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/depoimentos" className="font-medium text-slate-300 hover:text-white transition-all py-2 relative group">
              Depoimentos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-violet-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/#contato" className="font-medium text-slate-300 hover:text-white transition-all py-2 relative group">
              Contato
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-violet-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>          
          {/* CTA Button */}
          <div className="hidden sm:block">
            <Link href="/#contato" className="btn-primary">
              Solicitar Orçamento
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="focus:outline-none text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="px-4 py-2 space-y-1 bg-black/95 backdrop-blur-md border-t border-slate-800/50">
          <Link href="/#servicos" 
            className="block px-4 py-3 rounded-lg font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            onClick={() => setMobileMenuOpen(false)}>
            Serviços
          </Link>
          <Link href="/#beneficios" 
            className="block px-4 py-3 rounded-lg font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            onClick={() => setMobileMenuOpen(false)}>
            Benefícios
          </Link>
          <Link href="/amostras" 
            className="block px-4 py-3 rounded-lg font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            onClick={() => setMobileMenuOpen(false)}>
            Amostras
          </Link>
          <Link href="/depoimentos" 
            className="block px-4 py-3 rounded-lg font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            onClick={() => setMobileMenuOpen(false)}>
            Depoimentos
          </Link>
          <Link href="/#contato" 
            className="block px-4 py-3 rounded-lg font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            onClick={() => setMobileMenuOpen(false)}>
            Contato
          </Link>
          <div className="mt-4 pt-4 border-t border-slate-800">
            <Link href="/#contato" className="btn-primary w-full text-center block" onClick={() => setMobileMenuOpen(false)}>
              Solicitar Orçamento
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
