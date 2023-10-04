import React, { useEffect } from "react";
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
import { Icons } from "../icon";
import { useSession } from "next-auth/react";
import { Eye, Heart, MessageCircle } from "lucide-react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { getSessionUser } from "../get-session-user";


function formatDate(dateString: string | number | Date) {
  const date = new Date(dateString);
  const currentYear = new Date().getFullYear();
  const year = date.getFullYear();
  
  let formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  if (year !== currentYear) {
    formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }

  return formattedDate;
}


function PostCard(
  props: React.ComponentPropsWithoutRef<typeof Card> & {
    thumbnail?: string;
    title: string;
    content: string;
    author: string;
     date: string;
     views: string;
     comments: string;
     id: string;
     authorid: string;
     session: any;
     likes: string;
     url: string;
     posturl: string;
     deleted: boolean;
  }
) 
{
  function handleDelete() {
    fetch(`/api/posts/${props.session.username}/${props.posturl}`, {
      method: "DELETE",
    });
    props.deleted = true as boolean;
  }

  const [sessionUser, setSessionUser] = React.useState<any | null>(null);
  const { status } = useSession();

  useEffect(() => {
    async function fetchData() {
      if (status === "authenticated") {
        const sessionUser = (await getSessionUser());
        setSessionUser(sessionUser);
      }
    }

    fetchData();
  }, [status]);

  return (
    <ContextMenu>
  <div className="space-y-3 md:space-y-6">
  <ContextMenuTrigger className="">
    <Card {...props} className="rounded-lg bg-background hover:bg-card">
      <Link href={props.url}>
      <CardContent className="px-4 md:px-6 py-0">
      <CardHeader className={cn("py-4 md:py-6 px-0 gap-y-4")}>
        {props.thumbnail && (
          <AspectRatio ratio={16 / 9}>
            <Image
            src={props.thumbnail}
            fill
            alt={props.title}
            className="rounded-md
            object-cover
            w-full
            "
          />
          </AspectRatio>
        )}

        <CardTitle className="">{props.title}</CardTitle>
        <CardDescription className="text-base">
          {props.content && (
            props.content.length! > 200 ? (
              <>{props?.content?.slice(0, 200)}...</>
            ) : (
              <>{props.content}</>
            )
          )}
        </CardDescription>
      </CardHeader>
      <CardFooter className="px-0 justify-between">
        <p className="card-text inline mb-0 text-muted-foreground">{formatDate(props.date)}</p>
                  <div className="stats flex items-center gap-3">
                    
                    <p className="card-text inline mb-0 text-muted-foreground flex"><Eye className="mr-1" /> {props.views}</p>
                    <p className="card-text inline mb-0 text-muted-foreground flex"><MessageCircle className="mr-1" /> {props.comments}</p>
                    <p className="card-text inline mb-0 text-muted-foreground flex"><Heart className="mr-1" /> {props.likes}</p>
                  </div>
      </CardFooter>
      </CardContent>
      </Link>
    </Card>
    </ContextMenuTrigger>
  <ContextMenuContent>
    {Number(props.authorid) === Number(sessionUser?.userid) ? (
      <ContextMenuItem>
      <Link href={`/editor/${props.posturl}`}>
        Edit
      </Link>
      </ContextMenuItem>) : (  null )}
    {Number(props.authorid) === Number(sessionUser?.userid) ? (
      <ContextMenuItem onClick={handleDelete}>
        Delete
      </ContextMenuItem>) : (  null )}
    <ContextMenuItem>Save</ContextMenuItem>
    <ContextMenuItem>Share</ContextMenuItem>
  </ContextMenuContent>
  </div>
</ContextMenu>
  );
}

export default PostCard;
