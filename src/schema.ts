import { pgTable, text, uuid, timestamp, date } from 'drizzle-orm/pg-core';

// Status enum for job applications
export const applicationStatus = [
  'saved',
  'applied',
  'interview',
  'offer',
  'rejected',
  'ghosted'
] as const;

// Main job applications table
export const jobApplications = pgTable('job_applications', {
  // Primary key
  id: uuid('id').primaryKey().defaultRandom(),
  
  // User reference (Clerk user ID)
  userId: text('user_id').notNull(),
  
  // Company information
  companyName: text('company_name').notNull(),
  companyWebsite: text('company_website'),
  companyLogo: text('company_logo'),
  
  // Job position details
  jobTitle: text('job_title').notNull(),
  jobLocation: text('job_location'),
  jobType: text('job_type'), // full-time, part-time, contract, etc.
  jobDescription: text('job_description'),
  jobUrl: text('job_url'),
  
  // Application details
  status: text('status', { enum: applicationStatus }).notNull().default('applied'),
  applicationDate: date('application_date').notNull(),
  
  // Additional metadata
  source: text('source'), // where you found the job
  notes: text('notes'),
  
  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Type for TypeScript
export type JobApplication = typeof jobApplications.$inferSelect;
export type NewJobApplication = typeof jobApplications.$inferInsert;
