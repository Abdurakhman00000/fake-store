import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const { id } = params;

    try {
        if (!id) {
            return NextResponse.json({ message: "ID is required" }, { status: 400 });
        }

        const deletedItem = await prisma.item.delete({
            where: {
                id: parseInt(id), 
            }
        });

        return NextResponse.json({ message: "Item deleted successfully", deletedItem }, { status: 200 });
    } catch (error) {
        console.error("Error deleting item:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};
