import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"
import { FileText, Upload } from "lucide-react"

export default function CallLettersPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Call Letters</h1>
              <p className="text-muted-foreground">
                View and manage your interview call letters
              </p>
            </div>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Letter
            </Button>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="text-center py-12">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">No call letters yet</h3>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                You haven't uploaded any call letters yet. Upload your first call letter to keep track of your interview schedule.
              </p>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Letter
              </Button>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
