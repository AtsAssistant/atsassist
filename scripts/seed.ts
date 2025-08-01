import { faker } from '@faker-js/faker';
import { db } from '../src/db';
import {
  companies,
  jobPositions,
  jobApplications,
  interviews,
  callLetters,
  resumes,
  activityLogs,
  type NewCompany,
  type NewJobPosition,
  type NewJobApplication,
  type NewInterview,
  type NewCallLetter,
  type NewResume,
  type NewActivityLog,
} from '../src/schema';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configuration
const NUM_COMPANIES = 20;
const NUM_POSITIONS = 15;
const NUM_APPLICATIONS_PER_USER = 20;
const MAX_INTERVIEWS_PER_APPLICATION = 3;
const MAX_CALL_LETTERS_PER_APPLICATION = 2;
const MAX_RESUMES_PER_USER = 3;

// Helper functions
const randomArrayElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const randomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Generate fake data
const generateCompanies = (count: number): NewCompany[] => {
  return Array.from({ length: count }, () => ({
    name: faker.company.name(),
    website: `https://${faker.internet.domainName()}`,
    logoUrl: `https://logo.clearbit.com/${faker.internet.domainName()}`,
    description: faker.company.catchPhraseDescriptor(),
  }));
};

const generateJobPositions = (count: number) => {
  const departments = [
    'Engineering', 'Product', 'Design', 'Marketing', 'Sales', 
    'Customer Support', 'Operations', 'Finance', 'HR', 'Legal'
  ];
  
  const positions = new Set<string>();
  
  while (positions.size < count) {
    positions.add(faker.person.jobTitle());
  }
  
  return Array.from(positions).map(title => ({
    title,
    department: randomArrayElement(departments),
  }));
};

const seedDatabase = async () => {
  console.log('Starting database seeding...');
  
  try {
    // 1. Create companies
    console.log(`Creating ${NUM_COMPANIES} companies...`);
    const companyData = await db
      .insert(companies)
      .values(generateCompanies(NUM_COMPANIES))
      .returning();
    
    console.log(`Created ${companyData.length} companies`);
    
    // 2. Create job positions
    console.log(`Creating ${NUM_POSITIONS} job positions...`);
    const positionData = await db
      .insert(jobPositions)
      .values(generateJobPositions(NUM_POSITIONS))
      .returning();
    
    console.log(`Created ${positionData.length} job positions`);
    
    // 3. Get or create a test user (you might want to modify this based on your auth setup)
    // For now, we'll use a test user ID
    const testUserId = 'test-user-123';
    
    // 4. Create job applications
    console.log(`Creating ${NUM_APPLICATIONS_PER_USER} job applications...`);
    const applicationStatuses = ['saved', 'applied', 'interview', 'offer', 'rejected', 'ghosted'] as const;
    
    const applicationData = [];
    
    for (let i = 0; i < NUM_APPLICATIONS_PER_USER; i++) {
      const randomCompany = randomArrayElement(companyData);
      const randomPosition = randomArrayElement(positionData);
      const status = randomArrayElement(applicationStatuses);
      const applicationDate = randomDate(new Date(2024, 0, 1), new Date());
      
      const [application] = await db
        .insert(jobApplications)
        .values({
          userId: testUserId,
          companyId: randomCompany.id,
          positionId: randomPosition.id,
          status,
          applicationDate: applicationDate.toISOString().split('T')[0],
          jobDescription: faker.lorem.paragraphs(2),
          jobUrl: `https://${faker.internet.domainName()}/careers/${faker.lorem.slug()}`,
          location: `${faker.location.city()}, ${faker.location.state({ abbreviated: true })}`,
          salaryRange: `$${faker.number.int({ min: 50, max: 200 })}k - $${faker.number.int({ min: 100, max: 300 })}k`,
          isRemote: faker.datatype.boolean(),
          notes: faker.datatype.boolean() ? faker.lorem.sentence() : null,
        })
        .returning();
      
      applicationData.push(application);
      
      // Create interviews for some applications
      if (['interview', 'offer'].includes(status)) {
        const numInterviews = Math.floor(Math.random() * (MAX_INTERVIEWS_PER_APPLICATION + 1));
        const interviewTypes = ['phone', 'video', 'onsite', 'technical', 'behavioral', 'final', 'other'] as const;
        
        for (let j = 0; j < numInterviews; j++) {
          const interviewDate = randomDate(
            applicationDate,
            new Date(applicationDate.getTime() + 60 * 24 * 60 * 60 * 1000) // Within 60 days
          );
          
          await db.insert(interviews).values({
            applicationId: application.id,
            interviewType: randomArrayElement(interviewTypes),
            interviewDate: interviewDate.toISOString(),
            interviewerName: faker.person.fullName(),
            interviewerEmail: faker.internet.email(),
            interviewNotes: faker.datatype.boolean() ? faker.lorem.paragraph() : null,
            status: interviewDate < new Date() ? 'completed' : 'scheduled',
            followUpDate: faker.datatype.boolean() ? 
              new Date(interviewDate.getTime() + (7 * 24 * 60 * 60 * 1000)).toISOString() : 
              null,
          });
        }
      }
      
      // Create call letters for some applications
      if (faker.datatype.boolean({ probability: 0.6 })) {
        const numCallLetters = Math.floor(Math.random() * (MAX_CALL_LETTERS_PER_APPLICATION + 1));
        
        for (let k = 0; k < numCallLetters; k++) {
          await db.insert(callLetters).values({
            applicationId: application.id,
            userId: testUserId,
            fileUrl: `https://example.com/call-letters/${faker.string.uuid()}.pdf`,
            fileName: `Call_Letter_${faker.lorem.words(2).replace(/\s+/g, '_')}.pdf`,
            fileType: 'application/pdf',
            fileSize: faker.number.int({ min: 100000, max: 500000 }), // 100KB - 500KB
          });
        }
      }
    }
    
    // 5. Create resumes for the user
    const numResumes = Math.floor(Math.random() * MAX_RESUMES_PER_USER) + 1;
    
    for (let i = 0; i < numResumes; i++) {
      await db.insert(resumes).values({
        userId: testUserId,
        fileUrl: `https://example.com/resumes/${faker.string.uuid()}.pdf`,
        fileName: `Resume_${testUserId}_v${i + 1}.pdf`,
        fileType: 'application/pdf',
        fileSize: faker.number.int({ min: 200000, max: 1000000 }), // 200KB - 1MB
        isPrimary: i === 0, // First resume is primary
        version: `v${i + 1}.0`,
        notes: faker.datatype.boolean() ? faker.lorem.sentence() : null,
      });
    }
    
    console.log('Database seeding completed successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
