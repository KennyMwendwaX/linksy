import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn, getShapeClasses } from "@/lib/utils";
import { IconComponent } from "@/lib/icon-mapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { tryCatch } from "@/lib/try-catch";
import { getUserProfileCustomization } from "@/server/actions/customizations/get";
import { getUserVisibleLinks } from "@/server/actions/links/get";
import { getUserProfileInfo } from "@/server/actions/users/get";
import { defaultTheme } from "@/lib/default-theme";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function PublicProfile({ params }: Props) {
  const { username } = await params;
  // Decode URL-encoded characters
  let cleanUsername = decodeURIComponent(username);

  // If it starts with @, strip it
  if (cleanUsername.startsWith("@")) {
    cleanUsername = cleanUsername.slice(1);
  }

  const { data: profile, error: profileError } = await tryCatch(
    getUserProfileInfo(cleanUsername)
  );
  if (profileError) {
    console.error("Failed to fetch user info:", profileError);
  }

  const { data: profileCustomization, error: profileCustomizationError } =
    await tryCatch(getUserProfileCustomization(cleanUsername));
  if (profileCustomizationError) {
    console.error(
      "Failed to fetch profile customization:",
      profileCustomizationError
    );
  }

  const { data: visibleLinks, error: linksError } = await tryCatch(
    getUserVisibleLinks(cleanUsername)
  );
  if (linksError) {
    console.error("Failed to fetch user links:", linksError);
  }

  // User customization takes priority, fallback to default
  const theme = profileCustomization?.themeConfig || defaultTheme;

  const backgroundStyle = theme.background.gradient?.enabled
    ? (() => {
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
      })()
    : { backgroundColor: theme.background.color };

  const socialLinks = visibleLinks?.filter(
    (link) => link.displayStyle === "social"
  );
  const buttonLinks = visibleLinks?.filter(
    (link) => link.displayStyle === "default"
  );

  const buttonShapeClasses = getShapeClasses(theme.button.shape);

  const getInitials = (name: string) => {
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0]?.toUpperCase();
    return (
      (words[0][0] || "") + (words[words.length - 1][0] || "")
    ).toUpperCase();
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={backgroundStyle}>
      <div className="w-full max-w-md mx-auto">
        <Card className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl shadow-purple-500/10">
          <CardContent className="p-0">
            <div className="p-6 space-y-6 relative">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>
              {/* Profile Header */}
              <div className="text-center space-y-4 relative z-10">
                <div className="relative">
                  <Avatar className="w-20 h-20 mx-auto shadow-xl ring-3 ring-white/10">
                    <AvatarImage
                      src={profile?.image || undefined}
                      alt={profile?.name || ""}
                      className="object-cover"
                    />
                    <AvatarFallback
                      className="text-xl font-bold"
                      style={{
                        backgroundColor: theme.button.backgroundColor,
                        color: theme.button.textColor,
                      }}>
                      {profile?.name ? getInitials(profile.name) : ""}
                    </AvatarFallback>
                  </Avatar>

                  <div
                    className="absolute inset-0 w-20 h-20 rounded-full opacity-20 blur-lg animate-pulse -z-10"
                    style={{
                      backgroundColor: theme.button.backgroundColor,
                    }}
                  />
                  <div
                    className="absolute inset-0 w-20 h-20 rounded-full opacity-5 blur-xl -z-20"
                    style={{
                      backgroundColor: theme.socialMedia.backgroundColor,
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <div className="space-y-1">
                    <h1
                      style={{ color: theme.text.name.color }}
                      className={cn(
                        `text-${theme.text.name.size}`,
                        "font-bold tracking-tight"
                      )}>
                      {profile?.name}
                    </h1>
                    <p
                      style={{ color: theme.text.username.color }}
                      className={cn(
                        `text-${theme.text.username.size}`,
                        "font-medium"
                      )}>
                      @{profile?.username}
                    </p>
                  </div>

                  {profileCustomization?.bio && (
                    <p
                      style={{ color: theme.text.bio.color }}
                      className={cn(
                        `text-${theme.text.bio.size}`,
                        "leading-relaxed max-w-sm mx-auto"
                      )}>
                      {profileCustomization.bio}
                    </p>
                  )}
                </div>
              </div>

              {/* Social Links Row */}
              {socialLinks && socialLinks.length > 0 && (
                <div className="flex justify-center gap-3 flex-wrap relative z-10">
                  {socialLinks.map((link) => (
                    <Button
                      key={link.id}
                      className="w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-md hover:shadow-lg relative group"
                      style={{
                        backgroundColor: theme.socialMedia.backgroundColor,
                      }}>
                      {/* Reduced glow effect */}
                      <div
                        className="absolute inset-0 w-10 h-10 rounded-full opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300 -z-10"
                        style={{
                          backgroundColor: theme.socialMedia.backgroundColor,
                        }}
                      />
                      <IconComponent
                        style={{ color: theme.socialMedia.iconColor }}
                        url={link.originalUrl}
                        size={18}
                      />
                    </Button>
                  ))}
                </div>
              )}

              {/* Links Section */}
              {buttonLinks && buttonLinks.length > 0 && (
                <div className="space-y-3 relative z-10">
                  {buttonLinks.map((link) => (
                    <div key={link.id} className="group">
                      <Button
                        variant={theme.button.variant}
                        size={theme.button.size}
                        className={cn(
                          buttonShapeClasses,
                          "w-full p-4 text-left justify-between relative overflow-hidden transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-md hover:shadow-lg backdrop-blur-sm"
                        )}
                        style={{
                          backgroundColor:
                            theme.button.variant === "default"
                              ? theme.button.backgroundColor
                              : "rgba(255, 255, 255, 0.05)",
                          color: theme.button.textColor,
                          borderColor:
                            theme.button.variant === "outline"
                              ? theme.button.backgroundColor
                              : "rgba(255, 255, 255, 0.1)",
                          borderWidth:
                            theme.button.variant === "outline" ? "2px" : "1px",
                        }}>
                        {/* Reduced hover overlay */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-all duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${theme.button.textColor}20, transparent)`,
                          }}
                        />

                        {/* Link Content */}
                        <div className="flex items-center gap-3 w-full relative z-10">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <IconComponent
                              url={link.originalUrl}
                              size={20}
                              style={{
                                color:
                                  theme.button.variant === "outline"
                                    ? theme.button.backgroundColor
                                    : theme.button.textColor,
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-base truncate">
                                {link.name}
                              </div>
                            </div>
                          </div>

                          {/* Smaller arrow */}
                          <div
                            className="shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300"
                            style={{
                              color:
                                theme.button.variant === "outline"
                                  ? theme.button.backgroundColor
                                  : theme.button.textColor,
                            }}>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth="2">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="text-center pt-4 border-t border-white/5 relative z-10">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium backdrop-blur-sm border border-white/10"
                  style={{
                    backgroundColor: `${theme.button.backgroundColor}10`,
                    color: theme.text.bio.color,
                  }}>
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: theme.button.backgroundColor }}
                    />
                    <div
                      className="w-1 h-1 rounded-full animate-pulse"
                      style={{
                        backgroundColor: theme.socialMedia.backgroundColor,
                        animationDelay: "0.5s",
                      }}
                    />
                  </div>
                  <span className="opacity-75 text-xs">Powered by</span>
                  <span
                    className="font-bold text-sm"
                    style={{ color: theme.button.backgroundColor }}>
                    Linksy
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
