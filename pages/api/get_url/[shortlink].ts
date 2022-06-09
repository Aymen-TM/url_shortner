// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from '../../../prisma/PrismaClient';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const shortUrl = req.query["shortlink"]

    if(!shortUrl || typeof shortUrl !=="string"){
      res.statusCode = 404;
      res.send(JSON.stringify({message:"plz use with short link"}));
      return;
    }

    const data = await prisma.urls.findFirst({
        where:{
            short_url:{
                equals:shortUrl
            }
        }
    });

    if(!data){
      res.statusCode = 404

      res.setHeader("Content-Type","application/json");
      res.setHeader("Access-Control-Allow-Origin","*");
      res.setHeader("Cache-Control","s-maxage=1000000000 stale-while-revalidate");

      res.send(JSON.stringify({message:"short link not found"}))

      return;
    }
    return res.redirect(data.origin_url);
}