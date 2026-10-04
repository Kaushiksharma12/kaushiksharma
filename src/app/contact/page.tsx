"use client";

import { useState } from "react";
import Link from "next/link";
import { TechLabel } from "@/components/TechLabel";
import { HandNote } from "@/components/HandNote";
import { FlowField } from "@/components/FlowField";
import { profileData } from "@/content/profile";
import { ArrowLeft, Mail, MapPin, Send, Github, Linkedin, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "", honeypot: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to transmit message.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          <TechLabel code="CONTACT" variant="red">GET IN TOUCH</TechLabel>
          <TechLabel code="STATUS">OPEN TO OPPORTUNITIES</TechLabel>
        </div>
      </div>

      <div className="space-y-4 mb-12">
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-ink tracking-tight">
          CONNECT & COLLABORATE
        </h1>
        <p className="font-editorial text-xl sm:text-2xl text-muted italic max-w-3xl">
          Interested in AI engineering, web automation pipelines, full-stack applications, or technical roles? Send a direct message or connect on social platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Contact Info & Socials */}
        <div className="lg:col-span-5 space-y-8 p-8 border border-muted/30 rounded-2xl bg-bg/80 backdrop-blur-md shadow-xl">
          <div className="space-y-6 font-technical text-xs">
            <div className="space-y-2">
              <span className="text-muted flex items-center gap-2">
                <Mail className="w-4 h-4 text-red" /> EMAIL ADDRESS:
              </span>
              <a href={`mailto:${profileData.email}`} className="text-red font-bold text-sm block hover:underline">
                {profileData.email}
              </a>
            </div>



            <div className="space-y-2 pt-4 border-t border-muted/15">
              <span className="text-muted flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red" /> LOCATION:
              </span>
              <span className="text-ink font-bold text-sm block">
                {profileData.location}
              </span>
            </div>
          </div>

          <div className="pt-6 border-t border-muted/20 space-y-3">
            <span className="font-technical text-xs font-bold text-muted uppercase">
              VERIFIED PROFILES:
            </span>
            <div className="flex flex-col gap-2.5">
              <a
                href={profileData.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 border border-muted/30 rounded-xl font-technical text-xs text-ink hover:border-red transition-all"
              >
                <Github className="w-4 h-4 text-red" />
                <span>GITHUB // {profileData.github}</span>
              </a>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 border border-muted/30 rounded-xl font-technical text-xs text-ink hover:border-red transition-all"
              >
                <Linkedin className="w-4 h-4 text-red" />
                <span>LINKEDIN // {profileData.linkedin}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 p-8 border border-muted/30 rounded-2xl bg-bg/80 backdrop-blur-md shadow-xl">
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-red mx-auto" />
              <h2 className="font-display text-3xl text-ink">MESSAGE TRANSMITTED</h2>
              <p className="font-editorial text-lg text-muted">
                Thank you for reaching out, {formData.name}. Kaushik will review your message shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot Anti-Spam Hidden Input */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {errorMsg && (
                <div className="p-4 border border-red/30 bg-red/10 rounded-xl text-red font-technical text-xs flex items-center gap-2">
                  <span>ERROR: {errorMsg}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="font-technical text-xs text-muted block uppercase">YOUR NAME:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-4 border border-muted/30 rounded-xl bg-bg text-ink font-technical text-sm focus:border-red focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="font-technical text-xs text-muted block uppercase">YOUR EMAIL:</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-4 border border-muted/30 rounded-xl bg-bg text-ink font-technical text-sm focus:border-red focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="font-technical text-xs text-muted block uppercase">MESSAGE DETAILS:</label>
                <textarea
                  required
                  rows={5}
                  maxLength={5000}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 border border-muted/30 rounded-xl bg-bg text-ink font-technical text-sm focus:border-red focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-red text-white font-technical text-xs rounded-xl hover:bg-ink disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? "TRANSMITTING..." : "SEND MESSAGE TRANSMISSION"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
