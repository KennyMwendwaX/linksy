import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { GripVertical, Plus, Trash2 } from "lucide-react";
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
      className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing">
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>
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
        prev.map((link) => (link.id === id ? { ...link, ...updates } : link))
      );
    },
    [setLinks]
  );

  const handleLinkDelete = useCallback(
    (id: string) => {
      setLinks((prev) => prev.filter((link) => link.id !== id));
    },
    [setLinks]
  );

  const handleAddLink = useCallback(() => {
    const newLink: LinkItem = {
      id: Date.now().toString(),
      title: "New Link",
      url: "https://example.com",
      icon: "🔗",
      visible: true,
      order: links.length + 1,
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
      </CardContent>
    </Card>
  );
}
