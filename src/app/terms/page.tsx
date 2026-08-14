import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] py-20 px-6 md:px-12 font-sans selection:bg-[#FF9933] selection:text-white">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors text-sm font-medium tracking-wide mb-12 group"
        >
          <span className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center mr-3 group-hover:bg-[#1A1A1A]/10 transition-colors border border-[#1A1A1A]/5">
            <ArrowLeft className="w-4 h-4" />
          </span>
          Return to Home
        </Link>

        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-12 text-center uppercase">
          GEN Z WITH THE NATION
        </h1>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#1A1A1A]/10 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-[#FF9933]">Rules & Regulations (English)</h2>
          
          <div className="space-y-6 text-[#1A1A1A]/80 leading-relaxed">
            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">1. Theme-Based Entry</h3>
              <ul className="list-disc pl-5 mt-2">
                <li>Every reel must be based on the official theme of "Gen Z With The Nation." Entries unrelated to the theme may be disqualified.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">2. Original Content Only</h3>
              <ul className="list-disc pl-5 mt-2">
                <li>The reel must be your own original creation. Plagiarism or copying another creator's concept, script, visuals, or editing style is not allowed.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">3. No AI-Generated Videos</h3>
              <ul className="list-disc pl-5 mt-2">
                <li>Fully AI-generated videos or AI-created visuals are <strong>strictly prohibited</strong>. Basic editing tools are allowed, but the core content must be created by the participant.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">4. Video Duration</h3>
              <ul className="list-disc pl-5 mt-2">
                <li>Reel duration must be <strong>between 30 seconds and 90 seconds</strong>.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">5. Collaboration Requirement</h3>
              <ul className="list-disc pl-5 mt-2">
                <li>While uploading your reel on Instagram or Facebook, you <strong>must invite the official "Gen Z With The Nation" page as a Collaborator (Collab)</strong> wherever the platform supports it.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">6. Submission Deadline</h3>
              <ul className="list-disc pl-5 mt-2">
                <li>The reel must be uploaded and submitted <strong>on or before 30 August</strong>. Late entries will not be considered.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">7. Public Account</h3>
              <ul className="list-disc pl-5 mt-2">
                <li>Your Instagram/Facebook account must remain <strong>public</strong> until the competition results are announced.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">8. Content Guidelines</h3>
              <ul className="list-disc pl-5 mt-2">
                <li>The reel must not contain hate speech, abusive language, violence, nudity, misinformation, or content that promotes illegal activities.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">9. Music & Copyright</h3>
              <ul className="list-disc pl-5 mt-2">
                <li>Participants are responsible for ensuring that music, images, and other media used in the reel do not violate copyright laws.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">10. Single Entry</h3>
              <ul className="list-disc pl-5 mt-2">
                <li>Each participant may submit <strong>only one official entry</strong>, unless otherwise announced.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">11. Editing Allowed</h3>
              <ul className="list-disc pl-5 mt-2">
                <li>Creative editing, transitions, motion graphics, color grading, and effects are permitted as long as the original footage is created by the participant.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">12. Judging Criteria</h3>
              <ul className="list-disc pl-5 mt-2">
                <li>Entries will be evaluated on:
                  <ul className="list-[circle] pl-6 mt-1 space-y-1">
                    <li>Creativity</li>
                    <li>Originality</li>
                    <li>Storytelling</li>
                    <li>Relevance to the theme</li>
                    <li>Visual Quality</li>
                    <li>Audience Engagement (where applicable)</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">13. Rights to Use Content</h3>
              <ul className="list-disc pl-5 mt-2">
                <li>By participating, you grant the organizers permission to feature, repost, promote, and use your reel for promotional and educational purposes with appropriate credit.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">14. Organizer's Decision</h3>
              <ul className="list-disc pl-5 mt-2">
                <li>The decision of the organizing committee regarding eligibility, evaluation, and winners shall be final and binding.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">15. Violation of Rules</h3>
              <ul className="list-disc pl-5 mt-2">
                <li>Any participant found violating these rules may be disqualified without prior notice.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#1A1A1A]/10">
          <h2 className="text-3xl font-bold mb-8 text-[#138808]">नियम एवं शर्तें (Hindi)</h2>
          
          <div className="space-y-6 text-[#1A1A1A]/80 leading-relaxed font-sans">
            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">1. थीम आधारित वीडियो</h3>
              <p className="mt-2 pl-5">प्रतिभागी द्वारा बनाई गई रील "Gen Z With The Nation" की निर्धारित थीम पर आधारित होना अनिवार्य है।</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">2. मौलिक (Original) कंटेंट</h3>
              <p className="mt-2 pl-5">रील पूरी तरह आपकी स्वयं की बनाई हुई होनी चाहिए। किसी अन्य व्यक्ति के वीडियो, आइडिया, स्क्रिप्ट, एडिटिंग स्टाइल या कंटेंट की नकल स्वीकार नहीं की जाएगी।</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">3. AI से बनी वीडियो मान्य नहीं होगी</h3>
              <p className="mt-2 pl-5">पूरी तरह AI से बनाई गई वीडियो या AI-जनरेटेड विजुअल्स स्वीकार नहीं किए जाएंगे। सामान्य वीडियो एडिटिंग टूल्स का उपयोग किया जा सकता है, लेकिन मुख्य कंटेंट प्रतिभागी द्वारा स्वयं बनाया गया होना चाहिए।</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">4. वीडियो की अवधि</h3>
              <p className="mt-2 pl-5">रील की अवधि <strong>30 सेकंड से 90 सेकंड</strong> के बीच होना अनिवार्य है।</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">5. Collab अनिवार्य</h3>
              <p className="mt-2 pl-5">रील अपलोड करते समय <strong>Gen Z With The Nation के आधिकारिक Instagram/Facebook पेज को Collaborator (Collab)</strong> के रूप में जोड़ना अनिवार्य होगा, जहाँ यह सुविधा उपलब्ध हो।</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">6. अंतिम तिथि</h3>
              <p className="mt-2 pl-5">सभी प्रविष्टियाँ <strong>30 अगस्त</strong> तक अपलोड एवं सबमिट कर दी जानी चाहिए। इसके बाद प्राप्त प्रविष्टियाँ स्वीकार नहीं की जाएंगी।</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">7. सार्वजनिक (Public) प्रोफ़ाइल</h3>
              <p className="mt-2 pl-5">प्रतियोगिता के परिणाम घोषित होने तक प्रतिभागी का Instagram/Facebook अकाउंट <strong>Public</strong> होना चाहिए।</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">8. अनुचित सामग्री वर्जित</h3>
              <p className="mt-2 pl-5">रील में किसी भी प्रकार की अश्लीलता, हिंसा, घृणा फैलाने वाली सामग्री, अपमानजनक भाषा, फेक न्यूज़ या अवैध गतिविधियों को बढ़ावा देने वाला कंटेंट नहीं होना चाहिए।</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">9. कॉपीराइट की जिम्मेदारी</h3>
              <p className="mt-2 pl-5">वीडियो में उपयोग किए गए संगीत, चित्र, वीडियो या अन्य सामग्री के कॉपीराइट की जिम्मेदारी प्रतिभागी की होगी।</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">10. एक प्रतिभागी – एक प्रविष्टि</h3>
              <p className="mt-2 pl-5">प्रत्येक प्रतिभागी <strong>केवल एक आधिकारिक प्रविष्टि</strong> भेज सकता है, जब तक आयोजक अलग से घोषणा न करें।</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">11. एडिटिंग की अनुमति</h3>
              <p className="mt-2 pl-5">वीडियो एडिटिंग, ट्रांज़िशन, कलर ग्रेडिंग, मोशन ग्राफिक्स एवं अन्य क्रिएटिव इफेक्ट्स का उपयोग किया जा सकता है, लेकिन मूल वीडियो स्वयं रिकॉर्ड किया गया होना चाहिए।</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">12. मूल्यांकन के आधार</h3>
              <div className="mt-2 pl-5">
                निर्णायक निम्नलिखित बिंदुओं के आधार पर मूल्यांकन करेंगे:
                <ul className="list-[circle] pl-6 mt-2 space-y-1">
                  <li>रचनात्मकता (Creativity)</li>
                  <li>मौलिकता (Originality)</li>
                  <li>कहानी कहने की क्षमता (Storytelling)</li>
                  <li>विषय से जुड़ाव (Theme Relevance)</li>
                  <li>वीडियो की गुणवत्ता (Visual Quality)</li>
                  <li>दर्शकों की सहभागिता (जहाँ लागू हो)</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">13. उपयोग का अधिकार</h3>
              <p className="mt-2 pl-5">प्रतियोगिता में भाग लेने पर प्रतिभागी आयोजकों को यह अधिकार देता है कि वे उसकी रील को उचित श्रेय के साथ अपने सोशल मीडिया, वेबसाइट एवं प्रचार सामग्री में उपयोग कर सकें।</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">14. आयोजक का निर्णय</h3>
              <p className="mt-2 pl-5">प्रतियोगिता से संबंधित सभी मामलों में आयोजक का निर्णय अंतिम एवं सर्वमान्य होगा।</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">15. नियमों का उल्लंघन</h3>
              <p className="mt-2 pl-5">यदि कोई प्रतिभागी नियमों का उल्लंघन करता पाया जाता है, तो उसकी प्रविष्टि बिना किसी पूर्व सूचना के निरस्त की जा सकती है।</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
