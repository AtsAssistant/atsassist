// Test data for ATS Assistant application
// This file contains mock data for development and testing purposes

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: string;
  user_id: string;
  company: string;
  position: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'ghosted';
  application_date: string;
  job_description?: string;
  job_url?: string;
  location?: string;
  salary?: string;
  is_remote: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Interview {
  id: string;
  application_id: string;
  user_id: string;
  interview_date: string;
  interview_type: 'phone' | 'video' | 'onsite' | 'technical' | 'behavioral' | 'final' | 'other';
  interviewer_name?: string;
  interviewer_email?: string;
  interview_notes?: string;
  follow_up_date?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  created_at: string;
  updated_at: string;
}

export interface CallLetter {
  id: string;
  user_id: string;
  application_id: string;
  file_url: string;
  file_name: string;
  file_type: string;
  file_size: number;
  uploaded_at: string;
}

export interface Resume {
  id: string;
  user_id: string;
  file_url: string;
  file_name: string;
  file_type: string;
  file_size: number;
  is_primary: boolean;
  version: string;
  notes?: string;
  uploaded_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  type: 'application' | 'interview' | 'resume' | 'call_letter' | 'note' | 'other';
  action: string;
  description: string;
  reference_id?: string;
  created_at: string;
}

// Test Data
export const testUser: User = {
  id: 'user_123',
  email: 'test@example.com',
  first_name: 'John',
  last_name: 'Doe',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe',
  created_at: '2025-01-01T00:00:00.000Z',
  updated_at: '2025-01-01T00:00:00.000Z',
};

export const testJobApplications: JobApplication[] = [
  {
    id: 'app_1',
    user_id: 'user_123',
    company: 'TechCorp',
    position: 'Senior Frontend Developer',
    status: 'interview',
    application_date: '2025-07-15',
    job_description: 'Looking for an experienced frontend developer with React and TypeScript experience.',
    job_url: 'https://techcorp.com/careers/senior-frontend-dev',
    location: 'San Francisco, CA',
    salary: '$140,000 - $180,000',
    is_remote: true,
    notes: 'Referred by Jane Smith',
    created_at: '2025-07-15T10:00:00.000Z',
    updated_at: '2025-07-20T14:30:00.000Z',
  },
  {
    id: 'app_2',
    user_id: 'user_123',
    company: 'Digital Solutions Inc.',
    position: 'Full Stack Developer',
    status: 'applied',
    application_date: '2025-07-20',
    job_description: 'Full stack developer position with focus on React and Node.js',
    job_url: 'https://digitalsolutions.io/careers/fullstack-dev',
    location: 'Remote',
    salary: '$130,000 - $160,000',
    is_remote: true,
    created_at: '2025-07-20T11:15:00.000Z',
    updated_at: '2025-07-20T11:15:00.000Z',
  },
  {
    id: 'app_3',
    user_id: 'user_123',
    company: 'InnovateX',
    position: 'Frontend Engineer',
    status: 'ghosted',
    application_date: '2025-06-10',
    job_description: 'Frontend engineer position with focus on React and modern JavaScript',
    job_url: 'https://innovatex.com/careers/frontend-engineer',
    location: 'New York, NY',
    salary: '$120,000 - $150,000',
    is_remote: false,
    notes: 'Follow up after 2 weeks',
    created_at: '2025-06-10T09:30:00.000Z',
    updated_at: '2025-07-01T16:45:00.000Z',
  },
];

export const testInterviews: Interview[] = [
  {
    id: 'int_1',
    application_id: 'app_1',
    user_id: 'user_123',
    interview_date: '2025-07-25T14:00:00.000Z',
    interview_type: 'video',
    interviewer_name: 'Sarah Johnson',
    interviewer_email: 'sarah.johnson@techcorp.com',
    interview_notes: 'Focus on React performance optimization and state management',
    status: 'scheduled',
    created_at: '2025-07-20T14:30:00.000Z',
    updated_at: '2025-07-20T14:30:00.000Z',
  },
  {
    id: 'int_2',
    application_id: 'app_1',
    user_id: 'user_123',
    interview_date: '2025-07-18T10:00:00.000Z',
    interview_type: 'phone',
    interviewer_name: 'Mike Chen',
    interviewer_email: 'mike.chen@techcorp.com',
    status: 'completed',
    created_at: '2025-07-15T16:20:00.000Z',
    updated_at: '2025-07-18T11:30:00.000Z',
  },
];

