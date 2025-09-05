import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { formatSize } from '../lib/utils';
import { fadeInUp, fadeIn, scaleIn, hoverScale } from './Animations';

interface UploadProps {
  onFileSelect?: (file: File | null) => void;
  isProcessing?: boolean;
  statusText?: string;
  progress?: number;
}

const Upload = ({ onFileSelect, isProcessing = false, statusText = '', progress = 0 }: UploadProps) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0] || null;
    setFile(selectedFile);
    onFileSelect?.(selectedFile);
  }, [onFileSelect]);

  const maxFileSize = 20 * 1024 * 1024; // 20MB

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: maxFileSize,
  });

  const removeFile = () => {
    setFile(null);
    onFileSelect?.(null);
  };

  return (
    <motion.div
      className="w-full"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <AnimatePresence mode="wait">
        {isProcessing ? (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-16"
          >
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {/* Progress percentage overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{progress}%</span>
              </div>
            </motion.div>
            
            {/* Progress bar */}
            <div className="w-full max-w-md mx-auto mb-6">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
            
            <motion.h3
              className="text-2xl font-semibold text-gray-900 mb-4"
              variants={fadeIn}
            >
              {statusText}
            </motion.h3>
            <motion.p
              className="text-gray-600"
              variants={fadeIn}
            >
              Please wait while we analyze your resume...
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <motion.div
              {...getRootProps()}
              className={`
                relative p-8 text-center transition-all duration-300 cursor-pointer
                bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-dashed min-h-[150px] flex flex-col items-center justify-center
                ${isDragActive 
                  ? 'border-blue-500 bg-blue-50/80 scale-105' 
                  : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/50'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input {...getInputProps()} />
              
              <AnimatePresence mode="wait">
                {file ? (
                  <motion.div
                    key="file-selected"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="space-y-4"
                  >
                    <motion.div
                      className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto"
                      variants={scaleIn}
                    >
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </motion.div>
                    
                    <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 truncate max-w-xs">
                            {file.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatSize(file.size)}
                          </p>
                        </div>
                      </div>
                      
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile();
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="upload-prompt"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto"
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </motion.div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Drag and drop your PDF file here, or click to browse
                      </p>
                      <p className="text-sm text-gray-500">
                        Maximum file size: {formatSize(maxFileSize)}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {file && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <motion.button
                  type="submit"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Analyze Resume</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Upload;
