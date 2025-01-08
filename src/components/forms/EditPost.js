import React, { useState, useEffect } from "react";
import { getPosts, updatePost, deletePost } from "../../api"; // Corrected import path

const EditPost = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("video");
  const [error, setError] = useState("");

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

  const handleEdit = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setType(post.type);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updatePost({ id: editingPost.id, title, content, type });
      alert("Post updated successfully!");
      setEditingPost(null);
      setTitle("");
      setContent("");
      setType("video");
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to update post");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      alert("Post deleted successfully!");
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to delete post");
    }
  };

  return (
    <div>
      <h1>Edit Posts</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Type: {post.type}</p>
            <p>Posted by: {post.created_by}</p>
            <p>Posted at: {post.created_at}</p>
            <button onClick={() => handleEdit(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editingPost && (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="video">Video</option>
            <option value="image">Image</option>
            <option value="file">File</option>
          </select>
          <button type="submit">Update Post</button>
        </form>
      )}
    </div>
  );
};

export default EditPost;
