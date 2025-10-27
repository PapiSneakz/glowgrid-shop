// pages/api/users.js
import prisma from '../../lib/dbconnect'
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const users = await prisma.user.findMany({
        select: { id: true, email: true, createdAt: true },
      })
      res.status(200).json(users)
    } else if (req.method === 'POST') {
      const { email, password } = req.body
      const hashed = await bcrypt.hash(password, 10)
      const user = await prisma.user.create({
        data: { email, password: hashed },
      })
      res.status(201).json(user)
    } else {
      res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('User API Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
