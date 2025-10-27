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
    
    const { data: job, error } = await supabase
      .from('jobs')
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('user_id', user.userId)
      .select()
      .single();

    if (error || !job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ job });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid job data' },
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
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}