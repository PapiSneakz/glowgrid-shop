import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

// 🌍 Validate postal code via public APIs
async function validatePostalCode(country, postalCode) {
  const countryCode = country?.toLowerCase();

  // 1️⃣ Try Zippopotam.us (most countries)
  try {
    const res = await axios.get(`https://api.zippopotam.us/${countryCode}/${postalCode}`);
    if (res.status === 200) return true;
  } catch {}

  // 2️⃣ Try Geoapify (optional for global validation)
  try {
    const GEOAPIFY_KEY = process.env.GEOAPIFY_API_KEY;
    if (GEOAPIFY_KEY) {
      const geoRes = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?postcode=${postalCode}&country=${country}&apiKey=${GEOAPIFY_KEY}`
      );
      if (geoRes.data?.features?.length > 0) return true;
    }
  } catch {}

  return false;
}

export default async function handler(req, res) {
  if (req.method !== 'PUT')
    return res.status(405).json({ error: 'Method not allowed' });

  const { email, name, address, city, postalCode, country, state, phone } = req.body;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    if (country && postalCode) {
      const valid = await validatePostalCode(country, postalCode);
      if (!valid) {
        return res.status(400).json({
          error: `Invalid postal code for ${country}. Please double-check.`,
        });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { name, address, city, postalCode, country, state, phone },
    });

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
}
