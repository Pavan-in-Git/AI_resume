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
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Track your applications and review AI-powered feedback to improve your chances of landing your dream job.
              </p>
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
            ) : (
              <motion.div
                className="text-center py-20"
                variants={fadeInUp}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No resumes yet</h3>
                <p className="text-gray-600 mb-8">Upload your first resume to get started with AI-powered analysis.</p>
                <Link
                  to="/upload"
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Upload Resume
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </motion.div>
            )}
          </section>
        </motion.main>
      )}
      
      <Footer />
    </div>
  );
}
