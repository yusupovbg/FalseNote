"use client"
import {
     Avatar,
     AvatarFallback,
     AvatarImage,

} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuGroup,
     DropdownMenuItem,
     DropdownMenuLabel,
     DropdownMenuSeparator,
     DropdownMenuShortcut,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getUserByUsername } from "../get-user"

export function UserNav() {
     const [isLoading, setLoading] = useState(true)
     const { status } = useSession();
     const user = useSession().data?.user as any;
     return (
          <DropdownMenu>
               <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                         <Avatar className="h-8 w-8">
                              <AvatarImage src={user.image} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0) || user.username.charAt(0)}</AvatarFallback>
                         </Avatar>
                    </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                         <div className="flex flex-col space-y-1">
                              <p className="text-sm font-medium leading-none">{user.name || user.username}</p>
                              {
                                   user.email !== '' && (
                                        <p className="text-xs leading-none text-muted-foreground">
                                   {user.email}
                              </p>
                                   )
                              }
                         </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href={user.username !== null ?  `/${user.username}` : `/`}>
                         <DropdownMenuItem>
                              Profile
                              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                         </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                         <Link href="/settings/profile">
                              <DropdownMenuItem>
                                   Settings
                                   <DropdownMenuShortcut>⇧⌘,</DropdownMenuShortcut>
                              </DropdownMenuItem>
                         </Link>
                         <Link href="/signout">
                         <DropdownMenuItem>
                              
                              
                              
                              Log out
                              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                         </DropdownMenuItem>
                         </Link>
                    </DropdownMenuGroup>
               </DropdownMenuContent>
          </DropdownMenu>
     )
}
