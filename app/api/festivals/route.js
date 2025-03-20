import { connectToDatabase } from '@/lib/mongodb';
import Festival from '@/lib/models/Festival';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = {};

        // Parse filter parameters
        const searchTerm = searchParams.get('search');
        const tag = searchParams.get('tag');
        const date = searchParams.get('date');

        if (searchTerm) {
            query.$or = [
                { name: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } }
            ];
        }

        if (tag) {
            query.tags = tag;
        }

        if (date) {
            const searchDate = new Date(date);
            searchDate.setUTCHours(0, 0, 0, 0);
            query.$and = [
                { startDate: { $lte: new Date(date) } },
                { endDate: { $gte: new Date(date) } }
            ];
        }

        await connectToDatabase();
        const festivals = await Festival.find(query).sort({ startDate: 1 });
        console.log(festivals)

        return NextResponse.json(festivals);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch festivals' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        await connectToDatabase();

        const festival = await Festival.create(body);
        return NextResponse.json(festival, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create festival' },
            { status: 500 }
        );
    }
}
