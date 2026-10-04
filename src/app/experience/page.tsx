"use client";

import Link from "next/link";
import { TechLabel } from "@/components/TechLabel";
import { HandNote } from "@/components/HandNote";
import { FlowField } from "@/components/FlowField";
import { experienceData } from "@/content/experience";
import { ArrowLeft, Briefcase, Calendar, MapPin, CheckCircle2, TrendingUp } from "lucide-react";

export default function ExperiencePage() {
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
          <TechLabel code="EXPERIENCE" variant="red">CAREER TIMELINE</TechLabel>
          <TechLabel code="TOTAL ROLES">{experienceData.length} POSITION</TechLabel>
        </div>
      </div>

      <div className="space-y-4 mb-12">
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-ink tracking-tight">
          WORK EXPERIENCE
        </h1>
        <p className="font-editorial text-xl sm:text-2xl text-muted italic max-w-3xl">
          Practical industry experience building production web automation tools, Playwright testing pipelines, and Next.js interface components.
        </p>
      </div>

      {/* Timeline List */}
      <div className="space-y-12">
        {experienceData.map((exp) => (
          <div
            key={exp.id}
            className="p-8 border border-muted/30 rounded-2xl bg-bg/80 backdrop-blur-md space-y-6 shadow-xl relative overflow-hidden"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-muted/20 pb-4">
              <div className="space-y-1">
                <span className="font-technical text-xs text-red font-bold uppercase">{exp.company}</span>
                <h2 className="font-display text-3xl text-ink">{exp.role}</h2>
              </div>
              <div className="flex flex-col items-end gap-1 font-technical text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-red" /> {exp.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-muted" /> {exp.location}
                </span>
              </div>
            </div>

            <p className="font-editorial text-lg text-ink/90 leading-relaxed">
              {exp.summary}
            </p>

            <div className="space-y-3">
              <span className="font-technical text-xs font-bold text-ink uppercase flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-red" /> KEY RESPONSIBILITIES & METRICS:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 font-editorial text-base text-ink/90">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-3 border border-muted/15 rounded-xl bg-ink/5">
                    <CheckCircle2 className="w-4 h-4 text-red shrink-0 mt-1" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-muted/20 flex flex-wrap gap-2">
              {exp.skills.map((skill) => (
                <TechLabel key={skill} code="SKILL">
                  {skill}
                </TechLabel>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
