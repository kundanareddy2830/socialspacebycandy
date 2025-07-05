
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User as UserIcon } from 'lucide-react';
import { useSocial } from '@/contexts/SocialContext';

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const { users, posts, followUser, currentUser } = useSocial();
  
  const user = users.find(u => u.id === userId);
  const userPosts = posts.filter(post => post.userId === userId);
  
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">User not found</h1>
          </div>
        </div>
      </div>
    );
  }

  const isCurrentUser = currentUser?.id === user.id;

  const handleFollow = () => {
    followUser(user.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="post-card p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <Avatar className="w-32 h-32 avatar-ring">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                <UserIcon className="w-16 h-16" />
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                {!isCurrentUser && (
                  <Button
                    onClick={handleFollow}
                    variant={user.isFollowing ? "outline" : "default"}
                    className={user.isFollowing ? "border-blue-500 text-blue-600 hover:bg-blue-50" : "social-gradient"}
                  >
                    {user.isFollowing ? 'Following' : 'Follow'}
                  </Button>
                )}
              </div>
              
              <p className="text-gray-600 text-lg mb-4">{user.username}</p>
              <p className="text-gray-700 mb-6">{user.bio}</p>
              
              <div className="flex justify-center md:justify-start space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.posts}</div>
                  <div className="text-gray-600">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.followers}</div>
                  <div className="text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.following}</div>
                  <div className="text-gray-600">Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isCurrentUser ? 'Your Posts' : `${user.name}'s Posts`}
          </h2>
          
          {userPosts.length > 0 ? (
            <div className="space-y-6">
              {userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="post-card p-8 text-center">
              <p className="text-gray-500 text-lg">
                {isCurrentUser ? "You haven't posted anything yet!" : `${user.name} hasn't posted anything yet.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
