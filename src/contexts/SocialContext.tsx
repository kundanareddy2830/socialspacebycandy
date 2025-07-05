
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
    name: 'Kundana',
    username: '@candy',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Creative soul | Digital entrepreneur ✨ Making dreams come true one project at a time',
    followers: 2840,
    following: 1250,
    posts: 287,
  },
  {
    id: '2',
    name: 'Alex Chen',
    username: '@alexc',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Full-stack developer | Coffee enthusiast ☕ | Building the future one line of code at a time',
    followers: 3100,
    following: 890,
    posts: 156,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    username: '@emily_r',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Digital marketer & content creator 📱 Helping brands tell their stories online',
    followers: 1890,
    following: 1420,
    posts: 234,
  },
  {
    id: '4',
    name: 'Marcus Johnson',
    username: '@marcusj',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Photographer & Visual Artist 📸 Capturing moments that matter. Available for shoots!',
    followers: 4200,
    following: 678,
    posts: 412,
  },
  {
    id: '5',
    name: 'Sophia Kim',
    username: '@sophiak',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    bio: 'UX Designer | Tech enthusiast 💻 Creating beautiful user experiences for the digital world',
    followers: 2650,
    following: 1100,
    posts: 189,
  },
  {
    id: '6',
    name: 'David Thompson',
    username: '@davidthompson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: 'Fitness coach & nutritionist 💪 Helping people achieve their health goals. DM for consultations!',
    followers: 5680,
    following: 823,
    posts: 567,
  },
  {
    id: '7',
    name: 'Luna Martinez',
    username: '@lunamartinez',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    bio: 'Travel blogger ✈️ | Food lover 🍜 | Exploring the world one city at a time',
    followers: 8900,
    following: 2340,
    posts: 823,  
  },
  {
    id: '8',
    name: 'Ryan O\'Connor',
    username: '@ryanoconnor',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    bio: 'Music producer & DJ 🎵 Creating beats that move your soul. New track dropping soon!',
    followers: 12500,
    following: 890,
    posts: 234,
  }
];

const initialPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    content: 'Just launched my new creative project! 🎨 Been working on this for months and I\'m so excited to finally share it with everyone. What do you think about the color palette?',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
    likes: 127,
    comments: [],
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    user: initialUsers[0],
  },
  {
    id: '2',
    userId: '4',
    content: 'Golden hour magic ✨ Sometimes the best shots happen when you least expect them. This was taken during my morning walk in the city.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
    likes: 89,
    comments: [],
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    user: initialUsers[3],
  },
  {
    id: '3',
    userId: '2',
    content: 'Exciting news! Just deployed a new React app with some amazing performance optimizations. The load time improved by 60%! 🚀 Always love seeing those green lighthouse scores.',
    likes: 156,
    comments: [],
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    user: initialUsers[1],
  },
  {
    id: '4',
    userId: '7',
    content: 'Street food adventures in Bangkok! 🍜 This pad thai from a local vendor was absolutely incredible. Sometimes the best meals come from the most unexpected places.',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&h=300&fit=crop',
    likes: 203,
    comments: [],
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    user: initialUsers[6],
  },
  {
    id: '5',
    userId: '3',
    content: 'Content marketing tip: Authenticity beats perfection every time! 💡 Share your real experiences, challenges, and wins. Your audience will connect with the genuine you.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop',
    likes: 94,
    comments: [],
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    user: initialUsers[2],
  },
  {
    id: '6',
    userId: '5',
    content: 'Working on a new mobile app design and I\'m really excited about the user flow we\'ve created. Clean, intuitive, and accessible. Can\'t wait to see it come to life! 📱',
    likes: 67,
    comments: [],
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    user: initialUsers[4],
  },
  {
    id: '7',
    userId: '6',
    content: 'Monday motivation: Your body can do it. It\'s your mind you need to convince! 💪 Starting the week strong with a 6am workout. What\'s your fitness goal this week?',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
    likes: 178,
    comments: [],
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    user: initialUsers[5],
  },
  {
    id: '8',
    userId: '8',
    content: 'Late night studio session 🎵 Working on some new beats and the energy is just incredible tonight. Music has this amazing power to connect us all.',
    likes: 145,
    comments: [],
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    user: initialUsers[7],
  },
  {
    id: '9',
    userId: '1',
    content: 'Grateful for all the support on my recent project! 🙏 The feedback has been amazing and it\'s motivating me to keep pushing creative boundaries.',
    likes: 89,
    comments: [],
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
    user: initialUsers[0],
  },
  {
    id: '10',
    userId: '7',
    content: 'Tokyo streets at night 🌃 The neon lights and bustling energy make this city absolutely magical. Already planning my next adventure!',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=300&fit=crop',
    likes: 267,
    comments: [],
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    user: initialUsers[6],
  }
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
