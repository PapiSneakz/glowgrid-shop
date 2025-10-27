'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  // Fetch current user data
  useEffect(() => {
    if (session?.user?.email) {
      axios
        .get(`/api/user/${session.user.email}`)
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [session]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await axios.put('/api/user/update', user);
      setMessage('✅ Profile updated successfully!');
    } catch (err) {
      setMessage('❌ Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        Loading your profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-900 text-white flex justify-center items-center p-6">
      <div className="bg-gray-800 bg-opacity-70 backdrop-blur-xl border border-indigo-700/40 rounded-2xl shadow-2xl w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-400">
          My Profile
        </h1>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={user.name || ''}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={user.email || ''}
              disabled
              className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 opacity-70 cursor-not-allowed"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={user.address || ''}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* City & Postal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={user.city || ''}
                onChange={handleChange}
                className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={user.postalCode || ''}
                onChange={handleChange}
                className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Country & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={user.country || ''}
                onChange={handleChange}
                className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={user.phone || ''}
                onChange={handleChange}
                className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 mt-4 rounded-lg font-semibold bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-indigo-600/40 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>

          {message && (
            <p className="text-center mt-4 text-sm text-indigo-300">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
