import React from "react";
import { User, Users, Globe, Heart } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">About Our Platform</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform empowers you to manage digital files effortlessly. Fast, secure, and user-friendly, it’s built for individuals and teams who value productivity and reliability.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition text-center">
                <User className="text-blue-500 mb-4 mx-auto" size={40} />
                <h3 className="font-bold text-xl mb-2">User Friendly</h3>
                <p className="text-gray-600">Intuitive interface designed for everyone, tech-savvy or not.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition text-center">
                <Globe className="text-green-500 mb-4 mx-auto" size={40} />
                <h3 className="font-bold text-xl mb-2">Global Access</h3>
                <p className="text-gray-600">Access files anytime, anywhere with cloud support.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition text-center">
                <Users className="text-purple-500 mb-4 mx-auto" size={40} />
                <h3 className="font-bold text-xl mb-2">Collaboration</h3>
                <p className="text-gray-600">Share and work on files together with your team.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition text-center">
                <Heart className="text-red-500 mb-4 mx-auto" size={40} />
                <h3 className="font-bold text-xl mb-2">Trusted & Secure</h3>
                <p className="text-gray-600">Your data is protected with end-to-end encryption.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
