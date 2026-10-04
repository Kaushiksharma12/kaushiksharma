"use client";

import Link from "next/link";
import { TechLabel } from "@/components/TechLabel";
import { HandNote } from "@/components/HandNote";
import { FlowField } from "@/components/FlowField";
import { educationData } from "@/content/education";
import { ArrowLeft, GraduationCap, Calendar, Award, BookOpen } from "lucide-react";

export default function EducationPage() {
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
          <TechLabel code="ACADEMICS" variant="red">EDUCATION RECORD</TechLabel>
          <TechLabel code="SPECIALIZATION">AI & ML</TechLabel>
        </div>
      </div>

      <div className="space-y-4 mb-12">
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-ink tracking-tight">
          EDUCATION & DEGREES
        </h1>
        <p className="font-editorial text-xl sm:text-2xl text-muted italic max-w-3xl">
          Formal academic foundation in computer science, software design principles, and machine learning theory.
        </p>
      </div>

      {/* Education Cards Grid */}
      <div className="space-y-8">
        {educationData.map((edu) => (
          <div
            key={edu.id}
            className="p-8 border border-muted/30 rounded-2xl bg-bg/80 backdrop-blur-md space-y-6 shadow-xl"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-muted/20 pb-4">
              <div className="space-y-1">
                <span className="font-technical text-xs text-red font-bold uppercase">{edu.institution}</span>
                <h2 className="font-display text-3xl text-ink">{edu.degree}</h2>
                {edu.fieldOfStudy && (
                  <span className="font-editorial text-lg text-muted block italic">
                    Specialization: {edu.fieldOfStudy}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="flex items-center gap-1 font-technical text-xs text-muted">
                  <Calendar className="w-3.5 h-3.5 text-red" /> {edu.period}
                </span>
                <TechLabel code="GRADE" variant="red">
                  {edu.grade}
                </TechLabel>
              </div>
            </div>

            {edu.details && (
              <p className="font-editorial text-lg text-ink/90 leading-relaxed">
                {edu.details}
              </p>
            )}

            {edu.relevantCourses && edu.relevantCourses.length > 0 && (
              <div className="space-y-3 pt-2">
                <span className="font-technical text-xs font-bold text-ink uppercase flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-red" /> RELEVANT COURSEWORK:
                </span>
                <div className="flex flex-wrap gap-2">
                  {edu.relevantCourses.map((course) => (
                    <span
                      key={course}
                      className="px-3 py-1 font-technical text-xs border border-muted/30 rounded-full bg-ink/5 text-ink"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
