
import Header from '@/components/Header';
import CreatePost from '@/components/CreatePost';
import PostCard from '@/components/PostCard';
import UserCard from '@/components/UserCard';
import Stories from '@/components/Stories';
import DirectMessages from '@/components/DirectMessages';
import { useSocial } from '@/contexts/SocialContext';

const Index = () => {
  const { posts, users, currentUser, trendingTopics } = useSocial();
  const suggestedUsers = users.filter(user => user.id !== currentUser?.id && !user.isFollowing).slice(0, 4);
  const onlineUsers = users.filter(user => user.isOnline && user.id !== currentUser?.id).slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <Stories />
            <CreatePost />
            
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current User Profile */}
            {currentUser && (
              <div className="post-card p-6">
                <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Your Profile</h2>
                <UserCard user={currentUser} />
              </div>
            )}

            {/* Online Users */}
            {onlineUsers.length > 0 && (
              <div className="post-card p-6">
                <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Online Now</h2>
                <div className="space-y-3">
                  {onlineUsers.map((user) => (
                    <div key={user.id} className="flex items-center space-x-3">
                      <div className="relative">
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <span className="text-sm font-medium">{user.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Users */}
            <div className="post-card p-6">
              <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Suggested for you</h2>
              <div className="space-y-4">
                {suggestedUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="post-card p-6">
              <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Trending</h2>
              <div className="space-y-3">
                {trendingTopics.map((tag, index) => (
                  <div key={tag} className="flex items-center justify-between">
                    <span className="text-blue-600 font-medium hover:underline cursor-pointer">{tag}</span>
                    <span className="text-sm text-gray-500">{Math.floor(Math.random() * 5000 + 500)} posts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DirectMessages />
    </div>
  );
};

export default Index;
