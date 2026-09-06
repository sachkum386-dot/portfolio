"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MapPin, Mail, Phone, CheckCircle2, AlertCircle } from "lucide-react";
import { personalInfo } from "@/data/personal";
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaXTwitter,
} from "react-icons/fa6";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Simulate API Network latency
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Contact form submitted data:", data);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset();
  };

  return (
    <div className="space-y-12 w-full max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col">
      {/* Title */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-mono uppercase">Connect Us</h1>
        <p className="text-lg text-card-muted-foreground max-w-2xl">
          Have an inquiry, project proposal, or job opportunity? Submit the form below or reach out via email.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start border-t border-card-border pt-12">
        {/* Contact Info Sidebar */}
        <div className="md:col-span-4 space-y-6">
          <div className="p-6 rounded-lg border border-card-border bg-card space-y-6">
            <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-card-muted-foreground border-b border-card-border pb-2">
              Contact Details
            </h2>

            <div className="space-y-4 text-sm font-mono">
              <div className="flex items-start space-x-3 text-card-muted-foreground">
                <MapPin className="w-5 h-5 text-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-card-muted-foreground font-semibold uppercase">Location</p>
                  <p className="text-foreground mt-0.5">{personalInfo.location}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-card-muted-foreground">
                <Mail className="w-5 h-5 text-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-card-muted-foreground font-semibold uppercase">Email</p>
                  <a href={`mailto:${personalInfo.email}`} className="text-foreground hover:underline mt-0.5 block">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-card-muted-foreground">
                <Phone className="w-5 h-5 text-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-card-muted-foreground font-semibold uppercase">Phone</p>
                  <p className="text-foreground mt-0.5">{personalInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <a
                  href={personalInfo.linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-card-muted-foreground hover:text-blue-600 transition-colors"
                >
                  <FaLinkedin size={24} />
                </a>

                <a
                  href={personalInfo.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-card-muted-foreground hover:text-pink-500 transition-colors"
                >
                  <FaInstagram size={24} />
                </a>

                <a
                  href={personalInfo.facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-card-muted-foreground hover:text-blue-500 transition-colors"
                >
                  <FaFacebook size={24} />
                </a>

                <a
                  href={personalInfo.twitterLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-card-muted-foreground hover:text-foreground transition-colors"
                >
                  <FaXTwitter size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="md:col-span-8">
          <AnimatePresence mode="wait">
            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-8 rounded-lg border border-card-border bg-card text-center flex flex-col items-center justify-center space-y-4"
              >
                <CheckCircle2 className="w-12 h-12 text-foreground" />
                <h3 className="text-xl font-bold tracking-tight">Message Received</h3>
                <p className="text-sm text-card-muted-foreground max-w-sm">
                  Thank you for reaching out! Your message was submitted successfully. I will review it and respond back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-5 py-2 border border-card-border bg-card hover:bg-card-muted rounded text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit(onSubmit)}
                className="p-6 md:p-8 rounded-lg border border-card-border bg-card space-y-6"
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-card-muted-foreground">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register("name")}
                      className={`w-full px-3.5 py-2.5 rounded border bg-background text-sm text-foreground focus:outline-none transition-all ${errors.name ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-card-border focus:ring-1 focus:ring-card-accent"
                        }`}
                      placeholder="e.g. John Doe"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 flex items-center font-mono mt-1">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-card-muted-foreground">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      className={`w-full px-3.5 py-2.5 rounded border bg-background text-sm text-foreground focus:outline-none transition-all ${errors.email ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-card-border focus:ring-1 focus:ring-card-accent"
                        }`}
                      placeholder="e.g. john@example.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 flex items-center font-mono mt-1">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-wider text-card-muted-foreground">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    {...register("subject")}
                    className={`w-full px-3.5 py-2.5 rounded border bg-background text-sm text-foreground focus:outline-none transition-all ${errors.subject ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-card-border focus:ring-1 focus:ring-card-accent"
                      }`}
                    placeholder="Brief description of message"
                  />
                  {errors.subject && (
                    <p className="text-xs text-red-500 flex items-center font-mono mt-1">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-card-muted-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register("message")}
                    className={`w-full px-3.5 py-2.5 rounded border bg-background text-sm text-foreground focus:outline-none transition-all ${errors.message ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-card-border focus:ring-1 focus:ring-card-accent"
                      }`}
                    placeholder="Enter detailed description of inquiry..."
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 flex items-center font-mono mt-1">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  id="contact-submit"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded bg-card-accent text-card-accent-foreground text-xs font-mono uppercase tracking-wider font-bold hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send className="w-3.5 h-3.5 ml-2" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
