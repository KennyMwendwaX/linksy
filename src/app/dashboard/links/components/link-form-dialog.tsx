"use client";

import type React from "react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CalendarIcon,
  Link,
  Plus,
  X,
  Eye,
  EyeOff,
  Globe,
  Settings,
  Tags,
  CheckCircle,
  Clock,
  XCircle,
  Copy,
  ExternalLink,
  Shield,
  Lock,
  Unlock,
  Hash,
  FileText,
  LoaderCircle,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { linkFormSchema, type LinkFormData } from "./links-table/table-schema";

interface LinkFormDialogProps {
  trigger?: React.ReactNode;
  onSubmit?: (data: LinkFormData) => void | Promise<void>;
}

export function LinkFormDialog({ trigger, onSubmit }: LinkFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<LinkFormData>({
    resolver: zodResolver(linkFormSchema),
    defaultValues: {
      tags: [],
      isProtected: false,
      status: "active",
    },
  });

  const isProtected = form.watch("isProtected");
  const tags = form.watch("tags") || [];
  const originalUrl = form.watch("originalUrl");
  const customSlug = form.watch("customSlug");

  const handleSubmit = (data: LinkFormData) => {
    startTransition(async () => {
      try {
        await onSubmit?.(data);
        setOpen(false);
        form.reset();
        setTagInput("");
      } catch (error) {
        console.error("Failed to submit form:", error);
      }
    });
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      form.setValue("tags", [...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    form.setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove)
    );
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      case "expired":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    }
  };

  const generatePreview = () => {
    if (!originalUrl) return null;
    const slug = customSlug || "abc123";
    return `short.ly/${slug}`;
  };

  const defaultTrigger = (
    <Button className="gap-2">
      <Plus className="h-4 w-4" />
      Create Link
    </Button>
  );

  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Link className="h-5 w-5 text-blue-600" />
              Create Short Link
            </DialogTitle>
            <DialogDescription>
              Create a new shortened link with custom settings and protection
              options.
            </DialogDescription>
          </DialogHeader>

          {/* Live Preview */}
          {originalUrl && (
            <div className="p-4 bg-muted/30 rounded-lg border">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-blue-600" />
                    Live Preview
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="px-2 py-1 bg-background rounded text-sm font-mono border">
                      {generatePreview()}
                    </code>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0">
                          <Copy className="h-3 w-3 text-blue-600" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Copy link</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <ExternalLink className="h-3 w-3" />
                      Test
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Test the link</TooltipContent>
                </Tooltip>
              </div>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Link Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-6">
                  {/* Primary URL Field */}
                  <FormField
                    control={form.control}
                    name="originalUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-blue-600" />
                          Original URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/very/long/url"
                            type="url"
                            className="focus-visible:ring-2 focus-visible:ring-ring h-10"
                            {...field}
                            required
                          />
                        </FormControl>
                        <FormDescription>
                          The URL you want to shorten
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Basic Information Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Hash className="h-4 w-4 text-purple-600" />
                            Link Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="My awesome link"
                              className="h-10"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            A friendly name to identify your link
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="customSlug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Link className="h-4 w-4 text-indigo-600" />
                            Custom Slug
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring">
                              <div className="px-3 py-2.5 bg-muted text-muted-foreground text-sm border-r font-mono">
                                short.ly/
                              </div>
                              <Input
                                placeholder="my-custom-link"
                                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Leave empty for auto-generation
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-slate-600" />
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description of what this link leads to..."
                            className="resize-none focus-visible:ring-2 focus-visible:ring-ring"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Optional description for your reference
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Settings Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="flex items-center gap-2">
                            <Settings className="h-4 w-4 text-orange-600" />
                            Status
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            required>
                            <FormControl>
                              <SelectTrigger className="w-full h-11">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                  <div className="flex items-center gap-2">
                                    <span>Active</span>
                                    <Badge
                                      variant="outline"
                                      className={cn(getStatusColor("active"))}>
                                      Live
                                    </Badge>
                                  </div>
                                </div>
                              </SelectItem>
                              <SelectItem value="inactive">
                                <div className="flex items-center gap-2">
                                  <XCircle className="h-4 w-4 text-gray-500" />
                                  <div className="flex items-center gap-2">
                                    <span>Inactive</span>
                                    <Badge
                                      variant="outline"
                                      className={cn(
                                        getStatusColor("inactive")
                                      )}>
                                      Disabled
                                    </Badge>
                                  </div>
                                </div>
                              </SelectItem>
                              <SelectItem value="expired">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-red-500" />
                                  <div className="flex items-center gap-2">
                                    <span>Expired</span>
                                    <Badge
                                      variant="outline"
                                      className={cn(getStatusColor("expired"))}>
                                      Expired
                                    </Badge>
                                  </div>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Select link status</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="expirationDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-purple-600" />
                            Expiration Date
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "h-10 justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}>
                                  {field.value ? (
                                    format(new Date(field.value), "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start">
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={(date) =>
                                  field.onChange(date?.toISOString())
                                }
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Optional expiration date
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* Password Protection */}
                  <FormField
                    control={form.control}
                    name="isProtected"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            {field.value ? (
                              <Lock className="h-4 w-4 text-red-600" />
                            ) : (
                              <Unlock className="h-4 w-4 text-gray-400" />
                            )}
                            <FormLabel className="text-base">
                              Password Protection
                            </FormLabel>
                            {field.value && (
                              <Badge
                                variant="outline"
                                className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                                Protected
                              </Badge>
                            )}
                          </div>
                          <FormDescription>
                            Require a password to access this link
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {isProtected && (
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-red-600" />
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                className="h-10 pr-10"
                                {...field}
                              />
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }>
                                    {showPassword ? (
                                      <EyeOff className="h-4 w-4 text-red-600" />
                                    ) : (
                                      <Eye className="h-4 w-4 text-red-600" />
                                    )}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {showPassword
                                    ? "Hide password"
                                    : "Show password"}
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </FormControl>
                          <FormDescription>
                            Minimum 4 characters required
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Tags */}
                  <FormField
                    control={form.control}
                    name="tags"
                    render={() => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Tags className="h-4 w-4 text-indigo-600" />
                          Tags
                          {tags.length > 0 && (
                            <Badge
                              variant="outline"
                              className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400">
                              {tags.length}
                            </Badge>
                          )}
                        </FormLabel>
                        <FormControl>
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              <Input
                                placeholder="Add a tag"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    addTag();
                                  }
                                }}
                                className="h-10"
                              />
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={addTag}
                                    disabled={
                                      !tagInput.trim() ||
                                      tags.includes(tagInput.trim())
                                    }
                                    className="h-10 px-4">
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Add tag</TooltipContent>
                              </Tooltip>
                            </div>
                            {tags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="gap-1 px-2 py-1">
                                    {tag}
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          className="h-auto p-0 text-muted-foreground hover:text-foreground ml-1"
                                          onClick={() => removeTag(tag)}>
                                          <X className="h-3 w-3" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        Remove tag
                                      </TooltipContent>
                                    </Tooltip>
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Add tags to organize and categorize your links
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Actions */}
                  <div className="flex justify-end space-x-4 pt-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setOpen(false)}
                          disabled={isPending}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Discard changes</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="submit"
                          disabled={isPending}
                          className="flex items-center gap-2">
                          {isPending ? (
                            <>
                              <LoaderCircle className="h-4 w-4 animate-spin" />
                              Creating...
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4" />
                              Create Link
                            </>
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Create the short link</TooltipContent>
                    </Tooltip>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
