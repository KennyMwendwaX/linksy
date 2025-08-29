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
import { GripVertical, Link2, Users } from "lucide-react";
import { useCallback, useTransition } from "react";
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
import { Link, ProfileCustomization } from "@/server/database/schema";
import { reorderLink } from "@/server/actions/links/reorder";
import { tryCatch } from "@/lib/try-catch";
import { toast } from "sonner";

type LinkTabProps = {
  links: Link[];
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
  customization: ProfileCustomization | undefined;
};

const SortableLinkItem = ({
  link,
  onUpdate,
}: {
  link: Link;
  onUpdate: (id: string, updates: Partial<Link>) => void;
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
      className="group flex items-start gap-4 p-4 bg-background rounded-lg border hover:shadow-sm transition-shadow">
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="flex-shrink-0 cursor-grab active:cursor-grabbing mt-1">
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Icon */}
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-background rounded-md border">
        <IconComponent url={link.originalUrl} size={20} />
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Name */}
        <Input
          value={link.name}
          onChange={(e) =>
            onUpdate(link.id.toString(), { name: e.target.value })
          }
          className="w-full"
          placeholder="Link name"
        />

        {/* URL */}
        <Input
          value={link.originalUrl}
          onChange={(e) =>
            onUpdate(link.id.toString(), { originalUrl: e.target.value })
          }
          className="w-full"
          placeholder="https://example.com"
        />

        <Select
          value={link.displayStyle}
          onValueChange={(value: "default" | "social") =>
            onUpdate(link.id.toString(), { displayStyle: value })
          }>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">
              <div className="flex items-center gap-1">
                <Link2 className="w-3 h-3" />
                <span className="text-xs">Button</span>
              </div>
            </SelectItem>
            <SelectItem value="social">
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span className="text-xs">Social</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 flex flex-col items-center gap-2">
        <Switch
          checked={link.isVisibleOnProfile === true}
          onCheckedChange={(checked) =>
            onUpdate(link.id.toString(), {
              isVisibleOnProfile: checked ? true : false,
            })
          }
        />
      </div>
    </div>
  );
};

export default function LinksTab({ links, setLinks }: LinkTabProps) {
  const [, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleLinkUpdate = useCallback(
    (id: string, updates: Partial<Link>) => {
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

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        // Get current order
        const oldIndex = links.findIndex((link) => link.id === active.id);
        const newIndex = links.findIndex((link) => link.id === over.id);

        // Optimistic update - immediate UI feedback
        const newLinks = arrayMove(links, oldIndex, newIndex);
        setLinks(newLinks);

        startTransition(async () => {
          const result = await tryCatch(
            reorderLink(Number(active.id), newIndex)
          );

          if (result.error) {
            // Revert on failure
            setLinks(links);
            toast.error("Failed to reorder the link");
            console.error("Failed to reorder:", result.error);
          }
        });
      }
    },
    [links, setLinks]
  );

  const buttonLinks = links.filter((link) => link.displayStyle === "default");
  const socialLinks = links.filter((link) => link.displayStyle === "social");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div>Link Management</div>
          <div className="text-sm font-normal text-muted-foreground">
            {buttonLinks.length} button links • {socialLinks.length} social
            links
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {links.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Link2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No links added yet</p>
            <p className="text-sm">Click &quot;Add Link&quot; to get started</p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}>
            <SortableContext
              items={links.map((link) => link.id)}
              strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {links.map((link) => (
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
        )}
      </CardContent>
    </Card>
  );
}
