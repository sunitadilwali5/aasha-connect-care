/*
  # Update caregivers table and payments connection

  1. Changes to caregivers table
    - Add email column for caregiver's email
    - Add phone column for caregiver's phone
    - Keep relationship and loved_one_id columns
    
  2. Changes to payments table
    - Add caregiver_id column to link payments to caregivers
    - Make profile_id nullable since caregivers can also make payments
    
  3. Security
    - Update RLS policies for new structure
*/

-- Add email and phone columns to caregivers table if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'caregivers' AND column_name = 'email'
  ) THEN
    ALTER TABLE caregivers ADD COLUMN email text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'caregivers' AND column_name = 'phone'
  ) THEN
    ALTER TABLE caregivers ADD COLUMN phone text;
  END IF;
END $$;

-- Add caregiver_id to payments table and make profile_id nullable
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'payments' AND column_name = 'caregiver_id'
  ) THEN
    ALTER TABLE payments ADD COLUMN caregiver_id uuid REFERENCES caregivers(id) ON DELETE CASCADE;
  END IF;
  
  -- Make profile_id nullable
  ALTER TABLE payments ALTER COLUMN profile_id DROP NOT NULL;
END $$;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_payments_caregiver_id ON payments(caregiver_id);

-- Update RLS policies for payments to include caregivers
DROP POLICY IF EXISTS "Allow all operations for payments" ON payments;
CREATE POLICY "Allow all operations for payments"
  ON payments
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);