"use client"

import { toast } from "@/hooks/use-toast"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Product {
  id: string
  name: string
  url: string
  description: string
  requireAdmin: boolean
}

interface FormData {
  productId: string
  name: string
  url: string
  description: string
  requireAdmin: boolean
}

// TODO: get this from api endpoint
const productOptions: Product[] = [
  { id: "electric-boost", name: "Electric Boost", url:"", description: "Supercharge your day", requireAdmin: false },
  { id: "neon-surge", name: "Neon Surge", url:"", description: "Illuminate your potential", requireAdmin: true },
  { id: "volt-vibe", name: "Volt Vibe", url:"", description: "Feel the energy", requireAdmin: false },
  { id: "plasma-pulse", name: "Plasma Pulse", url:"", description: "Electrify your senses", requireAdmin: true },
  { id: "thunder-thrill", name: "Thunder Thrill", url:"", description: "Experience the power", requireAdmin: false },
]

export function ManageProductForm({ onUpdate, onDelete }: { onUpdate: (data: FormData) => void, onDelete: (id: string) => void }) {
  const [formData, setFormData] = useState<FormData>({
    productId: "",
    name: "",
    url:"",
    description: "",
    requireAdmin: false,
  })

  const handleProductChange = (id: string) => {
    const selectedProduct = productOptions.find(product => product.id === id)
    if (selectedProduct) {
      setFormData({
        productId: selectedProduct.id,
        name: selectedProduct.name,
        url: selectedProduct.url,
        description: selectedProduct.description,
        requireAdmin: selectedProduct.requireAdmin,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.productId || !formData.name || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }
    onUpdate(formData)
  }

  const handleDelete = () => {
    if (formData.productId) {
      onDelete(formData.productId)
    } else {
      toast({
        title: "Error",
        description: "Please select a product to delete.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-6 rounded-xl bg-gradient-to-b from-white/20 to-white/10 backdrop-blur-[2px] shadow-[0_8px_16px_rgba(0,0,0,0.2)] border border-white/20">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label 
            htmlFor="product" 
            className="text-sm font-medium tracking-wide text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
          >
            Product
          </Label>
          <Select
            value={formData.productId}
            onValueChange={handleProductChange}
          >
            <SelectTrigger 
              className="h-12 text-white transition-all duration-200 border rounded-lg shadow-inner bg-white/10 border-white/20 backdrop-blur-sm focus:bg-white/20 focus:border-white/30 placeholder:text-white/50"
            >
              <SelectValue placeholder="Select a product" />
            </SelectTrigger>
            <SelectContent className="border bg-white/10 backdrop-blur-md border-white/20">
              {productOptions.map((option) => (
                <SelectItem key={option.id} value={option.id} className="text-white hover:bg-white/20">
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
      <div className="flex space-x-4">
        <Button 
          type="submit" 
          className="flex-1 h-12 font-medium tracking-wide text-white transition-all duration-200 border rounded-lg shadow-lg bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 backdrop-blur-sm border-white/20 hover:border-white/30"
        >
          Update
        </Button>
        <Button 
          type="button"
          onClick={handleDelete}
          className="flex-1 h-12 font-medium tracking-wide text-white transition-all duration-200 border rounded-lg shadow-lg bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 backdrop-blur-sm border-red-500/20 hover:border-red-500/30"
        >
          Delete
        </Button>
      </div>
    </form>
  )
}