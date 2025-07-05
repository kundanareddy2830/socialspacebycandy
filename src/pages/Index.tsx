
import Header from '@/components/Header';
import CreatePost from '@/components/CreatePost';
import PostCard from '@/components/PostCard';
import UserCard from '@/components/UserCard';
import { useSocial } from '@/contexts/SocialContext';

const Index = () => {
  const { posts, users, currentUser } = useSocial();
  const suggestedUsers = users.filter(user => user.id !== currentUser?.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
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
                <h2 className="text-lg font-bold mb-4 text-gray-900">Your Profile</h2>
                <UserCard user={currentUser} />
              </div>
            )}

            {/* Suggested Users */}
            <div className="post-card p-6">
              <h2 className="text-lg font-bold mb-4 text-gray-900">Suggested for you</h2>
              <div className="space-y-4">
                {suggestedUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="post-card p-6">
              <h2 className="text-lg font-bold mb-4 text-gray-900">Trending</h2>
              <div className="space-y-3">
                {['#WebDesign', '#ReactJS', '#TechTips', '#UIUXDesign'].map((tag) => (
                  <div key={tag} className="flex items-center justify-between">
                    <span className="text-blue-600 font-medium hover:underline cursor-pointer">{tag}</span>
                    <span className="text-sm text-gray-500">2.1k posts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
