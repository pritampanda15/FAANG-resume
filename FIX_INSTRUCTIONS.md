# Job Tracker Fix - Setup Instructions

## Issues Fixed

1. **Missing Environment Configuration** - Created `.env.local` template file
2. **Field Name Mismatch** - Added camelCase ↔ snake_case conversion in API routes
3. **Row Level Security (RLS) Conflict** - Updated database policies to work with custom JWT auth

## Setup Steps

### Step 1: Configure Environment Variables

Edit the `.env.local` file and add your actual Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
JWT_SECRET=your_secure_jwt_secret_here
```

To find your Supabase credentials:
1. Go to your Supabase dashboard
2. Navigate to Settings → API
3. Copy the Project URL and anon/public key

### Step 2: Update Database RLS Policies

Run the migration SQL in your Supabase SQL Editor:

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Open and run the file: `lib/migration-fix-rls.sql`

This will disable RLS since authentication is handled at the API level.

### Step 3: Restart the Development Server

```bash
npm run dev
```

### Step 4: Test the Job Tracker

1. Log in to your account
2. Navigate to the "Job Tracker" tab
3. Click "Add Job" button
4. Fill in the form and click "Save Application"
5. Your job should now be saved successfully!

## What Was Changed

### API Routes (`app/api/jobs/route.js` and `app/api/jobs/[id]/route.js`)

- Added `toSnakeCase()` function to convert frontend camelCase to database snake_case
- Added `toCamelCase()` function to convert database snake_case to frontend camelCase
- Added better error logging with console.error statements
- Updated GET, POST, PUT operations to handle field name conversion

### Database Schema (`lib/database-setup.sql`)

- Disabled RLS policies that were conflicting with custom JWT authentication
- Added comments explaining the authentication approach

### Environment Configuration

- Created `.env.local` file with template values

## Troubleshooting

If you still have issues:

1. **Check Browser Console** - Look for error messages
2. **Check Server Logs** - The terminal should show detailed error messages
3. **Verify Supabase Connection** - Make sure your credentials are correct
4. **Check Network Tab** - Look at the API responses for error details

The error messages now include detailed information to help diagnose issues.
