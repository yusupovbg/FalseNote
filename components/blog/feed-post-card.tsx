import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { BlurImage as Image } from "../image";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UserHoverCard from "../user-hover-card";
import { Icons } from "../icon";
import TagBadge from "../tags/tag";
import { dateFormat } from "@/lib/format-date";
import ShareList from "../share-list";
import { usePathname } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { shimmer, toBase64 } from "@/lib/image";
import { validate } from "@/lib/revalidate";
import PostAnalyticsDialog from "./post-analytics-dialog";


export default function FeedPostCard(
  props: React.ComponentPropsWithoutRef<typeof Card> & {
    post: any;
    session: any;
    className?: string;
  }
) {
  const pathname = usePathname();
  const save = async (postId: string) => {
    await fetch(`/api/post/${postId}/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    });
    await validate(pathname)
  }
  const isSaved = props.post?.savedUsers?.some((savedUser: any) => savedUser.userId === props.session?.id);
  return (
    <Card {...props} className={cn("rounded-lg feedArticleCard w-full", props.className)}>
      <CardContent className="py-0 px-4">
        <CardHeader className={cn("pt-4 pb-3 md:pt-6 px-0 gap-y-4")}>
          <div className="flex items-center space-x-1">
            <UserHoverCard user={props.post.author} >
              <Link href={`/@${props.post.author?.username}`} className="flex items-center space-x-0.5">
                <Avatar className="h-6 w-6 mr-0.5 border">
                  <AvatarImage src={props.post.author?.image} alt={props.post.author?.username} />
                  <AvatarFallback>{props.post.author?.name?.charAt(0) || props.post.author?.username?.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-sm font-normal leading-none">{props.post.author?.name || props.post.author?.username}</p>
                {props.post.author?.verified && (
                  <Icons.verified className="h-3 w-3 inline fill-primary align-middle" />
                )}
              </Link>
            </UserHoverCard>
            <span>·</span>
            <span className="!text-muted-foreground text-sm">
              {dateFormat(props.post.publishedAt)}
            </span>
          </div>
        </CardHeader>
        <div className="flex">
          <div className="flex-initial w-full">
            <Link href={`/@${props.post.author?.username}/${props.post.url}`}>
              <div>
                <div className="pb-2">
                  <h2 className="text-base md:text-xl font-bold text-ellipsis overflow-hidden post__title">{props.post.title}</h2>
                </div>
                <div className="post-subtitle hidden md:block">
                  <p className="text-ellipsis overflow-hidden line-clamp-3 text-muted-foreground">{props.post.subtitle}</p>
                </div>
              </div>
            </Link>
            <div className="hidden py-8 md:block">
              <div className="flex justify-between items-center">
                <div className="flex flex-1 items-center space-x-2.5">
                  {
                    props.post.tags?.length > 0 && (
                      <Link href={`/tags/${props.post.tags[0].tag?.name}`} key={props.post.tags[0].tag?.id}>
                        <TagBadge variant={"secondary"} className="flex">
                          {
                            props.post.tags[0].tag?.name.replace(/-/g, " ")
                          }
                        </TagBadge>
                      </Link>
                    )
                  }
                  <p className="card-text mb-0 py-0.5 text-muted-foreground text-xs">{props.post.readingTime}</p>
                </div>
                <div className="stats flex items-center justify-around gap-1">
                  {
                    props.session?.id === props.post.author.id && (
                      <div className="flex items-center space-x-1">
                        <PostAnalyticsDialog post={props.post} />
                      </div>
                    )

                  }
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size={"icon"} className="hover:text-primary text-muted-foreground">
                      <Icons.bookmark className={`h-5 w-5 ${isSaved && 'fill-current'}`} onClick={() => save(props.post.id)} />
                      <span className="sr-only">Save</span>
                    </Button>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size={"icon"} className="hover:text-primary text-muted-foreground">
                      <ShareList post={props.post.id} url={`${process.env.DOMAIN}/@${props.post.author.username}/${props.post.url}`} text={props.post.title}>
                        <div>
                          <MoreHorizontal className="h-5 w-5" />
                          <span className="sr-only">Share</span>
                        </div>
                      </ShareList>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

          </div>
          {props.post.cover && (
            <div className="flex-none ml-6 md:ml-8">
              <Link href={`/@${props.post.author?.username}/${props.post.url}`}>
                <div className="h-14 md:h-28 bg-muted !relative !pb-0 aspect-[4/3] md:aspect-square overflow-hidden rounded-md" >

                  <>
                    <Image
                      src={props.post.cover}
                      fill
                      placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(1920, 1080))}`}
                      alt={props.post.title}
                      className="object-cover max-w-full h-auto z-[1] rounded-md"

                    />
                    <Skeleton className="w-full h-full rounded-md" />
                  </>

                </div>
              </Link>
            </div>
          )}
        </div>
        <div className="py-4 md:hidden">
          <div className="flex justify-between items-center">
            <div className="flex flex-1 items-center space-x-2.5">
              {
                props.post.tags?.length > 0 && (
                  <Link href={`/tags/${props.post.tags[0].tag?.name}`} key={props.post.tags[0].tag?.id}>
                    <TagBadge variant={"secondary"} className="flex">
                      {
                        props.post.tags[0].tag?.name.replace(/-/g, " ")
                      }
                    </TagBadge>
                  </Link>
                )
              }
              <p className="card-text mb-0 py-0.5 text-muted-foreground text-xs">{props.post.readingTime}</p>
            </div>
            <div className="stats flex items-center justify-around gap-1">
              {
                props.session?.id === props.post.author.id && (
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <PostAnalyticsDialog post={props.post} />
                  </div>
                )

              }
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Button variant="ghost" size={"icon"} className="hover:text-primary text-muted-foreground">
                  <Icons.bookmark className={`h-6 w-6 ${isSaved && 'fill-current'}`} onClick={() => save(props.post.id)} />
                  <span className="sr-only">Save</span>
                </Button>
              </div>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Button variant="ghost" size={"icon"} className="hover:text-primary text-muted-foreground">
                  <ShareList url={`${process.env.DOMAIN}/@${props.post.author.username}/${props.post.url}`} post={props.post.id} text={props.post.title}>
                    <div>
                      <Icons.moreHorizontal className="h-6 w-6" />
                      <span className="sr-only">Share</span>
                    </div>
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

