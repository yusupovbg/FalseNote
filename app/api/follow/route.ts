import { NextRequest } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: NextRequest) {
     try{
          const followeeId = request.nextUrl.searchParams.get("followeeId");
     const followerId = request.nextUrl.searchParams.get("followerId");

     if (!followeeId || !followerId) {
          return new Response("followeeId and followerId are required query parameters", { status: 400 });
     }

     const isFollowed = await sql`SELECT * FROM follows WHERE followeeId = ${followeeId} AND followerId = ${followerId}`;

     if (isFollowed.rowCount > 0) {
          await sql`DELETE FROM follows WHERE followeeId = ${followeeId} AND followerId = ${followerId}`;
     } else {
          await sql`INSERT INTO follows (followeeId, followerId) VALUES (${followeeId}, ${followerId})`;

          const { rows: followeeDetails } = await sql`SELECT * FROM users WHERE userid = ${followeeId}`;
          const { rows: followerDetails } = await sql`SELECT * FROM users WHERE userid = ${followerId}`;

          const message = `${followerDetails[0].username} is now following you`;
          const user_id = followeeId;
          const type = "follow";
          const created_at = new Date().toISOString();
          const read_at = null;
          const sender_id = followerId;

          await sql`
            INSERT INTO notifications (type, message, userid, createdat, readat, sender_id)
            VALUES (${type}, ${message}, ${user_id}, ${created_at}, ${read_at}, ${sender_id})
          `;
     }

     return new Response("followed", { status: 200 });
     } catch (error: any) {
          return new Response(error.message, { status: 500 });
     }
}