import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async () => {
    try {
        const data = await prisma.caitem.findMany();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching data:", error); 
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        await prisma.$disconnect(); 
    }
};
