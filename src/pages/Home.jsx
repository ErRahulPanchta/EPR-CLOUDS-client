import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 bg-gradient-to-b from-blue-50 to-white text-center px-4 py-16">
        <img 
          src="/logo.png" 
          alt="logo" 
          className="w-32 mb-6 rounded-full shadow-lg animate-bounce" 
        />
        <h1 className="text-5xl font-extrabold mb-4 text-blue-700 drop-shadow-md">
          Welcome to ERP Clouds
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          Manage your files, folders, and collaborations seamlessly, all in one secure cloud platform. ERP Clouds is designed to simplify your workflow, just like Google Drive, but tailored for businesses.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/login" 
            className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="px-8 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition transform hover:-translate-y-1"
          >
            Register
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-800">Why Choose ERP Clouds?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-blue-50 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3">Secure Cloud Storage</h3>
            <p className="text-gray-600">
              All your files and folders are safely stored with robust authentication and permissions. Only authorized users can access their data.
            </p>
          </div>
          <div className="p-6 bg-green-50 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3">Seamless Collaboration</h3>
            <p className="text-gray-600">
              Share files and folders with your team easily. Real-time updates and share links make collaboration simple and efficient.
            </p>
          </div>
          <div className="p-6 bg-yellow-50 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3">Organized & Efficient</h3>
            <p className="text-gray-600">
              Intuitive folder structure, file versions, starred items, and search features help you stay organized and work smarter.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-100 py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-800">What Makes Us Different?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3">User-Friendly Interface</h3>
            <p className="text-gray-600">
              Clean, intuitive design makes it easy for anyone to manage files, folders, and share links without a steep learning curve.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3">Advanced Security</h3>
            <p className="text-gray-600">
              We implement strict row-level security, access control, and file ownership policies to protect your data.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3">Scalable & Reliable</h3>
            <p className="text-gray-600">
              Whether for personal use or enterprise, ERP Clouds scales effortlessly, ensuring high performance and reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 py-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
        <div className="flex justify-center flex-wrap gap-4">
          <Link 
            to="/login" 
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="px-8 py-3 bg-white text-green-600 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition"
          >
            Register
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
