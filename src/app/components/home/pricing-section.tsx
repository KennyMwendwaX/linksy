import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PricingSection() {
  const plans = [
    {
      name: "Free",
      description: "Perfect for individuals just getting started.",
      price: "$0",
      period: "forever",
      features: [
        "Up to 50 shortened links",
        "Basic analytics",
        "Standard templates",
        "24-hour click history",
        "Single user account",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      description: "Ideal for creators and small businesses.",
      price: "$12",
      period: "per month",
      features: [
        "Unlimited shortened links",
        "Advanced analytics",
        "Custom templates",
        "Full click history",
        "Up to 5 team members",
        "Custom domains",
        "QR code generation",
        "Priority support",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For organizations with advanced needs.",
      price: "Custom",
      period: "pricing",
      features: [
        "Everything in Pro",
        "Unlimited team members",
        "API access",
        "SSO authentication",
        "Advanced security features",
        "Dedicated account manager",
        "Custom integration options",
        "SLA guarantees",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 relative">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-primary/10 to-transparent"></div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-border bg-background/80 px-4 py-1.5 text-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Pricing
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Choose the plan that fits your needs. All plans include core
            features with different limits.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden border-border bg-card/50 backdrop-blur-sm ${
                plan.popular ? "ring-2 ring-primary" : ""
              }`}>
              {plan.popular && (
                <div className="absolute -right-12 top-6 w-40 rotate-45 bg-primary py-1 text-center text-xs font-medium text-primary-foreground shadow-md">
                  Popular
                </div>
              )}
              <CardHeader className="pb-8 pt-6">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm mt-1.5">
                  {plan.description}
                </CardDescription>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="ml-1 text-sm font-medium text-muted-foreground">
                    {plan.period}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pb-8">
                <ul className="space-y-3.5 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="mr-3 h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pb-8 pt-0">
                <Button
                  asChild
                  className={`w-full ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : ""
                  }`}
                  size="lg"
                  variant={plan.popular ? "default" : "outline"}>
                  <Link
                    href={plan.name === "Enterprise" ? "/contact" : "/signup"}>
                    {plan.cta}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <p className="text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="mt-6 inline-flex items-center rounded-full border border-border bg-background/80 px-4 py-2 text-sm backdrop-blur-md">
            <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
            99.9% uptime SLA for all plans
          </div>
        </div>
      </div>
    </section>
  );
}
