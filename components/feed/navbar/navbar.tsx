'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useInView } from "react-intersection-observer";
import { Plus } from "lucide-react";


export default function FeedTabs({ tabs, activeTab = 'foryou', children }: { tabs: any, activeTab?: string, children?: React.ReactNode }) {
     const [firstTab, inFView] = useInView();
     const [lastTab, inLView] = useInView();

     return (
          <>

               <div className="bg-background sticky top-[60px] z-10">
                    <div className="w-full h-full absolute insert-0 top-0">
                         <div className={`tab-shadow right-auto left-0 ${inFView && 'opacity-0'}`} style={
                              {
                                   transform: "scaleX(-1)",
                                   left: "-3%"
                              }
                         }></div>
                         <div className={`tab-shadow ${inLView && 'opacity-0'}`} style={{ right: "-3%" }}></div>
                    </div>
                    <Tabs defaultValue={activeTab} className="">
                         <ScrollArea className="w-full py-2">
                              <TabsList className="bg-transparent gap-2">
                                   <TabsTrigger asChild value="explore" ref={firstTab} className="bg-transparent">
                                        <Link href={`/explore`}><Plus className="h-5 w-5" /></Link>
                                   </TabsTrigger>
                                   <TabsTrigger value="foryou" className="bg-muted data-[state=active]:border data-[state=active]:border-foreground">
                                        <Link href={`/feed`}>For You</Link>
                                   </TabsTrigger>
                                   <Link href={`/feed?tab=following`}>
                                        <TabsTrigger value="following" className="bg-muted data-[state=active]:border data-[state=active]:border-foreground">
                                             Following
                                        </TabsTrigger>
                                   </Link>
                                   {tabs?.map((item: any, index: number) => (

                                        <Link href={`/feed?tab=${item.tag.name}`} key={item.tag.id}>
                                             <TabsTrigger value={item.tag.name} className="bg-muted data-[state=active]:border data-[state=active]:border-foreground capitalize">

                                                  {item.tag.name.replace(/-/g, " ")}

                                             </TabsTrigger></Link>

                                   ))}
                                   <TabsTrigger value="" ref={lastTab} className="bg-transparent w-3" disabled />
                              </TabsList>
                              <ScrollBar orientation="horizontal" />
                         </ScrollArea>

                         {children}
                    </Tabs>

               </div>
          </>
     );
}