import Image from "next/image";
import { Link, Settings, Share2, BarChart } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      icon: <Link className="h-6 w-6 text-primary-foreground" />,
      title: "Paste Your URL",
      description: "Start by pasting your long URL into our shortener tool.",
    },
    {
      icon: <Settings className="h-6 w-6 text-primary-foreground" />,
      title: "Customize Your Link",
      description:
        "Personalize your shortened URL with custom slugs, UTM parameters, or choose a template.",
    },
    {
      icon: <Share2 className="h-6 w-6 text-primary-foreground" />,
      title: "Share Anywhere",
      description:
        "Share your shortened link across social media, email, or any digital platform.",
    },
    {
      icon: <BarChart className="h-6 w-6 text-primary-foreground" />,
      title: "Track Performance",
      description:
        "Monitor clicks, geographic data, and referral sources in real-time.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-border bg-background/80 px-4 py-1.5 text-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            How It Works
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Simple Process, Powerful Results
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Get started with Linksy in just a few simple steps and transform
            your link management experience.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
                {step.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="absolute top-8 left-[calc(50%+4rem)] hidden w-[calc(100%-8rem)] border-t border-dashed border-border lg:block" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-24">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="order-2 md:order-1 px-4 md:px-0">
              <h3 className="text-3xl font-bold mb-6">See It In Action</h3>
              <p className="text-muted-foreground mb-8">
                Our intuitive dashboard makes it easy to manage all your links
                in one place. Create, edit, and analyze your links with just a
                few clicks.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="mr-4 h-2 w-2 rounded-full bg-primary"></div>
                  <span>Bulk link creation for multiple URLs</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-4 h-2 w-2 rounded-full bg-primary"></div>
                  <span>Organize links with custom tags and folders</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-4 h-2 w-2 rounded-full bg-primary"></div>
                  <span>Schedule links to activate at specific times</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-4 h-2 w-2 rounded-full bg-primary"></div>
                  <span>Set expiration dates for temporary campaigns</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 mx-4 md:mx-0 mb-8 md:mb-0">
              <div className="relative">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary to-primary/50 opacity-75 blur-xl"></div>
                <div className="relative rounded-2xl border border-border bg-card overflow-hidden">
                  <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="ml-2 text-xs font-medium text-muted-foreground">
                      Dashboard
                    </div>
                  </div>
                  <div className="w-full">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Linksy Dashboard"
                      width={500}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
