import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";

export default function SEOTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO & Meta Tags</CardTitle>
        <CardDescription>
          Optimize how your profile appears in search results and social media
          shares
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Search className="h-4 w-4" />
          <AlertDescription>
            Good SEO helps people find your profile through search engines
          </AlertDescription>
        </Alert>

        {/* Meta Title */}
        <div className="space-y-2">
          <Label>Page Title</Label>
          <Input
            id="metaTitle"
            placeholder="Jenny Kim - Digital Creator | Linksy"
            maxLength={60}
          />
          <p className="text-xs text-muted-foreground">
            Appears in browser tabs and search results (max 60 characters)
          </p>
        </div>

        {/* Meta Description */}
        <div className="space-y-2">
          <Label>Meta Description</Label>
          <Textarea
            id="metaDescription"
            placeholder="Connect with Jenny Kim. Find all my links, social media, and latest content in one place."
            className="min-h-[80px]"
            maxLength={160}
          />
          <p className="text-xs text-muted-foreground">
            Search engine description (max 160 characters)
          </p>
        </div>

        {/* Keywords */}
        <div className="space-y-2">
          <Label>Keywords</Label>
          <Input
            id="keywords"
            placeholder="digital creator, content, social media, jenny kim"
          />
          <p className="text-xs text-muted-foreground">
            Comma-separated keywords to help with search discovery
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
