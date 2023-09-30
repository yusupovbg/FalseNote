//Post view page for a specific user (username) and post (url)
// Path: app/%28Main%29/%5Busername%5D/%5Burl%5D/page.tsx
// Compare this snippet from components/feed/feed.tsx:
"use client"
import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import {
     HoverCard,
     HoverCardContent,
     HoverCardTrigger,
} from "@/components/ui/hover-card"
import { CalendarDays, Check } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { getSessionUser } from "@/components/get-session-user"
import { useSession } from "next-auth/react"
import { Icons } from "@/components/icon"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/router"

const formatDate = (dateString: string | number | Date) => {
     const date = new Date(dateString)
     const currentYear = new Date().getFullYear()
     const year = date.getFullYear()
     const formattedDate = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour12: true,
     })
     if (year !== currentYear) {
          return date.toLocaleDateString("en-US", {
               year: "numeric",
               month: "short",
               day: "numeric",
               hour12: true,
          })
     }
     return formattedDate
}


export default function PostView({ params }: { params: { username: string, url: string } }) {
     const [post, setPost] = useState<any>(null)
     const [isLoaded, setIsLoaded] = useState<boolean>(false)
     const [isFollowing, setIsFollowing] = useState<boolean | null>(null)
     const [isFollowingLoading, setIsFollowingLoading] = useState<boolean>(false)
     const [sessionUser, setSessionUser] = useState<any>(null)
     const { status } = useSession()

     async function incrementPostViews() {
          const cookieName = `post_views_${params.username}_${params.url}`;
          const hasViewed = getCookie(cookieName);

          if (!hasViewed) {
          // Make an API request to increment the view count
          await fetch(`/api/posts/${params.username}/views/?url=${params.url}`, {
               method: "POST",
          });

          // Set a cookie to indicate that the post has been viewed
          const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day from now
          document.cookie = `${cookieName}=true; expires=${expirationDate.toUTCString()}; path=/`;
          }
     }

     useEffect(() => {
          async function fetchData() {
               try {
                    const postData = await fetch(`/api/posts/${params.username}?url=${params.url}`, {
                         method: "GET",
                    })
                    const post = await postData.json()
                    if (status === "authenticated") {
                         const followerId = (await getSessionUser()).userid;
                         setSessionUser(await getSessionUser())
                         setIsFollowing(post?.author?.followers.find((follower: any) => follower.followerid === followerId));
                    }
                    setPost(post)
                    setIsLoaded(true)
               } catch (error) {
                    console.error(error)
                    setIsLoaded(true)
               }
          }
          fetchData()
     }, [params.url, params.username, isFollowing, status])

     useEffect(() => {
          if (post) {
               incrementPostViews()
          }
     }, [post])

     async function handleFollow(followeeId: string) {
          if (status === "authenticated") {
               setIsFollowingLoading(true);
               try {
                    const followerId = (await getSessionUser()).userid;
                    await fetch(`/api/follow?followeeId=${followeeId}&followerId=${followerId}`, {
                         method: "GET",
                    });
               } catch (error) {
                    console.error(error);
               }
          } else {
               return null;
          }

     }

     if (!isLoaded) {
          return (
               <div className="w-full max-h-screen flex justify-center items-center bg-background" style={
                    {
                      minHeight: "calc(100vh - 192px)"
                    }
                  }>
                     <Icons.spinner className="h-10 animate-spin" />
                   </div>
          )
     }

     return (
          <>
               <div className="article">
                    <div className="xs:p-4 article__container">
                         <div className="article__header">
                              <h1 className="article__title">{post?.title}</h1>
                              <div className="article__meta">
                                   <HoverCard>
                                        <HoverCardTrigger asChild>
                                             <Button variant="link" className="px-0" asChild>
                                                  <Link href={`/${post?.author?.username}`}>
                                                       <Avatar className="article__author-avatar">
                                                            <AvatarImage src={post?.author?.profilepicture} alt={post?.author?.name} />
                                                            <AvatarFallback>{post?.author?.name ? post?.author?.name.charAt(0) : post?.author?.username.charAt(0)}</AvatarFallback>
                                                       </Avatar>
                                                  </Link>
                                             </Button>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="">
                                             <div className="flex space-x-4">
                                                  <Avatar className="h-14 w-14">
                                                       <AvatarImage src={post?.author?.profilepicture} alt={post?.author?.name} />
                                                       <AvatarFallback>{post?.author?.name ? post?.author?.name.charAt(0) : post?.author?.username.charAt(0)}</AvatarFallback>
                                                  </Avatar>
                                                  <div className="space-y-1">
                                                       <h4 className="text-sm font-semibold">{post?.author?.name || post?.author?.username} {post?.author?.verified && (<Badge className="h-3 w-3 !px-0"> <Check className="h-2 w-2 mx-auto" /></Badge>)}</h4>
                                                       <p className="text-sm">
                                                            {post?.author?.bio}
                                                       </p>
                                                       <div className="flex items-center pt-2">
                                                            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                                                            <span className="text-xs text-muted-foreground">
                                                                 Joined {formatDate(post?.author?.registrationdate)}
                                                            </span>
                                                       </div>
                                                  </div>
                                             </div>
                                        </HoverCardContent>
                                   </HoverCard>

                                   <div className="flex flex-col">
                                        <span className="article__author-name md:text-base text-sm">{post?.author?.name || post?.author?.username}
                                             {post?.author?.verified &&
                                                  (
                                                       <Badge className="h-4 w-4 ml-2 !px-0"> <Check className="h-3 w-3 mx-auto" /></Badge>
                                                  )}

                                             {
                                                  status === "authenticated" && sessionUser?.userid !== post?.author?.userid &&
                                                  (
                                                       <Button
                                                            variant="link"
                                                            className="py-0 h-6 px-3"
                                                            onClick={() => handleFollow(post?.authorId)}
                                                            disabled={isFollowingLoading}
                                                       >
                                                            {isFollowing ? "Unfollow" : "Follow"}
                                                       </Button>
                                                  )
                                             }


                                        </span>
                                        <span className="article__date">{post?.creationdate && formatDate(post?.creationdate)}</span>
                                   </div>
                              </div>
                         </div>

                         <Separator className="mt-8" />

                         <div className="article__content">
                              <div dangerouslySetInnerHTML={{ __html: post?.content }} className="markdown-body" />
                         </div>

                         <Separator className="my-8" />
                    </div>
               </div>
          </>
     )
}

function getCookie(name: string) {
     const cookies = document.cookie.split(";")
     for (const cookie of cookies) {
       const [cookieName, cookieValue] = cookie.split("=")
       if (cookieName.trim() === name) {
         return cookieValue
       }
     }
     return null
   }
