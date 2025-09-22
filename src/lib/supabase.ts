import { supabase } from '@/integrations/supabase/client';

// Type definitions for our tables
export type Profile = {
  id: string;
  user_id: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  birth_date: string | null;
  preferred_language: string | null;
  setup_for: string | null;
  caregiver_id: string | null;
  created_at: string;
  updated_at: string;
};

export type PhoneVerification = {
  id: string;
  profile_id: string | null;
  caregiver_id: string | null;
  phone: string;
  otp_code: string | null;
  verified: boolean | null;
  expires_at: string | null;
  verification_attempts: number | null;
  created_at: string;
  updated_at: string;
};

export type Caregiver = {
  id: string;
  loved_one_id: string | null;
  full_name: string;
  relationship: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
};

// Simple profile creation that works without authentication
export const createProfile = async (profileData: Partial<Profile>) => {
  console.log('Creating profile with data:', profileData);
  
  // Validate required fields
  if (!profileData.full_name || !profileData.email) {
    throw new Error('Full name and email are required');
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .insert(profileData)
    .select()
    .single();

  if (error) {
    console.error('Error creating profile:', error);
    console.error('Profile data that failed:', profileData);
    throw error;
  }

  console.log('Profile created successfully:', data);
  return data;
};

export const updateProfile = async (id: string, updates: Partial<Profile>) => {
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
export const createCaregiver = async (caregiverData: Partial<Caregiver>) => {
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
export const createPhoneVerification = async (verificationData: Partial<PhoneVerification>) => {
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

export const updatePhoneVerification = async (id: string, updates: Partial<PhoneVerification>) => {
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
export const createPayment = async (paymentData: any) => {
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
    console.log('Testing database connection...');
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Database connection test failed:', error);
      console.error('Error details:', error.message, error.details, error.hint);
      return false;
    }
    
    console.log('Database connection test successful');
    return true;
  } catch (error) {
    console.error('Database connection test error:', error);
    return false;
  }
};