"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, LogOut, LinkIcon } from "lucide-react";
import { signOut } from "@/lib/auth-client";
import type { Session } from "@/lib/auth";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/app/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

interface Props {
  session: Session | null;
}

export default function Header({ session }: Props) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Handle scroll effect for transparent to solid header transition
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition duration-300 ease-in-out ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border/40"
          : ""
      }`}>
      <div className="max-w-6xl mx-auto flex h-16 md:h-20 items-center justify-between px-5 sm:px-6">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LinkIcon className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">linksy</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link
            href="#analytics"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Analytics
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          {session ? (
            <>
              <Button
                variant="outline"
                onClick={() =>
                  signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        router.refresh();
                      },
                    },
                  })
                }
                className="flex items-center rounded-full">
                <LogOut className="mr-1 w-4 h-4" />
                Sign out
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 dark:from-blue-500 dark:to-teal-400 text-white"
                asChild>
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="text-muted-foreground hover:text-foreground"
                asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 dark:from-blue-500 dark:to-teal-400 text-white"
                asChild>
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button using Sheet */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="text-foreground/70 hover:text-foreground">
                <span className="sr-only">Toggle menu</span>
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm p-0">
              <div className="flex flex-col h-full p-6 overflow-y-auto">
                {/* Mobile Header */}
                <SheetHeader className="mb-8">
                  <div className="flex items-center justify-between">
                    <Link
                      href="/"
                      className="flex items-center gap-3"
                      onClick={() => setIsOpen(false)}>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <LinkIcon className="h-5 w-5" />
                      </div>
                      <SheetTitle className="text-xl font-bold tracking-tight">
                        linksy
                      </SheetTitle>
                    </Link>
                  </div>
                </SheetHeader>

                {/* Mobile Nav Links */}
                <nav className="flex flex-col gap-6 mb-8">
                  <SheetClose asChild>
                    <Link
                      href="#features"
                      className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors">
                      Features
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="#how-it-works"
                      className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors">
                      How It Works
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="#analytics"
                      className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors">
                      Analytics
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="#pricing"
                      className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors">
                      Pricing
                    </Link>
                  </SheetClose>
                </nav>

                {/* Mobile Action Buttons */}
                <div className="flex flex-col gap-3 mt-auto">
                  {session ? (
                    <SheetClose asChild>
                      <Button
                        onClick={() => {
                          signOut({
                            fetchOptions: { onSuccess: () => router.refresh() },
                          });
                        }}
                        className="w-full flex items-center justify-center">
                        <LogOut className="mr-2 w-4 h-4" />
                        Sign out
                      </Button>
                    </SheetClose>
                  ) : (
                    <>
                      <SheetClose asChild>
                        <Button variant="outline" asChild className="w-full">
                          <Link href="/sign-in">Sign In</Link>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button
                          className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 dark:from-blue-500 dark:to-teal-400 text-white"
                          asChild>
                          <Link href="/dashboard">Get Started</Link>
                        </Button>
                      </SheetClose>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
