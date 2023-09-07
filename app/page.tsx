import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 feed">
     <div className="feed__content">
     <div className="feed__empty">
        <div className="feed__empty_title">My Feed</div>
        <div className="feed__empty_subtitle">There either has been no new posts, or you don&apos;t follow anyone.</div>
        <div className="search feed__empty_search max-w-[500px]">
          <div className="search-container">
            <div className="search__form">
            <div className="input">
              <div className="input__icon">
                <Search className='search__form_icon' />
              </div>
              <Input placeholder="Search for people or tags" className="input__field !foucs-visible:ring-0 !focus-visible:ring-offset-0 !focus-visible:outline-none" />
            </div>
            </div>
          </div>
        </div>
        <div className="feed__empty_featured">
          
        </div>
      </div>
     </div>
    </main>
  )
}
