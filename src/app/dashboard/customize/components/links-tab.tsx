import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GripVertical, Plus, Trash2, Link2, Users } from "lucide-react";
import { useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconComponent } from "@/lib/icon-mapper";
import { LinkItem } from "@/lib/types";

type LinkTabProps = {
  links: LinkItem[];
  setLinks: React.Dispatch<React.SetStateAction<LinkItem[]>>;
};

const SortableLinkItem = ({
  link,
  onUpdate,
  onDelete,
}: {
  link: LinkItem;
  onUpdate: (id: string, updates: Partial<LinkItem>) => void;
  onDelete: (id: string) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg border">
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing">
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Auto-generated icon display */}
      <div className="w-10 h-10 flex items-center justify-center bg-background rounded-md border shadow-sm">
        <IconComponent url={link.originalUrl} size={20} />
      </div>

      <div className="flex-1 space-y-3">
        {/* Link Name and Display Type Row */}
        <div className="flex items-center gap-3">
          <Input
            value={link.name}
            onChange={(e) =>
              onUpdate(link.id.toString(), { name: e.target.value })
            }
            className="flex-1 h-9"
            placeholder="Link name"
          />
          <Select
            value={link.displayType}
            onValueChange={(value: "button" | "social") =>
              onUpdate(link.id.toString(), { displayType: value })
            }>
            <SelectTrigger className="w-32 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="button">
                <div className="flex items-center gap-2">
                  <Link2 className="w-4 h-4" />
                  Button
                </div>
              </SelectItem>
              <SelectItem value="social">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Social
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* URL and Slug Row */}
        <div className="flex items-center gap-3">
          <Input
            value={link.originalUrl}
            onChange={(e) =>
              onUpdate(link.id.toString(), { originalUrl: e.target.value })
            }
            className="flex-1 h-9"
            placeholder="https://example.com"
          />
          <Input
            value={link.slug}
            onChange={(e) =>
              onUpdate(link.id.toString(), { slug: e.target.value })
            }
            className="w-28 h-9"
            placeholder="slug"
          />
        </div>

        {/* Display Type Indicator */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {link.displayType === "button" ? (
            <>
              <Link2 className="w-3 h-3" />
              <span>Will appear as a button link</span>
            </>
          ) : (
            <>
              <Users className="w-3 h-3" />
              <span>Will appear in social media row</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Active</span>
          <Switch
            checked={link.status === "active"}
            onCheckedChange={(checked) =>
              onUpdate(link.id.toString(), {
                status: checked ? "active" : "inactive",
              })
            }
          />
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(link.id.toString())}
          className="text-destructive hover:text-destructive">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default function LinksTab({ links, setLinks }: LinkTabProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleLinkUpdate = useCallback(
    (id: string, updates: Partial<LinkItem>) => {
      setLinks((prev) =>
        prev.map((link) =>
          link.id.toString() === id ? { ...link, ...updates } : link
        )
      );
    },
    [setLinks]
  );

  const handleLinkDelete = useCallback(
    (id: string) => {
      setLinks((prev) => prev.filter((link) => link.id.toString() !== id));
    },
    [setLinks]
  );

  const handleAddLink = useCallback(() => {
    const newLink: LinkItem = {
      id: Date.now(),
      name: "New Link",
      originalUrl: "https://example.com",
      slug: `link-${Date.now()}`,
      status: "active",
      order: links.length + 1,
      displayType: "button", // Default to button
    };
    setLinks((prev) => [...prev, newLink]);
  }, [links.length, setLinks]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        setLinks((prev) => {
          const oldIndex = prev.findIndex((link) => link.id === active.id);
          const newIndex = prev.findIndex((link) => link.id === over.id);

          const newLinks = arrayMove(prev, oldIndex, newIndex);

          // Update the order property to reflect the new positions
          return newLinks.map((link, index) => ({
            ...link,
            order: index + 1,
          }));
        });
      }
    },
    [setLinks]
  );

  // Sort links by order before rendering
  const sortedLinks = [...links].sort((a, b) => a.order - b.order);

  // Get counts for each type
  const buttonLinks = sortedLinks.filter(
    (link) => link.displayType === "button"
  );
  const socialLinks = sortedLinks.filter(
    (link) => link.displayType === "social"
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="space-y-1">
            <div>Link Management</div>
            <div className="text-sm font-normal text-muted-foreground">
              {buttonLinks.length} button links • {socialLinks.length} social
              links
            </div>
          </div>
          <Button onClick={handleAddLink} size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Link
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedLinks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Link2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No links added yet</p>
            <p className="text-sm">Click &quot;Add Link&quot; to get started</p>
          </div>
        ) : (
          <>
            <div className="text-sm text-muted-foreground mb-3">
              Drag and drop to reorder links within their display type
            </div>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}>
              <SortableContext
                items={sortedLinks.map((link) => link.id)}
                strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  {sortedLinks.map((link) => (
                    <SortableLinkItem
                      key={link.id}
                      link={link}
                      onUpdate={handleLinkUpdate}
                      onDelete={handleLinkDelete}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </>
        )}
      </CardContent>
    </Card>
  );
}
