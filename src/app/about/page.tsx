"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center mb-16">
        <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-6">About the Campaign</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We are redefining the narrative of our generation through authentic stories and meaningful conversations.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <Card className="h-full bg-muted/20 border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To create a positive, inclusive, and professional platform where creators can share their truths. We aim to break stereotypes and foster a deeper understanding of what it means to be part of GenZ today.
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.1 }}>
          <Card className="h-full bg-muted/20 border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl text-secondary">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                A world where generations collaborate rather than clash. We envision a digital landscape filled with inspiring, raw, and constructive content that bridges gaps and builds communities.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mb-20">
        <h2 className="font-heading text-3xl font-bold mb-6">The Campaign Story</h2>
        <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
          <p className="mb-4">
            GenZ is often misunderstood. Labeled as screen-addicted or disconnected, the reality is far different. We are innovators, activists, entrepreneurs, and deep thinkers. We created <strong>GenZWithTheNation</strong> to give our peers a microphone to broadcast their reality, unedited and unscripted.
          </p>
          <p>
            This campaign is not about pointing fingers or blaming older generations. It is about taking ownership of our narrative and showing the world the positive impact we are making every single day.
          </p>
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mb-20">
        <h2 className="font-heading text-3xl font-bold mb-8">Guidelines & Participation</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center"><span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3">1</span>Who Can Participate</h3>
            <ul className="space-y-3 text-muted-foreground list-disc pl-5">
              <li>Any creator with a passion for storytelling.</li>
              <li>Individuals willing to share positive, constructive messages.</li>
              <li>No minimum follower count required.</li>
              <li>Must be 13 years of age or older.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center"><span className="w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center mr-3">2</span>Video Guidelines</h3>
            <ul className="space-y-3 text-muted-foreground list-disc pl-5">
              <li>Original content only.</li>
              <li>Maintain a respectful and inclusive tone.</li>
              <li>Avoid derogatory language or hate speech.</li>
              <li>High-quality audio and clear visuals.</li>
              <li>Short-form (under 60s) or Long-form (up to 5 mins).</li>
            </ul>
          </div>
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
        <h2 className="font-heading text-3xl font-bold mb-8 text-center">Community Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {["Authenticity", "Inclusivity", "Respect", "Impact"].map((value, idx) => (
            <div key={idx} className="text-center p-6 rounded-2xl bg-muted/10 border border-border/40">
              <h4 className="font-bold text-lg mb-2">{value}</h4>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
