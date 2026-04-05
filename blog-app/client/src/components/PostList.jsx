import { useEffect, useState } from "react";
import { getPosts } from "../api/posts";

export default function PostList({ refreshKey }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const data = await getPosts();
      setPosts(data);
    }

    loadPosts();
  }, [refreshKey]);

  if (!posts.length) {
    return <p>No posts found.</p>;
  }

  return (
    <div>
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Status: {post.status}</p>
        </div>
      ))}
    </div>
  );
}
