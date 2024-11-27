'use client'

import { toast } from "@/hooks/use-toast"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"

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

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.description || !formData.url) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }
    const res = await axios.post('/api/authapps',formData)
    console.log(res.data)
    onCreate(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-6 rounded-xl bg-gradient-to-b from-white/20 to-white/10 backdrop-blur-[2px] shadow-[0_8px_16px_rgba(0,0,0,0.2)] border border-white/20">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label 
            htmlFor="name" 
            className="text-sm font-medium tracking-wide text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
          >
            Product Name
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="h-12 text-white transition-all duration-200 border rounded-lg shadow-inner bg-white/10 border-white/20 backdrop-blur-sm focus:bg-white/20 focus:border-white/30 placeholder:text-white/50"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label 
            htmlFor="url" 
            className="text-sm font-medium tracking-wide text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
          >
            Product URL
          </Label>
          <Input
            id="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className="h-12 text-white transition-all duration-200 border rounded-lg shadow-inner bg-white/10 border-white/20 backdrop-blur-sm focus:bg-white/20 focus:border-white/30 placeholder:text-white/50"
            placeholder="Enter product URL"
            required
          />
        </div>
        <div className="space-y-2">
          <Label 
            htmlFor="description" 
            className="text-sm font-medium tracking-wide text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
          >
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="min-h-[100px] text-white bg-white/10 transition-all duration-200 border border-white/20 rounded-lg shadow-inner backdrop-blur-sm focus:bg-white/20 focus:border-white/30 placeholder:text-white/50"
            placeholder="Enter product description"
            required
          />
        </div>
        <div className="space-y-2">
          <Label 
            htmlFor="price" 
            className="text-sm font-medium tracking-wide text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
          >
            Price (Optional)
          </Label>
          <Input
            id="price"
            type="number"
            value={formData.price || ''}
            onChange={(e) => setFormData({ ...formData, price: e.target.value ? Number(e.target.value) : undefined })}
            className="h-12 text-white transition-all duration-200 border rounded-lg shadow-inner bg-white/10 border-white/20 backdrop-blur-sm focus:bg-white/20 focus:border-white/30 placeholder:text-white/50"
            placeholder="Enter product price"
          />
        </div>
        <div className="flex items-center px-1 space-x-3">
          <Checkbox
            id="requireAdmin"
            checked={formData.requireAdmin}
            onCheckedChange={(checked) => setFormData({ ...formData, requireAdmin: checked as boolean })}
            className="h-5 w-5 border-2 border-white/30 data-[state=checked]:border-white/50 data-[state=checked]:bg-white/20 transition-colors duration-200"
          />
          <Label 
            htmlFor="requireAdmin" 
            className="text-sm font-medium tracking-wide text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
          >
            Require Admin
          </Label>
        </div>
      </div>
      <Button 
        type="submit" 
        className="w-full h-12 font-medium tracking-wide text-white transition-all duration-200 border rounded-lg shadow-lg bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 backdrop-blur-sm border-white/20 hover:border-white/30"
      >
        Create
      </Button>
    </form>
  )
}