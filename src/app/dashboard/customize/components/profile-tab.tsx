"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ProfileData } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ProfileTabProps = {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
};

export default function ProfileTab({ profile, setProfile }: ProfileTabProps) {
  // Get initials from name
  const getInitials = (name: string) => {
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0]?.toUpperCase();
    return (
      (words[0][0] || "") + (words[words.length - 1][0] || "")
    ).toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Manage your public profile details and personal brand
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Picture Section */}
        <div className="space-y-2">
          <Label>Profile Picture</Label>
          <Avatar className="w-20 h-20">
            <AvatarImage src={profile.image || undefined} alt={profile.name} />
            <AvatarFallback className="text-lg font-medium">
              {getInitials(profile.name)}
            </AvatarFallback>
          </Avatar>
        </div>

        <Separator />

        {/* Display Name */}
        <div className="space-y-2">
          <Label>Display Name</Label>
          <Input
            id="displayName"
            value={profile.name}
            placeholder="Jenny Kim"
            className="max-w-md"
            disabled
          />
          <p className="text-xs text-muted-foreground">
            This is how your name appears on your profile
          </p>
        </div>

        {/* Username */}
        <div className="space-y-2">
          <Label>Username</Label>
          <div className="flex items-center max-w-md">
            <span className="inline-flex items-center px-3 h-9 rounded-l-md border border-r-0 border-input bg-muted text-sm text-muted-foreground">
              linksy.com/@
            </span>
            <Input
              id="username"
              value={profile.username}
              placeholder="jennyK"
              className="rounded-l-none"
              disabled
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Your unique profile URL
          </p>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label>Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell your audience about yourself..."
            className="min-h-[100px] max-w-md"
            maxLength={160}
            value={profile.bio}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, bio: e.target.value }))
            }
          />
          <p className="text-xs text-muted-foreground">
            Maximum 160 characters
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
