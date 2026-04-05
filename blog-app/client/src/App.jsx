import { useState } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import AdminPostList from "./components/AdminPostList";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingPost, setEditingPost] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
        {/* Left Side */}
        <div className="md:col-span-2 space-y-6">
          {/* Category Grid */}
          <section className="bg-white p-4 rounded shadow space-y-4">
            <h2 className="text-xl font-semibold">Explore Topics</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div
                className="border rounded p-4 cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedCategory("Wrestler Profiles")}
              >
                Wrestler Profiles
              </div>

              <div
                className="border rounded p-4 cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedCategory("Match Breakdowns")}
              >
                Match Breakdowns
              </div>

              <div
                className="border rounded p-4 cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedCategory("Sumo for Beginners")}
              >
                Sumo for Beginners
              </div>

              <div
                className="border rounded p-4 cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedCategory("History of Sumo")}
              >
                History of Sumo
              </div>
            </div>

            {/* Reset Category Filter */}
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className="text-sm underline"
            >
              Show All
            </button>
          </section>

          {/* Posts Section */}
          <section className="bg-white p-4 rounded shadow space-y-4">
            <h2 className="text-lg font-semibold">Latest Posts</h2>

            {selectedCategory && (
              <p className="text-sm text-gray-600">
                Showing: {selectedCategory}
              </p>
            )}

            <PostList
              refreshKey={refreshKey}
              selectedCategory={selectedCategory}
            />
          </section>
        </div>

        {/* Right Side / Sidebar */}
        <aside className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Current Standings</h2>
          <p className="text-sm text-gray-600">
            Sumo API sidebar will go here later.
          </p>
        </aside>
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
