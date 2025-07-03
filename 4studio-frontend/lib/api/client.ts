'use client';

// Base API URL
// Determine if we're running on GitHub Pages
const isGithubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');

// Function to dynamically determine API URL
function getApiBaseUrl() {
  // Use environment variable if available
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // If on GitHub Pages, we might need to use a production API
  if (isGithubPages) {
    // Replace with your actual production API endpoint when available
    return 'https://api.4studio.example.com/api';
  }
  
  // Default to local development
  return 'http://localhost:8000/api';
}

const API_BASE_URL = getApiBaseUrl();

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
  // Audio Samples
  async getAudioSamples(): Promise<AudioSample[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/audio-samples/`);
      if (!response.ok) throw new Error('Failed to fetch audio samples');
      return await response.json();
    } catch (error) {
      console.error('Error fetching audio samples:', error);
      return [];
    }
  }

  async getFeaturedAudioSamples(): Promise<AudioSample[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/audio-samples/featured/`);
      if (!response.ok) throw new Error('Failed to fetch featured audio samples');
      return await response.json();
    } catch (error) {
      console.error('Error fetching featured audio samples:', error);
      return [];
    }
  }
  async getAudioSamplesByCategory(categorySlug: string): Promise<AudioSample[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/audio-samples/?category=${categorySlug}`);
      if (!response.ok) throw new Error(`Failed to fetch audio samples for category ${categorySlug}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching audio samples for category ${categorySlug}:`, error);
      return [];
    }
  }  // Voice Categories
  async getVoiceCategories(): Promise<VoiceCategory[]> {
    try {
      console.log('Fetching categories from:', `${API_BASE_URL}/categories/`);
      const response = await fetch(`${API_BASE_URL}/categories/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // Remove credentials: 'include' since it's not needed for unauthenticated requests
      });
      
      if (!response.ok) {
        console.error('Categories response not OK:', response.status, response.statusText);
        throw new Error(`Failed to fetch voice categories: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Categories data received:', data);
      
      // Check if data is in expected format
      if (data && data.results && Array.isArray(data.results)) {
        return data.results;
      } else if (Array.isArray(data)) {
        return data;
      } else {
        console.warn('Categories response format is unexpected:', data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching voice categories:', error);
      throw new Error('Failed to fetch voice categories');
    }
  }  // Voice Types
  async getVoiceTypes(): Promise<VoiceType[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/voice-types/`);
      if (!response.ok) throw new Error('Failed to fetch voice types');
      const data = await response.json();
      
      // Ensure we're returning an array
      if (Array.isArray(data)) {
        return data;
      } else if (data && data.results && Array.isArray(data.results)) {
        // If API returns paginated results
        return data.results;
      } else {
        console.error('Unexpected API response format for voice types:', data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching voice types:', error);
      return [];
    }
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/testimonials/`);
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      return await response.json();
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  }

  // Contact Form
  async submitContactForm(formData: FormData): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to submit contact form');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();
