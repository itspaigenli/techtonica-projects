import { useEffect, useRef, useState } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import AdminPostList from "./components/AdminPostList";
import RankingsSidebar from "./components/RankingsSidebar";

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
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Sumo Blog</h1>
        <a href="#admin" className="text-sm font-medium underline">
          Admin Login
        </a>
      </header>

      {/* Main Layout */}
      <section className="grid md:grid-cols-3 gap-6">
        {/* Left Side: Posts */}
        <div className="md:col-span-2">
          <section className="bg-white p-4 rounded shadow space-y-4">
            <h2 className="text-lg font-semibold">Latest Posts</h2>

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
                    Published:{" "}
                    {new Date(selectedPost.publish_date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
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
          </section>
        </div>

        {/* Right Side: Sidebar */}
        <RankingsSidebar />
      </section>

      {/* Admin Section */}
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
  );
}
