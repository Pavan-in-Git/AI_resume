import {type FormEvent, useState} from 'react'
import { motion } from "framer-motion";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import Upload from "~/components/Upload";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../../constants";
import { fadeInUp, staggerContainer } from "~/components/Animations";

const UploadPage = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        setIsProcessing(true);
        setProgress(0);

        setStatusText('Uploading the file...');
        setProgress(10);
        const uploadedFile = await fs.upload([file]);
        if(!uploadedFile) return setStatusText('Error: Failed to upload file');

        setStatusText('Converting to image...');
        setProgress(25);
        const imageFile = await convertPdfToImage(file);
        if(!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

        setStatusText('Uploading the image...');
        setProgress(40);
        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setStatusText('Error: Failed to upload image');

        setStatusText('Preparing data...');
        setProgress(55);
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analyzing resume...');
        setProgress(70);
        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )
        if (!feedback) return setStatusText('Error: Failed to analyze resume');

        setStatusText('Processing feedback...');
        setProgress(85);
        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        
        setStatusText('Finalizing analysis...');
        setProgress(95);
        
        // Small delay to show 100% before redirect
        setTimeout(() => {
            setProgress(100);
            setStatusText('Analysis complete, redirecting...');
            setTimeout(() => {
                navigate(`/resume/${uuid}`);
            }, 500);
        }, 200);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Navbar />

            <motion.main
                className="pt-20 min-h-screen"
                initial="initial"
                animate="animate"
                variants={staggerContainer}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Header Section */}
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 leading-tight">
                            Upload Your Resume
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Get instant AI-powered feedback and optimization suggestions for your resume
                        </p>
                    </motion.div>

                    {/* Form Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start justify-items-center">
                        {/* Left Column - Form */}
                        <motion.div 
                            variants={fadeInUp}
                            className="lg:col-span-2 w-full max-w-2xl mx-auto"
                        >
                            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-xl border border-white/30 w-full">
                                <form id="upload-form" onSubmit={handleSubmit} className="space-y-3">
                                    {/* Form Header */}
                                    <div className="text-center mb-3">
                                        <h2 className="text-lg font-bold text-gray-900 mb-1">Resume Analysis Form</h2>
                                        <p className="text-xs text-gray-600">Fill in the details below to get personalized feedback</p>
                                    </div>
                                                                         {/* All Input Fields in Single Column */}
                                     <div className="space-y-3">
                                         <div className="space-y-1">
                                             <label htmlFor="company-name" className="block text-sm font-semibold text-gray-700">
                                                 Company Name
                                             </label>
                                             <input
                                                 type="text"
                                                 name="company-name"
                                                 placeholder="e.g., Google, Microsoft, Apple"
                                                 id="company-name"
                                                 className="w-full h-16 px-5 py-4 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-base shadow-sm"
                                                 required
                                             />
                                         </div>
                                         <div className="space-y-1">
                                             <label htmlFor="job-title" className="block text-sm font-semibold text-gray-700">
                                                 Job Title
                                             </label>
                                             <input
                                                 type="text"
                                                 name="job-title"
                                                 placeholder="e.g., Software Engineer, Product Manager"
                                                 id="job-title"
                                                 className="w-full h-16 px-5 py-4 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-base shadow-sm"
                                                 required
                                             />
                                         </div>
                                         <div className="space-y-1">
                                             <label htmlFor="job-description" className="block text-sm font-semibold text-gray-700">
                                                 Job Description
                                             </label>
                                             <textarea
                                                 rows={7}
                                                 name="job-description"
                                                 placeholder="Paste the job description here for targeted analysis..."
                                                 id="job-description"
                                                 className="w-full px-5 py-4 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none placeholder-gray-400 text-base min-h-[160px] leading-relaxed shadow-sm"
                                                 required
                                             />
                                         </div>
                                     </div>

                                    {/* Upload Section */}
                                    <div className="space-y-1">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Upload Resume
                                        </label>
                                        <div className="w-full">
                                            <Upload
                                                onFileSelect={handleFileSelect}
                                                isProcessing={isProcessing}
                                                statusText={statusText}
                                                progress={progress}
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    {file && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className="pt-4"
                                        >
                                            <motion.button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                disabled={isProcessing}
                                            >
                                                {isProcessing ? (
                                                    <div className="flex items-center justify-center">
                                                        <motion.div
                                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        />
                                                        Analyzing Resume...
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-center">
                                                        <span>Analyze Resume</span>
                                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </form>
                            </div>
                        </motion.div>

                        {/* Right Column - Info Panel */}
                        <motion.div 
                            variants={fadeInUp}
                            className="lg:col-span-1 space-y-6 w-full max-w-md mx-auto"
                        >
                            {/* Tips Card */}
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-6 border border-blue-100">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-3">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">Pro Tips</h3>
                                </div>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex items-start">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span>Upload a PDF resume for best results</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span>Include the complete job description for targeted analysis</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span>Our AI will provide ATS optimization suggestions</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Features Card */}
                            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">What You'll Get</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm text-gray-600">ATS Score & Optimization</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm text-gray-600">Detailed Feedback Report</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm text-gray-600">Improvement Suggestions</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.main>

            <Footer />
        </div>
    )
}

export default UploadPage
