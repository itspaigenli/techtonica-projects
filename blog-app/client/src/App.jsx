import { useState } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleRefresh() {
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Sumo Blog</h1>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Viewer</h2>
        <PostList refreshKey={refreshKey} />
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Admin</h2>
        <PostForm onSuccess={handleRefresh} />
      </section>
    </div>
  );
}
