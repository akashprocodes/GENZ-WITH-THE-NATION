'use client';

import { useState } from 'react';

export function UploadModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [cityState, setCityState] = useState('');
  const [socialHandle, setSocialHandle] = useState('');
  
  const [status, setStatus] = useState<string>('IDLE');
  const [errorMessage, setErrorMessage] = useState('');
  
  const submitForm = async () => {
    if (!name || !email || !mobile || !cityState || !socialHandle) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    
    setStatus('SUBMITTING');
    setErrorMessage('');
    
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, mobile, cityState, socialHandle })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Submission failed');
      
      setStatus('COMPLETED');
    } catch (err: any) {
      setErrorMessage(err.message);
      setStatus('FAILED');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-lg w-full border border-gray-700 relative max-h-[95vh] overflow-y-auto font-sans">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-700/50 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white transition-colors">
          ✕
        </button>
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-6">
          Gen-Z Nation Registration
        </h1>
        
        {status === 'COMPLETED' ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-emerald-400 mb-2">Registration Complete!</h2>
            <p className="text-gray-400">Your details have been successfully submitted.</p>
            <button onClick={onClose} className="mt-8 px-6 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition text-white">Close</button>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-4 text-white">
              <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} disabled={status === 'SUBMITTING'} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition disabled:opacity-50 text-white" />
              <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} disabled={status === 'SUBMITTING'} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition disabled:opacity-50 text-white" />
              <input type="tel" placeholder="Mobile Number" value={mobile} onChange={e => setMobile(e.target.value)} disabled={status === 'SUBMITTING'} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition disabled:opacity-50 text-white" />
              <input type="text" placeholder="City / State" value={cityState} onChange={e => setCityState(e.target.value)} disabled={status === 'SUBMITTING'} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition disabled:opacity-50 text-white" />
              <input type="text" placeholder="Instagram / Facebook Handle" value={socialHandle} onChange={e => setSocialHandle(e.target.value)} disabled={status === 'SUBMITTING'} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition disabled:opacity-50 text-white" />
            </div>

            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-900/30 border border-red-800 text-red-400 text-sm text-center">
                ⚠️ {errorMessage}
              </div>
            )}

            <button 
              onClick={submitForm} 
              disabled={status === 'SUBMITTING' || !name || !email || !mobile || !cityState || !socialHandle}
              className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-blue-900/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'SUBMITTING' ? 'Submitting...' : 'Register'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
