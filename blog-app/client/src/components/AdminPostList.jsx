import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../api/posts";

export default function AdminPostList({ refreshKey, onSuccess }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const data = await getPosts();
      setPosts(data);
    }

    loadPosts();
  }, [refreshKey]);

  async function handleDelete(id) {
    await deletePost(id);
    onSuccess();
  }

  if (!posts.length) {
    return <p>No posts found.</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Manage Posts</h2>

      {posts.map((post) => (
        <div key={post.id} className="border rounded p-4 space-y-2">
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p>{post.content}</p>

          <p className="text-sm text-gray-600">Status: {post.status}</p>

          <div className="flex gap-2">
            <button
              onClick={() => handleDelete(post.id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
