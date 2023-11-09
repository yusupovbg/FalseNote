'use server'
import postgres from "@/lib/postgres"
import { getSessionUser } from "./get-session-user"
import { revalidatePath } from "next/cache"

export const handlePostLike = async ({ postId, path} : {postId: number, path: string}) => {
     const sessionUser = await getSessionUser()
     if (!sessionUser) {
         console.log("No session user")
     }
     console.log(path, postId)
     try {
          const liked = await postgres.like.findFirst({
               where: {
                    postId,
                    authorId: Number(sessionUser?.id)
               }
          })

          if (liked) {
               await postgres.like.delete({
                    where: {
                         id: liked.id
                    }
               })
               console.log("unliked")
          } else {
               await postgres.like.create({
                    data: {
                         authorId: Number(sessionUser?.id),
                         postId
                    }
               })
               console.log("liked")
          }

          revalidatePath(path)
     } catch (error) {
          console.log(error)
     }
}

export const handleCommentLike = async ({ commentId, path} : {commentId: number, path: string}) => {
     const sessionUser = await getSessionUser()
     if (!sessionUser) {
          console.log("No session user")
     }
     console.log(path, commentId)
     try {
          const liked = await postgres.commentLike.findFirst({
               where: {
                    commentId,
                    authorId: Number(sessionUser?.id)
               }
          })

          if (liked) {
               await postgres.commentLike.delete({
                    where: {
                         id: liked.id
                    }
               })
               console.log("unliked")
          } else {
               await postgres.commentLike.create({
                    data: {
                         authorId: Number(sessionUser?.id),
                         commentId
                    }
               })
               console.log("liked")
          }

          revalidatePath(path)
     } catch (error) {
          console.log(error)
     }
}