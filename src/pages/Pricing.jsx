import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Pricing() {
    const plans = [
        {
            name: "Basic",
            price: "0",
            desc: "Ideal for personal use or small projects.",
            features: ["5 GB Storage", "Single User", "Basic Support"],
            highlight: false,
        },
        {
            name: "Pro",
            price: "9.99",
            desc: "Perfect for professionals needing more storage.",
            features: ["100 GB Storage", "Up to 5 Users", "Priority Support"],
            highlight: true,
        },
        {
            name: "Enterprise",
            price: "29.99",
            desc: "Best for teams and large organizations.",
            features: ["1 TB Storage", "Unlimited Users", "Dedicated Support"],
            highlight: false,
        },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1">
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4">Pricing</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Choose a plan that fits your needs. No hidden fees, cancel anytime.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {plans.map((plan, idx) => (
                                <div
                                    key={idx}
                                    className={`p-6 rounded-xl shadow-lg transition border ${plan.highlight ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
                                        }`}
                                >
                                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                    <p className="text-gray-600 mb-4">{plan.desc}</p>
                                    <p className="text-4xl font-bold mb-4">
                                        ${plan.price}
                                        <span className="text-lg font-normal">/mo</span>
                                    </p>
                                    <ul className="mb-6 text-gray-700">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="mb-2">
                                                • {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        className={`w-full py-2 rounded text-white font-bold transition ${plan.highlight ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-700 hover:bg-gray-800"
                                            }`}
                                    >
                                        Get Started
                                    </button>
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
