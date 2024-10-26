import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'

// Create a type for your post data
type PostData = {
  id: number;
  title: string;
  content: string;
};

type PostProps = {
  post: PostData;
};

const Post: React.FC<PostProps> = ({ post }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://host/api/posts?page=1&page_size=50')
  const posts: PostData[] = await res.json()

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // A check to ensure params and params.id isn't undefined.
    if (!params?.id) {
      return {
        props: {},
        notFound: true,
      };
    }
    
    const res = await fetch(`https://host/api/posts/${params.id}`);
    const post: PostData = await res.json();
    
    return { props: { post }, revalidate: 10 };
  };