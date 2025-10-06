import React from "react";
import { Cloud, Lock, Upload, Download } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Features() {
  const features = [
    {
      icon: <Cloud size={40} className="text-blue-500" />,
      title: "Cloud Storage",
      desc: "Store files securely on the cloud and access them anytime.",
    },
    {
      icon: <Lock size={40} className="text-green-500" />,
      title: "Data Security",
      desc: "Multi-layer encryption and 2FA protect your sensitive information.",
    },
    {
      icon: <Upload size={40} className="text-purple-500" />,
      title: "Easy Upload",
      desc: "Drag & drop files or upload entire folders effortlessly.",
    },
    {
      icon: <Download size={40} className="text-red-500" />,
      title: "Quick Download",
      desc: "Download files individually or in bulk instantly.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Features</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Powerful features designed to streamline your workflow and enhance productivity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition text-center"
                >
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
