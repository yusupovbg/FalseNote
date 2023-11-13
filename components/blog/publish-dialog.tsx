import { Post, User } from "@prisma/client";
import React from "react";
import {
     Dialog,
     DialogClose,
     DialogContent,
     DialogDescription,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
} from "@/components/ui/dialog"
import { Button, buttonVariants } from "../ui/button";
import { Icons } from "../icon";
import { Facebook, Link2, Linkedin } from "lucide-react";
import { LinkedInLogoIcon, FaceIcon, Cross2Icon } from "@radix-ui/react-icons";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from "next-share";
import { cn } from "@/lib/utils";
import { toast } from "../ui/use-toast";


export default function PublishDialog({ post, user, ...props }: { post: Post, user: User } & React.ComponentPropsWithoutRef<typeof Dialog>) {
     const copylink = (link: string) => {
          navigator.clipboard.writeText(link)
          toast({
               description: 'Copied to clipboard',
          })
     }
     const url = `https://falsenotes.netlify.app/${user.username}/${post.url}`
     const text = `Check out my new post:\n${post.title}`
     return (
          <>
               <Dialog {...props} >
                    <DialogContent>
                         <DialogHeader className="!text-center">
                              <DialogTitle>Your post is published!</DialogTitle>
                              <DialogDescription>
                                   Your post is now published and live on your profile. You can share it with the world now!
                              </DialogDescription>
                         </DialogHeader>
                         <div className="flex flex-col items-center gap-2 w-56 mx-auto my-5">
                              <TwitterShareButton
                                   url={url}
                                   title={text}
                                   style={{ width: '100%' }}
                              >
                                   <div className={cn('flex justify-between w-full gap-2 !px-4', buttonVariants({ variant: 'outline', size: 'lg' }))}>
                                        <Icons.twitter className="h-5 w-5 fill-current stroke-none" />
                                        <span className="w-full">Share on Twitter</span>
                                        <div className="h-5 w-5 fill-current stroke-none" />
                                   </div>
                              </TwitterShareButton>
                              <FacebookShareButton
                                   url={url}
                                   quote={text}
                                   style={{ width: '100%' }}
                              >
                                   <div className={cn('flex justify-between w-full gap-2 !px-4', buttonVariants({ variant: 'outline', size: 'lg' }))}>
                                        <Facebook className="h-5 w-5 fill-current stroke-none" />
                                        <span className="w-full">Share on Facebook</span>
                                        <div className="h-5 w-5 fill-current stroke-none" />
                                   </div>
                              </FacebookShareButton>
                              <LinkedinShareButton
                                   url={url}
                                   style={{ width: '100%' }}
                              >
                                   <div className={cn('flex justify-between w-full gap-2 !px-4', buttonVariants({ variant: 'outline', size: 'lg' }))}>
                                        <Linkedin className="h-5 w-5 fill-current stroke-none" />
                                        <span className="w-full">Share on LinkedIn</span>
                                        <div className="h-5 w-5 fill-current stroke-none" />
                                   </div>
                              </LinkedinShareButton>
                              <Button onClick={() => copylink(url)} variant={'outline'} size={'lg'} className="w-full justify-between gap-2 !px-4" >
                                   <Link2 className="h-5 w-5" />
                                   <span className="w-full">Copy link</span>
                                   <div className="h-5 w-5 fill-current stroke-none" />
                              </Button>
                         </div>
                    </DialogContent>
               </Dialog>

          </>
     )
}