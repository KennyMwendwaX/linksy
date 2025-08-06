"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { Eye, EyeOff, Mail, AtSign, ArrowRight, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const signInSchema = z.object({
  identifier: z.string().min(1, { message: "Email or username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type SignInFormValues = z.infer<typeof signInSchema>;

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { identifier: "", password: "" },
  });

  async function onSubmit(data: SignInFormValues) {
    const emailLogin = isEmail(data.identifier);
    if (emailLogin) {
      await signIn.email(
        {
          email: data.identifier,
          password: data.password,
          callbackURL: "/dashboard",
        },
        {
          onRequest: () => setIsLoading(true),
          onResponse: () => setIsLoading(false),
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            setIsLoading(false);
            form.reset();
            toast.success("Sign in successful");
            router.push("/dashboard");
          },
        }
      );
    } else {
      await signIn.username(
        {
          username: data.identifier,
          password: data.password,
        },
        {
          onRequest: () => setIsLoading(true),
          onResponse: () => setIsLoading(false),
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            setIsLoading(false);
            form.reset();
            toast.success("Sign in successful");
            router.push("/dashboard");
          },
        }
      );
    }
  }

  return (
    <Form {...form}>
      <div className="space-y-4">
        {/* Identifier Field */}
        <FormField
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">
                Email or Username
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <Input
                    placeholder="Enter your email or username"
                    className="pl-10 bg-background/50 border-border/50 backdrop-blur-sm transition-all duration-200 group-hover:border-border focus:border-primary focus:bg-background"
                    {...field}
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    {isEmail(field.value || "") ? (
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <AtSign className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-2">
                <FormLabel className="text-sm font-medium text-foreground">
                  Password
                </FormLabel>
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-xs text-muted-foreground hover:text-primary">
                  Forgot password?
                </Button>
              </div>
              <FormControl>
                <div className="relative group">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-12 bg-background/50 border-border/50 backdrop-blur-sm transition-all duration-200 group-hover:border-border focus:border-primary focus:bg-background"
                    {...field}
                  />
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-1/2 -translate-y-1/2 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="w-full font-medium bg-primary hover:bg-primary/90 transition-all duration-200 group"
          disabled={isLoading}>
          {isLoading ? (
            <>
              <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
              Signing you in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </div>
    </Form>
  );
}
