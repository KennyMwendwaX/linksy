"use client";

import { Copy, ExternalLink, Link2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatNumber, truncateUrl } from "@/lib/utils";
import { format } from "date-fns";
import Link from "next/link";

export function RecentLinksTable() {
  const recentLinks = [
    {
      id: "1",
      originalUrl:
        "https://example.com/very-long-path/blog/article-with-a-very-long-name-123",
      shortUrl: "linksy.com/r/product",
      createdAt: "2023-10-15T14:23:11Z",
      clicks: 856,
      isActive: true,
    },
    {
      id: "2",
      originalUrl: "https://another-example.com/path/to/resource",
      shortUrl: "linksy.com/r/webinar",
      createdAt: "2023-10-12T09:45:22Z",
      clicks: 532,
      isActive: true,
    },
    {
      id: "3",
      originalUrl:
        "https://long-domain-name-for-testing.com/another/long/path/to/test/truncation",
      shortUrl: "linksy.com/r/event",
      createdAt: "2023-10-10T16:12:09Z",
      clicks: 321,
      isActive: true,
    },
    {
      id: "4",
      originalUrl: "https://docs.example.com/getting-started",
      shortUrl: "linksy.com/r/docs",
      createdAt: "2023-10-08T11:34:55Z",
      clicks: 267,
      isActive: true,
    },
    {
      id: "5",
      originalUrl: "https://example.com/pricing",
      shortUrl: "linksy.com/r/pricing",
      createdAt: "2023-10-05T08:22:37Z",
      clicks: 198,
      isActive: true,
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Links</CardTitle>
        <CardDescription>
          Your most recently created shortened URLs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Original URL</TableHead>
              <TableHead>Short URL</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Clicks</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentLinks.map((link) => (
              <TableRow key={link.id}>
                <TableCell
                  className="max-w-[200px] truncate"
                  title={link.originalUrl}>
                  {truncateUrl(link.originalUrl)}
                </TableCell>
                <TableCell className="font-mono">{link.shortUrl}</TableCell>
                <TableCell className="text-muted-foreground">
                  {format(link.createdAt, "MMM dd, yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  {formatNumber(link.clicks)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" title="Copy link">
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      title="Open link">
                      <a
                        href={link.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Open</span>
                      </a>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Analytics</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 flex justify-end">
          <Link href="/dashboard/links">
            <Button variant="ghost" size="sm" className="gap-1">
              <Link2 className="h-4 w-4" />
              View all links
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
