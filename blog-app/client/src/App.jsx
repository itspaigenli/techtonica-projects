import { useState } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import AdminPostList from "./components/AdminPostList";
import RankingsSidebar from "./components/RankingsSidebar";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingPost, setEditingPost] = useState(null);

  function handleRefresh() {
    setRefreshKey((prev) => prev + 1);
  }

  function handleEdit(post) {
    setEditingPost(post);
  }

  function handleClearEdit() {
    setEditingPost(null);
  }

  function handleSuccess() {
    handleRefresh();
    handleClearEdit();
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

            <PostList refreshKey={refreshKey} />
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

        <PostForm
          onSuccess={handleSuccess}
          editingPost={editingPost}
          onCancelEdit={handleClearEdit}
        />

        <AdminPostList
          refreshKey={refreshKey}
          onSuccess={handleRefresh}
          onEdit={handleEdit}
        />
      </section>
    </div>
  );
}
