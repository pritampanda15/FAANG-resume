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

export async function PUT(request, { params }) {
  const user = getUserFromToken(request);

  if (!user) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const { id } = params;
    const updateData = await request.json();

    // Convert camelCase to snake_case for database
    const dbUpdateData = toSnakeCase(updateData);

    const { data: job, error } = await supabase
      .from('jobs')
      .update({ ...dbUpdateData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('user_id', user.userId)
      .select()
      .single();

    if (error || !job) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Job not found', details: error?.message },
        { status: 404 }
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

export async function DELETE(request, { params }) {
  const user = getUserFromToken(request);

  if (!user) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const { id } = params;

    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id)
      .eq('user_id', user.userId);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Job not found', details: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    );
  }
}