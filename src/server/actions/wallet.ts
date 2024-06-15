"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "$/src/server/db";
import { type Response } from "$/src/utils/types";
import { v4 as uuidv4 } from "uuid"; // Import uuid for unique IDs

export async function createWallet(previousState: any, formData: FormData) {
    const response: Response = {
        success: true,
        message: "Wallet Successfully Created",
        data: {},
    };

    const id = formData.get("id")?.toString() ?? "";
    const imageUrl = `https://picsum.photos/id/${Math.floor(Math.random() * 1001)}/500/1000`;

    const walletData = {
        name: formData.get("name")?.toString() ?? "",
        walletAddress: formData.get("walletAddress")?.toString() ?? "",
        imageUrl: formData.get("imageUrl")?.toString() ?? imageUrl,
        balance: parseFloat(formData.get("balance")?.toString() ?? "0"), // Ensure balance is a float
        communityId: formData.get("communityId")?.toString() ?? "",
    };

    const { userId } = auth();

    if (!userId) {
        response.message = "Please sign in first";
        response.success = false;
        return response;
    }

    try {
        // Create or update the wallet
        const wallet = await db.essentialWallet.upsert({
            where: {
                id: id,
            },
            update: walletData,
            create: walletData,
        });

        return { ...response, data: wallet };

    } catch (error) {
        // Handle possible errors
        return {
            success: false,
            message: `Error creating wallet: ${error.message}`,
            data: {},
        };
    }
}
