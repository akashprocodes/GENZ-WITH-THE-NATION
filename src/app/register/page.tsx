"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, UploadCloud } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  // Step 1
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),
  // Step 2
  platform: z.string().min(1, "Please select a platform"),
  profileUrl: z.string().url("Invalid URL"),
  followerCount: z.string().optional(),
  // Step 3
  videoTitle: z.string().min(2, "Video title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  language: z.string().min(2, "Language is required"),
  hashtag: z.string().min(2, "Hashtag is required"),
  videoUrl: z.string().url("Invalid Video URL"),
  // Step 4 is handled separately for file upload to keep state simple
  // Step 5
  consentOwnership: z.boolean().refine((val) => val === true, "You must confirm ownership"),
  consentFeature: z.boolean().refine((val) => val === true, "You must allow featuring"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Register() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "", email: "", phone: "", city: "", state: "", country: "",
      platform: "", profileUrl: "", followerCount: "",
      videoTitle: "", description: "", language: "", hashtag: "", videoUrl: "",
      consentOwnership: false, consentFeature: false,
    },
    mode: "onTouched",
  });

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ["fullName", "email", "phone", "city", "state", "country"];
    if (step === 2) fieldsToValidate = ["platform", "profileUrl", "followerCount"];
    if (step === 3) fieldsToValidate = ["videoTitle", "description", "language", "hashtag", "videoUrl"];
    
    if (step === 4 && !file) {
      alert("Please upload a raw video file.");
      return;
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.size > 500 * 1024 * 1024) { // 500MB limit
        alert("File size exceeds 500MB limit.");
        return;
      }
      setFile(selected);
    }
  };

  const submitData = async (data: FormValues) => {
    setIsSubmitting(true);
    setUploadProgress(10);
    
    try {
      // Convert file to base64 for GAS
      let base64File = "";
      if (file) {
        setUploadProgress(30);
        base64File = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = (reader.result as string).split(',')[1];
            resolve(base64String);
          };
          reader.readAsDataURL(file);
        });
      }
      
      setUploadProgress(60);

      const payload = {
        ...data,
        fileName: file?.name || "",
        mimeType: file?.type || "",
        fileData: base64File,
      };

      // Ensure you replace this with your actual Google Apps Script Web App URL
      const scriptUrl = process.env.NEXT_PUBLIC_GAS_URL || "";
      
      if (!scriptUrl) {
        console.warn("No GAS URL configured. Simulating success.");
        setTimeout(() => {
          setUploadProgress(100);
          const generatedId = "GZN-" + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
          setSubmissionId(generatedId);
          setIsSubmitting(false);
          setStep(6);
        }, 2000);
        return;
      }

      const response = await fetch(scriptUrl, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setUploadProgress(90);

      const result = await response.json();
      
      setUploadProgress(100);
      setSubmissionId(result.submissionId || "GZN-UNKNOWN");
      setStep(6);
      
    } catch (error) {
      console.error("Submission failed", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="fullName" render={({ field }) => (
                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="john@example.com" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="+1 234 567 8900" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="city" render={({ field }) => (
                <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="New York" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="state" render={({ field }) => (
                <FormItem><FormLabel>State</FormLabel><FormControl><Input placeholder="NY" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="country" render={({ field }) => (
                <FormItem><FormLabel>Country</FormLabel><FormControl><Input placeholder="United States" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Social Media</h2>
            <FormField control={form.control} name="platform" render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Platform</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select platform" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="YouTube">YouTube</SelectItem>
                    <SelectItem value="TikTok">TikTok</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="X">X (Twitter)</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="profileUrl" render={({ field }) => (
              <FormItem><FormLabel>Profile URL</FormLabel><FormControl><Input placeholder="https://instagram.com/yourhandle" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="followerCount" render={({ field }) => (
              <FormItem><FormLabel>Follower Count (Optional)</FormLabel><FormControl><Input placeholder="e.g. 10k" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Video Details</h2>
            <FormField control={form.control} name="videoTitle" render={({ field }) => (
              <FormItem><FormLabel>Video Title</FormLabel><FormControl><Input placeholder="My GenZ Story" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem><FormLabel>Short Description</FormLabel><FormControl><Textarea placeholder="Briefly describe what your video is about..." {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="language" render={({ field }) => (
                <FormItem><FormLabel>Language</FormLabel><FormControl><Input placeholder="English" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="hashtag" render={({ field }) => (
                <FormItem><FormLabel>Campaign Hashtag</FormLabel><FormControl><Input placeholder="#GenZNation" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <FormField control={form.control} name="videoUrl" render={({ field }) => (
              <FormItem><FormLabel>Posted Video URL (Social Media)</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Raw Video Upload</h2>
            <p className="text-muted-foreground mb-4">Upload the raw .MP4 or .MOV file of your video without watermarks if possible.</p>
            <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center flex flex-col items-center justify-center hover:bg-muted/10 transition-colors">
              <UploadCloud className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="font-medium mb-2">Drag & drop your video here</p>
              <p className="text-sm text-muted-foreground mb-6">MP4 or MOV, max 500MB</p>
              <Button type="button" variant="outline" onClick={() => document.getElementById("video-upload")?.click()}>
                Browse Files
              </Button>
              <input id="video-upload" type="file" accept="video/mp4,video/quicktime" className="hidden" onChange={handleFileChange} />
              {file && (
                <div className="mt-6 flex items-center text-sm font-medium text-primary">
                  <CheckCircle2 className="w-4 h-4 mr-2" /> {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                </div>
              )}
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Consent</h2>
            <FormField control={form.control} name="consentOwnership" render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>I confirm that this video belongs to me.</FormLabel>
                </div>
              </FormItem>
            )} />
            <FormField control={form.control} name="consentFeature" render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>I allow GenZWithTheNation to feature my content in the national campaign.</FormLabel>
                </div>
              </FormItem>
            )} />
            
            {isSubmitting && (
              <div className="space-y-2 pt-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Uploading submission...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </motion.div>
        );
      case 6:
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6 py-12">
            <div className="w-24 h-24 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-bold font-heading">Thank You!</h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">Your submission has been received successfully.</p>
            
            <div className="bg-muted/30 p-6 rounded-2xl max-w-md mx-auto my-8 border border-border/50">
              <div className="text-sm text-muted-foreground mb-1">Submission ID</div>
              <div className="text-2xl font-mono font-bold tracking-wider text-primary mb-4">{submissionId}</div>
              <div className="grid grid-cols-2 gap-4 text-left mt-6">
                <div>
                  <div className="text-xs text-muted-foreground">Review Status</div>
                  <div className="font-medium">Pending Review</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Expected Review Time</div>
                  <div className="font-medium">24-48 Hours</div>
                </div>
              </div>
            </div>

            <Link href="/">
              <Button size="lg" className="rounded-full px-8">
                Return to Home
              </Button>
            </Link>
          </motion.div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">Creator Registration</h1>
          <p className="text-muted-foreground">Join the movement and share your authentic story.</p>
        </div>

        {step < 6 && (
          <div className="mb-10">
            <div className="flex justify-between text-xs font-medium text-muted-foreground mb-2">
              <span>Step {step} of 5</span>
              <span>{Math.round((step / 5) * 100)}%</span>
            </div>
            <Progress value={(step / 5) * 100} className="h-2 bg-muted/50" />
          </div>
        )}

        <div className="bg-card p-6 md:p-10 rounded-3xl border border-border/40 shadow-2xl shadow-background/50">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitData)}>
              <AnimatePresence mode="wait">
                {renderStepContent()}
              </AnimatePresence>
              
              {step < 6 && (
                <div className="flex justify-between mt-10 pt-6 border-t border-border/40">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={prevStep} 
                    disabled={step === 1 || isSubmitting}
                    className="rounded-full"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                  </Button>
                  
                  {step < 5 ? (
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      className="rounded-full px-6"
                    >
                      Continue <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="rounded-full px-8 shadow-lg shadow-primary/20"
                    >
                      {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting</> : 'Submit Campaign'}
                    </Button>
                  )}
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
