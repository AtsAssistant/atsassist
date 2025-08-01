import { NextResponse } from 'next/server';

interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'application' | 'interview' | 'call_letter' | 'resume';
}

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Mock data - replace with actual database calls later
  const activities: Activity[] = [
    {
      id: '1',
      title: 'Application Submitted',
      description: 'Test Role',
      date: '2025-07-30T10:30:00Z',
      type: 'application'
    },
    {
      id: '2',
      title: 'Interview Scheduled',
      description: 'Test Interview',
      date: '2025-07-29T14:15:00Z',
      type: 'interview'
    },
    {
      id: '3',
      title: 'Call Letter Received',
      description: 'Test Company.',
      date: '2025-07-28T09:45:00Z',
      type: 'call_letter'
    },
    {
      id: '4',
      title: 'Resume Updated',
      description: 'Version 2.0 uploaded',
      date: '2025-07-27T16:20:00Z',
      type: 'resume'
    },
    {
      id: '5',
      title: 'Application Submitted',
      description: 'Test Company',
      date: '2025-07-26T11:10:00Z',
      type: 'application'
    }
  ];

  return NextResponse.json({ activities });
}
