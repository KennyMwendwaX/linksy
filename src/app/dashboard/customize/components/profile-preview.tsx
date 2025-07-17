import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ThemeColors, ProfileData, LinkItem } from "@/lib/types";
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
              {visibleLinks.slice(0, 2).map((link) => (
                <button
                  key={link.id}
                  className="w-full text-white rounded p-2"
                  style={{
                    backgroundColor:
                      link.order === 1
                        ? theme.buttonPrimary
                        : theme.buttonSecondary,
                  }}>
                  {link.icon} {link.title}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {visibleLinks.slice(2).map((link) => (
                <a
                  key={link.id}
                  href="#"
                  className="block p-2 rounded hover:opacity-80 transition-opacity"
                  style={{ color: theme.linkColor }}>
                  {link.icon} {link.title}
                </a>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
