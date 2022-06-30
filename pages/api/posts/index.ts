// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { Post, PostBody } from "../../../typings";
import { groq } from "next-sanity";
import { sanityClient } from "../../../sanity";
import axios from "axios";

type Data = {
  posts?: Post[];
  message: string;
};

const handler = nc<NextApiRequest, NextApiResponse<Data>>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

const postQuery = groq`*[_type=="post"]{_id,...} | order(_createdAt desc)`;

handler.get(async (req, res) => {
  const posts: Post[] = await sanityClient.fetch(postQuery);
  res.status(200).json({ posts, message: "success" });
});

handler.post(async (req, res) => {
  const postBody: PostBody = req.body;

  const mutations = [
    {
      create: { ...postBody },
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

  res.status(201).json({ message: "Post created" });
});
export default handler;
