import { useEffect, useState } from "react";
import { getPosts } from "../api/posts";
import { getCategories } from "../api/categories";

export default function PostList({ refreshKey }) {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    async function loadCategories() {
      const data = await getCategories();
      setCategories(data);
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadPosts() {
      const data = await getPosts();

      let filteredPosts = data.filter((post) => post.status === "published");

      if (selectedCategory) {
        filteredPosts = filteredPosts.filter(
          (post) => post.category_id === Number(selectedCategory),
        );
      }

      setPosts(filteredPosts);
    }

    loadPosts();
  }, [refreshKey, selectedCategory]);

  function formatDate(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Filter by Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {!posts.length ? (
        <p>No published posts found.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="border rounded p-4 space-y-2">
            {/* Feature Image */}
            {post.feature_image_url && (
              <img
                src={post.feature_image_url}
                alt={post.title}
                className="w-full h-auto rounded"
              />
            )}

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

            <p>
              {post.content.length > 150
                ? post.content.slice(0, 150) + "..."
                : post.content}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
