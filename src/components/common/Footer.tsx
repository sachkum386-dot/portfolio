"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { personalInfo } from "@/data/personal";
import { socialLinks } from "@/data/socialLinks";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-card-border bg-background transition-colors py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* Left Side: Brand and Copyright */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <p className="text-sm font-mono font-bold tracking-wider">
            {personalInfo.name.toUpperCase()}
          </p>
          <p className="text-xs text-card-muted-foreground">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>
        </div>

        {/* Middle Side: Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link href="/" className="text-xs text-card-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-xs text-card-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/projects" className="text-xs text-card-muted-foreground hover:text-foreground transition-colors">
            Projects
          </Link>
          <Link href="/contact" className="text-xs text-card-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>

        {/* Right Side: Social Media Icons */}
        <div className="flex items-center space-x-4">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md hover:bg-card-muted text-card-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md hover:bg-card-muted text-card-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md hover:bg-card-muted text-card-muted-foreground hover:text-foreground transition-colors"
            aria-label="Twitter Profile"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${socialLinks.email}`}
            className="p-2 rounded-md hover:bg-card-muted text-card-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email Address"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
