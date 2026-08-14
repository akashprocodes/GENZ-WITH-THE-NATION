'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Send, CheckCircle2, ChevronRight, Video } from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export default function UploadPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [socialUrl, setSocialUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [status, setStatus] = useState<string>('IDLE');
  const [errorMessage, setErrorMessage] = useState('');

  const isVideoUploadEnabled = process.env.NEXT_PUBLIC_ENABLE_VIDEO_UPLOAD === 'true';

  const submitForm = async () => {
    if (!name || !email || !mobile || !socialUrl || !file) {
      setErrorMessage('Please enter your name, email, mobile number, social video link, and select a video.');
      return;
    }

    if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (file && file.size > 1024 * 1024 * 1024) {
      setErrorMessage('Video file is too large. Maximum size is 1GB.');
      return;
    }

    setStatus('UPLOADING');
    setErrorMessage('');
    setUploadProgress(0);

    try {
      // 1. Get Resumable Upload URL
      const sessionRes = await fetch('/api/upload/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name, mimeType: file.type, fileSize: file.size })
      });

      const sessionData = await sessionRes.json();
      if (!sessionRes.ok) throw new Error(sessionData.message || 'Failed to create upload session');

      const uploadUrl = sessionData.data.uploadUrl;

      // 2. Upload file directly to Google Drive via XHR for progress tracking
      const xhr = new XMLHttpRequest();
      
      const uploadPromise = new Promise((resolve, reject) => {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(percentComplete);
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 201 || xhr.status === 308) {
            try {
              const response = JSON.parse(xhr.responseText);
              resolve(response.id);
            } catch (e) {
              reject(new Error('Failed to parse Google Drive response'));
            }
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        };

        xhr.onerror = () => reject(new Error('Network error during upload'));
        xhr.onabort = () => reject(new Error('Upload aborted'));
      });

      xhr.open('PUT', uploadUrl, true);
      xhr.send(file);

      const fileId = await uploadPromise;

      setStatus('SUBMITTING');

      // 3. Complete and Verify Upload
      const completeRes = await fetch('/api/upload-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileId,
          metadata: { filename: file.name, mimeType: file.type, fileSize: file.size },
          user: { name, email, mobile, socialUrl }
        })
      });

      const completeData = await completeRes.json();
      if (!completeRes.ok) throw new Error(completeData.message || 'Failed to complete video upload');

      setStatus('COMPLETED');
    } catch (err: any) {
      setErrorMessage(err.message);
      setStatus('FAILED');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] overflow-x-hidden flex flex-col pt-14 md:pt-16 font-sans selection:bg-[#FF9933] selection:text-white">
      
      {/* Lottie Script */}
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" strategy="lazyOnload" />

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#FF9933]/5 via-[#138808]/5 to-transparent rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#138808]/5 via-[#FF9933]/5 to-transparent rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
        
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(#1A1A1A 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full flex flex-col pb-6 md:pb-8">
        

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch pb-4">
          
          {/* Left Column - Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-7 xl:col-span-6 w-full h-auto flex flex-col">
            <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 rounded-[32px] p-6 md:p-8 shadow-2xl shadow-black/5 relative overflow-hidden flex-1 flex flex-col justify-center">
              
              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF9933]/10 to-[#138808]/10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />

              {/* Form Header */}
              <div className="mb-6 relative">
                <div className="inline-flex items-center justify-start gap-3 mb-4">
                  <span className="w-6 h-[2px] bg-gradient-to-r from-transparent to-[#FF9933] rounded-full"></span>
                  <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#1A1A1A]/50">Step 2</span>
                  <span className="w-6 h-[2px] bg-gradient-to-l from-transparent to-[#138808] rounded-full"></span>
                </div>

                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 text-[#1A1A1A] leading-[1.05]">
                  Upload<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-[#1A1A1A] to-[#138808]">Your Reel</span>
                </h1>
                
                <p className="text-[#1A1A1A]/60 font-light text-sm md:text-base max-w-md leading-relaxed">
                  Enter your registered mobile number and upload your video to participate in the challenge.
                </p>
              </div>

              {/* Success State */}
              <AnimatePresence mode="wait">
                {status === 'COMPLETED' ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-3xl border border-[#1A1A1A]/10 p-8 shadow-sm">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-[#138808]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2 font-heading tracking-tight">Upload Successful!</h3>
                    <p className="text-[#1A1A1A]/60 text-sm mb-8 max-w-sm mx-auto leading-relaxed">Your video has been successfully uploaded.</p>
                    <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1A1A1A] text-white font-bold tracking-widest text-xs uppercase hover:bg-black transition-colors shadow-lg shadow-black/10">
                      Back to Home
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    
                    {/* Name Field */}
                    <div className="p-[10px] border border-black/10 rounded-[32px]">
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        disabled={status === 'SUBMITTING' || status === 'UPLOADING'}
                        placeholder="YOUR FULL NAME"
                        className="w-full bg-white border border-[#1A1A1A]/10 rounded-full pl-6 pr-6 py-[18px] text-[12px] font-bold tracking-[0.1em] text-[#1A1A1A] placeholder-gray-400 focus:bg-white focus:border-[#1A1A1A]/30 focus:ring-4 focus:ring-black/5 outline-none transition-all duration-300 disabled:opacity-50 hover:border-[#1A1A1A]/20 shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="p-[10px] border border-black/10 rounded-[32px]">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        disabled={status === 'SUBMITTING' || status === 'UPLOADING'}
                        placeholder="YOUR EMAIL ADDRESS"
                        className="w-full bg-white border border-[#1A1A1A]/10 rounded-full pl-6 pr-6 py-[18px] text-[12px] font-bold tracking-[0.1em] text-[#1A1A1A] placeholder-gray-400 focus:bg-white focus:border-[#1A1A1A]/30 focus:ring-4 focus:ring-black/5 outline-none transition-all duration-300 disabled:opacity-50 hover:border-[#1A1A1A]/20 shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
                      />
                    </div>

                    {/* Mobile Field */}
                    <div className="p-[10px] border border-black/10 rounded-[32px]">
                      <input
                        type="tel"
                        id="mobile"
                        value={mobile}
                        onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        disabled={status === 'SUBMITTING' || status === 'UPLOADING'}
                        placeholder="REGISTERED MOBILE NO."
                        className="w-full bg-white border border-[#1A1A1A]/10 rounded-full pl-6 pr-6 py-[18px] text-[12px] font-bold tracking-[0.1em] text-[#1A1A1A] placeholder-gray-400 focus:bg-white focus:border-[#1A1A1A]/30 focus:ring-4 focus:ring-black/5 outline-none transition-all duration-300 disabled:opacity-50 hover:border-[#1A1A1A]/20 shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
                      />
                    </div>

                    {/* Social Video URL Field */}
                    <div className="p-[10px] border border-black/10 rounded-[32px]">
                      <input
                        type="url"
                        id="socialUrl"
                        value={socialUrl}
                        onChange={e => setSocialUrl(e.target.value)}
                        disabled={status === 'SUBMITTING' || status === 'UPLOADING'}
                        placeholder="SOCIAL MEDIA UPLOADED LINK"
                        className="w-full bg-white border border-[#1A1A1A]/10 rounded-full pl-6 pr-6 py-[18px] text-[12px] font-bold tracking-[0.1em] text-[#1A1A1A] placeholder-gray-400 focus:bg-white focus:border-[#1A1A1A]/30 focus:ring-4 focus:ring-black/5 outline-none transition-all duration-300 disabled:opacity-50 hover:border-[#1A1A1A]/20 shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
                      />
                    </div>

                    {/* File Upload Field */}
                    {isVideoUploadEnabled && (
                      <div className="p-[10px] border border-black/10 rounded-[32px]">
                      <input
                        type="file"
                        id="video"
                        accept="video/*"
                        onChange={e => setFile(e.target.files?.[0] || null)}
                        disabled={status === 'UPLOADING' || status === 'SUBMITTING'}
                        className="hidden"
                      />
                      <label
                        htmlFor="video"
                        className={`w-full flex items-center justify-between bg-white border ${file ? 'border-[#138808]' : 'border-[#1A1A1A]/10'} rounded-full pl-6 pr-2.5 py-[9px] cursor-pointer hover:border-[#1A1A1A]/20 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.03)] ${status === 'UPLOADING' || status === 'SUBMITTING' ? 'opacity-50 pointer-events-none' : ''}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${file ? 'bg-[#138808]/10 text-[#138808]' : 'bg-[#1A1A1A]/5 text-[#1A1A1A]/60'}`}>
                            <Video className="w-[18px] h-[18px]" />
                          </div>
                          <span className={`text-[12px] font-bold tracking-[0.1em] ${file ? 'text-[#1A1A1A]' : 'text-gray-400'}`}>
                            {file ? file.name.length > 22 ? file.name.substring(0, 22) + '...' : file.name : 'UPLOAD REEL'}
                          </span>
                        </div>
                        <div className={`px-6 py-[14px] rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${file ? 'bg-[#138808] text-white shadow-lg' : 'bg-[#1A1A1A] text-white hover:bg-black hover:shadow-lg'}`}>
                          {file ? 'CHANGE' : 'SELECT'}
                        </div>
                      </label>
                    </div>
                    )}

                    {/* Progress Bar */}
                    {status === 'UPLOADING' && (
                      <div className="w-full px-2">
                        <div className="flex justify-between text-[10px] font-bold tracking-widest text-[#1A1A1A] mb-2 uppercase">
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933] animate-pulse"></span>
                            Uploading Video
                          </span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#1A1A1A]/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#FF9933] to-[#138808] transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {errorMessage && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-full bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center justify-center gap-2">
                        <Shield className="w-4 h-4" />
                        {errorMessage}
                      </motion.div>
                    )}

                    <button
                      onClick={submitForm}
                      disabled={status === 'SUBMITTING' || status === 'UPLOADING' || !mobile || (isVideoUploadEnabled && !file)}
                      className="w-full flex items-center justify-center py-4 rounded-full bg-[#1A1A1A] text-white font-bold tracking-[0.2em] uppercase text-[12px] cursor-pointer hover:bg-black hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                      {status === 'SUBMITTING' ? (
                        <span className="flex items-center gap-3">
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          Verifying...
                        </span>
                      ) : status === 'UPLOADING' ? (
                        <span className="flex items-center gap-3">
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          Uploading...
                        </span>
                      ) : (
                        <span className="flex items-center gap-3">
                          UPLOAD VIDEO
                          <Send className="w-4 h-4" />
                        </span>
                      )}
                    </button>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

          {/* Right Column - Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-5 xl:col-span-6 w-full h-auto">
            
            <div className={`bg-white rounded-[32px] p-6 md:p-8 border border-[#1A1A1A]/10 shadow-[0_20px_40px_rgba(0,0,0,0.03)] relative overflow-hidden h-full flex flex-col ${poppins.className}`}>
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-black/[0.015] to-transparent rounded-full -translate-y-1/2 translate-x-1/3" />
              
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="w-12 h-12 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-[#1A1A1A]" />
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#1A1A1A] mb-3">
                  Important Guidelines
                </h3>
                
                <div className="h-[1px] w-12 bg-[#FF9933] mb-6" />
                
                <ul className="space-y-4 flex-1">
                  {[
                    { title: "Mobile Verification", desc: "Use the exact mobile number you registered with so we can link your video to your profile." },
                    { title: "Video Specifications", desc: "Max size: 1GB. Ensure your video is clear and in vertical format (9:16) for reels." },
                    { title: "Content Guidelines", desc: "Maintain the decorum of the nation. No offensive or inappropriate content will be accepted." },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 group cursor-default">
                      <div className="w-5 h-5 rounded-full bg-[#1A1A1A]/5 group-hover:bg-[#138808]/10 transition-colors duration-300 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]/20 group-hover:bg-[#138808] transition-colors duration-300" />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-bold text-[#1A1A1A] group-hover:text-[#138808] transition-colors duration-300 uppercase tracking-widest mb-1">{item.title}</h4>
                        <p className="text-[13px] text-[#1A1A1A]/60 leading-relaxed font-light">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 p-5 rounded-[24px] bg-[#1A1A1A] text-white hover:bg-black transition-colors duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.12)] cursor-pointer group">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-4 h-4 text-[#FF9933] group-hover:animate-pulse" />
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.2em]">Need Help?</h4>
                  </div>
                  <a href="mailto:akakash0520@gmail.com" className="inline-flex flex-col group/link mt-1">
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/70 group-hover/link:text-[#FF9933] transition-colors border-b border-white/20 group-hover/link:border-[#FF9933] pb-1 w-fit">
                      Contact Support
                    </span>
                    <span className="text-[10px] text-white/40 tracking-wider mt-1.5 font-medium lowercase group-hover/link:text-white/60 transition-colors">
                      akakash0520@gmail.com
                    </span>
                  </a>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
