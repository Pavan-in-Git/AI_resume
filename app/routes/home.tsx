import type { Route } from "./+types/home";
import { motion } from "framer-motion";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import Hero from "~/components/Hero";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import { fadeInUp, staggerContainer } from "~/components/Animations";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResuMate - AI-Powered Resume Analysis" },
    { name: "description", content: "AI-powered resume analysis that helps you land your dream job. Get instant feedback and optimization suggestions." },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
      ))

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

    if (auth.isAuthenticated) {
      loadResumes()
    }
  }, [auth.isAuthenticated]);

  // Show hero section if no resumes, otherwise show dashboard
  const shouldShowHero = !loadingResumes && resumes?.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      {shouldShowHero ? (
        <Hero />
      ) : (
        <motion.main
          className="pt-20"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
                Your Resume Dashboard
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Track your applications and review AI-powered feedback to improve your chances of landing your dream job.
              </p>
              
              {/* Quick Stats */}
              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
              >
                <motion.div 
                  variants={fadeInUp}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-4 mx-auto">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{resumes.length}</h3>
                  <p className="text-gray-600">Resumes Analyzed</p>
                </motion.div>
                
                <motion.div 
                  variants={fadeInUp}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl mb-4 mx-auto">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {resumes.length > 0 ? Math.round(resumes.reduce((acc, resume) => acc + resume.feedback.overallScore, 0) / resumes.length) : 0}
                  </h3>
                  <p className="text-gray-600">Average Score</p>
                </motion.div>
                
                <motion.div 
                  variants={fadeInUp}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mb-4 mx-auto">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {resumes.filter(r => r.feedback.overallScore > 70).length}
                  </h3>
                  <p className="text-gray-600">High Scores</p>
                </motion.div>
              </motion.div>
            </motion.div>

            {loadingResumes ? (
              <motion.div
                className="flex flex-col items-center justify-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </motion.div>
                <p className="text-gray-600">Loading your resumes...</p>
              </motion.div>
            ) : resumes.length > 0 ? (
              <>
                {/* Quick Actions */}
                <motion.div 
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row gap-4 mb-12 max-w-4xl mx-auto"
                >
                  <motion.button
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/upload')}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Upload New Resume
                  </motion.button>
                  <motion.button
                    className="flex-1 bg-white/80 backdrop-blur-sm text-gray-700 py-4 px-8 rounded-full font-semibold border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/features')}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    View Features
                  </motion.button>
                </motion.div>

                {/* Resume Cards Grid */}
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
                  variants={staggerContainer}
                >
                  {resumes.map((resume, index) => (
                    <motion.div
                      key={resume.id}
                      variants={fadeInUp}
                      transition={{ delay: index * 0.1 }}
                      className="w-full"
                    >
                      <ResumeCard resume={resume} />
                    </motion.div>
                  ))}
                </motion.div>
              </>
            ) : (
              <motion.div
                className="text-center py-20"
                variants={fadeInUp}
              >
                <motion.div 
                  className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </motion.div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                  Upload your first resume to unlock AI-powered insights and improve your job application success.
                </p>
                
                {/* Feature highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
                  <div className="flex flex-col items-center p-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">ATS Optimization</h4>
                    <p className="text-sm text-gray-600 text-center">Get past applicant tracking systems</p>
                  </div>
                  
                  <div className="flex flex-col items-center p-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Score Analysis</h4>
                    <p className="text-sm text-gray-600 text-center">Detailed scoring and feedback</p>
                  </div>
                  
                  <div className="flex flex-col items-center p-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">AI Insights</h4>
                    <p className="text-sm text-gray-600 text-center">Personalized improvement tips</p>
                  </div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/upload"
                    className="inline-flex items-center px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Upload Your First Resume
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </section>
        </motion.main>
      )}
      
      <Footer />
    </div>
  );
}
