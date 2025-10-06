import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/global");
      const data = await response.json();

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}