"use client";
import React from 'react';
import Navbar from '../common/Navbar';

const faqs = [
  {
    question: "What is V99 Near by Locator Digital Directory?",
    answer:
      "V99 Near by Locator is a comprehensive online digital directory connecting local businesses, service providers, and professionals with their communities. Accessible at v99.in, our platform enables users to quickly discover local services—from skilled mechanics and plumbers to electricians and legal professionals.",
  },
  {
    question: "Who can enroll on V99 Near by Locator?",
    answer:
      "Our platform welcomes a diverse range of professionals and businesses, including mechanics, plumbers, electricians, small traders, legal experts, and document writers. By enrolling on V99 Near by Locator, you enhance your online presence and attract local customers actively searching for trusted services.",
  },
  {
    question: "How does V99 Near by Locator help customers?",
    answer:
      "V99 Near by Locator simplifies the process of finding local services. Customers can perform intuitive keyword searches by location or service type, ensuring they quickly find and connect with reliable service providers through detailed profiles and up-to-date contact information.",
  },
  {
    question: "What is the mission of V99 Near by Locator?",
    answer:
      "Our mission is to revolutionize local business connectivity by empowering service providers to showcase their expertise online. We strive to help communities access trusted services swiftly, supporting local economic growth and digital empowerment at v99.in.",
  },
  {
    question: "How can I join V99 Near by Locator as a freelancer or student?",
    answer:
      "V99 Near by Locator offers unique opportunities for freelancers and students to earn while contributing to community growth. By assisting us in onboarding local businesses and service providers, you gain valuable experience and rewards—join our team and help drive local digital transformation.",
  },
  {
    question: "How do customers search for services on V99 Near by Locator?",
    answer:
      "Customers can easily search for services by entering relevant keywords—such as location and service type (e.g., 'car mechanics' or 'electricians')—into our search bar. This intuitive functionality ensures quick access to the most relevant local service information available at v99.in.",
  },
];

const FAQ = () => {
  return (
    <main>
      <Navbar
        className="sticky top-0 z-50 bg-white shadow-md py-4"
        showSearch={false}
        showLogo={true}
      />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-900">
          Frequently Asked Questions
        </h1>

        {/* SEO: FAQ JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />

        <div className="grid grid-cols-1 gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl shadow-lg p-6 bg-white hover:shadow-2xl transition duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {faq.question}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default FAQ;
