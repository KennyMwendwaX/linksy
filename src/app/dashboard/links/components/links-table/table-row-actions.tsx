import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, MoreHorizontal, Pencil, Trash2, BarChart } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { Link } from "@/server/database/schema";

type TableRowActionsProps = {
  row: Row<Link>;
};

export default function TableRowActions({ row }: TableRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => toast.info(`Edit URL: ${row.original.id}`)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            const shortUrl = `https://${row.original.slug}`;
            navigator.clipboard.writeText(shortUrl);
            toast.success("Short URL copied!");
          }}>
          <Copy className="mr-2 h-4 w-4" />
          Copy link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => toast.info(`View stats for URL: ${row.original.id}`)}>
          <BarChart className="mr-2 h-4 w-4" />
          View Stats
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => toast.info(`Delete URL: ${row.original.id}`)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
