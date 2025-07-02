'use client';

import { useState } from 'react';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { useTestimonials } from '@/hooks/useApi';

export default function TestimonialsPage() {
  const { testimonials, loading, error } = useTestimonials();

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Depoimentos de Clientes</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Veja o que nossos clientes têm a dizer sobre a qualidade de nossas locuções e atendimento.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">Erro ao carregar depoimentos. Por favor, tente novamente mais tarde.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
                  <div className="p-6 flex-grow">
                    <div className="flex items-center mb-4">
                      {testimonial.image ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <Image 
                            src={testimonial.image} 
                            alt={testimonial.client_name} 
                            width={48} 
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                          <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold">{testimonial.client_name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.company}</p>
                      </div>
                    </div>
                    
                    <blockquote className="italic text-gray-700 border-l-4 border-blue-500 pl-4">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </div>
              ))}
              
              {testimonials.length === 0 && !loading && !error && (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
                  <p>Nenhum depoimento encontrado.</p>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-16 max-w-2xl mx-auto text-center bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Compartilhe Sua Experiência</h2>
            <p className="text-gray-600 mb-6">
              Sua opinião é muito importante para nós. Se você já utilizou nossos serviços,
              ficaríamos muito felizes em ouvir sobre sua experiência.
            </p>
            <a 
              href="#contato" 
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Enviar um Depoimento
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
