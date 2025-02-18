
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Home, Users, User, Image } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Index from "./pages/Index";
import Groups from "./pages/Groups";
import GroupMembers from "./pages/GroupMembers";
import Members2 from "./pages/Members2";
import UserProfile from "./pages/UserProfile";
import GroupPhotos from "./pages/GroupPhotos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="max-w-lg mx-auto flex justify-around items-center">
        <Button
          variant="ghost"
          size="sm"
          className={`flex flex-col items-center gap-1 ${
            location.pathname === '/' ? 'text-primary' : 'text-gray-500'
          }`}
          onClick={() => navigate('/')}
        >
          <Home size={20} />
          <span className="text-xs">Home</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`flex flex-col items-center gap-1 ${
            location.pathname === '/members' ? 'text-primary' : 'text-gray-500'
          }`}
          onClick={() => navigate('/members')}
        >
          <Users size={20} />
          <span className="text-xs">Members</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`flex flex-col items-center gap-1 ${
            location.pathname.includes('/photos') ? 'text-primary' : 'text-gray-500'
          }`}
          onClick={() => navigate('/groups/1/photos')}
        >
          <Image size={20} />
          <span className="text-xs">Photos</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`flex flex-col items-center gap-1 ${
            location.pathname === '/profile' ? 'text-primary' : 'text-gray-500'
          }`}
          onClick={() => navigate('/profile')}
        >
          <User size={20} />
          <span className="text-xs">Profile</span>
        </Button>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="pb-16"> {/* Add padding to account for bottom nav */}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/members" element={<GroupMembers />} />
            <Route path="/members2" element={<Members2 />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/groups/:groupId/photos" element={<GroupPhotos />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
