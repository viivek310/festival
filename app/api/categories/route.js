import { connectToDatabase } from '@/lib/mongodb';
import Festival from '@/lib/models/Festival';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();
    // Get all unique tags from the database
    const uniqueTags = await Festival.distinct('tags');
    
    return NextResponse.json(uniqueTags);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}