
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Search, 
  UserPlus, 
  Hash 
} from "lucide-react";
import { useState } from "react";

interface Group {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  joined: boolean;
}

const Groups = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [groups, setGroups] = useState<Group[]>([
    {
      id: 1,
      name: "Web Developers Hub",
      description: "A community for web developers to share knowledge and collaborate",
      memberCount: 1234,
      joined: false
    },
    {
      id: 2,
      name: "UI/UX Design Masters",
      description: "Discussing latest trends in UI/UX design",
      memberCount: 892,
      joined: false
    },
    {
      id: 3,
      name: "Mobile App Creators",
      description: "For mobile app developers to connect and share experiences",
      memberCount: 567,
      joined: true
    }
  ]);

  const handleJoinGroup = (groupId: number) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          joined: !group.joined,
          memberCount: group.joined ? group.memberCount - 1 : group.memberCount + 1
        };
      }
      return group;
    }));
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Groups</h1>
          <Button>
            <Hash className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search groups..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Groups List */}
        <div className="space-y-4">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="font-semibold">{group.name}</h3>
                  <p className="text-sm text-gray-500">{group.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="mr-2 h-4 w-4" />
                    {group.memberCount} members
                  </div>
                </div>
                <Button
                  variant={group.joined ? "secondary" : "default"}
                  onClick={() => handleJoinGroup(group.id)}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  {group.joined ? "Joined" : "Join"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Groups;
