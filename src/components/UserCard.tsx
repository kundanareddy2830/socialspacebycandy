
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User as UserIcon } from 'lucide-react';
import { User } from '@/contexts/SocialContext';
import { useSocial } from '@/contexts/SocialContext';
import { Link } from 'react-router-dom';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { followUser, currentUser } = useSocial();

  const handleFollow = () => {
    followUser(user.id);
  };

  const isCurrentUser = currentUser?.id === user.id;

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <Link to={`/profile/${user.id}`}>
            <Avatar className="w-16 h-16 avatar-ring">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                <UserIcon className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
          </Link>
          
          <div className="flex-1 min-w-0">
            <Link to={`/profile/${user.id}`}>
              <h3 className="font-bold text-lg text-gray-900 hover:text-blue-600 transition-colors truncate">{user.name}</h3>
              <p className="text-gray-600 truncate">{user.username}</p>
            </Link>
          </div>
          
          {!isCurrentUser && (
            <Button
              onClick={handleFollow}
              variant={user.isFollowing ? "outline" : "default"}
              className={`shrink-0 ${user.isFollowing ? "border-blue-500 text-blue-600 hover:bg-blue-50" : "social-gradient"}`}
              size="sm"
            >
              {user.isFollowing ? 'Following' : 'Follow'}
            </Button>
          )}
        </div>
        
        <div className="space-y-3">
          <p className="text-sm text-gray-500 line-clamp-2">{user.bio}</p>
          
          <div className="flex justify-between text-sm">
            <span><strong>{user.posts.toLocaleString()}</strong> posts</span>
            <span><strong>{user.followers.toLocaleString()}</strong> followers</span>
            <span><strong>{user.following.toLocaleString()}</strong> following</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
