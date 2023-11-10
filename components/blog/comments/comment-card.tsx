'use client'
import { Icons } from "@/components/icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import UserHoverCard from "@/components/user-hover-card";
import { dateFormat } from "@/lib/format-date";
import { Flag, Heart, MoreHorizontal, Pencil, Reply, Trash2 } from "lucide-react";
import Markdown from "markdown-to-jsx";
import Link from "next/link";
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuLabel,
     DropdownMenuSeparator,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react";
import { usePathname } from "next/navigation";
import { handleCommentLike } from "@/components/like";
import CommentDeleteDialog from "./delete-dialog";
import CommentEditorForm from "./comment-editor-form";
import ReplyForm from "./reply-form";
import { Separator } from "@/components/ui/separator";
import { formatNumberWithSuffix } from "@/components/format-numbers";


export default function CommentCard({ comment, post, session, ...props }: React.ComponentPropsWithoutRef<typeof Card> & { comment: any, post: any, session: any }) {
     const pathname = usePathname();
     const like = async (commentId: number) => {
          await handleCommentLike({ commentId, path: pathname });
     }
     const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
     const isLiked = comment.likes?.find((like: any) => like.authorId === session?.id)
     const [isReplying, setIsReplying] = React.useState<boolean>(false)
     const [isEditing, setIsEditing] = React.useState<boolean>(false)
     const [openReply, setOpenReply] = React.useState<boolean>(false)
     return (
          <div className="flex flex-col w-full">
               {
                    !isEditing ? (
                         <>
                              <Card className="article__comments-item-card w-full bg-background border-none shadow-none">
                                   <CardHeader className="space-y-0 w-full text-sm flex-row items-center p-4 px-0">
                                        <div className="flex justify-between w-full">
                                             <div className="w-full flex">
                                                  <UserHoverCard user={comment.author} className="h-6 w-6 mr-1 md:mr-1.5" >
                                                       <Link href={`/${comment.author.username}`} className="inline-block">
                                                            <Avatar className="h-6 w-6">
                                                                 <AvatarImage src={comment.author.image} alt={comment.author.name} />
                                                                 <AvatarFallback>{comment.author.name ? comment.author.name.charAt(0) : comment.author.username.charAt(0)}</AvatarFallback>
                                                            </Avatar>
                                                       </Link>
                                                  </UserHoverCard>
                                                  <Link href={`/${comment.author.username}`} className="flex items-center">
                                                       <span className="article__comments-item-author text-sm">{comment.author.name || comment.author.username}</span>
                                                       {comment.author?.verified &&
                                                            (
                                                                 <Icons.verified className="h-4 w-4 mx-1 inline fill-primary align-middle" />
                                                            )}
                                                       {comment.author?.id === post?.authorId && (
                                                            <Badge className="ml-1 text-[10px] py-0">Author</Badge>
                                                       )}
                                                  </Link>
                                                  <span className="mx-1.5 !mt-0 text-sm">·</span>
                                                  <span className="article__comments-item-date text-muted-foreground text-sm !mt-0">{dateFormat(comment.createdAt)}</span>
                                             </div>
                                             {
                                                  session?.id === post.authorId && (
                                                       session?.id !== comment.authorId && (
                                                            (
                                                                 <DropdownMenu>
                                                                      <DropdownMenuTrigger>
                                                                           <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                                                                      </DropdownMenuTrigger>
                                                                      <DropdownMenuContent align="end">
                                                                           <DropdownMenuItem className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                                                                                onSelect={() => setShowDeleteAlert(true)} >
                                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                                <span>Delete</span>
                                                                           </DropdownMenuItem>
                                                                      </DropdownMenuContent>
                                                                 </DropdownMenu>

                                                            )
                                                       )
                                                  )
                                             }
                                             {
                                                  session?.id === comment.authorId && (
                                                       <DropdownMenu>
                                                            <DropdownMenuTrigger>
                                                                 <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                 <DropdownMenuItem onClick={() => setIsEditing(true)} >
                                                                      <Pencil className="mr-2 h-4 w-4" />
                                                                      <span>Edit</span>
                                                                 </DropdownMenuItem>
                                                                 <DropdownMenuItem className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                                                                      onSelect={() => setShowDeleteAlert(true)} >
                                                                      <Trash2 className="mr-2 h-4 w-4" />
                                                                      <span>Delete</span>
                                                                 </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                       </DropdownMenu>

                                                  )
                                             }
                                        </div>
                                   </CardHeader>
                                   <CardContent className="p-4 pt-0 px-0">

                                        <div className="article__comments-item-body text-sm prose-neutral markdown-body dark:prose-invert prose-img:rounded-xl prose-a:text-primary prose-code:bg-muted prose-pre:bg-muted prose-code:text-foreground prose-pre:text-foreground !max-w-full prose lg:prose-xl">
                                             <Markdown>{comment.content}</Markdown>
                                        </div>
                                   </CardContent>
                                   <CardFooter className="flex-row items-center justify-between p-4 px-0">
                                        <div className="flex items-center space-x-2">
                                             <div className="flex items-center">
                                                  <Button className="h-10 w-10 mr-0.5" size={"icon"} variant={"ghost"} disabled={session.id == comment.authorId} onClick={() => like(comment.id)} >
                                                       <Heart className={`w-5 h-5 ${isLiked && 'fill-current'}`} strokeWidth={2} />
                                                  </Button>
                                                  <span className="text-sm">{formatNumberWithSuffix(comment?._count?.likes)}</span>
                                             </div>
                                             {
                                                  comment?.replies?.length > 0 && (
                                                       <div className="flex items-center">
                                                            <Button className="h-10 w-10 mr-0.5" size={"icon"} variant={"ghost"} onClick={() => setOpenReply(!openReply)} >
                                                                 <Reply className="w-5 h-5" strokeWidth={2} />
                                                            </Button>
                                                            <span className="text-sm">{comment?._count.replies}</span>
                                                       </div>
                                                  )
                                             }
                                        </div>
                                        <div className="flex items-center">
                                             <Button className="mr-0.5" variant={"ghost"} onClick={() => setIsReplying(!isReplying)} >
                                                  Reply
                                             </Button>
                                        </div>
                                   </CardFooter>
                              </Card>
                              {
                                   openReply && (
                                        <div className="flex w-full justify-between">
                                             <Separator orientation="vertical" className="mx-3.5 w-0.5" />
                                             <div className="w-full">
                                                  {
                                                       comment?.replies?.map((reply: any) => (
                                                            <CommentCard key={reply.id} comment={reply} post={post} session={session} />
                                                       ))
                                                  }
                                             </div>
                                        </div>

                                   )
                              }
                         </>
                    ) : (
                         <CommentEditorForm
                              data={comment}
                              post={post}
                              session={session}
                              onCancel={() => setIsEditing(false)}
                              onUpdate={() => setIsEditing(false)}
                         />
                    )
               }
               {isReplying && (
                    <div className="flex w-full justify-between">
                         <Separator orientation="vertical" className="mx-3.5 w-0.5" />
                         <ReplyForm
                              comment={comment}
                              post={post}
                              session={session}
                              onCanceled={() => setIsReplying(false)}
                              onReplied={() => setIsReplying(false)}
                         />
                    </div>
               )}
               <CommentDeleteDialog comment={comment} user={session} open={showDeleteAlert} onOpenChange={setShowDeleteAlert} />
          </div>
     )
}