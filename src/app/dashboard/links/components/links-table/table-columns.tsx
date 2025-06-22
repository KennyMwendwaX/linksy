import { ColumnDef } from "@tanstack/react-table";
import { Link, statuses } from "./table-schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import TableRowActions from "./table-row-actions";
import TableColumnHeader from "./table-column-header";
import { QRCodeDialog } from "../qr-code/qr-code-dialog";

export const columns: ColumnDef<Link>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => <TableColumnHeader name="Link Name" />,
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "shortUrl",
    header: () => <TableColumnHeader name="Short URL" />,
    cell: ({ row }) => {
      const shortUrl = `https://${row.original.shortUrl}`;
      return (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.original.shortUrl}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => {
              navigator.clipboard.writeText(shortUrl);
              toast.success("Short URL copied!");
            }}
            title="Copy to clipboard">
            <Copy className="h-4 w-4" />
          </Button>
          <QRCodeDialog
            shortUrl={shortUrl}
            originalUrl={row.original.originalUrl}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <TableColumnHeader name="Created At" />,
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return <span>{date.toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: "clicks",
    header: () => <TableColumnHeader name="Clicks" />,
    cell: ({ row }) => <span>{row.original.clicks}</span>,
  },
  {
    accessorKey: "status",
    header: () => <TableColumnHeader name="Status" />,
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex items-center">
          {status.value === "active" ? (
            <status.icon className="mr-2 h-5 w-5 text-green-600" />
          ) : status.value === "inactive" ? (
            <status.icon className="mr-2 h-5 w-5 text-blue-600" />
          ) : status.value === "expired" ? (
            <status.icon className="mr-2 h-5 w-5 text-red-600" />
          ) : null}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    header: () => <TableColumnHeader name="Actions" />,
    cell: ({ row }) => <TableRowActions row={row} />,
  },
];
