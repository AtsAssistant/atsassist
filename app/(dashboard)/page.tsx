"use client";
import { AppSidebar } from "@/components/app-sidebar"
import { Briefcase, Calendar, FileText, Clock, FileCheck, FileEdit } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useEffect, useState } from 'react'
import React from 'react'

// Type definitions for the icons
type IconMap = {
  [key: string]: React.ComponentType<{ className?: string }>;
};

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: keyof IconMap;
}

interface StatusItem {
  status: string;
  count: number;
  value: number;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'application' | 'interview' | 'call_letter' | 'resume';
}

// Available icons
const icons: IconMap = {
  Briefcase,
  Calendar,
  FileText,
  Clock,
  FileCheck,
  FileEdit
};

// Helper function to get icon component
const getIconComponent = (iconName: keyof IconMap) => {
  const Icon = icons[iconName];
  return Icon ? <Icon className="h-4 w-4 text-muted-foreground" /> : null;
};

// Helper function to get activity icon
const getActivityIcon = (type: Activity['type']) => {
  const iconMap: Record<Activity['type'], React.ComponentType<{ className?: string }>> = {
    'application': FileText,
    'interview': Calendar,
    'call_letter': FileCheck,
    'resume': FileEdit
  };
  
  const Icon = iconMap[type] || FileText;
  const colorMap = {
    'application': 'text-blue-500',
    'interview': 'text-green-500',
    'call_letter': 'text-purple-500',
    'resume': 'text-amber-500'
  } as const;
  
  return <Icon className={`h-4 w-4 ${colorMap[type] || 'text-gray-500'}`} />;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [applicationStatus, setApplicationStatus] = useState<StatusItem[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState({
    stats: true,
    status: true,
    activities: true
  });
  const [error, setError] = useState({
    stats: null as string | null,
    status: null as string | null,
    activities: null as string | null
  });

  useEffect(() => {
    // Fetch stats data
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data.stats);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError(prev => ({ ...prev, stats: 'Failed to load stats' }));
      } finally {
        setIsLoading(prev => ({ ...prev, stats: false }));
      }
    };

    // Fetch status data
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/dashboard/status');
        if (!response.ok) throw new Error('Failed to fetch status');
        const data = await response.json();
        setApplicationStatus(data.status);
      } catch (err) {
        console.error('Error fetching status:', err);
        setError(prev => ({ ...prev, status: 'Failed to load application status' }));
      } finally {
        setIsLoading(prev => ({ ...prev, status: false }));
      }
    };

    // Fetch activities
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/dashboard/activities');
        if (!response.ok) throw new Error('Failed to fetch activities');
        const data = await response.json();
        setActivities(data.activities);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(prev => ({ ...prev, activities: 'Failed to load activities' }));
      } finally {
        setIsLoading(prev => ({ ...prev, activities: false }));
      }
    };

    // Call all fetch functions
    fetchStats();
    fetchStatus();
    fetchActivities();
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your job search.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {isLoading.stats ? (
              // Loading state for stats
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-8 bg-muted rounded w-1/2"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </CardHeader>
                </Card>
              ))
            ) : error.stats ? (
              // Error state for stats
              <div className="col-span-3 text-center text-red-500">
                {error.stats}
              </div>
            ) : (
              // Success state for stats
              stats.map((stat, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    {getIconComponent(stat.icon)}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Application Status */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-8">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
                <CardDescription>
                  Overview of your job application progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applicationStatus.map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {item.status}
                          </span>
                          <div className="flex items-center justify-between text-sm">
                            <span>{item.status}</span>
                            <span className="text-muted-foreground">
                              {item.count} {item.count === 1 ? 'job' : 'jobs'}
                            </span>
                          </div>
                        </div>
                        <span className="text-sm font-medium">{item.value}%</span>
                      </div>
                      <Progress value={item.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading.activities ? (
                  // Loading state for activities
                  <div className="space-y-4">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-muted animate-pulse"></div>
                        <div className="space-y-1 flex-1">
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                          <div className="h-3 bg-muted rounded w-1/2"></div>
                          <div className="h-3 bg-muted rounded w-1/4"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : error.activities ? (
                  // Error state for activities
                  <div className="text-center text-red-500 py-4">
                    {error.activities}
                  </div>
                ) : activities.length === 0 ? (
                  // Empty state
                  <div className="text-center py-4 text-muted-foreground">
                    No recent activities
                  </div>
                ) : (
                  // Success state for activities
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(activity.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Job Search Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Job Search Tips</CardTitle>
              <CardDescription>
                Helpful tips to improve your job search
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Follow up on applications after 1-2 weeks</li>
                <li>Customize your resume for each job application</li>
                <li>Prepare questions for your interviewers</li>
                <li>Network with professionals in your target companies</li>
                <li>Keep track of application deadlines and follow-ups</li>
              </ul>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
