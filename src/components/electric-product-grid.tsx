'use client'

import { ReactNode, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Zap, Atom, Flame, Bolt, Cloud, X } from 'lucide-react'
import { useWeb3Context } from "@/context/Web3Context"
import axios from "axios"
import { toast } from "@/hooks/use-toast"
import { CreateUserForm } from "./create-user-form"
import { ManageProductForm } from "./manage-product-form"
import { CreateProductForm } from "./create-product-form"
import { InvestorUploadForm } from "./investor-upload-form"

interface Product {
  id: number
  name: string
  description: string
  price: number
  icon: number
  requireAdmin?: boolean
}

const icons = [Zap, Sparkles, Atom, Flame, Bolt, Cloud]

interface FormData {
  emailOrWallet: string
  isAdmin: boolean
  password: string
}

export function ElectricProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { web3authContext, walletAddress } = useWeb3Context();
  const [products, setProducts] = useState<Product[]>([])

  const handleLaunch = (product: Product) => {
    setSelectedProduct(product)
  }

  const closeModal = () => {
    setSelectedProduct(null)
  }

  const handleFormSubmit = (data: FormData) => {
    console.log("Form submitted with data:", data)
    toast({
      title: "Success",
      description: "Form submitted successfully!",
    })
    closeModal()
  }

  useEffect(() => {
    (async () => {
      let userId;
      if(web3authContext){
        const userInfo = await web3authContext?.getUserInfo()
        userId = userInfo.email
      }
      if(walletAddress){
        userId = walletAddress
      }
      const res = await axios.get(`/api/authapps?id=${userId || "initial"}`)
      setProducts(res.data)
    })()
  }, [web3authContext, walletAddress])
  
  // TODO: get these component keys dynamically 
  const componentMap: Record<string, any> = {
    "Electric Boost": CreateUserForm,
    "Neon Surge": ManageProductForm,
    "Volt Vibe": CreateProductForm,
    "Plasma Pulse": InvestorUploadForm,
  }

  return (
    <div className="relative p-6 bg-electric-gradient sm:p-8 md:p-12 rounded-2xl">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const IconComponent = icons[product.icon]
          return (
            <Card key={product.id} className="card-electric">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-electric-title">
                  <Sparkles className="w-6 h-6 mr-2 text-blue-300" />
                  {product.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <IconComponent className="w-1/2 mb-4 text-blue-300 opacity-50 h-1/2" />
                <p className="text-center text-white font-semi-bold text-electric-body">{product.description}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <Button 
                  className="button-electric"
                  onClick={() => handleLaunch(product)}
                >
                  Launch
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="w-[50vw] p-8 mx-4 border shadow-2xl max-w-7xl bg-blue-900/90 backdrop-blur-md rounded-xl border-blue-400/30"
            onClick={(e) => e.stopPropagation()}
          >
            <Button 
              className="absolute w-8 h-8 p-0 text-blue-200 bg-transparent rounded-full hover:bg-blue-800/50 top-3 right-3"
              onClick={closeModal}
            >
              <X className="w-5 h-5" />
              <span className="sr-only">Close</span>
            </Button>
            {selectedProduct.name in componentMap ? (
              <div className="space-y-6">
                <div className="space-y-2 text-center">
                  <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-200 to-blue-100 bg-clip-text">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-lg text-blue-200/80">
                    {selectedProduct.description}
                  </p>
                </div>
                {[selectedProduct.name].map((componentKey, index) => {
                  const Component = componentMap[componentKey];
                  return Component ? <Component key={index} onSubmit={handleFormSubmit} /> : null;
                })}
              </div>
            ) : (
              <>
                <h2 className="mb-2 text-3xl font-bold text-transparent bg-gradient-to-r from-blue-200 to-blue-100 bg-clip-text">
                  {selectedProduct.name}
                </h2>
                <p className="mb-6 text-lg text-blue-200/80">
                  {selectedProduct.description}
                </p>
                <p className="mb-6 text-2xl font-bold text-blue-100">
                  {selectedProduct.price} kii
                </p>
                <Button className="w-full h-12 font-medium tracking-wide text-white transition-all duration-200 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-blue-900/50 hover:shadow-blue-400/50">
                  Confirm Launch
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}