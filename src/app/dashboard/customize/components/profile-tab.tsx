import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProfileData } from "@/lib/types";
import { Label } from "recharts";

type ProfileTabProps = {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
};

export default function ProfileTab({ profile, setProfile }: ProfileTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Display Name</Label>
          <Input
            value={profile.name}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            placeholder="Your display name"
          />
        </div>

        <div>
          <Label>Username</Label>
          <Input
            value={profile.username}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                username: e.target.value,
              }))
            }
            placeholder="username"
          />
        </div>

        <div>
          <Label>Bio</Label>
          <Textarea
            value={profile.bio}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, bio: e.target.value }))
            }
            placeholder="Tell people about yourself..."
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
}
