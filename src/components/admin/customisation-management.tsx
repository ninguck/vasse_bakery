"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Image as ImageIcon } from "lucide-react"
import { useState } from "react"

export function CustomisationManagement() {
  // Placeholder for image messages state
  const [showAddDialog, setShowAddDialog] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-chocolate">Site Customisation</h1>
          <p className="text-chocolate/70 mt-1">Manage general customisable sections of your site</p>
        </div>
      </div>

      <Card className="bg-white border-sage/20">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg text-chocolate flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-caramel" />
              Image Messages
            </CardTitle>
            <p className="text-sm text-chocolate/70 mt-1">Customise image-message combos displayed on your site</p>
          </div>
          <Button className="bg-caramel hover:bg-caramel/90 text-white" onClick={() => setShowAddDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Image Message
          </Button>
        </CardHeader>
        <CardContent>
          {/* Placeholder for image message list and add/edit dialog */}
          <div className="text-chocolate/60 py-8 text-center">
            Image message management coming soon...
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 