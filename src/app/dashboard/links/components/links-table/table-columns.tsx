import { ColumnDef } from "@tanstack/react-table";
import { statuses } from "./table-schema";
import { Checkbox } from "@/components/ui/checkbox";
import TableRowActions from "./table-row-actions";
import TableColumnHeader from "./table-column-header";
import { QRCodeDialog } from "../qr-code/qr-code-dialog";
import { format } from "date-fns";
import { Shield } from "lucide-react";
import { Link } from "@/server/database/schema";

export const linksTableColumns: ColumnDef<Link>[] = [
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
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.name}</span>
        {row.original.description && (
          <span className="text-sm text-muted-foreground truncate max-w-xs">
            {row.original.description}
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "slug",
    header: () => <TableColumnHeader name="Short URL" />,
    cell: ({ row }) => {
      // Construct short URL from slug - adjust domain as needed
      const shortUrl = `https://yourdomain.com/${row.original.slug}`;
      return (
        <div className="flex items-center gap-2">
          <span className="font-medium font-mono text-sm">{shortUrl}</span>
          <QRCodeDialog
            shortUrl={shortUrl}
            originalUrl={row.original.originalUrl}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "clicks",
    header: () => <TableColumnHeader name="Clicks" />,
    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.clicks?.toLocaleString() || 0}
      </span>
    ),
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
            <status.icon className="mr-2 h-4 w-4 text-green-600" />
          ) : status.value === "inactive" ? (
            <status.icon className="mr-2 h-4 w-4 text-blue-600" />
          ) : status.value === "expired" ? (
            <status.icon className="mr-2 h-4 w-4 text-red-600" />
          ) : status.value === "archived" ? (
            <status.icon className="mr-2 h-4 w-4 text-gray-600" />
          ) : null}
          <span className="text-sm">{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "isProtected",
    header: () => <TableColumnHeader name="Protection" />,
    cell: ({ row }) => (
      <div className="flex items-center">
        {row.original.isProtected ? (
          <Shield className="h-4 w-4 text-amber-600" />
        ) : (
          <div className="h-4 w-4" />
        )}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <TableColumnHeader name="Created" />,
    cell: ({ row }) => {
      const createdAt = format(
        new Date(row.original.createdAt),
        "MMM dd, yyyy"
      );
      return <span className="text-sm">{createdAt}</span>;
    },
  },
  {
    accessorKey: "lastAccessedAt",
    header: () => <TableColumnHeader name="Last Accessed" />,
    cell: ({ row }) => {
      if (!row.original.lastAccessedAt) {
        return <span className="text-sm text-muted-foreground">Never</span>;
      }
      const lastAccessed = format(
        new Date(row.original.lastAccessedAt),
        "MMM dd, yyyy"
      );
      return <span className="text-sm">{lastAccessed}</span>;
    },
  },
  {
    accessorKey: "expirationDate",
    header: () => <TableColumnHeader name="Expires" />,
    cell: ({ row }) => {
      if (!row.original.expirationDate) {
        return <span className="text-sm text-muted-foreground">Never</span>;
      }
      const expirationDate = format(
        new Date(row.original.expirationDate),
        "MMM dd, yyyy"
      );
      const isExpired = new Date(row.original.expirationDate) < new Date();
      return (
        <span className={`text-sm ${isExpired ? "text-red-600" : ""}`}>
          {expirationDate}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <TableColumnHeader name="Actions" />,
    cell: ({ row }) => <TableRowActions row={row} />,
  },
];
