"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn, getShapeClasses } from "@/lib/utils";
import { IconComponent } from "@/lib/icon-mapper";
import { ThemeConfig, ProfileInfo } from "@/lib/types";
import { Link } from "@/server/database/schema";

type Props = {
  theme: ThemeConfig;
  profile: ProfileInfo;
  links: Link[];
};

export default function ProfilePreview({ theme, profile, links }: Props) {
  const backgroundStyle = theme.background.gradient?.enabled
    ? (() => {
        const { type, direction, colors } = theme.background.gradient;

        if (type === "linear") {
          return {
            background: `linear-gradient(${direction}, ${colors.join(", ")})`,
          };
        } else if (type === "radial") {
          const radialDirection =
            direction.includes("circle") || direction.includes("ellipse")
              ? direction
              : `circle at ${direction}`;
          return {
            background: `radial-gradient(${radialDirection}, ${colors.join(
              ", "
            )})`,
          };
        } else if (type === "conic") {
          return {
            background: `conic-gradient(from ${direction}, ${colors.join(
              ", "
            )})`,
          };
        }
        return { backgroundColor: theme.background.color };
      })()
    : { backgroundColor: theme.background.color };

  const visibleLinks = links.filter((link) => link.isVisibleOnProfile == true);
  const socialLinks = visibleLinks.filter(
    (link) => link.displayStyle === "social"
  );
  const buttonLinks = visibleLinks.filter(
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
    <Card
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={backgroundStyle}>
      <div className="w-full max-w-md mx-auto">
        <Card className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl shadow-purple-500/10">
          <CardContent className="p-0">
            <div className="p-6 space-y-6 relative">
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

                  {profile?.bio && (
                    <p
                      style={{ color: theme.text.bio.color }}
                      className={cn(
                        `text-${theme.text.bio.size}`,
                        "leading-relaxed max-w-sm mx-auto"
                      )}>
                      {profile.bio}
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
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-all duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${theme.button.textColor}20, transparent)`,
                          }}
                        />

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

                          <div
                            className="flex-shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300"
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
    </Card>
  );
}
