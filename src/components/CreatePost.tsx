
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { useSocial } from '@/contexts/SocialContext';
import { useToast } from '@/hooks/use-toast';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const { currentUser, createPost } = useSocial();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    createPost(content);
    setContent('');
    toast({
      title: "Post created!",
      description: "Your post has been shared successfully.",
    });
  };

  if (!currentUser) return null;

  return (
    <Card className="p-6 post-card">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>
              <User className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] border-0 resize-none text-lg placeholder:text-gray-400 focus-visible:ring-0"
            />
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                {content.length}/280
              </div>
              
              <Button 
                type="submit" 
                disabled={!content.trim() || content.length > 280}
                className="social-gradient hover:opacity-90 transition-opacity"
              >
                Share Post
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default CreatePost;
