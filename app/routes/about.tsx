import { motion } from "framer-motion";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "~/components/Animations";

export const meta = () => [
  { title: 'ResuMate - About Us' },
  { name: 'description', content: 'Learn about ResuMate - the AI-powered resume analysis platform helping job seekers optimize their resumes and land their dream jobs.' },
];

const About = () => {
  const team = [
    {
      name: "AI Technology",
      role: "Advanced Machine Learning",
      description: "Our cutting-edge AI analyzes resumes with precision and provides actionable insights.",
      avatar: "🤖"
    },
    {
      name: "User Experience",
      role: "Intuitive Design",
      description: "We believe in making resume optimization simple and accessible for everyone.",
      avatar: "✨"
    },
    {
      name: "Data Security",
      role: "Privacy First",
      description: "Your data is encrypted and secure. We never share your personal information.",
      avatar: "🔒"
    }
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Innovation",
      description: "We continuously push the boundaries of AI technology to provide the best resume analysis experience."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Empathy",
      description: "We understand the challenges of job searching and are committed to making it easier for everyone."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Excellence",
      description: "We strive for excellence in everything we do, from AI accuracy to user experience."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Community",
      description: "We're building a community of successful job seekers who support and inspire each other."
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
              About ResuMate
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing the job search process with AI-powered resume analysis that helps you stand out in today's competitive market.
            </p>
          </motion.div>
        </section>

        {/* Story Section */}
        <section className="bg-white/60 backdrop-blur-sm py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeInLeft}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    ResuMate was born from a simple observation: too many qualified candidates were being overlooked 
                    because their resumes weren't optimized for modern Applicant Tracking Systems (ATS).
                  </p>
                  <p>
                    We realized that the job search process had become increasingly complex, with AI systems 
                    filtering resumes before human eyes ever see them. This created an unfair barrier for many 
                    talented professionals.
                  </p>
                  <p>
                    Our mission is to level the playing field by providing everyone with access to the same 
                    AI-powered insights that top recruiters use. We believe that talent should be recognized, 
                    regardless of resume formatting or keyword optimization skills.
                  </p>
                </div>
              </motion.div>
              
              <motion.div variants={fadeInRight} className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-blue-100 leading-relaxed">
                    To create a world where every job seeker has the tools and insights needed to showcase 
                    their true potential and land their dream job.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                To democratize access to professional resume optimization tools and help job seekers 
                present their best selves to potential employers.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="bg-white/60 backdrop-blur-sm py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeInLeft}>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-8 text-white">
                  <div className="text-6xl mb-4">🧠</div>
                  <h3 className="text-2xl font-bold mb-4">Advanced AI Technology</h3>
                  <p className="text-green-100 leading-relaxed">
                    Our platform uses state-of-the-art machine learning algorithms to analyze resumes 
                    with the same precision as top-tier recruiters, providing insights that help you 
                    optimize your application for maximum impact.
                  </p>
                </div>
              </motion.div>
              
              <motion.div variants={fadeInRight}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Powered by Innovation
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    ResuMate leverages cutting-edge artificial intelligence to provide comprehensive 
                    resume analysis that goes beyond simple keyword matching.
                  </p>
                  <p>
                    Our AI understands context, evaluates content quality, and provides specific 
                    recommendations to improve your resume's effectiveness.
                  </p>
                  <p>
                    We continuously update our algorithms to stay ahead of evolving ATS systems 
                    and hiring trends, ensuring you always have the most current insights.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What Drives Us
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform is built on three core pillars that guide everything we do
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-6xl mb-4">{member.avatar}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {member.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Join Our Mission
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Be part of the future of job searching. Let ResuMate help you showcase your potential 
                and land the career you deserve.
              </p>
              <motion.a
                href="/upload"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </section>
      </motion.main>

      <Footer />
    </div>
  );
};

export default About;
