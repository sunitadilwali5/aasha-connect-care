import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

export type Profile = Tables<'profiles'>;
export type PhoneVerification = Tables<'phone_verifications'>;
export type Caregiver = Tables<'caregivers'>;

// Simple profile creation that works without authentication
export const createProfile = async (profileData: Omit<TablesInsert<'profiles'>, 'user_id'> & { user_id?: string | null }) => {
  console.log('Creating profile with data:', profileData);
  
  const { data, error } = await supabase
    .from('profiles')
    .insert(profileData)
    .select()
    .single();

  if (error) {
    console.error('Error creating profile:', error);
    throw error;
  }

  console.log('Profile created successfully:', data);
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

// Caregiver operations
export const createCaregiver = async (caregiverData: TablesInsert<'caregivers'>) => {
  console.log('Creating caregiver with data:', caregiverData);
  
  const { data, error } = await supabase
    .from('caregivers')
    .insert(caregiverData)
    .select()
    .single();

  if (error) {
    console.error('Error creating caregiver:', error);
    throw error;
  }

  console.log('Caregiver created successfully:', data);
  return data;
};

// Phone verification operations
export const createPhoneVerification = async (verificationData: TablesInsert<'phone_verifications'>) => {
  console.log('Creating phone verification with data:', verificationData);
  
  const { data, error } = await supabase
    .from('phone_verifications')
    .insert(verificationData)
    .select()
    .single();

  if (error) {
    console.error('Error creating phone verification:', error);
    throw error;
  }

  console.log('Phone verification created successfully:', data);
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

// Payment operations
export const createPayment = async (paymentData: TablesInsert<'payments'>) => {
  console.log('Creating payment with data:', paymentData);
  
  const { data, error } = await supabase
    .from('payments')
    .insert(paymentData)
    .select()
    .single();

  if (error) {
    console.error('Error creating payment:', error);
    throw error;
  }

  console.log('Payment created successfully:', data);
  return data;
};

// Auth operations - simplified for testing
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
    return null;
  }

  return user;
};

// Test database connection
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
    
    console.log('Database connection test successful');
    return true;
  } catch (error) {
    console.error('Database connection test error:', error);
    return false;
  }
};