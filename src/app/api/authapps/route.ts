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

export async function POST(request: Request) {
  try {
    // Parse the JSON data from the request body
    const body = await request.json();

    // Destructure the incoming data
    const { name, url, description, price } = body;

    // Validate the required fields
    if (!name) {
      return NextResponse.json(
        { error: "Product Name is a required field." },
        { status: 400 }
      );
    }

    if (!url) {
      return NextResponse.json(
        { error: "Product Url is a required field." },
        { status: 400 }
      );
    }

    if (!description) {
        return NextResponse.json(
          { error: "Production Description is a required field." },
          { status: 400 }
        );
      }

    // Create the user with optional products using Prisma
    const newProduct = await prisma.product.create({
        data: {
            name,
            url,
            description,
            price
          }
    });

    return NextResponse.json(
      { message: "Product created successfully.", product: newProduct },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error adding product:", error);

    return NextResponse.json(
      { error: "An error occurred while creating the product." },
      { status: 500 }
    );
  }
}