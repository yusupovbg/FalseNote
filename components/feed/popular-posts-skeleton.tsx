import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default async function PopularPostsSkeleton() {

  return (<Card className="feed__content_featured_card bg-background border-none shadow-none">
        <CardHeader className="py-4 px-0">
          <CardTitle className="feed__content_featured_card_title text-base">
            <Skeleton className="h-6 w-20" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ol className="flex flex-col items-start justify-between space-y-4">
            <li className="text-sm space-y-2.5">

              <div className="flex items-center mb-2">
                <Skeleton className="h-5 w-5 mr-1 md:mr-1.5" />
                <Skeleton className="w-28 h-3.5" />
              </div>


              <div className="text-base font-bold space-y-1.5">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
            </li>
            <li className="text-sm space-y-2.5">

              <div className="flex items-center mb-2">
                <Skeleton className="h-5 w-5 mr-1 md:mr-1.5" />
                <Skeleton className="w-28 h-3.5" />
              </div>


              <div className="text-base font-bold space-y-1.5">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
            </li>
            <li className="text-sm space-y-2.5">

              <div className="flex items-center mb-2">
                <Skeleton className="h-5 w-5 mr-1 md:mr-1.5" />
                <Skeleton className="w-28 h-3.5" />
              </div>


              <div className="text-base font-bold space-y-1.5">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>)
}
