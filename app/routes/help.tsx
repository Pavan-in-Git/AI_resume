import { motion } from "framer-motion";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { fadeInUp, staggerContainer } from "~/components/Animations";

export const meta = () => [
  { title: 'ResuMate - Help Center' },
  { name: 'description', content: 'Get help with ResuMate - find answers to common questions, learn how to use our AI resume analysis features, and get support.' },
];

const Help = () => {
  const faqs = [
    {
      question: "How does ResuMate analyze my resume?",
      answer: "ResuMate uses advanced AI technology to analyze your resume against Applicant Tracking Systems (ATS) and job requirements. Our AI evaluates content quality, keyword optimization, formatting, and provides specific recommendations for improvement."
    },
    {
      question: "What file formats are supported?",
      answer: "Currently, ResuMate supports PDF files for resume uploads. We recommend using PDF format as it maintains consistent formatting across different systems and is widely accepted by ATS systems."
    },
    {
      question: "How long does the analysis take?",
      answer: "Our AI analysis typically takes 30-60 seconds to complete. You'll see real-time progress updates during the analysis process."
    },
    {
      question: "Is my resume data secure?",
      answer: "Yes, absolutely. Your resume data is encrypted and stored securely. We never share your personal information with third parties, and you can delete your data at any time."
    },
    {
      question: "What is an ATS score?",
      answer: "The ATS score indicates how well your resume will perform in Applicant Tracking Systems. A higher score means your resume is more likely to pass through automated screening and reach human recruiters."
    },
    {
      question: "Can I analyze multiple resumes?",
      answer: "Yes! You can upload and analyze multiple resumes. Each analysis is saved to your dashboard, allowing you to compare different versions and track your improvements over time."
    },
    {
      question: "How accurate is the AI analysis?",
      answer: "Our AI analysis is highly accurate and based on industry best practices. However, we recommend using the feedback as guidance and always review the suggestions before making changes to your resume."
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes! We provide customer support through our contact form. You can reach out to us with any questions or issues, and we'll respond within 24 hours."
    }
  ];

  const categories = [
    {
      title: "Getting Started",
      icon: "🚀",
      items: [
        "How to upload your first resume",
        "Understanding your analysis results",
        "Setting up your account",
        "Navigating the dashboard"
      ]
    },
    {
      title: "Resume Analysis",
      icon: "📊",
      items: [
        "Understanding ATS scores",
        "Improving keyword optimization",
        "Formatting best practices",
        "Content quality tips"
      ]
    },
    {
      title: "Account & Billing",
      icon: "💳",
      items: [
        "Managing your account",
        "Privacy settings",
        "Data security",
        "Account deletion"
      ]
    },
    {
      title: "Technical Support",
      icon: "🔧",
      items: [
        "Browser compatibility",
        "File upload issues",
        "Performance problems",
        "Error troubleshooting"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <motion.main
        className="pt-20"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
              Help Center
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to your questions and learn how to get the most out of ResuMate's AI-powered resume analysis.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div variants={fadeInUp} className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full px-6 py-4 pl-12 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-6 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer transition-colors">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* FAQ Section */}
          <motion.div variants={fadeInUp} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Support */}
          <motion.div variants={fadeInUp} className="text-center">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
              <p className="text-blue-100 mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Support
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </section>
      </motion.main>

      <Footer />
    </div>
  );
};

export default Help;
