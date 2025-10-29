import type { Request, Response } from 'express';
import { randomUUID } from 'crypto';

// In-memory storage (will reset on cold start)
const users = new Map();
const userIndex = new Map();

export default (req: Request, res: Response) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { firstName, lastName, email, phoneNumber, password } = req.body;

  const contactKeys = [email, phoneNumber].filter(Boolean);

  if (contactKeys.length === 0) {
    return res.status(400).json({ message: 'Either email or phone number must be provided' });
  }

  if (contactKeys.some((contact) => userIndex.has(contact))) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const id = randomUUID();
  const userRecord = { id, firstName, lastName, email, phoneNumber, password };
  users.set(id, userRecord);
  contactKeys.forEach((contact) => userIndex.set(contact, id));

  const { password: _, ...userWithoutPassword } = userRecord;
  res.json(userWithoutPassword);
};
