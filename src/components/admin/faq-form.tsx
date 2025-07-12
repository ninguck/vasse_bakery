"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { faqApi } from "@/lib/api"
import { FAQ } from "@/types/faqs"
import { toast } from "sonner"

interface FAQFormProps {
  faq?: FAQ | null
  onClose: () => void
  onSuccess?: (faq: FAQ) => void
}

export function FAQForm({ faq, onClose, onSuccess }: FAQFormProps) {
  const [formData, setFormData] = useState({
    question: faq?.question || "",
    answer: faq?.answer || "",
    category: faq?.category || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      let newFAQ: FAQ
      if (faq) {
        newFAQ = await faqApi.update(faq.id, formData) as FAQ
        toast.success("FAQ updated successfully")
      } else {
        newFAQ = await faqApi.create(formData) as FAQ
        toast.success("FAQ created successfully")
      }

      onSuccess?.(newFAQ)
      onClose()
    } catch (error: any) {
      console.error("Failed to save FAQ:", error)
      toast.error(error.message || "Failed to save FAQ")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="question" className="text-chocolate">
          Question
        </Label>
        <Textarea
          id="question"
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          placeholder="Enter the frequently asked question"
          className="border-sage/20 focus:border-caramel"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category" className="text-chocolate">
          Category
        </Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger className="border-sage/20 focus:border-caramel">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-white border-sage/20">
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="orders">Orders</SelectItem>
            <SelectItem value="allergies">Allergies</SelectItem>
            <SelectItem value="delivery">Delivery</SelectItem>
            <SelectItem value="quality">Quality</SelectItem>
            <SelectItem value="pricing">Pricing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="answer" className="text-chocolate">
          Answer (Long-form)
        </Label>
        <Textarea
          id="answer"
          value={formData.answer}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
          placeholder="Enter the detailed answer to this question. You can write multiple paragraphs and provide comprehensive information."
          className="border-sage/20 focus:border-caramel"
          rows={8}
        />
        <p className="text-xs text-chocolate/60">
          Provide a comprehensive answer. You can include multiple paragraphs, examples, and detailed explanations.
        </p>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="border-sage/20 text-chocolate hover:bg-beige/30 bg-transparent"
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-caramel hover:bg-caramel/90 text-white">
          {faq ? "Update FAQ" : "Create FAQ"}
        </Button>
      </div>
    </form>
  )
} 