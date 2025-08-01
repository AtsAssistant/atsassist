-- Enable UUID extension
create extension if not exists "uuid-ossp" with schema extensions;

-- Create enum types
create type application_status as enum ('saved', 'applied', 'interview', 'offer', 'rejected', 'ghosted');
create type interview_type as enum ('phone', 'video', 'onsite', 'technical', 'behavioral', 'final', 'other');
create type interview_status as enum ('scheduled', 'completed', 'cancelled', 'rescheduled');
create type activity_type as enum ('application', 'interview', 'resume', 'call_letter', 'note', 'other');

-- Create companies table (to avoid hardcoding company names)
create table if not exists public.companies (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  website text,
  logo_url text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create job_positions table (to avoid hardcoding position names)
create table if not exists public.job_positions (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  department text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create job_applications table
create table if not exists public.job_applications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  company_id uuid references public.companies(id) on delete cascade not null,
  position_id uuid references public.job_positions(id) on delete cascade not null,
  status application_status not null default 'saved',
  application_date date,
  job_description text,
  job_url text,
  location text,
  salary_range text,
  is_remote boolean default false,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create interviews table
create table if not exists public.interviews (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid references public.job_applications(id) on delete cascade not null,
  interview_type interview_type not null,
  interview_date timestamp with time zone not null,
  interviewer_name text,
  interviewer_email text,
  interview_notes text,
  status interview_status not null default 'scheduled',
  follow_up_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create call_letters table
create table if not exists public.call_letters (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid references public.job_applications(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  file_url text not null,
  file_name text not null,
  file_type text not null,
  file_size bigint not null,
  uploaded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create resumes table
create table if not exists public.resumes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  file_url text not null,
  file_name text not null,
  file_type text not null,
  file_size bigint not null,
  is_primary boolean default false,
  version text,
  notes text,
  uploaded_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create activity_logs table
create table if not exists public.activity_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  type activity_type not null,
  action text not null,
  description text not null,
  reference_id uuid,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for better query performance
create index idx_job_applications_user_id on public.job_applications(user_id);
create index idx_job_applications_company_id on public.job_applications(company_id);
create index idx_job_applications_status on public.job_applications(status);
create index idx_interviews_application_id on public.interviews(application_id);
create index idx_call_letters_user_id on public.call_letters(user_id);
create index idx_resumes_user_id on public.resumes(user_id);
create index idx_activity_logs_user_id on public.activity_logs(user_id);

-- Enable Row Level Security (RLS)
alter table public.companies enable row level security;
alter table public.job_positions enable row level security;
alter table public.job_applications enable row level security;
alter table public.interviews enable row level security;
alter table public.call_letters enable row level security;
alter table public.resumes enable row level security;
alter table public.activity_logs enable row level security;

-- Create RLS policies
create policy "Users can view their own data" on public.job_applications
  for select using (auth.uid() = user_id);

create policy "Users can view their own interviews" on public.interviews
  for select using (exists (
    select 1 from public.job_applications 
    where job_applications.id = interviews.application_id 
    and job_applications.user_id = auth.uid()
  ));

create policy "Users can view their own call letters" on public.call_letters
  for select using (auth.uid() = user_id);

create policy "Users can view their own resumes" on public.resumes
  for select using (auth.uid() = user_id);

create policy "Users can view their own activity logs" on public.activity_logs
  for select using (auth.uid() = user_id);

-- Create functions for updated_at triggers
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger handle_job_applications_updated_at
  before update on public.job_applications
  for each row execute procedure public.handle_updated_at();

create trigger handle_interviews_updated_at
  before update on public.interviews
  for each row execute procedure public.handle_updated_at();

create trigger handle_resumes_updated_at
  before update on public.resumes
  for each row execute procedure public.handle_updated_at();

-- Create function to log activities
create or replace function public.log_activity()
returns trigger as $$
begin
  insert into public.activity_logs (user_id, type, action, description, reference_id)
  values (
    new.user_id,
    lower(tg_table_name::text)::activity_type,
    lower(tg_op),
    tg_op || ' ' || tg_table_name || ' with id ' || new.id,
    new.id
  );
  return new;
end;
$$ language plpgsql;

-- Create triggers for activity logging
create trigger log_job_application_activity
  after insert or update or delete on public.job_applications
  for each row execute procedure public.log_activity();

create trigger log_interview_activity
  after insert or update or delete on public.interviews
  for each row execute procedure public.log_activity();

create trigger log_call_letter_activity
  after insert or update or delete on public.call_letters
  for each row execute procedure public.log_activity();

create trigger log_resume_activity
  after insert or update or delete on public.resumes
  for each row execute procedure public.log_activity();
