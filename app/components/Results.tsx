import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, hoverScale } from "./Animations";
import Summary from "./Summary";
import ATS from "./ATS";
import Details from "./Details";

interface ResultsProps {
  feedback: Feedback | null;
  imageUrl?: string;
  resumeUrl?: string;
}

const Results = ({ feedback, imageUrl, resumeUrl }: ResultsProps) => {
  if (!feedback) {
    return (
      <motion.div
        className="flex items-center justify-center min-h-[400px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="text-gray-600">Loading analysis...</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {/* Resume Preview */}
      <motion.div
        variants={fadeInLeft}
        className="lg:sticky lg:top-8 lg:h-fit"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Resume Preview</h3>
          {imageUrl && resumeUrl && (
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <motion.img
                  src={imageUrl}
                  alt="Resume preview"
                  className="w-full h-auto rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
                <motion.div
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-2xl transition-colors duration-300 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </motion.div>
              </a>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Analysis Results */}
      <motion.div
        variants={fadeInRight}
        className="space-y-8"
      >
        <motion.div variants={fadeInUp}>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-2">
            Analysis Results
          </h2>
          <p className="text-gray-600 text-lg">
            Comprehensive feedback to help you improve your resume
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="space-y-8"
        >
          {/* Summary Section */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Summary</h3>
            </div>
            <Summary feedback={feedback} />
          </motion.div>

          {/* ATS Score Section */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">ATS Score</h3>
            </div>
            <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
          </motion.div>

          {/* Detailed Analysis Section */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Detailed Analysis</h3>
            </div>
            <Details feedback={feedback} />
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 pt-8"
        >
          <motion.button
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Download Report
          </motion.button>
          <motion.button
            className="flex-1 bg-white/80 backdrop-blur-sm text-gray-700 py-4 px-8 rounded-full font-semibold border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Upload Another Resume
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Results;
