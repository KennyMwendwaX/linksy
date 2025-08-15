import { CheckCircle, PauseCircle, Clock } from "lucide-react";
import type { ComponentType } from "react";
import { linkSchema } from "./link-schema";
import { z } from "zod";

export const statuses: {
  label: string;
  value: z.infer<typeof linkSchema>["status"];
  icon: ComponentType<{ className?: string }>;
}[] = [
  {
    label: "Active",
    value: "active",
    icon: CheckCircle,
  },
  {
    label: "Inactive",
    value: "inactive",
    icon: PauseCircle,
  },
  {
    label: "Expired",
    value: "expired",
    icon: Clock,
  },
];
