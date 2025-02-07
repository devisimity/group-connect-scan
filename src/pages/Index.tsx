
import { useState } from 'react';
import { QRScanner } from '@/components/QRScanner';
import { ProfileCard } from '@/components/ProfileCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Search } from 'lucide-react';

// Mock data for demonstration
const mockMembers = [
  { id: 1, name: 'Alex Johnson', image: 'https://i.pravatar.cc/150?img=1', status: 'online' },
  { id: 2, name: 'Sarah Miller', image: 'https://i.pravatar.cc/150?img=2', status: 'offline' },
  { id: 3, name: 'James Wilson', image: 'https://i.pravatar.cc/150?img=3', status: 'online' },
];

const Index = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleCodeScanned = (code: string) => {
    toast({
      title: "Success!",
      description: `Joined group with code: ${code}`,
    });
    setShowScanner(false);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      handleCodeScanned(manualCode);
      setManualCode('');
    }
  };

  const filteredMembers = mockMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-800">Group Connect</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Join groups instantly by scanning a QR code or entering a group code
          </p>
        </div>

        {!showScanner ? (
          <div className="max-w-md mx-auto space-y-4 animate-fadeIn">
            <Button
              onClick={() => setShowScanner(true)}
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              Scan QR Code
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gradient-to-br from-gray-50 to-gray-100 px-2 text-gray-500">
                  or enter code manually
                </span>
              </div>
            </div>

            <form onSubmit={handleManualSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Enter group code"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                className="w-full"
              />
              <Button type="submit" className="w-full" variant="outline">
                Join Group
              </Button>
            </form>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <QRScanner onCodeScanned={handleCodeScanned} />
          </div>
        )}

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">Group Members</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <ProfileCard
                key={member.id}
                name={member.name}
                image={member.image}
                status={member.status}
                onMessageClick={() => {
                  toast({
                    title: "Coming Soon",
                    description: "Chat functionality will be available soon!",
                  });
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
