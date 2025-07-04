'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Volume2, Phone } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Serviços', href: '#services' },
    { name: 'Benefícios', href: '#benefits' },
    { name: 'Amostras', href: '#audios' },
    { name: 'Contato', href: '#contact' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center group"
          >
            <div className="flex items-center animate-fade-in-left">
              <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mr-3 group-hover:shadow-glow transition-all duration-300">
                <Volume2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl text-white tracking-tight">4<span className="text-purple-400">Studio</span></span>
                <span className="block text-xs text-gray-400">Locuções Profissionais</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              <div key={item.name} className="animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <Link 
                  href={item.href}
                  className="px-4 py-2 mx-1 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              </div>
            ))}
            
            <div className="animate-fade-in-scale">
              <Link 
                href="#contact" 
                className="ml-4 px-5 py-2.5 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-purple-500/20 hover:shadow-lg transition-all duration-200 flex items-center font-medium"
              >
                <Phone className="w-4 h-4 mr-2" />
                Orçamento
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-white/10 animate-slide-down">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={toggleMobileMenu}
                  className="px-4 py-3 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                href="#contact"
                onClick={toggleMobileMenu}
                className="mt-2 px-4 py-3 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center font-medium"
              >
                <Phone className="w-4 h-4 mr-2" />
                Solicitar Orçamento
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
