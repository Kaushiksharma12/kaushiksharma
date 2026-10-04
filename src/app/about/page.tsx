"use client";

import Link from "next/link";
import { TechLabel } from "@/components/TechLabel";
import { HandNote } from "@/components/HandNote";
import { FlowField } from "@/components/FlowField";
import { profileData } from "@/content/profile";
import { ArrowLeft, User, MapPin, Mail, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen px-6 md:px-16 pt-24 pb-20 max-w-7xl mx-auto">
      <FlowField calmMode={true} />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-technical text-xs text-muted hover:text-red transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO HOME</span>
        </Link>
        <div className="flex items-center gap-2">
          <TechLabel code="IDENTITY" variant="red">BIOGRAPHY & BACKGROUND</TechLabel>
          <TechLabel code="LOCATION">MUMBAI, IN</TechLabel>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start my-10">
        {/* Left Column: Big Editorial Statement */}
        <div className="lg:col-span-7 space-y-6">
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-ink tracking-tight">
            ABOUT KAUSHIK
          </h1>
          <p className="font-editorial text-2xl sm:text-3xl text-ink/90 leading-tight">
            {profileData.editorialStatement}
          </p>

          <div className="space-y-4 font-editorial text-lg text-muted leading-relaxed border-t border-muted/20 pt-6">
            <p>
              I graduated with a B.Sc. in Computer Science specializing in Artificial Intelligence & Machine Learning from Nagindas Khandwala College (CGPA 7.83). My journey combines academic computer science fundamentals—data structures, graph search, state-space exploration—with production web applications.
            </p>
            <p>
              During my AI Internship at Autowhat (APML), I worked directly on Playwright browser automation, Next.js web application interfaces, and intelligent data extraction pipelines that eliminated manual repetitive tasks.
            </p>
          </div>

          <HandNote arrow="right" underline={true}>
            &quot;Converting theoretical algorithms into reliable software.&quot;
          </HandNote>
        </div>

        {/* Right Column: Contact Details Card & Quick Info */}
        <div className="lg:col-span-5 p-8 border border-muted/30 rounded-2xl bg-bg/80 backdrop-blur-md space-y-6 shadow-xl sticky top-24">
          <div className="flex items-center gap-3 border-b border-muted/20 pb-4">
            <User className="w-5 h-5 text-red" />
            <h2 className="font-display text-2xl text-ink">QUICK METADATA</h2>
          </div>

          <div className="space-y-4 font-technical text-xs">
            <div className="flex justify-between items-center py-2 border-b border-muted/15">
              <span className="text-muted flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red" /> LOCATION:
              </span>
              <span className="text-ink font-bold">{profileData.location}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-muted/15">
              <span className="text-muted flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-red" /> EMAIL:
              </span>
              <a href={`mailto:${profileData.email}`} className="text-red font-bold hover:underline">
                {profileData.email}
              </a>
            </div>



            <div className="flex justify-between items-center py-2 border-b border-muted/15">
              <span className="text-muted flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-red" /> DEGREE:
              </span>
              <span className="text-ink font-bold">B.Sc. CS (AI & ML)</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <a
              href={profileData.github}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 text-center border border-muted/30 rounded-full font-technical text-xs text-ink hover:border-red transition-all"
            >
              GITHUB PROFILE
            </a>
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 text-center bg-ink text-bg rounded-full font-technical text-xs hover:bg-red hover:text-white transition-all"
            >
              LINKEDIN PROFILE
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
