"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import SignIn from "./components/sign-in";
import SignUp from "./components/sign-up";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// Main Auth Page
export default function AuthPage() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setIsGoogleLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Google auth clicked");
    setIsGoogleLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/2 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/1 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Auth Card */}
        <Card className="border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl shadow-primary/5">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold">Linksy</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-10 p-1 bg-muted/30 backdrop-blur-sm">
                <TabsTrigger
                  value="signin"
                  className="text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <div className="mt-4">
                <TabsContent value="signin" className="mt-0">
                  <SignIn />
                </TabsContent>

                <TabsContent value="signup" className="mt-0">
                  <SignUp />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-2">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-2 text-muted-foreground">OR</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full font-medium border-border/50 bg-background/50 hover:bg-background transition-all duration-200 group"
              disabled={isGoogleLoading}
              onClick={handleGoogleAuth}>
              {isGoogleLoading ? (
                <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FcGoogle className="mr-3 h-4 w-4 text-muted-foreground group-hover:text-foreground" />
              )}
              <span className="group-hover:text-foreground transition-colors">
                Continue with Google
              </span>
            </Button>

            <p className="text-xs text-muted-foreground text-center px-4 leading-relaxed">
              By signing in, you agree to our{" "}
              <Button variant="link" className="h-auto p-0 text-xs underline">
                Terms
              </Button>{" "}
              and{" "}
              <Button variant="link" className="h-auto p-0 text-xs underline">
                Privacy Policy
              </Button>
            </p>
          </CardFooter>
        </Card>

        {/* Features */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground mb-3">
            Trusted by creators worldwide
          </p>
          <div className="flex justify-center items-center gap-8 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span>Custom URLs</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              <span>Analytics</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
              <span>QR Codes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
