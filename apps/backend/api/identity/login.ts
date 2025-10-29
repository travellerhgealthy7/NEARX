import type { VercelRequest, VercelResponse } from '@vercel/node';

export default (req: VercelRequest, res: VercelResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, phoneNumber, password } = req.body;
  
  // Demo user credentials
  if (email === 'operator@example.com' && password === 'nearx123') {
    return res.json({
      token: 'stub-token-demo-user-id',
      user: {
        id: 'demo-user-id',
        firstName: 'Demo',
        lastName: 'Operator',
        email: 'operator@example.com',
      },
    });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
};
