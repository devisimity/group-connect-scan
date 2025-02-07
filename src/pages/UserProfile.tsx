
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
  MessageCircle
} from 'lucide-react';

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
                <Calendar className="w-5 h-5 text-primary mr-1" />
                <span className="font-semibold text-lg">124</span>
              </div>
              <p className="text-sm text-gray-500">Posts</p>
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

        {/* Recent Posts Grid */}
        <div className="grid grid-cols-3 gap-1">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-100 rounded-md overflow-hidden">
              <img
                src={`https://source.unsplash.com/random/300x300?sig=${i}`}
                alt={`Post ${i + 1}`}
                className="w-full h-full object-cover hover:opacity-90 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
