import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Linksly has transformed how we manage our marketing campaigns. The analytics are incredibly detailed and the custom templates have helped strengthen our brand.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "As a content creator, I need reliable tools that make sharing easy. Linksly delivers with its simple interface and powerful tracking features.",
      author: "Michael Chen",
      role: "Content Creator",
      company: "Digital Nomad",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "The QR code feature has been a game-changer for our retail business. We can now seamlessly connect our physical store to our online presence.",
      author: "Emma Rodriguez",
      role: "E-commerce Manager",
      company: "Retail Plus",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-border bg-background/80 px-4 py-1.5 text-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Testimonials
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Trusted by Thousands of Professionals
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            See what our customers have to say about their experience with
            Linksly.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="overflow-hidden border-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="mb-6 text-lg italic">{testimonial.quote}</div>
                <div className="flex items-center">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden border border-border mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
