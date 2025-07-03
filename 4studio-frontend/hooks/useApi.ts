'use client';

import { useState, useEffect } from 'react';
import { apiClient, AudioSample, VoiceCategory, VoiceType, Testimonial } from '@/lib/api/client';

// Hook for audio samples
export function useAudioSamples() {
  const [audioSamples, setAudioSamples] = useState<AudioSample[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAudioSamples = async () => {
      try {
        setLoading(true);
        const samples = await apiClient.getAudioSamples();
        setAudioSamples(samples);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred while fetching audio samples'));
      } finally {
        setLoading(false);
      }
    };

    fetchAudioSamples();
  }, []);

  return { audioSamples, loading, error };
}

// Hook for featured audio samples
export function useFeaturedAudioSamples() {
  const [featuredSamples, setFeaturedSamples] = useState<AudioSample[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFeaturedSamples = async () => {
      try {
        setLoading(true);
        const samples = await apiClient.getFeaturedAudioSamples();
        setFeaturedSamples(samples);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred while fetching featured audio samples'));
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedSamples();
  }, []);

  return { featuredSamples, loading, error };
}

// Hook for audio samples by category
export function useAudioSamplesByCategory(categorySlug: string) {
  const [categorySamples, setCategorySamples] = useState<AudioSample[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategorySamples = async () => {
      try {
        setLoading(true);
        const samples = await apiClient.getAudioSamplesByCategory(categorySlug);
        setCategorySamples(samples);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(`An error occurred while fetching audio samples for category ${categorySlug}`));
      } finally {
        setLoading(false);
      }
    };

    if (categorySlug) {
      fetchCategorySamples();
    }
  }, [categorySlug]);

  return { categorySamples, loading, error };
}

// Hook for voice categories
export function useVoiceCategories() {
  const [categories, setCategories] = useState<VoiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        console.log('Starting categories fetch...');
        try {
          const cats = await apiClient.getVoiceCategories();
          console.log('Categories fetched successfully', cats);
          
          // Garantir que temos um array válido
          setCategories(Array.isArray(cats) ? cats : []);
          setError(null);
        } catch (apiError) {
          console.error('Error in API call:', apiError);
          // Não definir o erro aqui - vamos usar o fallback silenciosamente
          setCategories([]);
          setError(apiError instanceof Error ? apiError : new Error('An error occurred while fetching voice categories'));
        }
      } catch (err) {
        console.error('Unexpected error in useVoiceCategories hook:', err);
        setCategories([]);
        setError(err instanceof Error ? err : new Error('An unexpected error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

// Hook for voice types
export function useVoiceTypes() {
  const [voiceTypes, setVoiceTypes] = useState<VoiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchVoiceTypes = async () => {
      try {
        setLoading(true);
        const types = await apiClient.getVoiceTypes();
        // Make sure types is an array before setting it
        if (Array.isArray(types)) {
          setVoiceTypes(types);
        } else {
          console.error('API returned non-array for voice types:', types);
          setVoiceTypes([]);
          setError(new Error('Received invalid data format for voice types'));
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching voice types:', err);
        setError(err instanceof Error ? err : new Error('An error occurred while fetching voice types'));
        setVoiceTypes([]); // Ensure we always have an array
      } finally {
        setLoading(false);
      }
    };

    fetchVoiceTypes();
  }, []);

  return { voiceTypes, loading, error };
}

// Hook for testimonials
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const testies = await apiClient.getTestimonials();
        setTestimonials(testies);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred while fetching testimonials'));
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
}
