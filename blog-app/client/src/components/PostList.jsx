import { useEffect, useState } from "react";
import { getPosts } from "../api/posts";
import { getCategories } from "../api/categories";

export default function PostList({ refreshKey, onSelectPost }) {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

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

      {/* Posts List */}
      {!posts.length ? (
        <p>No published posts found.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="border rounded p-4 space-y-2">
            {/* Feature Image Button */}
            {post.feature_image_url && (
              <button
                type="button"
                onClick={() => setSelectedImage(post.feature_image_url)}
                className="text-sm underline text-blue-700"
              >
                View Feature Image
              </button>
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

            <p>{post.summary || post.content}</p>

            <button
              type="button"
              onClick={() => onSelectPost(post)}
              className="text-sm underline text-blue-700"
            >
              Read More
            </button>
          </div>
        ))
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded shadow-lg max-w-4xl w-full p-4 space-y-4 overflow-auto max-h-[90vh]">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Feature Image</h3>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="text-sm underline"
              >
                Close
              </button>
            </div>

            <img
              src={selectedImage}
              alt="Feature"
              className="max-w-full max-h-[80vh] object-contain rounded mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}
