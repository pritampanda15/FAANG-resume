# Supabase Database Setup Guide

## 1. Create a Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - `Project URL` (for NEXT_PUBLIC_SUPABASE_URL)
   - `anon public` key (for NEXT_PUBLIC_SUPABASE_ANON_KEY)

## 3. Set Up Database Tables

1. In your Supabase dashboard, go to the **SQL Editor**
2. Copy and paste the contents of `lib/database-setup.sql`
3. Click **Run** to create the tables and security policies

## 4. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
JWT_SECRET=a-secure-random-string-for-jwt
```

## 5. Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Add the same environment variables in Vercel dashboard:
   - Go to your project settings → Environment Variables
   - Add each variable from your `.env.local` file

## 6. Database Schema Overview

### Users Table
- `id` (UUID, Primary Key)
- `email` (Unique)
- `name`
- `password_hash`
- `created_at`, `updated_at`

### Jobs Table
- `id` (UUID, Primary Key)
- `user_id` (Foreign Key to users)
- All job application fields (company, position, status, etc.)
- `created_at`, `updated_at`

## 7. Security Features

- **Row Level Security (RLS)** enabled
- Users can only access their own data
- Secure authentication with JWT tokens
- Password hashing with bcrypt

## 8. Testing

Once setup is complete:
1. Start your development server: `npm run dev`
2. Try signing up with a new account
3. Add some job applications
4. Verify data persists in Supabase dashboard

Your job tracker is now ready for production deployment with persistent database storage! 🎉