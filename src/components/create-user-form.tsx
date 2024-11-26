"use client"

import { toast } from "@/hooks/use-toast"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FormData {
  emailOrWallet: string
  isAdmin: boolean
  password: string
  product: string
}

// TODO: get this from api endpoint
const productOptions = [
  { value: "electric-boost", label: "Electric Boost" },
  { value: "neon-surge", label: "Neon Surge" },
  { value: "volt-vibe", label: "Volt Vibe" },
  { value: "plasma-pulse", label: "Plasma Pulse" },
  { value: "thunder-thrill", label: "Thunder Thrill" },
]

export function CreateUserForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const [formData, setFormData] = useState<FormData>({
    emailOrWallet: "",
    isAdmin: false,
    password: "",
    product: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.emailOrWallet || !formData.password || !formData.product) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label 
            htmlFor="emailOrWallet" 
            className="text-sm font-medium tracking-wide text-blue-200"
          >
            Email or Wallet Address
          </Label>
          <Input
            id="emailOrWallet"
            value={formData.emailOrWallet}
            onChange={(e) => setFormData({ ...formData, emailOrWallet: e.target.value })}
            className="h-12 text-blue-100 transition-all duration-200 border-2 rounded-lg shadow-inner bg-blue-950/50 border-blue-400/30 focus:border-blue-400/80 placeholder:text-blue-400/50 shadow-blue-900/50"
            placeholder="Enter email or wallet address"
            required
          />
        </div>
        <div className="space-y-2">
          <Label 
            htmlFor="product" 
            className="text-sm font-medium tracking-wide text-blue-200"
          >
            Product
          </Label>
          <Select
            value={formData.product}
            onValueChange={(value) => setFormData({ ...formData, product: value })}
          >
            <SelectTrigger 
              className="h-12 text-blue-100 transition-all duration-200 border-2 rounded-lg shadow-inner bg-blue-950/50 border-blue-400/30 focus:border-blue-400/80 placeholder:text-blue-400/50 shadow-blue-900/50"
            >
              <SelectValue placeholder="Select a product" />
            </SelectTrigger>
            <SelectContent>
              {productOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center px-1 space-x-3">
          <Checkbox
            id="isAdmin"
            checked={formData.isAdmin}
            onCheckedChange={(checked) => setFormData({ ...formData, isAdmin: checked as boolean })}
            className="h-5 w-5 border-2 border-blue-400/30 data-[state=checked]:border-blue-400/80 data-[state=checked]:bg-blue-500 transition-colors duration-200"
          />
          <Label 
            htmlFor="isAdmin" 
            className="text-sm font-medium tracking-wide text-blue-200"
          >
            Is Admin
          </Label>
        </div>
        <div className="space-y-2">
          <Label 
            htmlFor="password" 
            className="text-sm font-medium tracking-wide text-blue-200"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="h-12 text-blue-100 transition-all duration-200 border-2 rounded-lg shadow-inner bg-blue-950/50 border-blue-400/30 focus:border-blue-400/80 placeholder:text-blue-400/50 shadow-blue-900/50"
            placeholder="Enter password"
            required
          />
        </div>
      </div>
      <Button 
        type="submit" 
        className="w-full h-12 font-medium tracking-wide text-white transition-all duration-200 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-blue-900/50 hover:shadow-blue-400/50"
      >
        Submit
      </Button>
    </form>
  )
}