"use client";

import { PlusCircleIcon, type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { LinkFormDialog } from "../links/components/link-form-dialog";

export function NavMain({
  items,
}: {
  items: {
    label: string;
    href: string;
    icon: LucideIcon;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <LinkFormDialog
              trigger={
                <SidebarMenuButton
                  tooltip="Create New Link"
                  className="flex items-center justify-center gap-2 min-w-8 rounded-md bg-primary text-primary-foreground px-3 py-2 hover:bg-primary/90 hover:text-primary-foreground">
                  <PlusCircleIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">New Link</span>
                </SidebarMenuButton>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="gap-1.5">
          {items.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href}>
                <SidebarMenuButton tooltip={item.label} className="h-10">
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
