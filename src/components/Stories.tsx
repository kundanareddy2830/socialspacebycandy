import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus, User } from 'lucide-react';
import { useSocial } from '@/contexts/SocialContext';

const Stories = () => {
  const { users, currentUser } = useSocial();
  const [showStoryViewer, setShowStoryViewer] = useState(false);

  return (
    <Card className="p-4 mb-6">
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {/* Add Your Story */}
        {currentUser && (
          <div className="flex flex-col items-center space-y-2 min-w-0 flex-shrink-0">
            <div className="relative">
              <Avatar className="w-16 h-16 ring-2 ring-gray-300">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback><User className="w-8 h-8" /></AvatarFallback>
              </Avatar>
              <Button size="sm" className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full p-0 social-gradient">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <span className="text-xs text-gray-600 text-center">Your Story</span>
          </div>
        )}
        
        {/* Other Users' Stories */}
        {users.slice(0, 8).map((user) => (
          <div key={user.id} className="flex flex-col items-center space-y-2 min-w-0 flex-shrink-0 cursor-pointer">
            <Avatar className="w-16 h-16 ring-4 ring-gradient-to-r from-pink-500 to-yellow-500 ring-offset-2">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback><User className="w-8 h-8" /></AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-600 text-center truncate w-16">{user.name.split(' ')[0]}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Stories;
