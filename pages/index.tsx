import type { GetServerSideProps} from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widget from '../components/Widget'
import { getPosts } from '../utils/getPosts'
import { Post } from '../typings'
import { Toaster } from 'react-hot-toast'

interface Props {
  posts:Post[]
}

const Home = ({posts}:Props) => {
  return (
    <div className='bg-saaral overflow-hidden max-h-screen'>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster/>

      <main className='grid grid-cols-11'>
        <Sidebar/>
        <Feed posts={posts}/>
        <Widget/>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps:GetServerSideProps = async (context)=>{
  
  const posts = await getPosts();

  return {
    props:{
      posts,
    }
  }
}