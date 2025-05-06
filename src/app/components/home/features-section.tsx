import { Link, BarChart3, Palette, Shield, Zap, QrCode } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Link className="h-6 w-6 text-primary" />,
      title: "URL Shortening",
      description:
        "Transform long, unwieldy links into clean, memorable URLs that are easy to share and track.",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Advanced Analytics",
      description:
        "Track clicks, monitor traffic sources, and gain valuable insights into your audience's behavior.",
    },
    {
      icon: <Palette className="h-6 w-6 text-primary" />,
      title: "Custom Templates",
      description:
        "Choose from a variety of templates to create branded link pages that match your style.",
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Link Management",
      description:
        "Organize, edit, and manage all your links from a single, intuitive dashboard.",
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Fast Redirection",
      description:
        "Enjoy lightning-fast redirects that provide a seamless experience for your users.",
    },
    {
      icon: <QrCode className="h-6 w-6 text-primary" />,
      title: "QR Code Generation",
      description:
        "Generate QR codes for your shortened links to bridge the gap between digital and physical.",
    },
  ];

  return (
    <section id="features" className="py-24 relative">
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
            Features
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Everything You Need in One Platform
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Linksy provides all the tools you need to create, manage, and
            analyze your links effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card/50 p-8 backdrop-blur-sm transition-all hover:bg-card">
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-all group-hover:bg-primary/20"></div>
              <div className="relative z-10">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
