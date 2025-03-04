
-- Function to safely increment a counter in the profiles table
CREATE OR REPLACE FUNCTION increment_counter(row_id UUID, counter_name TEXT, increment_amount INT DEFAULT 1)
RETURNS VOID AS $$
DECLARE
  counter_value INT;
BEGIN
  -- Get current value
  EXECUTE format('SELECT %I FROM profiles WHERE id = $1', counter_name)
  INTO counter_value
  USING row_id;
  
  -- If counter is null, set it to the increment amount, otherwise add to it
  IF counter_value IS NULL THEN
    counter_value := increment_amount;
  ELSE
    counter_value := counter_value + increment_amount;
  END IF;
  
  -- Update the counter with the new value
  EXECUTE format('UPDATE profiles SET %I = $1 WHERE id = $2', counter_name)
  USING counter_value, row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
