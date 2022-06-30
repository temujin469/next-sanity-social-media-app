import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import { getPosts } from '../utils/getPosts'
import { Post } from '../typings'
import { Toaster } from 'react-hot-toast'
import Layout from '../components/layout'

interface Props {
  posts:Post[]
}

const Home = ({posts}:Props) => {
  return (
    <div className='bg-saaral mx-auto overflow-hidden max-h-screen'>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster/>
      <Layout>
        <Feed posts={posts}/>
      </Layout>
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