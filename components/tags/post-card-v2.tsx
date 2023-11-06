import React from "react";
import {
     Card,
     CardContent,
     CardDescription,
     CardFooter,
     CardHeader,
     CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Bookmark, CalendarDays, Check, Eye, Heart, MessageCircle, MoreHorizontal, Share, User } from "lucide-react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UserHoverCard from "../user-hover-card";
import { Icons } from "../icon";
import TagBadge from "../tags/tag";
import { dateFormat } from "@/lib/format-date";
import ShareList from "../share-list";
import { handlePostSave } from "../bookmark";
import { usePathname } from "next/navigation";
import { getSessionUser } from "../get-session";
import { formatNumberWithSuffix } from "../format-numbers";
import { handlePostLike } from "../like";


export default function PostCard(
     props: React.ComponentPropsWithoutRef<typeof Card> & {
          post: any;
          session: any;
          user?: boolean,
     }
) {
     const pathname = usePathname();
     const save = async (postId: number) => {
          await handlePostSave({ postId, path: pathname });
     }
     const like = async (postId: number) => {
          await handlePostLike({ postId, path: pathname });
     }
     const isSaved = props.post?.savedUsers?.some((savedUser: any) => savedUser.userId === props.session?.id);
     return (
          <Card {...props} className="feedArticleCard bg-background max-h-72 w-full border-none shadow-none my-4">
               <CardContent className="p-0">
                    <CardHeader className={cn("pt-4 pb-3 md:pt-6 px-0 gap-y-4")}>
                         <div className="flex items-center space-x-1">
                              {
                                   !props.user && (
                                        <>
                                             <UserHoverCard user={props.post.author} >
                                                  <Link href={`/${props.post.author?.username}`} className="flex items-center space-x-0.5">
                                                       <Avatar className="h-5 w-5 mr-0.5">
                                                            <AvatarImage src={props.post.author?.image} alt={props.post.author?.username} />
                                                            <AvatarFallback>{props.post.author?.name?.charAt(0) || props.post.author?.username?.charAt(0)}</AvatarFallback>
                                                       </Avatar>
                                                       <p className="text-sm font-normal leading-none">{props.post.author?.name || props.post.author?.username}</p>
                                                       {props.post.author?.verified && (
                                                            <Icons.verified className="h-3 w-3 inline fill-primary align-middle" />
                                                       )}
                                                  </Link>
                                             </UserHoverCard>
                                             <span className="!text-muted-foreground text-sm mx-1 md:mx-1.5">·</span>
                                        </>
                                   )
                              }
                              {
                                   props.user && (
                                        props.session.id === props.post.author?.id && (
                                             <Badge variant={"outline"} className="text-xs font-normal capitalize mr-1">
                                                  {props.post.visibility}
                                             </Badge>
                                        )
                                   )
                              }
                              <span className="!text-muted-foreground text-sm">
                                   {dateFormat(props.post.createdAt)}
                              </span>
                         </div>
                    </CardHeader>
                    <div className="flex">
                         <div className="flex-initial w-full">
                              <Link href={props.post.visibility === 'draft' ? `/editor/${props.post.url}` : `/${props.post.author?.username}/${props.post.url}`}>
                                   <div>
                                        <div className="pb-2">
                                             <h2 className={`text-base md:text-xl font-bold text-ellipsis overflow-hidden ${props.user ? "line-clamp-2" : "line-clamp-3"}`}>{props.post.title}</h2>
                                        </div>
                                        <div className="post-subtitle hidden md:block">
                                             <p className={`text-ellipsis overflow-hidden line-clamp-3 text-muted-foreground`}>{props.post.subtitle}</p>
                                        </div>
                                   </div>
                              </Link>
                              <div className="hidden py-8 lg:block">
                                   <div className="flex justify-between items-center">
                                        <div className="flex flex-1 items-center space-x-2.5">
                                             {
                                                  props.post.tags?.length > 0 && (
                                                       <Link href={`/tags/${props.post.tags[0].tag?.name}`} key={props.post.tags[0].tag?.id}>
                                                            <TagBadge variant={"secondary"} className="flex">
                                                                 {
                                                                      //replace - with space
                                                                      props.post.tags[0].tag?.name.replace(/-/g, " ")
                                                                 }
                                                            </TagBadge>
                                                       </Link>
                                                  )
                                             }
                                             <p className="card-text mb-0 py-0.5 text-muted-foreground text-xs">{props.post.readingTime}</p>
                                        </div>
                                        <div className="stats flex items-center justify-around gap-1">
                                             <div className="flex items-center space-x-1 text-muted-foreground text-sm feedpost__action-btn">
                                                  <Button variant="ghost" size={"icon"} className=" text-muted-foreground">
                                                       <Bookmark className={`h-5 w-5 ${isSaved && 'fill-current'}`} strokeWidth={2} onClick={() => save(props.post.id)} />
                                                  </Button>
                                             </div>
                                             <div className="flex items-center space-x-1 text-muted-foreground text-sm feedpost__action-btn">
                                                  <Button variant="ghost" size={"icon"} className=" text-muted-foreground">
                                                       <ShareList url={props.post.url} text={props.post.title}>
                                                            <MoreHorizontal className="h-5 w-5" />
                                                       </ShareList>
                                                  </Button>
                                             </div>
                                        </div>
                                   </div>
                              </div>

                         </div>

                         <div className="flex-none ml-6 md:ml-8">
                              <Link href={`/${props.post.author?.username}/${props.post.url}`}>
                                   <div className={`h-14 md:h-28 !relative !pb-0 ${props.user ? "aspect-[8/5]" : "aspect-[8/5]"}`} >
                                        {props.post.cover ? (
                                             <Image
                                                  src={props.post.cover}
                                                  fill
                                                  alt={props.post.title}
                                                  className="object-cover w-full"
                                             />
                                        ) : (
                                             <Icons.noThumbnail className="w-full h-full" />
                                        )}
                                   </div>
                              </Link>
                         </div>
                    </div>
                    <div className="py-4 lg:hidden">
                         <div className="flex justify-between items-center">
                              <div className="flex flex-1 items-center space-x-2.5">
                                   {
                                        props.post.tags?.length > 0 && (
                                             <Link href={`/tags/${props.post.tags[0].tag?.name}`} key={props.post.tags[0].tag?.id}>
                                                  <TagBadge variant={"secondary"} className="flex">
                                                       {
                                                            //replace - with space
                                                            props.post.tags[0].tag?.name.replace(/-/g, " ")
                                                       }
                                                  </TagBadge>
                                             </Link>
                                        )
                                   }
                                   <p className="card-text mb-0 py-0.5 text-muted-foreground text-xs">{props.post.readingTime}</p>
                              </div>
                              <div className="stats flex items-center justify-around gap-1">
                                   <div className="flex items-center space-x-1 text-muted-foreground text-sm feedpost__action-btn">
                                        <Button variant="ghost" size={"icon"} className=" text-muted-foreground">
                                             <Bookmark className={`h-5 w-5 ${isSaved && 'fill-current'}`} strokeWidth={2} onClick={() => save(props.post.id)} />
                                        </Button>
                                   </div>
                                   <div className="flex items-center space-x-1 text-muted-foreground text-sm feedpost__action-btn">
                                        <Button variant="ghost" size={"icon"} className=" text-muted-foreground">
                                             <ShareList url={props.post.url} text={props.post.title}>
                                                  <MoreHorizontal className="h-5 w-5" />
                                             </ShareList>
                                        </Button>
                                   </div>
                              </div>
                         </div>
                    </div>
               </CardContent>
          </Card>
     );
}

