"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would typically call an API to shorten the URL
    console.log("Shortening URL:", url);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-primary/20 via-primary/5 to-transparent"></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808025_1px,transparent_1px),linear-gradient(to_bottom,#80808025_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Main content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-10">
          <div className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-border bg-background/80 px-4 py-1.5 text-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              Simplify your links, amplify your reach
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Link Management App for the Modern Web
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Shorten, customize, and track your links in one powerful platform.
              Take control of your online presence with Linksly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button asChild size="lg">
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#features">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="w-full max-w-2xl mt-8 rounded-2xl border border-border bg-card/50 p-2 backdrop-blur-lg">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="url"
                placeholder="Paste your long URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit">Shorten</Button>
            </form>
          </div>

          <div className="relative w-full max-w-5xl mt-16">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary to-primary/50 opacity-75 blur-xl"></div>
            <div className="relative rounded-2xl border border-border bg-card overflow-hidden">
              <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-2 text-xs font-medium text-muted-foreground">
                  linksly.app
                </div>
              </div>
              <div className="p-1">
                <Image
                  src="/placeholder.svg?height=600&width=1200"
                  alt="Linksly Dashboard Preview"
                  width={1200}
                  height={600}
                  className="rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
