import axios from "axios";
import { NextApiResponse,NextApiRequest } from "next";
import nc from "next-connect";
import { groq } from "next-sanity";
import { sanityClient } from "../../../sanity";
import { Comment, CommentBody } from "../../../typings";
const handler = nc<NextApiRequest,NextApiResponse<Data>>()

type Data = {
  comments?:Comment[]
  message?:string
}

const commentQuery = groq`*[_type=="comment" && references($postId)]{_id,...} | order(_createdAt desc)`;

handler.get(async (req,res)=>{
  const postId = req.query.id;
  const comments :Comment[] = await sanityClient.fetch(commentQuery,{postId});
  res.status(200).json({comments});
})

handler.post(async (req, res) => {
  const commentBody: CommentBody[] = req.body;

  const mutations = [
    {
      create: commentBody,
    },
  ];

  const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;

  await axios.post(
    apiEndpoint,
    { mutations },
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
      },
    }
  );

  res.status(201).json({ message: "comment added" });
});

export default handler;
