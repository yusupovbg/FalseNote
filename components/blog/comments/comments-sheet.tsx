import {
     Sheet,
     SheetContent,
     SheetDescription,
     SheetHeader,
     SheetTitle,
     SheetTrigger,
} from "@/components/ui/sheet"

import React, { useEffect, useState } from "react";
import CommentForm from "./comment-form";
import UserHoverCard from "@/components/user-hover-card";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Markdown from "markdown-to-jsx";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import useWindowDimensions from "@/components/window-dimensions";
import { Icons } from "@/components/icon";
import CommentCard from "./comment-card";

const formatDate = (dateString: string | number | Date) => {
     const date = new Date(dateString)
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentDay = currentDate.getDate()
  const currentHour = currentDate.getHours()
  const currentMinute = currentDate.getMinutes()
  const currentSecond = currentDate.getSeconds()

  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const dayDifference = currentDay - day
  const hourDifference = currentHour - hour
  const minuteDifference = currentMinute - minute
  const secondDifference = currentSecond - second

  //when posted ex: 1 hour ago 1 day ago
  if (dayDifference === 0) {
    if (hourDifference === 0) {
      if (minuteDifference === 0) {
        return `${secondDifference}s`
      }
      return `${minuteDifference}m`
    }
    return `${hourDifference}h`
  }
  //if more than 30 days ago, show date ex: Apr 4, 2021
  if (dayDifference > 30) {
    if (year !== currentYear) {
      return `${date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })}`
    }
    return `${date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })}`
  } else {
    return `${dayDifference}d`
  }
}

export default function CommentsSheet({ post, comments, children, session, ...props }: React.ComponentPropsWithoutRef<typeof Sheet> & { post: any, comments: any, children: React.ReactNode, session: any }) {
     const [commentsRef, setComments] = React.useState<any>(comments);
     useEffect(() => {
          setComments(comments);
     }, [comments])

     const { width, height } = useWindowDimensions();

     return (
          <Sheet {...props}>
               <SheetTrigger asChild>{children}</SheetTrigger>
               <SheetContent className="p-0 md:w-[500px] md:h-full h-3/4 md:rounded-none rounded-md" side={width ? (width <= 640 ? "bottom" : "right") : "right"}>
                    <ScrollArea className="flex flex-col p-6 w-full h-full">
                    <SheetHeader>
                         <SheetTitle>Comments</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col">
                         <CommentForm session={session} post={post} />
                         <div className="article__comments-list divide-y my-4">
                              {
                                   commentsRef?.map((comment: any) => (
                                        <div className="article__comments-item flex gap-3 space-y-3" key={comment.id}>
                                             <CommentCard comment={comment} post={post} session={session} />
                                        </div>
                                   ))
                              }
                         </div>
                    </div>
                    </ScrollArea>
               </SheetContent>
          </Sheet>

     )
}