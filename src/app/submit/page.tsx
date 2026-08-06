'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Award, Star, Video, ArrowRight, User, Mail, Phone, MapPin, AtSign } from 'lucide-react';

export default function SubmitPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [cityState, setCityState] = useState('');
  const [socialHandle, setSocialHandle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [status, setStatus] = useState<string>('IDLE');
  const [errorMessage, setErrorMessage] = useState('');

  const isVideoUploadEnabled = process.env.NEXT_PUBLIC_ENABLE_VIDEO_UPLOAD === 'true';

  const submitForm = async () => {
    if (!name || !email || !mobile || !cityState || !socialHandle || (isVideoUploadEnabled && !file)) {
      setErrorMessage(isVideoUploadEnabled ? 'Please fill in all fields and select a video.' : 'Please fill in all fields.');
      return;
    }

    if (isVideoUploadEnabled && file && file.size > 300 * 1024 * 1024) {
      setErrorMessage('Video file is too large. Maximum size is 300MB.');
      return;
    }

    setStatus('UPLOADING');
    setErrorMessage('');
    setUploadProgress(0);

    try {
      if (!isVideoUploadEnabled) {
        setStatus('SUBMITTING');
        const completeRes = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, mobile, cityState, socialHandle })
        });
        const completeData = await completeRes.json();
        if (!completeRes.ok) throw new Error(completeData.message || 'Failed to complete registration');
        setStatus('COMPLETED');
        return;
      }

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
            // Google Drive returns 200/201 on success with JSON.
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
      const completeRes = await fetch('/api/upload/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileId,
          metadata: { filename: file.name, mimeType: file.type, fileSize: file.size },
          user: { name, email, mobile, cityState, socialHandle }
        })
      });

      const completeData = await completeRes.json();
      if (!completeRes.ok) throw new Error(completeData.message || 'Failed to complete registration');

      setStatus('COMPLETED');
    } catch (err: any) {
      setErrorMessage(err.message);
      setStatus('FAILED');
    }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden flex flex-col lg:flex-row bg-[#FAF9F6] font-sans selection:bg-[#FF9933] selection:text-white">

      {/* Left Panel - Branding & Motivation */}
      <div className="lg:w-[45%] lg:h-full bg-[#1A1A1A] relative flex flex-col justify-between overflow-hidden text-white p-8 md:p-12 lg:p-16">
        {/* Background Effects */}
        <div
          className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
          style={{ backgroundImage: "url('/bg-india.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#FF9933]/20 via-transparent to-[#138808]/20 opacity-60 blur-3xl"></div>
        <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

        <div className="relative z-10 flex-1 flex flex-col">
          <Link href="/" className="inline-flex items-center text-white/50 hover:text-white transition-colors text-sm font-medium tracking-wide mb-12 lg:mb-auto w-fit group">
            <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-3 group-hover:bg-white/10 transition-colors border border-white/5">
              <ArrowLeft className="w-4 h-4" />
            </span>
            Return to Home
          </Link>

          <motion.div variants={stagger} initial="hidden" animate="visible" className="mt-8 lg:mt-0 lg:my-auto">
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-medium tracking-widest uppercase mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#FF9933] animate-pulse"></span>
              Registration Open
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight mb-6 leading-[1.1]">
              Become the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-white to-[#138808] italic font-light">Voice of India.</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-white/60 text-lg md:text-xl font-light max-w-md leading-relaxed mb-12">
              Join the largest Gen-Z creator movement this Independence Day. Your story could inspire the nation.
            </motion.p>

            <motion.div variants={stagger} className="space-y-6">
              {[
                { icon: <Award className="w-5 h-5 text-[#FF9933]" />, text: "Win Exciting Cash Prizes" },
                { icon: <Star className="w-5 h-5 text-white" />, text: "National Recognition & Certificates" },
                { icon: <Video className="w-5 h-5 text-[#138808]" />, text: "Get featured on our platform" }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeIn} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                    {item.icon}
                  </div>
                  <span className="text-white/80 font-medium tracking-wide">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="relative z-10 mt-16 text-white/30 text-xs tracking-widest uppercase font-semibold">
          © {new Date().getFullYear()} Gen-Z Nation
        </div>
      </div>

      {/* Right Panel - Form (Matches Screenshot exactly) */}
      <div className="lg:w-[55%] lg:h-full lg:overflow-y-auto flex items-center justify-center p-6 md:p-12 lg:p-16 relative scrollbar-hide bg-[#F2F0E9]">
        {/* Subtle grid pattern for texture (matching screenshot) */}
        <div className="absolute inset-0 opacity-[0.25] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#808080 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        {/* Richer Background Gradients for depth on the edges */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#FF9933]/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#138808]/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="w-full max-w-xl relative z-10">

          {/* Form Container (No white card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full sm:p-4"
          >
            <div className="mb-10">
              <h2 className="text-3xl sm:text-[2rem] font-bold text-[#1A1A1A] tracking-tight mb-4 font-serif">Creator Details</h2>
              <p className="text-[#1A1A1A]/70 text-[13px] leading-relaxed font-medium">
                Fill in your information to secure your spot. Make sure the details match your social accounts.
              </p>
            </div>

            {status === 'COMPLETED' ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8"
              >
                <div className="w-24 h-24 bg-[#138808]/10 text-[#138808] rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <div className="absolute inset-0 rounded-full border border-[#138808]/20 animate-pulse"></div>
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-3">Registration Successful!</h3>
                <p className="text-gray-500 mb-8 leading-relaxed max-w-xs mx-auto text-sm">
                  Welcome to Gen-Z Nation! We have received your details securely.
                </p>
                <Link href="/">
                  <button className="w-full sm:w-auto px-10 py-4 bg-[#8E8D8A] text-white rounded-full font-semibold tracking-widest text-xs uppercase hover:bg-[#7A7976] hover:shadow-lg transition-all duration-300">
                    Back to Homepage
                  </button>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-col gap-6">

                  {/* 2-Column Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { id: 'name', label: 'FULL NAME', type: 'text', value: name, setter: setName, icon: <User className="w-[18px] h-[18px]" /> },
                      { id: 'email', label: 'EMAIL ADDRESS', type: 'email', value: email, setter: setEmail, icon: <Mail className="w-[18px] h-[18px]" /> },
                      { id: 'mobile', label: 'MOBILE NUMBER', type: 'tel', value: mobile, setter: setMobile, icon: <Phone className="w-[18px] h-[18px]" /> },
                      { id: 'city', label: 'CITY / STATE', type: 'text', value: cityState, setter: setCityState, icon: <MapPin className="w-[18px] h-[18px]" /> },
                    ].map((field) => (
                      <div key={field.id} className="relative group">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#1A1A1A] transition-colors pointer-events-none flex items-center">
                          {field.icon}
                        </div>
                        <input
                          type={field.type}
                          id={field.id}
                          value={field.value}
                          onChange={e => field.setter(e.target.value)}
                          disabled={status === 'SUBMITTING'}
                          placeholder={field.label}
                          className="w-full bg-white border border-[#1A1A1A]/10 rounded-full pl-[52px] pr-6 py-[18px] text-[12px] font-bold tracking-[0.1em] text-[#1A1A1A] placeholder-gray-500 focus:bg-white focus:border-[#1A1A1A]/30 focus:ring-4 focus:ring-black/5 outline-none transition-all disabled:opacity-50 hover:border-[#1A1A1A]/20 shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Full width for Social Handle */}
                  <div className="relative group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#1A1A1A] transition-colors pointer-events-none flex items-center">
                      <AtSign className="w-[18px] h-[18px]" />
                    </div>
                    <input
                      type="text"
                      id="social"
                      value={socialHandle}
                      onChange={e => setSocialHandle(e.target.value)}
                      disabled={status === 'SUBMITTING' || status === 'UPLOADING'}
                      placeholder="INSTAGRAM / FACEBOOK HANDLE"
                      className="w-full bg-white border border-[#1A1A1A]/10 rounded-full pl-[52px] pr-6 py-[18px] text-[12px] font-bold tracking-[0.1em] text-[#1A1A1A] placeholder-gray-500 focus:bg-white focus:border-[#1A1A1A]/30 focus:ring-4 focus:ring-black/5 outline-none transition-all disabled:opacity-50 hover:border-[#1A1A1A]/20 shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
                    />
                  </div>

                  {/* File Upload Field */}
                  {isVideoUploadEnabled && (
                    <div className="relative group">
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
                      className={`w-full flex items-center justify-between bg-white border ${file ? 'border-[#138808]' : 'border-[#1A1A1A]/10'} rounded-full pl-[24px] pr-2 py-[10px] cursor-pointer hover:border-[#1A1A1A]/30 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.03)] ${status === 'UPLOADING' || status === 'SUBMITTING' ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center text-gray-500">
                          <Video className="w-5 h-5" />
                        </div>
                        <span className={`text-[12px] font-bold tracking-[0.1em] ${file ? 'text-[#1A1A1A]' : 'text-gray-500'}`}>
                          {file ? file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name : 'UPLOAD REEL (MAX 300MB)'}
                        </span>
                      </div>
                      <div className="px-6 py-3 rounded-full bg-[#1A1A1A] text-white text-[10px] font-bold tracking-widest uppercase">
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
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                      {errorMessage}
                    </motion.div>
                  )}

                  <button
                    onClick={submitForm}
                    disabled={status === 'SUBMITTING' || status === 'UPLOADING' || !name || !email || !mobile || !cityState || !socialHandle || (isVideoUploadEnabled && !file)}
                    className="w-full flex items-center justify-center py-[20px] rounded-full bg-[#1A1A1A] text-white font-bold tracking-[0.15em] uppercase text-[12px] hover:bg-black hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg shadow-black/10"
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
                        COMPLETE REGISTRATION
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </button>

                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

    </div>
  );
}
