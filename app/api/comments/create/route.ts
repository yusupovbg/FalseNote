import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { post, content, author } = req.body;

    // Check if the required properties are present
    if (!post || !content || !author) {
      return res.status(400).json({ error: "Missing required data fields" });
    }

    const query = await sql`
      INSERT INTO comments (blogpostid, content, authorid)
      VALUES (${post}, ${content}, ${author})
      RETURNING *
    `;

    // Handle the result or send a response as needed

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
