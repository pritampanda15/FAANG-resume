-- Job Tracker Database Schema for Supabase

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  salary VARCHAR(100),
  location VARCHAR(255),
  job_type VARCHAR(50) DEFAULT 'Full-time',
  status VARCHAR(50) DEFAULT 'Not Applied',
  application_date DATE,
  follow_up_date DATE,
  job_description TEXT,
  responsibilities TEXT,
  qualifications TEXT,
  skills TEXT,
  ats_score VARCHAR(10),
  resume_version VARCHAR(255),
  job_url TEXT,
  recruiter_name VARCHAR(255),
  recruiter_email VARCHAR(255),
  recruiter_linkedin TEXT,
  notes TEXT,
  interview_dates TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_jobs_user_id ON jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_company ON jobs(company);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Disable Row Level Security (RLS) since we're using custom JWT authentication at API level
-- The API routes handle authentication and authorization
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE jobs DISABLE ROW LEVEL SECURITY;

-- Note: If you want to use RLS with custom JWT authentication, you would need to:
-- 1. Set up a custom JWT claim in Supabase
-- 2. Create a function to extract user_id from the JWT
-- 3. Use that function in the RLS policies
-- For this app, security is handled at the API route level which is sufficient.