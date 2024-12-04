// lib/auth.ts

import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthenticatedNextApiRequest extends NextApiRequest {
  user: {
    id: string;
    email: string;
    // Add more user properties as needed
  };
}

export const authenticate = (handler: Function) => async (req: NextApiRequest, res: NextApiResponse) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string; email: string };
    (req as AuthenticatedNextApiRequest).user = decoded;
    return handler(req, res);
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
