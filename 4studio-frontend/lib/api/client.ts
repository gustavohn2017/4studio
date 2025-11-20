'use client';

import api from './axios';

// Types
export interface AudioSample {
  id: number;
  title: string;
  description: string;
  audio_file: string;
  category: number;
  category_name: string;
  voice_type: number;
  voice_type_name: string;
  voice_gender: string;
  duration: string;
  featured: boolean;
}

export interface VoiceCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface VoiceType {
  id: number;
  name: string;
  gender: 'male' | 'female' | 'ai';
  is_ai: boolean;
}

export interface Testimonial {
  id: number;
  client_name: string;
  company: string;
  quote: string;
  image: string | null;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  service_type?: string;
  script_file?: File | null;
}

// API Client
class ApiClient {
  private async handleRequest<T>(request: Promise<any>): Promise<T> {
    try {
      const response = await request;
      const data = response.data;
      // Lida com respostas paginadas do Django REST Framework
      if (data && data.results && Array.isArray(data.results)) {
        return data.results as T;
      }
      return data as T;
    } catch (error: any) {
      console.error('API Client Error:', error);
      const errorMessage =
        error.response?.data?.detail ||
        error.message ||
        'Ocorreu um erro desconhecido na comunicação com a API.';
      throw new Error(errorMessage);
    }
  }

  // Audio Samples
  async getAudioSamples(): Promise<AudioSample[]> {
    return this.handleRequest<AudioSample[]>(api.get('/audio-samples/'));
  }

  async getFeaturedAudioSamples(): Promise<AudioSample[]> {
    return this.handleRequest<AudioSample[]>(api.get('/audio-samples/featured/'));
  }

  async getAudioSamplesByCategory(categorySlug: string): Promise<AudioSample[]> {
    return this.handleRequest<AudioSample[]>(
      api.get(`/audio-samples/`, { params: { category: categorySlug } })
    );
  }

  async getVoiceCategories(): Promise<VoiceCategory[]> {
    return this.handleRequest<VoiceCategory[]>(api.get('/categories/'));
  }

  async getVoiceTypes(): Promise<VoiceType[]> {
    return this.handleRequest<VoiceType[]>(api.get('/voice-types/'));
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return this.handleRequest<Testimonial[]>(api.get('/testimonials/'));
  }

  // Contact Form
  async submitContactForm(formData: FormData): Promise<any> {
    try {
      const response = await api.post('/contact-requests/', formData);
      return response.data;
    } catch (error: any) {
      console.error('Error submitting contact form:', error);
      const errorMessage =
        error.response?.data?.detail || 'Falha ao enviar o formulário de contato.';
      throw new Error(errorMessage);
    }
  }
}

export const apiClient = new ApiClient();
