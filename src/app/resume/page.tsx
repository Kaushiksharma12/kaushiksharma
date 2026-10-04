"use client";

import Link from "next/link";
import { TechLabel } from "@/components/TechLabel";
import { HandNote } from "@/components/HandNote";
import { FlowField } from "@/components/FlowField";
import { profileData } from "@/content/profile";
import { ArrowLeft, Download, FileText, ExternalLink } from "lucide-react";

export default function ResumePage() {
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
          <TechLabel code="RESUME" variant="red">OFFICIAL CURRICULUM VITAE</TechLabel>
          <TechLabel code="FORMAT">PDF / PRINT READY</TechLabel>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
        <div className="space-y-2">
          <h1 className="font-display text-5xl sm:text-7xl text-ink tracking-tight">
            RESUME & CV
          </h1>
          <p className="font-editorial text-xl text-muted italic">
            Official resume document for Kaushik Sharma (AI/ML Engineer & Developer).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={profileData.resumePdf}
            download="Kaushik_Sharma_Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red text-white font-technical text-xs rounded-full hover:bg-ink transition-all shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD RESUME PDF</span>
          </a>
          <a
            href={profileData.resumePdf}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-muted/30 font-technical text-xs text-ink rounded-full hover:border-red transition-all"
          >
            <span>OPEN IN NEW TAB</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Embedded PDF Viewer */}
      <div className="border border-muted/30 rounded-2xl bg-bg/80 backdrop-blur-md overflow-hidden shadow-2xl h-[800px] w-full">
        <iframe
          src={`${profileData.resumePdf}#toolbar=1&navpanes=0`}
          className="w-full h-full border-none"
          title="Kaushik Sharma Resume PDF"
        />
      </div>
    </div>
  );
}
