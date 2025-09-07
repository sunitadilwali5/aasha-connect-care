/*
  # Add caregiver connection to phone verifications

  1. Changes
    - Add caregiver_id column to phone_verifications table
    - Add foreign key constraint to link with caregivers table
    - Add index for better performance
    - Make profile_id nullable since caregivers can also have phone verifications

  2. Security
    - Maintains existing RLS policies
    - Proper foreign key constraints with cascade options
*/

-- Add caregiver_id column to phone_verifications table
ALTER TABLE phone_verifications 
ADD COLUMN caregiver_id uuid REFERENCES caregivers(id) ON DELETE CASCADE;

-- Make profile_id nullable since caregivers can also have phone verifications
ALTER TABLE phone_verifications 
ALTER COLUMN profile_id DROP NOT NULL;

-- Add index for better performance
CREATE INDEX idx_phone_verifications_caregiver_id ON phone_verifications(caregiver_id);

-- Add constraint to ensure either profile_id or caregiver_id is set (but not both)
ALTER TABLE phone_verifications 
ADD CONSTRAINT check_profile_or_caregiver 
CHECK (
  (profile_id IS NOT NULL AND caregiver_id IS NULL) OR 
  (profile_id IS NULL AND caregiver_id IS NOT NULL)
);