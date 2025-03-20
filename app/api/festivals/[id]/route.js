import { connectToDatabase } from '@/lib/mongodb';
import Festival from '@/lib/models/Festival';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid festival ID' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    const festival = await Festival.findById(id);
    
    if (!festival) {
      return NextResponse.json(
        { error: 'Festival not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(festival);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch festival' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid festival ID' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    const updatedFestival = await Festival.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!updatedFestival) {
      return NextResponse.json(
        { error: 'Festival not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedFestival);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update festival' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid festival ID' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    const deletedFestival = await Festival.findByIdAndDelete(id);
    
    if (!deletedFestival) {
      return NextResponse.json(
        { error: 'Festival not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Festival deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete festival' },
      { status: 500 }
    );
  }
}

export async function HEAD(request) {
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