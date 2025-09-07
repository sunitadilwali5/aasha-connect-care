/*
  # Create caregivers table for loved one setup

  1. New Tables
    - `caregivers`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `phone` (text)
      - `email` (text)
      - `relationship` (text)
      - `loved_one_profile_id` (uuid, foreign key to profiles)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `caregivers` table
    - Add policy for public access (for testing)
*/

CREATE TABLE IF NOT EXISTS caregivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  relationship text NOT NULL,
  loved_one_profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE caregivers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations for caregivers"
  ON caregivers
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE TRIGGER update_caregivers_updated_at
  BEFORE UPDATE ON caregivers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();