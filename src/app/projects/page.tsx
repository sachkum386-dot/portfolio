"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, FolderKanban, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { filterSkills } from "@/data/skills";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Extract all unique technologies from all projects for filters
  const allTechs = useMemo(() => {
    return [...new Set(filterSkills)].sort();
  }, []);

  // Filter projects by both search query and selected technology
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTech = selectedTech ? project.techStack.includes(selectedTech) : true;

      return matchesSearch && matchesTech;
    });
  }, [searchQuery, selectedTech]);

  return (
    <div className="space-y-12 w-full max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col">
      {/* Page Title */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-mono uppercase">Works</h1>
        <p className="text-lg text-card-muted-foreground max-w-2xl">
          Browse through all {projects.length} development case studies. Search by project title or filter by specific technology stacks.
        </p>
      </div>

      {/* Search and Filter Interface */}
      <div className="flex flex-col md:flex-row gap-6 items-stretch md:items-center justify-end border-y border-card-border py-6">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-card-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects by name, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-card-border bg-card text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-card-accent transition-all"
          />
        </div>

        {/* Dynamic Reset Filter Indicator */}
        {selectedTech && (
          <button
            onClick={() => setSelectedTech(null)}
            className="self-start md:self-auto text-xs font-mono underline hover:text-card-muted-foreground transition-colors"
          >
            Clear tech filter ({selectedTech})
          </button>
        )}
      </div>

      {/* Horizontal Tech Pill Filters */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-xs font-mono text-card-muted-foreground">
          <Filter className="w-3.5 h-3.5" />
          <span>FILTER BY TECHNOLOGY:</span>
        </div>
        <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto p-1 border border-card-border/50 rounded-md bg-card/20">
          <button
            onClick={() => setSelectedTech(null)}
            className={`px-3 py-1 rounded text-xs font-mono border transition-all ${selectedTech === null
              ? "bg-card-accent text-card-accent-foreground border-card-accent"
              : "bg-card border-card-border text-foreground hover:bg-card-muted"
              }`}
          >
            All Techs
          </button>
          {allTechs.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-3 py-1 rounded text-xs font-mono border transition-all ${selectedTech === tech
                ? "bg-card-accent text-card-accent-foreground border-card-accent"
                : "bg-card border-card-border text-foreground hover:bg-card-muted"
                }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid with AnimatePresence */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <p className="text-xs font-mono text-card-muted-foreground">
            SHOWING {filteredProjects.length} OF {projects.length} PROJECTS
          </p>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="rounded-lg border border-card-border bg-card p-12 text-center flex flex-col items-center justify-center space-y-4">
            <FolderKanban className="w-12 h-12 text-card-muted-foreground" />
            <h3 className="text-lg font-bold">No Projects Found</h3>
            <p className="text-sm text-card-muted-foreground max-w-sm">
              We couldn&apos;t find any projects matching your criteria. Try adjusting your search query or clear the selected technology filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTech(null);
              }}
              className="px-4 py-2 bg-card-accent text-card-accent-foreground text-xs font-mono uppercase tracking-wider rounded hover:opacity-90"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="group flex flex-col justify-between rounded-lg border border-card-border bg-card overflow-hidden transition-colors shadow-[6px_6px_12px_rgba(0,0,0,0.12)]"
                >
                  <div className="relative aspect-video w-full border-b border-card-border bg-card-muted overflow-hidden">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover grayscale-0 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 350px"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">

                      <h2 className="text-xl font-bold tracking-tight flex items-center justify-between">
                        {project.title}
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h2>
                      <p className="text-xs text-card-muted-foreground line-clamp-3">
                        {project.shortDescription}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[9px] bg-background border border-card-border rounded font-mono text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center justify-center w-full py-2.5 rounded border border-card-border bg-card hover:bg-card-accent hover:text-card-accent-foreground text-xs font-mono uppercase tracking-wider transition-all"
                      >
                        View Case Study
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