export const testCallLetters: CallLetter[] = [
  {
    id: 'cl_1',
    user_id: 'user_123',
    application_id: 'app_1',
    file_url: 'https://example.com/call-letters/techcorp-interview.pdf',
    file_name: 'TechCorp_Interview_Invitation.pdf',
    file_type: 'application/pdf',
    file_size: 1024 * 150, // 150KB
    uploaded_at: '2025-07-16T09:15:00.000Z',
  },
  {
    id: 'cl_2',
    user_id: 'user_123',
    application_id: 'app_3',
    file_url: 'https://example.com/call-letters/innovatex-interview.pdf',
    file_name: 'InnovateX_Interview_Details.pdf',
    file_type: 'application/pdf',
    file_size: 1024 * 120, // 120KB
    uploaded_at: '2025-06-15T11:30:00.000Z',
  },
];

export const testResumes: Resume[] = [
  {
    id: 'res_1',
    user_id: 'user_123',
    file_url: 'https://example.com/resumes/john_doe_resume_v3.pdf',
    file_name: 'John_Doe_Resume_v3.pdf',
    file_type: 'application/pdf',
    file_size: 1024 * 200, // 200KB
    is_primary: true,
    version: '3.0',
    notes: 'Updated with latest experience and skills',
    uploaded_at: '2025-07-10T14:20:00.000Z',
    updated_at: '2025-07-10T14:20:00.000Z',
  },
  {
    id: 'res_2',
    user_id: 'user_123',
    file_url: 'https://example.com/resumes/john_doe_resume_ats.pdf',
    file_name: 'John_Doe_Resume_ATS.pdf',
    file_type: 'application/pdf',
    file_size: 1024 * 180, // 180KB
    is_primary: false,
    version: '2.5',
    notes: 'ATS-optimized version',
    uploaded_at: '2025-06-28T10:45:00.000Z',
    updated_at: '2025-06-28T10:45:00.000Z',
  },
];

export const testActivityLogs: ActivityLog[] = [
  {
    id: 'act_1',
    user_id: 'user_123',
    type: 'application',
    action: 'created',
    description: 'Applied to Senior Frontend Developer at TechCorp',
    reference_id: 'app_1',
    created_at: '2025-07-15T10:00:00.000Z',
  },
  {
    id: 'act_2',
    user_id: 'user_123',
    type: 'interview',
    action: 'scheduled',
    description: 'Phone interview scheduled with Mike Chen at TechCorp',
    reference_id: 'int_2',
    created_at: '2025-07-15T16:20:00.000Z',
  },
  {
    id: 'act_3',
    user_id: 'user_123',
    type: 'call_letter',
    action: 'uploaded',
    description: 'Uploaded call letter from TechCorp',
    reference_id: 'cl_1',
    created_at: '2025-07-16T09:15:00.000Z',
  },
  {
    id: 'act_4',
    user_id: 'user_123',
    type: 'interview',
    action: 'completed',
    description: 'Completed phone interview with Mike Chen',
    reference_id: 'int_2',
    created_at: '2025-07-18T11:30:00.000Z',
  },
  {
    id: 'act_5',
    user_id: 'user_123',
    type: 'interview',
    action: 'scheduled',
    description: 'Technical interview scheduled with Sarah Johnson at TechCorp',
    reference_id: 'int_1',
    created_at: '2025-07-20T14:30:00.000Z',
  },
  {
    id: 'act_6',
    user_id: 'user_123',
    type: 'application',
    action: 'created',
    description: 'Applied to Full Stack Developer at Digital Solutions Inc.',
    reference_id: 'app_2',
    created_at: '2025-07-20T11:15:00.000Z',
  },
];

// Helper function to get all test data
export function getTestData(userId: string) {
  return {
    user: testUser,
    jobApplications: testJobApplications.filter(app => app.user_id === userId),
    interviews: testInterviews.filter(int => int.user_id === userId),
    callLetters: testCallLetters.filter(cl => cl.user_id === userId),
    resumes: testResumes.filter(resume => resume.user_id === userId),
    activityLogs: testActivityLogs.filter(log => log.user_id === userId),
  };
}

// Helper function to get dashboard statistics
export function getDashboardStats(userId: string) {
  const apps = testJobApplications.filter(app => app.user_id === userId);
  const interviews = testInterviews.filter(int => int.user_id === userId);
  
  return {
    totalApplications: apps.length,
    applicationsByStatus: apps.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    upcomingInterviews: interviews.filter(
      int => int.status === 'scheduled' && 
      new Date(int.interview_date) > new Date()
    ).length,
    recentActivity: testActivityLogs
      .filter(log => log.user_id === userId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5),
  };
}