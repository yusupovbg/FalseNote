"use server";
import { config } from "@/app/auth";
import postgres from "@/lib/postgres";
import { getServerSession } from "next-auth";
import { cache } from "react";

async function fetchSessionUser() {
  try {
    const session = await getServerSession(config);
    if (!session) {
      return null;
    }
    const { user } = session;
    const result = await postgres.user.findFirst({
      where: {
        image: user?.image,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        username: true,
      },
    });
     return result;
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
}

export const getSessionUser = cache(fetchSessionUser)