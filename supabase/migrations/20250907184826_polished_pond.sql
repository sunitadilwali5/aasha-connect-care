/*
  # Drop loved_ones table

  1. Changes
    - Drop the loved_ones table as it's no longer needed
    - All loved one information is now stored in the profiles table
    - Caregivers table handles the relationship between caregiver and loved one profiles

  2. Notes
    - This will remove the loved_ones table and all its data
    - The profiles table now stores all user information (both caregivers and loved ones)
    - The caregivers table links caregivers to their loved ones via profile IDs
*/

-- Drop the loved_ones table
DROP TABLE IF EXISTS loved_ones CASCADE;