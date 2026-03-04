import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const moments = await prisma.moment.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return NextResponse.json(moments);
  } catch (error) {
    console.error('Error fetching moments:', error);
    return NextResponse.json({ error: 'Failed to fetch moments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content } = body;

    const moment = await prisma.moment.create({
      data: { content },
    });

    return NextResponse.json(moment, { status: 201 });
  } catch (error) {
    console.error('Error creating moment:', error);
    return NextResponse.json({ error: 'Failed to create moment' }, { status: 500 });
  }
}
