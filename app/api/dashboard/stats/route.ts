import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data - replace with actual database calls later
  const stats = [
    {
      title: "Total Applications",
      value: "1",
      change: "+12% from last month",
      icon: "Briefcase"
    },
    {
      title: "Upcoming Interviews",
      value: "0",
      change: "+0 this week",
      icon: "Calendar"
    },
    {
      title: "Call Letters",
      value: "0",
      change: "0 new",
      icon: "FileText"
    }
  ];

  return NextResponse.json({ stats });
}
