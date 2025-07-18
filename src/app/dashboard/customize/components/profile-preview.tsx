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
            className="rounded-lg border p-6 space-y-6 min-h-[500px] max-h-[600px] overflow-y-auto"
            style={{
              ...backgroundStyle,
              color: theme.textColor,
            }}>
            {/* Profile Header */}
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 mx-auto shadow-lg" />
              </div>

              <div className="space-y-2">
                <div>
                  <h3 className="text-xl font-bold tracking-tight">
                    {profile.name}
                  </h3>
                  <p className="text-sm opacity-75 font-medium">
                    @{profile.username}
                  </p>
                </div>
                {profile.bio && (
                  <p className="text-sm opacity-90 max-w-sm mx-auto leading-relaxed px-2">
                    {profile.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Social Links Row */}
            <div className="flex justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
            </div>

            {/* Links Section */}
            <div className="space-y-3">
              {visibleLinks.map((link) => (
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
                        {link.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{link.title}</div>
                      </div>
                      <div className="flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Click Animation Overlay */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-active:opacity-100 transition-opacity pointer-events-none" />
                  </Button>

                  {/* Click Counter Badge */}
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium shadow-sm">
                    {Math.floor(Math.random() * 999) + 1}
                  </div>
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
