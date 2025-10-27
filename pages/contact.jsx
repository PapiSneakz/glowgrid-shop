export default function Contact() {
  return (
    <div className="min-h-screen p-10 bg-gray-50 text-center">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="max-w-2xl mx-auto text-gray-600 mb-6">
        Have questions? Reach out to us anytime via email or social media.
      </p>
      <a
        href="mailto:support@mywebshop.com"
        className="text-indigo-600 hover:underline"
      >
        support@mywebshop.com
      </a>
    </div>
  );
}
