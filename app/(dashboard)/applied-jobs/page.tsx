import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function AppliedJobsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Applied Jobs</h1>
              <p className="text-muted-foreground">
                Track all your job applications in one place
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Application
            </Button>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No jobs yet</h3>
              <p className="text-muted-foreground mb-4">
                You haven't applied to any jobs yet. Get started by adding your first application.
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Application
              </Button>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
