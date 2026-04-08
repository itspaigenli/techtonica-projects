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
                  Read blog posts about sumo matches, rankings, rivalries, and
                  tournament moments that stand out.
                </p>
              </div>

              <div className="pt-6">
                {selectedPost ? (
                  <article className="space-y-6">
                    <button
                      type="button"
                      onClick={() => setSelectedPost(null)}
                      className="sumo-button-secondary"
                    >
                      Back To All Posts
                    </button>

                    <div className="space-y-4 rounded-[1.75rem] border border-stone-200 bg-sand-100 p-6">
                      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-clay-600">
                        {selectedPost.category_name && (
                          <span>{selectedPost.category_name}</span>
                        )}
                        {selectedPost.publish_date && (
                          <span>{formatDate(selectedPost.publish_date)}</span>
                        )}
                      </div>

                      <h3 className="font-display text-4xl uppercase tracking-[0.06em] text-ink-950 sm:text-5xl">
                        {selectedPost.title}
                      </h3>

                      {selectedPost.feature_image_url && (
                        <div className="rounded-[1.5rem] bg-white p-4 shadow-lg">
                          <img
                            src={selectedPost.feature_image_url}
                            alt={selectedPost.title}
                            className="h-72 w-full rounded-[1.25rem] object-contain"
                          />
                        </div>
                      )}

                      <p className="max-w-3xl text-base leading-8 whitespace-pre-line text-stone-700">
                        {selectedPost.content}
                      </p>
                    </div>
                  </article>
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
          className="scroll-mt-6 rounded-[2rem] border border-white/65 bg-white/80 px-6 py-6 shadow-[var(--shadow-dohyo)] sm:px-8"
        >
          <div className="flex flex-col gap-4 border-b border-stone-200/80 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-clay-600">
                Editorial Console
              </p>
              <h2 className="font-display text-4xl uppercase tracking-[0.08em] text-ink-950">
                Editorial Room
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-stone-600">
              Here is the section to draft, edit, and delete posts. I want this
              section to be its own page one day.
            </p>
          </div>

          <div className="grid gap-8 pt-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div ref={postFormRef}>
              {editorMessage && (
                <p className="mb-4 rounded-2xl border border-clay-200 bg-clay-50 px-4 py-3 text-sm text-clay-700">
                  {editorMessage}
                </p>
              )}
              <PostForm
                key={editingPost ? `edit-${editingPost.id}` : "create"}
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
          </div>
        </section>
      </div>
    </div>
  );
}
