import { motion } from "framer-motion";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { fadeInUp, staggerContainer } from "~/components/Animations";

export const meta = () => [
  { title: 'ResuMate - Terms of Service' },
  { name: 'description', content: 'Read ResuMate\'s Terms of Service to understand the rules and guidelines for using our AI resume analysis platform.' },
];

const Terms = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing and using ResuMate, you accept and agree to be bound by the terms and provision of this agreement.",
        "If you do not agree to abide by the above, please do not use this service.",
        "These terms apply to all visitors, users, and others who access or use the service."
      ]
    },
    {
      title: "Description of Service",
      content: [
        "ResuMate is an AI-powered resume analysis platform that provides feedback and optimization suggestions for resumes.",
        "Our service analyzes resumes against Applicant Tracking Systems (ATS) and provides detailed feedback to help improve job application success.",
        "We reserve the right to modify, suspend, or discontinue the service at any time without notice."
      ]
    },
    {
      title: "User Accounts",
      content: [
        "You must create an account to use our service. You are responsible for maintaining the confidentiality of your account credentials.",
        "You agree to provide accurate, current, and complete information during the registration process.",
        "You are responsible for all activities that occur under your account.",
        "You must notify us immediately of any unauthorized use of your account."
      ]
    },
    {
      title: "User Content",
      content: [
        "You retain ownership of all content you upload to our platform, including resumes and personal information.",
        "By uploading content, you grant us a limited license to use, store, and process your content to provide our services.",
        "You are responsible for ensuring that your content does not violate any laws or infringe on the rights of others.",
        "We reserve the right to remove content that violates these terms or is deemed inappropriate."
      ]
    },
    {
      title: "Prohibited Uses",
      content: [
        "You may not use our service for any unlawful purpose or to solicit others to perform unlawful acts.",
        "You may not violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances.",
        "You may not infringe upon or violate our intellectual property rights or the intellectual property rights of others.",
        "You may not harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate.",
        "You may not submit false or misleading information or impersonate another person or entity."
      ]
    },
    {
      title: "Intellectual Property",
      content: [
        "The service and its original content, features, and functionality are owned by ResuMate and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.",
        "Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.",
        "You may not modify, reproduce, distribute, or create derivative works based on our service without permission."
      ]
    },
    {
      title: "Privacy and Data Protection",
      content: [
        "Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service.",
        "We implement appropriate security measures to protect your personal information.",
        "You have the right to access, update, or delete your personal information as described in our Privacy Policy."
      ]
    },
    {
      title: "Service Availability",
      content: [
        "We strive to provide continuous service availability but cannot guarantee uninterrupted access.",
        "We may perform maintenance, updates, or modifications that temporarily affect service availability.",
        "We are not liable for any downtime or service interruptions."
      ]
    },
    {
      title: "Limitation of Liability",
      content: [
        "In no event shall ResuMate, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.",
        "Our total liability to you for any damages arising from or related to these terms shall not exceed the amount you paid us for the service in the 12 months preceding the claim.",
        "Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability, so the above limitations may not apply to you."
      ]
    },
    {
      title: "Disclaimer of Warranties",
      content: [
        "The service is provided on an 'as is' and 'as available' basis without warranties of any kind.",
        "We disclaim all warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.",
        "We do not warrant that the service will be uninterrupted, secure, or error-free."
      ]
    },
    {
      title: "Termination",
      content: [
        "We may terminate or suspend your account and access to the service immediately, without prior notice, for any reason, including breach of these terms.",
        "You may terminate your account at any time by contacting us or using the account deletion feature.",
        "Upon termination, your right to use the service will cease immediately, and we may delete your account and data."
      ]
    },
    {
      title: "Governing Law",
      content: [
        "These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which ResuMate operates.",
        "Any disputes arising from these terms or your use of the service shall be resolved in the courts of competent jurisdiction.",
        "If any provision of these terms is found to be unenforceable, the remaining provisions will remain in full force and effect."
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
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Please read these terms carefully before using ResuMate. By using our service, you agree to be bound by these terms.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div variants={fadeInUp} className="mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                These Terms of Service ("Terms") govern your use of ResuMate's AI-powered resume analysis platform 
                (the "Service") operated by ResuMate ("us", "we", or "our").
              </p>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any 
                part of these terms, then you may not access the Service.
              </p>
            </div>
          </motion.div>

          {/* Terms Sections */}
          <motion.div variants={staggerContainer} className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
                <ul className="space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <p className="text-gray-600 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={fadeInUp} className="mt-16">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
              <p className="text-blue-100 mb-6">
                If you have any questions about these Terms of Service, please contact us.
              </p>
              <div className="space-y-2">
                <p className="font-medium">Email: legal@resumate.com</p>
                <p className="font-medium">Support: support@resumate.com</p>
              </div>
            </div>
          </motion.div>

          {/* Updates */}
          <motion.div variants={fadeInUp} className="mt-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Changes to Terms</h3>
              <p className="text-gray-600 text-sm">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes 
                a material change will be determined at our sole discretion.
              </p>
            </div>
          </motion.div>
        </section>
      </motion.main>

      <Footer />
    </div>
  );
};

export default Terms;
