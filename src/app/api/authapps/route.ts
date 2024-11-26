import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('id');

  let adminAccounts = process.env.ADMIN_ACCOUNTS?JSON.parse(process.env.ADMIN_ACCOUNTS.replaceAll("'","\"")):[]
  adminAccounts = adminAccounts.map((account: string) => account.toLowerCase())
  // Fetch products from the database
  const products = await prisma.product.findMany({
    where: { requireAdmin: Boolean(adminAccounts.includes(userId?.toLowerCase())) }
  });

  return NextResponse.json(products);
}