import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    const body = await request.json();
    const { title, price, image, description, color, size, category, rating } = body;

    try {
        const newData = {
            title: title,
            price: price,
            image: image,
            description: description,
            color: color,
            size: size,
            category: category,
            rating: rating,
            createdAt: new Date().toISOString(),
        }

        const data = await prisma.caitem.create({
            data: newData
        })
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}
