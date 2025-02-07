
import { useState } from 'react';
import { QRScanner } from '@/components/QRScanner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Users, QrCode, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCodeScanned = (code: string) => {
    toast({
      title: "Success!",
      description: `Joined group with code: ${code}`,
    });
    setShowScanner(false);
    // Navigate to members page after successful join
    navigate('/members');
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      handleCodeScanned(manualCode);
      setManualCode('');
    }
  };

  const handleCreateGroup = () => {
    toast({
      title: "Coming Soon",
      description: "Group creation will be available soon!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-800">Group Connect</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Join existing groups or create your own to connect with others
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Join Group Card */}
          <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 space-y-4">
            <div className="text-center space-y-2">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Join a Group</h2>
              <p className="text-gray-600 text-sm">Connect with existing groups using QR code or group code</p>
            </div>

            {!showScanner ? (
              <div className="space-y-4">
                <Button
                  onClick={() => setShowScanner(true)}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  <QrCode className="mr-2 h-4 w-4" />
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
              <div className="mt-4">
                <QRScanner onCodeScanned={handleCodeScanned} />
              </div>
            )}
          </div>

          {/* Create Group Card */}
          <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 space-y-4">
            <div className="text-center space-y-2">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Create a Group</h2>
              <p className="text-gray-600 text-sm">Start your own group and invite others to join</p>
            </div>
            
            <Button 
              onClick={handleCreateGroup}
              className="w-full bg-primary hover:bg-primary/90 text-white mt-4"
            >
              Create New Group
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
