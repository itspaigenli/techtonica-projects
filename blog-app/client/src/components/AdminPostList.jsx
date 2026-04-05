import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../api/posts";

export default function AdminPostList({ refreshKey, onSuccess, onEdit }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const data = await getPosts();
      setPosts(data);
    }

    loadPosts();
  }, [refreshKey]);

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmed) {
      return;
    }

    await deletePost(id);
    onSuccess();
  }

  function formatDate(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  if (!posts.length) {
    return <p>No posts found.</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Manage Posts</h2>

      {posts.map((post) => (
        <div key={post.id} className="border rounded p-4 space-y-2">
          {/* Feature Image */}
          {post.feature_image_url && (
            <img
              src={post.feature_image_url}
              alt={post.title}
              className="w-full h-40 object-cover rounded"
            />
          )}

          <h3 className="text-lg font-semibold">{post.title}</h3>

          {post.category_name && (
            <p className="text-sm text-gray-500">
              Category: {post.category_name}
            </p>
          )}

          <p className="text-sm text-gray-600">Status: {post.status}</p>

          {post.publish_date && (
            <p className="text-sm text-gray-500">
              Published: {formatDate(post.publish_date)}
            </p>
          )}

          <p>
            {post.content.length > 120
              ? post.content.slice(0, 120) + "..."
              : post.content}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(post)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500"
            >
              Edit
            </button>

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
