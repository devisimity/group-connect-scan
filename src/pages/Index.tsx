
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Post {
  id: number;
  username: string;
  userImage: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: Date;
  liked: boolean;
}

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      username: "alex.photo",
      userImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      caption: "Working on some new projects 💻✨",
      likes: 124,
      comments: 12,
      timestamp: new Date(Date.now() - 3600000),
      liked: false
    },
    {
      id: 2,
      username: "sarah.designs",
      userImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      caption: "Team meeting day! Great discussions and new ideas 🚀",
      likes: 89,
      comments: 8,
      timestamp: new Date(Date.now() - 7200000),
      liked: false
    },
    {
      id: 3,
      username: "tech.creative",
      userImage: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      caption: "Innovation happens when we collaborate 🤝",
      likes: 245,
      comments: 18,
      timestamp: new Date(Date.now() - 10800000),
      liked: false
    }
  ]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Stories bar */}
      <div className="bg-white border-b sticky top-0 z-10">
        <ScrollArea className="w-full py-4">
          <div className="flex gap-4 px-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px]">
                  <div className="w-full h-full rounded-full border-2 border-white">
                    <img
                      src={`https://images.unsplash.com/photo-${1649972904349 + i}-6e44c42644a7`}
                      alt={`Story ${i + 1}`}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-600">user_{i + 1}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Feed */}
      <div className="max-w-lg mx-auto pt-4 px-4 space-y-6">
        {posts.map(post => (
          <Card key={post.id} className="overflow-hidden">
            {/* Post header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <img
                    src={post.userImage}
                    alt={post.username}
                    className="w-full h-full object-cover"
                  />
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{post.username}</p>
                  <p className="text-xs text-gray-500">
                    {post.timestamp.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Post image */}
            <div className="relative aspect-square">
              <img
                src={post.image}
                alt="Post content"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post actions */}
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleLike(post.id)}
                  className={post.liked ? "text-red-500" : "text-gray-600"}
                >
                  <Heart className={`h-6 w-6 ${post.liked ? "fill-current" : ""}`} />
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-6 w-6" />
                </Button>
              </div>

              {/* Likes count */}
              <p className="font-semibold text-sm">
                {post.likes} likes
              </p>

              {/* Caption */}
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-semibold">{post.username}</span>{" "}
                  {post.caption}
                </p>
                <p className="text-sm text-gray-500">
                  View all {post.comments} comments
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
