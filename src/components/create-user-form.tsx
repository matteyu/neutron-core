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
    <form onSubmit={handleSubmit} className="space-y-8 p-6 rounded-xl bg-gradient-to-b from-white/20 to-white/10 backdrop-blur-[2px] shadow-[0_8px_16px_rgba(0,0,0,0.2)] border border-white/20">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label 
            htmlFor="emailOrWallet" 
            className="text-sm font-medium tracking-wide text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
          >
            Email or Wallet Address
          </Label>
          <Input
            id="emailOrWallet"
            value={formData.emailOrWallet}
            onChange={(e) => setFormData({ ...formData, emailOrWallet: e.target.value })}
            className="h-12 text-white transition-all duration-200 border rounded-lg shadow-inner bg-white/10 border-white/20 backdrop-blur-sm focus:bg-white/20 focus:border-white/30 placeholder:text-white/50"
            placeholder="Enter email or wallet address"
            required
          />
        </div>
        <div className="space-y-2">
          <Label 
            htmlFor="product" 
            className="text-sm font-medium tracking-wide text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
          >
            Product
          </Label>
          <Select
            value={formData.product}
            onValueChange={(value) => setFormData({ ...formData, product: value })}
          >
            <SelectTrigger 
              className="h-12 text-white transition-all duration-200 border rounded-lg shadow-inner bg-white/10 border-white/20 backdrop-blur-sm focus:bg-white/20 focus:border-white/30 placeholder:text-white/50"
            >
              <SelectValue placeholder="Select a product" />
            </SelectTrigger>
            <SelectContent className="border bg-white/10 backdrop-blur-md border-white/20">
              {productOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/20">
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
            className="h-5 w-5 border-2 border-white/30 data-[state=checked]:border-white/50 data-[state=checked]:bg-white/20 transition-colors duration-200"
          />
          <Label 
            htmlFor="isAdmin" 
            className="text-sm font-medium tracking-wide text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
          >
            Is Admin
          </Label>
        </div>
        <div className="space-y-2">
          <Label 
            htmlFor="password" 
            className="text-sm font-medium tracking-wide text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="h-12 text-white transition-all duration-200 border rounded-lg shadow-inner bg-white/10 border-white/20 backdrop-blur-sm focus:bg-white/20 focus:border-white/30 placeholder:text-white/50"
            placeholder="Enter password"
            required
          />
        </div>
      </div>
      <Button 
        type="submit" 
        className="w-full h-12 font-medium tracking-wide text-white transition-all duration-200 border rounded-lg shadow-lg bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 backdrop-blur-sm border-white/20 hover:border-white/30"
      >
        Submit
      </Button>
    </form>
  )
}