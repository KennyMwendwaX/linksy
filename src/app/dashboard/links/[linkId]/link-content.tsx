"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CalendarIcon,
  Plus,
  X,
  EyeOff,
  Settings,
  CheckCircle,
  XCircle,
  Lock,
  Unlock,
  Hash,
  FileText,
  LoaderCircle,
  Sparkles,
} from "lucide-react";
import {
  Copy,
  ExternalLink,
  EyeIcon,
  CalendarPlus2Icon as CalendarIcon2,
  Shield,
  Archive,
  Edit3,
  Trash2,
  BarChart3,
  Globe,
  Clock,
  Tag,
  Share2,
  QrCode,
  TrendingUp,
  MousePointer,
  MoreHorizontal,
  Activity,
  Target,
  Link,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import type { Link as LinkType } from "@/server/database/schema";
import { usePageTitle } from "../../providers/page-title-provider";
import { LinkFormData } from "@/lib/link-schema";
import { tryCatch } from "@/lib/try-catch";
import { updateLink } from "@/server/actions/links/update";

type Props = {
  link: LinkType;
  clickData?: Array<{ date: string; clicks: number }>;
  referrerData?: Array<{ source: string; clicks: number; percentage: number }>;
};

export default function LinkPage({
  link,
  clickData = [],
  referrerData = [],
}: Props) {
  const [activeTab, setActiveTab] = useState("overview");
  const [, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { setDynamicTitle } = usePageTitle();

  const [showPassword, setShowPassword] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  setDynamicTitle(link.name);

  const shortUrl = `https://short.ly/${link.slug}`;

  const form = useForm({
    defaultValues: {
      originalUrl: link.originalUrl,
      name: link.name,
      customSlug: link.slug,
      description: link.description || "",
      status: link.status,
      expirationDate: link.expirationDate
        ? new Date(link.expirationDate)
        : undefined,
      isProtected: link.isProtected,
      password: link.password || "",
      tags: link.tags || [],
    },
  });

  const isProtected = form.watch("isProtected");
  const tags = form.watch("tags") || [];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      toast.success("Short URL copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
      toast.error("Failed to copy URL");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "expired":
        return "bg-red-100 text-red-800 border-red-200";
      case "archived":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const todayClicks =
    clickData.find((d) => d.date === new Date().toISOString().split("T")[0])
      ?.clicks || 0;

  const totalClicks = link.clicks;
  const avgDailyClicks =
    clickData.length > 0
      ? Math.round(
          clickData.reduce((sum, day) => sum + day.clicks, 0) / clickData.length
        )
      : 0;
  const daysActive = Math.ceil(
    (new Date().getTime() - new Date(link.createdAt).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const handleFormSubmit = (data: LinkFormData) => {
    startTransition(async () => {
      try {
        const { data: success, error: updateLinkError } = await tryCatch(
          updateLink(link.id, data)
        );
        if (updateLinkError) {
          toast.error(updateLinkError.message);
          return;
        }

        if (success) {
          form.reset();
          toast.success("Link updated successfully!");
          router.refresh();
        }
      } catch (error) {
        console.error("Failed to update link:", error);
        toast.error("Failed to update link");
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

  const getStatusColorForm = (status: string) => {
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

  return (
    <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Link Details</h1>
          <p className="text-muted-foreground">
            Manage and analyze your shortened link performance
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsEditing(!isEditing)}>
              <Edit3 className="mr-2 h-4 w-4" />
              Edit Link
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Link Overview Card */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <CardContent className="px-6">
          <div className="space-y-6">
            {/* Link Title and Status */}
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold">{link.name}</h2>
                  <Badge className={`${getStatusColor(link.status)} border`}>
                    {link.status}
                  </Badge>
                  {link.isProtected && (
                    <div className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1">
                      <Shield className="h-3 w-3 text-amber-600" />
                      <span className="text-xs font-medium text-amber-700">
                        Protected
                      </span>
                    </div>
                  )}
                </div>
                {link.description && (
                  <p className="text-muted-foreground max-w-2xl">
                    {link.description}
                  </p>
                )}
              </div>
            </div>

            {/* Tags */}
            {link.tags && link.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {link.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <Separator />

            {/* URLs */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Short URL
                </Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-lg border bg-muted/30 p-3">
                    <code className="text-sm font-mono">{shortUrl}</code>
                  </div>
                  <Button variant="outline" size="icon" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Original URL
                </Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-lg border bg-muted/30 p-3">
                    <code className="text-sm font-mono truncate block">
                      {link.originalUrl}
                    </code>
                  </div>
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href={link.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Share2 className="mr-2 h-4 w-4" />
                Share Link
              </Button>
              <Button variant="outline">
                <QrCode className="mr-2 h-4 w-4" />
                QR Code
              </Button>
              <Button variant="outline">
                <EyeIcon className="mr-2 h-4 w-4" />
                Preview
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Clicks */}
        <Card className="border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <MousePointer className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Total Clicks</p>
                <p className="text-2xl font-semibold">
                  {totalClicks.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Clicks */}
        <Card className="border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-2xl font-semibold">
                  {todayClicks.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Average Daily */}
        <Card className="border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Activity className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Avg. Daily</p>
                <p className="text-2xl font-semibold">{avgDailyClicks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Days Active */}
        <Card className="border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <CalendarIcon2 className="h-4 w-4 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Days Active</p>
                <p className="text-2xl font-semibold">{daysActive}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Click Activity Chart */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Click Activity (Last 7 Days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {clickData.length > 0 ? (
                  <div className="space-y-4">
                    {clickData.slice(-7).map((day, index) => {
                      const maxClicks = Math.max(
                        ...clickData.map((d) => d.clicks)
                      );
                      const percentage =
                        maxClicks > 0 ? (day.clicks / maxClicks) * 100 : 0;

                      return (
                        <div key={index} className="flex items-center gap-4">
                          <span className="text-sm font-medium text-muted-foreground w-12">
                            {new Date(day.date).toLocaleDateString("en-US", {
                              weekday: "short",
                            })}
                          </span>
                          <div className="flex-1">
                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-sm font-bold w-8 text-right">
                            {day.clicks}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No click data available
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Referrers */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-600" />
                  Top Referrers
                </CardTitle>
              </CardHeader>
              <CardContent>
                {referrerData.length > 0 ? (
                  <div className="space-y-4">
                    {referrerData.map((referrer, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-sm font-bold text-white">
                              {referrer.source[0].toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{referrer.source}</p>
                            <p className="text-sm text-muted-foreground">
                              {referrer.clicks} clicks
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-700">
                          {referrer.percentage}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No referrer data available
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <p className="text-sm text-muted-foreground">
                Detailed insights into your link performance
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-20">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                  <BarChart3 className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Advanced Analytics Coming Soon
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Get detailed insights with geographic data, device analytics,
                  and conversion tracking.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <TooltipProvider>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Link Settings</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Configure your link properties and access controls
                </p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleFormSubmit)}
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
                              Custom URL slug for your link
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
                                        className={cn(
                                          getStatusColorForm("active")
                                        )}>
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
                                          getStatusColorForm("inactive")
                                        )}>
                                        Disabled
                                      </Badge>
                                    </div>
                                  </div>
                                </SelectItem>
                                <SelectItem value="archived">
                                  <div className="flex items-center gap-2">
                                    <Archive className="h-4 w-4 text-yellow-500" />
                                    <div className="flex items-center gap-2">
                                      <span>Archived</span>
                                      <Badge
                                        variant="outline"
                                        className={cn(
                                          getStatusColorForm("archived")
                                        )}>
                                        Archived
                                      </Badge>
                                    </div>
                                  </div>
                                </SelectItem>
                                <SelectItem value="expired">
                                  <div className="flex items-center gap-2">
                                    <XCircle className="h-4 w-4 text-red-500" />
                                    <div className="flex items-center gap-2">
                                      <span>Expired</span>
                                      <Badge
                                        variant="outline"
                                        className={cn(
                                          getStatusColorForm("expired")
                                        )}>
                                        Expired
                                      </Badge>
                                    </div>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Select link status
                            </FormDescription>
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
                                      format(field.value, "PPP")
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
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  captionLayout="dropdown"
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
                                        <EyeIcon className="h-4 w-4 text-red-600" />
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
                            <Tag className="h-4 w-4 text-indigo-600" />
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
                                      className="h-10 px-4 bg-transparent">
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
                    <div className="flex gap-3 pt-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="submit"
                            disabled={isPending}
                            className="flex items-center gap-2">
                            {isPending ? (
                              <>
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                                Updating...
                              </>
                            ) : (
                              <>
                                <Sparkles className="h-4 w-4" />
                                Save Changes
                              </>
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Save the changes</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => form.reset()}>
                            <X className="h-4 w-4 mr-2" />
                            Reset
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Reset to original values
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TooltipProvider>
        </TabsContent>
      </Tabs>

      {/* Link Information */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Link Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarIcon2 className="h-4 w-4" />
                <span className="text-sm font-medium">Created</span>
              </div>
              <p className="text-sm">{formatDate(link.createdAt)}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Last Updated</span>
              </div>
              <p className="text-sm">{formatDate(link.updatedAt)}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <EyeIcon className="h-4 w-4" />
                <span className="text-sm font-medium">Last Accessed</span>
              </div>
              <p className="text-sm">{formatDate(link.lastAccessedAt)}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Target className="h-4 w-4" />
                <span className="text-sm font-medium">Expires At</span>
              </div>
              <p className="text-sm font-mono">
                {formatDate(link.expirationDate) || "Never"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
