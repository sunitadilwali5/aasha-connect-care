/*
  # Update RLS policies for profiles table

  1. Security
    - Drop existing restrictive policies
    - Add policy for authenticated users to insert their own profiles
    - Add policy for authenticated users to read their own profiles
    - Add policy for authenticated users to update their own profiles
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can create their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

-- Create new policies that allow authenticated users to manage their own profiles
CREATE POLICY "Enable insert for authenticated users own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable select for authenticated users own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Enable update for authenticated users own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);