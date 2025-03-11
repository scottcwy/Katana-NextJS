import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export function handleApiError(error: Error) {
  console.error('API Error:', error);
  
  return NextResponse.json(
    { error: 'Internal Server Error' },
    { status: 500 }
  );
}
