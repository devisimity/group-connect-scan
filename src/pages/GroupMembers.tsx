import { useState } from 'react';
import { ProfileCard } from '@/components/ProfileCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Search, UserPlus, Users } from 'lucide-react';
import { Chat } from '@/components/Chat';

// Mock data for demonstration
const mockMembers = [
  { id: 1, name: 'Alex Johnson', image: 'https://i.pravatar.cc/150?img=1', status: 'online' },
  { id: 2, name: 'Sarah Miller', image: 'https://i.pravatar.cc/150?img=2', status: 'offline' },
  { id: 3, name: 'James Wilson', image: 'https://i.pravatar.cc/150?img=3', status: 'online' },
  { id: 4, name: 'Emma Davis', image: 'https://i.pravatar.cc/150?img=4', status: 'online' },
  { id: 5, name: 'Michael Brown', image: 'https://i.pravatar.cc/150?img=5', status: 'offline' },
  { id: 6, name: 'Lisa Anderson', image: 'https://i.pravatar.cc/150?img=6', status: 'online' },
];

const GroupMembers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<(typeof mockMembers)[0] | null>(null);

  const filteredMembers = mockMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInviteMember = () => {
    toast({
      title: "Coming Soon",
      description: "Invite functionality will be available soon!",
    });
  };

  const handleMessageClick = (member: typeof mockMembers[0]) => {
    setSelectedMember(member);
    setChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-800">Group Members</h1>
            <p className="text-gray-600">
              {mockMembers.length} members in this group
            </p>
          </div>
          <Button
            onClick={handleInviteMember}
            className="bg-primary hover:bg-primary/90"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-2xl font-semibold text-gray-800">{mockMembers.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full">
                <div className="h-6 w-6 rounded-full bg-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Online</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {mockMembers.filter(m => m.status === 'online').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-full">
                <div className="h-6 w-6 rounded-full bg-gray-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Offline</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {mockMembers.filter(m => m.status === 'offline').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full md:w-96"
          />
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <ProfileCard
              key={member.id}
              name={member.name}
              image={member.image}
              status={member.status}
              onMessageClick={() => handleMessageClick(member)}
            />
          ))}
        </div>

        {/* Chat Dialog */}
        {selectedMember && (
          <Chat
            isOpen={chatOpen}
            onClose={() => setChatOpen(false)}
            recipientName={selectedMember.name}
            recipientImage={selectedMember.image}
          />
        )}
      </div>
    </div>
  );
};

export default GroupMembers;
