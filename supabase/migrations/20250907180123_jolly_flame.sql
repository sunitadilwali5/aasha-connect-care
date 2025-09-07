/*
  # Clear phone_verifications table

  1. Delete all existing records from phone_verifications table
  2. Reset any auto-increment sequences if needed
*/

-- Delete all records from phone_verifications table
DELETE FROM phone_verifications;

-- Optional: Reset any sequences (if using serial/auto-increment)
-- This ensures clean slate for testing
SELECT setval(pg_get_serial_sequence('phone_verifications', 'id'), 1, false);