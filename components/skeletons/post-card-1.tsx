import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function PostCardSkeletonV2(
     { className, ...props }: React.ComponentPropsWithoutRef<typeof Card> & { className?: string; }
) {
     return (
          <Card {...props} className={cn('rounded-lg feedArticleCard bg-transparent border-none shadow-none md:pb-14', className)}>
               <CardContent className="md:p-6 p-2 md:px-4 h-full">
                    <div className="flex flex-col grid-cols-12 gap-y-8 items-start h-full pb-6">
                         <div className="w-full">
                              <div className="w-full h-auto bg-muted !relative !pb-0 aspect-[2/1]" >
                                   <Skeleton className="w-full h-full rounded-lg" />
                              </div>
                         </div>
                         <div className="col-span-12 flex flex-col justify-between space-y-4 h-full w-full">
                              <div className="flex items-center gap-1.5">
                                   <Skeleton className="w-5 h-5 rounded-full" />
                                   <Skeleton className="w-20 h-5" />
                              </div>
                              <div className="flex">
                                   <div className="flex-initial w-full">
                                        <div>
                                             <div className="pb-2">
                                                  <Skeleton className="w-full h-6" />
                                                  <Skeleton className="w-full h-6" />
                                             </div>
                                             <div className="post-subtitle hidden md:block">
                                                  <Skeleton className="w-full h-5" />
                                                  <Skeleton className="w-full h-5" />
                                                  <Skeleton className="w-full h-5" />
                                             </div>
                                        </div>
                                   </div>
                              </div>
                              <div className="">
                                   <Skeleton className="w-16 h-5" />
                              </div>
                         </div>
                    </div>
               </CardContent>
          </Card>
     )
}