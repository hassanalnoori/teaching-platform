import React, { useState, useEffect } from "react";
import { getPosts } from "../../api"; // Corrected import path

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Type: {post.type}</p>
            <p>Posted by: {post.created_by}</p>
            <p>Posted at: {post.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
