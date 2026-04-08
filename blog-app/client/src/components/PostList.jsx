import { useEffect, useState } from "react";
import { getPosts } from "../api/posts";
import { getCategories } from "../api/categories";
import sumoCardBanner from "../assets/sumo-card-banner.svg";

export default function PostList({ refreshKey, onSelectPost }) {
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
    <div className="space-y-6">
      <div className="rounded-[1.75rem] border border-stone-200 bg-sand-100 p-5">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-clay-600">
          Filter by Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="sumo-input"
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
        <div className="rounded-[1.75rem] border border-dashed border-stone-300 bg-white/70 p-10 text-center text-stone-600">
          No published posts found.
        </div>
      ) : (
        <div className="grid gap-5">
          {posts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-[0_14px_45px_rgba(23,17,15,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(23,17,15,0.14)]"
            >
              <div className="border-b border-stone-200 bg-clay-50">
                <img
                  src={sumoCardBanner}
                  alt="Sumo-inspired decorative border"
                  className="h-20 w-full object-cover"
                />
              </div>

              <div className="space-y-4 p-6">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.26em] text-clay-600">
                  {post.category_name && <span>{post.category_name}</span>}
                  {post.publish_date && (
                    <span>{formatDate(post.publish_date)}</span>
                  )}
                </div>

                <h3 className="font-display text-3xl uppercase tracking-[0.06em] text-ink-950">
                  {post.title}
                </h3>

                <p className="text-sm leading-7 text-stone-700">
                  {post.summary ||
                    (post.content.length > 180
                      ? `${post.content.slice(0, 180)}...`
                      : post.content)}
                </p>

                <button
                  type="button"
                  onClick={() => onSelectPost(post)}
                  className="sumo-button"
                >
                  Read Full Story
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
