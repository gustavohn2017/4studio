'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  User, 
  Building,
  MessageCircle
} from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
        });
      }, 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefone',
      value: '+55 (11) 99999-9999',
      href: 'tel:+5511999999999',
      description: 'Segunda a sexta, 9h às 18h'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'contato@4studio.com.br',
      href: 'mailto:contato@4studio.com.br',
      description: 'Resposta em até 2 horas'
    },
    {
      icon: MapPin,
      title: 'Localização',
      value: 'São Paulo, SP',
      href: '#',
      description: 'Atendimento presencial agendado'
    }
  ];

  const services = [
    'Locução Comercial',
    'URA e Telemarketing',
    'Audiobook',
    'Podcast',
    'Institucional',
    'E-learning',
    'Outro'
  ];

  return (
    <section id='contact' className='py-16 md:py-24 lg:py-32 bg-slate-900/50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <div className='inline-flex items-center space-x-2 bg-pink-500/10 text-pink-400 rounded-full px-6 py-3 mb-8 border border-pink-500/20'>
            <Send className='w-5 h-5' />
            <span className='text-sm font-semibold'>Entre em Contato</span>
          </div>
          
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white'>
            Pronto para{' '}
            <span className='bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 bg-clip-text text-transparent'>
              Transformar
            </span>
            <br />
            sua Comunicação?
          </h2>
          
          <p className='text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed'>
            Solicite um orçamento personalizado e descubra como nossas locuções profissionais 
            podem elevar a comunicação da sua empresa ao próximo nível.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
          <div className='space-y-8'>
            <div className='bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-pink-500/30 transition-all duration-500'>
              <h3 className='text-2xl md:text-3xl font-bold text-white mb-8'>
                Vamos Conversar
              </h3>
              
              <div className='space-y-6'>
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className='flex items-start space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/30 hover:bg-white/10 transition-all duration-300 group'
                  >
                    <div className='flex-shrink-0 w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                      <item.icon className='w-6 h-6 text-white' />
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-semibold text-white mb-1'>{item.title}</h4>
                      <p className='text-pink-400 font-medium mb-1'>{item.value}</p>
                      <p className='text-sm text-gray-400'>{item.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className='bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-pink-500/30 transition-all duration-500'>
              <h3 className='text-2xl md:text-3xl font-bold text-white mb-8'>
                Solicite seu Orçamento
              </h3>
              
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-300'>
                      Nome Completo *
                    </label>
                    <div className='relative'>
                      <User className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                      <input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className='w-full pl-11 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300'
                        placeholder='Seu nome completo'
                      />
                    </div>
                  </div>
                  
                  <div className='space-y-2'>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-300'>
                      Email *
                    </label>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className='w-full pl-11 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300'
                        placeholder='seu@email.com'
                      />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <label htmlFor='phone' className='block text-sm font-medium text-gray-300'>
                      Telefone
                    </label>
                    <div className='relative'>
                      <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                      <input
                        type='tel'
                        id='phone'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        className='w-full pl-11 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300'
                        placeholder='(11) 99999-9999'
                      />
                    </div>
                  </div>
                  
                  <div className='space-y-2'>
                    <label htmlFor='company' className='block text-sm font-medium text-gray-300'>
                      Empresa
                    </label>
                    <div className='relative'>
                      <Building className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                      <input
                        type='text'
                        id='company'
                        name='company'
                        value={formData.company}
                        onChange={handleChange}
                        className='w-full pl-11 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300'
                        placeholder='Nome da sua empresa'
                      />
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <label htmlFor='service' className='block text-sm font-medium text-gray-300'>
                    Tipo de Serviço *
                  </label>
                  <select
                    id='service'
                    name='service'
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300'
                  >
                    <option value='' className='bg-slate-800'>Selecione o tipo de serviço</option>
                    {services.map((service, index) => (
                      <option key={index} value={service} className='bg-slate-800'>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='space-y-2'>
                  <label htmlFor='message' className='block text-sm font-medium text-gray-300'>
                    Mensagem *
                  </label>
                  <div className='relative'>
                    <MessageCircle className='absolute left-3 top-3 w-5 h-5 text-gray-400' />
                    <textarea
                      id='message'
                      name='message'
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className='w-full pl-11 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 resize-none'
                      placeholder='Conte-nos sobre seu projeto...'
                    />
                  </div>
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting || isSubmitted}
                  className='w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2'
                >
                  {isSubmitting ? (
                    <>
                      <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                      <span>Enviando...</span>
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className='w-5 h-5' />
                    </>
                  ) : (
                    <>
                      <Send className='w-5 h-5' />
                      <span>Enviar Mensagem</span>
                    </>
                  )}
                </button>

                <p className='text-sm text-gray-400 text-center'>
                  Responderemos em até 2 horas úteis. Seus dados estão seguros conosco.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
