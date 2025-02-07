
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  image: string;
  status: string;
  onMessageClick: () => void;
}

export const ProfileCard = ({ name, image, status, onMessageClick }: ProfileCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fadeIn backdrop-blur-sm bg-white/30">
      <div className="p-4 space-y-4">
        <div className="relative w-20 h-20 mx-auto">
          <img
            src={image}
            alt={name}
            className="rounded-full object-cover w-full h-full border-2 border-primary"
          />
          <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full ${
            status === 'online' ? 'bg-green-400' : 'bg-gray-400'
          } border-2 border-white`} />
        </div>
        
        <div className="text-center">
          <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500 capitalize">{status}</p>
        </div>

        <Button
          onClick={onMessageClick}
          className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
        >
          <MessageCircle size={18} />
          Message
        </Button>
      </div>
    </Card>
  );
};
