import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock data - replace with actual database calls later
  const status = [
    { status: "Applied", count: 1, value: 100 },
    { status: "Interview", count: 0, value: 0 },
    { status: "Offer", count: 0, value: 0 },
    { status: "Rejected", count: 0, value: 0 },
  ];

  return NextResponse.json({ status });
}
