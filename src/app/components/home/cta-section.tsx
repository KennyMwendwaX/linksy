import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/50 px-8 py-16 md:px-16 md:py-20">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/20 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl/tight">
              Ready to Simplify Your Link Management?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 md:text-xl">
              Join thousands of professionals who trust Linksly to manage,
              track, and optimize their links.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-background text-foreground hover:bg-background/90">
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/demo">
                  Request Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-primary-foreground/60">
              No credit card required. Start with our free plan and upgrade
              anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
