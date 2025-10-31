import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabase } from '@/lib/supabase';

function getUserFromToken(request) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) return null;
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function GET(request) {
  const user = getUserFromToken(request);

  if (!user) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const { data: jobs, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('user_id', user.userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch jobs', details: error.message },
        { status: 500 }
      );
    }

    // Convert all jobs from snake_case to camelCase
    const camelCaseJobs = (jobs || []).map(job => toCamelCase(job));

    return NextResponse.json({ jobs: camelCaseJobs });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    );
  }
}

// Convert camelCase to snake_case for database
function toSnakeCase(obj) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    result[snakeKey] = value;
  }
  return result;
}

// Convert snake_case to camelCase for frontend
function toCamelCase(obj) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    result[camelKey] = value;
  }
  return result;
}

export async function POST(request) {
  const user = getUserFromToken(request);

  if (!user) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const jobData = await request.json();

    // Convert camelCase to snake_case for database
    const dbJobData = toSnakeCase(jobData);

    const { data: job, error } = await supabase
      .from('jobs')
      .insert([
        {
          ...dbJobData,
          user_id: user.userId,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create job', details: error.message },
        { status: 500 }
      );
    }

    // Convert back to camelCase for frontend
    return NextResponse.json({ job: toCamelCase(job) });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Invalid job data', details: error.message },
      { status: 400 }
    );
  }
}