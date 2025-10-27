import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database initialization - creates tables if they don't exist
export const initializeDatabase = async () => {
  try {
    // Create users table
    const { error: usersError } = await supabase.rpc('create_users_table');
    if (usersError && !usersError.message.includes('already exists')) {
      console.error('Error creating users table:', usersError);
    }

    // Create jobs table
    const { error: jobsError } = await supabase.rpc('create_jobs_table');
    if (jobsError && !jobsError.message.includes('already exists')) {
      console.error('Error creating jobs table:', jobsError);
    }
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};