import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import { motion } from "framer-motion";
import {usePuterStore} from "~/lib/puter";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import Results from "~/components/Results";
import { fadeInUp } from "~/components/Animations";

export const meta = () => ([
    { title: 'ResuMate | Resume Analysis Results' },
    { name: 'description', content: 'Detailed AI-powered analysis of your resume with optimization suggestions' },
])

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading])

    useEffect(() => {
        const loadResume = async () => {
            setLoading(true);
            const resume = await kv.get(`resume:${id}`);

            if(!resume) {
                setLoading(false);
                return;
            }

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if(!resumeBlob) {
                setLoading(false);
                return;
            }

            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if(!imageBlob) {
                setLoading(false);
                return;
            }
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
            setLoading(false);
            console.log({resumeUrl, imageUrl, feedback: data.feedback });
        }

        if (auth.isAuthenticated) {
            loadResume();
        }
    }, [id, auth.isAuthenticated]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Navbar />
            
            <motion.main
                className="pt-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                {/* Back Navigation */}
                <motion.div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Dashboard
                    </Link>
                </motion.div>

                {/* Results Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    {loading ? (
                        <motion.div
                            className="flex items-center justify-center min-h-[400px]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="text-center">
                                <motion.div
                                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                >
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </motion.div>
                                <p className="text-gray-600">Loading your resume analysis...</p>
                            </div>
                        </motion.div>
                    ) : (
                        <Results
                            feedback={feedback}
                            imageUrl={imageUrl}
                            resumeUrl={resumeUrl}
                        />
                    )}
                </section>
            </motion.main>

            <Footer />
        </div>
    )
}

export default Resume
