import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ThemeColors, ProfileData, LinkItem } from "@/lib/types";
import { cn, getShapeClasses } from "@/lib/utils";
import { useMemo } from "react";

type ProfilePreviewProps = {
  theme: ThemeColors;
  profile: ProfileData;
  links: LinkItem[];
};

export default function ProfilePreview({
  theme,
  profile,
  links,
}: ProfilePreviewProps) {
  const backgroundStyle = useMemo(() => {
    if (theme.backgroundGradient?.enabled) {
      const { type, direction, colors } = theme.backgroundGradient;
      const gradientType =
        type === "linear" ? "linear-gradient" : "radial-gradient";

      const gradientDirection =
        type === "linear" ? direction : `circle at ${direction}`;

      return {
        background: `${gradientType}(${gradientDirection}, ${colors.join(
          ", "
        )})`,
      };
    }
    return { backgroundColor: theme.background };
  }, [theme]);

  const visibleLinks = links
    .filter((link) => link.visible)
    .sort((a, b) => a.order - b.order);

  const buttonShapeClasses = getShapeClasses(theme.button.shape);

  return (
    <div className="lg:sticky lg:top-6 lg:self-start lg:max-h-screen lg:overflow-y-auto">
      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="rounded-lg border p-6 space-y-4 min-h-[500px] max-h-[600px] overflow-y-auto"
            style={{
              ...backgroundStyle,
              color: theme.textColor,
            }}>
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 mx-auto" />
              <h3 className="text-lg font-semibold">{profile.name}</h3>
              <p className="text-sm opacity-80">@{profile.username}</p>
              {profile.bio && (
                <p className="text-sm opacity-90 max-w-xs mx-auto">
                  {profile.bio}
                </p>
              )}
            </div>

            <div className="space-y-3">
              {visibleLinks.map((link) => (
                <Button
                  key={link.id}
                  variant={theme.button.variant}
                  size={theme.button.size}
                  className={cn(buttonShapeClasses, "w-full p-2")}
                  style={{
                    backgroundColor:
                      theme.button.variant === "default"
                        ? theme.button.backgroundColor
                        : undefined,
                    color: theme.button.textColor,
                    borderColor:
                      theme.button.variant === "outline"
                        ? theme.button.backgroundColor
                        : undefined,
                  }}>
                  {link.icon} {link.title}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
