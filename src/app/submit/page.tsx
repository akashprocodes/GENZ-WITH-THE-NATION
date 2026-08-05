"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const ACCEPTED_FILE_TYPES = ["video/mp4"];

const formSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  mobileNumber: z.string().regex(/^[0-9]{10,12}$/, "Invalid mobile number"),
  cityState: z.string().min(2, "City / State is required"),
  profileUrl: z.string().min(2, "Handle/URL is required"),
  videoUrl: z.string().url("Valid URL is required"),
  videoFile: z.any()
    .refine((file) => file instanceof File, "Original MP4 file is required")
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max file size is 500MB")
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file?.type), "Only .mp4 format is supported"),
  termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms")
});

type FormValues = z.infer<typeof formSchema>;

export default function SubmitPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submissionData, setSubmissionData] = useState<{ id: string; status: string } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      cityState: "",
      profileUrl: "",
      videoUrl: "",
      termsAccepted: false
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    setUploadProgress(0);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const formData = new FormData();

      formData.append("fullName", values.fullName);
      formData.append("mobileNumber", values.mobileNumber);
      formData.append("cityState", values.cityState);
      formData.append("profileUrl", values.profileUrl);
      formData.append("videoUrl", values.videoUrl);
      formData.append("videoFile", values.videoFile);

      const response = await fetch(
        "https://promptzen.fun/api/upload.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (result.success) {
        setSubmissionData({
          id: result.submissionId,
          status: result.status,
        });

        setSubmitStatus("success");
      } else {
        throw new Error(result.message);
      }
    } catch (err: any) {
      setSubmitStatus("error");
      setErrorMessage(err.message || "Upload Failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <AnimatePresence mode="wait">
          {submitStatus === "success" && submissionData ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-10 rounded-3xl border border-[#1A1A1A]/5 shadow-xl shadow-[#1A1A1A]/5 text-center max-w-2xl mx-auto w-full mt-12"
            >
              <div className="w-20 h-20 bg-[#3A5F45]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-[#3A5F45]" />
              </div>
              <h2 className="text-3xl font-medium mb-4 text-[#1A1A1A]">✅ Thank You!</h2>
              <p className="text-xl text-[#1A1A1A]/70 font-light mb-8">
                Your submission has been received successfully.
              </p>

              <div className="bg-[#FAF9F6] p-6 rounded-2xl text-left border border-[#1A1A1A]/5 mb-8 space-y-4 flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-[#1A1A1A]/60 uppercase tracking-widest mb-1">Submission ID</p>
                  <p className="text-2xl font-bold font-mono text-[#1A1A1A]">{submissionData.id}</p>
                </div>
                <div className="md:text-right">
                  <p className="text-xs font-medium text-[#1A1A1A]/60 uppercase tracking-widest mb-1">Status</p>
                  <p className="text-sm font-medium text-[#C4532B] bg-[#C4532B]/10 px-4 py-2 rounded-full inline-block">{submissionData.status}</p>
                </div>
              </div>

              <p className="text-[#1A1A1A]/60 font-light">
                We will review your submission and contact you if required.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              variants={fadeIn}
              className="grid lg:grid-cols-2 gap-16 lg:gap-24"
            >
              {/* Left: Steps */}
              <div>
                <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-[#1A1A1A] mb-12">
                  How to participate
                </h2>
                <div className="flex flex-col gap-8">
                  {[
                    { n: "1", title: "Create a reel", p: "Pick a theme from above and shoot your reel — anywhere between 15 and 90 seconds." },
                    { n: "2", title: "Upload it", p: "Post it on Instagram, Facebook, or YouTube Shorts — wherever you already create." },
                    { n: "3", title: "Tag #GenZWithTheNation", p: "The hashtag needs to be in your caption — that's how we track and verify your entry." },
                    { n: "4", title: "Submit your reel link", p: "Fill in your details in the form and paste the link to your reel." },
                    { n: "5", title: "Wait for results", p: "That's it. We'll take it from here — keep an eye out for the winners' announcement." }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6 items-start group relative">
                      {i !== 4 && <div className="absolute left-6 top-16 bottom-[-2rem] w-[1px] bg-[#1A1A1A]/10 hidden md:block"></div>}
                      <div className="w-12 h-12 shrink-0 rounded-full border border-[#1A1A1A]/10 bg-white flex items-center justify-center font-medium text-lg text-[#1A1A1A]/50 group-hover:text-[#1A1A1A] group-hover:border-[#1A1A1A]/30 transition-colors shadow-sm relative z-10">
                        {step.n}
                      </div>
                      <div className="pt-2">
                        <h4 className="font-medium text-xl mb-2 text-[#1A1A1A]">{step.title}</h4>
                        <p className="font-light text-[#1A1A1A]/70 text-base leading-relaxed">{step.p}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Form */}
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-[#1A1A1A]/5 border border-[#1A1A1A]/5">
                <h3 className="text-2xl font-medium mb-8 text-[#1A1A1A]">Submit your entry</h3>

                {submitStatus === "error" && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-600 p-4 rounded-xl mb-8 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">{errorMessage}</p>
                  </div>
                )}

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="fullName" render={({ field }) => (
                        <FormItem className="flex flex-col gap-2 space-y-0">
                          <label className="text-xs font-medium text-[#1A1A1A]/60 uppercase tracking-widest">Full Name</label>
                          <FormControl>
                            <input {...field} disabled={isSubmitting} type="text" placeholder="e.g. Ankita Sharma" className="bg-[#FAF9F6] border border-[#1A1A1A]/10 rounded-xl p-4 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]/30 focus:ring-1 focus:ring-[#1A1A1A]/30 transition-all w-full" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="mobileNumber" render={({ field }) => (
                        <FormItem className="flex flex-col gap-2 space-y-0">
                          <label className="text-xs font-medium text-[#1A1A1A]/60 uppercase tracking-widest">Mobile Number</label>
                          <FormControl>
                            <input {...field} disabled={isSubmitting} type="tel" placeholder="10-digit number" className="bg-[#FAF9F6] border border-[#1A1A1A]/10 rounded-xl p-4 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]/30 focus:ring-1 focus:ring-[#1A1A1A]/30 transition-all w-full" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="cityState" render={({ field }) => (
                        <FormItem className="flex flex-col gap-2 space-y-0">
                          <label className="text-xs font-medium text-[#1A1A1A]/60 uppercase tracking-widest">City / State</label>
                          <FormControl>
                            <input {...field} disabled={isSubmitting} type="text" placeholder="e.g. Bhopal, MP" className="bg-[#FAF9F6] border border-[#1A1A1A]/10 rounded-xl p-4 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]/30 focus:ring-1 focus:ring-[#1A1A1A]/30 transition-all w-full" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="profileUrl" render={({ field }) => (
                        <FormItem className="flex flex-col gap-2 space-y-0">
                          <label className="text-xs font-medium text-[#1A1A1A]/60 uppercase tracking-widest">Insta / YT Handle</label>
                          <FormControl>
                            <input {...field} disabled={isSubmitting} type="text" placeholder="@yourusername" className="bg-[#FAF9F6] border border-[#1A1A1A]/10 rounded-xl p-4 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]/30 focus:ring-1 focus:ring-[#1A1A1A]/30 transition-all w-full" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )} />
                    </div>

                    <FormField control={form.control} name="videoUrl" render={({ field }) => (
                      <FormItem className="flex flex-col gap-2 space-y-0">
                        <label className="text-xs font-medium text-[#1A1A1A]/60 uppercase tracking-widest">Reel Link</label>
                        <FormControl>
                          <input {...field} disabled={isSubmitting} type="url" placeholder="Paste your reel's link here" className="bg-[#FAF9F6] border border-[#1A1A1A]/10 rounded-xl p-4 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]/30 focus:ring-1 focus:ring-[#1A1A1A]/30 transition-all w-full" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="videoFile" render={({ field: { onChange, value, ...field } }) => (
                      <FormItem className="flex flex-col gap-2 space-y-0">
                        <FormControl>
                          <div className="relative border border-[#1A1A1A]/10 border-dashed rounded-xl bg-[#FAF9F6] p-6 text-center cursor-pointer hover:bg-black/5 transition-colors">
                            <input
                              type="file"
                              accept="video/mp4"
                              disabled={isSubmitting}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) onChange(file);
                              }}
                              {...field}
                            />
                            <div className="pointer-events-none flex flex-col items-center">
                              <span className="text-sm font-medium text-[#1A1A1A]/70">
                                Click to choose a file — MP4, up to 500MB
                              </span>
                              {value && (
                                <span className="mt-2 text-xs font-medium text-[#3A5F45] bg-[#3A5F45]/10 px-3 py-1 rounded-full">
                                  Selected: {(value as File).name}
                                </span>
                              )}
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="termsAccepted" render={({ field }) => (
                      <FormItem className="flex flex-col gap-1 space-y-0 mt-2">
                        <div className="flex gap-4 items-start">
                          <FormControl>
                            <input
                              type="checkbox"
                              disabled={isSubmitting}
                              checked={field.value}
                              onChange={field.onChange}
                              className="w-5 h-5 rounded border-[#1A1A1A]/20 text-[#3A5F45] focus:ring-[#3A5F45] shrink-0 mt-0.5 cursor-pointer"
                            />
                          </FormControl>
                          <span className="text-sm font-light text-[#1A1A1A]/70 leading-relaxed cursor-pointer" onClick={() => !isSubmitting && field.onChange(!field.value)}>
                            I confirm this reel is my original work, that it includes the #GenZWithTheNation hashtag, and I grant permission for it to be shared on official handles.
                          </span>
                        </div>
                        <FormMessage className="text-xs ml-9" />
                      </FormItem>
                    )} />

                    {isSubmitting && (
                      <div className="space-y-3 bg-[#FAF9F6] p-4 rounded-xl border border-[#1A1A1A]/5 mt-2">
                        <div className="flex justify-between text-sm font-medium text-[#1A1A1A]/60">
                          <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin text-[#1A1A1A]" /> Uploading & Submitting...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2 bg-[#1A1A1A]/10 [&>div]:bg-[#1A1A1A]" />
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#1A1A1A] text-white p-4 rounded-xl font-medium tracking-wide mt-2 hover:bg-[#3A5F45] hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-[#1A1A1A]/10 w-full text-center disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-[#1A1A1A] disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Processing..." : "Submit Entry"}
                    </button>
                  </form>
                </Form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
