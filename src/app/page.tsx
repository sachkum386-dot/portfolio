"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, Calendar, Briefcase } from "lucide-react";
import { personalInfo } from "@/data/personal";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
} as const;

export default function HomePage() {
  // Filter featured projects (maximum 6)
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);

  // Group skills by category
  const categories = ["Frontend", "Backend", "Database", "DevOps", "Cloud"] as const;

  return (
    <div className="space-y-24 md:space-y-36 w-full max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col">
      {/* 1. Hero Section */}
      <section className="min-h-[70vh] flex items-center py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center w-full">
          {/* Hero Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="md:col-span-7 flex flex-col space-y-6 text-left"
          >
            <motion.div variants={fadeInUp} className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-card-muted-foreground uppercase">
                Available for remote roles
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Hi, I&apos;m {personalInfo.name}
              </h1>
              <p className="text-xl sm:text-2xl font-mono text-card-muted-foreground">
                {personalInfo.title}
              </p>
            </motion.div>

            {/* Micro Tags */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
              {["React.js", "Next.js", "Laravel", "Node.js", "React Native", "DevOps Enthusiast"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono rounded-full border border-card-border bg-card text-foreground"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.p variants={fadeInUp} className="text-base text-card-muted-foreground leading-relaxed max-w-xl">
              {personalInfo.aboutMe}
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 items-center pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-card-accent text-card-accent-foreground hover:opacity-90 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-card-accent"
              >
                Contact Me
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <a
                href={personalInfo.resumeLink}
                download
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-card-border bg-card text-foreground hover:bg-card-muted font-medium transition-all"
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </a>
              <div className="flex space-x-2">
                <a
                  href={personalInfo.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-md border border-card-border bg-card text-foreground hover:bg-card-muted transition-all"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-md border border-card-border bg-card text-foreground hover:bg-card-muted transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-5 flex justify-center md:justify-end"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border border-card-border bg-card shadow-sm">
              <Image
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                fill
                priority
                className="object-cover grayscal-0 hover:grayscale-0 transition-all duration-500"
                sizes="(max-width: 768px) 256px, 320px"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. About Me Brief Preview */}
      <section className="border-t border-card-border pt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4">
            <h2 className="text-2xl font-bold tracking-tight uppercase font-mono">About Me</h2>
          </div>
          <div className="md:col-span-8 space-y-6">
            <p className="text-lg text-card-muted-foreground leading-relaxed">
              I specialize in full-stack architecture, writing clean maintainable code, and crafting elegant web platforms. I thrive on solving complex system scaling blockades, establishing automated deployment infrastructure, and ensuring fluid, screen-agnostic user experiences.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-card-border">
              <div>
                <p className="text-3xl font-bold font-mono">{personalInfo.yearsOfExperience}+</p>
                <p className="text-xs text-card-muted-foreground uppercase tracking-wider mt-1">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold font-mono">{projects.length}+</p>
                <p className="text-xs text-card-muted-foreground uppercase tracking-wider mt-1">Projects Built</p>
              </div>
              <div>
                <p className="text-3xl font-bold font-mono">100%</p>
                <p className="text-xs text-card-muted-foreground uppercase tracking-wider mt-1">Data Driven Architecture</p>
              </div>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center text-sm font-medium text-foreground hover:opacity-80 pt-4"
            >
              Read full background biography
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Skills Section */}
      <section className="border-t border-card-border pt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold tracking-tight uppercase font-mono">Skills</h2>
          </div>
          <div className="md:col-span-9 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {categories.map((category) => {
                const categorySkills = skills.filter((s) => s.category === category);
                return (
                  <div key={category} className="p-5 rounded-lg border border-card-border bg-card">
                    <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-card-muted-foreground border-b border-card-border pb-2 mb-3">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((s) => (
                        <span
                          key={s.name}
                          className="inline-flex items-center gap-2 px-2.5 py-1 text-md bg-background border border-card-border rounded font-mono text-foreground"
                        >
                          <Image src={s.icon} alt={s.name} width={20} height={20} />
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Projects Section */}
      <section className="border-t border-card-border pt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4 flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight uppercase font-mono">Works</h2>
              <p className="text-sm text-card-muted-foreground max-w-xs">
                A selection of key full-stack case studies illustrating real-world solutions.
              </p>
            </div>
            <Link
              href="/projects"
              className="hidden md:inline-flex items-center px-4 py-2 rounded-md border border-card-border bg-card text-xs font-mono uppercase tracking-wider hover:bg-card-muted transition-all"
            >
              View all projects
              <ArrowRight className="w-3 h-3 ml-2" />
            </Link>
          </div>
          <div className="md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group flex flex-col justify-between rounded-lg border border-card-border bg-card overflow-hidden transition-colors shadow-[6px_6px_12px_rgba(0,0,0,0.12)]"
                >
                  <div className="relative aspect-video w-full border-b border-card-border bg-card-muted ">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-fill grayscale-0 group-hover:grayscale-0 transition-all duration-300"
                      sizes="(max-width: 768px) 100vw, 350px"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold tracking-tight">{project.title}</h3>
                      <p className="text-xs text-card-muted-foreground line-clamp-2">
                        {project.shortDescription}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2 py-0.5 text-[10px] bg-background border border-card-border rounded font-mono text-foreground">
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-2 py-0.5 text-[10px] bg-background border border-card-border rounded font-mono text-card-muted-foreground">
                            +{project.techStack.length - 3} more
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center justify-center w-full py-2 rounded border border-card-border bg-card hover:bg-card-accent hover:text-card-accent-foreground text-xs font-mono uppercase tracking-wider transition-all"
                      >
                        Case Study
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex md:hidden">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center w-full py-3 rounded-md border border-card-border bg-card text-xs font-mono uppercase tracking-wider hover:bg-card-muted transition-all"
              >
                View all 10 projects
                <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Experience Timeline Section */}
      <section className="border-t border-card-border pt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4">
            <h2 className="text-2xl font-bold tracking-tight uppercase font-mono">Career</h2>
          </div>
          <div className="md:col-span-8">
            <div className="relative border-l border-card-border pl-6 ml-2 space-y-12">
              {experiences.slice(0, 2).map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
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
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx}>{resp}</li>
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
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Contact CTA Section */}
      <section className="border-t border-card-border pt-16 pb-8">
        <div className="rounded-2xl border border-card-border bg-card p-8 md:p-12 text-center flex flex-col items-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-md">
            Let&apos;s build something great together.
          </h2>
          <p className="text-sm text-card-muted-foreground max-w-md">
            Interested in hiring me, collaborating on a project, or just asking a technical question? Drop me a message and let&apos;s start talking.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-card-accent text-card-accent-foreground hover:opacity-90 font-medium font-mono uppercase tracking-wider text-xs transition-all"
          >
            Get In Touch
            <Mail className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
