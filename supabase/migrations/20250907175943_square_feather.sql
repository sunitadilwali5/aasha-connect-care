/*
  # Update profiles table schema

  1. Changes
    - Ensure birth_date and preferred_language columns exist and can accept data
    - Update RLS policies to allow profile creation and updates
    - Add indexes for better performance

  2. Security
    - Maintain permissive RLS policies for testing
*/

-- Ensure the profiles table has the correct structure
ALTER TABLE profiles 
  ALTER COLUMN birth_date TYPE date,
  ALTER COLUMN preferred_language TYPE text;

-- Update RLS policies to be more permissive for testing
DROP POLICY IF EXISTS "Allow all operations for profiles" ON profiles;

CREATE POLICY "Allow all operations for profiles"
  ON profiles
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON profiles(phone);
CREATE INDEX IF NOT EXISTS idx_profiles_preferred_language ON profiles(preferred_language);

-- Ensure phone_verifications table exists with proper structure
CREATE TABLE IF NOT EXISTS phone_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  phone text NOT NULL,
  otp_code text,
  verified boolean DEFAULT false,
  verification_attempts integer DEFAULT 0,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on phone_verifications
ALTER TABLE phone_verifications ENABLE ROW LEVEL SECURITY;

-- Create permissive policy for phone_verifications
CREATE POLICY "Allow all operations for phone_verifications"
  ON phone_verifications
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Add indexes for phone_verifications
CREATE INDEX IF NOT EXISTS idx_phone_verifications_phone ON phone_verifications(phone);
CREATE INDEX IF NOT EXISTS idx_phone_verifications_profile_id ON phone_verifications(profile_id);