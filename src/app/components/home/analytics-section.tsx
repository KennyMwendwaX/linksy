import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart2, Globe, Clock, Smartphone, ArrowRight } from "lucide-react";

export default function AnalyticsSection() {
  return (
    <section id="analytics" className="py-24 relative">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-primary/10 to-transparent"></div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border border-border bg-background/80 px-4 py-1.5 text-sm backdrop-blur-md">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                Analytics
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Data-Driven Link Management
              </h2>
              <p className="max-w-[600px] text-muted-foreground text-lg">
                Gain valuable insights into your audience and optimize your
                marketing strategy with our comprehensive analytics.
              </p>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
              <div className="rounded-3xl border border-border bg-card/50 p-6 backdrop-blur-sm">
                <BarChart2 className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2">Click Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor clicks in real-time and analyze traffic patterns over
                  time.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-card/50 p-6 backdrop-blur-sm">
                <Globe className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2">Geographic Data</h3>
                <p className="text-muted-foreground">
                  See where your visitors are coming from with detailed location
                  analytics.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-card/50 p-6 backdrop-blur-sm">
                <Clock className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2">Time Insights</h3>
                <p className="text-muted-foreground">
                  Discover peak engagement times to optimize your posting
                  schedule.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-card/50 p-6 backdrop-blur-sm">
                <Smartphone className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2">Device Metrics</h3>
                <p className="text-muted-foreground">
                  Understand which devices your audience uses to access your
                  links.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/signup">Start Tracking Now</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="w-full sm:w-auto">
                <Link href="#pricing">
                  View Plans
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0 mx-4 lg:mx-0">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary to-primary/50 opacity-75 blur-xl"></div>
            <div className="relative rounded-2xl border border-border bg-card overflow-hidden">
              <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-2 text-xs font-medium text-muted-foreground">
                  Analytics Dashboard
                </div>
              </div>
              <div className="w-full">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Analytics Dashboard"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
