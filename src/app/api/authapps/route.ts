import { Zap, Sparkles, Atom, Flame, Bolt, Cloud } from 'lucide-react';
import { NextResponse } from 'next/server';

interface Product {
  id: number
  name: string
  description: string
  price: number
  icon: number
  requireAdmin?: boolean
}

const icons = [Zap, Sparkles, Atom, Flame, Bolt, Cloud]

// TODO: Add this to database
const products: Product[] = [
  { id: 1, name: "Electric Boost", description: "Supercharge your day", price: Math.floor(Math.random() * 100) + 1, icon: Math.floor(Math.random() * icons.length), requireAdmin: true },
  { id: 2, name: "Neon Surge", description: "Illuminate your potential", price: Math.floor(Math.random() * 100) + 1, icon: Math.floor(Math.random() * icons.length), requireAdmin: true },
  { id: 3, name: "Volt Vibe", description: "Feel the energy", price: Math.floor(Math.random() * 100) + 1, icon: Math.floor(Math.random() * icons.length), requireAdmin: true },
  { id: 4, name: "Plasma Pulse", description: "Electrify your senses", price: Math.floor(Math.random() * 100) + 1, icon: Math.floor(Math.random() * icons.length), requireAdmin: true },
  { id: 5, name: "Thunder Thrill", description: "Experience the power", price: Math.floor(Math.random() * 100) + 1, icon: Math.floor(Math.random() * icons.length) },
  { id: 6, name: "Spark Sync", description: "Connect with intensity", price: Math.floor(Math.random() * 100) + 1, icon: Math.floor(Math.random() * icons.length) },
]

export async function GET(request: Request) {
  // Example data
  const adminAccounts = process.env.ADMIN_ACCOUNTS?JSON.parse(process.env.ADMIN_ACCOUNTS.replaceAll("'","\"")):[]

  // If you want to handle query parameters
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('id');

  if (userId) {
    if(adminAccounts.find((account:string) => account.toLowerCase() === userId.toLowerCase() )){
      return NextResponse.json(products.filter(product => product.requireAdmin));
    }
  }

  // Return all users if no query params
  return NextResponse.json(products.filter(product => !product.requireAdmin));
}
