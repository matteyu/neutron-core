import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Parse the JSON data from the request body
    const body = await request.json();

    // Destructure the incoming data
    const { email, address, isAdmin, products, password } = body;

    // Validate the required fields
    if (!email) {
      return NextResponse.json(
        { error: "Email is a required field." },
        { status: 400 }
      );
    }

    if (!address) {
      return NextResponse.json(
        { error: "Address is a required field." },
        { status: 400 }
      );
    }

    if (!password) {
        return NextResponse.json(
          { error: "Password is a required field." },
          { status: 400 }
        );
      }

    // Validate the `products` array if provided
    if (products && !Array.isArray(products)) {
      return NextResponse.json(
        { error: "Products must be an array of product objects." },
        { status: 400 }
      );
    }
    const foundProducts = await prisma.product.findMany({
      where: {
        name: {
          in: products,
        },
      },
    });
    if (products.length !== foundProducts.length) {
        throw new Error('Some products in the provided list do not exist');
      }
      
    // Create the user with optional products using Prisma
    const newUser = await prisma.user.create({
        data: {
            email,
            address,
            isAdmin,
            products: {
              connect: foundProducts.map((product) => ({ id: product.id })),
            },
          },
          include: {
            products: true,
          },
    });

    return NextResponse.json(
      { message: "User created successfully.", user: newUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error adding user:", error);

    // Handle unique constraint errors
    if (error.code === "P2002") {
      return NextResponse.json(
        {
          error: `A user with the provided ${
            error.meta.target.includes("email") ? "email" : "address"
          } already exists.`,
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "An error occurred while creating the user." },
      { status: 500 }
    );
  }
}
