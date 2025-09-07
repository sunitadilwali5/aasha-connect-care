import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

export type Profile = Tables<'profiles'>;
export type LovedOne = Tables<'loved_ones'>;
export type PhoneVerification = Tables<'phone_verifications'>;

// Profile operations
export const createProfile = async (profileData: TablesInsert<'profiles'>) => {
  // Ensure user is authenticated before creating profile
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User must be authenticated to create profile');
  }

  const { data, error } = await supabase
    .from('profiles')
    .insert(profileData)
    .select()
    .single();

  if (error) {
    console.error('Error creating profile:', error);
    throw error;
  }

  return data;
};

export const updateProfile = async (id: string, updates: Partial<TablesInsert<'profiles'>>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating profile:', error);
    throw error;
  }

  return data;
};

export const getProfile = async (id: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }

  return data;
};

// Loved ones operations
export const createLovedOne = async (lovedOneData: TablesInsert<'loved_ones'>) => {
  const { data, error } = await supabase
    .from('loved_ones')
    .insert(lovedOneData)
    .select()
    .single();

  if (error) {
    console.error('Error creating loved one:', error);
    throw error;
  }

  return data;
};

// Phone verification operations
export const createPhoneVerification = async (verificationData: TablesInsert<'phone_verifications'>) => {
  const { data, error } = await supabase
    .from('phone_verifications')
    .insert(verificationData)
    .select()
    .single();

  if (error) {
    console.error('Error creating phone verification:', error);
    throw error;
  }

  return data;
};

export const updatePhoneVerification = async (id: string, updates: Partial<TablesInsert<'phone_verifications'>>) => {
  const { data, error } = await supabase
    .from('phone_verifications')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating phone verification:', error);
    throw error;
  }

  return data;
};

// Auth operations
export const signUpUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Error signing up user:', error);
    throw error;
  }

  return data;
};

export const signInUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error signing in user:', error);
    throw error;
  }

  return data;
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error getting current user:', error);
    throw error;
  }

  return user;
};