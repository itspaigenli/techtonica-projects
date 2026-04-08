import { useEffect, useRef, useState } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import AdminPostList from "./components/AdminPostList";
import RankingsSidebar from "./components/RankingsSidebar";

function formatDate(dateString) {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingPost, setEditingPost] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editorMessage, setEditorMessage] = useState("");
  const postFormRef = useRef(null);

  useEffect(() => {
    if (editingPost) {
      postFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [editingPost]);

  function handleRefresh() {
    setRefreshKey((prev) => prev + 1);
  }

  function handleEdit(post) {
    setEditingPost(post);
    setEditorMessage("");
  }

  function handleClearEdit() {
    setEditingPost(null);
  }

  function handleSuccess(status = "draft") {
    handleRefresh();
    handleClearEdit();
    setEditorMessage(
      status === "published"
        ? "Post published successfully."
        : "Draft saved successfully.",
    );
  }

  return (
    <div className="relative">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-[2rem] border border-white/65 bg-white/80 px-6 py-6 shadow-[var(--shadow-dohyo)] sm:px-8">
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-clay-600">
                Inside The Dohyo
              </p>
              <div className="space-y-3">
                <h1 className="font-display text-5xl uppercase tracking-[0.08em] text-ink-950 sm:text-6xl lg:text-7xl">
                  Sumo Wrestling
                  <span className="block text-clay-600">Journal</span>
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-stone-700 sm:text-base">
                  Match analysis, rikishi rankings, stable politics, and basho
                  storytelling shaped like a ringside notebook instead of a
                  default blog template.
                </p>
              </div>
            </div>

            <div className="grid gap-3 text-sm text-stone-700 sm:grid-cols-3 lg:min-w-[24rem] lg:grid-cols-1">
              <div className="rounded-2xl border border-clay-200 bg-clay-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-clay-600">
                  Coverage
                </p>
                <p className="mt-2 font-medium">
                  Banzuke shifts and tournament recaps
                </p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-clay-600">
                  Pulse
                </p>
                <p className="mt-2 font-medium">
                  Current rankings synced from the API
                </p>
              </div>
              <a href="#admin" className="sumo-button text-center">
                Enter The Editorial Room
              </a>
            </div>
          </div>
        </header>

        <section className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.8fr)_22rem]">
          <div className="space-y-6">
            <section className="rounded-[2rem] border border-white/65 bg-white/80 px-6 py-6 shadow-[var(--shadow-dohyo)] sm:px-8">
              <div className="flex flex-col gap-4 border-b border-stone-200/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-clay-600">
                    Latest Dispatches
                  </p>
                  <h2 className="font-display text-3xl uppercase tracking-[0.08em] text-ink-950">
                    Ringside Stories
                  </h2>
                </div>
                <p className="max-w-xl text-sm leading-6 text-stone-600">
                  Explore commentary on technique, momentum, rivalries, and the
                  ritual theatre that makes every tournament week feel electric.
                </p>
              </div>

              <div className="pt-6">
                {selectedPost ? (
                  <div className="space-y-4">
                {/* Back Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedPost(null)}
                      className="text-sm underline text-blue-700"
                    >
                      ← Back to Posts
                    </button>

                    {/* Full Post Title */}
                    <h3 className="text-2xl font-bold">{selectedPost.title}</h3>

                    {/* Category */}
                    {selectedPost.category_name && (
                      <p className="text-sm text-gray-500">
                        Category: {selectedPost.category_name}
                      </p>
                    )}

                    {/* Publish Date */}
                    {selectedPost.publish_date && (
                      <p className="text-sm text-gray-500">
                        Published: {formatDate(selectedPost.publish_date)}
                      </p>
                    )}

                    {/* Full Content */}
                    <p>{selectedPost.content}</p>
                  </div>
                ) : (
                  <PostList
                    refreshKey={refreshKey}
                    onSelectPost={setSelectedPost}
                  />
                )}
              </div>
            </section>
          </div>

          <RankingsSidebar />
        </section>

        <section
          id="admin"
          className="bg-white p-4 rounded shadow space-y-6 border-t-4 border-gray-800"
        >
          <h2 className="text-xl font-semibold">Admin</h2>

          {editorMessage && (
            <p className="rounded border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
              {editorMessage}
            </p>
          )}

          <div ref={postFormRef}>
            <PostForm
              onSuccess={handleSuccess}
              editingPost={editingPost}
              onCancelEdit={handleClearEdit}
            />
          </div>

          <AdminPostList
            refreshKey={refreshKey}
            onSuccess={handleRefresh}
            onEdit={handleEdit}
          />
        </section>
      </div>
    </div>
  );
}
