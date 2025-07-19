import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ThemeConfig, ProfileData, LinkItem } from "@/lib/types";
import { cn, getShapeClasses } from "@/lib/utils";
import { IconComponent } from "@/lib/icon-mapper";
import { useMemo } from "react";

type ProfilePreviewProps = {
  theme: ThemeConfig;
  profile: ProfileData;
  links: LinkItem[];
};

export default function ProfilePreview({
  theme,
  profile,
  links,
}: ProfilePreviewProps) {
  const backgroundStyle = useMemo(() => {
    if (theme.background.gradient?.enabled) {
      const { type, direction, colors } = theme.background.gradient;

      let gradientFunction;

      if (type === "linear") {
        gradientFunction = `linear-gradient(${direction}, ${colors.join(
          ", "
        )})`;
      } else if (type === "radial") {
        const radialDirection =
          direction.includes("circle") || direction.includes("ellipse")
            ? direction
            : `circle at ${direction}`;
        gradientFunction = `radial-gradient(${radialDirection}, ${colors.join(
          ", "
        )})`;
      } else if (type === "conic") {
        gradientFunction = `conic-gradient(from ${direction}, ${colors.join(
          ", "
        )})`;
      }

      return {
        background: gradientFunction,
      };
    }
    return { backgroundColor: theme.background.color };
  }, [theme]);

  const activeLinks = links.filter((link) => link.status === "active");
  const socialLinks = activeLinks.filter(
    (link) => link.displayType === "social"
  );
  const buttonLinks = activeLinks.filter(
    (link) => link.displayType === "button"
  );

  const buttonShapeClasses = getShapeClasses(theme.button.shape);

  return (
    <div className="lg:sticky lg:top-6 lg:self-start lg:max-h-screen lg:overflow-y-auto">
      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="rounded-lg border p-6 space-y-6 min-h-[500px] max-h-[600px] overflow-y-auto"
            style={{
              ...backgroundStyle,
            }}>
            {/* Profile Header */}
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 mx-auto shadow-lg" />
              </div>

              <div className="space-y-2">
                <div>
                  <h3
                    style={{
                      color: theme.text.profileName.color,
                    }}
                    className={cn(
                      `text-${theme.text.profileName.size}`,
                      "font-bold tracking-tight"
                    )}>
                    {profile.name}
                  </h3>
                  <p
                    style={{
                      color: theme.text.profileUsername.color,
                    }}
                    className={cn(
                      `text-${theme.text.profileUsername.size}`,
                      "opacity-75 font-medium"
                    )}>
                    @{profile.username}
                  </p>
                </div>
                <p
                  style={{
                    color: theme.text.bio.color,
                  }}
                  className={cn(
                    theme.text.bio.size,
                    `text-${"opacity-90 max-w-sm mx-auto leading-relaxed px-2"}`
                  )}>
                  {profile.bio}
                </p>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="flex justify-center gap-3">
              {socialLinks.map((link) => (
                <Button
                  key={link.id}
                  style={{ backgroundColor: theme.socialMedia.backgroundColor }}
                  className="w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-[1.1] active:scale-[0.98]">
                  <IconComponent
                    style={{ color: theme.socialMedia.iconColor }}
                    url={link.originalUrl}
                    size={20}
                  />
                </Button>
              ))}
            </div>

            {/* Links Section */}
            <div className="space-y-3">
              {buttonLinks.map((link) => (
                <div key={link.id} className="group relative">
                  <Button
                    variant={theme.button.variant}
                    size={theme.button.size}
                    className={cn(
                      buttonShapeClasses,
                      "w-full p-4 text-left justify-start relative overflow-hidden transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
                      "shadow-sm hover:shadow-md"
                    )}
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
                    {/* Link Content */}
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                        <IconComponent url={link.originalUrl} size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{link.name}</div>
                      </div>
                    </div>

                    {/* Click Animation Overlay */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-active:opacity-100 transition-opacity pointer-events-none" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-white/10">
              <div className="text-xs opacity-60 space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <span>Powered by</span>
                  <span className="font-semibold">Linksy</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
