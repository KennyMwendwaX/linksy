import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { LinkItem } from "@/lib/types";
import { GripVertical, Plus, Trash2 } from "lucide-react";

type LinkTabProps = {
  links: LinkItem[];
  handleAddLink: () => void;
  handleLinkUpdate: (id: string, updates: Partial<LinkItem>) => void;
  handleLinkDelete: (id: string) => void;
};

const LinkOrderItem = ({
  link,
  onUpdate,
  onDelete,
}: {
  link: LinkItem;
  onUpdate: (id: string, updates: Partial<LinkItem>) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
      <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <Input
            value={link.icon}
            onChange={(e) => onUpdate(link.id, { icon: e.target.value })}
            className="w-12 h-8 text-center"
            placeholder="🔗"
          />
          <Input
            value={link.title}
            onChange={(e) => onUpdate(link.id, { title: e.target.value })}
            className="flex-1 h-8"
            placeholder="Link title"
          />
        </div>
        <Input
          value={link.url}
          onChange={(e) => onUpdate(link.id, { url: e.target.value })}
          className="w-full h-8"
          placeholder="https://example.com"
        />
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={link.visible}
          onCheckedChange={(checked) => onUpdate(link.id, { visible: checked })}
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(link.id)}
          className="text-destructive hover:text-destructive">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default function LinksTab({
  links,
  handleAddLink,
  handleLinkUpdate,
  handleLinkDelete,
}: LinkTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Link Management
          <Button onClick={handleAddLink} size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Link
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {links.map((link) => (
            <LinkOrderItem
              key={link.id}
              link={link}
              onUpdate={handleLinkUpdate}
              onDelete={handleLinkDelete}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
