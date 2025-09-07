/*
  # Update tables for caregiver-loved one relationship

  1. Changes to profiles table
    - Add caregiver_id column to link to caregivers table
    - Add email column for loved ones
    - Add preferred_language column for loved ones

  2. Changes to caregivers table  
    - Add loved_one_id column to link to profiles table
    - Remove loved_one_profile_id column (replaced by loved_one_id)

  3. Relationships
    - One caregiver can have many loved ones (one-to-many)
    - Each loved one profile can have one caregiver
*/

-- Add new columns to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS caregiver_id uuid REFERENCES caregivers(id) ON DELETE SET NULL;

-- Add new columns to caregivers table
ALTER TABLE caregivers 
ADD COLUMN IF NOT EXISTS loved_one_id uuid REFERENCES profiles(id) ON DELETE CASCADE;

-- Drop the old column if it exists
ALTER TABLE caregivers 
DROP COLUMN IF EXISTS loved_one_profile_id;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_caregiver_id ON profiles(caregiver_id);
CREATE INDEX IF NOT EXISTS idx_caregivers_loved_one_id ON caregivers(loved_one_id);