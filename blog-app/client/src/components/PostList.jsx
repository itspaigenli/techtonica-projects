import { useEffect, useState } from "react";
import { getPosts } from "../api/posts";

export default function PostList({ refreshKey, selectedCategory }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const data = await getPosts();

      let filteredPosts = data.filter((post) => post.status === "published");

      if (selectedCategory) {
        filteredPosts = filteredPosts.filter(
          (post) => post.category_name === selectedCategory,
        );
      }

      setPosts(filteredPosts);
    }

    loadPosts();
  }, [refreshKey]);

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
    return <p>No published posts found.</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Posts</h2>

      {posts.map((post) => (
        <div key={post.id} className="border rounded p-4 space-y-2">
          <h3 className="text-lg font-semibold">{post.title}</h3>

          {post.category_name && (
            <p className="text-sm text-gray-500">
              Category: {post.category_name}
            </p>
          )}

          {post.publish_date && (
            <p className="text-sm text-gray-500">
              Published: {formatDate(post.publish_date)}
            </p>
          )}

          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
