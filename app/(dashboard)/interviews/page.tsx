import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"
import { Calendar, Plus, Clock } from "lucide-react"

export default function InterviewsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Interviews</h1>
              <p className="text-muted-foreground">
                Schedule and manage your upcoming interviews
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Schedule Interview
            </Button>
          </div>

          <div className="grid gap-6">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Upcoming Interviews</h2>
                <Button variant="outline" size="sm">
                  <Clock className="mr-2 h-4 w-4" />
                  View Calendar
                </Button>
              </div>
              
              <div className="text-center py-12">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">No upcoming interviews</h3>
                <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                  You don't have any interviews scheduled yet. Add an interview to keep track of your upcoming opportunities.
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule Interview
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-medium mb-4">Interview Preparation</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-foreground">•</span>
                    <span>Research the company and role</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground">•</span>
                    <span>Review common interview questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground">•</span>
                    <span>Prepare questions for the interviewer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground">•</span>
                    <span>Test your equipment and internet connection</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-medium mb-4">After the Interview</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-foreground">•</span>
                    <span>Send a thank you email within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground">•</span>
                    <span>Reflect on what went well and what could be improved</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground">•</span>
                    <span>Follow up if you don't hear back within the expected timeframe</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
