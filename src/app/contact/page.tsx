"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // In a real app, send this to an API
    alert("Message sent successfully!");
    form.reset();
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center mb-16">
        <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-6">Get in Touch</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have a question or want to collaborate? We'd love to hear from you.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-5 gap-12 items-start">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.1 }} className="md:col-span-2 space-y-8">
          <div className="bg-muted/10 border border-border/40 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center"><MessageSquare className="mr-3 text-primary" /> Contact Info</h3>
            <div className="space-y-6 text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground mb-1">Campaign Email</p>
                <a href="mailto:hello@genznation.campaign" className="hover:text-primary transition-colors flex items-center">
                  <Mail className="w-4 h-4 mr-2" /> hello@genznation.campaign
                </a>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">Follow the Movement</p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all">
                    X
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all">
                    IG
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all">
                    YT
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }} className="md:col-span-3">
          <div className="bg-card p-8 rounded-2xl border border-border/40 shadow-xl shadow-background/50">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" className="bg-background" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" type="email" className="bg-background" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="How can we help?" className="bg-background" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Write your message here..." 
                          className="bg-background min-h-[150px] resize-y" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full sm:w-auto rounded-full px-8">
                  Send Message <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
