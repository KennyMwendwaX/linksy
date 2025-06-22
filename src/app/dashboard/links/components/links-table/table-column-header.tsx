import { Button } from "@/components/ui/button";

interface TableColumnHeaderProps {
  name: string;
}

export default function TableColumnHeader({ name }: TableColumnHeaderProps) {
  return (
    <>
      <Button variant="ghost" size="sm" className="-ml-3 h-8">
        <span>{name}</span>
      </Button>
    </>
  );
}
