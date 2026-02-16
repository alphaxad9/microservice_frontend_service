// src/pages/feed/Feed.tsx

import { useState, useEffect } from "react";
import TopBar from "./ui/top_bar";
import Posts from "./ui/posts"; // Your Rooms component
import RealPosts from "./ui/RealPosts";

const Feed = () => {
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState<'rooms' | 'posts'>('rooms'); // Default to rooms

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsTopBarVisible(false);
      } else {
        setIsTopBarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="flex w-full">
      <div className="relative flex-1">
        <TopBar isVisible={isTopBarVisible} />

        {/* Tab Navigation */}
        <div className="w-full max-w-4xl mx-auto px-4 pt-6">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {/* Rooms Tab */}
            <button
              onClick={() => setActiveTab('rooms')}
              className={`px-6 py-3 font-medium text-sm relative transition-colors duration-200 ${
                activeTab === 'rooms'
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Python Microservices (Rooms)
              {activeTab === 'rooms' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-fadeIn"></span>
              )}
            </button>

            {/* Real Posts Tab */}
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-6 py-3 font-medium text-sm relative transition-colors duration-200 ${
                activeTab === 'posts'
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Go Microservices (Real Posts)
              {activeTab === 'posts' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-fadeIn"></span>
              )}
            </button>
          </div>
        </div>

        {/* Animated Content Area */}
        <div className="w-full max-w-4xl mx-auto px-4 py-6">
          <div className="transition-opacity duration-300 ease-in-out">
            {activeTab === 'rooms' ? (
              <div key="rooms" className="animate-fadeIn">
                <Posts />
              </div>
            ) : (
              <div key="posts" className="animate-fadeIn">
                <RealPosts />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;