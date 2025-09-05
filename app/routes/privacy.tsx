import { motion } from "framer-motion";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { fadeInUp, staggerContainer } from "~/components/Animations";

export const meta = () => [
  { title: 'ResuMate - Privacy Policy' },
  { name: 'description', content: 'Learn how ResuMate protects your privacy and handles your personal data. Our commitment to data security and user privacy.' },
];

const Privacy = () => {
  const sections = [
    {
      title: "Information We Collect",
      content: [
        "Personal Information: When you create an account, we collect your name, email address, and any other information you choose to provide.",
        "Resume Data: We collect and store the resumes you upload for analysis, including the content, formatting, and metadata.",
        "Usage Information: We collect information about how you use our service, including pages visited, features used, and time spent on the platform.",
        "Technical Information: We automatically collect certain technical information, including your IP address, browser type, device information, and operating system."
      ]
    },
    {
      title: "How We Use Your Information",
      content: [
        "Service Provision: We use your information to provide, maintain, and improve our AI-powered resume analysis services.",
        "Communication: We use your contact information to send you important updates about our service, respond to your inquiries, and provide customer support.",
        "Analysis and Improvement: We analyze usage patterns to improve our AI algorithms and enhance the user experience.",
        "Security: We use your information to protect against fraud, abuse, and security threats."
      ]
    },
    {
      title: "Information Sharing",
      content: [
        "We do not sell, trade, or rent your personal information to third parties.",
        "We may share your information with trusted service providers who assist us in operating our platform, conducting our business, or serving our users.",
        "We may disclose your information if required by law or to protect our rights, property, or safety, or that of our users or others.",
        "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction."
      ]
    },
    {
      title: "Data Security",
      content: [
        "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
        "All data transmission is encrypted using industry-standard SSL/TLS protocols.",
        "Your resume data is stored securely and is only accessible to authorized personnel who need it to provide our services.",
        "We regularly review and update our security practices to ensure the highest level of protection."
      ]
    },
    {
      title: "Your Rights",
      content: [
        "Access: You have the right to access the personal information we hold about you.",
        "Correction: You can update or correct your personal information at any time through your account settings.",
        "Deletion: You can request the deletion of your personal information and resume data at any time.",
        "Portability: You can export your data in a machine-readable format.",
        "Opt-out: You can opt out of marketing communications at any time by clicking the unsubscribe link in our emails."
      ]
    },
    {
      title: "Data Retention",
      content: [
        "We retain your personal information for as long as your account is active or as needed to provide you with our services.",
        "Resume data is retained for analysis purposes and to provide you with historical insights about your resume improvements.",
        "You can delete your account and all associated data at any time through your account settings.",
        "We may retain certain information for legal, regulatory, or business purposes even after account deletion."
      ]
    },
    {
      title: "Cookies and Tracking",
      content: [
        "We use cookies and similar tracking technologies to enhance your experience on our platform.",
        "Cookies help us remember your preferences, analyze site traffic, and personalize content.",
        "You can control cookie settings through your browser preferences.",
        "Disabling cookies may affect the functionality of our service."
      ]
    },
    {
      title: "Children's Privacy",
      content: [
        "Our service is not intended for children under 13 years of age.",
        "We do not knowingly collect personal information from children under 13.",
        "If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.",
        "If you believe we have collected information from a child under 13, please contact us immediately."
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
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div variants={fadeInUp} className="mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Privacy</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At ResuMate, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                AI-powered resume analysis platform.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By using our service, you agree to the collection and use of information in accordance with this policy. 
                If you do not agree with our policies and practices, please do not use our service.
              </p>
            </div>
          </motion.div>

          {/* Privacy Sections */}
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
              <h2 className="text-2xl font-bold mb-4">Questions About This Policy?</h2>
              <p className="text-blue-100 mb-6">
                If you have any questions about this Privacy Policy or our data practices, please don't hesitate to contact us.
              </p>
              <div className="space-y-2">
                <p className="font-medium">Email: privacy@resumate.com</p>
                <p className="font-medium">Support: support@resumate.com</p>
              </div>
            </div>
          </motion.div>

          {/* Updates */}
          <motion.div variants={fadeInUp} className="mt-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Policy Updates</h3>
              <p className="text-gray-600 text-sm">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review 
                this Privacy Policy periodically for any changes.
              </p>
            </div>
          </motion.div>
        </section>
      </motion.main>

      <Footer />
    </div>
  );
};

export default Privacy;
