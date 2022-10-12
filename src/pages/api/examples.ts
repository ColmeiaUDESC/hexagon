import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  const examplesData = await prisma.example.findMany();
  res.status(200).json(examplesData);
};

export default examples;
