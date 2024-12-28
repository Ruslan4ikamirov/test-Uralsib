import { Post } from '../api/types';
import fetchPosts from "../api/fetchPosts";
import { useState, useEffect } from "react";
import React from 'react';

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const postData = await fetchPosts();
        setPosts(postData);
      } catch (error) {
        setError('Failed to load posts. Please, try again later.');
        console.log('Error fetching posts', error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const closeModal = () => {
    setSelectedPost(null);
  };

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600">Loading posts...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-2xl font-bold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {!selectedPost ? (
        <div className="flex flex-wrap justify-center gap-6 p-8 bg-gray-100">
        {posts.map((post) => (
          <div
            className="w-72 bg-white shadow-md rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow cursor-pointer"
            key={post.id}
            onClick={() => setSelectedPost(post)}
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">Post №{post.id}</h3>
            <p className="text-sm text-blue-600">Click to view details</p>
          </div>
        ))}
      </div>
      ) : (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOutsideClick}
        >
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-[90%] sm:max-w-[75%] md:max-w-[50%] max-h-[80vh] md:max-h-[70vh]">
            <h2 className="text-2xl font-bold mb-3">Post Details</h2>
            <p className="mt-2 text-gray-700"><span className='text-blue-500 font-semibold'>Title:</span> {selectedPost.title}</p>
            <p className="mt-2 text-gray-700"><span className='text-blue-500 font-semibold'>Content:</span> {selectedPost.body}</p>
            <button
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
