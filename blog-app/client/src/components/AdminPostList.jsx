import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../api/posts";

export default function AdminPostList({ refreshKey, onSuccess, onEdit }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
        setError("");
      } catch (err) {
        setError(err.message || "Failed to load posts.");
      }
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

    try {
      await deletePost(id);
      setError("");
      onSuccess();
    } catch (err) {
      setError(err.message || "Failed to delete post.");
    }
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
    return (
      <div className="rounded-[1.75rem] border border-dashed border-stone-300 bg-white/70 p-10 text-center text-stone-600">
        {error || "No posts found."}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-clay-600">
          Manage Coverage
        </p>
        <h2 className="font-display text-3xl uppercase tracking-[0.08em] text-ink-950">
          Published And Draft Posts
        </h2>
      </div>

      {error && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {posts.map((post) => (
        <article
          key={post.id}
          className="overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-[0_12px_38px_rgba(23,17,15,0.08)]"
        >
          {post.feature_image_url && (
            <div className="bg-stone-100 p-4">
              <img
                src={post.feature_image_url}
                alt={post.title}
                className="h-44 w-full rounded-[1.25rem] object-contain"
              />
            </div>
          )}

          <div className="space-y-4 p-5">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-clay-600">
              {post.category_name && <span>{post.category_name}</span>}
              {post.category_name && (
                <span className="h-3 w-px bg-stone-300" aria-hidden="true" />
              )}
              <span
                className={`rounded-full px-3 py-1 ${
                  post.status === "published"
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {post.status}
              </span>
              {post.publish_date && (
                <>
                  <span className="h-3 w-px bg-stone-300" aria-hidden="true" />
                  <span>{formatDate(post.publish_date)}</span>
                </>
              )}
            </div>

            <h3 className="font-display text-3xl uppercase tracking-[0.06em] text-ink-950">
              {post.title}
            </h3>

            <p className="text-sm leading-7 text-stone-700">
              {post.content.length > 140
                ? `${post.content.slice(0, 140)}...`
                : post.content}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onEdit(post)}
                className="sumo-button"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => handleDelete(post.id)}
                className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
