import Link from "next/link";
import TagPostCard from "../tags/post-card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export default function RelatedPosts({ posts, post, session }: { posts: any, post: any, session: any }) {
     return (
          <>
               <div className="max-w-[680px] mx-auto">
                    <div className="md:mx-6 mx-2">
                         <h2 className="text-2xl font-medium">Recommended from FalseNotes</h2>
                         <div className="mt-14">
                              <div className="flex items-stretch flex-wrap">
                                   {
                                        posts?.map((post: any) => (
                                             <div className="w-full md:w-1/2" key={post.id}>
                                                  <TagPostCard post={post} session={session} />
                                             </div>
                                        ))
                                   }
                              </div>
                              <Separator className="mb-6" />
                                   <Button variant={"outline"} className="w-full md:w-max" size={"lg"} asChild>
                                        <Link href={`/feed`}>
                                             See more recommendations
                                        </Link>
                                   </Button>
                         </div>
                    </div>
               </div>
          </>
     )
}