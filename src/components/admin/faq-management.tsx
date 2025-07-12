"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Search, HelpCircle, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { FAQForm } from "./faq-form"
import { faqApi } from "@/lib/api"
import { FAQ } from "@/types/faqs"
import { toast } from "sonner"

export function FAQManagement() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null)
  const [expandedFAQs, setExpandedFAQs] = useState<Set<string>>(new Set())

  // Fetch FAQs from API
  useEffect(() => {
    async function fetchFAQs() {
      try {
        setLoading(true)
        const data = await faqApi.getAll() as FAQ[]
        setFaqs(data)
      } catch (error) {
        console.error("Failed to fetch FAQs:", error)
        toast.error("Failed to load FAQs")
      } finally {
        setLoading(false)
      }
    }

    fetchFAQs()
  }, [])

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleFAQ = (id: string) => {
    const newExpanded = new Set(expandedFAQs)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedFAQs(newExpanded)
  }

  const handleDelete = async (id: string) => {
    try {
      await faqApi.delete(id)
      setFaqs(faqs.filter(faq => faq.id !== id))
      toast.success("FAQ deleted successfully")
    } catch (error: any) {
      console.error("Failed to delete FAQ:", error)
      toast.error(error.message || "Failed to delete FAQ")
    }
  }

  const handleCreateSuccess = (newFAQ: FAQ) => {
    setFaqs([newFAQ, ...faqs])
    setIsCreateDialogOpen(false)
  }

  const handleEditSuccess = (updatedFAQ: FAQ) => {
    setFaqs(faqs.map(faq => 
      faq.id === updatedFAQ.id ? updatedFAQ : faq
    ))
    setEditingFAQ(null)
  }

  // Calculate statistics
  const totalFAQs = faqs.length
  const averageAnswerLength = faqs.length > 0 
    ? Math.round(faqs.reduce((sum, faq) => sum + faq.answer.split(' ').length, 0) / faqs.length)
    : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-chocolate">FAQ Management</h1>
          <p className="text-chocolate/70 mt-1">Manage frequently asked questions for your customers</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-caramel hover:bg-caramel/90 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white">
            <DialogHeader>
              <DialogTitle className="text-chocolate">Create New FAQ</DialogTitle>
              <DialogDescription className="text-chocolate/70">
                Add a new frequently asked question and answer
              </DialogDescription>
            </DialogHeader>
            <FAQForm onClose={() => setIsCreateDialogOpen(false)} onSuccess={handleCreateSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-white border-sage/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-chocolate/70">Total FAQs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chocolate">{totalFAQs}</div>
            <p className="text-xs text-chocolate/60 mt-1">Published questions</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-sage/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-chocolate/70">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chocolate">-</div>
            <p className="text-xs text-chocolate/60 mt-1">Question categories</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-sage/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-chocolate/70">Avg. Answer Length</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chocolate">{averageAnswerLength}</div>
            <p className="text-xs text-chocolate/60 mt-1">Words per answer</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-sage/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-chocolate/70">Most Recent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chocolate">{faqs.length > 0 ? "Latest" : "None"}</div>
            <p className="text-xs text-chocolate/60 mt-1">FAQ added</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-sage/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-chocolate">Frequently Asked Questions</CardTitle>
              <CardDescription className="text-chocolate/70">Manage customer questions and answers</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-chocolate/40 h-4 w-4" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-sage/20 focus:border-caramel"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-chocolate/60">Loading FAQs...</div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <Card key={faq.id} className="border-sage/20">
                  <Collapsible open={expandedFAQs.has(faq.id)} onOpenChange={() => toggleFAQ(faq.id)}>
                    <CollapsibleTrigger className="w-full">
                      <CardHeader className="hover:bg-beige/20 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start space-x-3 text-left">
                            <HelpCircle className="h-5 w-5 text-caramel mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <CardTitle className="text-lg text-chocolate">{faq.question}</CardTitle>
                              <div className="flex items-center space-x-2 mt-2">
                                <span className="text-xs bg-sage/20 text-chocolate px-2 py-1 rounded">
                                  {new Date(faq.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div
                              className="p-2 text-chocolate hover:bg-beige/30 rounded-md cursor-pointer transition-colors"
                              onClick={(e) => {
                                e.stopPropagation()
                                setEditingFAQ(faq)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </div>
                            <div
                              className="p-2 text-red-600 hover:bg-red-50 rounded-md cursor-pointer transition-colors"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(faq.id)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </div>
                            {expandedFAQs.has(faq.id) ? (
                              <ChevronDown className="h-5 w-5 text-chocolate/60" />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-chocolate/60" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="ml-8 p-4 bg-beige/20 rounded-lg">
                          <p className="text-chocolate/80 leading-relaxed">{faq.answer}</p>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit FAQ Dialog */}
      <Dialog open={!!editingFAQ} onOpenChange={() => setEditingFAQ(null)}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-chocolate">Edit FAQ</DialogTitle>
            <DialogDescription className="text-chocolate/70">Update the question and answer</DialogDescription>
          </DialogHeader>
          <FAQForm faq={editingFAQ} onClose={() => setEditingFAQ(null)} onSuccess={handleEditSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  )
} 