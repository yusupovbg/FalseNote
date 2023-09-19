import type { Metadata } from 'next'

type Props = {
     params: { username: string }
     children: React.ReactNode
   }
 
export async function generateMetadata(
     { params }: Props
   ): Promise<Metadata> {   
    try{
      const encodedString = params.username.replace(/ /g, "%20");
       const response = await fetch(`${process.env.DOMAIN}/api/users/${encodedString}`);
       if (!response.ok) {
         throw new Error(`Error fetching user data: ${response.statusText}`);
       }
       const data = await response.json();  
        const user = data.user;
      return {
        title: `${user.username} | FalseNotes`,
        description: `${user?.username} has ${user?.postsnum} posts. Follow their to keep up with their activity on FalseNotes.`,
        openGraph: {
          title: `${user.username} | FalseNotes`,
          description: `${user?.username} has ${user?.postsnum} posts. Follow their to keep up with their activity on FalseNotes.`,
          url: `${process.env.DOMAIN}/${user.username}`,
          images: [
            {
              url: `${process.env.DOMAIN}/api/users/${user.username}/opengraph-image`,
              width: 1200,
              height: 630,
              alt: `${user.username} | FalseNotes`,
            }
          ],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${user.username} | FalseNotes`,
          description: `${user?.username} has ${user?.postsnum} posts. Follow their to keep up with their activity on FalseNotes.`,
        },
    } 
    } catch (error) {
      console.error('Error:', error);
      return {
        title: `Not Found | FalseNotes`,
        description: `The page you were looking for doesn't exist.`,
        openGraph: {
          title: `Not Found | FalseNotes`,
          description: `The page you were looking for doesn't exist.`,

        },
        twitter: {
          card: 'summary_large_image',
          title: `Not Found | FalseNotes`,
          description: `The page you were looking for doesn't exist.`,
        },
    } 
    }
   }

export default function UserLayout(
     { children, params }: Props
  ) {

  return children
}
