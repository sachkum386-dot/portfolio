"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/personal";
import { educations } from "@/data/education";
import { experiences } from "@/data/experience";
import { Calendar, GraduationCap, Briefcase, MapPin, Mail, Phone, Award } from "lucide-react";
import Image from "next/image";
import { div } from "framer-motion/client";

const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
} as const;

export default function AboutPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-16 md:space-y-24"
      >
        {/* Hero Banner Header */}
        <motion.div variants={fadeInUp} className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-mono uppercase">Profile</h1>
          <p className="text-lg text-card-muted-foreground max-w-2xl">
            A deeper look into my background, academic roots, and professional journey in engineering.
          </p>
        </motion.div>

        {/* Profile Photo and Detailed Bio */}
        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Profile Info Card */}
          <div className="md:col-span-4 space-y-6">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-card-border bg-card shadow-sm">
              <Image
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                fill
                className="object-cover grayscale-0"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>

            {/* Metadata bullets */}
            <div className="p-5 rounded-lg border border-card-border bg-card space-y-4 text-sm font-mono">
              <div className="flex items-center space-x-3 text-card-muted-foreground">
                <MapPin className="w-4 h-4 text-foreground" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center space-x-3 text-card-muted-foreground">
                <Mail className="w-4 h-4 text-foreground" />
                <a href={`mailto:${personalInfo.email}`} className="hover:underline hover:text-foreground">
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-card-muted-foreground">
                <Phone className="w-4 h-4 text-foreground" />
                <span>{personalInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-card-muted-foreground">
                <Award className="w-4 h-4 text-foreground" />
                <span>{personalInfo.yearsOfExperience} Years Experience</span>
              </div>
            </div>
          </div>

          {/* Long Text Bio */}
          <div className="md:col-span-8 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Biography</h2>
            <p className="text-base text-card-muted-foreground leading-relaxed">
              I am a software developer with a strong foundation in computer systems, backend processes, and client interactions. Having worked across scaling start-ups and enterprise systems, I specialize in architecting full-stack programs that are robust, highly testable, and reliable.
            </p>
            <p className="text-base text-card-muted-foreground leading-relaxed">
              Over the course of my career, I have driven complex microservice migrations, set up scalable staging workflows, and developed data-driven dashboards. I believe in software engineering that balances technical flexibility with solid execution, resulting in platforms that are satisfying to work on and use.
            </p>
            <p className="text-base text-card-muted-foreground leading-relaxed">
              Currently, I focus on using modern platforms like Next.js, Laravel, Node.js, and Kubernetes to build high-performance products. I am always excited to learn new paradigms, contribute to core codebases, and collaborate with teams to build outstanding software solutions.
            </p>
          </div>
        </motion.div>

        {/* Career Timeline Section */}
        <motion.section variants={fadeInUp} className="border-t border-card-border pt-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4">
              <h2 className="text-2xl font-bold tracking-tight uppercase font-mono">Experience</h2>
              <p className="text-xs text-card-muted-foreground mt-2">Professional software development roles</p>
            </div>
            <div className="md:col-span-8">
              <div className="relative border-l border-card-border pl-6 ml-2 space-y-12">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative">
                    <span className="absolute -left-[31px] top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-background border border-card-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-card-accent" />
                    </span>

                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h3 className="text-lg font-bold tracking-tight">{exp.position}</h3>
                        <span className="inline-flex items-center text-xs font-mono text-card-muted-foreground">
                          <Calendar className="w-3 h-3 mr-1" />
                          {exp.duration}
                        </span>
                      </div>
                      <div className="flex items-center text-sm font-medium font-mono text-card-muted-foreground">
                        <Briefcase className="w-3.5 h-3.5 mr-1.5" />
                        {exp.company}
                      </div>
                      <ul className="space-y-1.5 text-sm text-card-muted-foreground list-disc pl-4 leading-relaxed">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx}>{resp}</li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.technologies.map((tech) => (
                          <span key={tech} className="px-2 py-0.5 text-[10px] bg-card border border-card-border rounded font-mono text-foreground">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section variants={fadeInUp} className="border-t border-card-border pt-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4">
              <h2 className="text-2xl font-bold tracking-tight uppercase font-mono">Education</h2>
              <p className="text-xs text-card-muted-foreground mt-2">Academic background details</p>
            </div>
            <div className="md:col-span-8">
              <div className="space-y-8">
                {educations.map((edu) => (
                  <div key={edu.id} className="p-6 rounded-lg border border-card-border bg-card space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-card-border pb-2">
                      <h3 className="text-lg font-bold tracking-tight flex items-center">
                        <GraduationCap className="w-5 h-5 mr-2" />
                        {edu.degree}
                      </h3>
                      <span className="inline-flex items-center text-xs font-mono text-card-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {edu.duration}
                      </span>
                    </div>
                    <p className="text-sm font-mono text-foreground font-semibold">{edu.institution}</p>
                    <p className="text-sm text-card-muted-foreground leading-relaxed">{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
