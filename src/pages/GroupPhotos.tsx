
import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  ChevronLeft, 
  Camera,
  Upload,
  Users
} from 'lucide-react';

// Mock data for group photos
const mockPhotos = [
  { id: 1, userId: 1, userName: 'Alex Johnson', userImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7', photoUrl: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=400' },
  { id: 2, userId: 2, userName: 'Sarah Miller', userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80', photoUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400' },
  { id: 3, userId: 3, userName: 'Mike Wilson', userImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e', photoUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=400' },
];

const GroupPhotos = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState(mockPhotos);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, we would upload the file to a server
      // For now, we'll create a local URL and add it to the photos array
      const newPhoto = {
        id: photos.length + 1,
        userId: 1, // Current user's ID
        userName: 'Alex Johnson', // Current user's name
        userImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
        photoUrl: URL.createObjectURL(file)
      };
      
      setPhotos([newPhoto, ...photos]);
      toast({
        title: "Photo uploaded!",
        description: "Your photo has been added to the group.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Group Photos</h1>
          </div>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            onClick={() => navigate('/members')}
          >
            <Users className="w-5 h-5" />
            <span>{photos.length}</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Upload Section */}
        <Card className="p-6 bg-white/30 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-900">Add Your Photo</h2>
              <p className="text-sm text-gray-500">Share your photo with the group</p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary hover:bg-primary/90"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>
          </div>
        </Card>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <Card 
              key={photo.id}
              className="overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={photo.photoUrl}
                  alt={`Photo by ${photo.userName}`}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={photo.userImage}
                      alt={photo.userName}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <span className="text-white text-sm font-medium">
                      {photo.userName}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupPhotos;
