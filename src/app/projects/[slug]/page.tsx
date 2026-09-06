import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Database,
  Cpu,
  Route,
  AlertTriangle,
  BookOpen,
  Activity,
  Layers,
  Settings
} from "lucide-react";
import { Lightbox } from "@/components/project/Lightbox";
import Image from "next/image";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Find next project for quick navigation traversal
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="space-y-12">

      {/* 1. Hero Section */}
      <div className="relative overflow-hidden border-card-border min-h-[80vh]">
        {/* Background Image */}
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-contain"
          priority
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 flex min-h-[80vh] flex-col justify-end p-4 md:p-8">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-white uppercase"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              {project.title}
            </h1> */}

            <div className="flex items-center space-x-3">
              {/* Buttons */}
            </div>
          </div>

          <p className="text-lg md:text-xl text-gray-200 max-w-3xl leading-relaxed">
            {project.shortDescription}
          </p>
        </div>
      </div>


      <div className="w-full max-w-6xl mx-auto px-4 py-2 md:py-12 flex flex-col">
        {/* 3. Specs / Project Metadata Grid */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
              {project.title}
            </h1>

            {project.badges && (
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${project.badges === "College"
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "bg-amber-100 text-amber-700 border border-amber-200"
                  }`}
              >
                {project.badges}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-black/80"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}

            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-100"
              >
                <Github size={16} />
                GitHub
              </a>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-lg border border-card-border bg-card/50 font-mono text-sm">
          <div>
            <p className="text-xs text-card-muted-foreground uppercase">My Role</p>
            <p className="font-bold text-foreground mt-1">{project.role}</p>
          </div>
          <div>
            <p className="text-xs text-card-muted-foreground uppercase">Team Size</p>
            <p className="font-bold text-foreground mt-1">{project.teamSize}</p>
          </div>
          <div>
            <p className="text-xs text-card-muted-foreground uppercase">Duration</p>
            <p className="font-bold text-foreground mt-1">{project.duration}</p>
          </div>
          <div>
            <p className="text-xs text-card-muted-foreground uppercase">Key Stack</p>
            <p className="font-bold text-foreground mt-1 truncate">{project.keyStack?.slice(0, 2).join(", ")}</p>
          </div>
        </div>

        {/* 4. Core Case Study Details */}
        <div className="grid grid-cols-1 mt-5 md:grid-cols-12 gap-8 md:gap-12">
          {/* Left Side: Long Description and breakdowns */}
          <div className="md:col-span-8 space-y-10">
            {/* Overview */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
              <p className="text-base text-card-muted-foreground leading-relaxed">
                {project.overview}
              </p>
            </section>

            {/* Business Problem vs Solution */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-card-border pt-8">
              <div className="space-y-2">
                <h3 className="text-lg font-bold flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-card-muted-foreground" />
                  The Business Problem
                </h3>
                <p className="text-sm text-card-muted-foreground leading-relaxed">
                  {project.businessProblem}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-foreground" />
                  The Solution
                </h3>
                <p className="text-sm text-card-muted-foreground leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </section>

            {/* System Architecture */}
            <section className="border-t border-card-border pt-8 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight flex items-center">
                <Layers className="w-6 h-6 mr-2 text-card-muted-foreground" />
                System Architecture
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.architecture.map((layer, index) => (
                  <div key={index} className="p-4 rounded border border-card-border bg-card flex items-start space-x-3 text-sm">
                    <span className="font-mono text-xs text-card-muted-foreground bg-background border border-card-border px-1.5 py-0.5 rounded">
                      Layer {index + 1}
                    </span>
                    <span className="text-foreground font-medium">{layer}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Project Flow */}
            <section className="border-t border-card-border pt-8 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight flex items-center">
                <Route className="w-6 h-6 mr-2 text-card-muted-foreground" />
                Project Flow
              </h2>
              <div className="space-y-3 font-mono text-sm text-card-muted-foreground">
                {project.projectFlow.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <span className="text-foreground font-bold">{idx + 1}.</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Database Design */}
            {project.databaseDesign && project.databaseDesign.length > 0 && (
              <section className="border-t border-card-border pt-8 space-y-4">
                <h2 className="text-2xl font-bold tracking-tight flex items-center">
                  <Database className="w-6 h-6 mr-2 text-card-muted-foreground" />
                  Database Design
                </h2>
                <div className="p-5 rounded-lg border border-card-border bg-card font-mono text-xs text-card-muted-foreground space-y-2">
                  <span className="text-foreground font-bold block">// DATABASE TABLES CONFIGURATION</span>
                  {project.databaseDesign.map((table, idx) => (
                    <p key={idx} className="border-b border-card-border/50 pb-1.5 last:border-b-0">
                      {table}
                    </p>
                  ))}
                </div>
              </section>
            )}
            {/* API Flow */}
            {project.apiFlow && project.apiFlow.length > 0 && (
              <section className="border-t border-card-border pt-8 space-y-4">
                <h2 className="text-2xl font-bold tracking-tight flex items-center">
                  <Cpu className="w-6 h-6 mr-2 text-card-muted-foreground" />
                  API Flow Matrix
                </h2>
                <div className="space-y-2 font-mono text-xs">
                  {project.apiFlow.map((route, idx) => {
                    const parts = route.split(" - ");
                    const methodUrl = parts[0];
                    const desc = parts[1];
                    const method = methodUrl.split(" ")[0];
                    const url = methodUrl.substring(method.length + 1);

                    return (
                      <div key={idx} className="p-3 rounded border border-card-border bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-0.5 rounded font-bold uppercase ${method === "GET" ? "bg-green-500/10 text-green-500 border border-green-500/20" :
                            method === "POST" ? "bg-blue-500/10 text-blue-500 border border-blue-500/20" :
                              "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                            }`}>
                            {method}
                          </span>
                          <span className="text-foreground font-semibold">{url}</span>
                        </div>
                        <span className="text-card-muted-foreground text-right">{desc}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
            {/* Challenges faced */}
            <section className="border-t border-card-border pt-8 space-y-3">
              <h2 className="text-2xl font-bold tracking-tight flex items-center">
                <Settings className="w-6 h-6 mr-2 text-card-muted-foreground" />
                Challenges & Blockers
              </h2>
              <ul className="space-y-2 text-sm text-card-muted-foreground list-disc pl-4 leading-relaxed">
                {project.challenges.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </section>

            {/* Learning outcomes */}
            <section className="border-t border-card-border pt-8 space-y-3">
              <h2 className="text-2xl font-bold tracking-tight flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-card-muted-foreground" />
                Learning Outcomes
              </h2>
              <ul className="space-y-2 text-sm text-card-muted-foreground list-disc pl-4 leading-relaxed">
                {project.learnings.map((l, idx) => (
                  <li key={idx}>{l}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Side: Key Features & Tech Stack sticky lists */}
          <div className="md:col-span-4 space-y-6">
            {/* Key Features */}
            <div className="p-6 rounded-lg border border-card-border bg-card space-y-4">
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-card-muted-foreground border-b border-card-border pb-2">
                Features
              </h3>
              <ul className="space-y-2.5 text-xs font-mono text-card-muted-foreground">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-foreground mr-2 font-bold">-</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack details */}
            <div className="p-6 rounded-lg border border-card-border bg-card space-y-4">
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-card-muted-foreground border-b border-card-border pb-2">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs bg-background border border-card-border rounded font-mono text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5. Screenshots Gallery Section */}
        <section className="border-t border-card-border pt-12 mb-5">
          <Lightbox images={project.images} title={project.title} />
        </section>

        {/* 6. Footer Navigation / Next Case Study CTA */}
        <section className="border-t border-card-border pt-12 pb-6">
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group block p-6 rounded-xl border border-card-border bg-card hover:border-card-accent transition-colors text-left"
          >
            <p className="text-xs font-mono text-card-muted-foreground uppercase tracking-widest">
              Next Project Case Study
            </p>
            <div className="flex items-center justify-between mt-2">
              <h4 className="text-xl font-bold tracking-tight">{nextProject.title}</h4>
              <span className="inline-flex items-center text-sm font-mono group-hover:translate-x-1 transition-transform">
                Explore Study
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </span>
            </div>
            <p className="text-xs text-card-muted-foreground mt-1">
              {nextProject.shortDescription}
            </p>
          </Link>
        </section>
      </div>
    </div>
  );
}
