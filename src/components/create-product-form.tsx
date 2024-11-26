"'use client'"

import { toast } from "@/hooks/use-toast"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface FormData {
  name: string
  url: string
  description: string
  price?: number
  requireAdmin: boolean
}

export function CreateProductForm({ onCreate }: { onCreate: (data: FormData) => void }) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    url: "",
    description: "",
    price: undefined,
    requireAdmin: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }
    onCreate(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label 
            htmlFor="name" 
            className="text-sm font-medium tracking-wide text-blue-200"
          >
            Product Name
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="h-12 text-blue-100 transition-all duration-200 border-2 rounded-lg shadow-inner bg-blue-950/50 border-blue-400/30 focus:border-blue-400/80 placeholder:text-blue-400/50 shadow-blue-900/50"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label 
            htmlFor="name" 
            className="text-sm font-medium tracking-wide text-blue-200"
          >
            Product URL
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className="h-12 text-blue-100 transition-all duration-200 border-2 rounded-lg shadow-inner bg-blue-950/50 border-blue-400/30 focus:border-blue-400/80 placeholder:text-blue-400/50 shadow-blue-900/50"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label 
            htmlFor="description" 
            className="text-sm font-medium tracking-wide text-blue-200"
          >
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="min-h-[100px] text-blue-100 transition-all duration-200 border-2 rounded-lg shadow-inner bg-blue-950/50 border-blue-400/30 focus:border-blue-400/80 placeholder:text-blue-400/50 shadow-blue-900/50"
            placeholder="Enter product description"
            required
          />
        </div>
        <div className="space-y-2">
          <Label 
            htmlFor="price" 
            className="text-sm font-medium tracking-wide text-blue-200"
          >
            Price (Optional)
          </Label>
          <Input
            id="price"
            type="number"
            value={formData.price || "''"}
            onChange={(e) => setFormData({ ...formData, price: e.target.value ? Number(e.target.value) : undefined })}
            className="h-12 text-blue-100 transition-all duration-200 border-2 rounded-lg shadow-inner bg-blue-950/50 border-blue-400/30 focus:border-blue-400/80 placeholder:text-blue-400/50 shadow-blue-900/50"
            placeholder="Enter product price"
          />
        </div>
        <div className="flex items-center px-1 space-x-3">
          <Checkbox
            id="requireAdmin"
            checked={formData.requireAdmin}
            onCheckedChange={(checked) => setFormData({ ...formData, requireAdmin: checked as boolean })}
            className="h-5 w-5 border-2 border-blue-400/30 data-[state=checked]:border-blue-400/80 data-[state=checked]:bg-blue-500 transition-colors duration-200"
          />
          <Label 
            htmlFor="requireAdmin" 
            className="text-sm font-medium tracking-wide text-blue-200"
          >
            Require Admin
          </Label>
        </div>
      </div>
      <Button 
        type="submit" 
        className="w-full h-12 font-medium tracking-wide text-white transition-all duration-200 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-blue-900/50 hover:shadow-blue-400/50"
      >
        Create
      </Button>
    </form>
  )
}