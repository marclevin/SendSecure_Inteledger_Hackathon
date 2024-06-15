"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "$/src/server/db";
import { type Response } from "$/src/utils/types";
import { v4 as uuidv4 } from "uuid"; // Import uuid for unique IDs

export async function createCommunity(previousState: any, formData: FormData) {
    const response: Response = {
        success: true,
        message: "Community Successfully Created",
        data: {},
    };

    const id = formData.get("id")?.toString() ?? "";
    const imageUrl = `https://picsum.photos/id/${Math.floor(Math.random() * 1001)}/500/1000`;

    const communityData = {
        communityId: formData.get("communityId")?.toString() ?? uuidv4(), // Ensure unique communityId
        name: formData.get("name")?.toString() ?? "",
        about: formData.get("about")?.toString() ?? "",
        imageUrl: formData.get("imageUrl")?.toString() ?? imageUrl,
        public: formData.get("public") === "true", // Handle boolean value for 'public'
    };

    const { userId } = auth();

    if (!userId) {
        response.message = "Please sign in first";
        response.success = false;
        return response;
    }

    try {
        // Upsert the community
        const community = await db.community.upsert({
            where: {
                id: id,
            },
            update: communityData,
            create: {
                ...communityData,
                creator: { connect: { userId: userId } }, // Link creator to the user
                // creatorID is automatically managed by Prisma via creator relation
            },
        });

        return { ...response, data: community };

    } catch (error) {
        // Handle possible errors
        return {
            success: false,
            message: `Error creating community: ${error.message}`,
            data: {},
        };
    }
}
