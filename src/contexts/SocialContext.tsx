
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  isFollowing?: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  user: User;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  timestamp: Date;
  user: User;
  isLiked?: boolean;
}

interface SocialContextType {
  currentUser: User | null;
  users: User[];
  posts: Post[];
  createPost: (content: string, image?: string) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  followUser: (userId: string) => void;
  setCurrentUser: (user: User) => void;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

const initialUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    username: '@sarahj',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'UI/UX Designer passionate about creating beautiful digital experiences ✨',
    followers: 1240,
    following: 892,
    posts: 156,
  },
  {
    id: '2',
    name: 'Alex Chen',
    username: '@alexc',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Full-stack developer | Coffee enthusiast ☕ | Building the future one line of code at a time',
    followers: 2100,
    following: 456,
    posts: 89,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    username: '@emily_r',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Digital marketer & content creator 📱 Helping brands tell their stories online',
    followers: 890,
    following: 1200,
    posts: 234,
  },
];

const initialPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    content: 'Just finished designing a new mobile app interface! The clean, minimalist approach really makes the user experience shine. What do you think about the latest design trends? 🎨',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
    likes: 42,
    comments: [],
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    user: initialUsers[0],
  },
  {
    id: '2',
    userId: '2',
    content: 'Exciting news! Just deployed a new React app with some amazing performance optimizations. The load time improved by 60%! 🚀 Always love seeing those green lighthouse scores.',
    likes: 38,
    comments: [],
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    user: initialUsers[1],
  },
  {
    id: '3',
    userId: '3',
    content: 'Content marketing tip: Authenticity beats perfection every time! 💡 Share your real experiences, challenges, and wins. Your audience will connect with the genuine you.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop',
    likes: 67,
    comments: [],
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    user: initialUsers[2],
  },
];

export const SocialProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(initialUsers[0]);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const createPost = (content: string, image?: string) => {
    if (!currentUser) return;
    
    const newPost: Post = {
      id: Date.now().toString(),
      userId: currentUser.id,
      content,
      image,
      likes: 0,
      comments: [],
      timestamp: new Date(),
      user: currentUser,
    };
    
    setPosts(prev => [newPost, ...prev]);
    setUsers(prev => prev.map(user => 
      user.id === currentUser.id 
        ? { ...user, posts: user.posts + 1 }
        : user
    ));
  };

  const likePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked 
          }
        : post
    ));
  };

  const addComment = (postId: string, content: string) => {
    if (!currentUser) return;
    
    const newComment: Comment = {
      id: Date.now().toString(),
      userId: currentUser.id,
      content,
      timestamp: new Date(),
      user: currentUser,
    };
    
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));
  };

  const followUser = (userId: string) => {
    if (!currentUser || userId === currentUser.id) return;
    
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          followers: user.isFollowing ? user.followers - 1 : user.followers + 1,
          isFollowing: !user.isFollowing
        };
      }
      if (user.id === currentUser.id) {
        return {
          ...user,
          following: user.following + (users.find(u => u.id === userId)?.isFollowing ? -1 : 1)
        };
      }
      return user;
    }));
  };

  return (
    <SocialContext.Provider value={{
      currentUser,
      users,
      posts,
      createPost,
      likePost,
      addComment,
      followUser,
      setCurrentUser,
    }}>
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (context === undefined) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};
