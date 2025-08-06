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
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Eye,
  EyeOff,
  User,
  AtSign,
  ArrowRight,
  Shield,
  Mail,
} from "lucide-react";

// Updated schema to match your database design
const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(30, { message: "Username must be no more than 30 characters" })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        "Username can only contain letters, numbers, underscores, and hyphens",
    })
    .refine(
      (val) =>
        !["admin", "api", "www", "root", "support", "help"].includes(
          val.toLowerCase()
        ),
      {
        message: "This username is reserved",
      }
    ),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", username: "", email: "", password: "" },
  });

  async function onSubmit(data: SignUpFormValues) {
    await signUp.email({
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      callbackURL: "/dashboard",
      fetchOptions: {
        onRequest: () => {
          setIsLoading(true);
        },
        onResponse: () => {
          setIsLoading(false);
        },
        onError: (ctx) => {
          console.log(ctx.error);
          toast.error(ctx.error.message);
        },
        onSuccess: async () => {
          setIsLoading(false);
          form.reset();
          toast.success("Account created successfully");
          router.push("/dashboard");
        },
      },
    });
  }

  return (
    <Form {...form}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  Name
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Input
                      placeholder="John"
                      className="pl-10 bg-background/50 border-border/50 backdrop-blur-sm transition-all duration-200 group-hover:border-border focus:border-primary focus:bg-background"
                      {...field}
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  Username
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Input
                      placeholder="johnny"
                      className="pl-10 bg-background/50 border-border/50 backdrop-blur-sm transition-all duration-200 group-hover:border-border focus:border-primary focus:bg-background"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value
                          .toLowerCase()
                          .replace(/\s/g, "");
                        field.onChange(value);
                      }}
                    />
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">
                Email
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="pl-10 bg-background/50 border-border/50 backdrop-blur-sm transition-all duration-200 group-hover:border-border focus:border-primary focus:bg-background"
                    {...field}
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">
                Password
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
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

        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="w-full font-medium bg-primary hover:bg-primary/90 transition-all duration-200 group"
          disabled={isLoading}>
          {isLoading ? (
            <>
              <AiOutlineLoading3Quarters className="mr-2 h-3 w-3 animate-spin" />
              Creating your account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </div>
    </Form>
  );
}
