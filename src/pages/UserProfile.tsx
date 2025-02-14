import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ChevronLeft, 
  Share2, 
  Settings, 
  Camera,
  Users,
  Calendar,
  MessageCircle,
  ArrowRight
} from 'lucide-react';

// Mock data for groups
const userGroups = [
  { id: 1, name: 'Photography Club', members: 24, image: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=300' },
  { id: 2, name: 'Book Club', members: 15, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=300' },
  { id: 3, name: 'Hiking Group', members: 42, image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=300' },
  { id: 4, name: 'Tech Meetup', members: 56, image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=300' },
  { id: 5, name: 'Music Band', members: 8, image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=300' },
  { id: 6, name: 'Art Club', members: 31, image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=300' },
];

const UserProfile = () => {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary">
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Alex Johnson</h1>
            <p className="text-gray-500">@alexj</p>
            <div className="mt-2 flex gap-2">
              <Button
                onClick={() => setIsFollowing(!isFollowing)}
                variant={isFollowing ? "outline" : "default"}
                className="w-32"
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline" onClick={() => navigate('/messages')}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <Card className="bg-white/30 backdrop-blur-sm">
          <div className="grid grid-cols-3 gap-4 p-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Users className="w-5 h-5 text-primary mr-1" />
                <span className="font-semibold text-lg">{userGroups.length}</span>
              </div>
              <p className="text-sm text-gray-500">Groups</p>
            </div>
            <div className="text-center border-x border-gray-200">
              <div className="flex items-center justify-center mb-1">
                <Users className="w-5 h-5 text-primary mr-1" />
                <span className="font-semibold text-lg">1.2k</span>
              </div>
              <p className="text-sm text-gray-500">Friends</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <MessageCircle className="w-5 h-5 text-primary mr-1" />
                <span className="font-semibold text-lg">348</span>
              </div>
              <p className="text-sm text-gray-500">Comments</p>
            </div>
          </div>
        </Card>

        {/* Groups Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Groups</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userGroups.map((group) => (
              <Card 
                key={group.id} 
                className="group overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold">{group.name}</h3>
                    <p className="text-white/80 text-sm flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {group.members} members
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => navigate(`/groups/${group.id}/photos`)}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
