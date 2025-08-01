import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"
import { FileText, Upload, FileEdit, Trash2, Download } from "lucide-react"

export default function ResumesPage() {
  // Mock resume data
  const resumes = [
    {
      id: 1,
      name: "Software Engineer Resume",
      updatedAt: "Updated 2 days ago",
      size: "245 KB",
      isPrimary: true,
    },
    {
      id: 2,
      name: "Senior Developer Resume",
      updatedAt: "Updated 1 week ago",
      size: "312 KB",
      isPrimary: false,
    },
  ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Resume Versions</h1>
              <p className="text-muted-foreground">
                Manage different versions of your resume
              </p>
            </div>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Resume
            </Button>
          </div>

          {resumes.length > 0 ? (
            <div className="space-y-4">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{resume.name}</span>
                        {resume.isPrimary && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                            Primary
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {resume.updatedAt} • {resume.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <FileEdit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="pt-4">
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New Version
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">No resumes uploaded</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Upload your resume to keep track of different versions and easily access them for job applications.
              </p>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Resume
              </Button>
            </div>
          )}
          
          <div className="mt-12 rounded-lg border bg-card p-6">
            <h3 className="font-medium mb-4">Resume Tips</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>Keep your resume to 1-2 pages maximum</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>Tailor your resume for each job application</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>Use action verbs and quantify achievements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>Include relevant keywords from the job description</span>
              </li>
            </ul>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
