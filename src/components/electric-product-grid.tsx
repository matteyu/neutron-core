'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Zap, Atom, Flame, Bolt, Cloud, X } from 'lucide-react'
import { useWeb3Context } from "@/context/Web3Context"
import axios from "axios"

interface Product {
  id: number
  name: string
  description: string
  price: number
  icon: number
  requireAdmin?: boolean
}
const icons = [Zap, Sparkles, Atom, Flame, Bolt, Cloud]
export function ElectricProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const { web3authContext, walletAddress } = useWeb3Context();
  const [products, setProducts] = useState<Product[]>([])

  const handleLaunch = (product: Product, event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    setModalPosition({ top: rect.top, left: rect.left, width: rect.width, height: rect.height })
    setSelectedProduct(product)
    setTimeout(() => setModalPosition({ top: 0, left: 0, width: 0, height: 0 }), 50)
  }

  const closeModal = () => {
    setSelectedProduct(null)
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
      if(userId){
        const res = await axios.get(`/api/authapps?id=${userId}`)
        setProducts(res.data)
      }
    })()
  }, [web3authContext, walletAddress])
  
  return (
    <div className="relative p-6 bg-gradient-to-br from-blue-900 via-blue-700 to-purple-800 sm:p-8 md:p-12 rounded-2xl">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const IconComponent = icons[product.icon]
          return (
            <Card key={product.id} className="transition-shadow duration-300 bg-blue-800 bg-opacity-50 border-2 border-blue-400 shadow-lg hover:shadow-blue-400/50">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-blue-100">
                  <Sparkles className="w-6 h-6 mr-2 text-blue-300" />
                  {product.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <IconComponent className="w-1/2 mb-4 text-blue-300 opacity-50 h-1/2" />
                <p className="text-center text-blue-200">{product.description}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                {/* <span className="text-xl font-bold text-blue-100">{product.price} kii</span> */}
                <Button 
                  className="px-4 py-2 font-bold text-white transition-colors duration-300 bg-blue-500 rounded-full shadow-lg hover:bg-blue-400 hover:shadow-blue-300/50"
                  onClick={(e) => handleLaunch(product, e)}
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="w-full max-w-2xl p-6 mx-4 transition-all duration-300 ease-out bg-blue-900 rounded-lg shadow-2xl"
            style={{
              position: 'fixed',
              top: modalPosition.top ? `${modalPosition.top}px` : '50%',
              left: modalPosition.left ? `${modalPosition.left}px` : '50%',
              width: modalPosition.width ? `${modalPosition.width}px` : 'calc(100% - 2rem)',
              height: modalPosition.height ? `${modalPosition.height}px` : 'auto',
              transform: modalPosition.top ? 'none' : 'translate(-50%, -50%)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Button 
              className="absolute text-blue-100 bg-transparent top-2 right-2 hover:bg-blue-800"
              onClick={closeModal}
            >
              <X className="w-6 h-6" />
              <span className="sr-only">Close</span>
            </Button>
            <h2 className="mb-4 text-3xl font-bold text-blue-100">{selectedProduct.name}</h2>
            {/* <div className="flex items-center justify-center mb-4">
              <selectedProduct.icon className="w-1/3 text-blue-300 h-1/3" />
            </div> */}
            <p className="mb-4 text-lg text-blue-200">{selectedProduct.description}</p>
            <p className="mb-4 text-2xl font-bold text-blue-100">{selectedProduct.price} kii</p>
            <Button className="w-full px-6 py-3 font-bold text-white transition-colors duration-300 bg-blue-500 rounded-full shadow-lg hover:bg-blue-400 hover:shadow-blue-300/50">
              Confirm Launch
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}