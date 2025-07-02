'use client';

import { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service_type: string;
  message: string;
  script_file?: File | null;
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service_type: '',
    message: '',
    script_file: null
  });

  const serviceTypes = [
    { id: '1', name: 'URA Receptiva' },
    { id: '2', name: 'URA Ativa' },
    { id: '3', name: 'Espera Telefônica' },
    { id: '4', name: 'Locução para Vídeo' },
    { id: '5', name: 'Voz IA' },
    { id: '6', name: 'Edição de Áudio' },
    { id: '7', name: 'Outro' },
  ];
  
  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      value: "contato@voicetel.com.br",
      link: "mailto:contato@voicetel.com.br"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        </svg>
      ),
      title: "WhatsApp",
      value: "(11) 99999-9999",
      link: "https://wa.me/5511999999999"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Telefone",
      value: "(11) 3333-4444",
      link: "tel:+551133334444"
    }
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData(prev => ({
      ...prev,
      script_file: file
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (key === 'script_file' && value instanceof File) {
            formDataToSend.append(key, value);
          } else if (typeof value === 'string') {
            formDataToSend.append(key, value);
          }
        }
      });

      // Correção: URL da API ajustada para o endpoint correto e usando variável de ambiente.
      // Remove barra final para evitar duplicação de segmentos
      const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/+$/, '');
      // Construção do endpoint de contato
      const endpoint = `${apiBase}/api/contact/`;

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service_type: '',
          message: '',
          script_file: null
        });
      } else {
        // Melhoria: Captura e formata o erro vindo do backend.
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorData = await response.json();
          const errorMessage = Object.entries(errorData)
            .map(([field, errors]) => `${field}: ${(errors as string[]).join(', ')}`)
            .join('\n');
          throw new Error(errorMessage || 'Ocorreu um erro ao validar os dados.');
        } else {
          const errorText = await response.text();
          throw new Error(`O servidor retornou uma resposta inesperada: ${errorText}`);
        }
      }
    } catch (error) {
      // Melhoria: Exibe a mensagem de erro específica.
      if (error instanceof Error) {
        setSubmitError(`Falha no envio: ${error.message}. Verifique os campos e tente novamente.`);
      } else {
        setSubmitError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="section-padding bg-gradient-to-b from-black to-neutral-900">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/30 rounded-full text-sm font-medium text-purple-300 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
            Entre em Contato
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Vamos transformar sua
            <span className="text-gradient-primary block mt-2">comunicação</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Solicite seu orçamento gratuito e descubra como podemos elevar 
            o padrão da sua comunicação telefônica.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Fale conosco
              </h3>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Nossa equipe está pronta para atender você. Entre em contato através 
                dos canais abaixo ou preencha o formulário para receber um orçamento personalizado.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target={method.link.startsWith('http') ? '_blank' : '_self'}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="flex items-center p-4 glass rounded-xl hover:bg-slate-800/30 transition-all group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-lg flex items-center justify-center text-purple-400 group-hover:text-purple-300 transition-colors mr-4">
                    {method.icon}
                  </div>
                  <div>
                    <div className="font-medium text-white">{method.title}</div>
                    <div className="text-slate-400">{method.value}</div>
                  </div>
                  <svg className="w-5 h-5 text-slate-600 ml-auto group-hover:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>

            {/* Features */}
            <div className="glass p-6 rounded-xl">
              <h4 className="font-bold text-white mb-4">Por que escolher a VoiceTel?</h4>
              <div className="space-y-3">
                {[
                  "Orçamento gratuito e sem compromisso",
                  "Entrega em até 24 horas",
                  "Revisões ilimitadas",
                  "Suporte técnico especializado"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center text-slate-300">
                    <svg className="w-4 h-4 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass p-8 rounded-2xl">
            {submitSuccess ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Mensagem enviada!</h3>
                <p className="text-slate-300 mb-6">
                  Recebemos sua solicitação e entraremos em contato em breve.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="btn-primary"
                >
                  Enviar Nova Mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-400 transition-all"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-400 transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-400 transition-all"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-400 transition-all"
                      placeholder="Nome da empresa"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service_type" className="block text-sm font-medium text-slate-300 mb-2">
                    Tipo de serviço *
                  </label>
                  <select
                    id="service_type"
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all"
                  >
                    <option value="">Selecione um serviço</option>
                    {serviceTypes.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-400 transition-all resize-none"
                    placeholder="Descreva seu projeto e suas necessidades..."
                  />
                </div>

                <div>
                  <label htmlFor="script_file" className="block text-sm font-medium text-slate-300 mb-2">
                    Anexar roteiro (opcional)
                  </label>
                  <input
                    type="file"
                    id="script_file"
                    name="script_file"
                    onChange={handleFileChange}
                    accept=".txt,.doc,.docx,.pdf"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500 file:text-white file:cursor-pointer hover:file:bg-purple-600 transition-all"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    Formatos aceitos: .txt, .doc, .docx, .pdf (máx. 10MB)
                  </p>
                </div>

                {submitError && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    'Solicitar Orçamento Gratuito'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
