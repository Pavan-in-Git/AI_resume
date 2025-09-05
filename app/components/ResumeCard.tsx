import { motion } from "framer-motion";
import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import { fadeInUp, hoverScale } from "./Animations";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath]);

    return (
        <motion.div
            variants={fadeInUp}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <Link to={`/resume/${id}`} className="resume-card group">
                {/* Header with enhanced styling */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex-1 min-w-0">
                        {companyName && (
                            <h3 className="text-lg font-bold text-gray-900 truncate mb-1">
                                {companyName}
                            </h3>
                        )}
                        {jobTitle && (
                            <p className="text-sm text-gray-600 truncate">
                                {jobTitle}
                            </p>
                        )}
                        {!companyName && !jobTitle && (
                            <h3 className="text-lg font-bold text-gray-900">
                                Resume Analysis
                            </h3>
                        )}
                        
                        {/* Score badge */}
                        <div className="mt-3">
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                feedback.overallScore > 70 
                                    ? 'bg-green-100 text-green-800' 
                                    : feedback.overallScore > 49 
                                        ? 'bg-yellow-100 text-yellow-800' 
                                        : 'bg-red-100 text-red-800'
                            }`}>
                                <div className={`w-2 h-2 rounded-full mr-2 ${
                                    feedback.overallScore > 70 
                                        ? 'bg-green-500' 
                                        : feedback.overallScore > 49 
                                            ? 'bg-yellow-500' 
                                            : 'bg-red-500'
                                }`}></div>
                                {feedback.overallScore > 70 ? 'Excellent' : feedback.overallScore > 49 ? 'Good' : 'Needs Work'}
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                        <ScoreCircle score={feedback.overallScore} />
                    </div>
                </div>

                {/* Resume Preview */}
                {resumeUrl && (
                    <div className="relative overflow-hidden rounded-2xl bg-gray-50">
                        <motion.img
                            src={resumeUrl}
                            alt="Resume preview"
                            className="w-full h-48 object-cover object-top transition-transform duration-300 group-hover:scale-105"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}

                {/* Enhanced Footer */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-xs text-gray-500 font-medium">Analysis Complete</span>
                            </div>
                            <div className="text-xs text-gray-400">•</div>
                            <div className="text-xs text-gray-500">
                                {new Date().toLocaleDateString()}
                            </div>
                        </div>
                        <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
                            <span>View Details</span>
                            <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                    
                    {/* Progress indicators */}
                    <div className="mt-3 grid grid-cols-4 gap-2">
                        <div className="text-center">
                            <div className="text-xs text-gray-500 mb-1">Tone</div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div 
                                    className={`h-1.5 rounded-full ${
                                        feedback.toneAndStyle.score > 70 ? 'bg-green-500' : 
                                        feedback.toneAndStyle.score > 49 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${feedback.toneAndStyle.score}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-gray-500 mb-1">Content</div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div 
                                    className={`h-1.5 rounded-full ${
                                        feedback.content.score > 70 ? 'bg-green-500' : 
                                        feedback.content.score > 49 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${feedback.content.score}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-gray-500 mb-1">Structure</div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div 
                                    className={`h-1.5 rounded-full ${
                                        feedback.structure.score > 70 ? 'bg-green-500' : 
                                        feedback.structure.score > 49 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${feedback.structure.score}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-gray-500 mb-1">Skills</div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div 
                                    className={`h-1.5 rounded-full ${
                                        feedback.skills.score > 70 ? 'bg-green-500' : 
                                        feedback.skills.score > 49 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${feedback.skills.score}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export default ResumeCard
