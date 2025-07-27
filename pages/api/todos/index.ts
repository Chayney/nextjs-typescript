import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../lib/auth';
import { parse } from 'cookie';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const { userId }: any = verifyToken(token);
        if (req.method === 'GET') {
            const todos = await prisma.todo.findMany({ where: { userId } });
            res.status(200).json(todos);
        } else {
            res.status(405).end();
        }
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}
