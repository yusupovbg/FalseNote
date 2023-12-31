'use server'
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { getSessionUser } from "@/components/get-session-user";
import TagDetails from "@/components/tags/details";
import TagLatestPosts from "@/components/tags/latest-posts";
import TagPopularPosts from "@/components/tags/post";
import TagFollowers from "@/components/tags/users";
import { Separator } from "@/components/ui/separator";
import postgres from "@/lib/postgres";
import { getFollowersByTag } from "@/lib/prisma/tags";
import { redirect } from "next/navigation";

export default async function TagPage({ params }: { params: { tagname: string } }) {
     const tag = await postgres.tag.findFirst({
          where: {
               name: params.tagname
          },
          include: {
               followingtag: true,
               _count: { select: { posts: true, followingtag: true } }
          }
     })

     const popularPosts = await postgres.post.findMany({
          where: {
               published: true,
               tags: {
                    some: {
                         tagId: tag?.id
                    }
               }
          },
          include: {
               author: {
                    include: {
                         Followers: true,
                         Followings: true,
                    }
               },
               savedUsers: true,
               likes: true,
               _count: { select: { comments: true, likes: true, savedUsers: true, shares: true } },
          },
          orderBy: [
               { likes: { _count: 'desc' } },
               { comments: { _count: 'desc' } },
               { savedUsers: { _count: 'desc' } },
               { views: 'desc' },
               { createdAt: 'desc' }
          ],
          take: 8
     });
     const latestPosts = await postgres.post.findMany({
          where: {
               published: true,
               tags: {
                    some: {
                         tagId: tag?.id
                    }
               }
          },
          include: {
               author: {
                    include: {
                         Followers: true,
                         Followings: true,
                    }
               },
               _count: { select: { comments: true, likes: true, savedUsers: true, shares: true } },
               savedUsers: true,
          },
          orderBy: {
               createdAt: 'desc'
          },
          take: 5
     });
     if (!tag) redirect("/404");
     const session = await getSessionUser();

     const { followers } = await getFollowersByTag({ id: tag.id, limit: 5, session: session?.id });
     return (
          <>
               <div className="flex flex-col space-y-6 my-8">
                    <TagDetails tag={tag} tagFollowers={tag.followingtag} session={session} />
                    {popularPosts.length > 0 && (
                         <>
                              <Separator />
                              <TagPopularPosts posts={popularPosts} tag={tag} session={session} />
                         </>
                    )}
                    {
                         followers.length > 0 && (
                              <>
                                   <Separator />
                                   <TagFollowers followers={followers} tag={tag} session={session} />
                              </>
                         )
                    }
                    {
                         latestPosts.length > 0 && (
                              <>
                                   <Separator />
                                   <TagLatestPosts posts={latestPosts} tag={tag} session={session} />
                              </>
                         )
                    }
                    {
                         tag._count.posts === 0 && (
                              <EmptyPlaceholder>
                                   <EmptyPlaceholder.Icon name="post" strokeWidth={1.25} />
                                   <EmptyPlaceholder.Title>No posts found</EmptyPlaceholder.Title>
                                   <EmptyPlaceholder.Description>There is no posts related to this tag</EmptyPlaceholder.Description>
                              </EmptyPlaceholder>
                         )
                    }
               </div>
          </>
     )
}