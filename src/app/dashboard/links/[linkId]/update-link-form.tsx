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
  Globe,
  Link,
  Archive,
  Shield,
  EyeIcon,
  Tag,
} from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Link as LinkType } from "@/server/database/schema";
import { LinkFormData } from "@/lib/link-schema";
import { tryCatch } from "@/lib/try-catch";
import { updateLink } from "@/server/actions/links/update";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  link: LinkType;
};

export default function UpdateLinkForm({ link }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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
              <FormDescription>The URL you want to shorten</FormDescription>
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
                <FormDescription>Custom URL slug for your link</FormDescription>
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
                            className={cn(getStatusColorForm("active"))}>
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
                            className={cn(getStatusColorForm("inactive"))}>
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
                            className={cn(getStatusColorForm("archived"))}>
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
                            className={cn(getStatusColorForm("expired"))}>
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
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Optional expiration date</FormDescription>
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
                          onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-red-600" />
                          ) : (
                            <EyeIcon className="h-4 w-4 text-red-600" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {showPassword ? "Hide password" : "Show password"}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </FormControl>
                <FormDescription>Minimum 4 characters required</FormDescription>
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
                            !tagInput.trim() || tags.includes(tagInput.trim())
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
                            <TooltipContent>Remove tag</TooltipContent>
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
            <TooltipContent>Reset to original values</TooltipContent>
          </Tooltip>
        </div>
      </form>
    </Form>
  );
}
